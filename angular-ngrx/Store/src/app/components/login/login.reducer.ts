import * as LoginActions from "./login.actions";
import { User } from "src/app/models/user";

export interface LoginState {
  loadingLogin: boolean;
  currentUser: User;
}

const initialState: LoginState = {
  loadingLogin: false,
  currentUser: null
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActions.Actions
): LoginState {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:{
      return {...state, currentUser: action.user};
    }

    case LoginActions.LOGOUT:{
      return {...state, currentUser: null,
      loadingLogin:false};
    }

    default:
      return { ...state };
  }
}
