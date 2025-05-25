import type { Context } from 'hono'
import { ERRORS } from 'constants/errors'
import { throwHttpError } from 'utils/errors'
import { validateWithSchema } from 'utils/validate'
import { 
  ItemSchema,
  ItemListSchema,
  IdParamSchema,
  ItemType,
  UpdateItemSchema,
  UpdateItemType,
  CreateItemSchema,
} from 'schemas/item.schema'
import { itemService } from 'services/item.service'

export const getAllItems = async (c: Context) => {
  const items = await itemService.getItems()
  validateWithSchema(ItemListSchema, items, ERRORS.INVALID_ITEM_SHAPE)
  return c.json(items)
}

export const getItemById = async (c: Context) => {
  const id: number = validateWithSchema(IdParamSchema, c.req.param('id'), ERRORS.INVALID_ID)
  const item = await itemService.getItemById(id)
  if (!item) {
    throwHttpError(ERRORS.ITEM_NOT_FOUND)
  }
  validateWithSchema(ItemSchema, item, ERRORS.INVALID_ITEM_SHAPE)
  return c.json(item)
}

export const createItem = async (c: Context) => {
  const data = await c.req.json()
  validateWithSchema(CreateItemSchema, data, ERRORS.INVALID_ITEM_SHAPE)

  // 新しいIDを取得
  const newId: number = await itemService.findLatestId() + 1

  // 新しいitemを作成
  const newItem: ItemType = {
    id: newId,
    name: data.name,
    description: data.description! || '',
    price: data.price! || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  itemService.createItem(newItem)
  validateWithSchema(ItemSchema, newItem, ERRORS.INVALID_ITEM_SHAPE)

  return c.json(newItem, 201)
}

export const updateItem = async (c: Context) => {
  const id: number = validateWithSchema(IdParamSchema, c.req.param('id'), ERRORS.INVALID_ITEM_SHAPE)
  const data: UpdateItemType = validateWithSchema(UpdateItemSchema, await c.req.json(), ERRORS.INVALID_ITEM_SHAPE)

  const item = itemService.getItemById(id)
  if (!item) {
    throwHttpError(ERRORS.ITEM_NOT_FOUND)
  }

  const updatedItem = await itemService.updateItem(id, data)
  validateWithSchema(ItemSchema, updatedItem, ERRORS.INVALID_ITEM_SHAPE)
  return c.json(updatedItem)
}

export const deleteItem = (c: Context) => {
  const id: number = validateWithSchema(IdParamSchema, c.req.param('id'), ERRORS.INVALID_ITEM_SHAPE)

  const item = itemService.getItemById(id)
  if (!item) {
    throwHttpError(ERRORS.ITEM_NOT_FOUND)
  }
  itemService.deleteItem(id)
  return c.body(null, 204)
}

