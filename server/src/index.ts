import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    (req as any).rawBody = buf.toString();
  }
}));

import { authenticateJWT } from './middleware/auth';
import { requireLocationAccess } from './middleware/locationScope';
import { initRentGenerationCron } from './cron/rentGeneration';

import authRoutes from './routes/auth';
import locationRoutes from './routes/locations';
import tenantRoutes from './routes/tenants';
import roomRoutes from './routes/rooms';
import menuRoutes from './routes/menus';
import paymentRoutes from './routes/payments';

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/locations/:locationId/menu', menuRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/payments', paymentRoutes);

// Test endpoint for location scoping
app.get('/api/locations/:locationId/test', authenticateJWT, requireLocationAccess, (req, res) => {
  res.json({ status: 'success', message: 'You have verified access to this location!', locationId: req.params.locationId });
});

// Initialize cron jobs
initRentGenerationCron();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
