

export class CurrencyModel {
    id: number;
    code: string;
    name: string;
    price: number;
    marketPrice: string;
    volume: string;
    d: number;
    w: number;
    constructor(currency = null) {
        if (currency) {
            this.id = currency.id;
            this.code = currency.code;
            this.name = currency.name;
            this.price = currency.price;
            this.marketPrice = currency.marketPrice;
            this.volume = currency.volume;
            this.d = currency.d;
            this.w = currency.w;
        }
    }
}