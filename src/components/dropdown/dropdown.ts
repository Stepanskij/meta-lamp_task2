import DropdownItem from './dropdown-item';

class Dropdown {
  outerContainerElement: Element;
  listValue: Array<Array<string>> | null | undefined;
  defaultText: string | null | undefined;
  listConjugations: Array<Array<string>> | null | undefined;
  commonConjugations: string[] | null | undefined;
  DOMContainer: Element | null | undefined;
  DOMList: Element | null | undefined;
  DOMArrow: Element | null | undefined;
  DOMItems: Array<Element> | null | undefined;
  DOMContainerText: Element | null | undefined;
  DOMButtonClear: Element | null | undefined;
  DOMButtonApply: Element | null | undefined;
  items: DropdownItem[] | null | undefined;
  sum: number | null | undefined;
  sumItem: number | null | undefined;

  constructor(outerContainerElement: Element, listValue: Array<Array<string>>) {
    this.outerContainerElement = outerContainerElement;
    this.defaultText = listValue[0][0];
    this.listConjugations = listValue.slice(1, 4);
    this.commonConjugations = listValue[4];

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.DOMContainer = this.outerContainerElement.querySelector('.js-dropdown__container');
    this.DOMList = this.outerContainerElement.querySelector('.js-dropdown__list');
    this.DOMArrow = this.outerContainerElement.querySelector('.js-dropdown__container-arrow');

    this.DOMItems = [...this.outerContainerElement.querySelectorAll('.js-dropdown__list-row')];
    this.DOMContainerText = this.outerContainerElement.querySelector('.js-dropdown__container-text');
    this.DOMButtonClear = this.outerContainerElement.querySelector('.js-dropdown__buttons-clear');
    this.DOMButtonApply = this.outerContainerElement.querySelector('.js-dropdown__buttons-apply');
    this.items = this.DOMItems.map(itemElement => new DropdownItem(itemElement as HTMLElement));
    if (this.defaultText !== undefined && this.DOMContainerText) this.DOMContainerText.textContent = this.defaultText;

    if (this.listConjugations)
      this.listConjugations.map((item, index) => {
        if (this.items && this.items[index].DOMRowText) {
          (this.items[index].DOMRowText as Element).textContent = item[3];
        }
      });
  };

  _setEventHandlers = () => {
    if (this.DOMContainer) this.DOMContainer.addEventListener('click', this._changeOpenState);
    if (this.DOMButtonClear) {
      if (this.items)
        this.items.map(item => {
          if (item.DOMButtonMinus) item.DOMButtonMinus.addEventListener('click', this.updateInputText);
          if (item.DOMButtonMinus) item.DOMButtonMinus.addEventListener('click', this.updateClearButton);
          if (item.DOMButtonPlus) item.DOMButtonPlus.addEventListener('click', this.updateInputText);
          if (item.DOMButtonPlus) item.DOMButtonPlus.addEventListener('click', this.updateClearButton);
        });
    }
    if (this.DOMButtonClear) {
      this.DOMButtonClear.addEventListener('click', this._resetValues);
      this.DOMButtonClear.addEventListener('click', this.updateClearButton);
    }
    if (this.DOMButtonApply) this.DOMButtonApply.addEventListener('click', this._apply);
  };

  _changeOpenState = () => {
    if (this.DOMList) this.DOMList.classList.toggle('dropdown__list_is-opened');
    if (this.DOMContainer) this.DOMContainer.classList.toggle('dropdown__container_is-opened');
    if (this.DOMArrow) this.DOMArrow.classList.toggle('dropdown__container-arrow_is-opened');
  };

  updateInputText = () => {
    if (this.items)
      this.sum = this.items.reduce((previousValue, item) => {
        return previousValue + item.numberValue;
      }, 0);
    if (this.sum === 0 && this.DOMContainerText && this.defaultText !== undefined) {
      this.DOMContainerText.textContent = this.defaultText;
    } else if (this.commonConjugations && this.items && this.listConjugations && this.DOMContainerText) {
      this.sumItem = this.items[0].numberValue + this.items[1].numberValue;
      let string = this.sumItem + ' ';
      string += this._checkConjugation(this.commonConjugations, this.sumItem);
      string += ', ';
      string += this.items[2].numberValue + ' ';
      string += this._checkConjugation(this.listConjugations[2], this.items[2].numberValue);
      this.DOMContainerText.textContent = string;
    } else {
      if (this.DOMContainerText && this.items)
        this.DOMContainerText.textContent = this.items.reduce((previousValue, item, index, array) => {
          let string = item.numberValue + ' ';
          if (this.listConjugations) string += this._checkConjugation(this.listConjugations[index], item.numberValue);
          if (index !== array.length - 1) string += ', ';
          console.log('k');
          return previousValue + string;
        }, '');
    }
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

  updateClearButton = () => {
    if (this.items)
      this.sum = this.items.reduce((previousValue, item) => {
        return previousValue + item.numberValue;
      }, 0);
    if (this.DOMButtonClear) this.DOMButtonClear.classList.toggle('dropdown__buttons-clear_hidden', this.sum === 0);
  };

  _resetValues = () => {
    if (this.items)
      this.items.map(item => {
        item.numberValue = 0;
        item.update();
      });
    this.updateInputText();
  };

  _apply = () => {
    this._changeOpenState();
  };
}

export default Dropdown;
