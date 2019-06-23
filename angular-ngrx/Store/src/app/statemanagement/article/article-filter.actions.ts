import { Action } from '@ngrx/store';
import { ArticleFilter } from '../../models/article.filter';

export enum FilterActionTypes {
  SetFilter = '[Filter] Set Filter'
}

export class SetFilter implements Action {
  readonly type = FilterActionTypes.SetFilter;
  constructor(public payload: { filter: ArticleFilter }) {}
}

export type FilterActions = SetFilter;
