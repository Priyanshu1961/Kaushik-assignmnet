const getData = () => {
  const input_name = document.getElementById('name_input').value;
  if (input_name === '') {
    document.getElementById('empty_name').style.display = 'block'
  } else {
    if (paths[`${cur_root.path}/${input_name}`])
    {
      document.getElementById('file_error').style.display = 'block'
    } else {
      const input_data = input_name.split('.')
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
}

const listClick = () => {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  const name = this.innerHTML;
  for (let i = 0; i < cur_root.children.length; i++) {
    if (cur_root.children[i].name === name && cur_root.children[i].type === 'folder') {
      cur_root.children[i].setRoot();
      break;
    }
  }
}

const moveUp = () => {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  if (cur_root.parent) {
    cur_root.parent.setRoot()
  }
}

const search = () => {
  if (document.getElementById('search_list')) {
    document.getElementById('search_area').removeChild(document.getElementById('search_list'))
  }
  const search_list = document.createElement('ul')
  search_list.id = 'search_list'
  const name = document.getElementById('search_input').value;
  if (name !== '') {
    const paths_list = Object.keys(paths);
    for (let i = 0; i < paths_list.length; i++) {
      if (paths_list[i].includes(name)) {
        const list_data = document.createElement('li');
        list_data.innerHTML = paths_list[i];
        list_data.addEventListener('click' , searchClick);
        list_data.style.color = 'red';
        search_list.appendChild(list_data);
      }
    }
  }
  document.getElementById('search_area').appendChild(search_list);
  document.getElementById('search_input').value = '';
}

const searchClick = () => {
  const path = this.innerHTML;
  paths[path].parent.setRoot();
}

export {getData, listClick, moveUp, search, searchClick}
