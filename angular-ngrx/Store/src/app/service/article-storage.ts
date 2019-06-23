import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleFilter } from '../models/Article.filter';
//import { ArticleSort } from '../model/Article-sort';
import { Article } from '../models/Article';

export interface ArticleStorage {

  filter$: Observable<ArticleFilter>;

  allItems$: Observable<Article[]>;

  loadItems(): void;
  getItem(id: number): Observable<Article>;
  addItem(item: Partial<Article>): void;
  removeItem(id: number): void;
  setSortField(field: string): void;
  setFilter(filter: ArticleFilter): void;
}

export const ARTICLE_STORAGE = new InjectionToken<ArticleStorage>('article.storage');
