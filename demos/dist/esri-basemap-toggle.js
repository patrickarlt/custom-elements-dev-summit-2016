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
    new CustomEvent("test");
  } catch (e) {
    var CustomEvent = function CustomEvent(event, params) {
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

    CustomEvent.prototype = window.Event.prototype;
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
          console.log('created');
        }
      }, {
        key: 'attachedCallback',
        value: function attachedCallback() {
          console.log('attached');
        }
      }, {
        key: 'detachedCallback',
        value: function detachedCallback() {
          console.log('detached');
        }
      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {
          console.log('attributeChanged');
        }
      }]);
      return EsriBasemapToggleElement;
    }(HTMLElement$1);

    document.registerElement('esri-basemap-toggle', EsriMapElement);
  });

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1iYXNlbWFwLXRvZ2dsZS5qcyIsInNvdXJjZXMiOlsiLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMiLCIuLi91dGlscy9DdXN0b21FdmVudC5qcyIsIi4uL2NvbXBvbmVudHMvZXNyaS1iYXNlbWFwLXRvZ2dsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBZb3UgY2FuJ3QgZXh0ZW5kIHRoZSBIVE1MRWxlbWVudCBwcm90b3R5cGVcbi8vIGluIFNhZmFyaSBiZWN1YXNlIGl0IGlzIGRlY2xhcmVkIGFzIGFuIE9iamVjdFxuLy9cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTQ0NTdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMTU0OFxudmFyIF9IVE1MRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICBfSFRNTEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgX0hUTUxFbGVtZW50LnByb3RvdHlwZSA9IEhUTUxFbGVtZW50LnByb3RvdHlwZTtcbn0gZWxzZSB7XG4gIF9IVE1MRWxlbWVudCA9IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBfSFRNTEVsZW1lbnQ7XG4iLCIvLyBQb2x5ZmlsbCBmb3IgY3JlYXRpbmcgQ3VzdG9tRXZlbnRzIG9uIElFOS8xMC8xMVxuXG4vLyBjb2RlIHB1bGxlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Q0dG9jY2hpbmkvY3VzdG9tZXZlbnQtcG9seWZpbGxcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudCNQb2x5ZmlsbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyYW1idWhsL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9ibG9iL21hc3Rlci9jdXN0b20tZXZlbnQtcG9seWZpbGwuanNcbnRyeSB7XG4gIG5ldyBDdXN0b21FdmVudChcInRlc3RcIik7XG59IGNhdGNoKGUpIHtcbiAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0O1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gIHdpbmRvdy5DdXN0b21FdmVudDsgLy8gZXhwb3NlIGRlZmluaXRpb24gdG8gd2luZG93XG59XG4iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvSFRNTEVsZW1lbnQuanMnO1xuaW1wb3J0IEN1c3RvbUV2ZW50IGZyb20gJy4uL3V0aWxzL0N1c3RvbUV2ZW50LmpzJztcblxucmVxdWlyZShbXG4gICdlc3JpL3dpZGdldHMvQmFzZW1hcFRvZ2dsZS9CYXNlbWFwVG9nZ2xlVmlld01vZGVsJ1xuXSwgZnVuY3Rpb24gKEJhc2VtYXBUb2dnbGVWaWV3TW9kZWwpIHtcbiAgY2xhc3MgRXNyaUJhc2VtYXBUb2dnbGVFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkJyk7XG4gICAgfVxuXG4gICAgYXR0YWNoZWRDYWxsYmFjayAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXR0YWNoZWQnKTtcbiAgICB9XG5cbiAgICBkZXRhY2hlZENhbGxiYWNrICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkZXRhY2hlZCcpO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlQ2hhbmdlZCcpO1xuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnZXNyaS1iYXNlbWFwLXRvZ2dsZScsIEVzcmlNYXBFbGVtZW50KTtcbn0pOyJdLCJuYW1lcyI6WyJIVE1MRWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsRUFBQSxJQUFJLFlBQUo7O0FBRUEsRUFBQSxJQUFJLE9BQU8sV0FBUCxLQUF1QixVQUF2QixFQUFtQztBQUNyQyxFQUFBLGlCQUFlLHdCQUFZLEVBQVosQ0FEc0I7QUFFckMsRUFBQSxlQUFhLFNBQWIsR0FBeUIsWUFBWSxTQUFaLENBRlk7R0FBdkMsTUFHTztBQUNMLEVBQUEsaUJBQWUsV0FBZixDQURLO0dBSFA7O0FBT0Esc0JBQWUsWUFBZjs7Ozs7Ozs7QUNSQSxFQUFBLElBQUk7QUFDRixFQUFBLE1BQUksV0FBSixDQUFnQixNQUFoQixFQURFO0dBQUosQ0FFRSxPQUFNLENBQU4sRUFBUztBQUNULEVBQUEsTUFBSSxjQUFjLFNBQWQsV0FBYyxDQUFVLEtBQVYsRUFBaUIsTUFBakIsRUFBeUI7QUFDekMsRUFBQSxRQUFJLEdBQUosQ0FEeUM7QUFFekMsRUFBQSxhQUFTLFVBQVU7QUFDZixFQUFBLGVBQVMsS0FBVDtBQUNBLEVBQUEsa0JBQVksS0FBWjtBQUNBLEVBQUEsY0FBUSxTQUFSO09BSEssQ0FGZ0M7O0FBUXpDLEVBQUEsVUFBTSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBTixDQVJ5QztBQVN6QyxFQUFBLFFBQUksZUFBSixDQUFvQixLQUFwQixFQUEyQixPQUFPLE9BQVAsRUFBZ0IsT0FBTyxVQUFQLEVBQW1CLE9BQU8sTUFBUCxDQUE5RCxDQVR5QztBQVV6QyxFQUFBLFdBQU8sR0FBUCxDQVZ5QztLQUF6QixDQURUOztBQWNULEVBQUEsY0FBWSxTQUFaLEdBQXdCLE9BQU8sS0FBUCxDQUFhLFNBQWIsQ0FkZjtBQWVULEVBQUEsU0FBTyxXQUFQO0FBZlMsRUFBQTs7RUNMWCxRQUFRLENBQ04sbURBRE0sQ0FBUixFQUVHLFVBQVUsc0JBQVYsRUFBa0M7UUFDN0I7Ozs7Ozs7Ozs7MENBQ2M7QUFDaEIsRUFBQSxnQkFBUSxHQUFSLENBQVksU0FBWixFQURnQjs7OzsyQ0FJRTtBQUNsQixFQUFBLGdCQUFRLEdBQVIsQ0FBWSxVQUFaLEVBRGtCOzs7OzJDQUlBO0FBQ2xCLEVBQUEsZ0JBQVEsR0FBUixDQUFZLFVBQVosRUFEa0I7Ozs7bURBSVE7QUFDMUIsRUFBQSxnQkFBUSxHQUFSLENBQVksa0JBQVosRUFEMEI7OzthQWJ4QjtNQUFpQ0EsZUFESjs7QUFtQm5DLEVBQUEsV0FBUyxlQUFULENBQXlCLHFCQUF6QixFQUFnRCxjQUFoRCxFQW5CbUM7R0FBbEMsQ0FGSDs7In0=