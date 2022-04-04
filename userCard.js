const template = document.createElement('template');
template.innerHTML = `
<style>
  .user-card {
    line-height: 1;
    font-family: 'Arial', sans-serif;
    background: $f4f4f4;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: darkorchid 5px solid;
  }

  .user-card img {
    width: 100%;
  }

  .user-card button {
    cursor: pointer;
    background: darkorchid;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
  }
</style>
<div class="user-card">
  <img />
  <div>
    <h3></h3>
    <div class="info">
      <p><slot name="email"></p>
      <p><slot name="phone"></p>
    </div>
    <button id='toggle-info'>Hide Info</button>
  </div>
</div>
`;

export class UserCard extends HTMLElement {
  constructor() {
    super();
    console.log('sbrooks-web-component, version 1.0.12')

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['name', 'token', 'avatar'];
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
    console.log('token', this._token);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    console.log('name', this._name);
    this.shadowRoot.querySelector('h3').innerText = this._name;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}'s value has been changed from ${oldValue} to ${newValue}`);

    switch (name) {
      case 'avatar':
        this.shadowRoot.querySelector('img').src = newValue;
        break;
    }

  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    }
    else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {

    /*
    this.shadowRoot.querySelector('h3').innerText =
      this.getAttribute('name');
    */

    this.shadowRoot.querySelector('#toggle-info')
      .addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info')
      .removeEventListener();
  }
}

customElements.define("user-card", UserCard);
