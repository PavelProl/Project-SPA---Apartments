export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }

    async getFavs() {
        try {
            const ids = this.favsList.toString(); // массив -> строка
            const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`; // запрос на сервер по нескольким объектам в избранном
            const result = await fetch(queryString);
            // const data = await result.json();
            // this.cards = data;
            this.cards = await result.json();
        } catch(error) {
            alert(error);
        }
    }
}