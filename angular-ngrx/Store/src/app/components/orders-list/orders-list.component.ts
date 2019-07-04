import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/service/order.service';
import { BaseComponent } from '../base-component/base.component';
import { UserService } from 'src/app/service/user.service';
import * as fromOrderReducer from '../../statemanagement/order/order.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.sass']
})
export class OrdersListComponent extends BaseComponent implements OnInit {

  orders$: Observable<Order[]> = this.orderService.orders$.pipe(map(items=>items.filter(x=>!x.delivered)));
  hasOrders$: Observable<boolean> = this.orders$.pipe(map(items => items.length > 0));

  constructor(private orderService: OrderService, private _store: Store<fromOrderReducer.State>, private _userService: UserService) {
    super(_userService);
    this.orderService.loadItems();
  }

  ngOnInit() {
    
  }
}
