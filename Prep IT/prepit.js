// =========================================================
// 1. VIRTUAL KEYBOARD LOGIC
// =========================================================
let activeInputField = null;

function setActive(element) {
  document.querySelectorAll(".vk-input").forEach(el => el.classList.remove("active-input"));
  element.classList.add("active-input");
  activeInputField = element;
  document.getElementById("virtual-keyboard-container").style.display = "block";
  document.body.classList.add("keyboard-open");
}

function typeKey(key) {
  if (!activeInputField) return;

  if (key === "BKSP") {
    activeInputField.value = activeInputField.value.slice(0, -1);
  } else if (key === "SPACE") {
    activeInputField.value += " ";
  } else {
    activeInputField.value += key;
  }

  activeInputField.dispatchEvent(new Event("input", { bubbles: true }));
}

function handleEnter() {
  if (!activeInputField) return;

  const inputs = Array.from(document.querySelectorAll(".vk-input"));
  const currentIndex = inputs.indexOf(activeInputField);

  if (currentIndex > -1 && currentIndex < inputs.length - 1) {
    setActive(inputs[currentIndex + 1]);
    inputs[currentIndex + 1].scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    closeKeyboard();
  }
}

function closeKeyboard() {
  document.getElementById("virtual-keyboard-container").style.display = "none";
  document.body.classList.remove("keyboard-open");
  if (activeInputField) {
    activeInputField.classList.remove("active-input");
    activeInputField = null;
  }
}

// Dynamically morphs the keyboard into lowercase letters!
function setKeyboardLowercase() {
  const keys = document.querySelectorAll("#virtual-keyboard .key");
  keys.forEach(btn => {
    const char = btn.innerText;
    if (char.length === 1 && char >= "A" && char <= "Z") {
      const lowerChar = char.toLowerCase();
      btn.innerText = lowerChar;
      btn.setAttribute("onclick", `typeKey('${lowerChar}')`);
    }
  });
}

// ==========================================
// 2. AUTO-EMAIL GENERATOR
// ==========================================
document.getElementById("user-roll").addEventListener("input", function (e) {
  const roll = e.target.value.toLowerCase().trim();
  if (roll) {
    document.getElementById("user-email").value = `${roll}@aiktc.ac.in`;
  } else {
    document.getElementById("user-email").value = "";
  }
});

// ==========================================
// 3. CONFIGURATION & SUPABASE
// ==========================================
const SUPABASE_URL = "https://khmimhnzhrcnphgohirr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobWltaG56aHJjbnBoZ29oaXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjMzMzMsImV4cCI6MjA4ODI5OTMzM30.bfFLyrG15K3fJijNxjx2cHdQq15ZshUUw1wWlomx_qQ";

let supabaseInstance = null;
try {
  if (window.supabase) {
    supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase failed to load:", e);
}

const TEST_TIME_HOURS = 0;
const TEST_TIME_MINUTES = 5;
const TEST_TIME_SECONDS = 30;
const TOTAL_QUESTIONS = 5;

// IMPORTANT: Added unique IDs to questionPool to enable State Restoration tracking
const questionPool = [
  {
    id: 1,
    type: "coding",
    q: "We have declared a variable `x`. Write the exact Python code to display the value of `x`.",
    preCode: "x = 10",
    expected: ["print(x)"],
  },
  {
    id: 2,
    type: "coding",
    q: "We have a variable `name`. Write the Python code to find the length of this string.",
    preCode: "name = 'Mueez'",
    expected: ["len(name)", "print(len(name))"],
  },
  {
    id: 3,
    type: "coding",
    q: "Write the Python code to create a list named `fruits` containing the strings 'apple' and 'banana'.",
    preCode: "",
    expected: ["fruits=['apple','banana']", 'fruits=["apple","banana"]'],
  },
  {
    id: 4,
    type: "mcq",
    q: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    ans: 3,
  },
  {
    id: 5,
    type: "mcq",
    q: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    ans: 1,
  },
  {
    id: 6,
    type: "mcq",
    q: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    ans: 0,
  },
  {
    id: 7,
    type: "mcq",
    q: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    ans: 1,
  },
  {
    id: 8,
    type: "mcq",
    q: "Which tag is used to define a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<p>"],
    ans: 1,
  },
];

