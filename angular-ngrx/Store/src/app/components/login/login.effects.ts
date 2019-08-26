import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/statemanagement/index";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { ofType, Actions, Effect } from "@ngrx/effects";
import { map, delay, switchMap, catchError } from "rxjs/operators";

import * as LoginActions from "./login.actions";
import * as ErrorActions from "@shared/actions/error.actions";

import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {
  constructor(
    private _actions: Actions,
    private _store: Store<State>,
    private _toastr: ToastrService,
    private _router: Router,
    private _logins: LoginService
  ) {}

  @Effect()
  login: Observable<
    ErrorActions.Set | LoginActions.LoginSuccess
  > = this._actions.pipe(
    ofType(LoginActions.LOGIN),
    map((action: LoginActions.Login) => action.user),
    switchMap(user => {
      return this._logins.fetch({ username: user.username }).pipe(
        map(res => {
          if (
            res &&
            res.length == 1 &&
            user.username == res[0].username &&
            user.password == res[0].password
          ) {
            return new LoginActions.LoginSuccess(res[0]);
          } else {
            throw new Error("Incorrect username or password.");
          }
        }),
        catchError(err => {
          console.log(err);
          return of(
            new ErrorActions.Set({
              message: "Incorrect username or password.",
              type: "LOGIN_FAILURE"
            })
          );
        })
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess: Observable<void> = this._actions.pipe(
    ofType<LoginActions.LoginSuccess>(LoginActions.LOGIN_SUCCESS),
    map((action: LoginActions.LoginSuccess) => {
      if (!localStorage.getItem("id"))
        localStorage.setItem("id", action.user.id.toString());
      this._router.navigate([""]);

      //return new LoginActions.GetCurrentSuccess(action.user as User);
    })
  );

  @Effect({ dispatch: false })
  logout: Observable<void> = this._actions.pipe(
    ofType<LoginActions.Login>(LoginActions.LOGOUT),
    map(action => {
      if (localStorage.getItem("id")) localStorage.removeItem("id");
      this._router.navigate(["/login"]);
    })
  );
}
