class ExpandableCheckboxList {
  outerContainerElement: Element;
  DOMTitle: Element | null | undefined;
  DOMList: Element | null | undefined;
  DOMArrow: Element | null | undefined;

  constructor(outerContainerElement: Element) {
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
    if (this.DOMTitle) this.DOMTitle.addEventListener('click', this._changeOpenState);
  };

  _changeOpenState = () => {
    if (this.DOMList) this.DOMList.classList.toggle('expandable-checkbox-list__list_is-opened');
    if (this.DOMArrow) this.DOMArrow.classList.toggle('expandable-checkbox-list__title-expand-arrow_is-opened');
  };
}

export default ExpandableCheckboxList;
