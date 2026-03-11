let alarms = [];

// HORLOGE
const time = document.getElementById("time");
const date = document.getElementById("date");

// SECTIONS
const section1 = document.querySelector(".sect1");
const section2 = document.querySelector(".sect2");

// FORMULAIRE
const alarmTime = document.getElementById("alarm-time");
const alarmText = document.getElementById("alarm-text");

// BOUTONS
const toggleBtn = document.getElementById("toggle-btn");
const saveAlarm = document.getElementById("save-alarm");
const cancelAlarm = document.getElementById("cancel-alarm");
const deleteAlarm = document.getElementById("delete-alarm");
const dayButtons = document.querySelectorAll(".jour");

// LISTE

const alarmList = document.getElementById("alarm-list");

// recuperer les alarmes depuis le localstorage
const savedAlarms = JSON.parse(localStorage.getItem("alarms")) || [];


section1.style.display = "none";
section2.style.display = "flex";

alarms = savedAlarms;
renderAlarms();

// Adapter l`heure en fonction de celui du systeme du pc
window.onload = function(){
    displayTime();
}
setInterval(displayTime, 1000);


const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};

const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};

function displayTime() {

    let now = new Date();

    time.textContent = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`

    date.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

}

// rendons le toggle-btn fonctionnelle
toggleBtn.addEventListener("click", ()=>{
   section1.style.display = "flex";
   section2.style.display = "none";

});

// activer les jours pour l`alarme
dayButtons.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        btn.classList.toggle("active"); // toggle active au clic
    });
});

// rendons les boutons enregistrer et annuler fonctionnel
saveAlarm.addEventListener("click", ()=>{
    
    const timeValue = alarmTime.value;
    const textValue = alarmText.value;
    let selectedDays = [];

    dayButtons.forEach(btn =>{
       if(btn.classList.contains("active")) {
            selectedDays.push(btn.textContent);
       }
    });

    if(timeValue === ""){
        alert("Choisissez une heure");
        return;
    }

    // creons l`objet alarme
    let alarm ={
        time: timeValue,
        text: textValue,
        days: selectedDays,
        active: true
    };

    alarms.unshift(alarm);

    // sauvegarder dans le localstorage
    localStorage.setItem("alarms", JSON.stringify(alarms));

    // afficher les alarmes
    renderAlarms();

    // Ici on revient à la section 2
    section1.style.display = "none"; 
    section2.style.display = "flex"; 

    //  réinitialiser le formulaire
    alarmTime.value = "";
    alarmText.value = "";
    dayButtons.forEach(btn => btn.classList.remove("active"));
});


// afficher les alarmes programmées dans la page

function renderAlarms() {
    alarmList.innerHTML = ""; // vider la liste avant d'ajouter

    if (alarms.length === 0) {
        alarmList.innerHTML = "<p>vide</p>";
        return;
    }

    alarms.forEach((alarm, index) => {
        const alarmDiv = document.createElement("div");
        alarmList.style.width = "auto";    
        alarmList.style.maxHeight = "auto";    
        alarmList.style.overflowY = "auto";     
        alarmList.style.backgroundColor = "#fff"; 
        alarmDiv.classList.add("alarm-item");
        alarmDiv.style.display = "flex";
        alarmDiv.style.justifyContent = "space-between";
        alarmDiv.style.alignItems = "center";
        alarmDiv.style.padding = "10px";
        alarmDiv.style.marginBottom = "10px";
    

        // partie gauche : heure, texte et jours
        const leftDiv = document.createElement("div");
        leftDiv.style.display = "flex";
        leftDiv.style.flexDirection = "column";

        const timeEl = document.createElement("h3");
        timeEl.style.padding = "5px";
        timeEl.textContent = alarm.time;

        const textEl = document.createElement("p");
        textEl.style.fontSize = "10px"
        textEl.textContent = alarm.text;

        const daysEl = document.createElement("small");
        daysEl.textContent = alarm.days.join(", ");

        leftDiv.appendChild(timeEl);
        leftDiv.appendChild(textEl);
        leftDiv.appendChild(daysEl);

        // partie droite : container pour boutons ON/OFF 
        const rightDiv = document.createElement("div");
        rightDiv.style.display = "flex";
        rightDiv.style.alignItems = "center";

        // créer le switch
const switchLabel = document.createElement("label");
switchLabel.classList.add("switch");

const switchInput = document.createElement("input");
switchInput.type = "checkbox";
switchInput.classList.add("switch_input");
switchInput.checked = alarm.active;

const switchSlider = document.createElement("span");
switchSlider.classList.add("slider");

// toggle l'état de l'alarme quand on clique sur le switch
switchInput.addEventListener("change", () => {
    alarm.active = switchInput.checked;
    localStorage.setItem("alarms", JSON.stringify(alarms));
    renderAlarms();
});

// ajouter input + slider au label
switchLabel.appendChild(switchInput);
switchLabel.appendChild(switchSlider);

// ajouter le switch dans rightDiv
rightDiv.appendChild(switchLabel);

        

        

        // cliquer sur l'alarme pour modifier
        leftDiv.addEventListener("click", () => {
            section1.style.display = "flex";
            section2.style.display = "none";

            alarmTime.value = alarm.time;
            alarmText.value = alarm.text;
            dayButtons.forEach(btn => {
                if (alarm.days.includes(btn.textContent)) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });

            // on supprime l'alarme actuelle pour la remplacer lors de la sauvegarde
            alarms.splice(index, 1);
        });

        // ajouter gauche + droite au container principal
        alarmDiv.appendChild(leftDiv);
        alarmDiv.appendChild(rightDiv);

        // ajouter au DOM
        alarmList.appendChild(alarmDiv);
    });
}
   
      


// boutons supprimer
deleteAlarm.addEventListener("click", () => {
    // revenir à la section2
    section1.style.display = "none";
    section2.style.display = "flex";

    // vider le formulaire
    alarmTime.value = "";
    alarmText.value = "";
    dayButtons.forEach(btn => btn.classList.remove("active"));

    // sauvegarder la liste (alarme déjà supprimée lors du click pour modifier)
    localStorage.setItem("alarms", JSON.stringify(alarms));
    renderAlarms();
});


// boutons annuler
cancelAlarm.addEventListener("click", () => {
    // Cacher la section de création
    section1.style.display = "none";

    // Afficher la liste des alarmes
    section2.style.display = "flex";

    // Réinitialiser le formulaire
    alarmTime.value = "";
    alarmText.value = "";
    dayButtons.forEach(btn => btn.classList.remove("active"));
});

