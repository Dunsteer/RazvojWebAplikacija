import { NavbarComponent } from './app/components/navbar/navbar';
import { Utility } from './framework/utility';
import { Component } from './framework/component';
import { AppComponent } from './app/app';
import { async } from 'rxjs/internal/scheduler/async';
import { TestComponent } from './app/components/test/test';
import { MarketComponent } from './app/components/market/market';
import { MarketLineComponent } from './app/components/marketLine/marketLine';
import {MarketService} from './app/services/marketService';

export const components = [
    NavbarComponent,
    TestComponent,
    MarketComponent,
    MarketLineComponent
];

const bootstrap = AppComponent;
const routes = [
    { path: "/", component: TestComponent },
    { path: "/asd", component: MarketComponent }
];

(async function () {
    let utility = new Utility(components, bootstrap, routes);
})();

let service = new MarketService();

service.get().subscribe(x=>console.log(x));

