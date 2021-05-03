import bids from "./../bids/bidsController.js";

export default function(state) {
    // очищаем контейнер
    document.querySelector("#app").innerHTML = "";

    // запускаем компонент bids
    bids(state);
}