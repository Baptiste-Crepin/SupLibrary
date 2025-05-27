import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import defaultClass from './pokemonList.module.css';
import usePokemons, { type PokemonWithDetails } from './usePokemons';

export default function PokemonList() {
  const [limit, setLimit] = useState(20);
  const { isLoading, pokemons, previous, goTo, next, changeLimit, search } = usePokemons();
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);
  const navigate = useNavigate()

  useEffect(() => {
    search(debouncedFilter);
  }, [debouncedFilter, search]);

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
            <Card sx={{ minWidth: 275 }}
              onClick={() => { navigate(`/pokemon/${pokemon.id}`) }}
              key={pokemon.name}
              className={defaultClass.card}
              aria-label={pokemon.name}
            >
              <CardContent>
                <Typography gutterBottom variant="h3" >
                  {pokemon.name}
                </Typography>
                <CardMedia sx={{ height: 140 }} image={`${pokemon.image}`} title="green iguana" />

                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {pokemon.id}
                </  Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {pokemon.types.join(', ')}
                </Typography>

              </CardContent>
            </Card>
          );
        })
      }
      {previous && <button onClick={() => goTo(previous)}>Previous</button>}
      {next && <button onClick={() => goTo(next)}>Next</button>}
    </div >
  );
}