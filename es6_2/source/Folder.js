
import {getData, listClick, moveUp, search, searchClick} from './function'


class Folder {
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
    this.type = 'folder'
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
    document.getElementById('file_error').style.display = 'none'
    document.getElementById('empty_name').style.display = 'none'
    if (document.getElementById('display_list')) {
      document.getElementById('list_area').removeChild(document.getElementById('display_list'));
    }
    const list_data = this.children
    const list = document.createElement('ul')
    list.id = 'display_list'
    for (let i = 0; i < list_data.length; i++) {
      const li = document.createElement('li')
      if (list_data[i].type === 'folder') {
        li.innerHTML = list_data[i].name;
        li.addEventListener('click' , listClick);
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
    document.getElementById('path').innerHTML = `The current Directory is: ${cur_root.path}`
  }
}

export {Folder}
