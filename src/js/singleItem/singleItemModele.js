export default class SingleItem {
    constructor(id) {
        this.id = id;
    }

    // получаем данные: делаем запрос на сервер с учетом id
    async getItem() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items/${this.id}`;
            const responce = await fetch(queryString);
            const data = await responce.json();
            this.result = data;
        } catch(error) {
            alert(error);
        }
    }

    // POST запрос на сервер с данными из заявки
    async submitForm(formData) {
        const queryString = "http://jsproject.webcademy.ru/bidnew";
        const responce = await fetch(queryString, {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            // преобразование в json отправляемых данных
            body: JSON.stringify(formData)
        });
        const data = await responce.json();
        this.result = data;
        console.log(this.result);
    }
}
