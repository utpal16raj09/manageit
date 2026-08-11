import { Router } from 'express';
import { prisma } from '../db';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import { requireLocationAccess } from '../middleware/locationScope';

const router = Router();

// Get all locations assigned to the user
router.get('/', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { userId, role } = req.user!;

    if (role === 'OWNER') {
      const locations = await prisma.location.findMany();
      return res.json(locations);
    }

    if (role === 'SITE_MANAGER') {
      const assignments = await prisma.siteManagerAssignment.findMany({
        where: { siteManagerId: userId },
        include: { location: true }
      });
      return res.json(assignments.map(a => a.location));
    }
    
    // Simplification for exec manager...
    res.json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get occupancy and layout for a specific location
// (We apply the location scope middleware to ensure the user has access)
router.get('/:locationId/occupancy', authenticateJWT, requireLocationAccess, async (req: AuthRequest, res) => {
  try {
    const { locationId } = req.params;

    const location = await prisma.location.findUnique({
      where: { id: locationId },
      include: {
        roomTypes: {
          include: {
            rooms: {
              include: {
                beds: {
                  include: {
                    tenant: {
                      include: {
                        user: { select: { name: true, email: true } }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
