import { Low } from 'lowdb'
import { Memory } from 'lowdb'
import type { ItemType } from 'schemas/item.schema'

type Data = {
  items: ItemType[]
}

export const createInMemoryDB = () => {
  const memory = new Memory<Data>()
  const db = new Low(memory, { items: [] })
  return db
}
