import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFilter } from '../models/user.filter';
//import { UserSort } from '../model/user-sort';
import { User } from '../models/user';
import { Article } from '../models/article';

export interface UserStorage {

  filter$: Observable<UserFilter>;

  allItems$: Observable<User[]>;

  loadItems(): void;
  getItem(id: number): Observable<User>;
  addItem(item: Partial<User>): void;
  removeItem(id: number): void;
  setSortField(field: string): void;
  setFilter(filter: UserFilter): void;

  addToCart(article: Article): void;
}

export const USER_STORAGE = new InjectionToken<UserStorage>('user.storage');
