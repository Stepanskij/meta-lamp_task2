class Header {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMServicesText = this.outerContainerElement.querySelector('.js-header__services-text');
    this.DOMServicesArrow = this.outerContainerElement.querySelector('.js-header__services-arrow');
    this.DOMServicesList = this.outerContainerElement.querySelector('.js-header__services-list');

    this.DOMAgreementsText = this.outerContainerElement.querySelector('.js-header__agreements-text');
    this.DOMAgreementsArrow = this.outerContainerElement.querySelector('.js-header__agreements-arrow');
    this.DOMAgreementsList = this.outerContainerElement.querySelector('.js-header__agreements-list');
  };

  _setEventHandlers = () => {
    this.DOMServicesText.addEventListener('click', this._changeArrow);
    this.DOMServicesText.addEventListener('click', this._changeList);
    this.DOMServicesArrow.addEventListener('click', this._changeArrow);

    this.DOMAgreementsText.addEventListener('click', this._changeArrow);
    this.DOMAgreementsText.addEventListener('click', this._changeList);
    this.DOMAgreementsArrow.addEventListener('click', this._changeArrow);
  };

  _changeArrow = eventObj => {
    eventObj.srcElement.parentElement.classList.toggle(`${eventObj.srcElement.parentElement.classList[0]}_opened`);
  };
}

export default Header;
