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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return listClick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return moveUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return search; });
/* unused harmony export searchClick */
var _this = this;

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
        const obj = new File(input_data[0], input_data[1], cur_root);
        cur_root.addChild(obj);
      } else {
        const obj = new Folder(input_data[0], cur_root);
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

const searchClick = () => {
  const path = _this.innerHTML;
  paths[path].parent.setRoot();
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cur_root", function() { return cur_root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return paths; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__File_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Folder_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__function__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "listClick", function() { return __WEBPACK_IMPORTED_MODULE_2__function__["b"]; });






document.getElementById('name_input').value = '';

const paths = {};
const root_folder = new __WEBPACK_IMPORTED_MODULE_1__Folder_js__["a" /* Folder */]('root');
const cur_root = root_folder;
console.log(root_folder);

document.getElementById('path').innerHTML = `The current Directory is: ${cur_root.path}`;

document.getElementById('move_up').addEventListener('click', __WEBPACK_IMPORTED_MODULE_2__function__["c" /* moveUp */]);
document.getElementById('search').addEventListener('click', __WEBPACK_IMPORTED_MODULE_2__function__["d" /* search */]);
document.getElementById('create').addEventListener('click', __WEBPACK_IMPORTED_MODULE_2__function__["a" /* getData */]);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export File */


class File {
  constructor(name, extension, parent) {
    this.name = name;
    this.extension = extension;
    this.parent = parent;
    this.type = 'file';
    this.path = `${cur_root.path}/${name}.${extension}`;
    paths[this.path] = this;
  }
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Folder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__function__ = __webpack_require__(0);



class Folder {
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
    this.type = 'folder';
    this.children = [];
    if (this.parent) {
      this.path = `${cur_root.path}/${name}`;
    } else {
      this.path = 'root';
    }
    paths[this.path] = this;
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
        li.addEventListener('click', __WEBPACK_IMPORTED_MODULE_0__function__["b" /* listClick */]);
        li.style.color = 'red';
      } else {
        li.innerHTML = `${list_data[i].name}.${list_data[i].extension}`;
      }
      list.appendChild(li);
    }
    document.getElementById('list_area').appendChild(list);
  }

  setRoot() {
    cur_root = this;
    cur_root.generateList();
    document.getElementById('path').innerHTML = `The current Directory is: ${cur_root.path}`;
  }
}



/***/ })
/******/ ]);