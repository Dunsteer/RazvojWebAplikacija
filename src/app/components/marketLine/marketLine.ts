import { Component } from '../../../framework/component';

export class MarketLineComponent extends Component {
    static createTr() {
        const tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = `{{{currency.id}}}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `<div>
                            <strong>{{{currency.code}}}</strong>
                        </div>
                        <div>
                            <small>{{{currency.name}}}</small>
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

    static template = MarketLineComponent.createTr();

    constructor(public currency,parentDom) {
        super();
        this.dom=parentDom;

        setTimeout(()=>{
            //console.log(this.currency);
            this.currency.price = 100000000;
            this.reloadBinds();
        },2500)
    }
}