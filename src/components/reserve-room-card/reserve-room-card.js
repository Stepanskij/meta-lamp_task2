import DividedDateDropdownCard from '../divided-date-dropdown-card/divided-date-dropdown-card.js';
import Dropdown from '../dropdown/dropdown.js';

class ReserveRoomCard {
  constructor({
    outerContainerElement,
    numberRoom = '000',
    classRoom = 'класс',
    priceRoom = 0,
    priceService = 0,
    priceAdditionalService = 0,
    discountService = 0,
    discountAdditionalService = 0,
  }) {
    this.outerContainerElement = outerContainerElement;
    this.numberRoom = numberRoom;
    this.classRoom = classRoom;
    this.priceRoom = priceRoom;
    this.priceService = priceService;
    this.priceAdditionalService = priceAdditionalService;
    this.discountService = discountService;
    this.discountAdditionalService = discountAdditionalService;

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

    this.DOMPriceService = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-2-3');
    this.DOMDiscountService = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-2-1');

    this.DOMPriceAdditionalService = this.outerContainerElement.querySelector('.js-reserve-room-card__price-info-3-3');
    this.DOMDiscountAdditionalService = this.outerContainerElement.querySelector(
      '.js-reserve-room-card__price-info-3-1',
    );

    this.DOMFinPrice = this.outerContainerElement.querySelector('.js-reserve-room-card__fin-price');

    this.dividedDateDropdownCard = new DividedDateDropdownCard(this.DOMDates);
    this.DOMApplyButton = this.DOMDates.querySelector('.js-apply-button');
    new Dropdown(this.DOMGuests, this.dropdownList);
  };

  _setEventHandlers = () => {
    this.DOMApplyButton.addEventListener('click', this._reFillInfoCard);
  };

  _fillInfoCard = () => {
    this.DOMNumberRoomTitle.textContent = this.numberRoom;
    this.DOMClassRoomTitle.textContent = this.classRoom;
    this.DOMPriceRoomTitle.textContent = this._formattedNumber(this.priceRoom) + '₽';

    this.DOMPriceRoom.textContent =
      this._formattedNumber(this.priceRoom) +
      '₽' +
      ' х ' +
      this.dividedDateDropdownCard.timeOfStay +
      ' ' +
      this._checkConjugation(['сутки', 'суток', 'суток'], this.dividedDateDropdownCard.timeOfStay);
    this.DOMPriceRoomPerDay.textContent =
      this._formattedNumber(this.priceRoom * this.dividedDateDropdownCard.timeOfStay) + '₽';

    this.DOMPriceService.textContent = this.priceService + '₽';
    this.DOMDiscountService.textContent =
      'Сбор за услуги' +
      `${this.discountService ? ': скидка ' + this._formattedNumber(this.discountService) + '₽' : ''}`;

    this.DOMPriceAdditionalService.textContent = this.priceAdditionalService + '₽';
    this.DOMDiscountAdditionalService.textContent =
      'Сбор за дополнительные услуги' +
      `${
        this.discountAdditionalService ? ': скидка ' + this._formattedNumber(this.discountAdditionalService) + '₽' : ''
      }`;

    this.DOMFinPrice.textContent =
      `${
        this.dividedDateDropdownCard.timeOfStay !== 0
          ? this._formattedNumber(
              this.priceRoom * this.dividedDateDropdownCard.timeOfStay +
                this.priceService +
                this.priceAdditionalService -
                this.discountService -
                this.discountAdditionalService,
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
    this.DOMFinPrice.textContent =
      `${
        this.dividedDateDropdownCard.timeOfStay !== 0
          ? this._formattedNumber(
              this.priceRoom * this.dividedDateDropdownCard.timeOfStay +
                this.priceService +
                this.priceAdditionalService -
                this.discountService -
                this.discountAdditionalService,
            )
          : '0'
      }` + '₽';
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
