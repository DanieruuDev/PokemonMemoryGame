import React from "react";
import { useEffect, useState } from "react";

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function usePokemonData() {
  const [pokemonData, setPokemonData] = useState([]);
  const handleShuffle = () => {
    const shuffledPokemon = shuffleArray([...pokemonData]);
    setPokemonData(shuffledPokemon);
  };
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
        );
        if (!response.ok) throw new Error("Fetching error");
        const data = await response.json();
        const responses = await Promise.all(
          data.results.map(async (d) => {
            const response = await fetch(d.url);
            if (!response.ok) throw new Error("Fetching error");
            const pokemon = await response.json();
            return pokemon;
          })
        );
        setPokemonData(responses);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }
    fetchPokemon();
  }, []);
  return { pokemonData, handleShuffle };
}

export default usePokemonData;
