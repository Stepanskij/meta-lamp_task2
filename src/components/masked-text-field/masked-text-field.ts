import Inputmask from 'inputmask';

class MaskedTextField {
  outerContainerElement: Element;
  DOMInput: Element | null | undefined;

  constructor(outerContainerElement: Element) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }
  _initialization = () => {
    this.DOMInput = this.outerContainerElement.querySelector('.js-masked-text-field__input');
    Inputmask({ alias: 'datetime', inputFormat: 'dd.mm.yyyy', placeholder: 'ДД.ММ.ГГГГ' }).mask(
      this.DOMInput as HTMLElement,
    );
  };

  _setEventHandlers = () => {};
}

export default MaskedTextField;
