import '../../layout/layout-doc.js';

// Импорт стилей компонентов
import '../../../components/pie-list';
//
import './room-details.scss';

//

import Pie from '../../../components/pie-list/pie-list.js';

//

const pieList1 = { veryGood: 520, good: 260, littleGood: 260, disappointment: 0 };

//

const pie = document.querySelector('.js-room-details__pie-list');
new Pie(pie, pieList1);
