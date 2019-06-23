import { createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { filterData } from '../../models/user.functions';

export const selectFilter = createSelector(fromUser.selectUserState, state => state.filter);

export const selectItemById = (id: number) => createSelector(fromUser.selectEntities, entities => entities[id]);

export const selectFilteredItems = createSelector(fromUser.selectAll, selectFilter, (items, filter) => {
  return filterData(items, filter);
});
