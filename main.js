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
                const result = parseInt(input1) + parseInt(input2);
                const addEvent = new CustomEvent("add", { bubbles: true, cancelable: true, composed: true, detail: { total: result } });
                this.dispatchEvent(addEvent);
            });
    }

}

window.customElements.define('addition-two-number', AdditionWebcomponent);
