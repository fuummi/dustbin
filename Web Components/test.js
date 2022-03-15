class flower extends HTMLElement{
    constructor() {
        super();
        let templateContent = document.querySelector('template').content;
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(templateContent.cloneNode(true));
        shadowRoot.querySelector('.blossom').innerText = this.getAttribute('face');//可以在花蕊里插入文字
    }
}
customElements.define('flower-',flower);