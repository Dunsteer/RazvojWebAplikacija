import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/order";
import { Observable, zip } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { OrderService } from "src/app/service/order.service";
import { BaseComponent } from "../base-component/base.component";
import { UserService } from "src/app/service/user.service";
import * as fromOrderReducer from "../../statemanagement/order/order.reducer";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/user";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.sass"]
})
export class OrdersListComponent extends BaseComponent implements OnInit {
  orders$: Observable<Order[]> = this.orderService.orders$.pipe(
    map(items => {
      return items.filter(
        x => this.currentUser.admin || this.currentUser.id == x.userId
      );
    }),
    withLatestFrom(this.userService.users$),
    map(combined => {
      return combined[0].map(order => {
        order.user = combined[1].filter(user => user.id == order.userId)[0];
        return order;
      });
    })
  );

  users$: Observable<User[]> = this.userService.users$;

  hasOrders$: Observable<boolean> = this.orders$.pipe(
    map(items => items.length > 0)
  );

  constructor(
    private orderService: OrderService,
    private _store: Store<fromOrderReducer.State>
  ) {
    super();
    this.orderService.loadItems();
  }

  ngOnInit() {}

  handleDeliver(order) {
    this.orderService.updateItem({ id: order.id, delivered: true });
  }
}
