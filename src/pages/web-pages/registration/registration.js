import '../../layout/layout-doc.js';

// Импорт стилей компонентов
import '../../../components/account-registration-card';
//
import './registration.scss';

// Импорт JS-функционала компонентов
import AccountRegistrationCard from '../../../components/account-registration-card/account-registration-card.js';

//

const accountRegistrationCard = document.querySelector('.js-registration__account-registration-card');
new AccountRegistrationCard(accountRegistrationCard);
