import { Component } from '../../../framework/component';
import { MarketService } from '../../services/marketService';
import { MarketLineComponent } from '../marketLine/marketLine';

export class MarketComponent extends Component {

    _service: MarketService;
    constructor() {
        super();

        this._service = new MarketService();
        
        this._service.get().subscribe(currency => {
            let doc = this._dom.querySelector('table tbody');

            let dom = MarketLineComponent.template.cloneNode(true);
            doc.appendChild(dom);

            const line = new MarketLineComponent(currency, dom);
            this.children.push(line);
        })
    }
}