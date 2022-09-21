interface IRateStarButtonArgs {
  outerContainerElement: Element;
  selectRating: number;
  mayChange: boolean;
}

class RateStarButton {
  outerContainerElement: Element;
  selectRating: number;
  mayChange: boolean;
  DOMInput: Element | null | undefined;
  DOMRateStarButtons: Element[] | null | undefined;

  constructor({ outerContainerElement, selectRating = 1, mayChange = false }: IRateStarButtonArgs) {
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
    if (this.mayChange && this.DOMRateStarButtons) {
      this.DOMRateStarButtons.map(item => {
        item.addEventListener('click', this._changeSelectRating);
      });
    }
  };

  _fillButtons = () => {
    if (this.DOMRateStarButtons)
      this.DOMRateStarButtons.map((element, index) => {
        this.selectRating <= index
          ? element.setAttribute('src', '../../assets/img/star-mark-default.svg')
          : element.setAttribute('src', '../../assets/img/star-mark-active.svg');
      });
  };

  _changeSelectRating = (eventObj: Event) => {
    this.selectRating = Number((eventObj.target as HTMLElement).dataset.index);
    this._fillButtons();
  };
}

export default RateStarButton;
