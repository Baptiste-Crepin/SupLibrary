import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type Pokemon = {
  name: string;
  url: string;
}

export type PokemonWithDetails = Pokemon & {
  image: string | null;
  types: string[];
  id: number;
}

interface PokemonResponse {
  count: number;
  results: Pokemon[];
  previous: string | null;
  next: string | null;
}

const baseUrl = "https://pokeapi.co/api/v2/";

export default function usePokemons() {
  const [urlToFetch, setUrlToFetch] = useState(`${baseUrl}pokemon`);
  const [items, setItems] = useState<PokemonWithDetails[] | null>(null);

  const { data, isLoading, isError } = useQuery<PokemonResponse, Error>({
    queryKey: ["pokemons", urlToFetch],
    queryFn: async () => {
      const res = await fetch(urlToFetch);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  useEffect(() => {
    if (!data?.results) {
      setItems(null);
      return;
    }
    Promise.all(
      data.results.map(async (p) => {
        const res = await fetch(p.url);
        const json = await res.json();
        return {
          id: json.id,
          name: p.name,
          image: json.sprites.front_default,
          types: json.types.map((t: any) => t.type.name),
          url: p.url,
        } as PokemonWithDetails;
      })
    ).then(setItems);
  }, [data]);

  const changeLimit = (value: number) => {
    const limit = value === 0 && data ? data.count : value;
    const url = new URL(urlToFetch);
    url.searchParams.set("limit", limit.toString());
    setUrlToFetch(url.href);
  };

  const search = (keyword: string) => {
    if (!items) return;
    const lower = keyword.toLowerCase();
    setItems((prev) => prev?.filter((p) => p.name.toLowerCase().includes(lower)) || null);
  };

  const goTo = (url: string) => {
    setUrlToFetch(url);
  };

  return {
    isLoading,
    isError,
    pokemons: items,
    previous: data?.previous ?? null,
    next: data?.next ?? null,
    goTo,
    changeLimit,
    search
  };
}
