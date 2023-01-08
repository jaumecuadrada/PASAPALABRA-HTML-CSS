import { questions1, questions2, questions3, questions4 } from "./questions.js";

const arrayletters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let currentIndex = 0;
let letter2;
let first = true;
let firstStarted = false;
let allQuestionsAnswered = false;
let showQuestionsExecuted = false;
let userScore;
let userName;

const sendWord = document.querySelector("#sendWord");
const pasapalabra = document.querySelector("#pasapalabra");
const menuPlay = document.getElementById("menuPlay");
const menuInstructions = document.getElementById("menuInstructions");
const menuRanking = document.getElementById("menuRanking");
const menuExit = document.getElementById("menuExit");
const alphabetElements = document.querySelectorAll(".alphabet");
const timerElement = document.getElementById("timer");
const startTimerButton = document.getElementById("startTimer");

const questions = document.querySelectorAll("questions");
const letterTitles = document.querySelectorAll("letterTitles");

const showRosco = () => {
  restartRosco();
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("rosco").classList.remove("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("aside").classList.remove("hidden");
  document.getElementById("score").classList.add("hidden");
  showQuestions();
  firstStarted = true;
};

const showTimer = () => {
  document.getElementById("titol").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  if (first) {
    document.getElementById("showTimer").classList.remove("hidden");
  }
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("score").classList.add("hidden");
  first = false;
};

const showInstructions = () => {
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("instructions").classList.remove("hidden");
  document.getElementById("rosco").classList.add("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("aside").classList.add("hidden");
  document.getElementById("score").classList.add("hidden");
  first = true;
  restartRosco();
};

const showRanking = () => {
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("rosco").classList.add("hidden");
  document.getElementById("titol").classList.add("hidden");
  document.getElementById("rankingTable").classList.remove("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("aside").classList.add("hidden");
  document.getElementById("score").classList.add("hidden");
  first = true;
  restartRosco();
};

const showExit = () => {
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("rosco").classList.add("hidden");
  document.getElementById("titol").classList.add("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.remove("hidden");
  document.getElementById("aside").classList.add("hidden");
  document.getElementById("score").classList.add("hidden");
  first = true;
  restartRosco();
};

const endGame = () => {
  addScores();
  sortTable();
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("rosco").classList.add("hidden");
  document.getElementById("titol").classList.add("hidden");
  document.getElementById("rankingTable").classList.remove("hidden");
  document.getElementById("score").classList.remove("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("aside").classList.add("hidden");
  document.getElementById("userScore").innerHTML = userScore;
  first = true;
  restartRosco();
};

const showQuestions = (event) => {
  if (event) {
    event.preventDefault();
  }
  if (currentIndex === questions1.length) {
    currentIndex = 0;
  }
  if (currentIndex === 0 && !firstStarted) {
    document.getElementById("a").classList.add("borderSelect");
  }

  if (questions1[currentIndex].status === false) {
    document.getElementById("letterTitles").textContent =
      questions1[currentIndex].question;
  } else {
    for (let u = currentIndex; u < questions1.length; u++) {
      if (questions1[currentIndex].status === true) {
        currentIndex++;
      }
    }
    if (currentIndex < 27) {
      document.getElementById("letterTitles").textContent =
        questions1[currentIndex].question;
    }
  }
};

const checkAnswer = () => {
  restartBorders();
  let answer = document.getElementById("inputAnswer").value;
  let letter;
  let auxiliarIndex = 0;
  letter = arrayletters[currentIndex];
  letter2 = arrayletters[currentIndex + 1];
  if (currentIndex === 26) {
    for (let i = 0; i < questions1.length; i++) {
      if (questions1[i].status === false) {
        auxiliarIndex = i;
        break;
      }
    }
    letter2 = arrayletters[auxiliarIndex];
  }
  document.getElementById(`${letter2}`).classList.add("borderSelect");
  if (answer === "pasapalabra") {
    //passWord();
  }
  if (answer === "end") {
    endGame();
  }
  if (questions1[currentIndex].answer === answer) {
    console.log("paraula encertada");
    console.log(letter);
    document.getElementById(`${letter}`).classList.add("green");
    document.getElementById(`${letter}`).style.backgroundColor = "green";
    questions1[currentIndex].status = true;
    userScore = userScore + 1000;
  } else {
    if (answer !== "pasapalabra") {
      console.log("paraula errada");
      document.getElementById(`${letter}`).classList.add("red");
      document.getElementById(`${letter}`).style.backgroundColor = "red";
      questions1[currentIndex].status = true;
      userScore = userScore - 100;
    }
  }
  document.getElementById("inputAnswer").value = "";
  currentIndex++;
  showQuestions();
};

const restartRosco = () => {
  for (let i = 0; i < questions1.length; i++) {
    questions1[i].status = false;
  }
  restartBorders();
  firstStarted = false;
  userName = "";
  userScore = 0;
  currentIndex = 0;
  stopTimer();
  showQuestionsExecuted = false;
  alphabetElements.forEach((element) => {
    element.style.backgroundColor = "black";
  });
  currentIndex = 0;
};

const restartBorders = () => {
  alphabetElements.forEach((element) => {
    element.classList.remove("borderSelect");
  });
};

const gameTimer = () => {
  const tick = () => {
    timerElement.innerHTML = time;
    time--;

    if (time === 0) {
      clearInterval(timer);
    }
  };

  let time = 120;

  const timer = setInterval(tick, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};

const passWord = () => {
  let letter;
  let currentAux = currentIndex;
  restartBorders();
  if (currentAux === 26) {
    currentIndex = 0;
    currentAux = 0;
    for (let u = currentAux; u < questions1.length; u++) {
      if (questions1[currentAux].status === true) {
        currentAux++;
      }
    }
    letter = arrayletters[currentAux];
    document.getElementById(`${letter}`).classList.add("borderSelect");
  } else {
    for (let u = currentAux; u < questions1.length - 1; u++) {
      if (questions1[currentAux + 1].status === true) {
        currentAux++;
      }
    }
    if (currentAux === 26) {
      currentAux = 0;
      for (let u = currentAux; u < questions1.length; u++) {
        if (questions1[currentAux].status === true) {
          currentAux++;
        }
      }
      letter = arrayletters[currentAux + 1];
      document.getElementById(`${letter}`).classList.add("borderSelect");
    } else {
      letter = arrayletters[currentAux + 1];
      document.getElementById(`${letter}`).classList.add("borderSelect");
    }
    currentIndex++;
  }
  showQuestions();
};

const checkAllIsAnswered = (event) => {
  if (event) {
    event.preventDefault();
  }
  const numberOfQuestionsAnswered = questions1.reduce((accum, currentVal) => {
    if (currentVal.status === true) {
      const acumulador = accum + 1;
      return acumulador;
    } else {
      return accum;
    }
  }, 0);

  if (numberOfQuestionsAnswered === questions1.length) {
    allQuestionsAnswered = true;
    endGame();
  }
};

const addScores = () => {
  let newRow = document.createElement("tr");

  // Crear las celdas de la fila
  let posCell = document.createElement("td");
  posCell.innerHTML = "5";

  let nameCell = document.createElement("td");
  nameCell.innerHTML = userName;

  let scoreCell = document.createElement("td");
  scoreCell.innerHTML = userScore;

  // Agregar las celdas a la fila
  newRow.appendChild(posCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(scoreCell);

  // Agregar la fila a la tabla
  document.getElementById("rankingTable").appendChild(newRow);
};

function sortTable() {
  // Obtener todas las filas de la tabla (excepto la fila de encabezado)
  var rows = Array.from(
    document.querySelectorAll("#rankingTable tr:not(:first-child)")
  );

  // Ordenar las filas por puntación (de mayor a menor)
  rows.sort(function (row1, row2) {
    var score1 = parseInt(row1.querySelector("td:last-child").innerHTML);
    var score2 = parseInt(row2.querySelector("td:last-child").innerHTML);
    return score2 - score1;
  });

  // Remover todas las filas de la tabla
  rows.forEach(function (row) {
    row.parentNode.removeChild(row);
  });

  rows.forEach(function (row, index) {
    row.querySelector("td:first-child").innerHTML = index + 1;
    document.getElementById("rankingTable").appendChild(row);
  });
  document.getElementById("nameInput").value = "";
}

const getName = () => {
  userName = document.getElementById("nameInput").value;
};

menuPlay.addEventListener("click", showTimer);
menuInstructions.addEventListener("click", showInstructions);
menuRanking.addEventListener("click", showRanking);
menuExit.addEventListener("click", showExit);
pasapalabra.addEventListener("click", passWord);
sendWord.addEventListener("click", checkAnswer);
sendWord.addEventListener("click", checkAllIsAnswered);
startTimerButton.addEventListener("click", gameTimer);
startTimerButton.addEventListener("click", showRosco);
startTimerButton.addEventListener("click", getName);
