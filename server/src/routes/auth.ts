import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const router = Router();

// Developer mock login route for M2
router.get('/dev-login', async (req, res) => {
  try {
    // Find our mock site manager seeded in M1
    const siteManager = await prisma.user.findFirst({
      where: { role: 'SITE_MANAGER' }
    });

    if (!siteManager) {
      return res.status(404).json({ error: 'No site manager found in DB. Did you run the seed script?' });
    }

    const token = jwt.sign(
      { userId: siteManager.id, role: siteManager.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } // Long expiry just for dev testing
    );

    res.json({
      token,
      user: {
        id: siteManager.id,
        name: siteManager.name,
        role: siteManager.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
