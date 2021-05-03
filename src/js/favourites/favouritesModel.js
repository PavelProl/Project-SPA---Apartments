export default class Favourites {

    constructor () {
        // this.favs = []; вариант заменили
        this.favs = this.readStorage(); // обновляем l.s. при перезагрузке
    }

    // добавляем id объекта в массив favs
    addFav(id) {
        this.favs.push(id);
        this.saveData(); // сохранение в localStorage
    }

    // удаляем id объекта из массива favs
    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
        this.saveData(); // сохранение в localStorage
    }

    // в избранном или нет?
    isFav(id) {
        // return this.favs.indexOf(id) !== -1 ? true : false; замена в коде ниже
        return this.favs.indexOf(id) !== -1;
    }

    // добавление / удаление из массива избранного
    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }

    // сохранение в localStorage
    saveData() {
        localStorage.setItem("favs", JSON.stringify(this.favs));
    }

    // обновляем localStorage при обновлении страницы
    readStorage() {
        /* заменяем кодом ниже
        const storage = JSON.parse(localStorage.getItem("favs"));
        if (storage) this.favs = storage; // если в storage что-то есть, то записываем в this.favs
        */
       return JSON.parse(localStorage.getItem("favs")) || [];
    }
}