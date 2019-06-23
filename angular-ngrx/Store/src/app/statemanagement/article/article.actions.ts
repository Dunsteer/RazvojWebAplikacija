import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { FilterActions } from './article-filter.actions';
import { SortActions } from './article-sort.actions';
import { Article } from './article.model';

export enum ArticleActionTypes {
  LoadArticles = '[Article] Load Articles',
  AddArticle = '[Article] Add Article',
  UpdateArticle = '[Article] Update Article',
  DeleteArticle = '[Article] Delete Article',
  FetchArticles = '[Article] Fetch Articles',
}

export class LoadArticles implements Action {
  readonly type = ArticleActionTypes.LoadArticles;

  constructor(public payload: { articles: Article[] }) {}
}

export class AddArticle implements Action {
  readonly type = ArticleActionTypes.AddArticle;

  constructor(public payload: { article: Article }) {}
}

export class UpdateArticle implements Action {
  readonly type = ArticleActionTypes.UpdateArticle;

  constructor(public payload: { article: Update<Article> }) {}
}

export class DeleteArticle implements Action {
  readonly type = ArticleActionTypes.DeleteArticle;

  constructor(public payload: { id: number }) {}
}

export class FetchArticles implements Action {
  readonly type = ArticleActionTypes.FetchArticles;
}

export type ArticleActions =
 LoadArticles
 | AddArticle
 | UpdateArticle
 | DeleteArticle
 | FetchArticles
 | SortActions
 | FilterActions;
