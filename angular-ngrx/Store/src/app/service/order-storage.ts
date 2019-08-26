import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderFilter } from '../models/Order.filter';
//import { OrderSort } from '../model/Order-sort';
import { Order } from '../models/order';

export interface OrderStorage {

  filter$: Observable<OrderFilter>;

  allItems$: Observable<Order[]>;

  loadItems(): void;
  getItem(id: number): Observable<Order>;
  addItem(item: Partial<Order>): void;
  updateItem(item: Partial<Order>): void;
  removeItem(id: number): void;
  setSortField(field: string): void;
}

export const ORDER_STORAGE = new InjectionToken<OrderStorage>('Order.storage');
