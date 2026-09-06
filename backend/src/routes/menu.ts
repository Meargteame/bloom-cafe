import { Router, Request, Response } from 'express';
import { db } from '../data/store';

const router = Router();

// GET /api/menu
router.get('/', (_req: Request, res: Response) => {
  try {
    const items = db.getMenu();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// POST /api/menu
router.post('/', (req: Request, res: Response) => {
  try {
    const newItem = req.body;
    if (!newItem || !newItem.name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    const created = db.addMenuItem({
      ...newItem,
      id: newItem.id || `item-${Date.now()}`,
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// PUT /api/menu/:id
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = db.updateMenuItem({ ...req.body, id });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// DELETE /api/menu/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    db.deleteMenuItem(id);
    res.json({ success: true, message: `Item ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// PATCH /api/menu/:id/availability
router.patch('/:id/availability', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const toggled = db.toggleAvailability(id);
    if (!toggled) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(toggled);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle item availability' });
  }
});

export default router;
