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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToPaths", function() { return addToPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return paths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listClick", function() { return listClick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cur_root", function() { return cur_root; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Folder__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__File__ = __webpack_require__(2);


const paths = {};

document.getElementById('file_error').style.display = 'none';
document.getElementById('empty_name').style.display = 'none';
document.getElementById('no_search_results').style.display = 'none';
document.getElementById('empty_search').style.display = 'none';
document.getElementById('no_parent').style.display = 'none';

const addToPaths = object => {
  paths[object.path] = object;
};

const root_folder = new __WEBPACK_IMPORTED_MODULE_0__Folder__["a" /* Folder */]('root_folder', null);
let cur_root = root_folder;
cur_root.displayList();
document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;

const getData = event => {
  document.getElementById('file_error').style.display = 'none';
  document.getElementById('empty_name').style.display = 'none';
  document.getElementById('no_search_results').style.display = 'none';
  document.getElementById('empty_search').style.display = 'none';
  document.getElementById('no_parent').style.display = 'none';

  const input_name = document.getElementById('name_input').value;
  if (input_name === '') {
    document.getElementById('empty_name').style.display = 'block';
  } else {
    if (paths[`${cur_root.path}/${input_name}`]) {
      document.getElementById('file_error').style.display = 'block';
    } else {
      const file_folder = input_name.split('.');
      if (file_folder.length - 1) {
        const object = new __WEBPACK_IMPORTED_MODULE_1__File__["a" /* File */](file_folder[0], file_folder[1], cur_root);
        cur_root.addChild(object);
      } else {
        const object = new __WEBPACK_IMPORTED_MODULE_0__Folder__["a" /* Folder */](input_name, cur_root);
        cur_root.addChild(object);
      }
      cur_root.displayList();
    }
  }
  event.preventDefault();
  document.getElementById('name_input').value = '';
};

document.getElementById('create').addEventListener('click', getData);

const moveUp = () => {
  document.getElementById('file_error').style.display = 'none';
  document.getElementById('empty_name').style.display = 'none';
  document.getElementById('no_search_results').style.display = 'none';
  document.getElementById('empty_search').style.display = 'none';
  document.getElementById('no_parent').style.display = 'none';

  if (cur_root !== root_folder) {
    cur_root = cur_root.parent;
    cur_root.displayList();
    document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;
  } else {
    document.getElementById('no_parent').style.display = 'block';
  }
};

document.getElementById('move_up').addEventListener('click', moveUp);

const listClick = list_element => {
  document.getElementById('file_error').style.display = 'none';
  document.getElementById('empty_name').style.display = 'none';
  document.getElementById('no_search_results').style.display = 'none';
  document.getElementById('empty_search').style.display = 'none';

  const name = list_element.innerHTML;
  cur_root = paths[`${cur_root.path}/${name}`];
  cur_root.displayList();
  document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;
};

const search = event => {
  document.getElementById('file_error').style.display = 'none';
  document.getElementById('empty_name').style.display = 'none';
  document.getElementById('no_search_results').style.display = 'none';
  document.getElementById('empty_search').style.display = 'none';

  const search_input = document.getElementById('search_input').value;
  if (document.getElementById('search_list')) {
    document.getElementById('search_area').removeChild(document.getElementById('search_list'));
  }
  if (search_input === '') {
    document.getElementById('empty_search').style.display = 'block';
  } else {
    const paths_data = Object.keys(paths);
    console.log(search_input);
    console.log(paths_data);
    const list = document.createElement('ul');
    list.id = 'search_list';
    for (let i = 0; i < paths_data.length; i++) {
      if (paths_data[i].includes(search_input)) {
        const li = document.createElement('li');
        li.innerHTML = paths_data[i];
        li.style.color = 'red';
        li.addEventListener('click', e => {
          searchClick(e.target);
        });
        list.appendChild(li);
      }
    }
    if (list.childNodes.length === 0) {
      document.getElementById('no_search_results').style.display = 'block';
    }
    document.getElementById('search_area').appendChild(list);
    event.preventDefault();
  }
  document.getElementById('search_input').value = '';
};

document.getElementById('search').addEventListener('click', search);

const searchClick = list_element => {
  const path = list_element.innerHTML;
  cur_root = paths[path].parent;
  cur_root.displayList();
  document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Folder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);


class Folder {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.type = 'folder';
    if (parent) {
      this.path = `${parent.path}/${name}`;
    } else {
      this.path = 'root_folder';
    }
    this.children = [];
    __WEBPACK_IMPORTED_MODULE_0__app__["addToPaths"](this);
  }

  addChild(object) {
    this.children.push(object);
  }

  displayList() {
    const area = document.getElementById('list_area');
    if (document.getElementById('list')) {
      area.removeChild(document.getElementById('list'));
    }
    const list = document.createElement('ul');
    list.id = 'list';
    const list_data = this.children;
    for (let i = 0; i < list_data.length; i++) {
      const li = document.createElement('li');
      if (list_data[i].type === 'folder') {
        li.innerHTML = list_data[i].name;
        li.addEventListener('click', e => {
          __WEBPACK_IMPORTED_MODULE_0__app__["listClick"](e.target);
        });
        li.style.color = 'red';
      } else {
        li.innerHTML = `${list_data[i].name}.${list_data[i].extension}`;
      }
      list.appendChild(li);
    }
    area.appendChild(list);
  }
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return File; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);


class File {
  constructor(name, extension, parent) {
    this.name = name;
    this.extension = extension;
    this.parent = parent;
    this.type = 'file';
    this.path = `${parent.path}/${name}.${extension}`;
    __WEBPACK_IMPORTED_MODULE_0__app__["addToPaths"](this);
  }
}



/***/ })
/******/ ]);