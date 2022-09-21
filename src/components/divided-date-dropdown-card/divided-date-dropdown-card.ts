import AirDatepicker, { AirDatepickerButton } from 'air-datepicker';

import arrowSVGRight from 'shared/img/data-arrow-right.svg';
import arrowSVGLeft from 'shared/img/data-arrow-left.svg';

class DividedDateDropdownCard {
  outerContainerElement: Element;
  DOMContainers: Array<Element> | null | undefined;
  DOMContainersText: Array<Element> | null | undefined;
  DOMCalendarContainer: Element | null | undefined;
  DOMArrows: Array<Element> | null | undefined;
  buttonsDOMs: Array<Element> | null | undefined;
  DOMClearButton: Element | null | undefined;
  DOMApplyButton: Element | null | undefined;
  applyButton: AirDatepickerButton | null | undefined;
  datePicker: AirDatepicker | null | undefined;
  timeOfStay: number | null | undefined;

  constructor(outerContainerElement: Element) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.DOMContainers = [...this.outerContainerElement.querySelectorAll('.js-divided-date-dropdown-card__container')];
    this.DOMContainersText = [
      ...this.outerContainerElement.querySelectorAll('.js-divided-date-dropdown-card__container-text'),
    ];
    this.DOMCalendarContainer = this.outerContainerElement.querySelector(
      '.js-divided-date-dropdown-card__calendar-container',
    );
    this.DOMArrows = [
      ...this.outerContainerElement.querySelectorAll('.js-divided-date-dropdown-card__container-arrow'),
    ];

    this.applyButton = {
      content: 'Применить',
      onClick: () => {
        this._changeOpenState();
        this._getNumberOfDays();
      },
    };
    this.datePicker = new AirDatepicker(this.DOMCalendarContainer as HTMLElement, {
      buttons: ['clear', this.applyButton],
      navTitles: { days: 'MMMM yyyy' },
      range: true,
      minDate: new Date(),
      onSelect: ({ date, formattedDate, datepicker }) => {
        if (formattedDate.length === 0) {
          if (this.DOMContainersText) this.DOMContainersText[0].textContent = 'ДД.ММ.ГГГГ';
        } else if (this.DOMContainersText) this.DOMContainersText[0].textContent = formattedDate[0];
        if (formattedDate.length > 1) {
          if (this.DOMContainersText) this.DOMContainersText[1].textContent = formattedDate[1];
        } else if (this.DOMContainersText) this.DOMContainersText[1].textContent = 'ДД.ММ.ГГГГ';
      },
      nextHtml: arrowSVGRight,
      prevHtml: arrowSVGLeft,
    });

    this.buttonsDOMs = [...this.datePicker.$datepicker.querySelectorAll('.air-datepicker-button')];
    this.DOMClearButton = this.buttonsDOMs[0];
    this.DOMApplyButton = this.buttonsDOMs[1];
    this.timeOfStay = 0;
  };

  _setEventHandlers = () => {
    if (this.DOMContainers) this.DOMContainers[0].addEventListener('click', this._changeOpenState);
    if (this.DOMContainers) this.DOMContainers[1].addEventListener('click', this._changeOpenState);

    if (this.DOMClearButton) this.DOMClearButton.addEventListener('click', this._getNumberOfDays);
  };

  _changeOpenState = () => {
    if (this.DOMCalendarContainer)
      this.DOMCalendarContainer.classList.toggle('divided-date-dropdown-card__calendar-container_is-opened');
    if (this.DOMArrows) this.DOMArrows[0].classList.toggle('divided-date-dropdown-card__container-arrow_is-opened');
    if (this.DOMArrows) this.DOMArrows[1].classList.toggle('divided-date-dropdown-card__container-arrow_is-opened');
  };

  _getNumberOfDays = () => {
    if (this.datePicker && this.datePicker.selectedDates.length === 2) {
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = this.datePicker.selectedDates[1].getTime() - this.datePicker.selectedDates[0].getTime();
      const diffInDays = Math.round(diffInTime / oneDay);
      this.timeOfStay = diffInDays;
    } else this.timeOfStay = 0;
  };
}

export default DividedDateDropdownCard;
