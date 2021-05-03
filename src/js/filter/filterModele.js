export default class Filter {
    constructor() {
        this.query = '';
    }

    // метод делает запрос на сервер, получает данные для фильтра и записывает их в объект filter (в свойство params)
    async getParams() {
        try {
            const queryString = 'http://jsproject.webcademy.ru/itemsinfo';
            const response = await fetch(queryString);
            // const data = await response.json();
            // this.params = await data;
            this.params = await response.json();
            // console.log(this.params);
        } catch(error) {
            alert(error);
        }
    }

    // метод для запроса и получения данных с сервера с записью в свойство result объекта filter
    async getResults() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`;
            const response = await fetch(queryString);
            // const data = await response.json();
            // this.result = await data;
            this.result = await response.json();
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}
