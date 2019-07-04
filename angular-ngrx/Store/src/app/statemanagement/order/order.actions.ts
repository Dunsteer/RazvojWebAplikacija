import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { FilterActions } from './order-filter.actions';
import { SortActions } from './order-sort.actions';
import { Order } from './order.model';

export enum OrderActionTypes {
  LoadOrders = '[Order] Load Orders',
  AddOrder = '[Order] Add Order',
  AddOrderSuccessfull = '[Order] Add Order Successfull',
  UpdateOrder = '[Order] Update Order',
  DeleteOrder = '[Order] Delete Order',
  FetchOrders = '[Order] Fetch Orders',
}

export class LoadOrders implements Action {
  readonly type = OrderActionTypes.LoadOrders;

  constructor(public payload: { orders: Order[] }) {}
}

export class AddOrder implements Action {
  readonly type = OrderActionTypes.AddOrder;

  constructor(public payload: { order: Order }) {}
}

export class AddOrderSuccessfull implements Action {
  readonly type = OrderActionTypes.AddOrderSuccessfull;

  constructor(public payload: { order: Order }) {}
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UpdateOrder;

  constructor(public payload: { order: Update<Order> }) {}
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DeleteOrder;

  constructor(public payload: { id: number }) {}
}

export class FetchOrders implements Action {
  readonly type = OrderActionTypes.FetchOrders;
}

export type OrderActions =
 LoadOrders
 | AddOrder
 | UpdateOrder
 | DeleteOrder
 | FetchOrders
 | SortActions
 | FilterActions
 | AddOrderSuccessfull;
