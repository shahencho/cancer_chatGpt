// Game State Variables
let currentLevel = 1;
let currentQuestionIndex = 0;

// Question Bank
const questions = [
    {
        question: "Which of the following mediators is formed due to inflammasome generation?",
        answers: ["IL-1", "IL-18", "TNF", "NFκB"],
        correct: [1] // Correct: IL-18 (Option B)
    },
    {
        question: "Which type of cell death is the most phlogogenic?",
        answers: ["apoptosis", "necrosis", "pyroptosis", "necroptosis"],
        correct: [2] // Correct: pyroptosis (Option C)
    },
    {
        question: "An eight-year-old boy presented recurrent febrile attacks from an unknown cause, an acute scrotum and renal amyloidosis. He also showed splenomegaly, lymphadenopathy, pleural effusion, ascites and elevated acute phase reactants. Increased activation of which complex is most likely underlying his suffering?",
        answers: ["proteasome", "inflammasome", "apoptosome", "spliceosome", "signalosome"],
        correct: [1] // Correct: inflammasome (Option B)
    },
    {
        question: "In an experiment, bacteria are introduced into a perfused tissue preparation. Neutrophils leave the vasculature and migrate to the site of bacterial inoculation. After rolling at the surface of the endothelium, neutrophils slowly move along the endothelial cells to find the best site for transmigration. Which of the following terms describes the latter fine-tuning movement?",
        answers: ["arrest", "crawling", "swarming", "firm adhesion", "exudation"],
        correct: [1] // Correct: crawling (Option B)
    },
    {
        question: "A five-year-old child has common bacterial infections. His neutrophils are analyzed. It is revealed that the neutrophils exposed to bacteria perform the “respiratory burst”, but bactericidal activity is low. Which of the following enzymes is likely to be missing?",
        answers: ["Myeloperoxidase", "NADPH oxidase", "iNOS", "caspase-1", "IκB kinase"],
        correct: [1] // Correct: NADPH oxidase (Option B)
    },
    {
        question: "A 6-year-old boy is evaluated for a chronic wound on the right forearm that did not heal despite intensive topical therapy for 4 weeks. Clinical examination also revealed progressive periodontitis and gingivitis. Which of the following is most likely to be low on flow cytometry of his leukocytes?",
        answers: ["CD18 expression", "levels of CD4+ cells", "levels of fucosyl transferase", "neutrophil counts", "CD56+ CD3− cells"],
        correct: [0] // Correct: CD18 expression (Option A)
    },
    {
        question: "A 58-year-old man presents to the emergency department with severe chest pain and shortness of breath. An ECG shows ST-segment elevation in the anterior leads, and laboratory studies reveal elevated troponin I levels. The patient is diagnosed with an acute myocardial infarction. During myocardial ischemia and necrosis, which of the following molecules is most likely acting as a Damage-Associated Molecular Pattern (DAMP) to initiate the inflammatory response?",
        answers: ["Lipopolysaccharide (LPS)", "ATP", "Flagellin", "Single-stranded RNA", "Peptidoglycan"],
        correct: [1] // Correct: ATP (Option B)
    },
    {
        question: "A 35-year-old man presents with sepsis due to Escherichia coli infection. He develops fever, hypotension, and signs of systemic inflammation. Laboratory studies reveal elevated IL-1β and IL-18 levels, along with evidence of monocyte pyroptosis mediated by caspase-1 activation. Which of the following proteins directly executes cell membrane damage leading to cell lysis in this process?",
        answers: ["Caspase-1", "NLRP3", "Gasdermin D", "HMGB1", "MyD88"],
        correct: [2] // Correct: Gasdermin D (Option C)
    },
    {
        question: "Which of the following is a plasma derived mediator of inflammation?",
        answers: ["complement C5a", "histamine", "leukotriene C4", "IL-8", "prostaglandin E2"],
        correct: [0] // Correct: complement C5a (Option A)
    },
    {
        question: "A 26-year-old man presents with a skin abscess following a bacterial infection. Microscopic examination reveals neutrophil aggregation resembling swarming behavior at the infection site. Which of the following molecules, produced by neutrophils, is primarily responsible for attracting additional neutrophils in this cooperative movement?",
        answers: ["Leukotriene B4", "IL-8", "LPS", "C-reactive protein", "Platelet-activating factor (PAF)"],
        correct: [1] // Correct: IL-8 (Option B)
    }
];


// Initialize Game
window.onload = () => {
    console.log('Game Loaded');
    loadNextQuestion();
};

// Load Next Question
function loadNextQuestion() {
    console.log(`Loading Question ${currentQuestionIndex + 1}...`);

    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionObj.question;

    questionObj.answers.forEach((answer, index) => {
        const answerButton = document.getElementById(`answer${String.fromCharCode(65 + index)}`);
        answerButton.innerText = answer;
        answerButton.disabled = false;
        answerButton.onclick = () => handleAnswer(questionObj.correct.includes(index));
    });

    document.getElementById('feedback').innerText = "";
}

// Handle Answer
function handleAnswer(isCorrect) {
    console.log(`Answer Correct: ${isCorrect}`);

    document.querySelectorAll('#answers button').forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {
        currentLevel = Math.max(1, currentLevel - 1); // Move back if correct
        document.getElementById('feedback').innerText = "Correct!";
        document.getElementById('feedback').style.color = "green";
    } else {
        currentLevel += 1; // Move forward if incorrect
        document.getElementById('feedback').innerText = "Incorrect!";
        document.getElementById('feedback').style.color = "red";
    }

    console.log(`Updated Level: ${currentLevel}`);
    updateMap();

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentLevel > 5 || currentQuestionIndex >= questions.length) {
            endGame();
        } else {
            loadNextQuestion();
        }
    }, 2000);
}

// Update Map
function updateMap() {
    console.log(`Updating Map to Level ${currentLevel}`);
    if (currentLevel <= 5) {
        document.getElementById('map').src = `assets/Level${currentLevel}.jpg`;
    }
}

// End Game
// End Game
function endGame() {
    console.log('Game Over or Victory');
    console.log(`Final Level: ${currentLevel}`);

    // Win Condition: User is at Level 1
    if (currentLevel === 1) {
        document.getElementById('question').innerText = "You Win! You stopped the cancer.";
        document.getElementById('feedback').innerText = "Congratulations, you defeated the cancer!";
        document.getElementById('feedback').style.color = "green";
    } 
    // Lose Condition: User is at any other level
    else {
        document.getElementById('question').innerText = "Game Over! Cancer spread too far.";
        document.getElementById('feedback').innerText = "You lost. Better luck next time!";
        document.getElementById('feedback').style.color = "red";
    }

    // Hide Gameplay Elements
    document.getElementById('answers').style.display = 'none';

    // Show "Try Again?" Button
    document.getElementById('retry-btn').style.display = 'inline-block';
}



// Reset Game
function resetGame() {
    console.log('Resetting Game...');
    currentLevel = 1;
    currentQuestionIndex = 0;

    // Reset UI
    document.getElementById('map').src = `assets/Level1.jpg`;
    document.getElementById('answers').style.display = 'block';
    document.getElementById('retry-btn').style.display = 'none';
    document.getElementById('feedback').innerText = "";

    // Start Over
    loadNextQuestion();
}
