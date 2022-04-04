const template = document.createElement('template');
template.innerHTML = `
<style>
  .max-characters {
      color: #9cc8f0;
  }
</style>
<div class="max-characters">
  <small></small>
</div>
`;

export class MaxCharacters extends HTMLElement {
  constructor() {
    super();
    console.log('constructor, version 1.0.29');

    this._maximum = '100';

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['maximum'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}'s value has been changed from ${oldValue} to ${newValue}`);

    switch (name) {
      case 'maximum':
        this._maximum = newValue;
        break;
    }
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
    // console.log('text', this._text);
    const msg = `(${this._text.length}/${this._maximum})`
    this.shadowRoot.querySelector('small').innerText = msg;
  }

  connectedCallback() {
      console.log('connectedCallback');
  }
}

customElements.define("max-characters", MaxCharacters);
