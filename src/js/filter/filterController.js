import Filter from './filterModele';
import * as view from './filterView';

export default async function(state) {

    // создаем объект filter на основе класса Filter (но только если state пустой)
    if (!state.filter) state.filter = new Filter();
    
    // получаем параметры фильтра с сервера
    await state.filter.getParams();

    // отрисовываем фильтр (запускается после отработки выше await)
    view.render(state.filter.params);

    // получаем данные с сервера (для отображение фильтра по умолчанию)
    await state.filter.getResults();
    state.results = state.filter.result;

    // отображаем количество объектов на кнопке
    view.changeButtonText(state.filter.result.length);

    // прослушка изменений формы
    const form = document.querySelector('#filter-form');

    form.addEventListener('change', async function(e) {
        e.preventDefault();
        // получаем строку с данными из формы
        state.filter.query = view.getInput();
        // console.log(state.filter.query)
        // запрашиваем данные по параметрам из формы
        await state.filter.getResults();
        //записываем результаты в state
        state.results = state.filter.result;
        // обновляем текст кнопки
        view.changeButtonText(state.filter.result.length);
    })

    // прослушка сброса формы
    form.addEventListener('reset', async function() {
        state.filter.query = '';
        // console.log(state.results);
        await state.filter.getResults();
        state.results = state.filter.result;
        // console.log(state.results);
        view.changeButtonText(state.filter.result.length);

        // генерируем событие
        state.emitter.emit('event:clear-listing', {})
    })

    // отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Submit");
        // генерируем событие
        state.emitter.emit('event:render-listing', {})
    })
}
