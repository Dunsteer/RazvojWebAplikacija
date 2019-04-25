import { Component } from '../../../framework/component';
import { MarketService } from '../../services/marketService';
import { SocketModel } from '../../models/socketModel';
import { CurrencyModel } from '../../models/currencyModel';

export class StatisticsLineComponent extends Component {
    static createTr() {
        const tr = document.createElement('tr');

        let td = document.createElement('td');
        td.innerHTML = `{{currency.id}}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `<div>
                            <strong>{{currency.code}}</strong>
                        </div>
                        <div>
                            <small>{{currency.name}}</small>
                        </div>`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `\${{{currency.price}}}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `\${{{currency.marketPrice}}}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `\${{{currency.volume}}}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `<div>
                            {{{currency.d}}}% D
                        </div>
                        <div>
                            {{{currency.w}}}% W
                        </div>`;
        tr.appendChild(td);
        return tr;
    }

    static template = StatisticsLineComponent.createTr();
    private _marketService: MarketService;

    constructor(public currency, parentDom) {
        super();
        this.dom = parentDom;
        //this._marketService = new MarketService();
        //this._marketService.connect().subscribe((model) => this.onSocketReceive(model));
    }

    onSocketReceive(model: SocketModel) {

        if (model && this.currency) {
            if(this.currency.price + model.price>0)
            this.currency.price += model.price;
            this.currency.d += model.d;
            this.currency.w += model.w;
            this.normaliezeCurrency();
            
            this.reloadBinds();
        }

    }

    private normalizeNumber(number){
        return Math.round(number * 100) / 100;
    }

    private normaliezeCurrency(){
        for(let key in this.currency){
            if(this.currency[key] instanceof Number){
                this.currency[key] =this.normalizeNumber(this.currency[key]);
            }
        }
    }

    onClick(){
        console.log('clicked',this.currency.id);
    }
}