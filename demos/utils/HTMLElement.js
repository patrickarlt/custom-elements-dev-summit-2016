// You can't extend the HTMLElement prototype
// in Safari becuase it is declared as an Object
// this MIGHT be resolved in the newest versions of
// the spec so Safari might fix this in the future
//
// https://bugs.webkit.org/show_bug.cgi?id=114457
// https://github.com/babel/babel/issues/1548
var _HTMLElement;

if (typeof HTMLElement !== 'function') {
  _HTMLElement = function () {};
  _HTMLElement.prototype = HTMLElement.prototype;
} else {
  _HTMLElement = HTMLElement;
}

export default _HTMLElement;
