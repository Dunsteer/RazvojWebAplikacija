import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { State } from 'src/app/statemanagement';
import { injectorProvider } from '@shared/services/injector.service';

export class BaseComponent {

  protected _appStore:Store<State>;
  private userService :UserService;

  public static currentUser;

  public get currentUser(){
    return BaseComponent.currentUser;
  }

  constructor() {
    this._appStore = injectorProvider().get<Store<State>>(Store);
    this.userService = injectorProvider().get<UserService>(UserService);
    this.userService.loadItems();
    this.userService.getItem(parseInt(localStorage.getItem("id"))).subscribe(x=>{
      BaseComponent.currentUser = x
    });
  }

  public loggedIn() {
    if (localStorage.getItem("id")) return true;
    else return false;
  }
}
