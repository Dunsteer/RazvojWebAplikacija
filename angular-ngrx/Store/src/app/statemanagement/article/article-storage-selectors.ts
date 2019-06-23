import { createSelector } from '@ngrx/store';
import * as fromArticle from './article.reducer';
import { filterData } from '../../models/article.functions';

export const selectFilter = createSelector(fromArticle.selectArticleState, state => state.filter);

export const selectItemById = (id: number) => createSelector(fromArticle.selectEntities, entities => entities[id]);

export const selectFilteredItems = createSelector(fromArticle.selectAll, selectFilter, (items, filter) => {
  return filterData(items, filter);
});
