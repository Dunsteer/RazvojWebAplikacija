import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { fillProperties } from '@angular/core/src/util/property';

import { createUser, User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private environmentUrl = "http://localhost:3300/users"

  constructor(private _http: HttpClient, private _router: Router) {

  }
  getAll(): Observable<User[]> {
    console.log('UserService: GET All');
    return this._http.get<User[]>(this.environmentUrl);
  }

  addOne(item: Partial<User>): Observable<User> {
    console.log('UserService: POST One');
    const newItem: User = {
      ...createUser(),
      ...item
    };

    return this._http.post<User>(this.environmentUrl,newItem);
  }

  updateOne(id: number, item: Partial<User>): Observable<User> {
    console.log('UserService: PUT One');

    return this._http.put<User>(this.environmentUrl,{...item,id});
  }

  removeOne(id: number): Observable<User> {
    console.log('UserService: DELETE One');

    return this._http.delete<User>(`this.environmentUrl/${id}`);
  }
}
