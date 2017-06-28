document.getElementById('button1').addEventListener('click' , createHero);
document.getElementById('new_hero').addEventListener('click' , createNewHero);
document.getElementById('new_ability').addEventListener('click' , createNewAbility);
var heros = [
    { id: 0 , name: 'hero1', movement_speed:2 , armour:3 , base_mana:240 , base_hp:700 },
    { id: 1 , name: 'hero2', movement_speed:3 , armour:2 , base_mana:240 , base_hp:650 },
    { id: 2 , name: 'hero3', movement_speed:2 , armour:4 , base_mana:240 , base_hp:500 },
    { id: 3 , name: 'hero4', movement_speed:3 , armour:2 , base_mana:240 , base_hp:600 },
    { id: 4 , name: 'hero5', movement_speed:2 , armour:3 , base_mana:240 , base_hp:700 },
    { id: 5 , name: 'hero6', movement_speed:4 , armour:1 , base_mana:240 , base_hp:700 },
];
var abilities = [
    { id: 0 , name: 'stun',           cool_down: 5 ,    mana: 60  },
    { id: 1 , name: 'blink',          cool_down: 4 ,    mana: 20  },
    { id: 2 , name: 'chrona',         cool_down: 120 ,  mana: 160 },
    { id: 3 , name: 'lagoona_blade',  cool_down: 70 ,   mana: 150 },
    { id: 4 , name: 'vampire_aura',   cool_down: 0 ,    mana: 0   },
    { id: 5 , name: 'mortal_strike',  cool_down: 0 ,    mana: 0   },
    { id: 6 , name: 'dagger',         cool_down: 0 ,    mana: 0   },
    { id: 7 , name: 'mana_burn',      cool_down: 0 ,    mana: 0   },
    { id: 8 , name: 'cloak',          cool_down: 0 ,    mana: 0   },
];
var my_hero;
addHeroForm();
addAbilityForm();
function createHeroForm() {
    var block = document.getElementById('hero')
    if (document.getElementById('create_hero_form'))  {
        block.removeChild(document.getElementById('create_hero_form'));
    }
    var f = document.createElement("form");
    f.id = "create_hero_form"
    heros.forEach (function(hero) {
        var label = document.createElement('label');
        label.innerHTML = hero.name;
        var input = document.createElement('input');
        input.type = "radio";
        input.name = "hero";
        input.value = hero.id;
        f.appendChild(input);
        f.appendChild(label);
    });
    var input = document.createElement('input');
    input.type = 'button';
    input.value = "submit"
    input.id = 'hero_select'
    f.appendChild(input);
    block.appendChild(f);
}
function createAbilitiesForm() {
    var block = document.getElementById('abilities')
    if (document.getElementById('create_abilities_form'))  {
        block.removeChild(document.getElementById('create_abilities_form'));
    }
    var f = document.createElement("form");
    f.id = 'create_abilities_form'
    var tab = document.createElement("table");
    var row = document.createElement('tr');
    var head = document.createElement('th');
    var label = document.createElement('label');
    label.innerHTML = "select Abilities";
    head.appendChild(label);
    row.appendChild(head);

    var head = document.createElement('th');
    var label = document.createElement('label');
    label.innerHTML = "Name";
    head.appendChild(label);
    row.appendChild(head);

    var head = document.createElement('th');
    var label = document.createElement('label');
    label.innerHTML = "Cool Down";
    head.appendChild(label);
    row.appendChild(head);

    var head = document.createElement('th');
    var label = document.createElement('label');
    label.innerHTML = "Mana";
    head.appendChild(label);
    row.appendChild(head);
    tab.appendChild(row);
    abilities.forEach (function(ability) {
        var row = document.createElement('tr');
        var data = document.createElement('td');
        var input = document.createElement('input');
        input.type = "checkbox";
        input.name = "ability";
        input.value = ability.id;
        data.appendChild(input);
        row.appendChild(data);

        var data = document.createElement('td');
        var label = document.createElement('label');
        label.innerHTML = ability.name;
        data.appendChild(label);
        row.appendChild(data);

        var data = document.createElement('td');
        var label = document.createElement('label');
        label.innerHTML = ability.cool_down;
        data.appendChild(label);
        row.appendChild(data);

        var data = document.createElement('td');
        var label = document.createElement('label');
        label.innerHTML = ability.mana;
        data.appendChild(label);
        row.appendChild(data);

        tab.appendChild(row)
    });
    f.appendChild(tab)
    var input = document.createElement('input');
    input.type = 'button';
    input.value = "submit"
    input.id = 'ability_select'
    f.appendChild(input);
    block.appendChild(f);
}
function addHeroForm() {
    var block = document.getElementById('hero_add');
    var f = document.createElement("form");
    f.id = "add_hero_form"
    var input = document.createElement('input');
    input.placeholder = 'name';
    input.id = 'new_hero_name'
    f.appendChild(input);

    var input = document.createElement('input');
    input.placeholder = 'movement_speed';
    input.id = 'new_hero_movement_speed'
    input.type = 'number'
    f.appendChild(input);

    var input = document.createElement('input');
    input.placeholder = 'armour';
    input.id = 'new_hero_armour'
    input.type = 'number'
    f.appendChild(input);

    var input = document.createElement('input');
    input.placeholder = 'base_mana';
    input.id = 'new_hero_base_mana'
    input.type = 'number'
    f.appendChild(input);

    var input = document.createElement('input');
    input.placeholder = 'base_hp';
    input.id = 'new_hero_base_hp'
    input.type = 'number'
    f.appendChild(input);

    var input = document.createElement('input');
    input.type = 'button';
    input.value = "Add Hero"
    input.id = 'add_hero'
    f.appendChild(input);
    block.appendChild(f);
};
function addAbilityForm() {
    var block = document.getElementById('ability_add');
    var f = document.createElement("form");
    f.id = "add_abilities_form"
    var input = document.createElement('input');
    input.placeholder = 'name';
    input.id = 'new_ability_name'
    f.appendChild(input);

    var input = document.createElement('input');
    input.placeholder = 'cool_down';
    input.id = 'new_ability_cool_down'
    input.type = 'number'
    f.appendChild(input);

    var input = document.createElement('input');
    input.placeholder = 'mana';
    input.id = 'new_ability_mana'
    input.type = 'number'
    f.appendChild(input);

    var input = document.createElement('input');
    input.type = 'button';
    input.value = "Add Ability"
    input.id = 'add_ability'
    f.appendChild(input);

    block.appendChild(f);
}
function createHero() {
    document.getElementById('hero').style.display = 'block';
    createHeroForm();
    document.getElementById('hero_select').addEventListener('click' , selectHero);
}
function selectHero() {
    if (getHero()) {
        document.getElementById('hero').style.display = 'none';
        document.getElementById('abilities').style.display = 'block';
        createAbilitiesForm();
        document.getElementById('ability_select').addEventListener('click' , selectAbilities);
    } else {
        alert("select a Hero");
    }
}
function getHero() {
    var radios = document.getElementsByName('hero');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            my_hero = heros[(radios[i].value)];
            radios[i].checked = false;
            break;
        }
    }
    return i == radios.length? false : true ;
}

