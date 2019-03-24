[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/file-drop.svg)](https://www.npmjs.com/package/@advanced-rest-client/file-drop)

[![Build Status](https://travis-ci.org/advanced-rest-client/file-drop.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/file-drop)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/file-drop)


# &lt;file-drop&gt;

A component that render file drop region.

## Example:

```html
<file-drop on-file-accepted="..."></file-drop>
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/file-drop
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@advanced-rest-client/file-drop/file-drop.js';
    </script>
  </head>
  <body>
    <file-drop></file-drop>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@advanced-rest-client/file-drop/file-drop.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <file-drop></file-drop>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/file-drop
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
