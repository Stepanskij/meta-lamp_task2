import '../../layout/layout-doc';

// Импорт стилей компонентов
import '../../../components/text-field';
import '../../../components/button';
import '../../../components/title';
import '../../../components/checkbox-buttons';
import '../../../components/expandable-checkbox-list';
import '../../../components/radio-buttons';
import '../../../components/toggle';
import '../../../components/like-button';
import '../../../components/rate-star-button';
import '../../../components/bullet-list';
import '../../../components/advantages';
import '../../../components/comment';
import '../../../components/dropdown';
import '../../../components/date-dropdown-card';
import '../../../components/divided-date-dropdown-card';
import '../../../components/range-slider';
import '../../../components/paginator';
import '../../../components/masked-text-field';
//
import './form-elements.scss';

//

import ExpandableCheckboxList from '../../../components/expandable-checkbox-list/expandable-checkbox-list';
import Dropdown from '../../../components/dropdown/dropdown';
import DateDropdownCard from '../../../components/date-dropdown-card/date-dropdown-card';
import DividedDateDropdownCard from '../../../components/divided-date-dropdown-card/divided-date-dropdown-card';
import RangeSlider from '../../../components/range-slider/range-slider';
import Paginator from '../../../components/paginator/paginator';
import MaskedTextField from '../../../components/masked-text-field/masked-text-field';
import RateStarButton from '../../../components/rate-star-button/rate-star-button';

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

const filterStateDropdown = document.querySelector('.js-form-elements__filter-date-dropdown-card');
new DateDropdownCard(filterStateDropdown as HTMLElement);

const dividedSateDropdown = document.querySelector('.js-form-elements__divided-date-dropdown-card');
new DividedDateDropdownCard(dividedSateDropdown as HTMLElement);

const rangeSlider = document.querySelector('.js-form-elements__range-slider');
new RangeSlider(rangeSlider as HTMLElement);

const paginator = document.querySelector('.js-form-elements__pagination');
new Paginator(paginator as HTMLElement, 179);

const maskedTextField = document.querySelector('.js-form-elements__masked-text-field');
new MaskedTextField(maskedTextField as HTMLElement);

const rateStarButtons = [...document.querySelectorAll('.js-form-elements__rate-star-button')];

rateStarButtons.map((element, index) => {
  if (index === 0) new RateStarButton({ outerContainerElement: element, selectRating: 4, mayChange: true });
  if (index === 1) new RateStarButton({ outerContainerElement: element, selectRating: 5, mayChange: true });
});

export {};
