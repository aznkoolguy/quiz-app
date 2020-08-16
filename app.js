/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is the name of the Pirate Lord?',
      answers: [
        'Ramsey Singh',
        'Bad Deal Lindsey',
        'Captain Blake',
        'Captain Adara'
      ],
      correctAnswer: 'Ramsey Singh'
    },
    {
      question: 'Which color Megalodon has the famous nickname “Shrouded Ghost”?',
      answers: [
        'Blue',
        'Green/Yellow',
        'White',
        'Purple'
      ],
      correctAnswer: 'White'
    },
    {
      question: 'Which flag at level 5 lets you see other ships flying emissary flags on the entire map?',
      answers: [
        'Rainbow',
        'Alliance',
        'Jolly Roger',
        'Reapers Bones'
      ],
      correctAnswer: 'Reapers Bones'
    },
    {
      question: 'Which shanty unlocks the secret entrance to Athena’s Fortune Hideout?',
      answers: [
        'Oh Hail, the Pirate Lord',
        'We Shall Sail Together',
        'Becalmed',
        'Ride of the Valkyries'
      ],
      correctAnswer: 'We Shall Sail Together'
    },
    {
      question: 'Which instrument is not in the game?',
      answers: [
        'Concertina',
        'Hurdy-gurdy',
        'Fiddle',
        'All of the above'
      ],
      correctAnswer: 'Fiddle'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function startQuizTemplate () {
  return [`<div class="box"> 
      <div class="imgwrap">
          <img src="./images/SOT-logo.png" alt="Sea of Thieves Logo"> 
      </div>
  </div>`,
  `<div class="main">
    <div class="title">
        <h1>Sea of Thieves Trivia</h1>
    </div>
    <div class="thing">
        <p>This is a fun quiz game using the lore from the videogame Sea of Thieves, test yerrr knowledge!</p>
        <button class="js-start-button">Start Quiz</button>
    </div>
  </div>`];
}

function questionTemplate(questionNumber) {
  return [`<div class="item">
  <h1>Sea of Thieves Trivia</h1>
  </div>`,
  `<div class="container">
    <div class="score">
      <p>${questionNumber+1} out of 5</p>
      <p>${store.score} correct, ${store.questionNumber-store.score} incorrect</p>
    </div>
    <div class="item">
      <div class="js-question">
        <h1>${store.questions[questionNumber].question}</h1>
      </div>
      <form id="js-answer">
        <div class="answer-wrapper">
          <input id="answer1" type="radio" name="answer" value="${store.questions[questionNumber].answers[0]}" required>
          <label for="answer1">${store.questions[questionNumber].answers[0]}</label>
        </div>
        <div class="answer-wrapper">
          <input id="answer2" type="radio" name="answer" value="${store.questions[questionNumber].answers[1]}" >
          <label for="answer2">${store.questions[questionNumber].answers[1]}</label>
        </div>
        <div class="answer-wrapper">
          <input id="answer3" type="radio" name="answer" value="${store.questions[questionNumber].answers[2]}" >
          <label for="answer3">${store.questions[questionNumber].answers[2]}</label>
        </div>    
        <div class="answer-wrapper">
          <input id="answer4" type="radio" name="answer" value="${store.questions[questionNumber].answers[3]}" >
          <label for="answer4">${store.questions[questionNumber].answers[3]}</label>
        </div>
        <div class="js-check-button">
          <button type="submit">Check Question</button>
        </div>
      </form>
    </div>
  </div>`];
}

function feedbackTemplate(questionNumber, isCorrect) {
  return [`<div class="item2">
    <div class="feedback">
        <h1>${isCorrect ? 'Correct Answer!' : 'The correct answer is: '+ store.questions[questionNumber].correctAnswer}</h1>
    </div>
  </div>`,
  `<div class="container2">
      <h2>- Score -</h2>
      <div class="score-feedback">
          <p>Right: ${store.score} </p>
          <p>Wrong: ${store.questionNumber-store.score+1}</p>
      </div>
      <div class="js-feedback-button">
          <button type="button">Next Question</button>
      </div>
  </div>`];
}

function finalScoreTemplate(){
  return [
  `<div class="item2">
    <div class="restart">
        <h1>Your Results</h1>
    </div>
  </div>`,
  `<div class="container2">
    <h2>- Score -</h2>
    <div class="score-final">
        <p>Right: ${store.score}</p>
        <p>Wrong: ${store.questionNumber-store.score}</p>
    </div>
    <div class="js-restart-button">
        <button type="button">Restart Quiz</button>
    </div>
  </div>`];
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render(template) {
  $('header').html(template[0]);
  $('main').html(template[1]);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function eventHandler() {
  handleNewGame();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestart();
}

function handleNewGame() {
  $('body').on('click', '.js-start-button', () => {
    render(questionTemplate(store.questionNumber));
    store.quizStarted = true;
  });
}

function handleSubmitAnswer() {
  $('body').on('submit','#js-answer', () => {
    event.preventDefault();
    let userAnswer = $("input[name='answer']:checked").val();
    let isCorrect = (userAnswer === store.questions[store.questionNumber].correctAnswer);
    if(isCorrect) {
      store.score = store.score + 1;
    }
      render(feedbackTemplate(store.questionNumber, isCorrect));
  });
}

function handleNextQuestion() {
  $('body').on('click','.js-feedback-button', () => {
    store.questionNumber++;
    if(store.questionNumber === store.questions.length) {
      render(finalScoreTemplate());
    } else {
      render(questionTemplate(store.questionNumber));
    }
  });
}

function handleRestart() {
  $('body').on('click','.js-restart-button', () => {
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = 0;
    render(startQuizTemplate());
  });
}


function executeQuizApp() { 
  if(!store.quizStarted) {
    render(startQuizTemplate());
  }
  eventHandler();
}

$(executeQuizApp);
