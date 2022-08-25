class DropdownItem {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.numberValue = 0;

    this._initialization();
    this._setEventHandlers();
    this.update();
  }

  _initialization = () => {
    this.DOMButtonMinus = this.containerElement.querySelector('.js-dropdown__list-row-frame-minus');
    this.DOMButtonPlus = this.containerElement.querySelector('.js-dropdown__list-row-frame-plus');
    this.DOMRowText = this.containerElement.querySelector('.js-dropdown__list-row-text');
    this.DOMNumber = this.containerElement.querySelector('.js-dropdown__list-row-number');
    this.DOMNumber.textContent = this.numberValue;
  };
  _setEventHandlers = () => {
    this.DOMButtonMinus.addEventListener('click', this._handelButtonMinus);
    this.DOMButtonPlus.addEventListener('click', this._handelButtonPlus);
  };

  _handelButtonPlus = event => {
    this.numberValue += 1;
    this.update();
  };

  _handelButtonMinus = event => {
    this.numberValue -= 1;
    if (this.numberValue < 0) this.numberValue = 0;
    this.update();
  };

  update = () => {
    this.DOMNumber.textContent = this.numberValue;
    this.DOMButtonMinus.classList.toggle('dropdown__list-row-frame_active', this.numberValue !== 0);
  };
}

export default DropdownItem;
