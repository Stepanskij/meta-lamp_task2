class Pie {
  outerContainerElement: Element;
  numberReviews: Array<number> | null | undefined;
  conjugations: Array<string> | null | undefined;
  textFillColors: Array<string> | null | undefined;
  fillColorPath: Array<Element> | null | undefined;
  noneColorPath: Array<Element> | null | undefined;
  markerList: Array<Element> | null | undefined;
  textList: Array<Element> | null | undefined;
  pieText1: Element | null | undefined;
  pieText2: Element | null | undefined;
  radiusNoneFill: number | null | undefined;
  nowPosition: number | null | undefined;
  arcCoordinatesNoneFill: number[][][] | null | undefined;
  arcCoordinates: number[][][] | null | undefined;
  sumReviews = 0;
  arcLengths = [0];

  constructor(
    outerContainerElement: Element,
    listValue = {
      veryGood: 0,
      good: 0,
      littleGood: 0,
      disappointment: 0,
    },
  ) {
    this.outerContainerElement = outerContainerElement;
    this.numberReviews = [listValue.veryGood, listValue.good, listValue.littleGood, listValue.disappointment];
    this.sumReviews = this.numberReviews.reduce((previousValue, item) => {
      return previousValue + item;
    }, 0);
    this.conjugations = ['голос', 'голоса', 'голосов'];
    this.textFillColors = ['rgba(255, 227, 156, 1)', '#6FCF97', '#BC9CFF', 'rgba(144, 144, 144, 1)'];

    this._initialization();
    this._setEventHandlers();
  }

  _initialization = () => {
    this.fillColorPath = [...this.outerContainerElement.querySelectorAll('.js-pie-list__path-fill-color')];
    this.noneColorPath = [...this.outerContainerElement.querySelectorAll('.js-pie-list__path-none-color')];
    this.markerList = [...this.outerContainerElement.querySelectorAll('.js-pie-list__list-marker')];
    this.textList = [...this.outerContainerElement.querySelectorAll('.js-pie-list__list-text')];
    this.pieText1 = this.outerContainerElement.querySelector('.js-pie-list__pie-text-1');
    this.pieText2 = this.outerContainerElement.querySelector('.js-pie-list__pie-text-2');

    this._drawPie();
    this._updatePieText();
  };

  _setEventHandlers = () => {
    if (this.fillColorPath)
      this.fillColorPath.map((item, index) => {
        item.addEventListener('mouseover', this.updatePie);
        if (this.textList) this.textList[index].addEventListener('mouseover', this.updatePie);
        if (this.markerList) this.markerList[index].addEventListener('mouseover', this.updatePie);
      });
    if (this.fillColorPath)
      this.fillColorPath.map((item, index) => {
        item.addEventListener('mouseout', this.updatePie);
        if (this.textList) this.textList[index].addEventListener('mouseout', this.updatePie);
        if (this.markerList) this.markerList[index].addEventListener('mouseout', this.updatePie);
      });
  };

  updatePie = (eventObj: Event) => {
    if (eventObj.type === 'mouseout') {
      this._drawPie();
      this._updatePieText();
    } else if (eventObj.type === 'mouseover') {
      this._drawPie(50, Number((eventObj.target as HTMLElement).dataset.index));
      this._updatePieText(Number((eventObj.target as HTMLElement).dataset.index));
    }
  };

  _updatePieText = (numIndex = -1) => {
    let number = 0;
    if (this.numberReviews) numIndex === -1 ? (number = this.sumReviews) : (number = this.numberReviews[numIndex]);
    if (this.conjugations) {
      let conjugate = this._checkConjugation(this.conjugations, number);
      //установка значений текста
      if (this.pieText1) this.pieText1.textContent = String(number);
      if (this.pieText2 && conjugate) this.pieText2.textContent = conjugate;
    }
    //покраска текста
    if (numIndex === -1 && this.pieText1 && this.pieText2) {
      this.pieText1.setAttribute('fill', 'rgba(31, 32, 65, 0.5);');
      this.pieText2.setAttribute('fill', 'rgba(31, 32, 65, 0.5);');
    } else if (this.pieText1 && this.pieText2 && this.textFillColors) {
      this.pieText1.setAttribute('fill', `${this.textFillColors[numIndex]}`);
      this.pieText2.setAttribute('fill', `${this.textFillColors[numIndex]}`);
    }
  };
  _drawPie = (radiusNoneFill = 56, arcIndex = -1) => {
    //вычисление длинн дуг кусков пирога
    if (this.arcLengths && this.numberReviews)
      this.arcLengths = this.numberReviews.map(item => {
        return (2 * Math.PI * item) / this.sumReviews;
      });
    //радиус незокрашенной зоны при фокусировке
    this.radiusNoneFill = radiusNoneFill;
    //вычисление координат дуг кусков пирога
    this.nowPosition = Math.PI / 2;
    this.arcCoordinates = this.arcLengths.map(arcLength => {
      let points: number[][] = [];
      if (this.nowPosition) {
        points.push(this._coordinates(60, 60, 60, arcLength < 0.025 ? 0 : this.nowPosition + 0.025));
        this.nowPosition += arcLength;
        points.push(this._coordinates(60, 60, 60, arcLength < 0.025 ? 0 : this.nowPosition - 0.025));
      }
      return points;
    });
    this.nowPosition = Math.PI / 2;
    if (this.arcLengths)
      this.arcCoordinatesNoneFill = this.arcLengths.map((item, index) => {
        let points = [];
        if (this.nowPosition && this.radiusNoneFill) {
          points.push(
            this._coordinates(60, 60, arcIndex === index ? this.radiusNoneFill : 56, this.nowPosition + 0.0001),
          );
          this.nowPosition += item;
          points.push(
            this._coordinates(60, 60, arcIndex === index ? this.radiusNoneFill : 56, this.nowPosition - 0.0001),
          );
        }
        return points;
      });
    //рисование кусков пирога
    this.arcCoordinates.map((item, index) => {
      if (this.fillColorPath) {
        this.fillColorPath[index].setAttribute('fill', `url(#Gradient${index + 1})`);
        this.fillColorPath[index].setAttribute(
          'd',
          `M60,60 L${item[0][0]},${item[0][1]} A60,60,0,${this.arcLengths[index] > Math.PI ? '1' : '0'},0,${
            item[1][0]
          },${item[1][1]}`,
        );
      }
    });
    if (this.arcCoordinatesNoneFill)
      this.arcCoordinatesNoneFill.map((item, index) => {
        if (this.noneColorPath) {
          this.noneColorPath[index].setAttribute('fill', `white`);
          this.noneColorPath[index].setAttribute(
            'd',
            `M60,60 L${item[0][0]},${item[0][1]} A${arcIndex === index ? this.radiusNoneFill : 56},${
              arcIndex === index ? this.radiusNoneFill : 56
            },0,${this.arcLengths[index] > Math.PI ? '1' : '0'},0,${item[1][0]},${item[1][1]}`,
          );
        }
      });
  };
  //поиск координаты точки на окружности с центром [cx, cy], радиусом r и длинной дуги окружности l
  _coordinates = (cx: number, cy: number, r: number, l: number) => {
    return [cx + r * Math.cos(l), 120 - (cy + r * Math.sin(l))];
  };

  _checkConjugation = (conjugations: string[], numString: number) => {
    if ((numString > 4 && numString < 20) || numString % 10 > 4 || numString % 10 === 0) {
      return conjugations[2];
    } else if (numString % 10 === 1) {
      return conjugations[0];
    } else if (numString % 10 > 1 && numString % 10 < 5) {
      return conjugations[1];
    }
  };
}

export default Pie;
