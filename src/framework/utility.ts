import { components } from '../index';
import { from, of } from 'rxjs';
import { tap, map, merge, mergeMap, finalize, combineAll, last, buffer } from 'rxjs/operators';
import { Component } from './component';
import { resolve } from 'dns';
import { rejects } from 'assert';

export class Utility {
    domParser: DOMParser;

    componentObjects: Component[] = [];

    constructor(private components: any[], private bootstrap: any) {
        this.domParser = new DOMParser();
        this.components.forEach(x => {
            x.fileName = this.parseComponentName(x.name);
        });
        this.bootstrap.fileName = this.parseComponentName(this.bootstrap.name);
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

        pro.push(new Promise((resolve, reject) => {
            from(this.components).subscribe(x => {
                fetch(`./app/components/${x.fileName}/${x.fileName}.html`).then(res => res.text()).then(html => {
                    x.template = this.domParser.parseFromString(html, 'text/html').body.firstChild;
                    resolve();
                })
            });
        }))

        pro.push(new Promise((resolve, reject) => {
            fetch(`./app/${this.bootstrap.fileName}.html`).then(res => res.text()).then(html => {
                const dom = this.domParser.parseFromString(html, 'text/html');
                this.bootstrap.template = dom.body.firstChild;

                console.log(this.bootstrap.template);
                resolve();
            })
        }))

        return Promise.all(pro);
    }

    renderBootstrap(): void {
        const app = document.querySelector(this.bootstrap.name);
        const appComponent = new this.bootstrap();
        //console.log(this.bootstrap.template);
        appComponent.dom = this.bootstrap.template.cloneNode(true);
        //console.log(appComponent.dom);
        app.appendChild(appComponent.dom);
        this.parseChildren(app);
    }

    private parseChildren(dom) {
        this.components.forEach(x => {

            const children = dom.querySelectorAll(x.name);

            children.forEach(y => {

                const component = new x();

                component.dom = x.template.cloneNode(true);

                y.innerHTML = "";
                y.appendChild(component.dom);

                this.componentObjects.push(component);

                this.parseChildren(y);
                console.log(y);
            })
        })
    }
}