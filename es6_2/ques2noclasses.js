const root = document.createElement('div');
let cur_root = root;
root.id = 'root'
document.body.appendChild(root);
document.getElementById('root_display').innerHTML = `The current directory is : ${cur_root.id}`;
document.getElementById("move_up").addEventListener('click' , moveUp);

function displayList() {
  // document.getElementById('root_display').innerHTML = `The current root is : ${cur_root.id}`;
  const list_data = cur_root.childNodes;
  if (document.getElementById('display_list')) {
    document.getElementById('list_area').removeChild(document.getElementById('display_list'));
  }
  const list = document.createElement('ul')
  list.id = 'display_list'
  for (let i = 0; i < list_data.length; i++) {
    if (list_data[i].id) {
      const li = document.createElement('li')
      li.innerHTML = list_data[i].name;
      if (list_data[i].class === 'folder') {
        li.addEventListener('click' , setRoot);
        li.style.color = 'red';
      }
      list.appendChild(li);
    }
  }
  document.getElementById('list_area').appendChild(list);
}


function createForm() {
  const block = document.getElementById('create');
  const f = document.createElement("form");
  f.id = "create_form"
  f.addEventListener('submit' , getData);
  const input = document.createElement('input');
  input.placeholder = 'Enter filename/foldername';
  input.id = 'create_input'
  f.appendChild(input);

  const submit = document.createElement('input');
  submit.type = 'button';
  submit.value = "Add File/Folder"
  submit.id = 'create_submit'
  submit.addEventListener('click' , getData);
  f.appendChild(submit);
  block.appendChild(f);
}

createForm();

function getData(event) {
  event.preventDefault();
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  const input_name = document.getElementById("create_input").value;
  if (input_name !== '') {
    if (document.getElementById(`${cur_root.id}/${input_name}`)) {
      document.getElementById('file_error').style.display = 'block'
    } else {
      const temp = input_name.split('.');
      const obj = document.createElement('div');
      obj.class = (temp.length - 1) ? 'file' : 'folder';
      obj.id = `${cur_root.id}/${input_name}`;
      obj.name = input_name;
      cur_root.appendChild(obj)
      displayList();
      document.getElementById("create_input").value = '';
    }
  } else {
    document.getElementById('empty_name').style.display = 'block'
  }
}
function setRoot() {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  cur_root = document.getElementById(`${cur_root.id}/${this.innerHTML}`);
  displayList();
  document.getElementById('root_display').innerHTML = `The current directory is : ${cur_root.id}`;
}
function moveUp() {
  document.getElementById('file_error').style.display = 'none'
  document.getElementById('empty_name').style.display = 'none'
  if (cur_root !== root) {
    cur_root = cur_root.parentNode;
  }
  document.getElementById('root_display').innerHTML = `The current directory is : ${cur_root.id}`;
  displayList();
}
