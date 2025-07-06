import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const contract = c.router({
  searchPokemon: {
    method: 'GET',
    path: '/pokemons',
    query: z.object({
      name: z.string().optional(),
      type: z.string().optional(),
    }),
    responses: {
      200: z.object({
        name: z.string(),
        type: z.string(),
      }),
    },
    summary: 'Search for a pokemon',
  },
});
