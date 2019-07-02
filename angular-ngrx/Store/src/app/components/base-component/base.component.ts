import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

export class BaseComponent {

  public currentUser(){
    return this.service.getItem(parseInt(localStorage.getItem("id"))).toPromise();
  };

  constructor(private service: UserService) {
    this.service.loadItems();
   }
}