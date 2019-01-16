// page loads with inital HTML elements included in start screen
let questionCount = 0;
let score = 0;

function questionTemplate() {
    return `<h2>${STORE[questionCount].question}</h2>
    <form role="form">
        <fieldset>
            <label class="answerOption">
                <input type="radio" value="${STORE[questionCount].answers[0]}" name="answer" required/>
                <span>${STORE[questionCount].answers[0]}</span>
            </label>
            <label class="answerOption">
                <input type="radio" value="${STORE[questionCount].answers[1]}" name="answer" required/>
                <span>${STORE[questionCount].answers[1]}</span>
            </label>
            <label class="answerOption">
                <input type="radio" value="${STORE[questionCount].answers[2]}" name="answer" required/>
                <span>${STORE[questionCount].answers[2]}</span>
            </label>
            <label class="answerOption">
                <input type="radio" value="${STORE[questionCount].answers[3]}" name="answer" required/>
                <span>${STORE[questionCount].answers[3]}</span>
            </label>
            <button type="submit" class="submitButton">Submit</button>
        </fieldset>
    </form>
    <div class="quizStats">
        <p class="questionCount">Question: ${questionCount + 1}/${STORE.length}</p>
        <p class="scoreCount">Score: ${score}/${STORE.length}</p>
    </div>`
}

function nextQuestion() {
    $('.container').html(questionTemplate());
}

function handleStartButton() {
    // will be used to start quiz
    console.log('handleStartButton() ran');
    $('.startButton').click(function(event) {
        nextQuestion();             
    });
}

function increaseScore() {
    score++;
}

function renderCorrectScreen() {
    // renders correct screen
    $('.container').html(`
    <h1>Correct!</h1>
    <button type="button" class="nextButton">Next Question</button>
    <div class="quizStats">
        <p class="questionCount">Question: ${questionCount + 1}/${STORE.length}</p>
        <p class="scoreCount">Score: ${score}/${STORE.length}</p>
    </div>
    `)
}

function renderIncorrectScreen() {
    // renders correct screen
    $('.container').html(`
    <h1>Incorrect</h1>
    <p class="correctAnswer"><b>The correct answer is ${STORE[questionCount].correctAnswer}.</b></p>
    <button type="button" class="nextButton">Next Question</button>
    <div class="quizStats">
        <p class="questionCount">Question: ${questionCount + 1}/${STORE.length}</p>
        <p class="scoreCount">Score: ${score}/${STORE.length}</p>
    </div>
    `)
}

function renderFinalScreen() {
    $('.container').html(`
    <h1>Quiz Complete</h1>
    <div class="overallScore">
        <p>Overall Score:</p>
        <p>${score}/${STORE.length}</p>
    </div>
    <button type="button" class="restartButton">Start Over</button>
    `)
}

function handleSubmitButton() {
    // will be used to submit answer to question
    console.log('handleSubmitButton() ran');
    $('.container').on('click', '.submitButton', event => {
        event.preventDefault();
        let answer = $('input:checked').val();
        console.log(answer);
        console.log(STORE[questionCount].correctAnswer);
        if (questionCount + 1 < STORE.length) {
        if (answer == STORE[questionCount].correctAnswer) {
            console.log('correct');
            // call function that renders correct screen
            increaseScore();
            renderCorrectScreen();
        }
        else {
            console.log('incorrect');
            // call function that renders incorrect screen
            renderIncorrectScreen();
        }
        }
        else {
            console.log('render final screen');
            // call function that renders final screen
            if (answer == STORE[questionCount].correctAnswer) {
            increaseScore();
            renderFinalScreen();
            }
            else {
                renderFinalScreen();
            }
        }   
    });
}

function handleNextButton() {
    // will be used to move to next question
    console.log('handleNextButton() ran');
    $('.container').on('click', '.nextButton', event => {
        questionCount++;
        nextQuestion();
    });
}

function handleRestartButton() {
    // will be used to restart quiz on last screen
    console.log('handleRestartButton() ran');
    $('.container').on('click', '.restartButton', event => {
        location.reload();
    });
}

function handleButtons() {
    //will be used to initially run the functions that handle event listeners for buttons
    handleStartButton();
    handleNextButton();
    handleSubmitButton();
    handleRestartButton();
}

$(handleButtons)