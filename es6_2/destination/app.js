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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return paths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cur_root", function() { return cur_root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "search", function() { return search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchClick", function() { return searchClick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveUp", function() { return moveUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listClick", function() { return listClick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__File__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Folder__ = __webpack_require__(2);
var _this = this;




// 'use strict';


document.getElementById('name_input').value = '';

const paths = {};
const root = new __WEBPACK_IMPORTED_MODULE_1__Folder__["a" /* Folder */]('root');
let cur_root = root;
console.log(root);
cur_root = root;
// debugger;
document.getElementById('path').innerHTML = `The current Directory is: ${cur_root.path}`;
const getData = () => {
  const input_name = document.getElementById('name_input').value;
  if (input_name === '') {
    document.getElementById('empty_name').style.display = 'block';
  } else {
    if (paths[`${cur_root.path}/${input_name}`]) {
      document.getElementById('file_error').style.display = 'block';
    } else {
      const input_data = input_name.split('.');
      if (input_data.length - 1) {
        const obj = new __WEBPACK_IMPORTED_MODULE_0__File__["a" /* File */](input_data[0], input_data[1], cur_root);
        cur_root.addChild(obj);
      } else {
        const obj = new __WEBPACK_IMPORTED_MODULE_1__Folder__["a" /* Folder */](input_data[0], cur_root);
        cur_root.addChild(obj);
      }
      cur_root.generateList();
    }
  }
  document.getElementById('name_input').value = '';
};

const listClick = () => {
  document.getElementById('file_error').style.display = 'none';
  document.getElementById('empty_name').style.display = 'none';
  const name = _this.innerHTML;
  for (let i = 0; i < cur_root.children.length; i++) {
    if (cur_root.children[i].name === name && cur_root.children[i].type === 'folder') {
      cur_root.children[i].setRoot();
      break;
    }
  }
};

const moveUp = () => {
  document.getElementById('file_error').style.display = 'none';
  document.getElementById('empty_name').style.display = 'none';
  if (cur_root.parent) {
    cur_root.parent.setRoot();
  }
};

const searchClick = () => {
  const path = _this.innerHTML;
  paths[path].parent.setRoot();
};

const search = () => {
  if (document.getElementById('search_list')) {
    document.getElementById('search_area').removeChild(document.getElementById('search_list'));
  }
  const search_list = document.createElement('ul');
  search_list.id = 'search_list';
  const name = document.getElementById('search_input').value;
  if (name !== '') {
    const paths_list = Object.keys(paths);
    for (let i = 0; i < paths_list.length; i++) {
      if (paths_list[i].includes(name)) {
        const list_data = document.createElement('li');
        list_data.innerHTML = paths_list[i];
        list_data.addEventListener('click', searchClick);
        list_data.style.color = 'red';
        search_list.appendChild(list_data);
      }
    }
  }
  document.getElementById('search_area').appendChild(search_list);
  document.getElementById('search_input').value = '';
};
document.getElementById('create').addEventListener('click', getData);
document.getElementById('move_up').addEventListener('click', moveUp);
document.getElementById('search').addEventListener('click', search);
console.log(root);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return File; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);


class File {
  constructor(name, extension, parent) {
    this.name = name;
    this.extension = extension;
    this.parent = parent;
    this.type = 'file';
    this.path = `${__WEBPACK_IMPORTED_MODULE_0__app_js__["cur_root"].path}/${name}.${extension}`;
    __WEBPACK_IMPORTED_MODULE_0__app_js__["paths"][this.path] = this;
  }
}


// export {cur_root, paths }

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Folder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);


class Folder {
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
    this.type = 'folder';
    this.children = [];
    if (this.parent) {
      this.path = `${__WEBPACK_IMPORTED_MODULE_0__app_js__["cur_root"].path}/${name}`;
    } else {
      this.path = 'root';
    }
    __WEBPACK_IMPORTED_MODULE_0__app_js__["paths"][this.path] = this;
  }

  addChild(child) {
    this.children.push(child);
  }

  generateList() {
    document.getElementById('file_error').style.display = 'none';
    document.getElementById('empty_name').style.display = 'none';
    if (document.getElementById('display_list')) {
      document.getElementById('list_area').removeChild(document.getElementById('display_list'));
    }
    const list_data = this.children;
    const list = document.createElement('ul');
    list.id = 'display_list';
    for (let i = 0; i < list_data.length; i++) {
      const li = document.createElement('li');
      if (list_data[i].type === 'folder') {
        li.innerHTML = list_data[i].name;
        li.addEventListener('click', __WEBPACK_IMPORTED_MODULE_0__app_js__["listClick"]);
        li.style.color = 'red';
      } else {
        li.innerHTML = `${list_data[i].name}.${list_data[i].extension}`;
      }
      list.appendChild(li);
    }
    document.getElementById('list_area').appendChild(list);
  }

  setRoot() {
    debugger;
    cur_root = this;
    cur_root.generateList();
    document.getElementById('path').innerHTML = `The current Directory is: ${cur_root.path}`;
  }
}



/***/ })
/******/ ]);