// === General Rules ==== //

// Two players: player and computer
// Computer will be the dealer
// Both player and computer get 2 cards to start with
// Player goes first to decide if they want to hit (draw another card) OR stand (end the turn)
// Dealer has to hit (take card) if their hands is below 17
// Each players' score is the sum of their card ranks (J/Q/K = 10; Aces can be 1 or 11)
// The player who is closer to but not above 21 wins

// === Steps to do === //
// 1. Shuffle the cards
// 2. Player get 2 cards first, follow by computer get 2 cards
// 3. Player choose either to hit OR stand
//    -- 3.a If hit, take one more card and back to point 3
//    -- 3.b If stand, switch to allow computer choose hit OR stand
//    -- 3.c.i computer will hit automatically if their card is less than 17
// 4. Compare the rank of sum of cards taken
//    -- 4.a J/Q/K = 10, Ace = 1 OR 11

//-----------------------------------
//       Global Variables
//------------------------------------

var playerCardsArray = [];
var playerCard1 = {};
var playerCard2 = {};
var playerCard3 = {};
var playerHands = [];
var computerCard1 = {};
var computerCard2 = {};
var computerHands = [];
var computerCardsArray = [];
var shuffledDeck = {};
var currentGameMode = "Drawing Cards";
var message1 = "";
var message3 = "";

// var message2 = `<br><br> Player please click submit to choose either Hit or Stand!`;

//-----------------------------------
//       Helper Functions
//-----------------------------------

// === makeDeck helper function ===
var makeDeck = function () {
  var cardDeck = [];
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];
  var emoji = [`♥️`, `♦️`, `♠️`, `♣️`];

  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    // console.log(currentSuit);

    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;
      // console.log(cardName);

      if (cardName == 1) {
        cardName = `ace`;
      } else if (cardName == 11) {
        cardName = `jack`;
      } else if (cardName == 12) {
        cardName = `queen`;
      } else if (cardName == 13) {
        cardName = `king`;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };
      cardDeck.push(card);
    }
  }
  // console.log(cardDeck);
  return cardDeck;
};

