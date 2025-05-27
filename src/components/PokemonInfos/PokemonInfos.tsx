import { useParams } from "react-router";
import { useEffect, useState } from "react";

type PokemonInfo = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  cries: string;
}
export default function PokemonInfo() {
  const pokemonId = useParams().id;
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const nextPokemonId = parseInt(pokemonId || "1") + 1;
  const prevPokemonId = parseInt(pokemonId || "1") - 1;
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${baseUrl}${pokemonId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const pokemonData = await response.json();
        const pokemonInfo: PokemonInfo = {
          id: pokemonData.id,
          name: pokemonData.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          types: pokemonData.types.map((type: any) => type.type.name),
          sprites: {
            front_default: pokemonData.sprites.front_default,
            back_default: pokemonData.sprites.back_default
          },
          cries: `https://play.pokemonshowdown.com/audio/cries/${pokemonData.name}.mp3`
        };
        setPokemon(pokemonInfo);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [pokemonId]);
  return (
    <>
      {pokemon ? (
        <>
          <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
            <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.join(", ")}</p>
            <audio controls autoPlay>
              <source src={pokemon.cries} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div>
            <button onClick={() => window.location.href = `/pokemon/${prevPokemonId}`}>Previous</button>
            <button onClick={() => window.location.href = `/pokemon/${nextPokemonId}`}>Next</button>
          </div>
        </>
      ) : (
        <p>Loading Pokémon data...</p>
      )}
    </>
  );

}
