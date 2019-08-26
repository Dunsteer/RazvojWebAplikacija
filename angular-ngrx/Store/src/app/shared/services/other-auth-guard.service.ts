import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
//import { AuthService } from './auth.service';
@Injectable()
export class OtherAuthGuardService implements CanActivate {
  constructor(private _router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (localStorage.getItem("id")) {
      return true;
    } else {
      this._router.navigate(["/login"]);
      return false;
    }
  }
}
