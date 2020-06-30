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
import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
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

The element renders only file selector button when whe screen size is less than 1024px.
It means mobile device which can't make use of file drag and drop.
*/
export class FileDropElement extends LitElement {
  readonly styles: CSSResult;

  render(): TemplateResult;

  // True when file is dragged over the element.
  dragging: boolean;
  /**
   * Set to true if multiple files can be selected.
   * If not set only first file fille be selected.
   */
  multiple: boolean;
  /**
   * A set of comma-separated strings, each of which is a valid MIME type,
   * with no parameters.
   *
   * Currently this will not work for files dropped into the element.
   */
  accept: boolean;

  // True if the element received file(s).
  hasFile: boolean;
  /**
   * Enables compatibility with Anypoint.
   */
  compatibility: boolean;

  /**
   * A file object(s) dropped into the element.
   */
  file: File|Blob;

  /**
   * A handler for the `change` event.
   */
  onchange: EventListener;

  readonly _input: HTMLInputElement;

  constructor();

  connectedCallback(): void;

  disconnectedCallback(): void;

  // Opens a file selector.
  selectFile(): void;

  // Handler for dragenter event.
  _onDragEnter(e: DragEvent): void;

  _onDragLeave(e: DragEvent): void;

  _onDragOver(e: DragEvent): void;

  // Handler for drop event.
  _onDrop(e: DragEvent): void;

  // A handler called when the user manually selected the file (not by drag and drop)
  _manualSelected(): void;

  // Called when the element receive a file.
  _processEntries(entries: File[]): void;

  // Resets the state of the element to the default view.
  reset(): void;
}
