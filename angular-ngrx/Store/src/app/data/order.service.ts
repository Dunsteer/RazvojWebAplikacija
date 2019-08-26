import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order, createOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private environmentUrl = "http://localhost:3300/orders";

  constructor(private _http: HttpClient, private _router: Router) {

  }
  getAll(): Observable<Order[]> {
    console.log('OrderService: GET All');
    return this._http.get<Order[]>(this.environmentUrl);
  }

  addOne(item: Partial<Order>): Observable<Order> {
    console.log('OrderService: POST One');
    const newItem: Order = {
      ...createOrder(),
      ...item
    };

    return this._http.post<Order>(this.environmentUrl,newItem);
  }

  updateOne(id: number, item: Partial<Order>): Observable<Order> {
    console.log('OrderService: PUT One');

    return this._http.patch<Order>(`${this.environmentUrl}/${id}`,{...item,id});
  }

  removeOne(id: number): Observable<Order> {
    console.log('OrderService: DELETE One');

    return this._http.delete<Order>(`${this.environmentUrl}/${id}`);
  }
}
