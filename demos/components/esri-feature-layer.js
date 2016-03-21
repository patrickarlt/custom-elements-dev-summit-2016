/**
 * Will be compiled with Rollup
 */
import HTMLElement from '../utils/HTMLElement.js';

/**
 * Use a standard `require` from the JS API to
 * load dependencies we need. We will define our
 * custom element inside its callback.
 */
require([
  "esri/layers/FeatureLayer",
  "esri/PopupTemplate"
], function (FeatureLayer, PopupTemplate) {

  /**
   * Extend HTMLElement according to the spec
   * in current versions of Safari this does not
   * work so we need our HTMLElement object we
   * imported above.
   */
  class EsriFeatureLayerElement extends HTMLElement {

    /**
     * `createdCallback` will be replaced by
     * `constructor` in the newer spec so this
     * will look like:
     *
     * constructor () {
     *   super(); // must be called
     * }
     *
     * in the new spec once it lands
     */
    createdCallback() {
      /**
       * Do nothing here for now.
       */
    }

    /**
     * Called when the element is inserted into the DOM.
     * This happens after created callback and usually
     * before any created or attached callbacks from their
     * children. This is where we can do the bulk of the work.
     */
    attachedCallback () {
      var url = this.url;
      var parentNode = this.parentNode;
      var popupTitle = this.popuptitle;
      var popupBody = this.popupbody;

      this.template = new PopupTemplate({
        title: popupTitle,
        content: document.getElementById(this.popupbody).innerHTML
      });

      this.layer = new FeatureLayer({
        outFields: ["*"],
        url: url,
        popupTemplate: this.template
      });

      if (this.parentNode.ready) {
        this.parentNode.map.add(this.layer);
      } else {
        this.parentNode.addEventListener('mapready', () => {
          this.parentNode.map.add(this.layer);
        })
      }

    }

    /**
     * Called when the element is removed from the DOM.
     * All children are also removed from the DOM at this point.
     */
    detachedCallback () {
      this.parentNode.map.remove(this.layer);
    }

    /**
     * Called whenever an attribute on the element changes.
     * This is called with the name fo the attribute, the oldValue
     * and the newValue.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      /**
       * Some frameworks will set attributes as `undefined`
       * when they are first initalized. So make sure you
       * handle that case. In this case we make sure we also
       * have a layer initalized before we do anything.
       */
      if (this.layer && newValue) {
        switch (name) {
          case 'popuptitle':
            // could set popup title here
            break;
          case 'popupbody':
            // could set popup body here
            break;
          case 'url':
            // should we allow changing the url?
            break;
        }
      }
    }

    /**
     * For each attribute on our element we need to have
     * a matching getter and setter. This is part of the DOM
     * standard. Some frameworks will use getAttribute/setAttribute
     * and some use the getter/setter so this is also needed
     * for compatibility.
     */
    get url () {
      return this.getAttribute('url');
    }

    set url (value) {
      this.setAttribute('url', value);
    }

    get popupbody () {
      return this.getAttribute('popupbody');
    }

    set popupbody (value) {
      this.setAttribute('popupbody', value);
    }

    get popuptitle () {
      return this.getAttribute('popuptitle');
    }

    set popuptitle (value) {
      this.setAttribute('popuptitle', value);
    }
  }

  /**
   * document.registerElement becomes document.defineElement
   * in the newer spec. Since the name changes old elements
   * and polyfills will continue to work.
   */
  document.registerElement('esri-feature-layer', EsriFeatureLayerElement);
});