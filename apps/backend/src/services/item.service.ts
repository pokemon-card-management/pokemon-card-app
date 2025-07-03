import { itemRepository, setItemDB } from 'repositories/item.repository'
import { ItemType } from 'schemas/item.schema'
import { Low } from 'lowdb'

type Data = {
  items: ItemType[]
}

export const itemService = {
  getItems: async (): Promise<ItemType[]> => {
    const items = await itemRepository.findAll()
    // ここで整形・フィルタリング等を行っても良い
    return items
  },

  getItemById: async (id: number): Promise<ItemType | null> => {
    return await itemRepository.findById(id)
  },

  findLatestId: async (): Promise<number> => {
    return await itemRepository.findLatestId()
  },

  createItem: async (item: ItemType): Promise<ItemType> => {
    return await itemRepository.create(item)
  },

  updateItem: async (id: number, data: Partial<ItemType>): Promise<ItemType | null> => {
    return await itemRepository.update(id, data)
  },

  deleteItem: async (id: number): Promise<boolean> => {
    return await itemRepository.delete(id)
  }
}

export let db: Low<Data>

export const setDB = (_db: Low<Data>) => {
  db = _db
  setItemDB(_db)
}
