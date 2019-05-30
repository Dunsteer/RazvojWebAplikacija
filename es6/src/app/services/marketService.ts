import { Observable, from, range, zip } from "rxjs";
import { concatMap, map, filter, ignoreElements, retry, switchMap, take, takeLast } from "rxjs/operators";
import { SocketModel } from '../models/socketModel';
import { CurrencyModel } from '../models/currencyModel';
import { StatisticsModel } from '../models/statisticsModel';


export class MarketService {
    private _urlCurrency: string = 'http://localhost:3000/currencies';
    private _urlStatistics: string = 'http://localhost:3000/statistics';
    constructor() {

    }

    get() {
        return from(fetch(this._urlCurrency).then(res => res.json())).pipe(switchMap(x => x), map(x => new CurrencyModel(x)));
    }

    postStatistics(model: StatisticsModel) {
        return from(fetch(`${this._urlStatistics}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        }).then(res => res.json())).pipe(map(x => new StatisticsModel(x)));
    }

    connect() {
        const $obsPrice = this.randomNumberObservable().pipe(
            map((x: number) => {
                if (this.getRandomNumber() % 2 == 0) {
                    return x * -1;
                } else {
                    return x;
                }
            }),
            filter(x => x > -50 && x < 50)
        )

        const $obsD = this.randomNumberObservable().pipe(
            map((x: number) => {
                return x % 10 / 100;
            }),
            map((x: number) => {
                if (this.getRandomNumber() % 2 == 0) {
                    return x * -1;
                } else {
                    return x;
                }
            })
        )

        const $obsW = this.randomNumberObservable().pipe(
            map((x: number) => {
                return x % 10 / 100;
            }),
            map((x: number) => {
                if (this.getRandomNumber() % 2 == 0) {
                    return x * -1;
                } else {
                    return x;
                }
            })
        )

        return zip($obsPrice, $obsD, $obsW).pipe(map(x => new SocketModel(x[0], x[1], x[2])));
        //return this.randomNumberObservable();
    }

    getStatistics(currencyId: number) {
        return from(fetch(`${this._urlStatistics}?currencyId=${currencyId}`).then(res => res.json())).pipe(switchMap(x => x), takeLast(30), map(x => new StatisticsModel(x)));
    }

    private randomNumberObservable() {
        return new Observable(sub => {
            let timeout = null;
            let that = this;

            (function push() {
                timeout = setTimeout(
                    () => {
                        sub.next(that.getRandomNumber());
                        push();
                    },
                    that.getRandomDelay()
                );
            })();
            return () => clearTimeout(timeout);
        });
    }

    private getRandomNumber() {
        return Math.floor(Math.random() * 100 % 100);
    }

    private getRandomDelay() {
        return Math.floor(Math.random() * 5000 % 5000);
    }


}