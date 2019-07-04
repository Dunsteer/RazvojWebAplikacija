import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderService } from '../../data/Order.service';

//import { UserSort } from '../../model/user-sort';
import { Order } from '../../models/Order';
import { SetFilter } from './order-filter.actions';
import { selectFilter, selectFilteredItems, selectItemById } from './order-storage-selectors';
import { AddOrder, DeleteOrder, FetchOrders, UpdateOrder, AddOrderSuccessfull } from './order.actions';
import * as fromOrder from './order.reducer';
import { OrderFilter } from '../../models/order.filter';
import { SetSort } from './order-sort.actions';
import { OrderStorage } from 'src/app/service/order-storage';

@Injectable({
  providedIn: 'root'
})
export class OrderStorageNgrxService implements OrderStorage {
  filter$: Observable<OrderFilter> = this.store.select(selectFilter);
  allItems$: Observable<Order[]> = this.store.select(selectFilteredItems);
  constructor(
    private backend: OrderService,
    private store: Store<fromOrder.State>,
  ) {
  }

  loadItems(): void {
    //debugger;
    return this.store.dispatch(new FetchOrders());
  }
  getItem(id: number): Observable<Order> {
    return this.store.select(selectItemById(id));
  }
  addItem(item: Partial<Order>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      console.log(addedItem);
      this.store.dispatch(new AddOrderSuccessfull({ order: addedItem }));
    });
  }
  removeItem(id: number): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.store.dispatch(new DeleteOrder({ id }));
    });
  }
  setSortField(field: string): void {
    this.store.dispatch(new SetSort({ field }));
  }
}
