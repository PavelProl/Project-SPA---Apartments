import singleItem from "./../singleItem/singleItemController";

export default function(state) {

    // очищаем контейнер приложения
    document.querySelector('#app').innerHTML = "";

    // запускаем компонент singleItem
    singleItem(state);
}