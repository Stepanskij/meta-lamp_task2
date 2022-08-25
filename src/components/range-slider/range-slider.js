import 'ion-rangeslider';
import $ from 'jquery';

class RangeSlider {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this.sliderOptions = {
      type: 'double',
      max: 15000,
      min: 1000,
      from: 5000,
      to: 10000,
      step: 100,
      hide_from_to: true,
      hide_min_max: true,
      onStart: data => {
        this.DOMTitleValue.textContent = data.from + '₽' + ' - ' + data.to + '₽';
      },
      onChange: data => {
        this.DOMTitleValue.textContent = data.from + '₽' + ' - ' + data.to + '₽';
      },
    };
    this._initialization();
  }

  _initialization = () => {
    this.DOMTitleValue = this.outerContainerElement.querySelector('.js-range-slider__title-values');

    $('.js-range-slider__input').ionRangeSlider(this.sliderOptions);
  };
}

export default RangeSlider;
