import { createSelector } from '@ngrx/store';
import * as fromOrder from './order.reducer';
import { filterData } from '../../models/order.functions';

export const selectFilter = createSelector(fromOrder.selectOrderState, state => state.filter);

export const selectItemById = (id: number) => createSelector(fromOrder.selectEntities, entities => entities[id]);

export const selectFilteredItems = createSelector(fromOrder.selectAll, selectFilter, (items, filter) => {
  return filterData(items, filter);
});
