import { NavbarComponent } from './app/components/navbar/navbar';
import { Utility } from './framework/utility';
import { Component } from './framework/component';
import { AppComponent } from './app/app';
import { async } from 'rxjs/internal/scheduler/async';
import { TestComponent } from './app/components/test/test';
import { MarketComponent } from './app/components/market/market';

export const components = [
    NavbarComponent,
    TestComponent,
    MarketComponent
];

const bootstrap = AppComponent;
const routes = [
    { path: "/", component: TestComponent },
    { path: "/asd", component: MarketComponent }
];

(async function () {
    let utility = new Utility(components, bootstrap, routes);
})();