let selectedQuestions = [];
let userAnswers = {};
const START_TOTAL_SECONDS = TEST_TIME_HOURS * 3600 + TEST_TIME_MINUTES * 60 + TEST_TIME_SECONDS;
let timeRemaining = START_TOTAL_SECONDS;
let timerInterval;
let heartbeatInterval; // Interval for saving state constantly
let answeredCycleIndex = -1;
let unansweredCycleIndex = -1;
let currentUser = { name: "", roll: "", email: "", password: "" };

// ==========================================
// 4. SECURITY FEATURES
// ==========================================
document.addEventListener("contextmenu", event => event.preventDefault());
document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    (event.key === "c" || event.key === "v" || event.key === "x" || event.key === "u")
  ) {
    event.preventDefault();
    alert("Security Alert: Copy/Paste is disabled!");
  }
  if (event.key === "F12") event.preventDefault();
});

// ==========================================
// 5. QUIZ LOGIC & STATE RESTORATION
// ==========================================
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  if (hours > 0) return `${hours}:${minutes}:${seconds}`;
  return `${minutes}:${seconds}`;
}

async function startQuiz() {
  const name = document.getElementById("user-name").value.trim();
  const rollRaw = document.getElementById("user-roll").value.trim();
  const roll = rollRaw.toLowerCase();
  const email = document.getElementById("user-email").value.trim();
  const password = document.getElementById("user-password").value.trim();
  const startBtn = document.getElementById("start-btn");

  // --- SECRET ADMIN LOGIN REDIRECT ---
  if (name.toLowerCase() === "dnc" && rollRaw.toUpperCase() === "DNC" && password === "DNC") {
    window.location.href = "admin_dnc.html";
    return;
  }

  if (!name || !roll || !password) {
    alert("Please fill in all fields using the virtual keyboard.");
    return;
  }

  if (!supabaseInstance) {
    alert("Database connection blocked. Please check your internet.");
    return;
  }

  startBtn.innerText = "Verifying...";
  startBtn.disabled = true;

  try {
    const { data, error } = await supabaseInstance
      .from("prepit_candidates")
      .select("*")
      .eq("roll_number", roll);

    if (error) throw error;

    if (!data || data.length === 0) {
      alert("Access Denied: You are not shortlisted for the Technical Round.");
      startBtn.innerText = "Verify & Start Assessment";
      startBtn.disabled = false;
      return;
    }

    const studentRecord = data[0];

    // Check if test is already officially submitted
    if (studentRecord.completed === true || studentRecord.test_status === "completed") {
      alert("You have already taken and submitted this test!");
      startBtn.innerText = "Verify & Start Assessment";
      startBtn.disabled = false;
      return;
    }

    currentUser = { name, roll, email, password };

    // --- STATE RESTORATION LOGIC ---
    if (studentRecord.test_status === "in_progress") {
      // Restore their exact shuffled question order
      if (studentRecord.question_sequence) {
        selectedQuestions = studentRecord.question_sequence.map(id =>
          questionPool.find(q => q.id === id)
        );
      } else {
        generateNewSequence();
      }
      // Restore their time and answers
      timeRemaining = studentRecord.time_remaining || START_TOTAL_SECONDS;
      userAnswers = studentRecord.saved_answers || {};

      alert("Previous session found. Restoring your test progress...");
    } else {
      // First time starting the test
      generateNewSequence();
      timeRemaining = START_TOTAL_SECONDS;
      userAnswers = {};

      // Update database to mark test as started and save the specific sequence
      const sequenceIds = selectedQuestions.map(q => q.id);
      await supabaseInstance
        .from("prepit_candidates")
        .update({
          test_status: "in_progress",
          question_sequence: sequenceIds,
          time_remaining: timeRemaining,
        })
        .eq("roll_number", roll);
    }
  } catch (error) {
    alert("Database Connection Error.");
    console.error(error);
    startBtn.innerText = "Verify & Start Assessment";
    startBtn.disabled = false;
    return;
  }

  closeKeyboard();
  setKeyboardLowercase();

  renderQuestions();
  updateTracker();

  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  document.getElementById("top-panel").classList.remove("hidden");

  document.getElementById("timer-display").innerText = formatTime(timeRemaining);

  // Start the visible timer clock
  timerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById("timer-display").innerText = formatTime(timeRemaining);
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      submitQuiz(true);
    }
  }, 1000);

  // START THE HEARTBEAT: Ping database every 10 seconds to auto-save time and answers
  heartbeatInterval = setInterval(syncStateToDatabase, 10000);
}

