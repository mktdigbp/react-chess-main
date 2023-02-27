import React from "react";

const ListRow = ({ config }) => {
  return (
    <li className="flex items-center justify-between px-3 py-1 border-b border-gray-300">
      <div className="flex space-x-2 items-center">
        <div>
          <i
            className={`bi-browser-edge text-sm ${
              config.color === "w" ? "text-white" : "text-black"
            }`}
          />
        </div>
        <div>
          {config.turn + 1} - {config.san}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <div>{config.from}</div>
        <div>
          <i className={`bi-arrow-right text-sm`} />
        </div>
        <div>{config.to}</div>
        <div>{config.time}</div>
      </div>
    </li>
  );
};

export default ListRow;
