export default class Bids {
    constructor() {

    }

    // запрос на сервер
    async getBids() {
        try {
            const queryString = 'http://jsproject.webcademy.ru/bids';
            const responce = await fetch(queryString);
            const data = await responce.json();
            this.bids = data;
        } catch(error) {
            alert("Error with getting Bids");
            console.log(error);
        }
    }
}
