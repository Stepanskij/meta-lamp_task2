import DividedDateDropdown from '../divided-date-dropdown/divided-date-dropdown.js';
import Dropdown from '../dropdown/dropdown.js';
//

const dropdownList = [
  ['Сколько гостей'],
  ['', 'Взрослые', '', 'Взрослые'],
  ['', 'Дети', '', 'Дети'],
  ['Младенец', 'Младенца', 'Младенцов', 'Младенци'],
  ['Гость', 'Гостя', 'Гостей'],
];

//
const dividedSateDropdown = document.querySelector('.js-chose-room__dates');
new DividedDateDropdown(dividedSateDropdown);

const dropdown = document.querySelector('.js-chose-room__guests');
new Dropdown(dropdown, dropdownList);
