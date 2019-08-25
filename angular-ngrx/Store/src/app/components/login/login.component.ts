import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import * as LoginActions from "./login.actions";
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent extends BaseComponent implements OnInit {

  user: User = {
    username: "",
    password: ""
  };

  constructor() {
    super();
  }

  ngOnInit() {}

  submitHandler(){
    this._appStore.dispatch(new LoginActions.Login(this.user));
  }
}
