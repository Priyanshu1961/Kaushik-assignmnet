import { Folder } from './Folder'
import { File } from './File'
const paths = {};

document.getElementById('file_error').style.display = 'none'
document.getElementById('empty_name').style.display = 'none'
document.getElementById('no_search_results').style.display = 'none'
document.getElementById('empty_search').style.display = 'none';
document.getElementById('no_parent').style.display = 'none';

const addToPaths = (object) => {
  paths[object.path] = object;
}

const root_folder = new Folder('root_folder', null)
let cur_root = root_folder;
cur_root.displayList()
document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;

const getData = (event) => {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  document.getElementById('no_search_results').style.display = 'none'
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
        const object = new File(file_folder[0], file_folder[1], cur_root);
        cur_root.addChild(object);
      } else {
        const object = new Folder(input_name, cur_root);
        cur_root.addChild(object);
      }
      cur_root.displayList()
    }
  }
  event.preventDefault();
  document.getElementById('name_input').value = '';
}

document.getElementById('create').addEventListener('click', getData);

const moveUp = () => {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  document.getElementById('no_search_results').style.display = 'none'
  document.getElementById('empty_search').style.display = 'none';
  document.getElementById('no_parent').style.display = 'none';

  if (cur_root !== root_folder) {
    cur_root = cur_root.parent
    cur_root.displayList();
    document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;
  } else {
    document.getElementById('no_parent').style.display = 'block';
  }
}

document.getElementById('move_up').addEventListener('click', moveUp);

const listClick = (list_element) => {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  document.getElementById('no_search_results').style.display = 'none'
  document.getElementById('empty_search').style.display = 'none';

  const name = list_element.innerHTML;
  cur_root = paths[`${cur_root.path}/${name}`];
  cur_root.displayList();
  document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;
}

const search = (event) => {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  document.getElementById('no_search_results').style.display = 'none'
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
        li.addEventListener('click', (e) => {searchClick(e.target)});
        list.appendChild(li);
      }
    }
    if (list.childNodes.length === 0) {
      document.getElementById('no_search_results').style.display = 'block'
    }
    document.getElementById('search_area').appendChild(list)
    event.preventDefault();
  }
  document.getElementById('search_input').value = '';
}

document.getElementById('search').addEventListener('click', search);

const searchClick = (list_element) => {
  const path = list_element.innerHTML;
  cur_root = paths[path].parent;
  cur_root.displayList();
  document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.path}`;
}

export { addToPaths, paths, listClick, cur_root }
