const saferEval = require('safer-eval');


export class Component {
    _dom = null;
    private _variables: HTMLElement[];
    test = "hahaha";

    constructor() {
    }

    get dom() {
        return this._dom;
    }

    set dom(value: HTMLElement) {
        this._dom = this.loadBinds(value);
    }

    private loadBinds(value: HTMLElement): HTMLElement {
        let regEx = new RegExp('{{{?(#[a-z]+ )?[a-z]+.[a-z]*}?}}', 'g');

        let html = value.innerHTML.replace(regEx, (variable) => {
            variable = variable.replace(/{/g, '').replace(/}/g, '');

            return `<app-variable name="${variable}">${this[variable]}</app-variable>`;
        });

        let inner = new DOMParser().parseFromString(html, 'text/html').body;

        value.innerHTML = '';

        inner.childNodes.forEach(x => {
            value.appendChild(x);
        })

        return value;
    }
}