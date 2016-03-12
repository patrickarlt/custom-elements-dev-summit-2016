import '../utils/CustomEvent.js';
import HTMLElement from '../utils/HTMLElement.js';

var ids = 0;

require([
  "esri/Map",
  "esri/views/MapView"
], function (Map, MapView) {

  class EsriMapElement extends HTMLElement {

    // createdCallback will be replaced by
    // `constructor` in the newer spec so this
    // will look like
    //
    // constructor () {
    //   super(); // must be called first
    // }
    //
    // in the new spec
    createdCallback() {
      this._id = `esri-map-${ids++}`;
      this._container = createContainer(this._id);
    }

    attachedCallback () {
      this.appendChild(this._container);

      this.map = new Map({
        basemap: this.basemap
      });

      this.view = new MapView({
        container: this._container.id,
        zoom: this.zoom,
        map: this.map,
        center: this.center
      });

      this.dispatchEvent(new CustomEvent('mapready', {
        bubbles: true
      }));

      this.ready = true;
    }

    detachedCallback () {
      // JS API 4.0 doesn't provide a way of destroying
      // a map after it has been created like in 3.x
      // but you should do it here.
    }

    attributeChangedCallback (name, oldValue, newValue) {
      // some frameworks will set attributes as `undefined`
      // when they are first initalized. So make sure you
      //  handle that case. In this case we make sure we have
      //  a map and view.
      if(this.view && this.map){
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

    get center () {
      return [this.lng, this.lat];
    }

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

  function createContainer (id) {
    var container = document.createElement('div');

    container.id = id;
    container.style.width = '100%';
    container.style.height = '100%';

    return container;
  }

  // document.registerElement becomes document.defineElement
  // in the newer spec.
  document.registerElement('esri-map', EsriMapElement);
});