import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { ArticleFilter } from '../model/Article-filter.enum';
// import { ArticleSort } from '../model/Article-sort';
import { Article } from '../models/Article';
import { ArticleStorage, ARTICLE_STORAGE} from './article-storage';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles$: Observable<Article[]> = this.storage.allItems$;
  //sort$: Observable<ArticleSort> = this.storage.sort$;
  filter$: Observable<string> = this.storage.filter$.pipe(map(
    filter => filter.name
  ));

  constructor(
    @Inject(ARTICLE_STORAGE) private storage: ArticleStorage
  ) { }

  loadItems(): void {
    return this.storage.loadItems();
  }

  getItem(id: number): Observable<Article> {
    return this.storage.getItem(id);
  }

  addItem(item: Partial<Article>) {
    this.storage.addItem(item);
  }

  removeItem(id: number) {
    this.storage.removeItem(id);
  }

  setSortField(field: string) {
    this.storage.setSortField(field);
  }

  setFilterString(stringValue: string) {
    switch (stringValue) {
      case 'all':
      default:
        this.storage.setFilter({name:stringValue});
        break;
    }
  }
}
