import { Router, Request, Response } from 'express';
import { db } from '../data/store';

const router = Router();

// GET /api/info
router.get('/', (_req: Request, res: Response) => {
  try {
    const info = db.getCafeInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cafe info' });
  }
});

// PUT /api/info
router.put('/', (req: Request, res: Response) => {
  try {
    const updated = db.updateCafeInfo(req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cafe info' });
  }
});

export default router;
