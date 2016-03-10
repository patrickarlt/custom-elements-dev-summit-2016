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


        // createdCallback will be replaced by
        // `constructor` in the newer spec
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

          this.dispatchEvent(new CustomEvent('mapready'));

          this.ready = true;
        }
      }, {
        key: "detachedCallback",
        value: function detachedCallback() {}
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(name, oldValue, newValue) {
          if (this.view && this.map) {
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

    // document.registerElement becomes document.defineElement
    // in the newer spec
    document.registerElement('esri-map', EsriMapElement);
  });

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1tYXAuanMiLCJzb3VyY2VzIjpbIi4uL3V0aWxzL0hUTUxFbGVtZW50LmpzIiwiLi4vY29tcG9uZW50cy9lc3JpLW1hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBZb3UgY2FuJ3QgZXh0ZW5kIHRoZSBIVE1MRWxlbWVudCBwcm90b3R5cGVcbi8vIGluIFNhZmFyaSBiZWN1YXNlIGl0IGlzIGRlY2xhcmVkIGFzIGFuIE9iamVjdFxuLy9cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTQ0NTdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMTU0OFxudmFyIF9IVE1MRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICBfSFRNTEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgX0hUTUxFbGVtZW50LnByb3RvdHlwZSA9IEhUTUxFbGVtZW50LnByb3RvdHlwZTtcbn0gZWxzZSB7XG4gIF9IVE1MRWxlbWVudCA9IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBfSFRNTEVsZW1lbnQ7XG4iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMnO1xuXG52YXIgaWRzID0gMDtcblxucmVxdWlyZShbXG4gIFwiZXNyaS9NYXBcIixcbiAgXCJlc3JpL3ZpZXdzL01hcFZpZXdcIlxuXSwgZnVuY3Rpb24gKE1hcCwgTWFwVmlldykge1xuXG4gIGNsYXNzIEVzcmlNYXBFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgLy8gY3JlYXRlZENhbGxiYWNrIHdpbGwgYmUgcmVwbGFjZWQgYnlcbiAgICAvLyBgY29uc3RydWN0b3JgIGluIHRoZSBuZXdlciBzcGVjXG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgICAgdGhpcy5faWQgPSBgZXNyaS1tYXAtJHtpZHMrK31gO1xuICAgICAgdGhpcy5fY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKHRoaXMuX2lkKTtcbiAgICB9XG5cbiAgICBhdHRhY2hlZENhbGxiYWNrICgpIHtcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcblxuICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKHtcbiAgICAgICAgYmFzZW1hcDogdGhpcy5iYXNlbWFwXG4gICAgICB9KTtcblxuICAgICAgdGhpcy52aWV3ID0gbmV3IE1hcFZpZXcoe1xuICAgICAgICBjb250YWluZXI6IHRoaXMuX2NvbnRhaW5lci5pZCxcbiAgICAgICAgem9vbTogdGhpcy56b29tLFxuICAgICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbWFwcmVhZHknKSk7XG5cbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgIH1cblxuICAgIGRldGFjaGVkQ2FsbGJhY2sgKCkge1xuXG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgIGlmKHRoaXMudmlldyAmJiB0aGlzLm1hcCl7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgIGNhc2UgJ3pvb20nOlxuICAgICAgICAgICAgdGhpcy52aWV3Lnpvb20gPSB0aGlzLnpvb207XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdsYXQnOlxuICAgICAgICAgICAgdGhpcy52aWV3LmNlbnRlciA9IHRoaXMuY2VudGVyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbG5nJzpcbiAgICAgICAgICAgIHRoaXMudmlldy5jZW50ZXIgPSB0aGlzLmNlbnRlcjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Jhc2VtYXAnOlxuICAgICAgICAgICAgdGhpcy5tYXAuYmFzZW1hcCA9IHRoaXMuYmFzZW1hcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNlbnRlciAoKSB7XG4gICAgICByZXR1cm4gW3RoaXMubG5nLCB0aGlzLmxhdF07XG4gICAgfVxuXG4gICAgZ2V0IHpvb20gKCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd6b29tJyksIDEwKTtcbiAgICB9XG5cbiAgICBzZXQgem9vbSAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd6b29tJywgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBsYXQgKCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ2xhdCcpLCAxMCk7XG4gICAgfVxuXG4gICAgc2V0IGxhdCAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYXQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IGxuZyAoKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgnbG5nJyksIDEwKTtcbiAgICB9XG5cbiAgICBzZXQgbG5nICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xuZycsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgYmFzZW1hcCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Jhc2VtYXAnKTtcbiAgICB9XG5cbiAgICBzZXQgYmFzZW1hcCAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdiYXNlbWFwJywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoaWQpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb250YWluZXIuaWQgPSBpZDtcbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH1cblxuICAvLyBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgYmVjb21lcyBkb2N1bWVudC5kZWZpbmVFbGVtZW50XG4gIC8vIGluIHRoZSBuZXdlciBzcGVjXG4gIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnZXNyaS1tYXAnLCBFc3JpTWFwRWxlbWVudCk7XG59KTsiXSwibmFtZXMiOlsiSFRNTEVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLEVBQUEsSUFBSSxZQUFKOztBQUVBLEVBQUEsSUFBSSxPQUFPLFdBQVAsS0FBdUIsVUFBdkIsRUFBbUM7QUFDckMsRUFBQSxpQkFBZSx3QkFBWSxFQUFaLENBRHNCO0FBRXJDLEVBQUEsZUFBYSxTQUFiLEdBQXlCLFlBQVksU0FBWixDQUZZO0dBQXZDLE1BR087QUFDTCxFQUFBLGlCQUFlLFdBQWYsQ0FESztHQUhQOztBQU9BLHNCQUFlLFlBQWY7O0VDWkEsSUFBSSxNQUFNLENBQU47O0FBRUosRUFBQSxRQUFRLENBQ04sVUFETSxFQUVOLG9CQUZNLENBQVIsRUFHRyxVQUFVLEdBQVYsRUFBZSxPQUFmLEVBQXdCO1FBRW5COzs7Ozs7Ozs7Ozs7OzswQ0FJYztBQUNoQixFQUFBLGFBQUssR0FBTCxpQkFBdUIsS0FBdkIsQ0FEZ0I7QUFFaEIsRUFBQSxhQUFLLFVBQUwsR0FBa0IsZ0JBQWdCLEtBQUssR0FBTCxDQUFsQyxDQUZnQjs7OzsyQ0FLRTtBQUNsQixFQUFBLGFBQUssV0FBTCxDQUFpQixLQUFLLFVBQUwsQ0FBakIsQ0FEa0I7O0FBR2xCLEVBQUEsYUFBSyxHQUFMLEdBQVcsSUFBSSxHQUFKLENBQVE7QUFDakIsRUFBQSxtQkFBUyxLQUFLLE9BQUw7V0FE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