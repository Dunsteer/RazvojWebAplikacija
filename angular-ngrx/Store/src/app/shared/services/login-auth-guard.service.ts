import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
//import { AuthService } from './auth.service';
@Injectable()
export class LoginAuthGuardService implements CanActivate {
    constructor( public _router: Router) { }
    canActivate(): boolean {
        if (!localStorage.getItem('id')) {
            return true;
        } else {
            this._router.navigate(['/']);
            return false;
        }
    }
}
