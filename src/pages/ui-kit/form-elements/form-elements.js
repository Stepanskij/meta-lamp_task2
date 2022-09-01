import '../../layout/layout-doc.js';

// Импорт стилей компонентов
import '../../../components/text-field';
import '../../../components/button';
import '../../../components/title';
import '../../../components/checkbox-buttons';
import '../../../components/expandable-checkbox-list';
import '../../../components/radio-buttons';
import '../../../components/toggle';
import '../../../components/like-button';
import '../../../components/rate-button';
import '../../../components/bullet-list';
import '../../../components/advantages';
import '../../../components/comment';
import '../../../components/dropdown';
import '../../../components/date-dropdown';
import '../../../components/divided-date-dropdown';
import '../../../components/range-slider';
import '../../../components/paginator';
import '../../../components/masked-text-field';
//
import './form-elements.scss';

//

import ExpandableCheckboxList from '../../../components/expandable-checkbox-list/expandable-checkbox-list.js';
import Dropdown from '../../../components/dropdown/dropdown.js';
import DateDropdown from '../../../components/date-dropdown/date-dropdown.js';
import DividedDateDropdown from '../../../components/divided-date-dropdown/divided-date-dropdown.js';
import RangeSlider from '../../../components/range-slider/range-slider.js';
import Paginator from '../../../components/paginator/paginator.js';
import MaskedTextField from '../../../components/masked-text-field/masked-text-field.js';

//
const dropdownList1 = [
  ['Сколько комнат'],
  ['Спальня', 'Спальни', 'Спален', 'Спальни'],
  ['Кровать', 'Кровати', 'Кроватей', 'Кровати'],
  ['Ванная комната', 'Ванные комнаты', 'Ванных комнат', 'Ванные комнаты'],
];
const dropdownList2 = [
  ['Сколько гостей'],
  ['', 'Взрослые', '', 'Взрослые'],
  ['', 'Дети', '', 'Дети'],
  ['Младенец', 'Младенца', 'Младенцов', 'Младенци'],
  ['Гость', 'Гостя', 'Гостей'],
];
//
const expandableCheckboxList = [...document.querySelectorAll('.js-form-elements__expandable-checkbox-list')];
expandableCheckboxList.map(element => {
  new ExpandableCheckboxList(element);
});

const dropdown = [...document.querySelectorAll('.js-form-elements__dropdown')];
dropdown.map((element, index) => {
  if (index === 0) return new Dropdown(element, dropdownList2);
  if (index > 0 && index < 3) return new Dropdown(element, dropdownList1);
  if (index >= 3 && index < 5) return new Dropdown(element, dropdownList2);
});

const filterSateDropdown = document.querySelector('.js-form-elements__filter-date-dropdown');
new DateDropdown(filterSateDropdown);

const dividedSateDropdown = document.querySelector('.js-form-elements__divided-date-dropdown');
new DividedDateDropdown(dividedSateDropdown);

const rangeSlider = document.querySelector('.js-form-elements__range-slider');
new RangeSlider(rangeSlider);

const paginator = document.querySelector('.js-form-elements__pagination');
new Paginator(paginator, 179);

const maskedTextField = document.querySelector('.js-form-elements__masked-text-field');
new MaskedTextField(maskedTextField);
