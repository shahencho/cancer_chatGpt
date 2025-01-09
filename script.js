// Game State Variables
let currentLevel = 1;
let currentQuestionIndex = 0;

// Question Bank
const questions = [
    {
        question: "Which of the following mediators is formed due to inflammasome generation?",
        answers: ["IL-1", "IL-18", "TNF", "NFκB"],
        correct: [1]
    },
    {
        question: "Which type of cell death is the most phlogogenic?",
        answers: ["apoptosis", "necrosis", "pyroptosis", "necroptosis"],
        correct: [2]
    },
    {
        question: "Which cytokine is primarily responsible for fever?",
        answers: ["IL-1", "IL-6", "TNF-alpha", "IL-12"],
        correct: [0]
    },
    {
        question: "Which immune cells are the first responders to bacterial infection?",
        answers: ["T cells", "B cells", "Neutrophils", "Macrophages"],
        correct: [2]
    },
    {
        question: "What molecule acts as a co-stimulatory signal in T cell activation?",
        answers: ["CD28", "CTLA-4", "PD-1", "CD40"],
        correct: [0]
    },
    {
        question: "Which antibody is most abundant in mucosal immunity?",
        answers: ["IgA", "IgG", "IgM", "IgE"],
        correct: [0]
    },
    {
        question: "Which pathway is activated by antigen-antibody complexes?",
        answers: ["Lectin pathway", "Alternative pathway", "Classical pathway", "Inflammasome pathway"],
        correct: [2]
    },
    {
        question: "Which cytokine is primarily anti-inflammatory?",
        answers: ["IL-10", "IL-6", "IL-1", "TNF-alpha"],
        correct: [0]
    },
    {
        question: "Which cell type releases histamine during allergic reactions?",
        answers: ["Neutrophils", "Basophils", "T cells", "B cells"],
        correct: [1]
    },
    {
        question: "What receptor is critical for LPS recognition in bacterial infections?",
        answers: ["TLR4", "TLR2", "NLRP3", "RIG-I"],
        correct: [0]
    }
];

// Cache DOM Elements
const questionElement = document.getElementById('question');
const feedbackElement = document.getElementById('feedback');
const mapElement = document.getElementById('map');
const answersContainer = document.getElementById('answers');
const answerButtons = Array.from(document.querySelectorAll('#answers button'));

// Initialize Game
window.onload = () => {
    console.log('🚀 Game Loaded');
    loadNextQuestion();
};

// Load Next Question with Logging
function loadNextQuestion() {
    console.log(`📊 Loading Question ${currentQuestionIndex + 1}`);

    if (currentQuestionIndex >= questions.length) {
        console.log('🏁 All Questions Answered. Ending Game...');
        endGame();
        return;
    }

    const questionObj = questions[currentQuestionIndex];

    console.log('📝 Updating Question Text');
    questionElement.innerText = questionObj.question;

    console.log('📝 Updating Answer Buttons');
    questionObj.answers.forEach((answer, index) => {
        answerButtons[index].innerText = answer;
        answerButtons[index].disabled = false;
    });

    feedbackElement.innerText = "";

    console.log('✅ Question Loaded Successfully');
}

// Handle Answer with Logging
function handleAnswer(isCorrect) {
    console.log(`🎯 Answer Selected: ${isCorrect ? 'Correct' : 'Incorrect'}`);

    // Disable all buttons at once
    answerButtons.forEach(button => button.disabled = true);

    if (isCorrect) {
        console.log('✅ Correct Answer! Moving Back One Level');
        currentLevel = Math.max(1, currentLevel - 1);
        feedbackElement.innerText = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        console.log('❌ Incorrect Answer! Moving Forward One Level');
        currentLevel += 1;
        feedbackElement.innerText = "Incorrect!";
        feedbackElement.style.color = "red";
    }

    console.log(`🗺️ Updating Map to Level ${currentLevel}`);
    updateMap();

    // Automatically load the next question after 1 second
    setTimeout(() => {
        currentQuestionIndex++;
        loadNextQuestion();
    }, 1000);
}

// Update Map with Logging
function updateMap() {
    console.log(`🖼️ Map Updated to Level ${currentLevel}`);
    if (currentLevel <= 5) {
        mapElement.src = `assets/Level${currentLevel}.jpg`;
    }
}

// End Game with Logging
function endGame() {
    console.log('🏁 Game Over or Victory');

    if (currentLevel > 5) {
        questionElement.innerText = "Game Over! Cancer spread too far.";
        feedbackElement.innerText = "You lost. Better luck next time!";
        feedbackElement.style.color = "red";
    } else {
        questionElement.innerText = "You Win! You stopped the cancer.";
        feedbackElement.innerText = "Congratulations, you defeated the cancer!";
        feedbackElement.style.color = "green";
    }

    answersContainer.style.display = 'none';

// Show "Try Again?" Button
    document.getElementById('retry-btn').style.display = 'inline-block';


}

// Reset Game
function resetGame() {
    console.log('🔄 Resetting Game...');
    currentLevel = 1;
    currentQuestionIndex = 0;
    mapElement.src = `assets/Level1.jpg`;
    answersContainer.style.display = 'block';
    feedbackElement.innerText = "";
    loadNextQuestion();
}

// Event Delegation for Answers
answersContainer.addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.tagName === 'BUTTON') {
        const index = answerButtons.indexOf(clickedButton);
        const isCorrect = questions[currentQuestionIndex].correct.includes(index);
        handleAnswer(isCorrect);
    }
});
