import './App.css';
import { useState } from 'react';
// import {Chessboard} from 'react-chessboard'
import FeatureBP from "./components/FeaturesBP"
import {Chess} from 'chess.js'

function App() {
  const [game, setGame] = useState(new Chess());
  const [myMove, setMyMove] = useState("");
  // const [myMoveSet, setMyMoveSet] = useState({});
  const [associateMove, setAssociateMove] = useState("");

  const [featuresSequel, setFeaturesSequel] = useState([]);
  // const [currentData, setCurrentData] = useState("");

  // 
  function handleMyMove() {
    const settt = makeAMove();
    console.log("end", settt)

    
    // valid move
    if(settt == null) return false
    setTimeout(makeRandomMove(settt), 200);
    // const timer = setTimeout(makeRandomMove, 200);
    // clearTimeout(timer)
    // const xx = game.fen();
    // console.log("yah", xx)
    return true;
  }

  // associate chat bp
  function makeRandomMove(settt){
    console.log("chat protecao veicular", settt)
    const possibleMove = game.moves();

    //select random move
    if(game.game_over() || game.in_draw() || possibleMove.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMove.length);

    //play random move 
    safeGameMutate((game)=>{
      const result = game.move(possibleMove[randomIndex]);
      console.log("Associado", result)
      
      setFeaturesSequel([
        ...featuresSequel,
        {
          color: settt.color,
          flags: settt.flags,
          from: settt.from,
          piece: settt.place,
          san: settt.san,
          to: settt.to,
        },
        {
          color: result.color,
          flags: result.flags,
          from: result.from,
          piece: result.place,
          san: result.san,
          to: result.to,
        },
      ]);
    })
  }

  // 
  function safeGameMutate(modify) {
    setGame((g)=>{
      const update = {...g}
      modify(update)
      return update;
    })
  }

  // human chat bp
  function makeAMove() {
    const gameCopy = { ...game };
    const result = gameCopy.move(myMove);
    setGame(gameCopy);
    // setMyMoveSet(() =>result)
    // setFeaturesSequel([
    //   ...featuresSequel,
    //   {
    //     color: "b",
    //     flags: "b",
    //     from: "a7",
    //     piece: "p",
    //     san: "consultor",
    //     to: "a5",
    //   },
    // ]);

    console.log("BP",result)
    return result; // null if the move was illegal, the move object if the move was legal
  }

  
  return (
    <div className="app">
      {/* <Chessboard 
      position={game.fen()}
      onPieceDrop ={onDrop}
      /> */}
    <FeatureBP />
    {/* <p>from:</p>
    <input value={currentMove.from} onChange={(e) => setCurrentMove({...currentMove, from: e.target.value})}/>
    <p>to:</p>
    <input value={currentMove.to} onChange={(e) => setCurrentMove({...currentMove, to: e.target.value})}/>
    <button type='button' onClick={() => setMove(currentMove.from, currentMove.to)}>Click 1</button> */}
    <br />
    <input value={myMove} onChange={(e) => setMyMove(e.target.value)}/>
    <button type='button' onClick={() => handleMyMove()}>Move</button>
    <pre>{JSON.stringify(featuresSequel,null,1)}</pre>
    </div>
  );
}

export default App;