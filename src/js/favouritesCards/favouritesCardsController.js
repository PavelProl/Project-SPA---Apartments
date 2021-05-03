import FavouritesCards from "./favouritesCardsModel";
import * as view from "./favouritesCardsView";

export default async function(state) {
    
    // получаем список объектов в избранном
    const favsList = state.favourites.favs;

    // получение данных с сервера
    // объект на основе класса FavouritesCards
    const favouritesCards = new FavouritesCards(favsList);
    await favouritesCards.getFavs();

    // отображаем контейнер и карточки
    if (favouritesCards.cards) view.renderPage(favouritesCards.cards);

    addToFavsListener();
    
    // функция для работы иконок "добавить в избранное"
    function addToFavsListener() {

        // обходим коллекцию иконок избранного через forEach и к каждой добавляем прослушку клика
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                // console.log("fav clicked!")

                // получаеим id карточки, по которой кликнули
                const currentId = e.target.closest(".card").dataset.id;
                // console.log(currentId);

                // добавление / удаление элемента из массива избранного
                state.favourites.toggleFav(currentId);

                // запускаем переключатель состояния избранного (включаем/выключаем иконку)
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            })
        });
    }
}