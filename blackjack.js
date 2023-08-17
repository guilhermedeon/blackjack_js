class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    for (let i = 1; i < 14; i++) {
      this.cards.push(new Card("spades", i));
      this.cards.push(new Card("hearts", i));
      this.cards.push(new Card("clubs", i));
      this.cards.push(new Card("diamonds", i));
    }
  }

  shuffle() {
    let unshuffled = this.cards;
    this.cards = [];
    for (let i = 52; i > 0; i--) {
      let rnd = Math.floor(Math.random() * i);
      this.cards.push(unshuffled[rnd]);
      unshuffled.splice(rnd, 1);
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
    this.handPoints = 0;
  }

  draw(card) {
    this.hand.push(card);
    this.getHandPoints();
    console.log(this);
  }

  resetHand() {
    this.hand = [];
    this.handPoints = 0;
  }

  getHandPoints() {
    let sum = 0;
    for (let i in this.hand) {
      sum += this.hand[i].number;
    }
    this.handPoints = sum;
    return sum;
  }
}

class Game {
  constructor(playerName) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.house = new Player("House");
    this.player = new Player(playerName);
  }

  check() {
    if (this.player.getHandPoints() > 21) {
      console.log("Player Over 21");
      this.house.score++;
      this.resetHands();
      this.printScores();
      console.log("\n");
      return true;
    } else if (this.player.getHandPoints() == 21) {
      console.log("Player BlackJack!");
      this.player.score++;
      this.resetHands();
      this.printScores();
      console.log("\n");
      return true;
    }
    if (this.house.getHandPoints() > 21) {
      console.log("House Over 21");
      this.player.score++;
      this.resetHands();
      this.printScores();
      console.log("\n");
      return true;
    } else if (this.house.getHandPoints() == 21) {
      console.log("House BlackJack!");
      this.house.score++;
      this.resetHands();
      this.printScores();
      console.log("\n");
      return true;
    }
    return false;
  }

  printScores(){
    console.log("Player Score: " + this.player.score);
    console.log("House Score: " + this.house.score);
  }

  retreat() {
    let opt = false;
    while (this.house.getHandPoints() <= this.player.getHandPoints()){
        let c = this.deck.cards.pop();
        this.house.draw(c);
        let opt = this.check()
        if (opt){
            return;
        }
    }
    if (opt){
        return;
    }
    let playerDiff = 21 - this.player.getHandPoints();
    let houseDiff = 21 - this.house.getHandPoints();
    if (playerDiff < houseDiff) {
      console.log("Retreat, player wins with " + this.player.getHandPoints());
      this.player.score++;
      this.resetHands();
      this.printScores();
      console.log("\n");
    } else {
      console.log("Retreat, house wins with " + this.house.getHandPoints());
      this.house.score++;
      this.resetHands();
      this.printScores();
      console.log("\n");
    }
  }

  draw() {
    let c = this.deck.cards.pop();
    this.player.draw(c);
    let opt = this.check();
    if (this.player.getHandPoints() < this.house.getHandPoints()){
      console.log(this.house);
    }
    if (!opt && this.player.getHandPoints() > this.house.getHandPoints()) {
      c = this.deck.cards.pop();
      this.house.draw(c);
      this.check();
    }
  }

  resetHands() {
    this.player.resetHand();
    this.house.resetHand();
  }
}

finalPlayerScore = 0;
finalHouseScore = 0;
games = 1000;

for (let i = 0; i < games; i++) {
  let g = new Game("g");
  console.log(g.deck.cards);
  console.log("\n");
  while (g.deck.cards.length > 6) {
    g.draw();
    console.log("\n");
    if (g.player.getHandPoints() >= 16) {
      g.retreat();
    }
  }
  console.log("End:");
  console.log("Player score: " + g.player.score);
  console.log("House score: " + g.house.score);
  finalPlayerScore += g.player.score;
  finalHouseScore += g.house.score;
}

console.log("\n");
console.log("Media player: " + finalPlayerScore / games);
console.log("Media house: " + finalHouseScore / games);
