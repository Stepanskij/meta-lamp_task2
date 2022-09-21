class Header {
  outerContainerElement: Element;
  DOMDropdown: Array<Element> | null | undefined;
  DOMServices: Element | null | undefined;
  DOMAgreements: Element | null | undefined;

  constructor(outerContainerElement: Element) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMDropdown = [...this.outerContainerElement.querySelectorAll('.js-header__current')];

    this.DOMServices = this.outerContainerElement.querySelector('.js-header__services');
    this.DOMAgreements = this.outerContainerElement.querySelector('.js-header__agreements');
  };

  _setEventHandlers = () => {
    if (this.DOMDropdown) this.DOMDropdown[0].addEventListener('click', this._changeOpenedServices);
    if (this.DOMDropdown) this.DOMDropdown[1].addEventListener('click', this._changeOpenedAgreements);
  };

  _changeOpenedServices = () => {
    if (this.DOMServices) this.DOMServices.classList.toggle(`${this.DOMServices.classList[0]}_opened`);
  };
  _changeOpenedAgreements = () => {
    if (this.DOMAgreements) this.DOMAgreements.classList.toggle(`${this.DOMAgreements.classList[0]}_opened`);
  };
}

export default Header;
