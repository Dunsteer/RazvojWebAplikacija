import { components } from '../index';
import { from, of } from 'rxjs';
import { tap, map, merge, mergeMap, finalize, combineAll, last, buffer } from 'rxjs/operators';
import { Component } from './component';

export class Utility {
    domParser: DOMParser;

    componentObjects: Component[] = [];

    routerOutlet = null;

    routeObjects: any[];

    constructor(private components: any[], private bootstrap: any, private routes: any[]) {
        this.domParser = new DOMParser();
        this.components.forEach(x => {
            x.fileName = this.parseComponentName(x.name);
        });
        this.bootstrap.fileName = this.parseComponentName(this.bootstrap.name);

        this.loadComponents().then(() => {
            this.renderBootstrap();
            this.loadRoutes();
            this.navigateTo(document.location.pathname, true);

            window.onpopstate = (ev) => {
                if (ev.state)
                    this.navigateTo(ev.state['path'], true);
                else
                    this.navigateTo('/', true);
            }
        });
    }

    private parseComponentName(name: string): string {
        return name.charAt(0).toLowerCase() + name.slice(1, -9);
    }

    static fetchPartial(url: string) {
        return new Promise((resolve, reject) => {
            fetch(url).then(res => {
                if (res.ok) {
                    return res.text;
                }
                reject(res.statusText);
            }).then(html => {
                resolve(html);
            })
        })
    }

    loadComponents() {
        const pro = [];

        this.components.map(x => {
            pro.push(fetch(`./app/components/${x.fileName}/${x.fileName}.html`).then(res => res.text()).then(html => {
                if (!x.template)
                    x.template = this.domParser.parseFromString(html, 'text/html').body.firstChild;
                //console.log(x.template);
            }))
        })

        pro.push(fetch(`./app/${this.bootstrap.fileName}.html`).then(res => res.text()).then(html => {
            this.bootstrap.template = this.domParser.parseFromString(html, 'text/html').body.firstChild;
            //console.log(this.bootstrap.template);
        })
        )

        return Promise.all(pro);
    }

    renderBootstrap(): void {
        const app = document.querySelector(this.bootstrap.name);
        const appComponent = new this.bootstrap();
        //console.log(this.bootstrap.template);
        appComponent.dom = this.bootstrap.template.cloneNode(true);
        //console.log(appComponent.dom);
        app.appendChild(appComponent.dom);

        this.routerOutlet = appComponent.dom.querySelector('RouterOutlet');

        this.parseChildren(app);
    }

    public parseChildren(dom) {
        this.components.forEach(x => {

            const children = dom.querySelectorAll(x.name);

            children.forEach(y => {
                //console.log("parse", y);
                //if (y.innerHTML != "") return;
                const component = new x();

                component.dom = x.template.cloneNode(true);

                y.innerHTML = "";
                y.appendChild(component.dom);

                this.componentObjects.push(component);

                this.parseChildren(y);
            })
        })
    }

    loadRoutes() {
        this.routeObjects = [];

        this.routes.map(({ path, component }) => {
            //debugger;
            const comp = new component();
            this.routeObjects[path] = comp;
            comp.dom = component.template.cloneNode(true);
            this.parseChildren(comp.dom);
            //console.log(comp.dom);
        })

        const routerLinks = document.querySelectorAll('[navigate-to]');

        routerLinks.forEach(element => {
            const link = element.getAttribute('navigate-to');
            element.addEventListener('click', () => {
                this.navigateTo(link, false);
            })
        })
    }

    navigateTo(link: string, back: boolean = false, component: Component = null) {
        //console.log(link);
        this.routerOutlet.innerHTML = '';
        if (!component) {           
            if (!this.routeObjects[link]) link = '/';

            this.routerOutlet.appendChild(this.routeObjects[link].dom);

            this.parseChildren(this.routeObjects[link].dom);
        }
        else{
            this.routerOutlet.appendChild(component.dom);

            //this.parseChildren(component.dom);
        }

        if (!back)
            window.history.pushState({
                "path": link
            }, "", link);
    }
}