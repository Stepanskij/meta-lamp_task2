import '../../layout/layout-doc.js';

// Импорт стилей компонентов
import '../../../components/title';
import '../../../components/date-dropdown-card';
import '../../../components/dropdown';
import '../../../components/range-slider';
import '../../../components/checkbox-buttons';
import '../../../components/expandable-checkbox-list';
import '../../../components/room-show-card';
import '../../../components/paginator';
//
import './search-room.scss';
// Импорт JS-функционала компонентов
import DateDropdownCard from '../../../components/date-dropdown-card/date-dropdown-card.js';
import Dropdown from '../../../components/dropdown/dropdown.js';
import RangeSlider from '../../../components/range-slider/range-slider.js';
import ExpandableCheckboxList from '../../../components/expandable-checkbox-list/expandable-checkbox-list.js';
import RoomShowCard from '../../../components/room-show-card/room-show-card.js';
import Paginator from '../../../components/paginator/paginator.js';
//
const dropdownList1 = [
  ['Сколько гостей'],
  ['', 'Взрослые', '', 'Взрослые'],
  ['', 'Дети', '', 'Дети'],
  ['Младенец', 'Младенца', 'Младенцов', 'Младенци'],
  ['Гость', 'Гостя', 'Гостей'],
];
const dropdownList2 = [
  ['Сколько комнат'],
  ['Спальня', 'Спальни', 'Спален', 'Спальни'],
  ['Кровать', 'Кровати', 'Кроватей', 'Кровати'],
  ['Ванная комната', 'Ванные комнаты', 'Ванных комнат', 'Ванные комнаты'],
];

const roomShowCardsList = [
  [888, 840, 980, 856, 740, 982, 678, 450, 350, 666, 444, 352],
  ['', '', 'люкс', '', '', '', '', '', '', '', '', ''],
  [9990, 9900, 8500, 7300, 6000, 5800, 5500, 5300, 5000, 5000, 5000, 5000],
  [5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3],
  [145, 65, 35, 19, 44, 56, 45, 39, 77, 25, 15, 55],
];
//
const dateDropdownCard = document.querySelector('.js-search-room__dates-of-stay');
new DateDropdownCard(dateDropdownCard);

const dropdown1 = document.querySelector('.js-search-room__guests');
new Dropdown(dropdown1, dropdownList1);

const rangeSlider = document.querySelector('.js-search-room__price-range');
new RangeSlider(rangeSlider);

const dropdown2 = document.querySelector('.js-search-room__room-amenities');
new Dropdown(dropdown2, dropdownList2);

const expandableCheckboxList = document.querySelector('.js-search-room__additional-amenities');
new ExpandableCheckboxList(expandableCheckboxList);

const roomShowCard = [...document.querySelectorAll('.js-search-room__room')];
roomShowCard.map((item, index) => {
  new RoomShowCard({
    outerContainerElement: item,
    numberRoom: roomShowCardsList[0][index],
    classRoom: roomShowCardsList[1][index],
    priceRoom: roomShowCardsList[2][index],
    rating: roomShowCardsList[3][index],
    feedbackNumber: roomShowCardsList[4][index],
  });
});

const paginator = document.querySelector('.js-search-room__paginator');
new Paginator(paginator, 179);