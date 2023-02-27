// import './App.css';
import { useState } from 'react';
// import {Chessboard} from 'react-chessboard'
// import FeatureBP from "./components/FeaturesBP"
import {Chess} from 'chess.js'
import ListRow from './components/ListRow/ListRow';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { getCurrentTime } from './helper/utils';
import { Chessboard } from 'react-chessboard';
import { useEffect } from 'react';

function App() {
  const [game, setGame] = useState(new Chess());
  const [myMove, setMyMove] = useState("");
  const [chessView, setChessView] = useState(false);
  const [width, setWidth] = useState(0); // check width size of the window

  // const [myMoveSet, setMyMoveSet] = useState({});
  // const [associateMove, setAssociateMove] = useState("");

  const [featuresSequel, setFeaturesSequel] = useState([]);
  // const [currentData, setCurrentData] = useState("");

  // width size
  const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};


  // 
  function handleMyMove(e) {
    e.preventDefault();
    const settt = makeAMove();
    console.log("end", settt)
    setMyMove(() => "")

    
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
        {
          color: result.color,
          flags: result.flags,
          from: result.from,
          piece: result.place,
          san: result.san,
          to: result.to,
          time: getCurrentTime(),
          turn: featuresSequel.length+1
        },        
        {
          color: settt.color,
          flags: settt.flags,
          from: settt.from,
          piece: settt.place,
          san: settt.san,
          to: settt.to,
          time: getCurrentTime(),
          turn: featuresSequel.length
        },
        ...featuresSequel,
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


  useEffect(() => {
		handleWindowSizeChange();
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);


  
  return (
    <div className="app">
      {
        chessView &&
        <Chessboard 
        position={game.fen()}
        boardWidth={width}
        boardOrientation={'white'}
        arePiecesDraggable={false}
        />
      }
    <div className='px-5'>

      {/* <p>from:</p>
      <input value={currentMove.from} onChange={(e) => setCurrentMove({...currentMove, from: e.target.value})}/>
      <p>to:</p>
      <input value={currentMove.to} onChange={(e) => setCurrentMove({...currentMove, to: e.target.value})}/>
      <button type='button' onClick={() => setMove(currentMove.from, currentMove.to)}>Click 1</button> */}
      <br />
      <form className='w-full bg-blue-100 flex' onSubmit={handleMyMove}>

      <input value={myMove} onChange={(e) => setMyMove(e.target.value)} className="border basis-full h-9" />
      <button type='button' onClick={(e) => handleMyMove(e)} className="h-9 px-5 block shrink-0">Bem Protege</button>
      </form>

      <div className='my-3'>
        <button type='button' onClick={() => setChessView(!chessView)} className="h-9 px-5 block shrink-0 border">View</button>
      </div>
      {/* <pre>{JSON.stringify(featuresSequel,null,1)}</pre> */}
      {/* <p>{width}</p> */}
      <ul className="divide-b-black bg-red-100 w-full">
          {featuresSequel.map((row, index) => {
            return <ListRow key={index} config={row} />;
          })}
        </ul>
      </div>
    </div>

  );
}

export default App;