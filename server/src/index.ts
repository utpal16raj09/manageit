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

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test endpoint for location scoping
app.get('/api/locations/:locationId/test', authenticateJWT, requireLocationAccess, (req, res) => {
  res.json({ status: 'success', message: 'You have verified access to this location!', locationId: req.params.locationId });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