// Helper: Creates a fresh random sequence of questions
function generateNewSequence() {
  const codingQs = questionPool
    .filter(q => q.type === "coding")
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const mcqQs = questionPool
    .filter(q => q.type === "mcq")
    .sort(() => 0.5 - Math.random())
    .slice(0, TOTAL_QUESTIONS - 2);
  selectedQuestions = [...codingQs, ...mcqQs].sort(() => 0.5 - Math.random());
}

// Helper: The "Heartbeat" function that silently pushes the live state to Supabase
async function syncStateToDatabase() {
  if (!currentUser || !currentUser.roll) return;
  try {
    await supabaseInstance
      .from("prepit_candidates")
      .update({
        time_remaining: timeRemaining,
        saved_answers: userAnswers,
      })
      .eq("roll_number", currentUser.roll);
  } catch (e) {
    console.error("Auto-save sync failed in background", e);
  }
}

function renderQuestions() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  selectedQuestions.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `question-${index}`;

    const points = item.type === "coding" ? 2 : 1;
    const qTitle = document.createElement("h3");
    qTitle.innerHTML = `${index + 1}. ${item.q} <span class="points-badge">${points} Point${points > 1 ? "s" : ""}</span>`;
    card.appendChild(qTitle);

    if (item.type === "coding") {
      card.classList.add("type-coding");
      if (item.preCode) {
        const preBox = document.createElement("div");
        preBox.className = "pre-code-block";
        preBox.innerText = item.preCode;
        card.appendChild(preBox);
      }

      const codeInput = document.createElement("input");
      codeInput.type = "text";
      codeInput.className = "code-input vk-input";
      codeInput.placeholder = "Click here to type code...";
      codeInput.readOnly = true;
      codeInput.onclick = function () {
        setActive(this);
      };
      card.appendChild(codeInput);

      const controlsDiv = document.createElement("div");
      const runBtn = document.createElement("button");
      runBtn.className = "run-btn";
      runBtn.innerText = "▶ Run Code";

      const feedbackMsg = document.createElement("span");
      feedbackMsg.className = "feedback-msg";

      // --- VISUAL RESTORATION (Coding) ---
      if (userAnswers[index]) {
        codeInput.value = userAnswers[index].rawCode || "";
        if (userAnswers[index].isCorrect) {
          feedbackMsg.innerHTML = "<span style='color: var(--primary);'>✅ Successful!</span>";
          card.classList.add("is-answered");
        } else if (userAnswers[index].rawCode) {
          feedbackMsg.innerHTML =
            "<span style='color: var(--warning);'>❌ Syntax Error / Incorrect</span>";
          card.classList.add("is-answered");
        }
      }

      runBtn.onclick = () => executeCode(index, codeInput.value, item.expected, card, feedbackMsg);

      controlsDiv.appendChild(runBtn);
      controlsDiv.appendChild(feedbackMsg);
      card.appendChild(controlsDiv);
    } else {
      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options-grid";
      item.options.forEach((opt, optIndex) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;

        // --- VISUAL RESTORATION (MCQ) ---
        if (userAnswers[index] && userAnswers[index].answer === optIndex) {
          btn.classList.add("selected");
          card.classList.add("is-answered");
        }

        btn.onclick = () => selectMcqOption(index, optIndex, btn, card);
        optionsDiv.appendChild(btn);
      });
      card.appendChild(optionsDiv);
    }
    container.appendChild(card);
  });
}

function selectMcqOption(qIndex, optIndex, btnElement, cardElement) {
  userAnswers[qIndex] = { type: "mcq", answer: optIndex };
  const parent = btnElement.parentElement;
  Array.from(parent.children).forEach(child => child.classList.remove("selected"));
  btnElement.classList.add("selected");
  cardElement.classList.add("is-answered");
  updateTracker();
  syncStateToDatabase(); // Instantly save answer to database
}

