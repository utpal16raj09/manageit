import { Router } from 'express';
import { prisma } from '../db';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import { requireLocationAccess } from '../middleware/locationScope';

const router = Router();

// Get rooms for a specific location
router.get('/', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { locationId } = req.query;
    if (!locationId) {
      return res.status(400).json({ error: 'locationId query parameter is required' });
    }

    const rooms = await prisma.room.findMany({
      where: { locationId: String(locationId) },
      include: {
        beds: true,
        roomType: true
      }
    });

    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new room
router.post('/', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { locationId, roomTypeId, roomNumber, numberOfBeds } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const room = await tx.room.create({
        data: {
          roomNumber,
          locationId,
          roomTypeId
        }
      });

      // Create beds for this room
      const beds = [];
      for (let i = 1; i <= (numberOfBeds || 1); i++) {
        const bed = await tx.bed.create({
          data: {
            roomId: room.id,
            bedNumber: `${roomNumber}-${String.fromCharCode(64 + i)}`,
            status: 'VACANT'
          }
        });
        beds.push(bed);
      }

      return { room, beds };
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a room
router.put('/:id', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { roomNumber, roomTypeId } = req.body;

    const room = await prisma.room.update({
      where: { id },
      data: { roomNumber, roomTypeId }
    });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
