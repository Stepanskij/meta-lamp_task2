import '../../layout/layout-doc';
// Импорт JS-функционала компонентов
import ChoseRoomCard from '../../../components/chose-room-card/chose-room-card';
import AccountRegistrationCard from '../../../components/account-registration-card/account-registration-card';
import ReserveRoomCard from '../../../components/reserve-room-card/reserve-room-card';
import DateDropdownCard from '../../../components/date-dropdown-card/date-dropdown-card';
import RoomShowCard from '../../../components/room-show-card/room-show-card';
// Импорт стилей компонентов
import '../../../components/chose-room-card';
import '../../../components/account-registration-card';
import '../../../components/enter-card';
import '../../../components/reserve-room-card';
import '../../../components/room-show-card';
//
import './cards.scss';

//
const choseRoomCard = document.querySelector('.js-cards__chose-room-card');
new ChoseRoomCard(choseRoomCard as HTMLElement);

const accountRegistrationCard = document.querySelector('.js-cards__account-registration-card');
new AccountRegistrationCard(accountRegistrationCard as HTMLElement);

const reserveRoomCard = document.querySelector('.js-cards__reserve-room-card');
new ReserveRoomCard({
  outerContainerElement: reserveRoomCard as HTMLElement,
  numberRoom: '888',
  classRoom: 'люкс',
  priceRoom: 9990,
  discountService: 2179,
});

const dateDropdownCard = document.querySelector('.js-cards__calendar');
new DateDropdownCard(dateDropdownCard as HTMLElement);

const roomShowCard = [...document.querySelectorAll('.js-cards__room-show-card')];
roomShowCard.map((item, index) => {
  if (index === 0)
    new RoomShowCard({
      outerContainerElement: item,
      numberRoom: 888,
      classRoom: 'люкс',
      priceRoom: 9990,
      rating: 5,
      feedbackNumber: 145,
    });
  if (index === 1)
    new RoomShowCard({
      outerContainerElement: item,
      numberRoom: 840,
      classRoom: 'люкс',
      priceRoom: 9900,
      rating: 4,
      feedbackNumber: 65,
    });
});

export {};
