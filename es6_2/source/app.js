'use strict';
import {File} from './File.js'
import {Folder} from './Folder.js'
import {getData, listClick, moveUp, search, searchClick} from './function'

document.getElementById('name_input').value = '';


const paths = {};
const root_folder = new Folder('root');
const cur_root = root_folder;
console.log(root_folder);

document.getElementById('path').innerHTML = `The current Directory is: ${cur_root.path}`



document.getElementById('move_up').addEventListener('click',  moveUp);
document.getElementById('search').addEventListener('click',  search);
document.getElementById('create').addEventListener('click',  getData);

export {cur_root, paths, listClick}
