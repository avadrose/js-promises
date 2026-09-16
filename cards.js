let deckURL = "https://deckofcardsapi.com/api/deck";

$.getJSON(`${deckURL}/new/draw/?count=1`).then(data => {
  let card = data.cards[0];
  console.log(`${card.value} of ${card.suit}`);
});

let deckId;
let firstCard;

$.getJSON(`${deckURL}/new/draw/?count=1`)
  .then(data => {
    deckId = data.deck_id;
    firstCard = data.cards[0];

    return $.getJSON(`${deckURL}/${deckId}/draw/?count=1`);
  })
  .then(data => {
    let secondCard = data.cards[0];

    console.log(
      `${firstCard.value} of ${firstCard.suit}`
    );

    console.log(
      `${secondCard.value} of ${secondCard.suit}`
    );
  });

  let currentDeckId;

// Create a new shuffled deck when the page loads
$.getJSON(`${deckURL}/new/shuffle/?deck_count=1`).then(data => {
  currentDeckId = data.deck_id;
});

// Draw a card when the button is clicked
$("#draw-card").on("click", function () {
  $.getJSON(`${deckURL}/${currentDeckId}/draw/?count=1`).then(data => {
    let card = data.cards[0];

    $("#card-area").append(
      `<img src="${card.image}" alt="${card.value} of ${card.suit}">`
    );

    if (data.remaining === 0) {
      $("#draw-card").prop("disabled", true);
    }
  });
});