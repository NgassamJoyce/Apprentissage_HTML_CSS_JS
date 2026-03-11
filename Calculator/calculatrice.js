const touches = [...document.querySelectorAll('.bouton')];
const ecran = document.querySelector('.ecran');
const listekeycode = touches.map(touche => touche.dataset.key);

// on veux que lorsqu`on clique sur un element du clavier sa s`affiche sur l`ecran 

document.addEventListener('keydown', (e)=>{
    const valeur = e.keyCode.toString();
    calculer(valeur);
})


document.addEventListener('click', (e)=>{
    const valeur = e.target.dataset.key;
    calculer(valeur);
})

//fonction qui va recuperer le keycode de la touche "=" sur la quelle on va soit cliquer avec l`ecran , soit sur le clavier

const calculer = (valeur) =>{

    if(listekeycode.includes(valeur)){
        switch(valeur){
            // lorsqu`on appuis sur la touche supprimer 'C'
            case'8':
            ecran.textContent = "";
            break;
            
            // lorsqu`on appuis sur egale '='
            case'61':
            if(ecran.textContent.includes('/0')){
                alert('division par 0 impossible');
            }else{
                const calcul = eval(ecran.textContent);
                ecran.textContent = calcul;
            }
            break;

            default:
                const indexkeycode = listekeycode.indexOf(valeur);

                const touche = touches[indexkeycode];

                ecran.textContent+= touche.innerHTML;
        }
    }
}

window.addEventListener('error', (e) => {
    alert('une erreur est survenue dans votre calcul :' + e.message);
})