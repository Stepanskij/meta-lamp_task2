import '../../layout/layout-doc.js';

// Импорт стилей компонентов
import '../../../components/chose-room-card';
//
import './landing-page.scss';

// Импорт JS-функционала компонентов
import ChoseRoomCard from '../../../components/chose-room-card/chose-room-card.js';

//

const choseRoomCard = document.querySelector('.js-landing-page__chose-room-card');
new ChoseRoomCard(choseRoomCard);
