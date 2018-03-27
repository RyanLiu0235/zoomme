(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Zoomme = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
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

var src = createCommonjsModule(function (module) {
  var viewerStyle = {
    position: 'fixed',
    display: 'none',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'zoom-out',
    'background-color': 'rgba(0, 0, 0, .6)'
  };

  var previewStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    'max-width': '100%',
    'max-height': '100%',
    cursor: 'default',
    transform: 'translate3D(-50%, -50%, 0)'
  };

  var createStyleText = function createStyleText(sel, style) {
    var text = sel + ' {\n';
    for (var item in style) {
      text += '  ' + item + ': ' + style[item] + ';\n';
    }
    text += '}\n';
    return text;
  };

  var createElement = function createElement(tagName, attrs) {
    var tag = document.createElement(tagName);
    for (var item in attrs) {
      tag.setAttribute(item, attrs[item]);
    }
    return tag;
  };

  var Zoomme = function () {
    function Zoomme(_ref) {
      var _this = this;

      var container = _ref.container;
      classCallCheck(this, Zoomme);

      container.addEventListener('click', function (e) {
        var target = e.target;
        switch (target.tagName) {
          case 'IMG':
            var _src = target.getAttribute('src');
            _this.setPreviewSrc(_src);
            _this.viewer.style.display = 'block';
            break;
          default:
            _this.viewer.style.display = 'none';
            break;
        }
      });
      this.document = container.ownerDocument;

      // create DOM
      this.createViewer();
      this.createPreview();
      this.createStyle();
    }

    createClass(Zoomme, [{
      key: 'createStyle',
      value: function createStyle() {
        var style = createElement('style', { text: 'text/css' });
        var text = createStyleText('.zoomme-viewer', viewerStyle) + createStyleText('.zoomme-viewer .zoomme-preview', previewStyle);

        style.textContent = text;
        this.document.head.appendChild(style);
      }
    }, {
      key: 'createViewer',
      value: function createViewer() {
        var viewer = createElement('div', { class: 'zoomme-viewer' });
        this.document.body.appendChild(viewer);
        this.viewer = viewer;
      }
    }, {
      key: 'createPreview',
      value: function createPreview() {
        var preview = createElement('img', { class: 'zoomme-preview' });
        this.preview = preview;
        this.viewer.appendChild(preview);
      }
    }, {
      key: 'setPreviewSrc',
      value: function setPreviewSrc(src) {
        this.preview.setAttribute('src', src);
      }
    }]);
    return Zoomme;
  }();

  module.exports = Zoomme;
});

return src;

})));
