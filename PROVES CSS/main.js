import { questions1, questions2, questions3, questions4 } from "./questions.js";

const arrayletters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let timeLeft = 150;
let currentIndex = 0;
let letter2;
let first=true;
let firstStarted=false;
let allQuestionsAnswered = false;
let showQuestionsExecuted = false;

const sendWord = document.querySelector("#sendWord");
const pasapalabra = document.querySelector("#pasapalabra");
const menuPlay = document.getElementById("menuPlay");
const menuInstructions = document.getElementById("menuInstructions");
const menuRanking = document.getElementById("menuRanking");
const menuExit = document.getElementById("menuExit");
const alphabetElements = document.querySelectorAll(".alphabet");
const timerElement = document.getElementById("timer");
const startTimerButton = document.getElementById("startTimer");

timerElement.innerHTML = timeLeft;

const questions = document.querySelectorAll("questions");
const letterTitles = document.querySelectorAll("letterTitles");

const showRosco = () => {
  restartRosco();
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("rosco").classList.remove("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("aside").classList.remove("hidden");
  showQuestions();
  firstStarted=true;
};

const showTimer = () => {
  document.getElementById("titol").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  if (first){
  document.getElementById("showTimer").classList.remove("hidden");
  };
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.add("hidden");
  first=false;
}

const showInstructions = () => {
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("instructions").classList.remove("hidden");
  document.getElementById("rosco").classList.add("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.add("hidden");
  document.getElementById("aside").classList.add("hidden");
  first=true;
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
  first=true;
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
  first=true;
  restartRosco();
};

const endGame = () => {
  document.getElementById("showTimer").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("rosco").classList.add("hidden");
  document.getElementById("titol").classList.add("hidden");
  document.getElementById("rankingTable").classList.add("hidden");
  document.getElementById("exit").classList.remove("hidden");
  document.getElementById("aside").classList.add("hidden");
  first=true;
  restartRosco();
};

const showQuestions = (event) => {
  if (event) {
    event.preventDefault();
  }
  if (currentIndex === questions1.length) {
    currentIndex = 0;
  }
  if (currentIndex===0 && !firstStarted){
  document.getElementById("a").classList.add("borderSelect");
  }
  
  if (questions1[currentIndex].status === false) {
    document.getElementById("letterTitles").textContent =
      questions1[currentIndex].question;
  } else {
    
    for (let u=currentIndex;u<questions1.length;u++){
      if (questions1[currentIndex].status === true) {
        currentIndex++;
      }
    }
    if (currentIndex<27){
    document.getElementById("letterTitles").textContent =
      questions1[currentIndex].question;
    }
  }
};

const checkAnswer = () => {
  restartBorders();
  let answer = document.getElementById("inputAnswer").value;
  let letter;
  let auxiliarIndex=0;
  letter = arrayletters[currentIndex];
  letter2= arrayletters[currentIndex+1];
  console.log("index = "+currentIndex);
  if (currentIndex===26){
    for (let i=0;i<questions1.length;i++){
      if (questions1[i].status===false){
        auxiliarIndex=i;
        break;
      }
    }
  console.log("AJJAJAJAJA"+auxiliarIndex);
  letter2=arrayletters[auxiliarIndex];
  console.log("currentIndex: " + currentIndex)
  console.log("letter2: "+letter2)
  }
  document.getElementById(`${letter2}`).classList.add("borderSelect");
  if (answer === "pasapalabra"){
    //passWord();
  }
  if (answer === "end"){
    endGame();
  }
  if (questions1[currentIndex].answer === answer) {
    console.log("paraula encertada");
    console.log(letter);
    document.getElementById(`${letter}`).classList.add("green");
    document.getElementById(`${letter}`).style.backgroundColor = "green";
    questions1[currentIndex].status = true;
  } else {
    if (answer !== "pasapalabra"){
    console.log("paraula errada");
    document.getElementById(`${letter}`).classList.add("red");
    document.getElementById(`${letter}`).style.backgroundColor = "red";
    questions1[currentIndex].status = true;
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
  resetTimer();
  firstStarted=false;
  currentIndex = 0;
  showQuestionsExecuted = false;
  alphabetElements.forEach((element) => {
    element.style.backgroundColor = "black";
  });
  currentIndex = 0;
};

const restartBorders = () =>{
  alphabetElements.forEach((element) => {
    element.classList.remove("borderSelect");
  });
}


const startTimer = () => {
  let timer = setInterval(function () {
    timerElement.innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft === -2) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
};

function resetTimer() {
  clearInterval(timer);
  timeLeft = 150;
  timerElement.innerHTML = timeLeft;
}

const passWord = () => {
  let letter;
  let currentAux=currentIndex;
  restartBorders();
  if (currentAux===26){
    currentIndex=0;
    currentAux=0
    for (let u=currentAux;u<questions1.length;u++){
      if (questions1[currentAux].status===true){
        currentAux++;
      }
    }
    letter = arrayletters[currentAux];
    document.getElementById(`${letter}`).classList.add("borderSelect");
  }else{
    for (let u=currentAux;u<questions1.length-1;u++){
      if (questions1[currentAux+1].status===true){
        currentAux++;
      }
    }
    if (currentAux===26){
    currentAux=0;
    for (let u=currentAux;u<questions1.length;u++){
      if (questions1[currentAux].status===true){
        currentAux++;
      }
    }
    letter = arrayletters[currentAux+1];  
    console.log('NYEC');
    document.getElementById(`${letter}`).classList.add("borderSelect");
    }else{
    letter = arrayletters[currentAux+1];  
    console.log(letter);
    document.getElementById(`${letter}`).classList.add("borderSelect");
    }
    currentIndex++;

  }
  console.log("PASAPALABRA INDEX:" + currentIndex)
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

menuPlay.addEventListener("click", showTimer);
menuInstructions.addEventListener("click", showInstructions);
menuRanking.addEventListener("click", showRanking);
menuExit.addEventListener("click", showExit);
pasapalabra.addEventListener("click", passWord);
sendWord.addEventListener("click", checkAnswer);
sendWord.addEventListener("click", checkAllIsAnswered);
startTimerButton.addEventListener("click", startTimer);
startTimerButton.addEventListener("click", showRosco);
