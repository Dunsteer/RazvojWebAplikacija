import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as fromUser from "./user/user.reducer";
import * as fromArticle from "./article/article.reducer";
import * as fromOrder from "./order/order.reducer";
import * as fromLogin from "src/app/components/login/login.reducer";

export interface State {
  user: fromUser.State;
  article: fromArticle.State;
  order: fromOrder.State;
  auth: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  article: fromArticle.reducer,
  order: fromOrder.reducer,
  auth: fromLogin.loginReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
