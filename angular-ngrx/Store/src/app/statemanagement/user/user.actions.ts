import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { FilterActions } from './user-filter.actions';
import { SortActions } from './user-sort.actions';
import { User } from './user.model';
import { Article } from '../article/article.model';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  AddUser = '[User] Add User',
  AddToCart = '[User] Add To Cart',
  UpdateUser = '[User] Update User',
  DeleteUser = '[User] Delete User',
  FetchUsers = '[User] Fetch Users',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;

  constructor(public payload: { users: User[] }) {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;

  constructor(public payload: { user: User }) {}
}

export class AddToCart implements Action{
  readonly type = UserActionTypes.AddToCart;

  constructor(public payload: { article:Article }) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;

  constructor(public payload: { user: Update<User> }) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;

  constructor(public payload: { id: number }) {}
}

export class FetchUsers implements Action {
  readonly type = UserActionTypes.FetchUsers;
}

export type UserActions =
 LoadUsers
 | AddUser
 | UpdateUser
 | DeleteUser
 | FetchUsers
 | SortActions
 | FilterActions;