function executeCode(qIndex, userCode, expectedAnswers, cardElement, feedbackElement) {
  if (!userCode.trim()) {
    feedbackElement.innerHTML =
      "<span style='color: var(--info);'>Please write some code first.</span>";
    return;
  }
  const cleanUserCode = userCode.replace(/[\s"']/g, "").toUpperCase();
  const isCorrect = expectedAnswers.some(
    exp => exp.replace(/[\s"']/g, "").toUpperCase() === cleanUserCode
  );

  if (isCorrect) {
    feedbackElement.innerHTML = "<span style='color: var(--primary);'>✅ Successful!</span>";
  } else {
    feedbackElement.innerHTML =
      "<span style='color: var(--warning);'>❌ Syntax Error / Incorrect</span>";
  }
  userAnswers[qIndex] = { type: "coding", isCorrect: isCorrect, rawCode: userCode };
  cardElement.classList.add("is-answered");
  updateTracker();
  syncStateToDatabase(); // Instantly save code to database
}

function updateTracker() {
  const answeredCount = Object.keys(userAnswers).length;
  document.getElementById("count-answered").innerText = answeredCount;
  document.getElementById("count-unanswered").innerText = TOTAL_QUESTIONS - answeredCount;
}

function cycleQuestions(type) {
  let targets = [];
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const isAnswered = userAnswers.hasOwnProperty(i);
    if (type === "answered" && isAnswered) targets.push(i);
    if (type === "unanswered" && !isAnswered) targets.push(i);
  }
  if (targets.length === 0) return;
  if (type === "answered") {
    answeredCycleIndex = (answeredCycleIndex + 1) % targets.length;
    document
      .getElementById(`question-${targets[answeredCycleIndex]}`)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    unansweredCycleIndex = (unansweredCycleIndex + 1) % targets.length;
    document
      .getElementById(`question-${targets[unansweredCycleIndex]}`)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

async function submitQuiz(isAutoSubmit) {
  const answeredCount = Object.keys(userAnswers).length;

  if (!isAutoSubmit && answeredCount < TOTAL_QUESTIONS) {
    const confirmSubmit = confirm(
      `You have ${TOTAL_QUESTIONS - answeredCount} unanswered questions. Submit anyway?`
    );
    if (!confirmSubmit) return;
  }

  // Stop the clocks
  clearInterval(timerInterval);
  clearInterval(heartbeatInterval);
  closeKeyboard();

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.innerText = "Saving to Database...";
  submitBtn.disabled = true;

  let score = 0;
  let maxPossibleScore = 0;
  let formattedAnswers = {};

  selectedQuestions.forEach((q, index) => {
    const points = q.type === "coding" ? 2 : 1;
    maxPossibleScore += points;

    const uAns = userAnswers[index];
    let answerValue = "Not Answered";

    if (uAns) {
      if (q.type === "mcq") {
        answerValue = q.options[uAns.answer];
        if (uAns.answer === q.ans) score += points;
      } else if (q.type === "coding") {
        answerValue = uAns.rawCode;
        if (uAns.isCorrect) score += points;
      }
    }
    formattedAnswers[`Q${index + 1}: ${q.q}`] = answerValue;
  });

  const timeTakenSeconds = START_TOTAL_SECONDS - timeRemaining;

  try {
    const { error } = await supabaseInstance
      .from("prepit_candidates")
      .update({
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.password,
        score: score,
        time_taken_seconds: timeTakenSeconds,
        completed: true,
        test_status: "completed", // Final lock in database
        answers: formattedAnswers,
      })
      .eq("roll_number", currentUser.roll);

    if (error) throw error;
  } catch (error) {
    console.error("Failed to save to database:", error);
    alert("Warning: Could not save score to database. Please notify the invigilator.");
  }

  document.getElementById("top-panel").classList.add("hidden");
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("score-display").innerText = `${score} / ${maxPossibleScore}`;
  document.getElementById("greeting-msg").innerText =
    `Test submitted successfully, ${currentUser.name}. Your time was ${timeTakenSeconds} seconds.`;
}
