// Load the card data from the json file #
var cardData = null;

// Create a function to load the json file using XMLHttpRequest function 
loadJSON(callback) 
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("data/json");
  xobj.open('GET', 'cardData.json', true);
  // Replace with the actual file name 
  xobj.onreadystatechange =
    function() 
    {
      if (xobj.readyState == 4 && xobj.status == "200") 
      {
        callback(xobj.responseText);
      }
    };
  xobj.send(null);
}
// Call the loadJSON function and parse the response 
loadJSON(function(response) 
{
  cardData = JSON.parse(response);
});
// Create variables to store the question cards and answer cards 
var questionCards = [];
var answerCards = [];
// Create variables to store the selected question card and answer card 
var selectedQuestionCard = null;
var selectedAnswerCard = null;
// Create variables to store the number of players, the judge index, and the winning point 
var numPlayers = null;
var judgeIndex = null;
var winningPoint = null;

// Create an array to store the player objects with name and score 
var players = [];

// Create a function to start the game 
function startGame() 
{
  // Ask the user to enter the number of players(between 2 and 6)
  numPlayers = prompt("Enter the number of players(between 2 and 6): ");

  // Validate the input and repeat until valid
  while (numPlayers < 2 || numPlayers > 6 || isNaN(numPlayers)) 
  {
    numPlayers = prompt("Invalid input.Enter the number of players(between 2 and 6): ");
  }

  // Ask the user to enter the winning point (between 1 and 10) 
  winningPoint = prompt("Enter the winning point(between 1 and 10): ");

  // Validate the input and repeat until valid 
  while (winningPoint < 1 || winningPoint > 10 || isNaN(winningPoint)) 
  {
    winningPoint = prompt("Invalid input.Enter the winning point(between 1 and 10): ");
  }

  // Ask the user to enter the name of each player and create a player object with score 0 
  for (var i = 0; i < numPlayers; i++) 
  {
    var playerName = prompt("Enter the name of player " + (i + 1) + ": ");
    players.push(
    {
      name: playerName,
      score: 0
    });
  }

  // Ask the user to pick the judge for the game (between 1 and numPlayers) 
  judgeIndex = prompt("Pick the judge for the game (between 1 and " + numPlayers + "): ");

  // Validate the input and repeat until valid 
  while (judgeIndex < 1 || judgeIndex > numPlayers || isNaN(judgeIndex)) 
  {
    judgeIndex = prompt("Invalid input. Pick the judge for the game (between 1 and " + numPlayers + "): ");
  }

  // Convert the judgeIndex to zero-based index 
  judgeIndex = judgeIndex - 1;

  // Copy the question cards and answer cards from the card data 
  questionCards = cardData.questionCards.slice();
  answerCards = cardData.answerCards.slice();
  // Shuffle the question cards and answer cards using the Fisher-Yates algorithm 
  shuffle(questionCards);
  shuffle(answerCards);
  // Draw the first question card from the question cards 
  selectedQuestionCard = drawCard(questionCards);

  // Display the question card on the webpage 
  displayQuestionCard(selectedQuestionCard);

  // Display the answer cards on the webpage 
  displayAnswerCards(answerCards);

  // Display the score board on the webpage 
  displayScoreBoard(players);
}

