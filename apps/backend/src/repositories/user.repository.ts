import { JSONFileAdapter } from '../db/memory.adapter';
import type { User } from '../types/user';

export class UserRepository {
  private db: JSONFileAdapter<{ users: User[] }>;

  constructor() {
    this.db = new JSONFileAdapter<{ users: User[] }>('data/users.json');
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.db.read();
    const users = this.db.data?.users || [];
    return users.find(user => user.email === email) || null;
  }

  async findById(id: number): Promise<User | null> {
    await this.db.read();
    const users = this.db.data?.users || [];
    return users.find(user => user.id === id) || null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await this.db.read();
    
    if (!this.db.data) {
      this.db.data = { users: [] };
    }

    const now = new Date().toISOString();
    const newId = this.db.data.users.length > 0 
      ? Math.max(...this.db.data.users.map(u => u.id)) + 1 
      : 1;

    const newUser: User = {
      ...userData,
      id: newId,
      createdAt: now,
      updatedAt: now
    };

    this.db.data.users.push(newUser);
    await this.db.write();

    return newUser;
  }

  async updateById(id: number, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    await this.db.read();
    
    if (!this.db.data) {
      return null;
    }

    const userIndex = this.db.data.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    const updatedUser = {
      ...this.db.data.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.db.data.users[userIndex] = updatedUser;
    await this.db.write();

    return updatedUser;
  }
}