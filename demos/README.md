These demos contain 3 custom elements. [A map](components/esri-map.js), [a feature layer](components/esri-feature-layer.js) and [a basemap toggle](components/esri-baesmap-toggle.js). These components were designed to work across a variety of frameworks. To achieve this the components are designed with a few simple standards.

* All components are written in ES 6 (according to the new Custom Elements standard) and are [compiled with Rollup](package.json#L7-10) into a simple function wrapper that will be immediately invoked upon being loading.
* Modules from the JS API are loaded with standard `require` statements.
* The elements are only registered with the DOM in the `require` statements. Once registered (after the JS API modules are loaded) their life cycles begin. This requires some communication between elements to make sure not to initialize them before they are also registered with the DOM.
* All attribute names follow DOM standards, all lowercase with no special characters.
* All event names follow DOM standards, all lowercase with no special characters.
* A custom version of `HTMLELement` is used in some cases to work around a Safari bug. https://github.com/babel/babel/issues/1548
* A polyfill for `CustomEvent` is included.