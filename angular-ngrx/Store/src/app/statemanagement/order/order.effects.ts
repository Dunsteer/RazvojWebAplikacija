import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { OrderService } from '../../data/Order.service';
import { LoadOrders, OrderActionTypes } from './order.actions';


@Injectable()
export class OrderEffects {

  @Effect()
  fetchOrders$ = this.actions$.pipe(
    ofType(OrderActionTypes.FetchOrders),
    take(1),
    switchMap(() => this.backend.getAll()),
    map(orders => new LoadOrders({ orders })),
  );

  constructor(
    private actions$: Actions,
    private backend: OrderService,
  ) { }
}
