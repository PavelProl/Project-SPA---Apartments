import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel';

// Routes (маршруты приложения и компоненты, которые рендерят нужную страницу под нужный маршрут)
const routes = {
    '/': homePage,
    'item': singleItem,
    'favourites': favouritesPage,
    'bids': bidsPage
}

const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites()
};

// только для тестирования! После - удалить!
window.state = state;

// Находим компонент относительно маршрута
function findComponentByPath(path, routes) {
    return routes[path];
}

// Роутер (понимаем, по какому адресу зашли, и находим компонент из routes, чтобы запустить)
function router() {
    // разбиваем путь в массив
    const pathArray = location.hash.split('/');

    // устанавливаем текущий путь
    const currentPath = pathArray[0] && pathArray[1] ? pathArray[1] : '/';

    // save routes params (в state попадают id карточек: проверка - вызываем в консоли state)
    state.routeParams = pathArray[2] ? pathArray[2] : '';

    // Выбираем компонент для указанного адреса, либо компонент с ошибкой
    const component = findComponentByPath(currentPath, routes) || errorPage;
    // const {component = errorPage} = findComponentByPath(currentPath, routes) || {};

    // запускаем компонент
    component(state);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
