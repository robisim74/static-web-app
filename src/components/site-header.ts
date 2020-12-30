/* Styles */
import './site-header.scss';
/* Template */
import template from 'html-loader!./site-header.html';

export class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = template;

        console.log('site-starter: init site-header component');
    }
}

customElements.define("site-header", SiteHeader);
