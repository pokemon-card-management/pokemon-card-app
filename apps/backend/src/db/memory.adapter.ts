import { Low } from 'lowdb'
import { Memory } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import type { ItemType } from 'schemas/item.schema'

export type Data = {
  items: ItemType[]
}

export const createInMemoryDB = () => {
  const memory = new Memory<Data>()
  const db = new Low(memory, { items: [] })
  return db
}

export class JSONFileAdapter<T> {
  private db: Low<T>;
  public data: T | null = null;

  constructor(filename: string) {
    const adapter = new JSONFileSync<T>(filename);
    this.db = new Low(adapter, {} as T);
  }

  async read(): Promise<void> {
    await this.db.read();
    this.data = this.db.data;
  }

  async write(): Promise<void> {
    this.db.data = this.data as T;
    await this.db.write();
  }
}
