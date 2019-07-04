import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { OrderService } from '../../data/Order.service';
import { LoadOrders, OrderActionTypes, AddOrder, AddOrderSuccessfull } from './order.actions';
import { dispatch } from 'rxjs/internal/observable/range';


@Injectable()
export class OrderEffects {

  @Effect()
  fetchOrders$ = this.actions$.pipe(
    ofType(OrderActionTypes.FetchOrders),
    take(1),
    switchMap(() => this.backend.getAll()),
    map(orders => new LoadOrders({ orders })),
  );

  @Effect()
  addOrder$ = this.actions$.pipe(
    ofType(OrderActionTypes.AddOrder),
    take(1),
    switchMap((action:AddOrder) => {
      return this.backend.addOne(action.payload.order);
    }),
    map(order=> new AddOrderSuccessfull({order}))
  );

  constructor(
    private actions$: Actions,
    private backend: OrderService,
  ) { }
}
