[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/file-drop.svg)](https://www.npmjs.com/package/@advanced-rest-client/file-drop)

[![Build Status](https://travis-ci.com/advanced-rest-client/file-drop.svg)](https://travis-ci.com/advanced-rest-client/file-drop)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/file-drop)


# file-drop

A component that render file drop region.

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
    <script>
    {
      document.querySelector('file-drop').onchange = (e) => {
        console.log(e.target.file);
      };
    }
    </script>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/file-drop/file-drop.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <file-drop @change="${this._fileChange}"></file-drop>
    `;
  }

  _fileChange(e) {
    this.file = e.target.file;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/file-drop
cd file-drop
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
polymer test
```
