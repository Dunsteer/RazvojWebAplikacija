import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { OrderFilter } from '../model/Order-filter.enum';
// import { OrderSort } from '../model/Order-sort';
import { Order } from '../models/order';
import { OrderStorage, ORDER_STORAGE} from './order-storage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders$: Observable<Order[]> = this.storage.allItems$;
  //sort$: Observable<OrderSort> = this.storage.sort$;
  // filter$: Observable<string> = this.storage.filter$.pipe(map(
  //   filter => filter
  // ));

  constructor(
    @Inject(ORDER_STORAGE) private storage: OrderStorage
  ) { }

  loadItems(): void {
    console.log("s");
    return this.storage.loadItems();
  }

  getItem(id: number): Observable<Order> {
    return this.storage.getItem(id);
  }

  addItem(item: Partial<Order>) {
    this.storage.addItem(item);
  }

  removeItem(id: number) {
    this.storage.removeItem(id);
  }

  setSortField(field: string) {
    this.storage.setSortField(field);
  }

  // setFilterString(stringValue: string) {
  //   switch (stringValue) {
  //     case 'all':
  //     default:
  //       this.storage.setFilter({name:stringValue});
  //       break;
  //   }
  // }
}
