// Polyfill for window.CustomEvent for IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
// https://github.com/krambuhl/custom-event-polyfill/blob/master/custom-event-polyfill.js
try {
  new CustomEvent("test");
} catch(e) {
  var CustomEvent = function (event, params) {
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
  window.CustomEvent = CustomEvent; // expose definition to window
}
