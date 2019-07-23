/**
@license
Copyright 2016 The Advanced REST client authors
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
/**
The `<file-drop>` component will render a filed where the user can drop files or directories into it.
User can choose a fallback option to select a file using browser's open file dialog.

When files are selected by the user the `file-accepted` will be fired and the
`<file-drop>.file` will contain a file entry.
If `multiple` attribute is present then the `<file-drop>.file` will be always
an array of entries. If not, multiple it will always be a single file entry.

Depending on user input method and type of the file there are 3 possible types
that will be returned by `<file-drop>.file`
* DirectoryEntry - only when the user dropped a directory (not possible with file selector)
* FileEntry - if the user dropped a file into the element
* File - only if the user selected file(s) via file input (without drop)

The array of files may contain both DirectoryEntry and FileEntry types but never File.

### Example
```
<file-drop multiple accept="image/*"></file-drop>
```

Note that due the limitations of web filesystem the accept attribute will not work when dropping a file.

### Styling
`<file-drop>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
| `--file-drop` | Mixin applied to the element | `{}` |
| `--file-drop-zone-border-color` | A border color of the drop zone | `--paper-lime-300` |
| `--file-drop-zone` | Mixin applied to the drop zone | `{}` |
| `--file-drop-zone-border-color-active` | A border color of the active drop zone (files over the zone) | red |
| `--file-drop-action-button` | Mixin applied to the main action button | `{}` |
| `--file-drop-with-file` | Mixin applied to the container when the file is selected | `{}` |
| `--file-drop-without-file` | Mixin applied to the container when the file is not selected | `{}` |

The element renders only file selector button when whe screen size is less than 1024px.
It means mobile device which can't make use of file drag and drop.

@customElement
@polymer
@demo demo/index.html
@memberof UiElements
*/
class FileDrop extends LitElement {
  static get styles() {
    return css`:host {
      display: block;
      border-width: 2px;
      border-color: transparent;
      border-style: dashed;
    }

    :host([dragging]) {
      border-color: var(--file-drop-zone-border-color-active, #F44336);
      border-style: dashed;
      border-width: 2px;
    }

    input[type="file"] {
      display: none;
    }

    .desktop-info {
      display: none;
    }

    @media (min-width: 1024px) {
      .drop-zone {
        padding: 40px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .desktop-info {
        display: block;
      }
    }`;
  }

  render() {
    const { multiple, accept } = this;
    return html`<section id="dropSection" class="drop-zone">
      <p class="desktop-info">Drop file here</p>
      <p class="desktop-info">or select from your device</p>
      <paper-button class="main-button" @click="${this.selectFile}">Select file</paper-button>
      <input type="file" @change="${this._manualSelected}" ?multiple="${multiple}" accept="${accept}">
    </section>`;
  }

  static get properties() {
    return {
      // True when file is dragged over the element.
      dragging: { type: Boolean, reflect: true },
      /**
       * Set to true if multiple files can be selected.
       * If not set only first file fille be selected.
       */
      multiple: { type: Boolean },
      /**
       * A set of comma-separated strings, each of which is a valid MIME type,
       * with no parameters.
       *
       * Currently this will not work for files dropped into the element.
       */
      accept: { type: String },

      // True if the element received file(s).
      hasFile: { type: Boolean }
    };
  }
  /**
   * @return {Blob} A file object(s) dropped into the element.
   */
  get file() {
    return this._file;
  }

  set file(value) {
    const old = this._file;
    this._file = value;
    this.hasFile = !!value;
    this.requestUpdate('hasFile', old);
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value
      }
    }));
  }

  /**
   * @return {Function|undefined} A function previously used to register `change`
   * event handler.
   */
  get onchange() {
    return this._changeClb;
  }
  /**
   * @param {Function} clb Event handler for `change` event.
   */
  set onchange(clb) {
    if (this._changeClb) {
      this.removeEventListener('change', this._changeClb);
    }
    if (typeof clb !== 'function') {
      this._changeClb = null;
      return;
    }
    this._changeClb = clb;
    this.addEventListener('change', this._changeClb);
  }

  get _input() {
    return this.shadowRoot.querySelector('input[type="file"]');
  }

  constructor() {
    super();
    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDrop = this._onDrop.bind(this);
  }

  connectedCallback() {
    /* istanbul ignore else  */
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.addEventListener('dragenter', this._onDragEnter);
    this.addEventListener('dragleave', this._onDragLeave);
    this.addEventListener('dragover', this._onDragOver);
    this.addEventListener('drop', this._onDrop);
    if (!this.hasAttribute('aria-dropeffect')) {
      this.setAttribute('aria-dropeffect', 'copy');
    }
  }

  disconnectedCallback() {
    /* istanbul ignore else  */
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.removeEventListener('dragenter', this._onDragEnter);
    this.removeEventListener('dragleave', this._onDragLeave);
    this.removeEventListener('dragover', this._onDragOver);
    this.removeEventListener('drop', this._onDrop);
  }

  // Opens a file selector.
  selectFile() {
    this._input.click();
  }

  // Handler for dragenter event.
  _onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragging = true;
  }

  _onDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragging = false;
  }

  _onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragging = true;
  }
  // Handler for drop event.
  _onDrop(e) {
    this.dragging = false;
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    this._processEntries(Array.from(files));
  }

  // A handler called when the user manually selected the file (not by drag and drop)
  _manualSelected() {
    const input = this._input;
    /* istanbul ignore else  */
    if (!input.files.length) {
      this.file = undefined;
    } else {
      this._processEntries(Array.from(input.files));
    }
  }
  // Called when the element receive a file.
  _processEntries(entries) {
    if (this.multiple) {
      this.file = entries;
    } else {
      this.file = entries[0];
    }
  }
  // Resets the state of the element to the default view.
  reset() {
    this.file = null;
    this._input.value = null;
  }
  /**
   * Fired when the file has been accepted and ready to use.
   *
   * @event change
   * @param {File} value Selected file or files
   */

  /**
   * Fired when the file has been accepted and ready to use.
   *
   * @event file-accepted
   * @param {File} file A file entry
   * @deprecated Use `change` event when listening for file change.
   */
}
window.customElements.define('file-drop', FileDrop);
