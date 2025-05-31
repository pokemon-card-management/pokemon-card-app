import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import type { Item } from 'types/item'

let adapter: any

if (process.env.NODE_ENV === 'test') {
  const { Memory } = await import('lowdb')
  adapter = new Memory<Item>()
} else {
  const filePath = join(process.cwd(), 'data', 'items.json')
  adapter = new JSONFile<Item>(filePath)
}

export const db = new Low<Item>(adapter, )
await db.read()
db.data ||= { items: [] }
