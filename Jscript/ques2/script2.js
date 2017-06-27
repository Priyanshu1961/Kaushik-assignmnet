document.body.style.backgroundColor = "grey";
var colors = ['red', 'blue', 'green' , 'yellow' , 'pink', 'coral' , 'aqua', 'violet' , 'grey' , 'lime' , 'maroon' , 'navy' , 'brown'];
var cboxCount = 1;
var blockCount = 1;
var swap = 1;
function createCbox() {
    var x = document.createElement("INPUT");
    x.setAttribute("type" , "checkBox")
    x.setAttribute("id", "cbox" + cboxCount)
    x.checked = false;
    cboxCount += 1;
    document.body.appendChild(x);
}
function createBlock() {
    var x = document.createElement("button");
    x.setAttribute("type" , "button")
    x.setAttribute("id", "block" + blockCount)
    blockCount += 1;
    document.body.appendChild(x);
}
createCbox();
createCbox();
createCbox();
createCbox();
createBlock();
createBlock();
createBlock();

function checkAll() {
  var list = document.getElementsByTagName("input");
  for (var i = 0; i < list.length ; i++) {
    list[i].checked = true
  }
}
function block2Click() {
  document.getElementById('cbox1').checked = true
  document.getElementById('cbox3').checked = true
  document.getElementById('cbox2').checked = false
  document.getElementById('cbox4').checked = false
}
function block3Click() {
  document.getElementById('cbox2').checked = true
  document.getElementById('cbox4').checked = true
  document.getElementById('cbox1').checked = false
  document.getElementById('cbox3').checked = false
}
function changeBackground() {
  document.body.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
}
function swapColor() {
  if (swap) {
    document.getElementById('block2').style.backgroundColor = "blue";
    document.getElementById('block3').style.backgroundColor = "yellow";
    swap = 0;
  } else {
    document.getElementById('block2').style.backgroundColor = "yellow";
    document.getElementById('block3').style.backgroundColor = "blue"
    swap = 1;
  }
}

document.getElementById('block1').addEventListener('click', checkAll)
document.getElementById('block2').addEventListener('click', block2Click)
document.getElementById('block3').addEventListener('click', block3Click)
window.addEventListener('click', changeBackground)
document.getElementById('block2').addEventListener('click', swapColor)
document.getElementById('block3').addEventListener('click', swapColor)
