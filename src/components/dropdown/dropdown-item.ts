class DropdownItem {
  containerElement: Element;
  numberValue: number;
  DOMButtonMinus: Element | null | undefined;
  DOMButtonPlus: Element | null | undefined;
  DOMRowText: Element | null | undefined;
  DOMNumber: Element | null | undefined;

  constructor(containerElement: HTMLElement) {
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
    if (this.DOMNumber) this.DOMNumber.textContent = String(this.numberValue);
  };
  _setEventHandlers = () => {
    if (this.DOMButtonMinus) this.DOMButtonMinus.addEventListener('click', this._handelButtonMinus);
    if (this.DOMButtonPlus) this.DOMButtonPlus.addEventListener('click', this._handelButtonPlus);
  };

  _handelButtonPlus = () => {
    this.numberValue += 1;
    this.update();
  };

  _handelButtonMinus = () => {
    this.numberValue -= 1;
    if (this.numberValue < 0) this.numberValue = 0;
    this.update();
  };

  update = () => {
    if (this.DOMNumber) this.DOMNumber.textContent = String(this.numberValue);
    if (this.DOMButtonMinus)
      this.DOMButtonMinus.classList.toggle('dropdown__list-row-frame_active', this.numberValue !== 0);
  };
}

export default DropdownItem;
