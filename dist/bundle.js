/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/animation.js":
/*!*************************!*\
  !*** ./js/animation.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _seed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seed.js */ "./js/seed.js");
/* harmony import */ var _bloom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bloom.js */ "./js/bloom.js");



class Animation {
  constructor(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.objects = [];
    this.seedProduction = 3;
    this.seedVelocity = 10;
  }

  createSeed(e) {
    const { x, y } = e;
    const dx = ((Math.random() - 0.5) * this.seedVelocity);
    const dy = ((Math.random() - 0.5) * this.seedVelocity);
    const radius = Math.random() * 3 + 2;

    this.objects.push(new _seed_js__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, dx, dy, radius));
  }

  createBloom(seed) {
    return new _bloom_js__WEBPACK_IMPORTED_MODULE_1__["default"](seed.x, seed.y, seed.dx, seed.dy);
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');
    let counter = 1;

    canvas.addEventListener('mousemove', e => {
      if (counter % this.seedProduction === 0) {
        this.createSeed(e);
        counter = 1;
      }
      counter++;
    });

    const animate = () => {
      ctx.clearRect(0, 0, this.xDim, this.yDim);

      const grad = ctx.createLinearGradient(0, 0, 0, this.xDim/2);
      grad.addColorStop(0, '#7DCDF6');
      grad.addColorStop(1, '#2DB6ED');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.xDim, this.yDim);

      for (let i = 0; i < this.objects.length; i++) {
        let object = this.objects[i];
        if (object.lifespan > 0) {
          object.update(this.xDim, this.yDim, ctx);
        } else {
          if (object instanceof _seed_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            this.objects[i] = this.createBloom(object);
          } else {
            this.objects.splice(i, 1);
            i--;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Animation);


/***/ }),

/***/ "./js/bloom.js":
/*!*********************!*\
  !*** ./js/bloom.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Bloom {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.radius = 1;
    this.lifespan = Math.random() * 100 + 200;
    this.size = 8;
    this.img = this.flowerImg();
    this.angle = 0;
    this.rotation = (Math.random() - 0.5) * 3;
  }

  flowerImg() {
    const img = new Image();
    const imgNum = Math.floor(Math.random() * 10 + 1);
    img.src = `./assets/images/flowers/${imgNum}.png`;
    return img;
  }


  update(xDim, yDim, ctx) {
    if (this.x + this.radius > xDim || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > yDim || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.dx *= 0.95;
    this.dy *= 0.95;
    this.x += this.dx;
    this.y += this.dy;
    this.lifespan -= 1;
    this.angle += this.rotation;

    if (this.lifespan > 10) {
      if (this.size <= this.img.width) this.size += 4;
    } else this.size *= 0.8;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * (Math.PI/180));
    this.draw(ctx);
    ctx.restore();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.drawImage(
      this.img,
      (0 - (this.size / 2)),
      (0 - (this.size / 2)),
      this.size,
      this.size
    );
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Bloom);


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ "./js/animation.js");



document.addEventListener('DOMContentLoaded', () => {
  // Modal Functions
  const modal = document.getElementById('modal');
  document.getElementById('close-modal').onclick = () => {
    modal.style.display = 'none';
  };
  document.getElementById('open-modal').onclick = () => {
    modal.style.display = 'block';
  };
  window.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Grab Canvas
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create Animation
  const animation = new _animation_js__WEBPACK_IMPORTED_MODULE_0__["default"](canvas.width, canvas.height);

  // Animation Controls
  document.getElementById('production').onchange = function() {
    animation.seedProduction = this.value;
  };
  document.getElementById('velocity').onchange = function() {
    animation.seedVelocity = this.value;
  };

  // Begin Animation
  animation.render(canvas);
});


/***/ }),

/***/ "./js/seed.js":
/*!********************!*\
  !*** ./js/seed.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Seed {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.lifespan = Math.random() * 100 + 200;
    this.color = this.seedColor();
  }

  seedColor() {
    const colors = [
      '#a1805d', '#3b5c50', '#627356', '#aa9f74', '#d49a4a'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(xDim, yDim, ctx) {
    const gravity = .1;

    if (this.x + this.radius > xDim || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > yDim || this.y - this.radius < 0) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.lifespan -= 1;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Seed);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map