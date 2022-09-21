import DividedDateDropdownCard from '../divided-date-dropdown-card/divided-date-dropdown-card';
import Dropdown from '../dropdown/dropdown';

class ChoseRoomCard {
  outerContainerElement: Element;
  dropdownList: Array<Array<string>>;
  DOMDates: Element | null | undefined;
  DOMGuests: Element | null | undefined;

  constructor(outerContainerElement: HTMLElement) {
    this.outerContainerElement = outerContainerElement;
    this.dropdownList = [
      ['Сколько гостей'],
      ['', 'Взрослые', '', 'Взрослые'],
      ['', 'Дети', '', 'Дети'],
      ['Младенец', 'Младенца', 'Младенцов', 'Младенци'],
      ['Гость', 'Гостя', 'Гостей'],
    ];

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMDates = this.outerContainerElement.querySelector('.js-chose-room-card__dates');
    this.DOMGuests = this.outerContainerElement.querySelector('.js-chose-room-card__guests');

    if (this.DOMDates) new DividedDateDropdownCard(this.DOMDates);
    if (this.DOMGuests) new Dropdown(this.DOMGuests, this.dropdownList);
  };

  _setEventHandlers = () => {};
}

export default ChoseRoomCard;
