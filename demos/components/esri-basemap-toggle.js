import '../utils/CustomEvent.js';
import HTMLElement from '../utils/HTMLElement.js';

require([
  'esri/widgets/BasemapToggle/BasemapToggleViewModel'
], function (BasemapToggleViewModel) {

  class EsriBasemapToggleElement extends HTMLElement {
    createdCallback() {
      this.insertAdjacentHTML('afterbegin', `
        <img src="" alt="" />
        <p></p>
      `);

      this.image = this.querySelector('img');
      this.text = this.querySelector('p');
    }

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

    detachedCallback () {
      this.addEventListener('click', this.handleClick);
    }

    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'basemap') {
        this.viewModel.basemap = newValue;
        this.update();
      }
    }

    handleClick (e) {
      this.viewModel.toggle();
      this.update();
      this.dispatchEvent(new CustomEvent('togglebasemap', {
        bubbles: true
      }));
      e.preventDefault();
      e.stopPropagation();
    }

    init () {
      this.viewModel = new BasemapToggleViewModel({
        basemap: this._mapElement.map.basemap,
        secondaryBasemap: this.basemap,
        map: this._mapElement.map,
        view: this._mapElement.view
      });

      this.update();
    }

    update () {
      var info = this.viewModel.getBasemapInfo();
      this.text.textContent = info.title;
      this.image.src = info.thumbnailUrl;
      this.image.alt = info.title;
    }

    get basemap () {
      return this.getAttribute('basemap');
    }

    set basemap (value) {
      this.setAttribute('basemap', value);
    }
  }

  document.registerElement('esri-basemap-toggle', EsriBasemapToggleElement);
});