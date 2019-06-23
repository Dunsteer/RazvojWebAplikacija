import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';
import * as fromArticle from './article/article.reducer';
import * as fromOrder from './order/order.reducer';

export interface State {
  user: fromUser.State;
  article:fromArticle.State;
  order:fromOrder.State
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  article:fromArticle.reducer,
  order:fromOrder.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
