import {addToPaths, listClick} from './app'

class Folder {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.type = 'folder'
    if (parent) {
      this.path = `${parent.path}/${name}`;
    } else {
      this.path = 'root_folder'
    }
    this.children = [];
    addToPaths(this);
  }

  addChild(object) {
    this.children.push(object)
  }

  displayList() {
    const area = document.getElementById('list_area');
    if (document.getElementById('list')) {
      area.removeChild(document.getElementById('list'));
    }
    const list = document.createElement('ul');
    list.id = 'list'
    const list_data = this.children;
    for (let i = 0; i < list_data.length; i++) {
      const li = document.createElement('li');
      if (list_data[i].type === 'folder') {
        li.innerHTML = list_data[i].name;
        li.addEventListener('click', (e) => {listClick(e.target)});
        li.style.color = 'red';
      } else {
        li.innerHTML = `${list_data[i].name}.${list_data[i].extension}`;
      }
      list.appendChild(li);
    }
    area.appendChild(list);
  }
}

export { Folder }
