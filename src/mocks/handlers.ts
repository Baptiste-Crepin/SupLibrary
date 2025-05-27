// src/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw'

import getPokemon200 from "./fixtures/getPokemon200.json";
import getPokemon200Id from "./fixtures/getPokemon200-id.json";

let getPokemon200Modified = JSON.parse(JSON.stringify(getPokemon200));

export const handlers = [
  http.get('https://example.com/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  http.get("https://pokeapi.co/api/v2/pokemon", async ({ request }) => {
    await delay()
    console.log(getPokemon200Modified);
    const copyPokemon200 = JSON.parse(JSON.stringify(getPokemon200Modified));
    const url = new URL(request.url);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    copyPokemon200.count = copyPokemon200.results.length;
    if (offset > 0) {
      copyPokemon200.previous = `https://pokeapi.co/api/v2/pokemon?offset=${Math.max(0, offset - limit)}&limit=${limit}`;
    }
    if (offset + limit < getPokemon200Modified.count) {
      copyPokemon200.next = `https://pokeapi.co/api/v2/pokemon?offset=${offset + limit}&limit=${limit}`;
    } else {
      copyPokemon200.next = null;
    }
    copyPokemon200.results = getPokemon200Modified.results.splice(offset, limit)
    console.log(copyPokemon200)
    return HttpResponse.json(copyPokemon200)
  }),

  http.get("https://pokeapi.co/api/v2/pokemon/:id/", async ({ }) => {
    return HttpResponse.json(getPokemon200Id)
  }),

  http.post('https://pokeapi.co/api/v2/pokemon', async ({ request }) => {
    const newPokemon = await request.json() as any;
    const lastPokemonUrl = getPokemon200Modified.results[getPokemon200Modified.results.length - 1].url
    // const id = parseInt(lastPokemonUrl.substring(lastPokemonUrl.indexOf('pokemon') + "pokemon".length + 1)) + 1;
    const id = lastPokemonUrl.match(/\/(\d+)\/$/)[1] + 1
    const result = {
      "name": newPokemon.name,
      "url": `https://pokeapi.co/api/v2/pokemon/${id}/`,
    }
    const types = newPokemon.types;
    const sprites = {
      front_default: newPokemon.image
    }
    getPokemon200Modified.results.unshift(result);
    console.log(getPokemon200Modified);
    return HttpResponse.json(getPokemon200Modified, { status: 201 });
  })
]