import { Action } from '@ngrx/store';
import { UserFilter } from '../../models/user.filter';

export enum FilterActionTypes {
  SetFilter = '[Filter] Set Filter'
}

export class SetFilter implements Action {
  readonly type = FilterActionTypes.SetFilter;
  constructor(public payload: { filter: UserFilter }) {}
}

export type FilterActions = SetFilter;