// === generate random index function ===
var randomIndexGenerator = function (max) {
  return Math.floor(Math.random() * max);
};
// === shuffleCards helper function ===
var shuffleCards = function (cardDeck) {
  for (currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    var randomIndex = randomIndexGenerator(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};
// === check for blackjack function

var checkBlackJack = function (card1, card2) {
  result = "";
  if (
    (card1.name == "ace" && card2.rank >= 10) ||
    (card1.rank >= 10 && card2.name == "ace")
  ) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

//  === combineHands function

var getCombineHandValues = function (cardArrays) {
  // Version 4 conditions
  //== if combinedHandValues, including ace is less than 21, ace value is 11
  //== if combinedHandValues, including ace is more than 21, ace vaulue is reduced to 1
  var combineHandValues = 0;

  var aceCounter = 0;

  // create loops to loop over all the cards in the array
  var index = 0;
  while (index < cardArrays.length) {
    currentCard = cardArrays[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      combineHandValues = combineHandValues + 10;
    }
    // if there is an ace, it will equal to 11
    else if (currentCard.name == "ace") {
      combineHandValues = combineHandValues + 11;
      aceCounter += 1;
    } else {
      combineHandValues = combineHandValues + currentCard.rank;
    }
    index += 1;
  }

  // while loop to ensure ace will be reduced to 1 if combinedHandValues is more than 21
  index = 0;
  while (index < aceCounter) {
    if (combineHandValues > 21) {
      combineHandValues = combineHandValues - 10;
    }
  }

  return combineHandValues;
};

//  === compare Player and Computer function

var comparePlayerAndComputer = function (hands1, hands2) {
  // hands1 not bust
  if (hands1 <= 21) {
    if (hands1 > hands2) {
      return "Player wins!!";
    } else if (hands1 < hands2) {
      return "Dealer wins!!";
    } else if (hands1 == hands2) {
      return "Tie Game!!";
    }
  } else if (hands1 > 21) {
    return "Player Bust!";
  }
};

//-----------------------------------
//       Main Functions
//-----------------------------------

// ====================================================
// Version 1: Compare Initial Hands to Determine Winner
// ====================================================

var main = function (input) {
  var shuffledDeck = shuffleCards(makeDeck());

  // ~~~~~~~~~~~~~~~ Drawing Cards Mode ~~~~~~~~~~~~~~~
  // === both players and computer will draw cards
  // === switch mode once both have draw the cards
  // === return message to switch GameMode

  if (currentGameMode == "Drawing Cards") {
    // Switch GameMode to Comparing Mode
    currentGameMode = "Comparing Mode";
    console.log(currentGameMode);
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    playerCardsArray.push(playerCard1);
    playerCardsArray.push(playerCard2);

    // console logs for checkings
    console.log(playerCardsArray);
    console.log(`playerCard1: ${playerCard1.name} of ${playerCard1.suit} `);
    console.log(`playerCard2: ${playerCard2.name} of ${playerCard2.suit} `);

    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    computerCardsArray.push(computerCard1);
    computerCardsArray.push(computerCard2);

    // console logs for checkings
    console.log(computerCardsArray);
    console.log(
      `computerCard1: ${computerCard1.name} of ${computerCard1.suit}`
    );
    console.log(
      `computerCard2: ${computerCard2.name} of ${computerCard2.suit}`
    );

    message1 = `Player hand:<br> ${playerCard1.name} of ${playerCard1.suit} ${playerCard1.emoji},<br> ${playerCard2.name} of ${playerCard2.suit} ${playerCard2.emoji}<br><br>  Dealer hand:<br> ${computerCard1.name} of ${computerCard1.suit} ${computerCard1.emoji},<br> ${computerCard2.name} of ${computerCard2.suit} ${computerCard2.emoji}`;
  }

  // ~~~~~~~~~~~~~~~ Comparing Mode ~~~~~~~~~~~~~~~

  // == check for blackjack conditions
  // == formation of blackjacks
  // == ace + 10 , J , Q, K
  // == both gets blackjack > tie
  // == player gets blackjack > player wins
  // == computer gets blackjack > computer wins
  // == if player hands are bigger > player wins
  // == if computer hands are bigger > computer wins

  if (currentGameMode == "Comparing Mode") {
    // Switch GameMode to Player Hit OR Stand Mode
    currentGameMode = "Player Choose Mode";
    console.log(currentGameMode);

    // ~~~~ check for Blackjack conditions first ~~~~

    // === Testing Conditions for BlackJack ===
    // playerCard1.name = "ace";
    // playerCard2.rank = 10;
    // computerCard1.name = "ace";
    // computerCard2.rank = 10;

    var playerBlackJack = checkBlackJack(playerCard1, playerCard2);
    console.log(`playerBlackJack: ${playerBlackJack}`);
    var computerBlackJack = checkBlackJack(computerCard1, computerCard2);
    console.log(`computerBlackJack: ${computerBlackJack}`);

    // player with Blackjack
    if (playerBlackJack == true && computerBlackJack == false) {
      return message1 + "<br><br>Player wins with Blackjack!";
    } else if (playerBlackJack == true && computerBlackJack == true) {
      return message1 + "<br><br>Its a Blackjack tie!";
    }

    // computer with Blackjack
    if (computerBlackJack == true && playerBlackJack == false) {
      return message1 + "<br><br>Dealer wins with Blackjack!";
    } else if (computerBlackJack == true && playerBlackJack == true) {
      return message1 + "<br><br>Its a Blackjack tie!";
    }

    // ~~~~ check for non-Blackjack conditions ~~~~~

    // either computer or player has no Blackjack
    if (playerBlackJack == false && computerBlackJack == false) {
      playerHands = getCombineHandValues(playerCardsArray);
      console.log(`playerHands: ${playerHands}`);
      computerHands = getCombineHandValues(computerCardsArray);
      console.log(`computerHands: ${computerHands}`);
      var message2 = `<br><br> Wow, you're at ${playerHands} right now! Do you want to hit or stand? Type h for hit or s for stand!`;
      myOutputValue = message1 + message2;
    }
    return myOutputValue;
  }

  // ~~~~~~~~~~~~~~~ Player Hit or Stand Mode ~~~~~~~~~~~~~~~
  // Switch to Player Hit or Stand GameMode
  // Player choose either to hit (add) or stand (not add) first
  //   == add the logic when the player busts (>21)
  // Re-evaluate the game-winning condition
  // == player should not lose immediately even if he busts, i.e both player and dealer might bust

  // Allow player to choose Hit or Stand
  if (currentGameMode == "Player Choose Mode") {
    // Switch mode to Computer choose mode
    currentGameMode = "Dealer Choose Mode";
    console.log(currentGameMode);

    // if player choose Hit
    if (input == "h") {
      var playerCard3 = shuffledDeck.pop();
      console.log(`playerCard3: ${playerCard3.name}`);
      playerCardsArray.push(playerCard3);
      playerHands = getCombineHandValues(playerCardsArray);
      console.log(`playerhands: ${playerHands}`);
      console.log(`computerHands: ${computerHands}`);

      //== unsure why is it not possible to use the stored object playerCard1 and playerCard2
      // playerCard1 = playerCardsArray[0];
      // console.log(`playerCard1: ${playerCard1.name}`);
      // playerCard2 = playerCardsArray[1];
      // console.log(`playerCard2: ${playerCard2.name}`);

      // message3 = `Player hand:<br> ${playerCard1.name} of ${playerCard1.suit},<br> ${playerCard2.name} of ${playerCard2.suit}<br> ${playerCard3.name} of ${playerCard3.suit} <br><br>  Dealer hand:<br> ${computerCard1.name} of ${computerCard1.suit},<br> ${computerCard2.name} of ${computerCard2.suit}`;

      myOutputValue = `${message1}<br><br> Player chose another card: ${playerCard3.name} of ${playerCard3.suit} ${playerCard3.emoji}<br><br>Dealer's turn!`;
    }
    // if player choose Stand
    else if (input == "s") {
      console.log(`playerhands: ${playerHands}`);
      console.log(`computerHands: ${computerHands}`);
      myOutputValue = `${message1}<br><br>Dealer's turn!`;
    }
    return myOutputValue;
  }

  // ~~~~~~~~~~~~~~~ Dealer Hit or Stand Mode ~~~~~~~~~~~~~~~

  if (currentGameMode == "Dealer Choose Mode") {
    // Allow dealer to choose Hit or Stand
    // if dealer choose Hit
    if (computerHands < 17) {
      var computerCard3 = shuffledDeck.pop();
      console.log(`computerCard3: ${computerCard3.name}`);
      computerCardsArray.push(computerCard3);
      computerHands = getCombineHandValues(computerCardsArray);
      console.log(`playerhands: ${playerHands}`);
      console.log(`computerHands: ${computerHands}`);
      // message3 = `Player hand:<br> ${playerCard1.name} of ${playerCard1.suit},<br> ${playerCard2.name} of ${playerCard2.suit}<br> ${playerCard3.name} of ${playerCard2.suit}    <br><br>  Dealer hand:<br> ${computerCard1.name} of ${computerCard1.suit},<br> ${computerCard2.name} of ${computerCard2.suit}`;
      myOutputValue = `${message1}<br><br> Dealer chose another card: ${
        computerCard3.name
      } of ${computerCard3.suit} ${
        computerCard3.emoji
      }<br><br> Combined Player Hands: ${playerHands}<br>Combined Computer Hands: ${computerHands}<br> ${comparePlayerAndComputer(
        playerHands,
        computerHands
      )}`;
    }
    // if player choose Stand
    else if (computerHands >= 17) {
      console.log(`playerhands: ${playerHands}`);
      console.log(`computerHands: ${computerHands}`);
      myOutputValue = `${message1}<br><br> Combined Player Hands: ${playerHands}<br>Combined Computer Hands:${computerHands}<br> ${comparePlayerAndComputer(
        playerHands,
        computerHands
      )}`;
    }
    var myImage =
      '<img src="https://c.tenor.com/CMFvpGzhzo0AAAAM/money-rain-money.gif"/>';
    myOutputValue = myOutputValue + myImage + myImage + myImage; // will display an image in the grey box
    return myOutputValue;
  }
};
