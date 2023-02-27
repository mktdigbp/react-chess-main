import './App.css';
import { useState } from 'react';
import {Chessboard} from 'react-chessboard'
import {Chess} from 'chess.js'
              
function App() {
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState({from: '', to: ''});
  const [myMove, setMyMove] = useState("");
//Let's perform a function on the game state 

function handleMyMove() {
  const settt = makeAMove();

    //illegal move 
  if(settt== null) return false
  //valid move 
  setTimeout(makeRandomMove, 200);
  return true;  
}
 
function setMove(source,target) {
  console.log("doz", currentMove)
  let move = null;
  console.log("move", source, target)
  safeGameMutate((game)=>{
    move = game.move({
      from:source,
      to: target,
      promotion:'q'
    })

    setCurrentMove({from: '', to: ''})

  //illegal move 
  if(move== null) return false
  //valid move 
  setTimeout(makeRandomMove, 200);
  return true;    
})
}

function safeGameMutate(modify){
  setGame((g)=>{
    const update = {...g}
    modify(update)
    return update;
  })
}

// 
function makeAMove() {
  const gameCopy = { ...game };
  const result = gameCopy.move(myMove);
  setGame(gameCopy);
  // setMyMove("");
  console.log("res",result)
  return result; // null if the move was illegal, the move object if the move was legal

  
  // //illegal move 
  // if(move== null) return false
  // //valid move 
  // setTimeout(makeRandomMove, 200);
  // return true;  
}


// Movement of computer
function makeRandomMove(){
  const possibleMove = game.moves();

  if(game.game_over() || game.in_draw() || possibleMove.length === 0) return;
  //select random move

  const randomIndex = Math.floor(Math.random() * possibleMove.length);

 //play random move 
 safeGameMutate((game)=>{
  console.log("possiblemove", possibleMove)
  console.log("game", game)
  const result = game.move(possibleMove[randomIndex]);
// move random
  console.log("resss", result)
  // console.log("random", possibleMove[randomIndex])
 })
}

//Perform an action when a piece is droped by a user
 
function onDrop(source,target){
  let move = null;
  console.log("move", source, target)
  safeGameMutate((game)=>{
    move = game.move({
      from:source,
      to: target,
      promotion:'q'
    })
})


  //illegal move 
  if(move== null) return false
  //valid move 
  setTimeout(makeRandomMove, 200);
  return true;
}
  return (
    <div className="app">
      <Chessboard 
      position={game.fen()}
      onPieceDrop ={onDrop}
      />
    
    <p>from:</p>
    <input value={currentMove.from} onChange={(e) => setCurrentMove({...currentMove, from: e.target.value})}/>
    <p>to:</p>
    <input value={currentMove.to} onChange={(e) => setCurrentMove({...currentMove, to: e.target.value})}/>
    <button type='button' onClick={() => setMove(currentMove.from, currentMove.to)}>Click 1</button>
    <br />
    <input value={myMove} onChange={(e) => setMyMove(e.target.value)}/>
    <button type='button' onClick={() => handleMyMove()}>Move</button>

    </div>
  );
}

export default App;