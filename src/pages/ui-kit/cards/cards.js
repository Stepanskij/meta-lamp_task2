import '../../layout/layout-doc.js';
// Импорт JS-функционала компонентов
import ChoseRoomCard from '../../../components/chose-room-card/chose-room-card.js';
import AccountRegistrationCard from '../../../components/account-registration-card/account-registration-card.js';
import ReserveRoomCard from '../../../components/reserve-room-card/reserve-room-card.js';
import DateDropdownCard from '../../../components/date-dropdown-card/date-dropdown-card.js';
import RoomShowCard from '../../../components/room-show-card/room-show-card.js';
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
new ChoseRoomCard(choseRoomCard);

const accountRegistrationCard = document.querySelector('.js-cards__account-registration-card');
new AccountRegistrationCard(accountRegistrationCard);

const reserveRoomCard = document.querySelector('.js-cards__reserve-room-card');
new ReserveRoomCard({
  outerContainerElement: reserveRoomCard,
  numberRoom: '888',
  classRoom: 'люкс',
  priceRoom: 9990,
  discountService: 2179,
});

const dateDropdownCard = document.querySelector('.js-cards__calendar');
new DateDropdownCard(dateDropdownCard);

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
