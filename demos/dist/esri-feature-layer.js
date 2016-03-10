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

  require(["esri/layers/FeatureLayer", "esri/PopupTemplate"], function (FeatureLayer, PopupTemplate) {
    var EsriFeatureLayerElement = function (_HTMLElement) {
      babelHelpers.inherits(EsriFeatureLayerElement, _HTMLElement);

      function EsriFeatureLayerElement() {
        babelHelpers.classCallCheck(this, EsriFeatureLayerElement);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EsriFeatureLayerElement).apply(this, arguments));
      }

      babelHelpers.createClass(EsriFeatureLayerElement, [{
        key: "createdCallback",
        value: function createdCallback() {}
      }, {
        key: "attachedCallback",
        value: function attachedCallback() {
          var _this2 = this;

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
            this.parentNode.addEventListener('mapready', function () {
              _this2.parentNode.map.add(_this2.layer);
            });
          }
        }
      }, {
        key: "detachedCallback",
        value: function detachedCallback() {
          console.log('detachedCallback', this);
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback() {
          switch (name) {
            case 'popuptitle':
              break;
            case 'popupbody':
              break;
          }
        }
      }, {
        key: "url",
        get: function get() {
          return this.getAttribute('url');
        },
        set: function set(value) {
          this.setAttribute('url', value);
        }
      }, {
        key: "popupbody",
        get: function get() {
          return this.getAttribute('popupbody');
        },
        set: function set(value) {
          this.setAttribute('popupbody', value);
        }
      }, {
        key: "popuptitle",
        get: function get() {
          return this.getAttribute('popuptitle');
        },
        set: function set(value) {
          this.setAttribute('popuptitle', value);
        }
      }]);
      return EsriFeatureLayerElement;
    }(HTMLElement$1);

    document.registerElement('esri-feature-layer', EsriFeatureLayerElement);
  });

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1mZWF0dXJlLWxheWVyLmpzIiwic291cmNlcyI6WyIuLi91dGlscy9IVE1MRWxlbWVudC5qcyIsIi4uL2NvbXBvbmVudHMvZXNyaS1mZWF0dXJlLWxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFlvdSBjYW4ndCBleHRlbmQgdGhlIEhUTUxFbGVtZW50IHByb3RvdHlwZVxuLy8gaW4gU2FmYXJpIGJlY3Vhc2UgaXQgaXMgZGVjbGFyZWQgYXMgYW4gT2JqZWN0XG4vL1xuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTExNDQ1N1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy8xNTQ4XG52YXIgX0hUTUxFbGVtZW50O1xuXG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gIF9IVE1MRWxlbWVudCA9IGZ1bmN0aW9uICgpIHt9O1xuICBfSFRNTEVsZW1lbnQucHJvdG90eXBlID0gSFRNTEVsZW1lbnQucHJvdG90eXBlO1xufSBlbHNlIHtcbiAgX0hUTUxFbGVtZW50ID0gSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IF9IVE1MRWxlbWVudDtcbiIsImltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuLi91dGlscy9IVE1MRWxlbWVudC5qcyc7XG5cbnJlcXVpcmUoW1xuICBcImVzcmkvbGF5ZXJzL0ZlYXR1cmVMYXllclwiLFxuICBcImVzcmkvUG9wdXBUZW1wbGF0ZVwiXG5dLCBmdW5jdGlvbiAoRmVhdHVyZUxheWVyLCBQb3B1cFRlbXBsYXRlKSB7XG5cbiAgY2xhc3MgRXNyaUZlYXR1cmVMYXllckVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIH1cblxuICAgIGF0dGFjaGVkQ2FsbGJhY2sgKCkge1xuICAgICAgdmFyIHVybCA9IHRoaXMudXJsO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICB2YXIgcG9wdXBUaXRsZSA9IHRoaXMucG9wdXB0aXRsZTtcbiAgICAgIHZhciBwb3B1cEJvZHkgPSB0aGlzLnBvcHVwYm9keTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IG5ldyBQb3B1cFRlbXBsYXRlKHtcbiAgICAgICAgdGl0bGU6IHBvcHVwVGl0bGUsXG4gICAgICAgIGNvbnRlbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucG9wdXBib2R5KS5pbm5lckhUTUxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XG4gICAgICAgIG91dEZpZWxkczogW1wiKlwiXSxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHBvcHVwVGVtcGxhdGU6IHRoaXMudGVtcGxhdGVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5wYXJlbnROb2RlLnJlYWR5KSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5tYXAuYWRkKHRoaXMubGF5ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21hcHJlYWR5JywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5tYXAuYWRkKHRoaXMubGF5ZXIpO1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgZGV0YWNoZWRDYWxsYmFjayAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGV0YWNoZWRDYWxsYmFjaycsIHRoaXMpO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoKSB7XG4gICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgY2FzZSAncG9wdXB0aXRsZSc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BvcHVwYm9keSc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHVybCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3VybCcpO1xuICAgIH1cblxuICAgIHNldCB1cmwgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndXJsJywgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBwb3B1cGJvZHkgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwb3B1cGJvZHknKTtcbiAgICB9XG5cbiAgICBzZXQgcG9wdXBib2R5ICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3BvcHVwYm9keScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgcG9wdXB0aXRsZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BvcHVwdGl0bGUnKTtcbiAgICB9XG5cbiAgICBzZXQgcG9wdXB0aXRsZSAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3B1cHRpdGxlJywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnZXNyaS1mZWF0dXJlLWxheWVyJywgRXNyaUZlYXR1cmVMYXllckVsZW1lbnQpO1xuXG59KTsiXSwibmFtZXMiOlsiSFRNTEVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLEVBQUEsSUFBSSxZQUFKOztBQUVBLEVBQUEsSUFBSSxPQUFPLFdBQVAsS0FBdUIsVUFBdkIsRUFBbUM7QUFDckMsRUFBQSxpQkFBZSx3QkFBWSxFQUFaLENBRHNCO0FBRXJDLEVBQUEsZUFBYSxTQUFiLEdBQXlCLFlBQVksU0FBWixDQUZZO0dBQXZDLE1BR087QUFDTCxFQUFBLGlCQUFlLFdBQWYsQ0FESztHQUhQOztBQU9BLHNCQUFlLFlBQWY7O0VDWkEsUUFBUSxDQUNOLDBCQURNLEVBRU4sb0JBRk0sQ0FBUixFQUdHLFVBQVUsWUFBVixFQUF3QixhQUF4QixFQUF1QztRQUVsQzs7Ozs7Ozs7OzswQ0FDYzs7OzJDQUdFOzs7QUFDbEIsRUFBQSxZQUFJLE1BQU0sS0FBSyxHQUFMLENBRFE7QUFFbEIsRUFBQSxZQUFJLGFBQWEsS0FBSyxVQUFMLENBRkM7QUFHbEIsRUFBQSxZQUFJLGFBQWEsS0FBSyxVQUFMLENBSEM7QUFJbEIsRUFBQSxZQUFJLFlBQVksS0FBSyxTQUFMLENBSkU7O0FBTWxCLEVBQUEsYUFBSyxRQUFMLEdBQWdCLElBQUksYUFBSixDQUFrQjtBQUNoQyxFQUFBLGlCQUFPLFVBQVA7QUFDQSxFQUFBLG1CQUFTLFNBQVMsY0FBVCxDQUF3QixLQUFLLFNBQUwsQ0FBeEIsQ0FBd0MsU0FBeEM7V0FGSyxDQUFoQixDQU5rQjs7QUFXbEIsRUFBQSxhQUFLLEtBQUwsR0FBYSxJQUFJLFlBQUosQ0FBaUI7QUFDNUIsRUFBQSxxQkFBVyxDQUFDLEdBQUQsQ0FBWDtBQUNBLEVBQUEsZUFBSyxHQUFMO0FBQ0EsRUFBQSx5QkFBZSxLQUFLLFFBQUw7V0FISixDQUFiLENBWGtCOztBQWlCbEIsRUFBQSxZQUFJLEtBQUssVUFBTCxDQUFnQixLQUFoQixFQUF1QjtBQUN6QixFQUFBLGVBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixHQUFwQixDQUF3QixLQUFLLEtBQUwsQ0FBeEIsQ0FEeUI7V0FBM0IsTUFFTztBQUNMLEVBQUEsZUFBSyxVQUFMLENBQWdCLGdCQUFoQixDQUFpQyxVQUFqQyxFQUE2QyxZQUFNO0FBQ2pELEVBQUEsbUJBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixHQUFwQixDQUF3QixPQUFLLEtBQUwsQ0FBeEIsQ0FEaUQ7YUFBTixDQUE3QyxDQURLO1dBRlA7Ozs7MkNBVWtCO0FBQ2xCLEVBQUEsZ0JBQVEsR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDLEVBRGtCOzs7O21EQUlRO0FBQzFCLEVBQUEsZ0JBQVEsSUFBUjtBQUNFLEVBQUEsZUFBSyxZQUFMO0FBQ0UsRUFBQSxrQkFERjtBQURGLEVBQUEsZUFHTyxXQUFMO0FBQ0UsRUFBQSxrQkFERjtBQUhGLEVBQUEsU0FEMEI7Ozs7NEJBU2pCO0FBQ1QsRUFBQSxlQUFPLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUFQLENBRFM7OzBCQUlGLE9BQU87QUFDZCxFQUFBLGFBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixLQUF6QixFQURjOzs7OzRCQUlDO0FBQ2YsRUFBQSxlQUFPLEtBQUssWUFBTCxDQUFrQixXQUFsQixDQUFQLENBRGU7OzBCQUlGLE9BQU87QUFDcEIsRUFBQSxhQUFLLFlBQUwsQ0FBa0IsV0FBbEIsRUFBK0IsS0FBL0IsRUFEb0I7Ozs7NEJBSUo7QUFDaEIsRUFBQSxlQUFPLEtBQUssWUFBTCxDQUFrQixZQUFsQixDQUFQLENBRGdCOzswQkFJRixPQUFPO0FBQ3JCLEVBQUEsYUFBSyxZQUFMLENBQWtCLFlBQWxCLEVBQWdDLEtBQWhDLEVBRHFCOzs7YUFoRW5CO01BQWdDQSxlQUZFOztBQXVFeEMsRUFBQSxXQUFTLGVBQVQsQ0FBeUIsb0JBQXpCLEVBQStDLHVCQUEvQyxFQXZFd0M7R0FBdkMsQ0FISDs7In0=