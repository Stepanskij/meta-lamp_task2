import '../../layout/layout-doc';

// Импорт стилей компонентов
import '../../../components/pie-list';
import '../../../components/reserve-room-card';
import '../../../components/advantages';
import '../../../components/bullet-list';
import '../../../components/comment';
//
import './room-details.scss';
//
import Pie from '../../../components/pie-list/pie-list';
import ReserveRoomCard from '../../../components/reserve-room-card/reserve-room-card';
//

const pieList = { veryGood: 520, good: 260, littleGood: 260, disappointment: 0 };

//

const pie = document.querySelector('.js-room-details__pie-list');
new Pie(pie as HTMLElement, pieList);

const reserveRoomCard = document.querySelector('.js-room-details__reserve-room-card');
new ReserveRoomCard({
  outerContainerElement: reserveRoomCard as HTMLElement,
  numberRoom: '888',
  classRoom: 'люкс',
  priceRoom: 9990,
  discountService: 2179,
});

export {};
