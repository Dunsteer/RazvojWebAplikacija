import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleService } from '../../data/article.service';

//import { UserSort } from '../../model/user-sort';
import { Article } from '../../models/article';
import { SetFilter } from './article-filter.actions';
import { selectFilter, selectFilteredItems, selectItemById } from './article-storage-selectors';
import { AddArticle, DeleteArticle, FetchArticles, UpdateArticle } from './article.actions';
import * as fromArticle from './article.reducer';
import { ArticleFilter } from '../../models/article.filter';
import { SetSort } from './article-sort.actions';
import { ArticleStorage } from 'src/app/service/article-storage';

@Injectable({
  providedIn: 'root'
})
export class ArticleStorageNgrxService implements ArticleStorage {

  filter$: Observable<ArticleFilter> = this.store.select(selectFilter);
  allItems$: Observable<Article[]> = this.store.select(selectFilteredItems);
  constructor(
    private backend: ArticleService,
    private store: Store<fromArticle.State>,
  ) {
  }

  loadItems(): void {
    //debugger;
    return this.store.dispatch(new FetchArticles());
  }
  getItem(id: number): Observable<Article> {
    return this.store.select(selectItemById(id));
  }
  addItem(item: Partial<Article>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      this.store.dispatch(new AddArticle({ article: addedItem }));
    });
  }
  updateItem(item: Partial<Article>): void {
    this.backend.updateOne(item.id,item).subscribe(updatedItem => {
      this.store.dispatch(new UpdateArticle({
        article: {
          id: updatedItem.id,
          changes: { ...updatedItem, selectedNumber: 0 }
        }
      }));
    });
  }
  removeItem(id: number): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.store.dispatch(new DeleteArticle({ id }));
    });
  }
  setSortField(field: string): void {
    this.store.dispatch(new SetSort({ field }));
  }
  setFilter(filter: ArticleFilter): void {
    this.store.dispatch(new SetFilter({ filter }));
  }
}
