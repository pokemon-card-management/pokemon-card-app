import { Hono } from 'hono'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items'

const router = new Hono()

router.get('/', getAllItems)
router.post('/', createItem)

router.get('/:id', getItemById)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router
