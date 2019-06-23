import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../../data/user.service';

//import { UserSort } from '../../model/user-sort';
import { User } from '../../models/user';
import { UserStorage } from '../../service/user-storage';
import { SetFilter } from './user-filter.actions';
import { selectFilter, selectFilteredItems, selectItemById } from './user-storage-selectors';
import { AddUser, DeleteUser, FetchUsers, UpdateUser } from './user.actions';
import * as fromUser from './user.reducer';
import { UserFilter } from 'src/app/models/user.filter';
import { SetSort } from './user-sort.actions';

@Injectable({
  providedIn: 'root'
})
export class UserStorageNgrxService implements UserStorage  {
  filter$: Observable<UserFilter>= this.store.select(selectFilter);
  allItems$: Observable<User[]>= this.store.select(fromUser.selectAll);
  constructor(
    private backend: UserService,
    private store: Store<fromUser.State>,
  ) {
  }

  loadItems(): void {
    debugger;
    return this.store.dispatch(new FetchUsers());
  }
  getItem(id: number): Observable<User> {
    return this.store.select(selectItemById(id));
  }
  addItem(item: Partial<User>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      this.store.dispatch(new AddUser({ user: addedItem }));
    });
  }
  removeItem(id: number): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.store.dispatch(new DeleteUser({ id }));
    });
  }
  setSortField(field: string): void {
    this.store.dispatch(new SetSort({ field }));
  }
  setFilter(filter: UserFilter): void {
    this.store.dispatch(new SetFilter({ filter }));
  }
}
