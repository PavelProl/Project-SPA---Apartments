import * as view from "./bidsView.js";
import Bids from "./bidsModel.js";

export default async function(state) {
    // console.log("Bids");

    // создаем объект модели для работы с заявками
    if (!state.bids) state.bids = new Bids();
    
    // получаем данные заявок с сервера
    await state.bids.getBids();
    // console.log(state.bids.bids);

    // отображаем заявки на странице
    view.renderBids(state.bids.bids);
    // console.log(state.bids.bids);
}
