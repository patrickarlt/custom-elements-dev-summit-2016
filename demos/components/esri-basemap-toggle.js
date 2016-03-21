/**
 * Will be compiled with Rollup
 */
import '../utils/CustomEvent.js';
import HTMLElement from '../utils/HTMLElement.js';

/**
 * Use a standard `require` from the JS API to
 * load dependencies we need. We will define our
 * custom element inside its callback.
 */
require([
  'esri/widgets/BasemapToggle/BasemapToggleViewModel'
], function (BasemapToggleViewModel) {

  /**
   * Extend HTMLElement according to the spec
   * in current versions of Safari this does not
   * work so we need our HTMLElement object we
   * imported above.
   */
  class EsriBasemapToggleElement extends HTMLElement {

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
      this.insertAdjacentHTML('afterbegin', `
        <img src="" alt="" />
        <p></p>
      `);

      this.image = this.querySelector('img');
      this.text = this.querySelector('p');
    }

    /**
     * Called when the element is inserted into the DOM.
     * This happens after created callback and usually
     * before any created or attached callbacks from their
     * children. This is where we can do the bulk of the work.
     */
    attachedCallback () {
      this._mapElement = document.getElementById(this.getAttribute('map'));

      this.addEventListener('click', this.handleClick);

      if (this._mapElement.ready) {
        this.init();
      } else {
        this._mapElement.addEventListener('ready', (e) => {
          this.init();
        });
      }
    }

    /**
     * Called when the element is removed from the DOM.
     * All children are also removed from the DOM at this point.
     */
    detachedCallback () {
      this.removeEventListener('click', this.handleClick);
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
      if (this.viewModel && name === 'basemap') {
        this.viewModel.basemap = newValue;
        this.update();
      }
    }

    /**
     * Handle a click event on our element updating
     * the ViewModel and propagating a new event up
     * the DOM tree.
     */
    handleClick (e) {
      this.viewModel.toggle();
      this.update();
      this.dispatchEvent(new CustomEvent('togglebasemap', {
        bubbles: true
      }));
      e.preventDefault();
      e.stopPropagation();
    }

    /**
     * Initalize the ViewModel once we know the map and
     * map view are ready.
     */
    init () {
      this.viewModel = new BasemapToggleViewModel({
        basemap: this._mapElement.map.basemap,
        secondaryBasemap: this.basemap,
        map: this._mapElement.map,
        view: this._mapElement.view
      });

      this.update();
    }

    /**
     * Basic function to update the DOM with the new
     * information about the basemap.
     */
    update () {
      var info = this.viewModel.getBasemapInfo();
      this.text.textContent = info.title;
      this.image.src = info.thumbnailUrl;
      this.image.alt = info.title;
    }

    /**
     * For each attribute on our element we need to have
     * a matching getter and setter. This is part of the DOM
     * standard. Some frameworks will use getAttribute/setAttribute
     * and some use the getter/setter so this is also needed
     * for compatibility.
     */
    get basemap () {
      return this.getAttribute('basemap');
    }

    set basemap (value) {
      this.setAttribute('basemap', value);
    }
  }

  /**
   * document.registerElement becomes document.defineElement
   * in the newer spec. Since the name changes old elements
   * and polyfills will continue to work.
   */
  document.registerElement('esri-basemap-toggle', EsriBasemapToggleElement);
});