function selectAbilities() {
  passives = 0;
  count = 0;
  mana_total = 0;
  var checkboxes = document.getElementsByName('ability');
  for (var i = 0, length = checkboxes.length; i < length; i++) {
    if (checkboxes[i].checked) {
      count++;
      mana_total += abilities[i].mana;
      if (!abilities[i].cool_down) {
        passives++;
      }
    }
  }
  if (count != 4) {
    alert('select a only 4 Abilities');
  }
  if (passives > 2) {
    alert('select only two Passive Abilities')
  }
  if (mana_total > my_hero.base_mana) {
    alert('base mana limit exceeded')
  }
  if (count == 4 && passives <= 2 && mana_total <= my_hero.base_mana) {
    alert("hero Sucessfully created");

    document.getElementById('abilities').style.display = 'none';

  }
}
function createNewHero() {
  // document.getElementById("button1").style.display = 'none'
  // document.getElementById("new_ability").style.display = 'none'
  document.getElementById("hero_add").style.display = 'block'
  document.getElementById('add_hero').addEventListener('click' , addHero);
}
function addHero() {
  var error_flag = false;
  var new_hero  = { id: 0 , name: '', movement_speed:-1 , armour:-1 , base_mana:-1 , base_hp:-1 };
  new_hero.id = heros.length;
  new_hero.name = document.getElementById('new_hero_name').value;
  if (new_hero.name == '') {
    alert("name cannot be empty");
    error_flag = true;
  }
  new_hero.movement_speed = document.getElementById('new_hero_movement_speed').value;
  if (new_hero.movement_speed == 0) {
    alert("Enter a value of movement_speed");
    error_flag = true;
  }
  new_hero.armour = document.getElementById('new_hero_armour').value;
  if (new_hero.armour == 0) {
    alert("Enter a value of armour");
    error_flag = true;
  }
  new_hero.base_mana = document.getElementById('new_hero_base_mana').value;
  if (new_hero.base_mana == 0) {
    alert("Enter a value of base mana");
    error_flag = true;
  }
  new_hero.base_hp = document.getElementById('new_hero_base_hp').value;
  if (new_hero.base_hp == 0) {
    alert("Enter a value of base_hp");
    error_flag = true;
  }
  if (!error_flag) {
    heros.push(new_hero);
    document.getElementById("hero_add").style.display = 'none'

  }
}
function createNewAbility() {
  document.getElementById("ability_add").style.display = 'block'
  document.getElementById('add_ability').addEventListener('click' , addAbility);
}
function addAbility() {
  var new_ability  = { id: 0 , name: '', cool_down: 0 , mana: 0 };
  var error_flag = false;
  new_ability.id = abilities.length;
  new_ability.name = document.getElementById('new_ability_name').value;
  if (new_ability.name == '') {
    alert("name cannot be empty");
    error_flag = true;;
  }
  new_ability.cool_down = document.getElementById('new_ability_cool_down').value;
  new_ability.mana = document.getElementById('new_ability_mana').value;

  if (!error_flag) {
    abilities.push(new_ability);
    document.getElementById("ability_add").style.display = 'none'
    alert("new Ability created");
  }
}
