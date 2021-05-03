import SingleItem from "./singleItemModele.js";
import * as view from "./singleItemView.js"

export default async function(state) {
    // console.log("single Item controller started!");

    // создаем singleItem с записью в state, в параметры передаем id
    state.singleItem = new SingleItem(state.routeParams);

    // получаем данные с сервера с учетом id объекта
    await state.singleItem.getItem();

    // рендер разметки для отдельного объекта (вторым аргументом передаем состояние true или false - в избранном или нет)
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // ------- Прослушка событий модального окна -------

    // открытие модального окна
    document.querySelector('.button-order').addEventListener("click", () => {
        view.showModal();
    });

    // скрытие модального окна - клик по кнопке "закрыть"
    document.querySelector(".modal__close").addEventListener("click", () => {
        view.hideModal();
    });

    // скрытие модального окна - клик по остальной странице
    document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
        e.target.closest(".modal") ? null : view.hideModal();
    });

    // отправка формы
    document.querySelector(".modal__form").addEventListener("submit", async function(e) {
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);

        // показ ошибок или сообщения об успехе
        if (state.singleItem.result.message === "Bid Created") {
            alert("Ваша заявка отправлена успешно!");
            view.clearForm(); // очищаем форму
            view.hideModal(); // скрываем модальное окно
        } else if (state.singleItem.result.message === "Bid Not Created") {
            state.singleItem.result.errors.forEach((item) => {
                alert(item);
            });
        }
    });
    // ------- // Прослушка событий модального окна -------

    // клик по кнопке "Добавить в избранное"
    document.querySelector("#addToFavouriteBtn").addEventListener("click", () => {
        // console.log("click fav")

        // добавляем id объекта в массив favs
        state.favourites.toggleFav(state.singleItem.id);

        // переключатель состояния избранного
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    })
}
