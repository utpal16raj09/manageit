import { Router } from 'express';
import { prisma } from '../db';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import { requireLocationAccess } from '../middleware/locationScope';

const router = Router({ mergeParams: true });

// GET /api/locations/:locationId/menu
// Fetch the weekly menu for a location
router.get('/', authenticateJWT, requireLocationAccess, async (req: AuthRequest, res) => {
  try {
    const { locationId } = req.params;

    const menus = await prisma.foodMenu.findMany({
      where: { locationId },
      orderBy: { dayOfWeek: 'asc' }
    });

    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/locations/:locationId/menu
// Update the weekly menu (requires SITE_MANAGER or higher)
router.put('/', authenticateJWT, requireLocationAccess, async (req: AuthRequest, res) => {
  try {
    const { locationId } = req.params;
    const { menus } = req.body; 
    // menus should be an array of { dayOfWeek: number, breakfast: string, lunch: string, dinner: string }

    if (!Array.isArray(menus)) {
      return res.status(400).json({ error: 'menus must be an array' });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Upsert each day's menu
      const updatedMenus = [];
      for (const menu of menus) {
        if (menu.dayOfWeek < 0 || menu.dayOfWeek > 6) continue; // Invalid day

        const updated = await tx.foodMenu.upsert({
          where: {
            locationId_dayOfWeek: {
              locationId,
              dayOfWeek: menu.dayOfWeek
            }
          },
          update: {
            breakfast: menu.breakfast || null,
            lunch: menu.lunch || null,
            dinner: menu.dinner || null
          },
          create: {
            locationId,
            dayOfWeek: menu.dayOfWeek,
            breakfast: menu.breakfast || null,
            lunch: menu.lunch || null,
            dinner: menu.dinner || null
          }
        });
        updatedMenus.push(updated);
      }
      return updatedMenus;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
