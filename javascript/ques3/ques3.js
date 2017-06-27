document.body.style.backgroundColor = "grey";
document.getElementById('submit').addEventListener('click', getValues);
//random initial values
var row_span = 1;
var col_span = 1;
var row_col_val = 'asfjh';
var start =100;
var end =100;
function tableCreate(rows , col) {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < rows; i += 1) {
        var tr = document.createElement('tr');
        for (var j = 0; j < col; j += 1) {
            var td = document.createElement('td');
            if (row_span-1) { //default value of row_span is 1
              if (j == row_col_val) {
                if (i == start ) {
                  td.rowSpan = row_span
                }
                else if (i> start && i<=end) {
                  continue;
                }
              }
            }
            if (col_span-1) { //default value of row_span is 1
              if (i == row_col_val) {
                if (j == start ) {
                  td.colSpan = col_span
                } else if (j> start && j<=end) {
                    continue;
                }
              }
            }
            td.appendChild(document.createTextNode('cell'+i+j))
            td.setAttribute('id' , 'cell'+i+j)
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}
function remove(id) {
    var elem = document.getElementsByTagName(id);
      for (var i = 0 ; i< elem.length ; i++)  {
        document.body.removeChild(elem[i]) ;
      }
}
function getValues(event) {
  //prevents page refresh on form submit
  event.preventDefault();
  //random values to avoid interference while refreshing
  row_span = 1;
  col_span = 1;
  row_col_val = 'asfjh';
  start =100;
  end =100;
  //parsing input from form
  var a = document.getElementById('inp1').value.split(",");
  var b = document.getElementById('inp2').value.replace(/ /g,'').split(',');
  if (b.length == 1) {
    if(document.getElementsByTagName('table').length) {
      remove('table')
    }
    tableCreate(a[0] , a[1]);
  } else {
    start = b[0];
    end = b[1];
    if (start < 0 || end < 0) {
      alert('Invalid input, Start/end cannot be negative \n Generating Normal Table With given dimensions')
    }
    row_col = b[2].toLowerCase();
    row_col_val = b[3];
    if (start > end) {
      alert ("Invalid Input Start Cannot be greater than end  \n Generating Normal Table With given dimensions")
    }
    if (row_col != 'col' && row_col != 'row') {
      alert('Invalid input select row or col  \n Generating Normal Table With given dimensions')
    }
    if (row_col == 'col') {
      if (row_col_val >= a[0]) {
        alert ("row value out of bound  \n Generating Normal Table With given dimensions")
      }
      row_span = end-start+1
    }
    if (row_col == 'row') {
      if (row_col_val >= a[1]) {
        alert ("col value out of bound  \n Generating Normal Table With given dimensions")
      }
      col_span = end-start+1
    }
    //Deletes Existing Tables if present before creating
    if(document.getElementsByTagName('table').length) {
      remove('table')
    }
    tableCreate(a[0] , a[1]);
  }
}
