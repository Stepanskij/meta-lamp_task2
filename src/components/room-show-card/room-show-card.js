import RateStarButton from '../rate-star-button/rate-star-button.js';

class RoomShowCard {
  constructor({
    outerContainerElement,
    numberRoom = 888,
    classRoom = 'класс',
    priceRoom = 0,
    rating = 1,
    feedbackNumber = 0,
  }) {
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

    new RateStarButton({ outerContainerElement: this.DOMRateStarButton, selectRating: this.rating });
    this._fillCard();
    this._buttonsHideHandler();
    this._fillRadioButton();
  };

  _setEventHandlers = () => {
    this._onHover();
    this.DOMRadioButtons.map(item => {
      item.addEventListener('click', this._handlerRadioButton);
    });
    this.DOMButtonBack.addEventListener('click', this._handlerButtonBack);
    this.DOMButtonForward.addEventListener('click', this._handlerButtonForward);
  };

  _fillCard = () => {
    this.DOMPhotos.map((item, index) => {
      item.src = `../../assets/img/rooms-photos/room-${this.numberRoom}-${index + 1}.png`;
    });
    this.DOMNumberRoomTitle.textContent = this.numberRoom;
    this.DOMClassRoomTitle.textContent = this.classRoom;
    this.DOMPriceRoomTitle.textContent = this._formattedNumber(this.priceRoom) + '₽';

    this.DOMFeedbackNumber.textContent = this.feedbackNumber;
    this.DOMFeedbackText.textContent = this._checkConjugation(this.conjugations, this.feedbackNumber);
  };

  _onHover = () => {
    this.DOMPhotosScroll.addEventListener('mouseover', this._buttonsHideHandler);
    this.DOMPhotosScroll.addEventListener('mouseout', this._buttonsHideHandler);
  };

  _buttonsHideHandler = () => {
    this.DOMButtonBack.classList.toggle(this.DOMButtonBack.classList[0] + '_hide');
    this.DOMButtonForward.classList.toggle(this.DOMButtonForward.classList[0] + '_hide');
  };

  _fillRadioButton = () => {
    this.DOMRadioButtons.map((item, index) => {
      item.classList.toggle(item.classList[0] + '_select', index + 1 === this.selectPage);
    });
  };

  _changePhoto = () => {
    this.DOMPhotos[0].style.marginLeft = `-${16.875 * (this.selectPage - 1)}rem`;
  };

  _handlerRadioButton = eventObj => {
    this.selectPage = Number(eventObj.srcElement.dataset.index);
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

  _formattedNumber = number => {
    return new Intl.NumberFormat().format(number);
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
}

export default RoomShowCard;
