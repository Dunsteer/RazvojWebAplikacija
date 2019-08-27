const saferEval = require('safer-eval');
const numeral = require('numeral');

export class Component {
    _dom: HTMLElement = null;

    static template: HTMLElement;

    private _variables: NodeListOf<Element>;


    protected children = [];


    constructor() {

    }

    get dom() {
        return this._dom;
    }

    set dom(value: HTMLElement) {
        this._dom = value;

        this.loadBinds();
        this.loadEvents();
    }

    private loadBinds() {
        let inner = this._dom.innerHTML;
        let regEx = new RegExp('{{{?(#[A-Za-z]+ )?[A-Za-z]+.[A-Za-z]*}}}', 'g');

        inner = inner.replace(regEx, (variable) => {
            if (variable) {
                variable = variable.replace(/{/g, '').replace(/}/g, '');
                let valstr = '';
                let val;
                try {
                    valstr = saferEval(variable, this);
                    val = parseFloat(valstr);
                    if (!isNaN(val)) {
                        val = numeral(val).format('0,0.00 a');
                    }
                    else {
                        val = valstr;
                    }
                }
                catch (err) {
                    val = err;
                }

                return `<app-variable variable-name="${variable}">${val}</app-variable>`;
            }
        });

        regEx = new RegExp('{{?(#[A-Za-z]+ )?[A-Za-z]+.[A-Za-z]*}}', 'g');

        inner = inner.replace(regEx, (variable) => {
            if (variable) {
                variable = variable.replace(/{/g, '').replace(/}/g, '');

                return `${saferEval(variable, this)}`;
            }
        });

        this._dom.innerHTML = inner;

        this._variables = this._dom.querySelectorAll('app-variable');
    }

    protected reloadBinds() {
        if (this._variables) {
            this._variables.forEach(x => {
                const variable = x.attributes.getNamedItem('variable-name').value;
                const valstr = saferEval(variable, this);
                let val = parseFloat(valstr);

                if (!isNaN(val)) {
                    val = numeral(val).format('0,0.00 a');

                    x.innerHTML = val + "";
                }
                else {
                    x.innerHTML = valstr;
                }
            })
        }
    }

    private loadEvents() {
        const events: string[] = [
            'click'
        ];
        if (this._dom) {
            events.forEach((ev) => {
                const events = this._dom.querySelectorAll('[f-event]');

                events.forEach(elem => {
                    let event = elem.getAttribute(`f-event-${ev}`);
                    if (event) {
                        elem.addEventListener(ev, (e) => {
                            this[event]();
                        })
                    }
                })

                let event = this._dom.getAttribute(`f-event-${ev}`);
                if (event) {
                    this._dom.addEventListener(ev, (e) => {
                        this[event]();
                    });
                }
            })
        }
    }
}