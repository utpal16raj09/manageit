import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

import { authenticateJWT } from './middleware/auth';
import { requireLocationAccess } from './middleware/locationScope';

import authRoutes from './routes/auth';
import locationRoutes from './routes/locations';
import tenantRoutes from './routes/tenants';
import roomRoutes from './routes/rooms';
import menuRoutes from './routes/menus';

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/locations/:locationId/menu', menuRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/rooms', roomRoutes);

// Test endpoint for location scoping
app.get('/api/locations/:locationId/test', authenticateJWT, requireLocationAccess, (req, res) => {
  res.json({ status: 'success', message: 'You have verified access to this location!', locationId: req.params.locationId });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
