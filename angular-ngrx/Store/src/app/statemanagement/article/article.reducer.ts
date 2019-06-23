import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { FilterActionTypes } from './article-filter.actions';
import { SortActionTypes } from './article-sort.actions';
import { ArticleActions, ArticleActionTypes } from './article.actions';
import { Article } from './article.model';
import { ArticleFilter } from '../../models/article.filter';

export interface State extends EntityState<Article> {
  filter: ArticleFilter;
  // sort: ArticleSort;
}

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export const initialState: State = adapter.getInitialState({
  //additional entity state properties
  filter: {
    name:null
  },
  // sort: {field: 'name', ascending: true },
});

export function reducer( state = initialState,action: ArticleActions): State {
  switch (action.type) {
    case ArticleActionTypes.AddArticle: {
      return adapter.addOne(action.payload.article, state);
    }

    case ArticleActionTypes.UpdateArticle: {
      return adapter.updateOne(action.payload.article, state);
    }

    case ArticleActionTypes.DeleteArticle: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ArticleActionTypes.LoadArticles: {
      return adapter.addAll(action.payload.articles, state);
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

export const selectArticleState = createFeatureSelector<State>('article');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectArticleState);
