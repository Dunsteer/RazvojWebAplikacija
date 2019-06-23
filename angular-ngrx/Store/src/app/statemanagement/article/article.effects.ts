import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { ArticleService } from '../../data/article.service';
import { LoadArticles, ArticleActionTypes } from './article.actions';


@Injectable()
export class ArticleEffects {

  @Effect()
  fetchArticles$ = this.actions$.pipe(
    ofType(ArticleActionTypes.FetchArticles),
    take(1),
    switchMap(() => this.backend.getAll()),
    map(articles => new LoadArticles({ articles })),
  );

  constructor(
    private actions$: Actions,
    private backend: ArticleService,
  ) { }
}
