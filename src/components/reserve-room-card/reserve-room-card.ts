import DividedDateDropdownCard from '../divided-date-dropdown-card/divided-date-dropdown-card';
import Dropdown from '../dropdown/dropdown';

interface IReserveRoomCardArgs {
  outerContainerElement: Element;
  numberRoom: string;
  classRoom: string;
  priceRoom: number;
  discountService: number;
}

class ReserveRoomCard {
  outerContainerElement: Element;
  numberRoom: string;
  classRoom: string;
  priceRoom: number;
  discountService: number;
  DOMInput: Element | null | undefined;
  dropdownList: string[][] | null | undefined;

  DOMDates: Element | null | undefined;
  DOMGuests: Element | null | undefined;
  DOMNumberRoomTitle: Element | null | undefined;
  DOMClassRoomTitle: Element | null | undefined;
  DOMPriceRoomTitle: Element | null | undefined;
  DOMPriceRoom: Element | null | undefined;
  DOMPriceRoomPerDay: Element | null | undefined;
  DOMDiscountServiceText: Element | null | undefined;
  DOMDiscountService: Element | null | undefined;
  DOMPriceAdditionalServiceText: Element | null | undefined;
  DOMPriceAdditionalService: Element | null | undefined;
  DOMFinPrice: Element | null | undefined;

  dividedDateDropdownCard: DividedDateDropdownCard | null | undefined;
  guestsDropdownCard: Dropdown | null | undefined;

  constructor({
    outerContainerElement,
    numberRoom = '000',
    classRoom = 'класс',
    priceRoom = 0,
    discountService = 0,
  }: IReserveRoomCardArgs) {
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

    if (this.DOMDates) this.dividedDateDropdownCard = new DividedDateDropdownCard(this.DOMDates);
    if (this.DOMGuests && this.dropdownList) this.guestsDropdownCard = new Dropdown(this.DOMGuests, this.dropdownList);
  };

  _setEventHandlers = () => {
    if (this.dividedDateDropdownCard && this.dividedDateDropdownCard.DOMApplyButton)
      this.dividedDateDropdownCard.DOMApplyButton.addEventListener('click', this._reFillInfoCard);
    if (this.dividedDateDropdownCard && this.dividedDateDropdownCard.DOMClearButton)
      this.dividedDateDropdownCard.DOMClearButton.addEventListener('click', this._reFillInfoCard);

    if (this.guestsDropdownCard && this.guestsDropdownCard.DOMButtonClear)
      this.guestsDropdownCard.DOMButtonClear.addEventListener('click', this._reFillInfoCard);
    if (this.guestsDropdownCard && this.guestsDropdownCard.DOMButtonApply)
      this.guestsDropdownCard.DOMButtonApply.addEventListener('click', this._reFillInfoCard);
  };

  _fillInfoCard = () => {
    if (this.DOMNumberRoomTitle) this.DOMNumberRoomTitle.textContent = this.numberRoom;
    if (this.DOMClassRoomTitle) this.DOMClassRoomTitle.textContent = this.classRoom;
    if (this.DOMPriceRoomTitle) this.DOMPriceRoomTitle.textContent = this._formattedNumber(this.priceRoom) + '₽';
    //
    if (this.DOMPriceRoomPerDay && this.dividedDateDropdownCard && this.dividedDateDropdownCard.timeOfStay)
      this.DOMPriceRoomPerDay.textContent =
        this._formattedNumber(this.priceRoom * this.dividedDateDropdownCard.timeOfStay) + '₽';
    if (this.DOMPriceRoom && this.dividedDateDropdownCard && this.dividedDateDropdownCard.timeOfStay)
      this.DOMPriceRoom.textContent =
        this._formattedNumber(this.priceRoom) +
        '₽' +
        ' х ' +
        this.dividedDateDropdownCard.timeOfStay +
        ' ' +
        this._checkConjugation(['сутки', 'суток', 'суток'], this.dividedDateDropdownCard.timeOfStay);
    //
    if (this.DOMDiscountServiceText)
      this.DOMDiscountServiceText.textContent =
        'Сбор за услуги: скидка ' + `${this._formattedNumber(this.discountService) + '₽'}`;
    if (this.DOMDiscountService) this.DOMDiscountService.textContent = 0 + '₽';
    //
    if (this.DOMPriceAdditionalServiceText)
      this.DOMPriceAdditionalServiceText.textContent = 'Сбор за дополнительные услуги';
    if (this.DOMPriceAdditionalService && this.guestsDropdownCard && this.guestsDropdownCard.items)
      this.DOMPriceAdditionalService.textContent =
        (this.guestsDropdownCard.items[0].numberValue + this.guestsDropdownCard.items[1].numberValue) * 100 + '₽';
    //
    if (
      this.DOMFinPrice &&
      this.dividedDateDropdownCard &&
      this.dividedDateDropdownCard.timeOfStay &&
      this.guestsDropdownCard &&
      this.guestsDropdownCard.items
    )
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
    if (this.DOMPriceRoom && this.dividedDateDropdownCard && this.dividedDateDropdownCard.timeOfStay)
      this.DOMPriceRoom.textContent =
        this._formattedNumber(this.priceRoom) +
        '₽' +
        ' х ' +
        this.dividedDateDropdownCard.timeOfStay +
        ' ' +
        this._checkConjugation(['сутки', 'суток', 'суток'], this.dividedDateDropdownCard.timeOfStay);
    //
    if (this.DOMPriceRoomPerDay && this.dividedDateDropdownCard && this.dividedDateDropdownCard.timeOfStay)
      this.DOMPriceRoomPerDay.textContent =
        this._formattedNumber(this.priceRoom * this.dividedDateDropdownCard.timeOfStay) + '₽';
    //
    if (
      this.DOMFinPrice &&
      this.dividedDateDropdownCard &&
      this.dividedDateDropdownCard.timeOfStay &&
      this.guestsDropdownCard &&
      this.guestsDropdownCard.items
    )
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
    if (this.DOMPriceAdditionalService && this.guestsDropdownCard && this.guestsDropdownCard.items)
      this.DOMPriceAdditionalService.textContent =
        (this.guestsDropdownCard.items[0].numberValue + this.guestsDropdownCard.items[1].numberValue) * 100 + '₽';
  };

  _checkConjugation = (conjugations: string[], numString: number) => {
    if ((numString > 4 && numString < 20) || numString % 10 > 4 || numString % 10 === 0) {
      return conjugations[2];
    } else if (numString % 10 === 1) {
      return conjugations[0];
    } else if (numString % 10 > 1 && numString % 10 < 5) {
      return conjugations[1];
    }
  };

  _formattedNumber = (number: number) => {
    return new Intl.NumberFormat().format(number);
  };
}

export default ReserveRoomCard;
