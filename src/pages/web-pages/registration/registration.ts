import '../../layout/layout-doc';

// Импорт стилей компонентов
import '../../../components/account-registration-card';
//
import './registration.scss';

// Импорт JS-функционала компонентов
import AccountRegistrationCard from '../../../components/account-registration-card/account-registration-card';

//

const accountRegistrationCard = document.querySelector('.js-registration__account-registration-card');
new AccountRegistrationCard(accountRegistrationCard as HTMLElement);

export {};