// Create a function to shuffle an array using the Fisher-Yates algorithm function 
shuffle(array) 
{
  var currentIndex = array.length,randomIndex;
  while (currentIndex != 0) 
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
// Create a function to draw a card from an array and remove it function 
drawCard(array) 
{
  return array.shift();
}
// Create a function to display a question card on the webpage function 
displayQuestionCard(card) 
{
  // Get the HTML element for the question text 
  var questionText = document.getElementById("question-text");

  // Set the text content of the element to the card text 
  questionText.textContent = card.text;
}

// Create a function to display answer cards on the webpage 
function displayAnswerCards(cards) 
{ // Get the HTML element for the answer cards container 
  var answerCardsContainer = document.getElementById("answer-cards");

  // Clear any existing answer cards 
  answerCardsContainer.innerHTML = "";

  // Loop through the first 10 cards in the array 
  for (var i = 0; i < 10; i++) 
  { // Create a div element for each answer card 
    var answerCardDiv = document.createElement("div");

    // Add the class name “answer-card” to the div element 
    answerCardDiv.className = "answer-card";

    // Create a p element for each answer text var 
    answerTextP = document.createElement("p");

    // Add the class name “answer-text” to the p element 
    answerTextP.className = "answer-text";

    // Set the text content of the p element to the card text 
    answerTextP.textContent = cards[i].text;

    // Append the p element to the div element 
    answerCardDiv.appendChild(answerTextP);

    // Add an event listener to the div element to handle click events 
    answerCardDiv.addEventListener
    ("click",function() 
    {
      // Check if there is already a selected answer card 
      if (selectedAnswerCard) 
      {
        // If yes, remove the class name “selected” from it 
        selectedAnswerCard.classList.remove("selected");
      }

      // Set the selected answer card to this div element
      selectedAnswerCard = this;

      // Add the class name "selected" to this div element
      this.classList.add("selected");
    });

    // Append the div element to the answer cards container 
    answerCardsContainer.appendChild(answerCardDiv);
  }
}

// Create a function to display score board on webpage 
function displayScoreBoard(players) 
{
  // Get HTML element for score board container 
  var scoreBoardContainer = document.getElementById("score-board");

  // Clear any existing player scores 
  scoreBoardContainer.innerHTML = "";

  // Loop through players array 
  for (var i = 0; i < players.length; i++) 
  {        
    // Create a Loop through players array 
    for (var i = 0; i < players.length; i++) 
    {
      // Create a div element for each player score 
      var playerScoreDiv = document.createElement("div");

      // Add the class name “player-score” to the div element 
      playerScoreDiv.className = "player - score";

      // Create a p element for each player name 
      var playerNameP = document.createElement("p");

      // Add the class name “player-name” to the p element 
      playerNameP.className = "player-name";

      // Set the text content of the p element to the player name 
      playerNameP.textContent = players[i].name;

      // Append the p element to the div element 
      playerScoreDiv.appendChild(playerNameP);

      // Create a p element for each player points 
      var playerPointsP = document.createElement("p");

      // Add the class name “player-points” to the p element 
      playerPointsP.className = "player-points";

      // Set the text content of the p element to the player score 
      playerPointsP.textContent = players[i].score;

      // Append the p element to the div element 
      playerScoreDiv.appendChild(playerPointsP);

      // Append the div element to the score board container 
      scoreBoardContainer.appendChild(playerScoreDiv);
    } 
    // Get the HTML element for the submit button 
    var submitButton = document.getElementById("submit-button");

    // Add an event listener to the submit button to handle click events 
    submitButton.addEventListener("click", function() 
    { // Check if there is a selected answer card 
      if (selectedAnswerCard) 
      { // If yes, get the index of the selected answer card in the answer cards array 
        var selectedIndex = Array.from(answerCardsContainer.children).indexOf(selectedAnswerCard);

        // Remove the selected answer card from the answer cards array
        answerCards.splice(selectedIndex, 1);

        // Check if the judge index is equal to the current player index
        if (judgeIndex === currentPlayer) 
        {
          // If yes, display a message saying that the judge cannot submit an answer
          alert("The judge cannot submit an answer.");
        } 
        else 
        {
          // If no, display a message saying that the answer is submitted and wait for the judge's decision
          alert("Your answer is submitted. Please wait for the judge's decision.");

          // Disable the submit button until the judge makes a decision
          submitButton.disabled = true;
        }
      } 
      else 
      { // If no, display a message saying that no answer is selected 
      alert("No answer is selected.");
      }
    });
  }
}

// Create a function to handle the judge’s decision function 
handleDecision() 
{
  // Ask the judge to enter the index of the best answer card (between 1 and numPlayers - 1) 
  var bestIndex = prompt("Enter the index of the best answer card (between 1 and " + (numPlayers - 1) + "): ");

    // Validate the input and repeat until valid 
    while (bestIndex < 1 || bestIndex > numPlayers - 1 || isNaN(bestIndex)) 
    {
      bestIndex = prompt("Invalid input. Enter the index of the best answer card (between 1 and " + (numPlayers - 1) + "):");
    }

    // Convert the bestIndex to zero-based index 
    bestIndex = bestIndex - 1;

    // Increase the score of the player who submitted the best answer by one 
    players[bestIndex].score++;

    // Display a message saying that the player who submitted the best answer gets a point 
    alert(players[bestIndex].name + " gets a point.");

    // Enable the submit button again 
    submitButton.disabled = false;

    // Move on to the next judge 
    judgeIndex = (judgeIndex + 1) % numPlayers;

    // Draw a new question card from the question cards 
    selectedQuestionCard = drawCard(questionCards);

    // Display the new question card on the webpage 
    displayQuestionCard(selectedQuestionCard);

    // Display the new score board on the webpage 
    displayScoreBoard(players);

      // Check if there are any cards left in either deck or if any player has reached the winning point 
      if (questionCards.length === 0 || answerCards.length === 0 || players.some(player => player.score >= winningPoint)) 
      {
        // If yes, end the game and display a message saying who is the winner or if there is a tie 
        endGame();
      }
}

  // Create a function to end the game and display a message saying who is the winner or if there is a tie 
  function endGame() 
  {
    // Get an array of players with highest score 
    var winners = players.filter(player => player.score === Math.max(players.map(player => player.score)));

    // Check if there is only one winner or multiple winners 
    if (winners.length === 1) 
    { // If only one winner, display a message saying that they are the winner 
        alert(winners[0].name + " is the winner!"); 
    }
    else 
    { // If multiple winners, display a message saying that they are tied 
        alert(winners.map(winner => winner.name).join(", ") + " are tied!"); 
    }
  }

  // Call the startGame function when the webpage loads 
  window.onload = startGame;