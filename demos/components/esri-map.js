import HTMLElement from '../utils/HTMLElement.js';

var ids = 0;

require([
  "esri/Map",
  "esri/views/MapView"
], function (Map, MapView) {

  class EsriMapElement extends HTMLElement {
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
    }

    detachedCallback () {
      console.log('detached');
    }

    attributeChangedCallback (name, oldValue, newValue) {
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

  document.registerElement('esri-map', EsriMapElement);
});