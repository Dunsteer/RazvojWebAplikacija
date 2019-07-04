import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { fillProperties } from '@angular/core/src/util/property';

import { createArticle, Article } from '../models/Article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private environmentUrl = "http://localhost:3300/articles"

  constructor(private _http: HttpClient, private _router: Router) {

  }
  getAll(): Observable<Article[]> {
    console.log('ArticleService: GET All');
    return this._http.get<Article[]>(this.environmentUrl);
  }

  addOne(item: Partial<Article>): Observable<Article> {
    console.log('ArticleService: POST One');
    const newItem: Article = {
      ...createArticle(),
      ...item
    };

    return this._http.post<Article>(this.environmentUrl,newItem);
  }

  updateOne(id: number, item: Partial<Article>): Observable<Article> {
    console.log('ArticleService: PUT One');

    return this._http.put<Article>(`${this.environmentUrl}/${id}`,{...item,id});
  }

  removeOne(id: number): Observable<Article> {
    console.log('ArticleService: DELETE One');

    return this._http.delete<Article>(`${this.environmentUrl}/${id}`);
  }
}
