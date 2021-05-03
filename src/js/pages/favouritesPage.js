import favouritesCards from "./../favouritesCards/favouritesCardsController";

export default function(state) {
    document.querySelector("#app").innerHTML = "";
    favouritesCards(state);
}