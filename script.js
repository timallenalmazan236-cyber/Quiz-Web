// Easy Basic One Piece Knowledge Questions (5 Multiple Choice + 5 Fill-in-the-Blank)
const questions = [
  {
    type: "mc",
    question: "1. Who is the captain of the Straw Hat Pirates?",
    options: ["Monkey D. Luffy", "Roronoa Zoro", "Usopp", "Sanji"],
    answer: "Monkey D. Luffy"
  },
  {
    type: "mc",
    question: "2. What fruit did Monkey D. Luffy eat to gain rubber powers?",
    options: ["Flame-Flame Fruit", "Gum-Gum Fruit", "Chop-Chop Fruit", "Op-Op Fruit"],
    answer: "Gum-Gum Fruit"
  },
  {
    type: "mc",
    question: "3. What is the occupation/role of Sanji on the ship?",
    options: ["Doctor", "Navigator", "Cook", "Sniper"],
    answer: "Cook"
  },
  {
    type: "mc",
    question: "4. What color is the hair of the swordsman Roronoa Zoro?",
    options: ["Black", "Green", "Yellow", "Red"],
    answer: "Green"
  },
  {
    type: "mc",
    question: "5. Who gave Luffy his famous Straw Hat?",
    options: ["Shanks", "Garp", "Ace", "Gol D. Roger"],
    answer: "Shanks"
  },
  {
    type: "fib",
    question: "6. The navigator of the Straw Hat crew who loves money and tangerines is named ______.",
    answer: "Nami"
  },
  {
    type: "fib",
    question: "7. Luffy's ultimate goal is to become the King of the ______.",
    answer: "Pirates"
  },
  {
    type: "fib",
    question: "8. The reindeer who serves as the doctor of the Straw Hat crew is named Tony Tony ______.",
    answer: "Chopper"
  },
  {
    type: "fib",
    question: "9. Luffy's sworn brother who wielded the power of fire was named ______.",
    answer: "Ace"
  },
  {
    type: "fib",
    question: "10. The main marine rank of Luffy's grandfather, Monkey D. Garp, is Vice ______.",
    answer: "Admiral"
  }
];

let currentSlideIndex = 0;
let questionTimeLeft = 30;
let questionTimerInterval = null;

// DOM Elements
const instructionsSection = document.getElementById("instructions-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const beginBtn = document.getElementById("begin-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionTracker = document.getElementById("question-tracker");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionTimerDisplay = document.getElementById("question-timer");
const blueProgressFill = document.getElementById("blue-progress-fill");
const summaryContainer = document.getElementById("summary-container");

beginBtn.addEventListener("click", () => {
  instructionsSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  loadSlide();
});

function loadSlide() {
  resetQuestionTimer();
  startQuestionTimer();

  const currentQ = questions[currentSlideIndex];
  
  // Minimalist Slide Counter (e.g., 01 / 10)
  const slideNum = (currentSlideIndex + 1).toString().padStart(2, '0');
  questionTracker.textContent = `${slideNum} / 10`;
  
  questionText.textContent = currentQ.question;

  optionsContainer.innerHTML = "";

  // Render multiple choice options if type is 'mc'
  if (currentQ.type === "mc") {
    currentQ.options.forEach((opt, idx) => {
      const card = document.createElement("div");
      card.classList.add("option-display");
      card.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
      optionsContainer.appendChild(card);
    });
  }

  // Update progress bar
  const progressPercent = ((currentSlideIndex + 1) / questions.length) * 100;
  blueProgressFill.style.width = `${progressPercent}%`;

  prevBtn.disabled = currentSlideIndex === 0;
}

function resetQuestionTimer() {
  clearInterval(questionTimerInterval);
  questionTimeLeft = 30;
  updateTimerDisplay();
}

function startQuestionTimer() {
  questionTimerInterval = setInterval(() => {
    questionTimeLeft--;
    updateTimerDisplay();
    
    if (questionTimeLeft <= 0) {
      clearInterval(questionTimerInterval);
      navigateNext();
    }
  }, 1000);
}

function updateTimerDisplay() {
  questionTimerDisplay.textContent = `${questionTimeLeft}s`;
}

function navigateNext() {
  if (currentSlideIndex < questions.length - 1) {
    currentSlideIndex++;
    loadSlide();
  } else {
    showSummaryScreen();
  }
}

function navigatePrev() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    loadSlide();
  }
}

nextBtn.addEventListener("click", navigateNext);
prevBtn.addEventListener("click", navigatePrev);

// Generate Answer Key Summary
function showSummaryScreen() {
  clearInterval(questionTimerInterval);
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  summaryContainer.innerHTML = "";
  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.classList.add("summary-card");
    card.innerHTML = `
      <p><strong>Q${i + 1}:</strong> ${q.question}</p>
      <p class="answer"><strong>Correct Answer:</strong> ${q.answer}</p>
    `;
    summaryContainer.appendChild(card);
  });
}

restartBtn.addEventListener("click", () => {
  currentSlideIndex = 0;
  resultSection.classList.add("hidden");
  instructionsSection.classList.remove("hidden");
});