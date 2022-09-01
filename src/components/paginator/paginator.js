class Paginator {
  constructor(outerContainerElement, numberOfChoices) {
    this.outerContainerElement = outerContainerElement;
    this.numberOfChoices = numberOfChoices;
    this.conjugations = ['варианта', 'вариантов', 'вариантов'];

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.DOMInfoText = this.outerContainerElement.querySelector('.js-paginator__info-text');
    this.DOMArrowLeft = this.outerContainerElement.querySelector('.js-paginator__arrow-left');
    this.DOMFirstPage = this.outerContainerElement.querySelector('.js-paginator__first-page');
    this.DOMEllipsis = [...this.outerContainerElement.querySelectorAll('.js-paginator__ellipsis')];
    this.DOMPrePages = [...this.outerContainerElement.querySelectorAll('.js-paginator__pre-page')];
    this.DOMPostPages = [...this.outerContainerElement.querySelectorAll('.js-paginator__post-page')];
    this.DOMSelectPage = this.outerContainerElement.querySelector('.js-paginator__select-page');
    this.DOMLastPage = this.outerContainerElement.querySelector('.js-paginator__last-page');
    this.DOMArrowRight = this.outerContainerElement.querySelector('.js-paginator__arrow-right');

    this.numberPages = Math.ceil(this.numberOfChoices / 12);
    this.remainderChoices = this.numberOfChoices % 12;
    this.selectedPage = 1;
    this.DOMFirstPage.textContent = 1;
    this.DOMLastPage.textContent = this.numberPages;

    this._fillPaginator();
  };
  _setEventHandlers = () => {
    this.DOMFirstPage.addEventListener('click', this._changePaginator);
    this.DOMLastPage.addEventListener('click', this._changePaginator);
    this.DOMPrePages.map(element => {
      element.addEventListener('click', this._changePaginator);
    });
    this.DOMPostPages.map(element => {
      element.addEventListener('click', this._changePaginator);
    });

    this.DOMArrowLeft.addEventListener('click', this._arrowLeftHandler);
    this.DOMArrowRight.addEventListener('click', this._arrowRightHandler);

    this._onHover();
  };

  _fillPaginator = () => {
    this.DOMSelectPage.textContent = this.selectedPage;
    this.DOMPrePages.map((element, index) => {
      element.textContent = this.selectedPage - 2 + index;
    });
    this.DOMPostPages.map((element, index) => {
      element.textContent = this.selectedPage + 1 + index;
    });

    this.DOMArrowLeft.classList.toggle('-hide-', this.selectedPage === 1);
    this.DOMArrowRight.classList.toggle('-hide-', this.selectedPage === this.numberPages);

    this.DOMFirstPage.classList.toggle('-hide-', this.selectedPage < 1 + 3);
    this.DOMEllipsis[0].classList.toggle('-hide-', this.selectedPage < 1 + 4);
    this.DOMPrePages[0].classList.toggle('-hide-', this.selectedPage < 3);
    this.DOMPrePages[1].classList.toggle('-hide-', this.selectedPage < 2);

    this.DOMLastPage.classList.toggle('-hide-', this.selectedPage > this.numberPages - 3);
    this.DOMEllipsis[1].classList.toggle('-hide-', this.selectedPage > this.numberPages - 4);
    this.DOMPostPages[0].classList.toggle('-hide-', this.selectedPage > this.numberPages - 1);
    this.DOMPostPages[1].classList.toggle('-hide-', this.selectedPage > this.numberPages - 2);

    this._changeInfoText();
  };

  _changePaginator = eventObj => {
    this.selectedPage = Number(eventObj.srcElement.textContent);
    this._fillPaginator();
  };

  _arrowLeftHandler = () => {
    this.selectedPage -= 1;
    this._fillPaginator();
  };

  _arrowRightHandler = () => {
    this.selectedPage += 1;
    this._fillPaginator();
  };

  _focus = eventObj => {
    eventObj.srcElement.classList.toggle('-focus-');
  };

  _onHover = () => {
    this.DOMFirstPage.addEventListener('mouseover', this._focus);
    this.DOMFirstPage.addEventListener('mouseout', this._focus);
    this.DOMLastPage.addEventListener('mouseover', this._focus);
    this.DOMLastPage.addEventListener('mouseout', this._focus);
    this.DOMPrePages.map(element => {
      element.addEventListener('mouseover', this._focus);
      element.addEventListener('mouseout', this._focus);
    });
    this.DOMPostPages.map(element => {
      element.addEventListener('mouseover', this._focus);
      element.addEventListener('mouseout', this._focus);
    });
  };

  _changeInfoText = () => {
    this.infoText = `${1 + 12 * (this.selectedPage - 1)} - ${12 * this.selectedPage}`;
    if (this.selectedPage === this.numberPages) {
      if (this.remainderChoices === 1) {
        this.infoText = `${12 * (this.selectedPage - 1) + this.remainderChoices}`;
      } else {
        this.infoText = `${1 + 12 * (this.selectedPage - 1)} - ${
          this.remainderChoices > 0 ? 12 * (this.selectedPage - 1) + this.remainderChoices : 12 * this.selectedPage
        }`;
      }
    }
    this.infoText += ` из ${this.numberOfChoices > 100 ? '100+' : this.numberOfChoices} `;
    this.infoText += this._checkConjugation(this.conjugations, this.numberOfChoices > 100 ? 100 : this.numberOfChoices);
    this.infoText += " аренды"

    this.DOMInfoText.textContent = this.infoText;
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
}

export default Paginator;
