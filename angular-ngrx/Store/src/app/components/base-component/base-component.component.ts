import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.sass']
})
export class BaseComponentComponent implements OnInit {

  public currentUser:User;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getItem(parseInt(localStorage.getItem("id"))).subscribe(x=>this.currentUser = x);
  }
}