import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

  export const FETCH = "[LOGIN] Fetch login";
  export const FETCH_SUCCESS = "[LOGIN] Fetch login success";
  export const LOGIN = "[LOGIN] Login";
  export const LOGIN_SUCCESS = "[LOGIN] Login success";


  export class Fetch implements Action {
	readonly type = FETCH;

	constructor(public search: any) { }
  }

  export class FetchSuccess implements Action {
	readonly type = FETCH_SUCCESS;

	constructor(public list: any[]) {}
  }

  export class Login implements Action{
    readonly type = LOGIN;

    constructor (public user: User){}
  }

  export class LoginSuccess implements Action{
    readonly type = LOGIN_SUCCESS;

    constructor(public user :User){}
  }

  export type Actions =
	Fetch | FetchSuccess|Login|LoginSuccess
