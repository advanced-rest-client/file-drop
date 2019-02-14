/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   file-drop.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../paper-button/paper-button.d.ts" />

/**
 * ## `<file-drop>` File drop web component
 * The `<file-drop>` component will render a filed where the user can drop files or directories into it.
 * User can choose a fallback option to select a file using browser's open file dialog.
 *
 * When files are selected by the user the `file-accepted` will be fired and the `<file-drop>.file` will contain a file entry.
 * If `multiple` attribute is present then the `<file-drop>.file` will be always an array of entries. If not, multiple it will always be a single file entry.
 *
 * Depending on user input method and type of the file there are 3 possible types that will be returned by `<file-drop>.file`
 * DirectoryEntry - only when the user dropped a directory (not possible with file selector)
 * FileEntry - if the user dropped a file into the element
 * File - only if the user selected file(s) via file input (without drop)
 *
 * The array of files may contain both DirectoryEntry and FileEntry types but never File.
 *
 * ### Example
 * ```
 * <file-drop multiple accept="image/*"></file-drop>
 * ```
 *
 * Note that due the limitations of web filesystem the accept attribute will not work when dropping a file.
 *
 * ### Styling
 * `<file-drop>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * | `--file-drop` | Mixin applied to the element | `{}` |
 * | `--file-drop-zone-border-color` | A border color of the drop zone | `--paper-lime-300` |
 * | `--file-drop-zone` | Mixin applied to the drop zone | `{}` |
 * | `--file-drop-zone-border-color-active` | A border color of the active drop zone (files over the zone) | red |
 * | `--file-drop-action-button` | Mixin applied to the main action button | `{}` |
 * | `--file-drop-with-file` | Mixin applied to the container when the file is selected | `{}` |
 * | `--file-drop-without-file` | Mixin applied to the container when the file is not selected | `{}` |
 *
 * The element renders only file selector button when whe screen size is less than 1024px. It means mobile device which can't make use of file drag and drop.
 */
declare class FileDrop extends Polymer.Element {

  /**
   * True when file is dragged over the element.
   */
  readonly dragging: boolean|null|undefined;

  /**
   * Set to true if multiple files can be selected.
   * If not set only first file fille be selected.
   */
  multiple: boolean|null|undefined;

  /**
   * A set of comma-separated strings, each of which is a valid MIME type,
   * with no parameters.
   *
   * Currently this will not work for files dropped into the element.
   */
  accept: string|null|undefined;

  /**
   * A file object(s) dropped into the element.
   */
  file: object|null|undefined;

  /**
   * True if the element received file(s).
   */
  readonly hasFile: boolean|null|undefined;
  connectedCallback(): void;
  disconnectedCallback(): void;

  /**
   * Opens a file selector.
   */
  selectFile(): void;

  /**
   * Handler for dragenter event.
   */
  _onDragEnter(e: any): void;
  _onDragLeave(e: any): void;
  _onDragOver(e: any): void;

  /**
   * Handler for drop event.
   */
  _onDrop(e: any): void;

  /**
   * A handler called when the user manually selected the file (not by drag and drop)
   */
  _manualSelected(): void;

  /**
   * Called when the element receive a file.
   */
  _processEntries(entries: any): void;

  /**
   * Computes class name for dragging section.
   */
  _computeMainSectionClass(dragging: any, hasFile: any): any;

  /**
   * Compute if the element received a file
   */
  _computeHasFile(file: any): any;

  /**
   * Resets the state of the element to the default view.
   */
  reset(): void;
}

interface HTMLElementTagNameMap {
  "file-drop": FileDrop;
}