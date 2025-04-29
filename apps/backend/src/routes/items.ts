import { Hono } from 'hono'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items'

const router = new Hono()

router.get('/',      getAllItems)    // Read all
router.get('/:id',   getItemById)    // Read one
router.post('/',     createItem)     // Create
router.put('/:id',   updateItem)     // Update
router.delete('/:id', deleteItem)    // Delete

export default router
