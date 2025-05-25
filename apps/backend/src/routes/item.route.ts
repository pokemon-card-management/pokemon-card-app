import { Hono } from 'hono'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from 'controllers/item.controller'

export const itemsRouter = new Hono()

itemsRouter.get('/', getAllItems)
itemsRouter.post('/', createItem)
itemsRouter.get('/:id', getItemById)
itemsRouter.put('/:id', updateItem)
itemsRouter.delete('/:id', deleteItem)

export default itemsRouter
