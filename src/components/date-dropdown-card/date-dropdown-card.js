import AirDatepicker from 'air-datepicker';

import arrowSVGRight from 'shared/img/data-arrow-right.svg';
import arrowSVGLeft from 'shared/img/data-arrow-left.svg';

class DateDropdownCard {
  constructor(outerContainerElement) {
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
    this.datePicker = new AirDatepicker(this.DOMCalendarContainer, {
      buttons: ['clear', this.applyButton],
      navTitles: { days: 'MMMM yyyy' },
      range: true,
      minDate: new Date(),
      onSelect: ({ date, formattedDate, datepicker }) => {
        if (formattedDate.length === 0) {
          this.DOMContainerText.textContent = 'ДД.ММ.ГГГГ';
        } else this.DOMContainerText.textContent = formattedDate.join(' - ');
      },
      nextHtml: arrowSVGRight,
      prevHtml: arrowSVGLeft,
    });
  };

  _setEventHandlers = () => {
    this.DOMContainer.addEventListener('click', this._changeOpenState);
  };

  _changeOpenState = () => {
    this.DOMCalendarContainer.classList.toggle('date-dropdown-card__calendar-container_is-opened');
    this.DOMArrow.classList.toggle('date-dropdown-card__container-arrow_is-opened');
  };
}

export default DateDropdownCard;
