import express, { Request, Response } from 'express';
import cors from 'cors';
import menuRoutes from './routes/menu';
import cafeInfoRoutes from './routes/cafeInfo';
import orderRoutes from './routes/orders';
import { db } from './data/store';
import { connectMongoDB } from './config/db';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/info', cafeInfoRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Bloom Cafe Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Reset endpoint
app.post('/api/reset', (_req: Request, res: Response) => {
  try {
    const data = db.resetDefaults();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset defaults' });
  }
});

// Start server
async function startServer() {
  await connectMongoDB();
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`☕ Bloom Cafe Backend API running on port ${PORT}`);
  });
}

startServer();
