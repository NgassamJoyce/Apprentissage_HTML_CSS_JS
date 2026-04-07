import { useState } from "react";  


// cette fonction affiche un bouton avec soit x soit o ou rien 
// onSquareClick: gere le clic du bouton ie quand on clique sur le bouton il se declenche

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// gere l`etat du jeu , gere les clics, squares: affiche les 9 cases et le status
function Board({xIsNext, squares, onPlay, scores}) {
  
  // quand on clique sur une case (square[i]) si elle contient deja : o ou x il ne se passe rien.
  // si qlq a gagner il ne se passe rien 
  // ou bien on copie le tableau, on place X ou O et on appele : Onplay
  function handleClick(i) {  

    if(squares[i] || calculateWinner(squares)) {
      return;

    }
    
    // en react on ne modifie jamais directement un etat ,   slice(): cree une copie du tableau.

    const nextSquares = squares.slice(); // ou const nextSquares = [...squares];

    if (xIsNext) {

      nextSquares[i] = 'X';

    }else{
      nextSquares[i] = 'O';
    }
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if(winner){
    status = "winner: " + winner;
  }else{
    status = "joueur " + (xIsNext ? " X" : " O") + " joue";
  }

  return (
    <section className="sect1">

      <div className="score">
         
        <div className={`play1 ${xIsNext ? 'active' : ''}`}>
          <span className="pionX">X</span>
          <h3>joueur 1</h3>
          <span className="score1">{scores.X}</span>
        </div>

        <div className={`play1 ${!xIsNext ? 'active' : ''}`}>
          <span className="pionO">O</span>
          <h3> joueur 2</h3>
          <span className="score2">{scores.O}</span>
        </div>

      </div>

      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      
    </section>
  );
}

function Game(){
  
  // toutes les versions de la grille comme on va commencer le jeux
  // fill remplis le tableau avec une valeur
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // useState retourne toujours un tableau a 2 elements
  // [valeurActuelle,  fonctionPourModifier : sa change le currentMove jusqu`a 9 max et sa dit a react reaffiche le composant]
  const [currentMove, setCurrentMove] = useState(0);

  // currentMove(coups) c`est le nombre de coups joués 
  // 1er button currentMove = 0 , et 0 % 2 = 0  ce qui est vrai donc X s`affiche .
  const xIsNext = currentMove % 2 === 0;

  // currentSquares représente l'état actuel de la grille au debut , comme on debut c`est vide donc c`est null,    currentMove: combien de fois on a cliquer
  const currentSquares = history[currentMove];

  // l`etat du score
  const [scores, setScores] = useState({ X: 0, O: 0 });




  function handlePlay(nextSquares){

    // lorsque tu joue tu annule ton action precedent nextHistory supprime les anciens futurs coups et cree une nouvelle suite
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; 
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // verification du gagnant
    const winner = calculateWinner(nextSquares);

    if(winner){
      setScores(prevScores => ({ ...prevScores, [winner]: prevScores[winner] + 1 }));
    }

  }

  // annule la derniere action faites
  function handleUndo() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  // réinitialise le jeu ou permet de rejouer le jeux
  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return(
     <>
      <App />
      <div className="game">

        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} scores={scores} />
        </div>

        <div className="game-info">

          <button className="rejouer" onClick={handleReset}>
            <img src="./src/image/replay_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Rejouer" />
            <span>Rejouer</span>
          </button>

          <button  className="Annuler" onClick={handleUndo}>
             <img src="./src/image/repeat_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
             <span>Annuler</span>
          </button>

        </div>

      </div>
    </>
     
  );

}

function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++) {

      const [a, b, c] = lines[i];

      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
        return squares[a];
      }
    }  

    return null;
}

function App(){
  return (
    <header className="head">
      <h2>TICx - TACo</h2>
      <p>Le jeux classique version ultime</p>
    </header>
  );
}



export default Game;   // export rend la fonction accessible en dehors du fichier,    default: dis a d`autre fichier que c`est la fonction principale du fichier.
