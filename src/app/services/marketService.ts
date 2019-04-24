import { Observable,from } from "rxjs";


export class MarketService {
    private _url :string = 'http://localhost:3000/currencies';
    constructor(){

    }

    get(){
        return Observable.create(o=>{
            fetch(this._url).then(res=>res.json()).then(array=>{
                array.map(x=>o.next(x));
                o.complete();
            });
        });
    }
}