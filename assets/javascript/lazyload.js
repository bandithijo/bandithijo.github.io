// Echo.js - Lazy loading library
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.echo = factory(root);
  }
})(this, function (root) {

  'use strict';

  var echo = {};

  var callback = function () { };

  var offset, poll, delay, useDebounce, unload;

  var isHidden = function (element) {
    return (element.offsetParent === null);
  };

  var inView = function (element, view) {
    if (isHidden(element)) {
      return false;
    }

    var box = element.getBoundingClientRect();
    return (
      box.right >= view.l &&
      box.bottom >= view.t &&
      box.left <= view.r &&
      box.top <= view.b
    );
  };

  var debounceOrThrottle = function () {
    if (!useDebounce && !!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function () {
      echo.render();
      poll = null;
    }, delay);
  };

  echo.init = function (opts) {
    opts = opts || {};
    var offsetAll = opts.offset || 0;
    var offsetVertical = opts.offsetVertical || offsetAll;
    var offsetHorizontal = opts.offsetHorizontal || offsetAll;
    var optionToInt = function (opt, fallback) {
      return parseInt(opt || fallback, 10);
    };
    offset = {
      t: optionToInt(opts.offsetTop, offsetVertical),
      b: optionToInt(opts.offsetBottom, offsetVertical),
      l: optionToInt(opts.offsetLeft, offsetHorizontal),
      r: optionToInt(opts.offsetRight, offsetHorizontal)
    };
    delay = optionToInt(opts.throttle, 250);
    useDebounce = opts.debounce !== false;
    unload = !!opts.unload;
    callback = opts.callback || callback;
    echo.render();
    if (document.addEventListener) {
      root.addEventListener('scroll', debounceOrThrottle, false);
      root.addEventListener('load', debounceOrThrottle, false);
    } else {
      root.attachEvent('onscroll', debounceOrThrottle);
      root.attachEvent('onload', debounceOrThrottle);
    }
  };

  echo.render = function (context) {
    var nodes = (context || document).querySelectorAll('[data-echo], [data-echo-background]');
    var length = nodes.length;
    var src, elem;
    var view = {
      l: 0 - offset.l,
      t: 0 - offset.t,
      b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
      r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
    };
    for (var i = 0; i < length; i++) {
      elem = nodes[i];
      if (inView(elem, view)) {

        if (unload) {
          elem.setAttribute('data-echo-placeholder', elem.src);
        }

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = 'url(' + elem.getAttribute('data-echo-background') + ')';
        }
        else if (elem.src !== (src = elem.getAttribute('data-echo'))) {
          elem.src = src;
          
          // Reset opacity when image starts loading
          elem.onload = function() {
            this.style.opacity = '1';
            this.classList.remove('lazy-loading');
            this.classList.add('lazy-loaded');
            this.onload = null; // Clean up
          };
        }

        if (!unload) {
          elem.removeAttribute('data-echo');
          elem.removeAttribute('data-echo-background');
        }

        callback(elem, 'load');
      }
      else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = 'url(' + src + ')';
        }
        else {
          elem.src = src;
        }

        elem.removeAttribute('data-echo-placeholder');
        callback(elem, 'unload');
      }
    }
    if (!length) {
      echo.detach();
    }
  };

  echo.detach = function () {
    if (document.removeEventListener) {
      root.removeEventListener('scroll', debounceOrThrottle);
    } else {
      root.detachEvent('onscroll', debounceOrThrottle);
    }
    clearTimeout(poll);
  };

  return echo;
});

// Improved fallback image handler
function imgError(image) {
  // Prevent infinite error loops
  if (image.dataset.errorHandled) {
    return true;
  }
  
  image.dataset.errorHandled = 'true';
  image.onerror = null; // Remove error handler to prevent loops
  image.src = "/assets/images/bandithijo_logo.svg";
  
  // Optional: Add a class for styling broken images
  image.classList.add('img-error');
  
  return true;
}

// Enhanced lazy loading initialization
function initLazyLoading() {
  // First, transform images to be lazy-loadable
  transformImagesToLazy();
  
  // Then initialize Echo.js
  echo.init({
    offset: 2500,
    throttle: 250,
    unload: false,
    callback: function (element, op) {
      console.log('Image', element.src, 'has been', op + 'ed');
      
      // Add loaded class for styling
      if (op === 'load') {
        element.classList.add('lazy-loaded');
      }
    }
  });
}

// Transform images to be lazy-loaded
function transformImagesToLazy() {
  // Target images in markdown content
  const images = document.querySelectorAll(".markdown p img, .content img, article img");
  
  images.forEach(function(img) {
    // Skip if already processed or if it's already a placeholder
    if (img.dataset.echo || img.src.includes('bandithijo_logo.svg')) {
      return;
    }
    
    // Store original src in data-echo attribute
    const originalSrc = img.src;
    
    // Only process if there's a valid src
    if (originalSrc && originalSrc.trim() !== '') {
      img.setAttribute("data-echo", originalSrc);
      img.setAttribute("src", "/assets/images/bandithijo_logo.svg");
      
      // Set up error handling
      img.onerror = function() {
        imgError(this);
      };
      
      // Add loading class for styling
      img.classList.add('lazy-loading');
      
      // Optional: Add loading animation or placeholder styling
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '0.7';
      
      // Set up onload handler to restore opacity
      const originalOnload = img.onload;
      img.onload = function() {
        this.style.opacity = '1';
        this.classList.remove('lazy-loading');
        this.classList.add('lazy-loaded');
        
        // Call original onload if it existed
        if (originalOnload) {
          originalOnload.call(this);
        }
      };
    }
  });
}

// Enhanced DOM ready handler
function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Initialize when DOM is ready
domReady(function() {
  initLazyLoading();
  
  // Also handle dynamically added content
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      let shouldRender = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              const newImages = node.querySelectorAll && node.querySelectorAll('img');
              if (newImages && newImages.length > 0) {
                // Transform new images
                newImages.forEach(function(img) {
                  if (!img.dataset.echo && img.src && !img.src.includes('bandithijo_logo.svg')) {
                    img.setAttribute("data-echo", img.src);
                    img.setAttribute("src", "/assets/images/bandithijo_logo.svg");
                    img.onerror = function() { imgError(this); };
                    img.classList.add('lazy-loading');
                  }
                });
                shouldRender = true;
              }
            }
          });
        }
      });
      
      if (shouldRender && window.echo) {
        echo.render();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});

// Optional: Manual trigger for lazy loading (useful for SPA navigation)
window.refreshLazyLoading = function() {
  transformImagesToLazy();
  if (window.echo) {
    echo.render();
  }
};
