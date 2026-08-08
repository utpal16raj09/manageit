import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { prisma } from '../db';

/**
 * Validates that the current user has access to a specific location in the DB.
 * Requires `locationId` to be passed in `req.params` or `req.body`.
 * 
 * NEVER trusts the JWT for location assignments. Always hits the DB join tables.
 */
export const requireLocationAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const { userId, role } = req.user;
    
    const locationId = req.params.locationId || req.body.locationId || req.query.locationId;
    if (!locationId) {
      return res.status(400).json({ error: 'Location ID is required to verify access.' });
    }

    // Owner has global access
    if (role === 'OWNER') {
      return next();
    }

    if (role === 'EXEC_MANAGER') {
      // Find all site managers assigned to this location
      const siteManagerAssignments = await prisma.siteManagerAssignment.findMany({
        where: { locationId: locationId as string }
      });
      const siteManagerIds = siteManagerAssignments.map(a => a.siteManagerId);

      // Verify this Exec Manager oversees at least one of those site managers
      const hasAccess = await prisma.execManagerAssignment.findFirst({
        where: {
          execManagerId: userId,
          siteManagerId: { in: siteManagerIds }
        }
      });

      if (!hasAccess) {
        return res.status(403).json({ error: 'Forbidden: You do not oversee this location.' });
      }
      
      return next();
    }

    if (role === 'SITE_MANAGER') {
      // Strict Check against DB join table - prevents stale JWT assignment issues
      const hasAccess = await prisma.siteManagerAssignment.findFirst({
        where: {
          siteManagerId: userId,
          locationId: locationId as string
        }
      });

      if (!hasAccess) {
        return res.status(403).json({ error: 'Forbidden: You are not assigned to this location.' });
      }
      
      return next();
    }

    // Tenants shouldn't hit this generic location check (they have specific bed checks)
    return res.status(403).json({ error: 'Forbidden: Invalid role for this operation.' });

  } catch (err) {
    console.error('Authorization Error:', err);
    res.status(500).json({ error: 'Internal server error during authorization check.' });
  }
};
