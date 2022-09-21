import AirDatepicker, { AirDatepickerButton, AirDatepickerOptions } from 'air-datepicker';

import arrowSVGRight from 'shared/img/data-arrow-right.svg';
import arrowSVGLeft from 'shared/img/data-arrow-left.svg';

class DateDropdownCard {
  outerContainerElement: Element;
  DOMContainer: Element | null | undefined;
  DOMContainerText: Element | null | undefined;
  DOMCalendarContainer: Element | null | undefined;
  DOMArrow: Element | null | undefined;
  applyButton: AirDatepickerButton | null | undefined;
  datePicker: AirDatepicker | null | undefined;

  constructor(outerContainerElement: HTMLElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.DOMContainer = this.outerContainerElement.querySelector('.js-date-dropdown-card__container');
    this.DOMContainerText = this.outerContainerElement.querySelector('.js-date-dropdown-card__container-text');
    this.DOMCalendarContainer = this.outerContainerElement.querySelector('.js-date-dropdown-card__calendar-container');
    this.DOMArrow = this.outerContainerElement.querySelector('.js-date-dropdown-card__container-arrow');

    this.applyButton = {
      content: 'Применить',
      onClick: () => {
        this._changeOpenState();
      },
    };
    this.datePicker = new AirDatepicker(this.DOMCalendarContainer as HTMLElement, {
      buttons: ['clear', this.applyButton],
      navTitles: { days: 'MMMM yyyy' },
      range: true,
      minDate: new Date(),
      onSelect: ({ date, formattedDate, datepicker }) => {
        if (formattedDate.length === 0) {
          if (this.DOMContainerText) this.DOMContainerText.textContent = 'ДД.ММ.ГГГГ';
        } else if (this.DOMContainerText && typeof formattedDate !== 'string')
          this.DOMContainerText.textContent = formattedDate.join(' - ');
      },
      nextHtml: arrowSVGRight,
      prevHtml: arrowSVGLeft,
    });

    let test: AirDatepickerOptions;
  };

  _setEventHandlers = () => {
    if (this.DOMContainer) this.DOMContainer.addEventListener('click', this._changeOpenState);
  };

  _changeOpenState = () => {
    if (this.DOMCalendarContainer)
      this.DOMCalendarContainer.classList.toggle('date-dropdown-card__calendar-container_is-opened');
    if (this.DOMArrow) this.DOMArrow.classList.toggle('date-dropdown-card__container-arrow_is-opened');
  };
}

export default DateDropdownCard;
