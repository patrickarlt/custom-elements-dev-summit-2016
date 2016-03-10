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

  // Polyfill for creating CustomEvents on IE9/10/11

  // code pulled from:
  // https://github.com/d4tocchini/customevent-polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
  // https://github.com/krambuhl/custom-event-polyfill/blob/master/custom-event-polyfill.js
  try {
    new CustomEvent$1("test");
  } catch (e) {
    var CustomEvent$1 = function CustomEvent(event, params) {
      var evt;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent$1.prototype = window.Event.prototype;
    window.CustomEvent; // expose definition to window
  }

  require(['esri/widgets/BasemapToggle/BasemapToggleViewModel'], function (BasemapToggleViewModel) {
    var EsriBasemapToggleElement = function (_HTMLElement) {
      babelHelpers.inherits(EsriBasemapToggleElement, _HTMLElement);

      function EsriBasemapToggleElement() {
        babelHelpers.classCallCheck(this, EsriBasemapToggleElement);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EsriBasemapToggleElement).apply(this, arguments));
      }

      babelHelpers.createClass(EsriBasemapToggleElement, [{
        key: 'createdCallback',
        value: function createdCallback() {
          this.insertAdjacentHTML('afterbegin', '\n        <img src="" alt="" />\n        <p></p>\n      ');

          this.image = this.querySelector('img');
          this.text = this.querySelector('p');
        }
      }, {
        key: 'attachedCallback',
        value: function attachedCallback() {
          var _this2 = this;

          this._mapElement = document.getElementById(this.getAttribute('map'));
          this.addEventListener('click', this.handleClick);

          if (this._mapElement.ready) {
            this.init();
          } else {
            this._mapElement.addEventListener('ready', function (e) {
              _this2.init();
            });
          }
        }
      }, {
        key: 'detachedCallback',
        value: function detachedCallback() {
          this.addEventListener('click', this.handleClick);
        }
      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'basemap') {
            this.viewModel.basemap = newValue;
            this.update();
          }
        }
      }, {
        key: 'handleClick',
        value: function handleClick(e) {
          this.viewModel.toggle();
          this.update();
          this.dispatchEvent(new CustomEvent('togglebasemap', {
            bubbles: true
          }));
          e.preventDefault();
          e.stopPropagation();
        }
      }, {
        key: 'init',
        value: function init() {
          this.viewModel = new BasemapToggleViewModel({
            basemap: this._mapElement.map.basemap,
            secondaryBasemap: this.basemap,
            map: this._mapElement.map,
            view: this._mapElement.view
          });

          this.update();
        }
      }, {
        key: 'update',
        value: function update(quiet) {
          var info = this.viewModel.getBasemapInfo();
          this.text.textContent = info.title;
          this.image.src = info.thumbnailUrl;
          this.image.alt = info.title;
        }
      }, {
        key: 'basemap',
        get: function get() {
          return this.getAttribute('basemap');
        },
        set: function set(value) {
          this.setAttribute('basemap', value);
        }
      }]);
      return EsriBasemapToggleElement;
    }(HTMLElement$1);

    document.registerElement('esri-basemap-toggle', EsriBasemapToggleElement);
  });

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1iYXNlbWFwLXRvZ2dsZS5qcyIsInNvdXJjZXMiOlsiLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMiLCIuLi91dGlscy9DdXN0b21FdmVudC5qcyIsIi4uL2NvbXBvbmVudHMvZXNyaS1iYXNlbWFwLXRvZ2dsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBZb3UgY2FuJ3QgZXh0ZW5kIHRoZSBIVE1MRWxlbWVudCBwcm90b3R5cGVcbi8vIGluIFNhZmFyaSBiZWN1YXNlIGl0IGlzIGRlY2xhcmVkIGFzIGFuIE9iamVjdFxuLy9cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTQ0NTdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMTU0OFxudmFyIF9IVE1MRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICBfSFRNTEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgX0hUTUxFbGVtZW50LnByb3RvdHlwZSA9IEhUTUxFbGVtZW50LnByb3RvdHlwZTtcbn0gZWxzZSB7XG4gIF9IVE1MRWxlbWVudCA9IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBfSFRNTEVsZW1lbnQ7XG4iLCIvLyBQb2x5ZmlsbCBmb3IgY3JlYXRpbmcgQ3VzdG9tRXZlbnRzIG9uIElFOS8xMC8xMVxuXG4vLyBjb2RlIHB1bGxlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Q0dG9jY2hpbmkvY3VzdG9tZXZlbnQtcG9seWZpbGxcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudCNQb2x5ZmlsbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyYW1idWhsL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9ibG9iL21hc3Rlci9jdXN0b20tZXZlbnQtcG9seWZpbGwuanNcbnRyeSB7XG4gIG5ldyBDdXN0b21FdmVudChcInRlc3RcIik7XG59IGNhdGNoKGUpIHtcbiAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0O1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gIHdpbmRvdy5DdXN0b21FdmVudDsgLy8gZXhwb3NlIGRlZmluaXRpb24gdG8gd2luZG93XG59XG4iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMnO1xuaW1wb3J0ICcuLi91dGlscy9DdXN0b21FdmVudC5qcyc7XG5cbnJlcXVpcmUoW1xuICAnZXNyaS93aWRnZXRzL0Jhc2VtYXBUb2dnbGUvQmFzZW1hcFRvZ2dsZVZpZXdNb2RlbCdcbl0sIGZ1bmN0aW9uIChCYXNlbWFwVG9nZ2xlVmlld01vZGVsKSB7XG4gIGNsYXNzIEVzcmlCYXNlbWFwVG9nZ2xlRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGBcbiAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiAvPlxuICAgICAgICA8cD48L3A+XG4gICAgICBgKTtcblxuICAgICAgdGhpcy5pbWFnZSA9IHRoaXMucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgICB0aGlzLnRleHQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgICB9XG5cbiAgICBhdHRhY2hlZENhbGxiYWNrICgpIHtcbiAgICAgIHRoaXMuX21hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEF0dHJpYnV0ZSgnbWFwJykpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICBpZiAodGhpcy5fbWFwRWxlbWVudC5yZWFkeSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX21hcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHknLCAoZSkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRhY2hlZENhbGxiYWNrICgpIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgaWYgKG5hbWUgPT09ICdiYXNlbWFwJykge1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5iYXNlbWFwID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgKGUpIHtcbiAgICAgIHRoaXMudmlld01vZGVsLnRvZ2dsZSgpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3RvZ2dsZWJhc2VtYXAnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH0pKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaW5pdCAoKSB7XG4gICAgICB0aGlzLnZpZXdNb2RlbCA9IG5ldyBCYXNlbWFwVG9nZ2xlVmlld01vZGVsKHtcbiAgICAgICAgYmFzZW1hcDogdGhpcy5fbWFwRWxlbWVudC5tYXAuYmFzZW1hcCxcbiAgICAgICAgc2Vjb25kYXJ5QmFzZW1hcDogdGhpcy5iYXNlbWFwLFxuICAgICAgICBtYXA6IHRoaXMuX21hcEVsZW1lbnQubWFwLFxuICAgICAgICB2aWV3OiB0aGlzLl9tYXBFbGVtZW50LnZpZXdcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSAocXVpZXQpIHtcbiAgICAgIHZhciBpbmZvID0gdGhpcy52aWV3TW9kZWwuZ2V0QmFzZW1hcEluZm8oKTtcbiAgICAgIHRoaXMudGV4dC50ZXh0Q29udGVudCA9IGluZm8udGl0bGU7XG4gICAgICB0aGlzLmltYWdlLnNyYyA9IGluZm8udGh1bWJuYWlsVXJsO1xuICAgICAgdGhpcy5pbWFnZS5hbHQgPSBpbmZvLnRpdGxlO1xuICAgIH1cblxuICAgIGdldCBiYXNlbWFwICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYmFzZW1hcCcpO1xuICAgIH1cblxuICAgIHNldCBiYXNlbWFwICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Jhc2VtYXAnLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdlc3JpLWJhc2VtYXAtdG9nZ2xlJywgRXNyaUJhc2VtYXBUb2dnbGVFbGVtZW50KTtcbn0pOyJdLCJuYW1lcyI6WyJDdXN0b21FdmVudCIsIkhUTUxFbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxFQUFBLElBQUksWUFBSjs7QUFFQSxFQUFBLElBQUksT0FBTyxXQUFQLEtBQXVCLFVBQXZCLEVBQW1DO0FBQ3JDLEVBQUEsaUJBQWUsd0JBQVksRUFBWixDQURzQjtBQUVyQyxFQUFBLGVBQWEsU0FBYixHQUF5QixZQUFZLFNBQVosQ0FGWTtHQUF2QyxNQUdPO0FBQ0wsRUFBQSxpQkFBZSxXQUFmLENBREs7R0FIUDs7QUFPQSxzQkFBZSxZQUFmOzs7Ozs7OztBQ1JBLEVBQUEsSUFBSTtBQUNGLEVBQUEsTUFBSUEsYUFBSixDQUFnQixNQUFoQixFQURFO0dBQUosQ0FFRSxPQUFNLENBQU4sRUFBUztBQUNULEVBQUEsTUFBSUEsZ0JBQWMsU0FBZCxXQUFjLENBQVUsS0FBVixFQUFpQixNQUFqQixFQUF5QjtBQUN6QyxFQUFBLFFBQUksR0FBSixDQUR5QztBQUV6QyxFQUFBLGFBQVMsVUFBVTtBQUNmLEVBQUEsZUFBUyxLQUFUO0FBQ0EsRUFBQSxrQkFBWSxLQUFaO0FBQ0EsRUFBQSxjQUFRLFNBQVI7T0FISyxDQUZnQzs7QUFRekMsRUFBQSxVQUFNLFNBQVMsV0FBVCxDQUFxQixhQUFyQixDQUFOLENBUnlDO0FBU3pDLEVBQUEsUUFBSSxlQUFKLENBQW9CLEtBQXBCLEVBQTJCLE9BQU8sT0FBUCxFQUFnQixPQUFPLFVBQVAsRUFBbUIsT0FBTyxNQUFQLENBQTlELENBVHlDO0FBVXpDLEVBQUEsV0FBTyxHQUFQLENBVnlDO0tBQXpCLENBRFQ7O0FBY1QsRUFBQSxnQkFBWSxTQUFaLEdBQXdCLE9BQU8sS0FBUCxDQUFhLFNBQWIsQ0FkZjtBQWVULEVBQUEsU0FBTyxXQUFQO0FBZlMsRUFBQTs7RUNMWCxRQUFRLENBQ04sbURBRE0sQ0FBUixFQUVHLFVBQVUsc0JBQVYsRUFBa0M7UUFDN0I7Ozs7Ozs7Ozs7MENBQ2M7QUFDaEIsRUFBQSxhQUFLLGtCQUFMLENBQXdCLFlBQXhCLDhEQURnQjs7QUFNaEIsRUFBQSxhQUFLLEtBQUwsR0FBYSxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBYixDQU5nQjtBQU9oQixFQUFBLGFBQUssSUFBTCxHQUFZLEtBQUssYUFBTCxDQUFtQixHQUFuQixDQUFaLENBUGdCOzs7OzJDQVVFOzs7QUFDbEIsRUFBQSxhQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULENBQXdCLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUF4QixDQUFuQixDQURrQjtBQUVsQixFQUFBLGFBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSyxXQUFMLENBQS9CLENBRmtCOztBQUlsQixFQUFBLFlBQUksS0FBSyxXQUFMLENBQWlCLEtBQWpCLEVBQXdCO0FBQzFCLEVBQUEsZUFBSyxJQUFMLEdBRDBCO1dBQTVCLE1BRU87QUFDTCxFQUFBLGVBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsVUFBQyxDQUFELEVBQU87QUFDaEQsRUFBQSxtQkFBSyxJQUFMLEdBRGdEO2FBQVAsQ0FBM0MsQ0FESztXQUZQOzs7OzJDQVNrQjtBQUNsQixFQUFBLGFBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSyxXQUFMLENBQS9CLENBRGtCOzs7O2lEQUlNLE1BQU0sVUFBVSxVQUFVO0FBQ2xELEVBQUEsWUFBSSxTQUFTLFNBQVQsRUFBb0I7QUFDdEIsRUFBQSxlQUFLLFNBQUwsQ0FBZSxPQUFmLEdBQXlCLFFBQXpCLENBRHNCO0FBRXRCLEVBQUEsZUFBSyxNQUFMLEdBRnNCO1dBQXhCOzs7O29DQU1XLEdBQUc7QUFDZCxFQUFBLGFBQUssU0FBTCxDQUFlLE1BQWYsR0FEYztBQUVkLEVBQUEsYUFBSyxNQUFMLEdBRmM7QUFHZCxFQUFBLGFBQUssYUFBTCxDQUFtQixJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUM7QUFDbEQsRUFBQSxtQkFBUyxJQUFUO1dBRGlCLENBQW5CLEVBSGM7QUFNZCxFQUFBLFVBQUUsY0FBRixHQU5jO0FBT2QsRUFBQSxVQUFFLGVBQUYsR0FQYzs7OzsrQkFVUjtBQUNOLEVBQUEsYUFBSyxTQUFMLEdBQWlCLElBQUksc0JBQUosQ0FBMkI7QUFDMUMsRUFBQSxtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsT0FBckI7QUFDVCxFQUFBLDRCQUFrQixLQUFLLE9BQUw7QUFDbEIsRUFBQSxlQUFLLEtBQUssV0FBTCxDQUFpQixHQUFqQjtBQUNMLEVBQUEsZ0JBQU0sS0FBSyxXQUFMLENBQWlCLElBQWpCO1dBSlMsQ0FBakIsQ0FETTs7QUFRTixFQUFBLGFBQUssTUFBTCxHQVJNOzs7OytCQVdBLE9BQU87QUFDYixFQUFBLFlBQUksT0FBTyxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQVAsQ0FEUztBQUViLEVBQUEsYUFBSyxJQUFMLENBQVUsV0FBVixHQUF3QixLQUFLLEtBQUwsQ0FGWDtBQUdiLEVBQUEsYUFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixLQUFLLFlBQUwsQ0FISjtBQUliLEVBQUEsYUFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixLQUFLLEtBQUwsQ0FKSjs7Ozs0QkFPQTtBQUNiLEVBQUEsZUFBTyxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBUCxDQURhOzswQkFJRixPQUFPO0FBQ2xCLEVBQUEsYUFBSyxZQUFMLENBQWtCLFNBQWxCLEVBQTZCLEtBQTdCLEVBRGtCOzs7YUFuRWhCO01BQWlDQyxlQURKOztBQXlFbkMsRUFBQSxXQUFTLGVBQVQsQ0FBeUIscUJBQXpCLEVBQWdELHdCQUFoRCxFQXpFbUM7R0FBbEMsQ0FGSDs7In0=