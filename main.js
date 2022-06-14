const template = document.createElement('template');
template.innerHTML = `
  <div>
    <input id="text1" />
    <input id="text2" />
    <button id="button">add</button>
 </div>
`;

class AdditionWebcomponent extends HTMLElement {
    constructor() {
        super();

        const rootEl = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        rootEl.querySelector('#button').addEventListener('click',
            () => {
                const input1 = this.shadowRoot.getElementById('text1').value;
                const input2 = this.shadowRoot.getElementById('text2').value;
                const input3 = parseInt(input1) + parseInt(input2);
                var addEvent = new CustomEvent("add", { bubbles: true, cancelable: true, composed: true, detail: { total: input3 } });
                if (this.dispatchEvent(addEvent)) {
                }
            });
        this._onAddFn = null;
    }

    static get observedAttributes() {
        return ['onadd'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'onadd' && oldVal !== newVal) {
            if (newVal === null) {
                this.onadd = null;
            }
            else {
                this.onadd = Function(`return function onadd(event) {\n\t${newVal};\n};`)();
            }
        }
    }

    get onadd() {
        return this._onAddFn;
    }
    set onadd(handler) {
        if (this._onAddFn) {
            this.removeEventListener('add', this._onAddFn);
            this._onAddFn = null;
        }

        if (typeof handler === 'function') {
            this._onAddFn = handler;
            this.addEventListener('add', this._onAddFn);
        }
    }

}

window.customElements.define('addition-two-number', AdditionWebcomponent);
