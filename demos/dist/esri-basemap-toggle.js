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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1iYXNlbWFwLXRvZ2dsZS5qcyIsInNvdXJjZXMiOlsiLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMiLCIuLi91dGlscy9DdXN0b21FdmVudC5qcyIsIi4uL2NvbXBvbmVudHMvZXNyaS1iYXNlbWFwLXRvZ2dsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBZb3UgY2FuJ3QgZXh0ZW5kIHRoZSBIVE1MRWxlbWVudCBwcm90b3R5cGVcbi8vIGluIFNhZmFyaSBiZWN1YXNlIGl0IGlzIGRlY2xhcmVkIGFzIGFuIE9iamVjdFxuLy9cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTQ0NTdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMTU0OFxudmFyIF9IVE1MRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICBfSFRNTEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgX0hUTUxFbGVtZW50LnByb3RvdHlwZSA9IEhUTUxFbGVtZW50LnByb3RvdHlwZTtcbn0gZWxzZSB7XG4gIF9IVE1MRWxlbWVudCA9IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBfSFRNTEVsZW1lbnQ7XG4iLCIvLyBQb2x5ZmlsbCBmb3IgY3JlYXRpbmcgQ3VzdG9tRXZlbnRzIG9uIElFOS8xMC8xMVxuXG4vLyBjb2RlIHB1bGxlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Q0dG9jY2hpbmkvY3VzdG9tZXZlbnQtcG9seWZpbGxcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudCNQb2x5ZmlsbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyYW1idWhsL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9ibG9iL21hc3Rlci9jdXN0b20tZXZlbnQtcG9seWZpbGwuanNcbnRyeSB7XG4gIG5ldyBDdXN0b21FdmVudChcInRlc3RcIik7XG59IGNhdGNoKGUpIHtcbiAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0O1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gIHdpbmRvdy5DdXN0b21FdmVudDsgLy8gZXhwb3NlIGRlZmluaXRpb24gdG8gd2luZG93XG59XG4iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMnO1xuaW1wb3J0ICcuLi91dGlscy9DdXN0b21FdmVudC5qcyc7XG5cbnJlcXVpcmUoW1xuICAnZXNyaS93aWRnZXRzL0Jhc2VtYXBUb2dnbGUvQmFzZW1hcFRvZ2dsZVZpZXdNb2RlbCdcbl0sIGZ1bmN0aW9uIChCYXNlbWFwVG9nZ2xlVmlld01vZGVsKSB7XG5cbiAgY2xhc3MgRXNyaUJhc2VtYXBUb2dnbGVFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYFxuICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIC8+XG4gICAgICAgIDxwPjwvcD5cbiAgICAgIGApO1xuXG4gICAgICB0aGlzLmltYWdlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICAgIHRoaXMudGV4dCA9IHRoaXMucXVlcnlTZWxlY3RvcigncCcpO1xuICAgIH1cblxuICAgIGF0dGFjaGVkQ2FsbGJhY2sgKCkge1xuICAgICAgdGhpcy5fbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0QXR0cmlidXRlKCdtYXAnKSk7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG5cbiAgICAgIGlmICh0aGlzLl9tYXBFbGVtZW50LnJlYWR5KSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbWFwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeScsIChlKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRldGFjaGVkQ2FsbGJhY2sgKCkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICBpZiAobmFtZSA9PT0gJ2Jhc2VtYXAnKSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsLmJhc2VtYXAgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayAoZSkge1xuICAgICAgdGhpcy52aWV3TW9kZWwudG9nZ2xlKCk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndG9nZ2xlYmFzZW1hcCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZVxuICAgICAgfSkpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpbml0ICgpIHtcbiAgICAgIHRoaXMudmlld01vZGVsID0gbmV3IEJhc2VtYXBUb2dnbGVWaWV3TW9kZWwoe1xuICAgICAgICBiYXNlbWFwOiB0aGlzLl9tYXBFbGVtZW50Lm1hcC5iYXNlbWFwLFxuICAgICAgICBzZWNvbmRhcnlCYXNlbWFwOiB0aGlzLmJhc2VtYXAsXG4gICAgICAgIG1hcDogdGhpcy5fbWFwRWxlbWVudC5tYXAsXG4gICAgICAgIHZpZXc6IHRoaXMuX21hcEVsZW1lbnQudmlld1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlIChxdWlldCkge1xuICAgICAgdmFyIGluZm8gPSB0aGlzLnZpZXdNb2RlbC5nZXRCYXNlbWFwSW5mbygpO1xuICAgICAgdGhpcy50ZXh0LnRleHRDb250ZW50ID0gaW5mby50aXRsZTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW5mby50aHVtYm5haWxVcmw7XG4gICAgICB0aGlzLmltYWdlLmFsdCA9IGluZm8udGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0IGJhc2VtYXAgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdiYXNlbWFwJyk7XG4gICAgfVxuXG4gICAgc2V0IGJhc2VtYXAgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYmFzZW1hcCcsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2VzcmktYmFzZW1hcC10b2dnbGUnLCBFc3JpQmFzZW1hcFRvZ2dsZUVsZW1lbnQpO1xufSk7Il0sIm5hbWVzIjpbIkN1c3RvbUV2ZW50IiwiSFRNTEVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLEVBQUEsSUFBSSxZQUFKOztBQUVBLEVBQUEs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