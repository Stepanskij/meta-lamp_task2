import './layout-doc.scss';
import './layout-ui-kit.scss';
import './layout-web-pages.scss';
// Импорт стилей компонентов
import '../../components/button';
//
import Header from '../../components/header/header.js';
//
const header = document.querySelector('.js-layout__header');
new Header(header);