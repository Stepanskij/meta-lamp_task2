import DividedDateDropdownCard from '../divided-date-dropdown-card/divided-date-dropdown-card.js';
import Dropdown from '../dropdown/dropdown.js';

class ReserveRoomCard {
  constructor({ outerContainerElement, numberRoom = '000', classRoom = 'класс', priceRoom = 0, discountService = 0 }) {
    this.outerContainerElement = outerContainerElement;
    this.numberRoom = numberRoom;
    this.classRoom = classRoom;
    this.priceRoom = priceRoom;
    this.discountService = discountService;

    this.dropdownList = [
      ['Сколько гостей'],
      ['', 'Взрослые', '', 'Взрослые'],
      ['', 'Дети', '', 'Дети'],
      ['Младенец', 'Младенца', 'Младенцов', 'Младенци'],
      ['Гость', 'Гостя', 'Гостей'],
    ];
    this._initialization();
    this._setEventHandlers();
    this._fillInfoCard();
  }
  _initialization = () => {
    this.DOMDates = this.outerContainerElement.querySelector('.js-reserve-room-card__dates');
    this.DOMGuests = this.outerContainerElement.querySelector('.js-reserve-room-card__guests');

    this.DOMNumberRoomTitle = this.outerContainerElement.querySelector('.js-reserve-room-card__title-room-number');
    this.DOMClassRoomTitle = this.outerContainerElement.querySelector('.js-reserve-room-card__title-room-class');
    this.DOMPriceRoomTitle = this.outerContainerElement.querySelector('.js-reserve-room-card__title-room-price');

    this.DOMPriceRoom = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-1-1');
    this.DOMPriceRoomPerDay = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-1-2');

    this.DOMDiscountServiceText = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-2-1');
    this.DOMDiscountService = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-2-3');

    this.DOMPriceAdditionalServiceText = this.outerContainerElement.querySelector(
      '.js-reserve-room-card__price-info-3-1',
    );
    this.DOMPriceAdditionalService = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-3-3');

    this.DOMFinPrice = this.outerContainerElement.querySelector('.js-reserve-room-card__fin-price');

    this.dividedDateDropdownCard = new DividedDateDropdownCard(this.DOMDates);
    this.guestsDropdownCard = new Dropdown(this.DOMGuests, this.dropdownList);
  };

  _setEventHandlers = () => {
    this.dividedDateDropdownCard.DOMApplyButton.addEventListener('click', this._reFillInfoCard);
    this.dividedDateDropdownCard.DOMClearButton.addEventListener('click', this._reFillInfoCard);

    this.guestsDropdownCard.DOMButtonClear.addEventListener('click', this._reFillInfoCard);
    this.guestsDropdownCard.DOMButtonApply.addEventListener('click', this._reFillInfoCard);
  };

  _fillInfoCard = () => {
    this.DOMNumberRoomTitle.textContent = this.numberRoom;
    this.DOMClassRoomTitle.textContent = this.classRoom;
    this.DOMPriceRoomTitle.textContent = this._formattedNumber(this.priceRoom) + '₽';
    //
    this.DOMPriceRoomPerDay.textContent =
      this._formattedNumber(this.priceRoom * this.dividedDateDropdownCard.timeOfStay) + '₽';
    this.DOMPriceRoom.textContent =
      this._formattedNumber(this.priceRoom) +
      '₽' +
      ' х ' +
      this.dividedDateDropdownCard.timeOfStay +
      ' ' +
      this._checkConjugation(['сутки', 'суток', 'суток'], this.dividedDateDropdownCard.timeOfStay);
    //
    this.DOMDiscountServiceText.textContent =
      'Сбор за услуги: скидка ' + `${this._formattedNumber(this.discountService) + '₽'}`;
    this.DOMDiscountService.textContent = 0 + '₽';
    //
    this.DOMPriceAdditionalServiceText.textContent = 'Сбор за дополнительные услуги';
    this.DOMPriceAdditionalService.textContent =
      (this.guestsDropdownCard.items[0].numberValue + this.guestsDropdownCard.items[1].numberValue) * 100 + '₽';
    //
    this.DOMFinPrice.textContent =
      `${
        this.dividedDateDropdownCard.timeOfStay !== 0
          ? this._formattedNumber(
              this.priceRoom * this.dividedDateDropdownCard.timeOfStay +
                (this.guestsDropdownCard.items[0].numberValue + this.guestsDropdownCard.items[1].numberValue) * 100 -
                this.discountService,
            )
          : '0'
      }` + '₽';
  };

  _reFillInfoCard = () => {
    this.DOMPriceRoom.textContent =
      this._formattedNumber(this.priceRoom) +
      '₽' +
      ' х ' +
      this.dividedDateDropdownCard.timeOfStay +
      ' ' +
      this._checkConjugation(['сутки', 'суток', 'суток'], this.dividedDateDropdownCard.timeOfStay);
    //
    this.DOMPriceRoomPerDay.textContent =
      this._formattedNumber(this.priceRoom * this.dividedDateDropdownCard.timeOfStay) + '₽';
    //
    this.DOMFinPrice.textContent =
      `${
        this.dividedDateDropdownCard.timeOfStay !== 0
          ? this._formattedNumber(
              this.priceRoom * this.dividedDateDropdownCard.timeOfStay +
                (this.guestsDropdownCard.items[0].numberValue + this.guestsDropdownCard.items[1].numberValue) * 100 -
                this.discountService,
            )
          : '0'
      }` + '₽';
    //
    this.DOMPriceAdditionalService.textContent =
      (this.guestsDropdownCard.items[0].numberValue + this.guestsDropdownCard.items[1].numberValue) * 100 + '₽';
  };

  _checkConjugation = (conjugations, numString) => {
    if ((numString > 4 && numString < 20) || numString % 10 > 4 || numString % 10 === 0) {
      return conjugations[2];
    } else if (numString % 10 === 1) {
      return conjugations[0];
    } else if (numString % 10 > 1 && numString % 10 < 5) {
      return conjugations[1];
    }
  };

  _formattedNumber = number => {
    return new Intl.NumberFormat().format(number);
  };
}

export default ReserveRoomCard;
