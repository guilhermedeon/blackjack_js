class Card{
    constructor(suit,number){
        this.suit = suit;
        this.number = number;
    }
}

class Deck{
    constructor(){
        this.cards = [];
        for (let i = 1; i < 14; i++){
            this.cards.push(new Card("spades",i));
            this.cards.push(new Card("hearts",i));
            this.cards.push(new Card("clubs",i));
            this.cards.push(new Card("diamonds",i));
        }
    }

    shuffle(){
        let unshuffled = this.cards;
        this.cards = [];
        for (let i = 52; i > 0;i--){
            let rnd = Math.floor(Math.random() * (i));
            this.cards.push(unshuffled[rnd]);
            unshuffled.splice(rnd,1);
        }
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
    }

    draw(card){
        this.hand.push(card);
    }

    resetHand(){
        this.hand = [];
    }

    getScore(){
        let sum = 0;
        for (let i in this.hand){
            sum += this.hand[i];
        }
    }
}

class Game{
    constructor(playerName){
        this.deck = new Deck();
        this.deck.shuffle();
        this.house = new Player("House");
        this.player = new Player(playerName);
    }

    check(){
    }
}


let g = new Game();
