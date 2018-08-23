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
    this.seeds = [];
    this.blooms = [];
    this.seedProduction = 7;
    this.seedVelocity = 20;
    this.seedGravity = 0.1;
  }

  createSeed(e) {
    const { x, y } = e;
    const dx = ((Math.random() - 0.5) * this.seedVelocity);
    const dy = ((Math.random() - 0.5) * this.seedVelocity);
    const radius = Math.random() * 3 + 2;

    this.seeds.push(new _seed_js__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, dx, dy, radius));
  }

  createFlower(seed) {
    this.blooms.push(new _bloom_js__WEBPACK_IMPORTED_MODULE_1__["default"](
      seed.x,
      seed.y,
      seed.dx,
      seed.dy,
      seed.radius
    ));
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');
    let counter = 1;

    canvas.addEventListener('mousemove', e => {
      if (counter % this.seedProduction === 0) this.createSeed(e);
      counter++;
    });

    const animate = () => {
      ctx.clearRect(0, 0, this.xDim, this.yDim);
      for (let i = 0; i < this.seeds.length; i++) {
        let seed = this.seeds[i];
        if (seed.lifespan > 0) {
          seed.update(this.xDim, this.yDim, ctx);
        } else {
          this.createFlower(seed);
          this.seeds.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < this.blooms.length; i++) {
        let bloom = this.blooms[i];
        if (bloom.lifespan > 0) {
          bloom.update(this.xDim, this.yDim, ctx);

        } else {
          this.blooms.splice(i, 1);
          i--;
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
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.lifespan = Math.random() * 100 + 200;
    this.img = this.flowerImg();
    this.angle = 0;
    this.size = 8;
  }

  flowerImg() {
    const img = new Image();
    const imgNum = Math.floor(Math.random() * 12 + 1);
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

    if (this.lifespan > 10) {
      if (this.size <= this.img.width) this.size += 4;
    } else this.size *= 0.8;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.drawImage(
      this.img,
      (this.x - (this.size / 2)),
      (this.y - (this.size / 2)),
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
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const animation = new _animation_js__WEBPACK_IMPORTED_MODULE_0__["default"](canvas.width, canvas.height);

  document.getElementById('production').onchange = function() {
    animation.seedProduction = this.value;
  };

  document.getElementById('velocity').onchange = function() {
    animation.seedVelocity = this.value;
  };

  // document.getElementById('gravity').onchange = function() {
  //   animation.seedGravity = this.value;
  // };

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
      '#a1805d',
      '#3b5c50',
      '#627356',
      '#aa9f74',
      '#d49a4a'
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