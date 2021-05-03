import * as view from './listingView';

export default function(state) {
    // console.log("start listing");

    // рендер контейнера для карточек
    view.render();

    // рендер карточек по умолчанию
    state.results.forEach(function(item) {
        view.renderCard(item, state.favourites.isFav(item.id));
    })

    // запускаем прослушку клика на иконки "добавить в избранное"
    addToFavsListener();

    // подписка на событие: рендер карточек по фильтру
    state.emitter.subscribe('event:render-listing', ()=>{
        // console.log("listing started!");
        // console.log(state.results);
        
        // очищаем контейнер с карточками
        view.clearListingContainer();

        // рендер карточек по фильтру
        state.results.forEach(function(item) {
            view.renderCard(item, state.favourites.isFav(item.id));
        });

        // запускаем прослушку клика на иконки "добавить в избранное"
        addToFavsListener();
    });

    // подписка на событие: рендер карточек по умолчанию при сбросе формы
    state.emitter.subscribe('event:clear-listing', ()=>{
        // console.log(state.results);

        // очищаем контейнер с карточками
        view.clearListingContainer();

        // рендер карточек по умолчанию
        state.results.forEach(function(item) {
            view.renderCard(item);
        });
    });

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