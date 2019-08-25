import * as LoginActions from "./login.actions";
import { User } from "src/app/models/user";

export interface LoginState {
  loadingLogin: boolean;
  list: any[];
  currentUser: User;
}

const initialState: LoginState = {
  list: [],
  loadingLogin: false,
  currentUser: null
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActions.Actions
): LoginState {
  switch (action.type) {
    case LoginActions.FETCH:
      return { ...state, list: [], loadingLogin: true };
    case LoginActions.FETCH_SUCCESS:
      return { ...state, list: action.list, loadingLogin: false };

    case LoginActions.LOGIN_SUCCESS:{
      return {...state, currentUser: action.user};
    }

    default:
      return { ...state };
  }
}
