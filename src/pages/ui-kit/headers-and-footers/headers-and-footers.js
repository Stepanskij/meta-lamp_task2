import '../../layout/layout-doc.js';
// Импорт JS-функционала компонентов
import Header from '../../../components/header/header.js';
// Импорт стилей компонентов
import '../../../components/header';
import '../../../components/footer';
//
import './headers-and-footers.scss';

//
const header1 = document.querySelector('.js-headers-and-footers__header-none-registration');
new Header(header1);
const header2 = document.querySelector('.js-headers-and-footers__header-is-registration');
new Header(header2);
