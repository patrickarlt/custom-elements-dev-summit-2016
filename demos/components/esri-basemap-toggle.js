import HTMLElement from '../utils/HTMLElement.js';
import CustomEvent from '../utils/CustomEvent.js';

require([
  'esri/widgets/BasemapToggle/BasemapToggleViewModel'
], function (BasemapToggleViewModel) {
  class EsriBasemapToggleElement extends HTMLElement {
    createdCallback() {
      console.log('created');
    }

    attachedCallback () {
      console.log('attached');
    }

    detachedCallback () {
      console.log('detached');
    }

    attributeChangedCallback () {
      console.log('attributeChanged');
    }
  }

  document.registerElement('esri-basemap-toggle', EsriMapElement);
});