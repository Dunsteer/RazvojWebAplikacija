import { CurrencyModel } from './currencyModel';

export class StatisticsModel {
    id: number;
    currencyId: number;
    currency: CurrencyModel;
    constructor(statistics = null) {
        if (statistics) {
            this.id = statistics.id;
            this.currencyId = statistics.currencyId;
            this.currency = new CurrencyModel(statistics.currency);
        }
    }
}