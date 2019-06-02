import { FETCH_USERS, FETCH_USER, NEW_USER, CHANGE_STATE, CURRENT_USER, NEW_USER_SUCCESS, FETCH_USER_USERNAME, PATCH_USER_SUCCESS } from '../actions/types';
import { ChangeState, GetUser, AddUser, CurrentUser, PatchUser } from '../actions/userActions';
import { User } from '../../models/User';
import { Action } from 'redux';
import UserComponent from '../../components/UserComponent';
import Cookies from 'universal-cookie';

interface usersState {
  users?: User[];
  user?: User;
}

const initialState: usersState = {
  users: new Array<User>()
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case FETCH_USER: {
      const { id } = action as GetUser;
      return {
        ...state,
        users: state.users.filter((user: User) => user.id === id)
      };
    }
    case FETCH_USERS: {
      return state;
    }
    case NEW_USER_SUCCESS: {
      const { user } = action as AddUser;
      const users = [...state.users, user];

      return { ...state, users: users };
    }
    case CHANGE_STATE: {
      const { users } = (action as ChangeState);
      const stateasd = users;
      return {
        ...state,
        users: stateasd
      };
    }
    case CURRENT_USER: {
      const cookies = new Cookies();
      var username = cookies.get('logedIn');
      return {
        ...state,
        user: state.users.filter((user: User) => user.username === username).pop()
      };
    }

    case PATCH_USER_SUCCESS:{
      const { user } = action as PatchUser;
      let users = state.users.map(x=>{
        if(x.username == user.username){
          x.logs = user.logs;
        }
        return x;
      })
      return {
        ...state,
        users,
        user:user
      }
    }
    default:
      return state;
  }
}