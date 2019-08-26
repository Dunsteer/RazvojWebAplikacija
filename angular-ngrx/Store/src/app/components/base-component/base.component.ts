import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { State } from "src/app/statemanagement";
import { injectorProvider } from "@shared/services/injector.service";
import * as LoginActions from "../login/login.actions";

export class BaseComponent {
  protected _appStore: Store<State>;
  protected userService: UserService;

  public static currentUser:User;

  public get currentUser() {
    return BaseComponent.currentUser;
  }

  constructor() {
    this._appStore = injectorProvider().get<Store<State>>(Store);
    this.userService = injectorProvider().get<UserService>(UserService);
    this.userService.loadItems();
    this.userService
      .getItem(parseInt(localStorage.getItem("id")))
      .subscribe(x => {
        BaseComponent.currentUser = x;
      });
  }

  get loggedIn() {
    if (localStorage.getItem("id")) return true;
    else return false;
  }

  public logout() {
    this._appStore.dispatch(new LoginActions.Logout());
  }
}
