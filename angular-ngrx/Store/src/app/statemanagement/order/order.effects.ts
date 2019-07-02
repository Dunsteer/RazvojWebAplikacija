import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { OrderService } from '../../data/Order.service';
import { LoadOrders, OrderActionTypes, AddOrder } from './order.actions';
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
    map((action:AddOrder) => {
      this.backend.addOne(action.payload.order);
    })
  );

  constructor(
    private actions$: Actions,
    private backend: OrderService,
  ) { }
}
