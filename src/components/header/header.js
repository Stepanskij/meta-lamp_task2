class Header {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMServices = this.outerContainerElement.querySelector('.js-header__services');
    this.DOMServicesArrow = this.outerContainerElement.querySelector('.js-header__services-arrow');

    this.DOMAgreements = this.outerContainerElement.querySelector('.js-header__agreements');
    this.DOMAgreementsArrow = this.outerContainerElement.querySelector('.js-header__agreements-arrow');
  };

  _setEventHandlers = () => {
    this.DOMServices.addEventListener('click', this._changeArrow);
    this.DOMAgreements.addEventListener('click', this._changeArrow);
  };

  _changeArrow = eventObj => {
    eventObj.srcElement.parentElement.classList.toggle(`${eventObj.srcElement.parentElement.classList[0]}_opened`);
    console.log(eventObj)
  };
}

export default Header;
