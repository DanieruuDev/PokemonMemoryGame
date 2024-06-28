import React from "react";

function Card({ img, name, handleClick }) {
  return (
    <div
      className="max-w-[291px] w-full rounded-md text-white flex-col justify-center text-center p-2 bg-red-500 cursor-pointer hover:shadow-[0_0_20px_rgba(255,0,0,0.7)] transition-all duration-300 ease-in-out"
      onClick={() => handleClick(name)}
    >
      <div>
        <img
          src={img}
          alt={name}
          className="w-full h-[265px] object-center bg-white rounded-md"
        />
      </div>
      <div className="mt-[5px] text-[25px] font-bold">{name}</div>
    </div>
  );
}

export default Card;
