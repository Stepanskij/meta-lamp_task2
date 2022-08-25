class ExpandableCheckboxList {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.DOMTitle = this.outerContainerElement.querySelector('.js-expandable-checkbox-list__title');
    this.DOMList = this.outerContainerElement.querySelector('.js-expandable-checkbox-list__list');
    this.DOMArrow = this.outerContainerElement.querySelector('.js-expandable-checkbox-list__title-expand-arrow');
  };

  _setEventHandlers = () => {
    this.DOMTitle.addEventListener('click', this._changeOpenState);
  };

  _changeOpenState = () => {
    this.DOMList.classList.toggle('expandable-checkbox-list__list_is-opened');
    this.DOMArrow.classList.toggle('expandable-checkbox-list__title-expand-arrow_is-opened');
  };
}

export default ExpandableCheckboxList;
