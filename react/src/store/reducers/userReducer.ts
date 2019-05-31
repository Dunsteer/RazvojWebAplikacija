import { FETCH_USERS,FETCH_USER, NEW_USER, CHANGE_STATE } from '../actions/types';
import { ChangeState, GetUser } from '../actions/userActions';
import { User } from '../../models/User';

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action:any) {
  switch (action.type) {
    case FETCH_USER: {
      const {id} = action as GetUser;
      console.log("SAGA "+id);
      return state.users.filter((user: User) => user.userId === id);
  }
  case CHANGE_STATE: {
      const { users } = (action as ChangeState);
      const state = users;
      return state;
  }
  default:
      return state; 
  }
}