import { Router } from 'express';
import { prisma } from '../db';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import { requireLocationAccess } from '../middleware/locationScope';
import multer from 'multer';
import { storage } from '../utils/storage';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Move-in
router.post('/move-in', authenticateJWT, requireLocationAccess, async (req: AuthRequest, res) => {
  try {
    const { 
      locationId, bedId, email, name, phone, 
      depositAmount, monthlyRent, leaseStart, 
      leaseEnd, emergencyContactName, emergencyContactPhone,
      employerOrCollege, kycDocUrl, photoUrl
    } = req.body;

    // Required fields validation based on M2 requirements
    if (!name || !phone || !email || !kycDocUrl || !emergencyContactName || !emergencyContactPhone || !bedId || !leaseStart || !monthlyRent || depositAmount === undefined) {
      return res.status(400).json({ error: 'Missing mandatory move-in fields' });
    }

    // 1. Double booking validation
    const bed = await prisma.bed.findUnique({ where: { id: bedId } });
    if (!bed) return res.status(404).json({ error: 'Bed not found' });
    if (bed.status === 'OCCUPIED') {
      return res.status(409).json({ error: 'Bed is already occupied. Double booking prevented.' });
    }

    // 2. Transaction for User + Tenant + Bed Update
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          name,
          role: 'TENANT',
          passwordHash: 'pending_setup'
        }
      });

      // Create tenant profile
      const tenant = await tx.tenant.create({
        data: {
          userId: user.id,
          bedId,
          phone,
          depositAmount: Number(depositAmount),
          monthlyRent: Number(monthlyRent),
          leaseStart: new Date(leaseStart),
          leaseEnd: leaseEnd ? new Date(leaseEnd) : null,
          kycVerified: false,
          kycDocUrl,
          kycDocType: 'Aadhaar', // Defaulting for M2
          emergencyContactName,
          emergencyContactPhone,
          employerOrCollege,
          photoUrl
        }
      });

      // Mark bed as occupied
      await tx.bed.update({
        where: { id: bedId },
        data: { status: 'OCCUPIED' }
      });

      return { user, tenant };
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/move-out', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const tenant = await prisma.tenant.findUnique({ where: { id } });
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

    await prisma.$transaction(async (tx) => {
      // Free the bed
      if (tenant.bedId) {
        await tx.bed.update({
          where: { id: tenant.bedId },
          data: { status: 'VACANT' }
        });
      }

      // We remove the bedId from the tenant (they are archived)
      await tx.tenant.update({
        where: { id },
        data: { bedId: null }
      });
    });

    res.json({ message: 'Tenant moved out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// KYC Upload endpoint
router.post('/:id/kyc', authenticateJWT, upload.single('document'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = await storage.uploadFile(req.file);

    // If ID is 'new', we just return the URL for the move-in form to use
    if (req.params.id === 'new') {
      return res.json({ url: fileUrl });
    }

    // Otherwise, attach to existing tenant
    const tenant = await prisma.tenant.update({
      where: { id: req.params.id },
      data: { kycDocUrl: fileUrl }
    });

    res.json({ url: fileUrl, tenant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single tenant
router.get('/:id', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        bed: {
          include: {
            room: true
          }
        }
      }
    });
    
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    res.json(tenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
