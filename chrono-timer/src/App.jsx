import React , {useState, useEffect} from "react";

function Chronometre(){

    // on commnence a 0 seconde
    const [time, setTime] = useState(0);

    // est ce que le chrono tourne ? false : non, true: oui
    const [isActive, setIsActive] = useState(false);

    // le chrono tourne vers le haut
    const [mode, setMode] = useState("chrono");

    const [dureeChoisie, setDureeChoisie] = useState(60);

    useEffect(() =>{

        let interval = null;
        // si le chrono est actif en marche
        if(isActive){
            // interval qui s`execute toutes les 1s
            interval = setInterval(() =>{

                if(mode === "chrono"){
                   setTime(prevTime => prevTime + 1);

                }else{
                    setTime(prevTime =>{
                        if(prevTime <= 1){
                            setIsActive(false);
                            return 0;
                        }
                        
                        return prevTime - 1;
                    })
                }
            }, 1000);
        }

        return() =>{
            if(interval) clearInterval(interval);
        }
    }, [isActive, mode]);


    const startchrono = () => {
        setIsActive(true);
    };
    
    const stopchrono = () => {
        setIsActive(false);
    };

    const resetchrono = () => {
        setIsActive(false);
        if(mode === "chrono"){
            setTime(0);
        } else{
            setTime(dureeChoisie);
        }
    };

    const activerChrono = () =>{
        setIsActive(false);
        setMode("chrono");
        setTime(0);
    };

    const activerMinuteur = () =>{
        setIsActive(false);
        setMode("minuteur");
        setTime(dureeChoisie);
    };

    const changerDuree = (event) =>{
        const nouvelleDuree = parseInt(event.target.value, 10);
        setDureeChoisie(nouvelleDuree);

        if(mode === "minuteur" && !isActive){
            setTime(nouvelleDuree);
        }
    };

    const formatTime = (secondes) => {
        const minutes = Math.floor(secondes / 60);
        const secs = secondes % 60;

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    const isDixDernieressecondes = mode === "minuteur" && time <= 10 && time > 0;

    return(
        <section className="sect-chrono">
            <h1 className="title">Chrono-Minuteur</h1>
           
            <div className={`chrono ${isDixDernieressecondes ? 'alerte-10s' : "" }`}>
               <span className="time">{formatTime(time)}</span>
            </div>
   
            {mode === "minuteur" && (
                <div className="duration">
                   <label htmlFor="">Durée :</label>
                   <input type="number" value={dureeChoisie} onChange={changerDuree} disabled={isActive} />
                   <span>secs</span>
                </div>

            )}

            {isDixDernieressecondes && (
                <div className="alert">{time} secondes restantes</div>
            )} 

            {mode === "minuteur" && time === 0 && (
               <div className="alert-final">Temps Ecoulé !</div>

            )}


            <div className="bouton">
                <button className="start" onClick={startchrono}><img src="public/play_arrow_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="start" /></button> 
                <button className="stop" onClick={stopchrono}><img src="public/pause_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="stop" /></button>
                <button className="reset" onClick={resetchrono}><img src="public/refresh_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="reset" /></button>
            </div>

            <div className="mode-boutons">
                <button className={`btn-mode-chrono ${mode === 'chrono' ? 'active' : ''}`} onClick={activerChrono}>
                    <span className="btn-text">Chronometre</span>
                    {mode === 'chrono' && <span className="active-light"></span>}
                </button>

                <button className={`btn-mode-min ${mode === 'minuteur' ? 'active' : ''}`} onClick={activerMinuteur}>
                    <span className="btn-text">Minuteur</span>
                    {mode === 'minuteur' && <span className="active-light"></span>}
                </button>
            </div>

        </section>
    )
}

export default Chronometre;