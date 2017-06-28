document.body.style.backgroundColor = "grey"
var sudoku = [[],[],[],[]];
function tableCreate(rows , col) {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < rows; i += 1) {
        var tr = document.createElement('tr');
        for (var j = 0; j < col; j += 1) {
            var td = document.createElement('td');
            var inp =document.createElement('input')
            inp.setAttribute('id','val'+i+j)
            td.appendChild(inp)
            td.setAttribute('id' , 'cell'+i+j)
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);

}
function createButton(id,func , content ) {
  var button = document.createElement('button');
  button.setAttribute('id' , id);
  button.addEventListener('click' , func);
  button.innerHTML = content;
  document.body.appendChild(button);
}
function getValue(id) {
  return (Number(document.getElementById(id).value))
}
function solveSudoku() {
  for (var i = 0 ; i<4 ; i++) {
    for (var j = 0 ; j<4 ; j++) {
      sudoku[i][j] = getValue('val'+i+j);
    }
  }
  console.log(sudoku);
  for (var i = 0 ; i<4 ; i++) {
    for (var j = 0 ; j<4 ; j++) {
      document.getElementById('val'+i+j).value = sudoku[i][j];
    }
  }
}
function checkSolved() {
  document.body.style.backgroundColor = "grey"
  var sum_row, sum_col;
  for (var i = 0 ; i<4 ; i++) {
    sum_row = 0;
    sum_col = 0;
    for (var j = 0 ; j<4 ; j++) {
      sum_row += getValue('val'+i+j);
      sum_col += getValue('val'+j+i);
      }
    if (sum_col != 10 || sum_row != 10 ) {
    alert('invalid Sudoku');
    document.body.style.backgroundColor = "red";
    break;
    }
  }
  if (document.body.style.backgroundColor != "red"){
    document.body.style.backgroundColor = "green"
    alert("Congrats, you have sucessfully solved the Sudoku")
  }
}
function rowConflicts(i,j) {

}
function colConflicts(i,j) {

}
function blockConflicts() {

}
function saveEmptyPositions() {
  var emptyPositions = [];
  for (var i = 0 ; i<4 ; i++) {
    for (var j = 0 ; j<4 ; j++) {
      sudoku[i][j] = getValue('val'+i+j);
      if (sudoku[i][j] == 0) {
        emptyPositions.push([i,j]);
      }
    }
  }
  return emptyPositions;
  // for (var i = 0 ; i<4 ; i++) {
  //   for (var j = 0 ; j<4 ; j++) {
  //     if (sudoku[i][j] == 0) {
  //       emptyPositions.push([i,j]);
  //     }
  //   }
  // }

}





tableCreate(4,4);
createButton('check_button', checkSolved, 'check');
createButton('solve_button', solveSudoku, 'solve');
document.getElementById('val12').value = 3;
document.getElementById('val13').value = 1;
document.getElementById('val00').value = 2;
document.getElementById('val21').value = 4;
console.log(saveEmptyPositions());
