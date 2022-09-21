import RateStarButton from '../rate-star-button/rate-star-button';

interface IRoomShowCardArgs {
  outerContainerElement: Element;
  numberRoom: number;
  classRoom: string;
  priceRoom: number;
  rating: number;
  feedbackNumber: number;
}

interface IRateStarButtonArgs {
  outerContainerElement: Element;
  selectRating: number;
  mayChange: boolean;
}

class RoomShowCard {
  outerContainerElement: Element;
  numberRoom: number;
  classRoom: string;
  priceRoom: number;
  rating: number;
  feedbackNumber: number;
  selectPage: number;
  conjugations: string[];

  DOMPhotosScroll: Element | null | undefined;
  DOMPhotos: Element[] | null | undefined;
  DOMButtonBack: Element | null | undefined;
  DOMButtonForward: Element | null | undefined;
  DOMRadioButtons: Element[] | null | undefined;
  DOMNumberRoomTitle: Element | null | undefined;
  DOMClassRoomTitle: Element | null | undefined;
  DOMPriceRoomTitle: Element | null | undefined;
  DOMRateStarButton: Element | null | undefined;
  DOMFeedbackNumber: Element | null | undefined;
  DOMFeedbackText: Element | null | undefined;

  constructor({
    outerContainerElement,
    numberRoom = 888,
    classRoom = 'класс',
    priceRoom = 0,
    rating = 1,
    feedbackNumber = 0,
  }: IRoomShowCardArgs) {
    this.outerContainerElement = outerContainerElement;
    this.numberRoom = numberRoom;
    this.classRoom = classRoom;
    this.priceRoom = priceRoom;
    this.rating = rating;
    this.feedbackNumber = feedbackNumber;

    this.selectPage = 1;

    this.conjugations = ['Отзыва', 'Отзыв', 'Отзывов'];
    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMPhotosScroll = this.outerContainerElement.querySelector('.js-room-show-card__photos-scroll');
    this.DOMPhotos = [...this.outerContainerElement.querySelectorAll('.js-room-show-card__photo')];
    this.DOMButtonBack = this.outerContainerElement.querySelector('.js-room-show-card__button-back');
    this.DOMButtonForward = this.outerContainerElement.querySelector('.js-room-show-card__button-forward');
    this.DOMRadioButtons = [...this.outerContainerElement.querySelectorAll('.js-room-show-card__radio-button')];

    this.DOMNumberRoomTitle = this.outerContainerElement.querySelector(
      '.js-room-show-card__info-text-title-room-number',
    );
    this.DOMClassRoomTitle = this.outerContainerElement.querySelector('.js-room-show-card__info-text-title-room-class');
    this.DOMPriceRoomTitle = this.outerContainerElement.querySelector('.js-room-show-card__info-text-title-room-price');

    this.DOMRateStarButton = this.outerContainerElement.querySelector('.js-room-show-card__info-text-rate-star-button');
    this.DOMFeedbackNumber = this.outerContainerElement.querySelector('.js-room-show-card__info-text-feedback-number');
    this.DOMFeedbackText = this.outerContainerElement.querySelector('.js-room-show-card__info-text-feedback-text');

    if (this.DOMRateStarButton)
      new RateStarButton({
        outerContainerElement: this.DOMRateStarButton,
        selectRating: this.rating,
        mayChange: false,
      });
    this._fillCard();
    this._buttonsHideHandler();
    this._fillRadioButton();
  };

  _setEventHandlers = () => {
    this._onHover();
    if (this.DOMRadioButtons)
      this.DOMRadioButtons.map(element => {
        element.addEventListener('click', this._handlerRadioButton);
      });
    if (this.DOMButtonBack) this.DOMButtonBack.addEventListener('click', this._handlerButtonBack);
    if (this.DOMButtonForward) this.DOMButtonForward.addEventListener('click', this._handlerButtonForward);
  };

  _fillCard = () => {
    if (this.DOMPhotos)
      this.DOMPhotos.map((element, index) => {
        element.setAttribute('src', `../../assets/img/rooms-photos/room-${this.numberRoom}-${index + 1}.png`);
      });
    if (this.DOMNumberRoomTitle) this.DOMNumberRoomTitle.textContent = String(this.numberRoom);
    if (this.DOMClassRoomTitle) this.DOMClassRoomTitle.textContent = this.classRoom;
    if (this.DOMPriceRoomTitle) this.DOMPriceRoomTitle.textContent = this._formattedNumber(this.priceRoom) + '₽';

    if (this.DOMFeedbackNumber) this.DOMFeedbackNumber.textContent = String(this.feedbackNumber);
    if (this.DOMFeedbackText)
      this.DOMFeedbackText.textContent = String(this._checkConjugation(this.conjugations, this.feedbackNumber));
  };

  _onHover = () => {
    if (this.DOMPhotosScroll) this.DOMPhotosScroll.addEventListener('mouseover', this._buttonsHideHandler);
    if (this.DOMPhotosScroll) this.DOMPhotosScroll.addEventListener('mouseout', this._buttonsHideHandler);
  };

  _buttonsHideHandler = () => {
    if (this.DOMButtonBack) this.DOMButtonBack.classList.toggle(this.DOMButtonBack.classList[0] + '_hide');
    if (this.DOMButtonForward) this.DOMButtonForward.classList.toggle(this.DOMButtonForward.classList[0] + '_hide');
  };

  _fillRadioButton = () => {
    if (this.DOMRadioButtons)
      this.DOMRadioButtons.map((item, index) => {
        item.classList.toggle(item.classList[0] + '_select', index + 1 === this.selectPage);
      });
  };

  _changePhoto = () => {
    if (this.DOMPhotos) (this.DOMPhotos[0] as HTMLElement).style.marginLeft = `-${16.875 * (this.selectPage - 1)}rem`;
  };

  _handlerRadioButton = (eventObj: Event) => {
    this.selectPage = Number((eventObj.target as HTMLElement).dataset.index);
    this._fillRadioButton();
    this._changePhoto();
  };

  _handlerButtonBack = () => {
    this.selectPage -= 1;
    if (this.selectPage < 1) this.selectPage = 1;
    this._fillRadioButton();
    this._changePhoto();
  };
  _handlerButtonForward = () => {
    this.selectPage += 1;
    if (this.selectPage > 4) this.selectPage = 4;
    this._fillRadioButton();
    this._changePhoto();
  };

  _formattedNumber = (number: number) => {
    return new Intl.NumberFormat().format(number);
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
}

export default RoomShowCard;
