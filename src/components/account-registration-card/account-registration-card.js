import MaskedTextField from '../masked-text-field/masked-text-field.js';

class AccountRegistrationCard {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMDateOfBirth = this.outerContainerElement.querySelector('.js-account-registration-card__date-of-birth');
    new MaskedTextField(this.DOMDateOfBirth);
  };

  _setEventHandlers = () => {};
}

export default AccountRegistrationCard;
