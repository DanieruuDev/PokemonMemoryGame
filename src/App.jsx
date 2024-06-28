import Card from "./component/Card";
import usePokemonData from "./api/usePokemonData";
import { useState } from "react";

function App() {
  const { pokemonData, handleShuffle } = usePokemonData();
  const [pokePick, setPokePick] = useState([]);
  const [score, setScore] = useState({ best: 0, current: 0 });

  function checkLoss(name) {
    if (!pokePick.includes(name)) {
      setScore((prevScore) => ({
        ...prevScore,
        current: prevScore.current + 1,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        best:
          prevScore.best < prevScore.current
            ? prevScore.current
            : prevScore.best,
        current: 0,
      }));
      setPokePick([]);
      alert("You lose with a score of: " + score.current);
    }
  }
  function handleClick(name) {
    handleShuffle();
    setPokePick((prev) => [...prev, name]);
    checkLoss(name);
  }

  return (
    <div className="bg-slate-100 p-2 min-h-[100vh] ">
      <div className="max-w-[1500px] mx-auto space-y-5">
        <header className="flex justify-between items-center  max-sm:space-y-4 max-sm:items-start max-sm:flex-col">
          <div>
            <h1 className="text-red-500 text-[40px] font-bold max-sm:text-[20px]">
              Pokemon Memory Game
            </h1>
            <p className="font-bold text-red-400 max-sm:text-[15px]">
              Get points by clicking on an image but don't click on any more
              than once!
            </p>
          </div>
          <div className="text-red-800 max-sm:text-[15px]">
            <p>Current Score: {score.current}</p>
            <p>Best Score: {score.best}</p>
          </div>
        </header>
        <div className="flex flex-wrap gap-[11px] justify-center">
          {pokemonData.map((pokemon) => (
            <Card
              key={pokemon.name}
              img={pokemon.sprites.front_default}
              name={pokemon.name}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
