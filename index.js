// page loads with inital HTML elements included in start screen
let questionCount = 0;
let score = 0;

function questionTemplate() {
    return `
    <section class="quizStats">
        <p class="questionCount">Question: ${questionCount + 1}/${STORE.length}</p>
        <p class="scoreCount">Score: ${score}/${STORE.length}</p>
    </section>
    <h2>${STORE[questionCount].question}</h2>
    <form role="form">
        <fieldset>
        <section class="formElements">
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
            <div class="buttonContainer"><button type="submit" class="submitButton">SUBMIT</button></div>
        </section>
        </fieldset>
    </form>
`
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
    <section class="quizStats">
        <p class="questionCount">Question: ${questionCount + 1}/${STORE.length}</p>
        <p class="scoreCount">Score: ${score}/${STORE.length}</p>
    </section>
    <img src="http://i1.wp.com/mauiwowiblog.files.wordpress.com/2014/08/hangloose.png?ssl=1" alt="hang loose logo" class="hangLoose">
    <h2>Correct!</h2>
    <button type="button" class="nextButton">NEXT</button>
    `)
}

function renderIncorrectScreen() {
    // renders correct screen
    $('.container').html(`
    <section class="quizStats">
        <p class="questionCount">Question: ${questionCount + 1}/${STORE.length}</p>
        <p class="scoreCount">Score: ${score}/${STORE.length}</p>
    </section>
    <img src="https://www.marylandhealthconnection.gov/wp-content/uploads/2016/12/white-x-graphic.png" alt="incorrect symbol" class="xLogo">
    <h2>Incorrect</h2>
    <p class="correctAnswer"><b>The correct answer is ${STORE[questionCount].correctAnswer}.</b></p>
    <button type="button" class="nextButton">NEXT</button>

    `)
}

function renderFinalScreen() {
    $('.container').html(`
    <h1>Quiz Complete</h1>
    <section class="overallScore">
        <p class="finalScore">Overall Score:</p>
        <p class="finalScore">${score}/${STORE.length}</p>
    </section>
    <img src="http://pngimg.com/uploads/mountain/mountain_PNG10.png" alt="mountain logo" class="logo2">
    <button type="button" class="restartButton">START OVER</button>
    `)
}

function handleSubmitButton() {
    // will be used to submit answer to question
    console.log('handleSubmitButton() ran');
    $('.container').on('submit', 'form', event => {
        event.preventDefault();
        let answer = $('input:checked').val();
        console.log(answer);
        console.log(STORE[questionCount].correctAnswer);
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
        });   
}

function handleNextButton() {
    // will be used to move to next question
    console.log('handleNextButton() ran');
    $('.container').on('click', '.nextButton', event => {
    if (questionCount + 1 != STORE.length) {
        questionCount++;
        nextQuestion();
    }
    else {
      renderFinalScreen();
    }
    });
}

function handleRestartButton() {
    // will be used to restart quiz on last screen
    console.log('handleRestartButton() ran');
    $('.container').on('click', '.restartButton', event => {
        questionCount = 0;
        score = 0;
        $('.container').html(`
            <img src="http://pngimg.com/uploads/mountain/mountain_PNG10.png" alt="mountain logo" class="logo">
            <h1>
                What do you know about Colorado?
            </h1>

            <button type="button" class="startButton">TAKE THE QUIZ</button>`);
        handleStartButton();
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