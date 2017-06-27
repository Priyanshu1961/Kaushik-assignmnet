document.body.style.backgroundColor = "grey";
document.getElementById('submit').addEventListener('click', getValues);
var songs_count = 0
function getValues(event) {
  event.preventDefault();
  var name = document.getElementById('inp1').value;
  var theme = document.getElementById('inp2').value;
  create_list(name,theme);
}
function create_list(name,theme) {
  var tab = document.getElementById('list');
  songs_count++;
  var tr = document.createElement('tr');
  tr.setAttribute('id' , 'song'+songs_count);
  var td = document.createElement('td');
  td.setAttribute('id' , 'song_name'+songs_count);
  td.appendChild(document.createTextNode(name));
  tr.appendChild(td);
  var td = document.createElement('td');
  td.setAttribute('id' , 'song_theme'+songs_count);
  td.appendChild(document.createTextNode(theme));
  tr.appendChild(td);
  var td = document.createElement('td');
  td.setAttribute('id' , 'count_for_song'+songs_count);
  td.appendChild(document.createTextNode(0));
  tr.appendChild(td);
  var td = document.createElement('td');
  td.setAttribute('id' , 'last_played_for_song'+songs_count);
  td.innerHTML=' ';
  tr.appendChild(td);
  var td = document.createElement('td');
  td.setAttribute('id' , 'play_song'+songs_count);
  var play = document.createElement('button');
  play.setAttribute('id' , 'button'+songs_count);
  play.innerHTML = 'Play';
  play.addEventListener('click' , runTimer);
  play.addEventListener('click' , increaseCount);
  play.addEventListener('click' , setLastPlayed);
  play.addEventListener('click' , moveToPlayList);
  td.appendChild(play)
  tr.appendChild(td);
  tab.appendChild(tr);
}
function runTimer() {
  var buttons = document.getElementsByTagName('button')
  for (var i = 0; i<buttons.length ; i++) {
    buttons[i].style.display = 'none'
  }
  this.style.display = 'block'
  var id = this.getAttribute('id');
  var timeleft = 0;
  var downloadTimer = setInterval(function(){
    timeleft++;
    document.getElementById(id).innerHTML = timeleft;
    if(timeleft == 5) {
      clearInterval(downloadTimer);
      document.getElementById(id).innerHTML = 'Play';
      for (var i = 0; i<buttons.length ; i++) {
        buttons[i].style.display = 'block'
      }
    }
  },1000);
}
function increaseCount() {
  var id = this.getAttribute('id');
  var song_number = id.slice(6);
  console.log(song_number);
  document.getElementById('count_for_song'+song_number).innerHTML = Number(document.getElementById('count_for_song'+song_number).innerHTML) + 1;
console.log(document.getElementById('count_for_song'+song_number).innerHTML);
}
function setLastPlayed() {
  var id = this.getAttribute('id');
  var song_number = id.slice(6);
  document.getElementById('last_played_for_song'+song_number).innerHTML = Date();
}
function moveToPlayList() {
  var id = this.getAttribute('id');
  var song_number = id.slice(6);
  var song = document.getElementById('song'+song_number);
  list = document.getElementById('playlist').getElementsByTagName('tr')
  //debugger;
  for (var i=0;i<list.length;i++) {
    if (list[i].getAttribute('id') == song.getAttribute('id')) {
      console.log('dfbsdf');
      document.getElementById('playlist').childNodes[1].removeChild(list[i]);
    }
  }
  var song_clone = song.cloneNode(true);
  song_clone.removeChild(song_clone.childNodes[4])
  document.getElementById('playlist').childNodes[1].appendChild(song_clone);
  sortTable()
}
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("playlist");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("tr");
    for (i = 2; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[2];
      y = rows[i + 1].getElementsByTagName("td")[2];
      //check if the two rows should switch place:
      if (Number(x.innerHTML.toLowerCase()) < Number(y.innerHTML.toLowerCase())) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  if (rows.length >= 6) {
    for (var del = 6; del <=rows.length; del++) {
      document.getElementById('playlist').childNodes[1].removeChild(rows[del]);
    }

  }
}
