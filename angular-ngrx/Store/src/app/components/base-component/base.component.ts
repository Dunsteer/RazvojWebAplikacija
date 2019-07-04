import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

export class BaseComponent {

  public static currentUser;

  public get currentUser(){
    return BaseComponent.currentUser;
  }

  constructor(private service: UserService) {
    this.service.loadItems();
    this.service.getItem(parseInt(localStorage.getItem("id"))).subscribe(x=>{
      BaseComponent.currentUser = x
    });
  }

  public loggedIn() {
    if (localStorage.getItem("id")) return true;
    else return false;
  }
}