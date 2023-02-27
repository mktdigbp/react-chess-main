import React, { useState } from "react";
import ListRow from "../ListRow/ListRow";

const FeatureBP = () => {
  const [featuresSequel, setFeaturesSequel] = useState([]);
  const [currentData, setCurrentData] = useState("");

  //
  const handleSequel = () => {
    // setFeaturesSequel([
    //   ...featuresSequel,
    //   {
    //     color: "b",
    //     flags: "b",
    //     from: "a7",
    //     piece: "p",
    //     san: currentData,
    //     to: "a5",
    //   },
    // ]);

    const chatBP = [
      {
        color: "b",
        flags: "b",
        from: "a7",
        piece: "p",
        san: currentData,
        to: "a5",
      },
      {
        color: "b",
        flags: "b",
        from: "a7",
        piece: "p",
        san: "xxx",
        to: "a5",
      },
    ];

    //
    setCurrentData("");

    setTimeout(() => {
      makeRandomMove(chatBP).then((response) => {
        console.log("log");
      });
    }, 1000);
  };

  //
  const makeRandomMove = async (chatBP) => {
    await setFeaturesSequel(() => [...featuresSequel, ...chatBP]);
    console.log("fiu");
  };

  return (
    <div className="bg-white container">
      <h2 className="font-bold">Atendimensto 24 horas</h2>
      <div className="my-3">
        <form className="flex">
          <input
            type="text"
            value={currentData}
            onChange={(e) => setCurrentData(e.target.value)}
            className="py-1 px-2 rounded-md border border-gray-300 w-full"
          />
          <button
            type="button"
            onClick={() => handleSequel()}
            className="py-1 px-2 rounded-md border border-gray-300 w-full"
          >
            Click
          </button>
        </form>
      </div>
      <ul className="divide-b-black">
        {featuresSequel.map((row, index) => {
          return <ListRow key={index} config={row} />;
        })}
      </ul>
    </div>
  );
};

export default FeatureBP;
