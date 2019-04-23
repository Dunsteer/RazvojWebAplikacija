import { NavbarComponent } from './app/components/navbar/navbar';
import { Utility } from './framework/utility';
import { Component } from './framework/component';
import { AppComponent } from './app/app';
import { async } from 'rxjs/internal/scheduler/async';
import { TestComponent } from './app/components/test/test';

export const components = [
    NavbarComponent,
    TestComponent
];

const bootstrap = AppComponent;

(async function () {
    let utility = new Utility(components, bootstrap);
    await utility.loadComponents();
    utility.renderBootstrap();
})();

