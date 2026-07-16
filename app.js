// Questions
const quizData = [
    {
        question: "Which HTML tag is used to define an internal style sheet?", 
        options: ["<script>", "<style>", "<css>", "<link>"], 
        answer: 1
    }, 
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-style", "font-size", "text-size"],
        answer: 2
    },
    {
        question: "How do you declare a JavaScript variable that cannot be reassigned?",
        options: ["var", "let", "const", "fixed"],
        answer: 2
    },
    {
        question: "Which DOM method selects the first element matching a selector?",
        options: ["getElementById()", "querySelector()", "getElementsByClassName()", "selectAll()"],
        answer: 1
    },
    {
        question: "What does JSON stand for?",
        options: [
            "JavaScript Object Notation",
            "Java Standard Output Network",
            "JavaScript Output Notation",
            "Java Source Object Name"
        ],
        answer: 0
    }
];

// Tracking
let currentQuestionIndex = 0;
let score = 0;

// DOM to Elements
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// Question Loading
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex]; 

    // Clear Prev.
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    // Buttons Creation
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// Options Handling
function selectOption(selectedIndex, button) {
    const correctIndex = quizData[currentQuestionIndex].answer;
    const allButtons = optionsContainer.querySelectorAll(".option-button");
    
    // Disable all buttons
    allButtons.forEach(button => button.disabled = true);
    
    // Check if correct
    if (selectedIndex === correctIndex) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }
    
    // Highlight the correct answer
    allButtons[correctIndex].classList.add("correct");
}

// Next Question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.textContent = "Next Question";
    } else {
        showScore();
    }
});

// Final Score
function showScore() {
    quizContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}`;
}

// Restart
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
    nextButton.textContent = "Next Question";
});

// Initialize Quiz
loadQuestion();