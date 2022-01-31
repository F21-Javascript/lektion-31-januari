/**
 * TODO
 * 
 * 1. När jag klickar på ett kort så spara detta kort
 * 2. När jag har klickat på två kort så jämför dessa:
 *      a. Om korten har samma värde, öka antal till ett på hittade kort
 *      b. Om inte samma värde, flippa korten tillbaka.
 * 3. Om vi har 8 hittade kort, visa "Du vann" för användaren.
 */

const memoryCards = document.querySelectorAll('.memory-card');
console.log(memoryCards);
let pickedCards = [];
let foundPairs = 0;

function flipBackCards() {
    setTimeout(() => {
        console.log('DÅÅÅ!!');
        pickedCards[0].classList.toggle('flip');
        pickedCards[1].classList.toggle('flip');
        resetCards();
    }, 1000); // Vänta 1 sekund och kör sedan den medskickade funktionen
    console.log('HEJ!!'); // setTimeout stoppar inte exekvering av koden under så den kommer att köras
    // när det gått 1 sekund så körs funktionen i setTimeout
}

function hasWon() {
    /** Logik
     * Om foundPairs är lika med 8 så visa att användaren har vunnit
     */
    if (foundPairs == 8) {
        document.querySelector('.overlay').classList.toggle('show');
    }
}

function resetCards() {
    pickedCards = [];
}

function compareCards() {
    /** Logik
     * a. Om korten har samma värde, öka antal till ett på hittade kort
     * b. Om inte samma värde, flippa korten tillbaka.
    */
    console.log(pickedCards);
    console.log(pickedCards[0].getAttribute('data-card'));
    const cardOne = pickedCards[0].getAttribute('data-card');
    const cardTwo = pickedCards[1].getAttribute('data-card');

    if (cardOne == cardTwo) {
        foundPairs++;
        resetCards();
        hasWon();
    } else {
        flipBackCards();
    }
}

function addCard(card) {
    // Lägger till vårt kort-element i vår array pickedCards
    pickedCards.push(card);

    // Om pickedCards har två kort i sig så jämför dessa
    if (pickedCards.length == 2) {
        compareCards();
    }
}

function shuffle() {
    for(let i = 0; i < memoryCards.length; i++) {
        const position = Math.floor(Math.random() * memoryCards.length);
        memoryCards[i].style.order = position;
    }
}

for(let i = 0; i < memoryCards.length; i++) {
    // Event är en lokal variabel som fylls med ett värde av funktionen addEventListener,
    // värdet blir det element som vi klickade på
    memoryCards[i].addEventListener('click', (event) => {
        console.log('Event: ', event);
        console.log(memoryCards[i]);

        console.log(event.target.classList);

        if (pickedCards.length < 2 && event.target.classList.contains('memory-card')) {
            event.target.classList.toggle('flip');
            addCard(event.target);
        }
    });
}

shuffle();