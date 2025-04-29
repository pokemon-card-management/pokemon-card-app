import { Hono } from 'hono'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items'
import { zValidator } from '@hono/zod-validator'
import { ItemSchema, ItemIdParamSchema, itemPartialSchema } from '../schemas/item.schema'

const router = new Hono()

router.get('/', getAllItems)
router.post('/', zValidator('json', ItemSchema), createItem)

router.get('/:id', zValidator('param', ItemIdParamSchema), getItemById)
router.put('/:id', zValidator('param', ItemIdParamSchema), zValidator('json', itemPartialSchema), updateItem)
router.delete('/:id', zValidator('param', ItemIdParamSchema), deleteItem)

export default router
