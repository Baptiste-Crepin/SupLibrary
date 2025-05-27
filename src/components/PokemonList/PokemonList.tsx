import { useState, useEffect } from 'react';
import usePokemons, { type PokemonWithDetails } from './usePokemons';
import defaultClass from './pokemonList.module.css';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router';

export default function PokemonList() {
  const [limit, setLimit] = useState(20);
  const { isLoading, pokemons, previous, goTo, next, changeLimit, search } = usePokemons();
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);
  const navigate = useNavigate()

  useEffect(() => {
    search(debouncedFilter);
  }, [debouncedFilter]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={defaultClass.container}>
      <select name="limit" id="limit" value={limit} onChange={e => {
        setLimit(Number(e.target.value))
        changeLimit(Number(e.target.value))
      }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="0">all</option>
      </select>
      {
        limit == 0 && (<input type="search" name="search" id="search" value={filter} onChange={(e) => setFilter(e.target.value)} />)
      }

      {
        pokemons?.map((pokemon: PokemonWithDetails) => {
          return (
            <button
              onClick={() => { navigate(`/pokemon/${pokemon.id}`) }}
              key={pokemon.name}
              className={defaultClass.card}
              aria-label={pokemon.name}
            >
              <h3>{pokemon.name}</h3>
              {
                pokemon.image && <img src={pokemon.image} alt={pokemon.name} />
              }

              <p>{pokemon.id}</p>
              <p>{pokemon.types.join(', ')}</p>
            </button>
          );
        })
      }
      {previous && <button onClick={() => goTo(previous)}>Previous</button>}
      {next && <button onClick={() => goTo(next)}>Next</button>}
    </div >
  );
}