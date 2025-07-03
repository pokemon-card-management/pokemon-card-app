import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { ItemType } from 'schemas/item.schema'
import { join } from 'path'
import { mkdirSync } from 'fs'

type Data = { items: ItemType[] }

const dbPath = join(process.cwd(), 'data')
mkdirSync(dbPath, { recursive: true })

const adapter = new JSONFile<Data>(join(dbPath, 'items.json'))
const defaultData: Data = { items: [] }
let db = new Low(adapter, defaultData)

await db.read()

export const setItemDB = (newDB: Low<Data>) => {
  db = newDB
}

export const itemRepository = {
  findAll: async (): Promise<ItemType[]> => {
    await db.read()
    return db.data.items
  },

  findById: async (id: number): Promise<ItemType | null> => {
    await db.read()
    return db.data.items.find(item => item.id === id) ?? null
  },

  findLatestId: async (): Promise<number> => {
    await db.read()
    if (!db.data.items.length) return 0
    const sorted = db.data.items.slice().sort((a, b) => b.id - a.id)
    return sorted[0].id
  },

  create: async (item: ItemType): Promise<ItemType> => {
    await db.read()
    db.data.items.push(item)
    await db.write()
    return item
  },

  update: async (id: number, data: Partial<ItemType>): Promise<ItemType | null> => {
    await db.read()
    const item = db.data.items.find(item => item.id === id)
    if (!item) return null
    Object.assign(item, data)
    item.updatedAt = new Date().toISOString()
    await db.write()
    return item
  },

  delete: async (id: number): Promise<boolean> => {
    await db.read()
    const before = db.data.items.length
    db.data.items = db.data.items.filter(item => item.id !== id)
    await db.write()
    return db.data.items.length < before
  },
}
