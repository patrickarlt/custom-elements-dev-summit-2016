/**
 * These will be compiled with Rollup
 */
import '../utils/CustomEvent.js';
import HTMLElement from '../utils/HTMLElement.js';

/**
 * we need unique IDs for the divs of <esri-map>
 * elements, so create a counter.
 */
var ids = 0;

/**
 * Use a standard `require` from the JS API to
 * load dependencies we need. We will define our
 * custom element inside its callback.
 */
require([
  "esri/Map",
  "esri/views/MapView"
], function (Map, MapView) {

  /**
   * Extend HTMLElement according to the spec
   * in current versions of Safari this does not
   * work so we need our HTMLElement object we
   * imported above.
   */
  class EsriMapElement extends HTMLElement {
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
      this._id = `esri-map-${ids++}`;
      this._container = createContainer(this._id);
    }

    /**
     * Called when the element is inserted into the DOM.
     * This happens after created callback and usually
     * before any created or attached callbacks from their
     * children. This is where we can do the bulk of the work.
     */
    attachedCallback () {
      /**
       * Now that we are in the DOM we can append our container
       */
      this.appendChild(this._container);

      /**
       * Create our Map and MapView.
       */
      this.map = new Map({
        basemap: this.basemap
      });

      this.view = new MapView({
        container: this._container.id,
        zoom: this.zoom,
        map: this.map,
        center: this.center
      });

      /**
       * Dispatch a event, just like a click or keyboard
       * event, bubbling it up the DOM. This is useful for
       * inter-element communication or for notifiying
       * applications of things the element is doing.
       *
       * You must bubble the event or you cannot listen
       * to then event in some frameworks like Ember.
       */
      this.dispatchEvent(new CustomEvent('mapready', {
        bubbles: true
      }));

      /**
       * Set a flag so other elements can check if this
       * is ready.
       */
      this.ready = true;
    }

    /**
     * Called when the element is removed from the DOM.
     * All children are also removed from the DOM at this point.
     */
    detachedCallback () {
      /**
       * JS API 4.0 doesn't provide a way of destroying
       * a map after it has been created like in 3.x
       * but you should do it here.
       */
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
       * have a map and view initalized before we do anything.
       */
      if(this.view && this.map && newValue){
        switch (name) {
          case 'zoom':
            this.view.zoom = this.zoom;
            break;
          case 'lat':
            this.view.center = this.center;
            break;
          case 'lng':
            this.view.center = this.center;
            break;
          case 'basemap':
            this.map.basemap = this.basemap;
            break;
        }
      }
    }

    /**
     * This is the ES 6 getter/setter spec that is
     * a part of classes.
     */
    get center () {
      return [this.lng, this.lat];
    }

    /**
     * For each attribute on our element we need to have
     * a matching getter and setter. This is part of the DOM
     * standard. Some frameworks will use getAttribute/setAttribute
     * and some use the getter/setter so this is also needed
     * for compatibility.
     */
    get zoom () {
      return parseInt(this.getAttribute('zoom'), 10);
    }

    set zoom (value) {
      this.setAttribute('zoom', value);
    }

    get lat () {
      return parseFloat(this.getAttribute('lat'), 10);
    }

    set lat (value) {
      this.setAttribute('lat', value);
    }

    get lng () {
      return parseFloat(this.getAttribute('lng'), 10);
    }

    set lng (value) {
      this.setAttribute('lng', value);
    }

    get basemap () {
      return this.getAttribute('basemap');
    }

    set basemap (value) {
      this.setAttribute('basemap', value);
    }
  }

  /**
   * Utility function to create a div for our MapView with
   * a unique ID.
   */
  function createContainer (id) {
    var container = document.createElement('div');

    container.id = id;
    container.style.width = '100%';
    container.style.height = '100%';

    return container;
  }

  /**
   * document.registerElement becomes document.defineElement
   * in the newer spec. Since the name changes old elements
   * and polyfills will continue to work.
   */
  document.registerElement('esri-map', EsriMapElement);
});