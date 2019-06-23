import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { FilterActionTypes } from './user-filter.actions';
import { SortActionTypes } from './user-sort.actions';
import { UserActions, UserActionTypes } from './user.actions';
import { User } from './user.model';
import { UserFilter } from 'src/app/models/user.filter';

export interface State extends EntityState<User> {
  filter: UserFilter;
  // sort: UserSort;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  //additional entity state properties
  filter: {
    username:null
  },
  // sort: {field: 'username', ascending: true },
});

export function reducer( state = initialState,action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.AddUser: {
      return adapter.addOne(action.payload.user, state);
    }

    case UserActionTypes.UpdateUser: {
      return adapter.updateOne(action.payload.user, state);
    }

    case UserActionTypes.DeleteUser: {
      return adapter.removeOne(action.payload.id, state);
    }

    case UserActionTypes.LoadUsers: {
      return adapter.addAll(action.payload.users, state);
    }

    case FilterActionTypes.SetFilter: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    // case SortActionTypes.SetSort: {
    //   return {
    //     ...state,
    //     sort: {
    //       ...state.sort,
    //       field: action.payload.field,
    //       ascending: state.sort.field === action.payload.field ? !state.sort.ascending : true,
    //     }
    //   };
    // }

    default: {
      return state;
    }
  }
}

export const selectUserState = createFeatureSelector<State>('user');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectUserState);
