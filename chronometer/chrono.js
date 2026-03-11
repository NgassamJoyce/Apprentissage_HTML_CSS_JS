// les variables dont on a besoin
let seconde = 0;
let isRunning = false;
let interval

// initialiser les variables quand la page se charge
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timer = document.getElementById("timer");
const second = document.getElementById("second");
const statusText = document.getElementById("status-text");
const statusCircle = document.getElementById("status-circle");

// fonction d`affichage 
function updateTimer(){
  
  const hrs=String(Math.floor(seconde/3600)).padStart(2,"0");
  const mins=String(Math.floor((seconde % 3600)/60)).padStart(2,"0");
  const secs=String(seconde % 60).padStart(2,"0");
  timer.textContent = `${hrs}:${mins}`;
  second.textContent = `.${secs}`;
}

// fonction du bouton start
startBtn.addEventListener("click", ()=>{
  if(!isRunning){
     interval = setInterval(() =>{
       seconde++;
       updateTimer();
       
     },1000);
     isRunning = true;
     statusText.textContent = "en cours";
     statusCircle.style.backgroundColor = "green"; 
  }
});

// fonction du bouton stop
stopBtn.addEventListener("click", ()=>{
   clearInterval(interval);
   isRunning = false;
   statusText.textContent = "pause";
   statusCircle.style.backgroundColor = "red"; 
});


// fonction du bouton reset
resetBtn.addEventListener("click", ()=>{
   clearInterval(interval);
   isRunning = false;
   seconde = 0;
   updateTimer();
    statusText.textContent = "prêt";
    statusCircle.style.backgroundColor = "orange"; 
});

updateTimer();

