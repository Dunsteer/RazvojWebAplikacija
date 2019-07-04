import { Component } from '@angular/core';
import { BaseComponent } from './components/base-component/base.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {

  constructor(private _userService:UserService){
    super(_userService);
  }
}
