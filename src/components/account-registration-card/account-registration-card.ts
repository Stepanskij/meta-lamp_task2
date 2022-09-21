import MaskedTextField from '../masked-text-field/masked-text-field';

class AccountRegistrationCard {
  outerContainerElement: Element;
  DOMDateOfBirth: Element | null | undefined;

  constructor(outerContainerElement: HTMLElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMDateOfBirth = this.outerContainerElement.querySelector('.js-account-registration-card__date-of-birth');
    if (this.DOMDateOfBirth) new MaskedTextField(this.DOMDateOfBirth);
  };

  _setEventHandlers = () => {};
}

export default AccountRegistrationCard;
