(function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;

  // You can't extend the HTMLElement prototype
  // in Safari becuase it is declared as an Object
  //
  // https://bugs.webkit.org/show_bug.cgi?id=114457
  // https://github.com/babel/babel/issues/1548
  var _HTMLElement;

  if (typeof HTMLElement !== 'function') {
    _HTMLElement = function _HTMLElement() {};
    _HTMLElement.prototype = HTMLElement.prototype;
  } else {
    _HTMLElement = HTMLElement;
  }

  var HTMLElement$1 = _HTMLElement;

  var ids = 0;

  require(["esri/Map", "esri/views/MapView"], function (Map, MapView) {
    var EsriMapElement = function (_HTMLElement) {
      babelHelpers.inherits(EsriMapElement, _HTMLElement);

      function EsriMapElement() {
        babelHelpers.classCallCheck(this, EsriMapElement);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EsriMapElement).apply(this, arguments));
      }

      babelHelpers.createClass(EsriMapElement, [{
        key: "createdCallback",
        value: function createdCallback() {
          this._id = "esri-map-" + ids++;
          this._container = createContainer(this._id);
        }
      }, {
        key: "attachedCallback",
        value: function attachedCallback() {
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
      }, {
        key: "detachedCallback",
        value: function detachedCallback() {
          console.log('detached');
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(name, oldValue, newValue) {
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
      }, {
        key: "center",
        get: function get() {
          return [this.lng, this.lat];
        }
      }, {
        key: "zoom",
        get: function get() {
          return parseInt(this.getAttribute('zoom'), 10);
        },
        set: function set(value) {
          this.setAttribute('zoom', value);
        }
      }, {
        key: "lat",
        get: function get() {
          return parseFloat(this.getAttribute('lat'), 10);
        },
        set: function set(value) {
          this.setAttribute('lat', value);
        }
      }, {
        key: "lng",
        get: function get() {
          return parseFloat(this.getAttribute('lng'), 10);
        },
        set: function set(value) {
          this.setAttribute('lng', value);
        }
      }, {
        key: "basemap",
        get: function get() {
          return this.getAttribute('basemap');
        },
        set: function set(value) {
          this.setAttribute('basemap', value);
        }
      }]);
      return EsriMapElement;
    }(HTMLElement$1);

    function createContainer(id) {
      var container = document.createElement('div');

      container.id = id;
      container.style.width = '100%';
      container.style.height = '100%';

      return container;
    }

    document.registerElement('esri-map', EsriMapElement);
  });

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1tYXAuanMiLCJzb3VyY2VzIjpbIi4uL3V0aWxzL0hUTUxFbGVtZW50LmpzIiwiLi4vY29tcG9uZW50cy9lc3JpLW1hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBZb3UgY2FuJ3QgZXh0ZW5kIHRoZSBIVE1MRWxlbWVudCBwcm90b3R5cGVcbi8vIGluIFNhZmFyaSBiZWN1YXNlIGl0IGlzIGRlY2xhcmVkIGFzIGFuIE9iamVjdFxuLy9cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTQ0NTdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMTU0OFxudmFyIF9IVE1MRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICBfSFRNTEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgX0hUTUxFbGVtZW50LnByb3RvdHlwZSA9IEhUTUxFbGVtZW50LnByb3RvdHlwZTtcbn0gZWxzZSB7XG4gIF9IVE1MRWxlbWVudCA9IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBfSFRNTEVsZW1lbnQ7XG4iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMnO1xuXG52YXIgaWRzID0gMDtcblxucmVxdWlyZShbXG4gIFwiZXNyaS9NYXBcIixcbiAgXCJlc3JpL3ZpZXdzL01hcFZpZXdcIlxuXSwgZnVuY3Rpb24gKE1hcCwgTWFwVmlldykge1xuXG4gIGNsYXNzIEVzcmlNYXBFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMuX2lkID0gYGVzcmktbWFwLSR7aWRzKyt9YDtcbiAgICAgIHRoaXMuX2NvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcih0aGlzLl9pZCk7XG4gICAgfVxuXG4gICAgYXR0YWNoZWRDYWxsYmFjayAoKSB7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XG5cbiAgICAgIHRoaXMubWFwID0gbmV3IE1hcCh7XG4gICAgICAgIGJhc2VtYXA6IHRoaXMuYmFzZW1hcFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudmlldyA9IG5ldyBNYXBWaWV3KHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLl9jb250YWluZXIuaWQsXG4gICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlclxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGV0YWNoZWRDYWxsYmFjayAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGV0YWNoZWQnKTtcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgIGNhc2UgJ3pvb20nOlxuICAgICAgICAgIHRoaXMudmlldy56b29tID0gdGhpcy56b29tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsYXQnOlxuICAgICAgICAgIHRoaXMudmlldy5jZW50ZXIgPSB0aGlzLmNlbnRlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbG5nJzpcbiAgICAgICAgICB0aGlzLnZpZXcuY2VudGVyID0gdGhpcy5jZW50ZXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Jhc2VtYXAnOlxuICAgICAgICAgIHRoaXMubWFwLmJhc2VtYXAgPSB0aGlzLmJhc2VtYXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNlbnRlciAoKSB7XG4gICAgICByZXR1cm4gW3RoaXMubG5nLCB0aGlzLmxhdF07XG4gICAgfVxuXG4gICAgZ2V0IHpvb20gKCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd6b29tJyksIDEwKTtcbiAgICB9XG5cbiAgICBzZXQgem9vbSAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd6b29tJywgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBsYXQgKCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ2xhdCcpLCAxMCk7XG4gICAgfVxuXG4gICAgc2V0IGxhdCAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYXQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IGxuZyAoKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgnbG5nJyksIDEwKTtcbiAgICB9XG5cbiAgICBzZXQgbG5nICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xuZycsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgYmFzZW1hcCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Jhc2VtYXAnKTtcbiAgICB9XG5cbiAgICBzZXQgYmFzZW1hcCAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdiYXNlbWFwJywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoaWQpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb250YWluZXIuaWQgPSBpZDtcbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH1cblxuICBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2VzcmktbWFwJywgRXNyaU1hcEVsZW1lbnQpO1xufSk7Il0sIm5hbWVzIjpbIkhUTUxFbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7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