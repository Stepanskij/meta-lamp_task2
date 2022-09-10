import AirDatepicker from 'air-datepicker';

import arrowSVGRight from 'shared/img/data-arrow-right.svg';
import arrowSVGLeft from 'shared/img/data-arrow-left.svg';

class DividedDateDropdownCard {
  constructor(outerContainerElement) {
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
      className: 'js-apply-button',
      content: 'Применить',
      onClick: () => {
        this._changeOpenState();
        this._getNumberOfDays();
      },
    };
    this.datePicker = new AirDatepicker(this.DOMCalendarContainer, {
      buttons: ['clear', this.applyButton],
      navTitles: { days: 'MMMM yyyy' },
      range: true,
      minDate: new Date(),
      onSelect: ({ date, formattedDate, datepicker }) => {
        if (formattedDate.length === 0) {
          this.DOMContainersText[0].textContent = 'ДД.ММ.ГГГГ';
        } else this.DOMContainersText[0].textContent = formattedDate[0];
        if (formattedDate.length > 1) {
          this.DOMContainersText[1].textContent = formattedDate[1];
        } else this.DOMContainersText[1].textContent = 'ДД.ММ.ГГГГ';
      },
      nextHtml: arrowSVGRight,
      prevHtml: arrowSVGLeft,
    });

    this.timeOfStay = 0;
  };

  _setEventHandlers = () => {
    this.DOMContainers[0].addEventListener('click', this._changeOpenState);
    this.DOMContainers[1].addEventListener('click', this._changeOpenState);
  };

  _changeOpenState = () => {
    this.DOMCalendarContainer.classList.toggle('divided-date-dropdown-card__calendar-container_is-opened');
    this.DOMArrows[0].classList.toggle('divided-date-dropdown-card__container-arrow_is-opened');
    this.DOMArrows[1].classList.toggle('divided-date-dropdown-card__container-arrow_is-opened');
  };

  _getNumberOfDays = () => {
    if (this.datePicker.selectedDates.length === 2) {
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = this.datePicker.selectedDates[1].getTime() - this.datePicker.selectedDates[0].getTime();
      const diffInDays = Math.round(diffInTime / oneDay);
      this.timeOfStay = diffInDays;
    } else this.timeOfStay = 0;
  };
}

export default DividedDateDropdownCard;
