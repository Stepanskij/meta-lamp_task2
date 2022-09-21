class Paginator {
  outerContainerElement: Element;
  numberOfChoices: number | null | undefined;
  conjugations: Array<string> | null | undefined;
  DOMInfoText: Element | null | undefined;
  DOMArrowLeft: Element | null | undefined;
  DOMFirstPage: Element | null | undefined;
  DOMEllipsis: Array<Element> | null | undefined;
  DOMPrePages: Array<Element> | null | undefined;
  DOMPostPages: Array<Element> | null | undefined;
  DOMSelectPage: Element | null | undefined;
  DOMLastPage: Element | null | undefined;
  DOMArrowRight: Element | null | undefined;
  numberPages: number | null | undefined;
  remainderChoices: number | null | undefined;
  selectedPage: number | null | undefined;

  infoText: string | null | undefined;

  constructor(outerContainerElement: Element, numberOfChoices: number) {
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

    if (this.numberOfChoices) this.numberPages = Math.ceil(this.numberOfChoices / 12);
    if (this.numberOfChoices) this.remainderChoices = this.numberOfChoices % 12;
    this.selectedPage = 1;
    if (this.DOMFirstPage) this.DOMFirstPage.textContent = '1';
    if (this.DOMLastPage) this.DOMLastPage.textContent = String(this.numberPages);

    this._fillPaginator();
  };
  _setEventHandlers = () => {
    if (this.DOMFirstPage) this.DOMFirstPage.addEventListener('click', this._changePaginator);
    if (this.DOMLastPage) this.DOMLastPage.addEventListener('click', this._changePaginator);
    if (this.DOMPrePages)
      this.DOMPrePages.map(element => {
        element.addEventListener('click', this._changePaginator);
      });
    if (this.DOMPostPages)
      this.DOMPostPages.map(element => {
        element.addEventListener('click', this._changePaginator);
      });

    if (this.DOMArrowLeft) this.DOMArrowLeft.addEventListener('click', this._arrowLeftHandler);
    if (this.DOMArrowRight) this.DOMArrowRight.addEventListener('click', this._arrowRightHandler);

    this._onHover();
  };

  _fillPaginator = () => {
    if (this.DOMSelectPage) this.DOMSelectPage.textContent = String(this.selectedPage);
    if (this.DOMPrePages)
      this.DOMPrePages.map((element, index) => {
        if (this.selectedPage) element.textContent = String(this.selectedPage - 2 + index);
      });
    if (this.DOMPostPages)
      this.DOMPostPages.map((element, index) => {
        if (this.selectedPage) element.textContent = String(this.selectedPage + 1 + index);
      });

    if (this.DOMArrowLeft)
      this.DOMArrowLeft.classList.toggle(this.DOMArrowLeft.classList[0] + '_hide', this.selectedPage === 1);
    if (this.DOMArrowRight)
      this.DOMArrowRight.classList.toggle(
        this.DOMArrowRight.classList[0] + '_hide',
        this.selectedPage === this.numberPages,
      );

    if (this.DOMFirstPage && this.selectedPage)
      this.DOMFirstPage.classList.toggle(this.DOMFirstPage.classList[0] + '_hide', this.selectedPage < 1 + 3);
    if (this.DOMEllipsis && this.selectedPage)
      this.DOMEllipsis[0].classList.toggle(this.DOMEllipsis[0].classList[0] + '_hide', this.selectedPage < 1 + 4);
    if (this.DOMPrePages && this.selectedPage)
      this.DOMPrePages[0].classList.toggle(this.DOMPrePages[0].classList[0] + '_hide', this.selectedPage < 3);
    if (this.DOMPrePages && this.selectedPage)
      this.DOMPrePages[1].classList.toggle(this.DOMPrePages[1].classList[0] + '_hide', this.selectedPage < 2);

    if (this.DOMLastPage && this.selectedPage && this.numberPages)
      this.DOMLastPage.classList.toggle(
        this.DOMLastPage.classList[0] + '_hide',
        this.selectedPage > this.numberPages - 3,
      );
    if (this.DOMEllipsis && this.selectedPage && this.numberPages)
      this.DOMEllipsis[1].classList.toggle(
        this.DOMEllipsis[1].classList[0] + '_hide',
        this.selectedPage > this.numberPages - 4,
      );
    if (this.DOMPostPages && this.selectedPage && this.numberPages)
      this.DOMPostPages[0].classList.toggle(
        this.DOMPostPages[0].classList[0] + '_hide',
        this.selectedPage > this.numberPages - 1,
      );
    if (this.DOMPostPages && this.selectedPage && this.numberPages)
      this.DOMPostPages[1].classList.toggle(
        this.DOMPostPages[1].classList[0] + '_hide',
        this.selectedPage > this.numberPages - 2,
      );

    this._changeInfoText();
  };

  _changePaginator = (eventObj: Event) => {
    this.selectedPage = Number((eventObj.target as Node).textContent);
    this._fillPaginator();
  };

  _arrowLeftHandler = () => {
    if (this.selectedPage) this.selectedPage -= 1;
    this._fillPaginator();
  };

  _arrowRightHandler = () => {
    if (this.selectedPage) this.selectedPage += 1;
    this._fillPaginator();
  };

  _focus = (eventObj: Event) => {
    const targetElement = eventObj.target as Element;
    targetElement.classList.toggle(targetElement.classList[0] + '_focus');
  };

  _onHover = () => {
    if (this.DOMFirstPage) this.DOMFirstPage.addEventListener('mouseover', this._focus);
    if (this.DOMFirstPage) this.DOMFirstPage.addEventListener('mouseout', this._focus);
    if (this.DOMLastPage) this.DOMLastPage.addEventListener('mouseover', this._focus);
    if (this.DOMLastPage) this.DOMLastPage.addEventListener('mouseout', this._focus);
    if (this.DOMPrePages)
      this.DOMPrePages.map(element => {
        element.addEventListener('mouseover', this._focus);
        element.addEventListener('mouseout', this._focus);
      });
    if (this.DOMPostPages)
      this.DOMPostPages.map(element => {
        element.addEventListener('mouseover', this._focus);
        element.addEventListener('mouseout', this._focus);
      });
  };

  _changeInfoText = () => {
    if (this.selectedPage) this.infoText = `${1 + 12 * (this.selectedPage - 1)} - ${12 * this.selectedPage}`;
    if (this.selectedPage === this.numberPages) {
      if (this.remainderChoices === 1 && this.selectedPage) {
        this.infoText = `${12 * (this.selectedPage - 1) + this.remainderChoices}`;
      } else if (this.selectedPage && this.remainderChoices) {
        this.infoText = `${1 + 12 * (this.selectedPage - 1)} - ${
          this.remainderChoices > 0 ? 12 * (this.selectedPage - 1) + this.remainderChoices : 12 * this.selectedPage
        }`;
      }
    }
    if (this.numberOfChoices) this.infoText += ` из ${this.numberOfChoices > 100 ? '100+' : this.numberOfChoices} `;
    if (this.numberOfChoices)
      if (this.infoText && this.conjugations)
        this.infoText += this._checkConjugation(
          this.conjugations,
          this.numberOfChoices > 100 ? 100 : this.numberOfChoices,
        );
    this.infoText += ' аренды';

    if (this.DOMInfoText && this.infoText !== undefined) this.DOMInfoText.textContent = this.infoText;
  };

  _checkConjugation = (conjugations: Array<string>, numString: number) => {
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
