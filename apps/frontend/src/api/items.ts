// src/api/items.ts
import axios from 'axios'
import { Item } from 'types'

// ベースURLと共通設定
const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
  })

export const fetchItems = async (): Promise<Item[]> => {
  const { data } = await api.get<Item[]>(`/items`)
  return data
}

export const fetchItem = async (id: string): Promise<Item> => {
  const { data } = await api.get<Item>(`/items/${id}`)
  return data
}

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const { data } = await api.post<Item>(`/items`, item)
  return data
}

export const updateItem = async (
  id: string,
  payload: Partial<Omit<Item, 'id'>>
): Promise<Item> => {
  const { data } = await api.put<Item>(`/items/${id}`, payload)
  return data
}

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`)
}
