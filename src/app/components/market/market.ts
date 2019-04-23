import { Component } from '../../../framework/component';

export class MarketComponent extends Component {
    test = "hahaha";

    constructor(){        
        super();
        
        setTimeout(()=>{
            this.test = "xD";
            this.reloadBinds();
        },1000);
    }
}