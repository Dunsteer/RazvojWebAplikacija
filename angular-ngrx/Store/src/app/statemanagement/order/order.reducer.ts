import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { FilterActionTypes } from './order-filter.actions';
import { SortActionTypes } from './order-sort.actions';
import { OrderActions, OrderActionTypes } from './order.actions';
import { Order } from './order.model';
import { OrderFilter } from '../../models/order.filter';

export interface State extends EntityState<Order> {
  filter: OrderFilter;
  // sort: OrderSort;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  //additional entity state properties
  filter: {
    name:null
  },
  // sort: {field: 'name', ascending: true },
});

export function reducer( state = initialState,action: OrderActions): State {
  switch (action.type) {
    case OrderActionTypes.AddOrder: {
      return adapter.addOne(action.payload.order, state);
    }

    case OrderActionTypes.UpdateOrder: {
      return adapter.updateOne(action.payload.order, state);
    }

    case OrderActionTypes.DeleteOrder: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrderActionTypes.LoadOrders: {
      return adapter.addAll(action.payload.orders, state);
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

export const selectOrderState = createFeatureSelector<State>('order');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectOrderState);
