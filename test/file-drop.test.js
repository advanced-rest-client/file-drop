
import { fixture, assert } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../file-drop.js';

describe('<file-drop>', () => {
  async function basicFixture() {
    return (await fixture(`<file-drop></file-drop>`));
  }

  async function multipleFixture() {
    return (await fixture(`<file-drop multiple></file-drop>`));
  }

  async function ariaDropEffectFixture() {
    return (await fixture(`<file-drop aria-dropeffect="move"></file-drop>`));
  }

  describe('selectFile()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls click on the input', () => {
      const spy = sinon.spy(element._input, 'click');
      element.selectFile();
      assert.isTrue(spy.called);
    });
  });

  describe('_onDragEnter()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    const fire = (element) => {
      const e = new CustomEvent('dragenter', {
        cancelable: true,
        bubbles: true
      });
      element.dispatchEvent(e);
      return e;
    };

    it('sets "dragging" property', () => {
      fire(element);
      assert.isTrue(element.dragging);
    });

    it('cancelas the event', () => {
      const e = fire(element);
      assert.isTrue(e.defaultPrevented);
    });

    it('stops event propagation', () => {
      const spy = sinon.spy();
      document.body.addEventListener('dragenter', spy);
      fire(element);
      document.body.removeEventListener('dragenter', spy);
      assert.isFalse(spy.called);
    });
  });

  describe('_onDragLeave()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.dragging = true;
    });

    const fire = (element) => {
      const e = new CustomEvent('dragleave', {
        cancelable: true,
        bubbles: true
      });
      element.dispatchEvent(e);
      return e;
    };

    it('sets "dragging" property', () => {
      fire(element);
      assert.isFalse(element.dragging);
    });

    it('cancelas the event', () => {
      const e = fire(element);
      assert.isTrue(e.defaultPrevented);
    });

    it('stops event propagation', () => {
      const spy = sinon.spy();
      document.body.addEventListener('dragleave', spy);
      fire(element);
      document.body.removeEventListener('dragleave', spy);
      assert.isFalse(spy.called);
    });
  });

  describe('_onDragOver()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    const fire = (element) => {
      const e = new CustomEvent('dragover', {
        cancelable: true,
        bubbles: true
      });
      element.dispatchEvent(e);
      return e;
    };

    it('sets "dragging" property', () => {
      fire(element);
      assert.isTrue(element.dragging);
    });

    it('cancelas the event', () => {
      const e = fire(element);
      assert.isTrue(e.defaultPrevented);
    });

    it('stops event propagation', () => {
      const spy = sinon.spy();
      document.body.addEventListener('dragover', spy);
      fire(element);
      document.body.removeEventListener('dragover', spy);
      assert.isFalse(spy.called);
    });
  });

  describe('_onDrop()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.dragging = true;
    });

    const fire = (element, files) => {
      const e = new CustomEvent('drop', {
        cancelable: true,
        bubbles: true
      });
      e.dataTransfer = {
        files
      };
      element.dispatchEvent(e);
      return e;
    };

    it('sets "dragging" property', () => {
      fire(element, []);
      assert.isFalse(element.dragging);
    });

    it('cancelas the event', () => {
      const e = fire(element, []);
      assert.isTrue(e.defaultPrevented);
    });

    it('stops event propagation', () => {
      const spy = sinon.spy();
      document.body.addEventListener('drop', spy);
      fire(element, []);
      document.body.removeEventListener('drop', spy);
      assert.isFalse(spy.called);
    });

    it('Calls _processEntries()', () => {
      const spy = sinon.spy(element, '_processEntries');
      const files = [{ name: 'test' }];
      fire(element, files);
      assert.deepEqual(spy.args[0][0], files);
    });
  });

  describe('_manualSelected()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Clears "file" property', () => {
      element.file = {};
      element._manualSelected();
      assert.isUndefined(element.file);
    });
  });

  describe('_processEntries()', () => {
    it('Sets single file', async () => {
      const files = [{ name: 'single' }];
      const element = await basicFixture();
      element._processEntries(files);
      assert.deepEqual(element.file, files[0]);
    });

    it('Sets multiple files', async () => {
      const files = [{ name: 'single' }, { name: 'other' }];
      const element = await multipleFixture();
      element._processEntries(files);
      assert.deepEqual(element.file, files);
    });
  });

  describe('reset()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Clears file property', () => {
      element.file = {};
      element.reset();
      assert.equal(element.file, null);
    });
  });

  describe('onchange', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onchange);
      const f = () => {};
      element.onchange = f;
      assert.isTrue(element.onchange === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onchange = f;
      element.file = {};
      element.onchange = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onchange = f1;
      element.onchange = f2;
      element.file = {};
      element.onchange = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('a11y', () => {
    it('passes accessibility tests', async () => {
      const elm = await fixture(`<file-drop></file-drop>`);
      await assert.isAccessible(elm);
    });

    it('has aria-dropeffect attribute set', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('aria-dropeffect'), 'copy');
    });

    it('respects existing aria-dropeffect attribute set', async () => {
      const element = await ariaDropEffectFixture();
      assert.equal(element.getAttribute('aria-dropeffect'), 'move');
    });
  });
});
