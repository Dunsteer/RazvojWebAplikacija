import { Component } from '../../../framework/component';
import { MarketService } from '../../services/marketService';
import { StatisticsLineComponent } from '../statisticsLine/statisticsLine';

export class StatisticsComponent extends Component {
    _service: MarketService;
    constructor(public currency, dom) {
        super();

        this.dom = dom;

        this._service = new MarketService();

        this._service.getStatistics(currency.id).subscribe(stat => {
            let doc = this._dom.querySelector('table tbody');

            let dom = StatisticsLineComponent.template.cloneNode(true);
            doc.appendChild(dom);

            console.log(currency);
            const line = new StatisticsLineComponent(stat.currency, dom);
            this.children.push(line);
        })
    }
}