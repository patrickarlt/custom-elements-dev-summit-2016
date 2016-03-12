import HTMLElement from '../utils/HTMLElement.js';

require([
  "esri/layers/FeatureLayer",
  "esri/PopupTemplate"
], function (FeatureLayer, PopupTemplate) {

  class EsriFeatureLayerElement extends HTMLElement {
    createdCallback() {
    }

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

    detachedCallback () {
      this.parentNode.map.remove(this.layer);
    }

    attributeChangedCallback () {
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

  document.registerElement('esri-feature-layer', EsriFeatureLayerElement);
});