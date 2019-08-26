import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

  export const LOGOUT = "[LOGOUT] Logout";
  export const LOGIN = "[LOGIN] Login";
  export const LOGIN_SUCCESS = "[LOGIN] Login success";

  export class Login implements Action{
    readonly type = LOGIN;

    constructor (public user: User){}
  }

  export class LoginSuccess implements Action{
    readonly type = LOGIN_SUCCESS;

    constructor(public user :User){}
  }

  export class Logout implements Action{
    readonly type= LOGOUT;
  }

  export type Actions =
	|Login|LoginSuccess|Logout;
