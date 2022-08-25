import DropdownItem from './dropdown-item.js';

class Dropdown {
  constructor(outerContainerElement, listValue) {
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
    this.items = this.DOMItems.map(itemElement => new DropdownItem(itemElement));
    this.DOMContainerText.textContent = this.defaultText;

    this.listConjugations.map((item, index) => {
      this.items[index].DOMRowText.textContent = item[3];
    });
  };

  _setEventHandlers = () => {
    this.DOMContainer.addEventListener('click', this._changeOpenState);
    this.items.map(item => {
      item.DOMButtonMinus.addEventListener('click', this.updateInputText);
      item.DOMButtonMinus.addEventListener('click', this.updateClearButton);
      item.DOMButtonPlus.addEventListener('click', this.updateInputText);
      item.DOMButtonPlus.addEventListener('click', this.updateClearButton);
    });
    if (this.DOMButtonClear) {
      this.DOMButtonClear.addEventListener('click', this._resetValues);
      this.DOMButtonClear.addEventListener('click', this.updateClearButton);
    }
    if (this.DOMButtonApply) this.DOMButtonApply.addEventListener('click', this._apply);
  };

  _changeOpenState = () => {
    this.DOMList.classList.toggle('dropdown__list_is-opened');
    this.DOMContainer.classList.toggle('dropdown__container_is-opened');
    this.DOMArrow.classList.toggle('dropdown__container-arrow_is-opened');
  };

  updateInputText = () => {
    this.sum = this.items.reduce((previousValue, item) => {
      return previousValue + item.numberValue;
    }, 0);
    if (this.sum === 0) {
      this.DOMContainerText.textContent = this.defaultText;
    } else if (this.commonConjugations) {
      this.sumItem = this.items[0].numberValue + this.items[1].numberValue;
      let string = this.sumItem + ' ';
      string += this._checkConjugation(this.commonConjugations, this.sumItem);
      string += ', ';
      string += this.items[2].numberValue + ' ';
      string += this._checkConjugation(this.listConjugations[2], this.items[2].numberValue);
      this.DOMContainerText.textContent = string;
    } else {
      this.DOMContainerText.textContent = this.items.reduce((previousValue, item, index, array) => {
        let string = item.numberValue + ' ';
        string += this._checkConjugation(this.listConjugations[index], item.numberValue);
        if (index !== array.length - 1) string += ', ';
        console.log('k');
        return previousValue + string;
      }, '');
    }
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

  updateClearButton = () => {
    this.sum = this.items.reduce((previousValue, item) => {
      return previousValue + item.numberValue;
    }, 0);
    this.DOMButtonClear.classList.toggle('dropdown__buttons-clear_hidden', this.sum === 0);
  };

  _resetValues = () => {
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
