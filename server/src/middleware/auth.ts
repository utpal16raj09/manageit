import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    // Strict, short-lived JWT verification (15m expiry is set during generation)
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token expired or invalid. Please refresh.' });
      }
      
      req.user = user as { userId: string, role: string };
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization header missing.' });
  }
};
