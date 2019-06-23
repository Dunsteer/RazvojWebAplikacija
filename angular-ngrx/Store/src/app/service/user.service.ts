import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { UserFilter } from '../model/user-filter.enum';
// import { UserSort } from '../model/user-sort';
import { User } from '../models/user';
import { UserStorage, USER_STORAGE } from './user-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users$: Observable<User[]> = this.storage.allItems$;
  //sort$: Observable<UserSort> = this.storage.sort$;
  filter$: Observable<string> = this.storage.filter$.pipe(map(
    filter => filter.username
  ));

  constructor(
    @Inject(USER_STORAGE) private storage: UserStorage
  ) { }

  loadItems(): void {
    console.log("s");
    return this.storage.loadItems();
  }

  getItem(id: number): Observable<User> {
    return this.storage.getItem(id);
  }

  addItem(item: Partial<User>) {
    this.storage.addItem(item);
  }

  removeItem(id: number) {
    this.storage.removeItem(id);
  }

  setSortField(field: string) {
    this.storage.setSortField(field);
  }

  setFilterString(stringValue: string) {
    switch (stringValue) {
      case 'all':
      default:
        this.storage.setFilter({username:stringValue});
        break;
    }
  }
}
