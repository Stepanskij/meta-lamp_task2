import DividedDateDropdownCard from '../divided-date-dropdown-card/divided-date-dropdown-card.js';
import Dropdown from '../dropdown/dropdown.js';

class ChoseRoomCard {
  constructor(outerContainerElement) {
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

    new DividedDateDropdownCard(this.DOMDates);
    new Dropdown(this.DOMGuests, this.dropdownList);
  };

  _setEventHandlers = () => {};
}

export default ChoseRoomCard;
