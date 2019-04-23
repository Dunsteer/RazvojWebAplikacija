const saferEval = require('safer-eval');


export class Component {
    _dom = null;

    static template:HTMLElement;

    private _variables: HTMLElement[];


    constructor() {
        
    }

    get dom() {
        return this._dom;
    }

    set dom(value: HTMLElement) {
        this._dom = value;

        this.loadBinds();
        this.loadEvents();
        this.loadChildren();
    }

    private loadBinds() {
        let inner = this._dom.innerHTML;
        let regEx = new RegExp('{{{?(#[a-z]+ )?[a-z]+.[a-z]*}?}}', 'g');

        inner = inner.replace(regEx, (variable) => {
            variable = variable.replace(/{/g, '').replace(/}/g, '');

            return `<app-variable variable-name="${variable}">${this[variable]}</app-variable>`;
        });

        this._dom.innerHTML = inner;

        this._variables = this._dom.querySelectorAll('app-variable');
        console.log(this._variables);
    }

    private loadChildren(){
        
    }

    protected reloadBinds() {
        if(this._variables){
            this._variables.forEach(x=>{
                const variable = x.attributes.getNamedItem('variable-name').value;
                x.innerHTML = this[variable];
            })
        }
    }

    private loadEvents() {

    }

    private parseString(value: string): HTMLElement {
        const html = new DOMParser().parseFromString(value, 'text/html').body;
        html.childNodes.forEach(element => {

        });

        return html;
    }
}