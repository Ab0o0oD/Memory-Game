require("../styles/index.scss");

/*
 * How the image-server works:
 * use http://localhost:8111/png/<name>/<size> to generate an image
 * name can be anything as an image will be generated, identical "name" gives identical images
 * size is a number that makes the server return an image of <size>x<size> pixels.
 */
const serverPath = "http://localhost:8111/png/"; // This is the url to the image-server that will run in the background
const cardSize = 200; // The size of each card
const cardBackImgPath = serverPath + "something_random/" + cardSize; // The url to the image used for the back of the cards


// Game class keeps track of game-state and user input
class Game {
    /**
     * Constructor: Assigns root-element and initialises the game
     * @param {*} gameContainer The root element that we use to render the game on
     * @param navigation
     */
    constructor(gameContainer, navigation) {
        this.gameContainer = gameContainer; // Sets the class-variable this.gamecontainer
        this.navigation = navigation
        this.size = 10; // The number of cards/cards to generate.
        this.remainingCards = this.size; // Number of cards that has not yet been paired.
        this.firstFlippedCard = null; // Variable that will be used to point to the first card flipped in order to be able to compare it to the second.
        this.generateGameboard(); // Calls generateGameboard
        this.points = 0;
    }

    generateButton(classname, text) {
        let button = document.createElement('button')
        button.className = classname
        button.innerHTML = text;
        return button
    }

    /**
     * Generates the "cards" and and adds them to the gameContainer
     */
    generateGameboard() {
        let cards = [];

        // Generate size/2 pair of cards in order to get the required number of cards.
        for (let i = 0; i < this.size / 2; i++) {
            // Each pair is created with "i" as name to make them unique.
            cards.push(new Card(i, this.cardClicked, 'whatever' + i));
            cards.push(new Card(i, this.cardClicked, 'whatever' + i));
        }

        // TODO 4: Shuffle the cards-array here to randomise the order
        let currentIndex = cards.length, randomIndex;

        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            let temp = cards[currentIndex]
            cards[currentIndex] = cards[randomIndex]
            cards[randomIndex] = temp
        }

        // New game button
        let newGameBtn = this.generateButton('new-game-btn btn', 'Start New Game')
        newGameBtn.onclick = (e) => {
            location.reload();
        }

        // Hint button
        let hintBtn = this.generateButton('btn', 'Get Hint')
        hintBtn.onclick = () => {
            for (let i = 0; i < cards.length; i++) {
                cards[i].flip()
            }
            setTimeout(() => {
                for (let i = 0; i < cards.length; i++) {
                    cards[i].flip()
                }
            }, 800)
        }

        // Points counter :
        let pointContainer = document.createElement('div');
        pointContainer.className = 'point-container'
        let pointText = document.createElement('p');
        pointText.id = 'point-text'
        pointText.innerHTML = `Your points:  0`

        pointContainer.appendChild(pointText)

        // Append buttons and point counter to navigation bar
        this.navigation.appendChild(newGameBtn);
        this.navigation.appendChild(hintBtn);
        this.navigation.appendChild(pointContainer);

        for (const card of cards) {
            this.gameContainer.appendChild(card.element);
        }
    }

    /**
     * Function that should be triggered when a card is clicked. It calls the "flip()" function on the card to make it turn around.
     * @param {Card} clickedCard the card object that was clicked
     */
    cardClicked = (clickedCard) => {
        clickedCard.flip(); // Flip card when clicked
        // If we already have a firstFlippedCard it means this is the second card we flip
        if (this.firstFlippedCard) {
            // if names are equals then we have a match
            if (clickedCard.name === this.firstFlippedCard.name) {

                // update remainings not matched card
                this.remainingCards -= 2
                this.points++
                // disable pointer-events to avoid clicking matched cards
                clickedCard.element.classList.add("matched")
                this.firstFlippedCard.element.classList.add("matched")
            } else {
                setTimeout(() => {
                    this.firstFlippedCard.flip()
                    clickedCard.flip()
                }, 500)
            }

            setTimeout(() => {
                this.firstFlippedCard = null; // Reset variable
            }, 700)
            // TODO 3: If they did not match they should flip back, otherwise they should stay open.

        } else {
            this.firstFlippedCard = clickedCard; // If this was the first card flipped then assign it to firstFlippedCard

        }
        // Show winner alert
        if (this.remainingCards === 0) {
            alert('Hurray, You won ^_^')
        }
        // Update points
        document.getElementById('point-text').innerHTML = `Your points:  ${this.points}`
    };
}

class Card {
    /**
     * Creates a card with all the elements needed to render, and utility functions like "flip" for turning it around.
     * @param {number|string} name This Card's name. 2 and 2 cards should share names in order to make them identical pairs.
     * @param {function (Card): void} cardClickFunction click-function that should be triggered when a card is clicked
     * @param imgPath
     */
    constructor(name, cardClickFunction, imgPath) {
        this.name = name; // Name
        this.isFlipped = false; // If isFlipped is "true" it means that the front of the card is facing up.
        this.imgPath = serverPath + imgPath + "/" + cardSize; // Path to the frontpage-image that should be used
        this.element = this._generateCardDom(); // this.element contains the root HTMLElement for this card.
        this.cardClickFunction = cardClickFunction; // click-function that is passed from the Game-class
    }

    /**
     * Should create all HTML-elements needed for a card including front & backside + click-event
     */
    _generateCardDom() {
        let cardDiv = this._generateCardSizeDivElement("card"); //
        let container = document.createElement("div");
        container.className = "container";

        // Generate backside of the card
        let backDiv = this._generateCardSizeDivElement("back"); // Create backside div with class "back" to make it visible by default
        let backImg = document.createElement("img"); // Create image element that will hold the backside image
        backImg.src = cardBackImgPath; // set the image.src to the backsideImg path and add cardSize to get the right size
        backDiv.appendChild(backImg); // Adds the backside image to the back-side div
        container.appendChild(backDiv); // Add the backside div to the card root element.

        // Generate frontside of the card
        let frontDiv = this._generateCardSizeDivElement("front"); // Create front-side div with class "front" to make it hidden by default
        // TODO 1: create remaining elements for frontside similar to how backside is created above
        let frontImg = document.createElement('img');
        frontImg.src = this.imgPath;
        frontDiv.appendChild(frontImg)
        container.appendChild(frontDiv)

        let text = document.createElement('p')
        text.className = 'card-number'
        text.innerHTML = this.name
        frontDiv.appendChild(text)

        // Add click-event.
        cardDiv.onclick = (event) => {
            // Click event that triggers when the card is clicked
            // TODO 2: call this.cardClickFunction here with correct parameters
            this.cardClickFunction(this)
        };
        cardDiv.appendChild(container);
        return cardDiv;
    }

    /**
     * Creates a div-element with the provided className as class
     */
    _generateCardSizeDivElement(className) {
        let sizedCardDiv = document.createElement("div");
        sizedCardDiv.className = className;
        sizedCardDiv.tabIndex = 0;
        return sizedCardDiv;
    }

    /**
     * Turns this card around by toggling "flip" class on the cards root-element
     */
    flip() {
        this.isFlipped = !this.isFlipped;
        this.element.classList.toggle("flip");
    }
}

window.onload = function () {
    // Wait until window is loaded, then fetch the gameContainer div
    const navigation = document.getElementById("navigation");
    const gameContainer = document.getElementById("gameContainer");
    new Game(gameContainer, navigation); // Create a new instance of Game class and pass the gameContainer element.
};
