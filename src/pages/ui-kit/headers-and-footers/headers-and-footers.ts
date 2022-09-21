import '../../layout/layout-doc';
// Импорт JS-функционала компонентов
import Header from '../../../components/header/header';
// Импорт стилей компонентов
import '../../../components/header';
import '../../../components/footer';
//
import './headers-and-footers.scss';

//
const header1 = document.querySelector('.js-headers-and-footers__header-none-registration');
new Header(header1 as HTMLElement);
const header2 = document.querySelector('.js-headers-and-footers__header-is-registration');
new Header(header2 as HTMLElement);

export {};
