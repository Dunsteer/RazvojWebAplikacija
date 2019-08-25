import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  fetch(search): Observable<any> {
    return this._http.get<any>(`${environment.apiURL}/users`,{params:search});
  }
}
