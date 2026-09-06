import { Router, Request, Response } from 'express';
import { db } from '../data/store';

const router = Router();

// GET /api/orders
router.get('/', (_req: Request, res: Response) => {
  try {
    const orders = db.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// POST /api/orders
router.post('/', (req: Request, res: Response) => {
  try {
    const { tableNumber, items, totalAmount } = req.body;
    if (!tableNumber || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Valid table number and items required' });
      return;
    }
    const order = db.addOrder(tableNumber, items, totalAmount || 0);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit order' });
  }
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }
    const updated = db.updateOrderStatus(id, status);
    if (!updated) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
