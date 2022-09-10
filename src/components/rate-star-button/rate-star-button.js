class RateStarButton {
  constructor({ outerContainerElement, selectRating = 1, mayChange = false }) {
    this.outerContainerElement = outerContainerElement;
    this.selectRating = selectRating;
    this.mayChange = mayChange;

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.DOMRateStarButtons = [...this.outerContainerElement.querySelectorAll('.js-rate-star-button__mark')];

    this._fillButtons();
  };

  _setEventHandlers = () => {
    if (this.mayChange) {
      this.DOMRateStarButtons.map(item => {
        item.addEventListener('click', this._changeSelectRating);
      });
    }
  };

  _fillButtons = () => {
    this.DOMRateStarButtons.map((item, index) => {
      this.selectRating <= index
        ? (item.src = '../../assets/img/star-mark-default.svg')
        : (item.src = '../../assets/img/star-mark-active.svg');
    });
  };

  _changeSelectRating = eventObj => {
    this.selectRating = eventObj.srcElement.dataset.index;
    this._fillButtons();
  };
}

export default RateStarButton;
