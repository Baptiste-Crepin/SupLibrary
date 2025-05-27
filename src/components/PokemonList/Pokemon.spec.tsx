import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
const queryClient = new QueryClient();
import PokemonList from './PokemonList'

describe('PokemonList', () => {
  beforeEach(() => {
    // given
    render(<QueryClientProvider client={queryClient}><MemoryRouter>
      <PokemonList /></MemoryRouter></QueryClientProvider>)
  });

  it('renders 20 pokemons', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole("heading", { level: 3 })).length(20);
    })
  });

  it('renders charizard', async () => {
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3, name: 'charizard' }))
    })
  });

  it("renders the 20 next pokemons", async () => {
    // When
    const $nextButton = await screen.getByRole('button', { name: "Next" });
    userEvent.click($nextButton);
    // Then
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3, name: "spearow" }));
    })
  });

  it('renders 50 pokemons', async () => {
    // When
    const $select = screen.getByRole('combobox');
    userEvent.selectOptions($select, "50");
    // Then
    await waitFor(() => {
      expect(screen.getAllByRole("heading", { level: 3 })).length(50);
    });
  })

  // it("Display correct pokemon when we search but", async () => {
  //   //given
  //   const $select = screen.getByRole('combobox');
  //   userEvent.selectOptions($select, "all");
  //   //when
  //   const $search = await screen.findByRole('searchbox');
  //   userEvent.type($search, 'but');
  //   //then
  //   await waitFor(() => {
  //     expect(screen.getAllByRole("heading", { level: 3 })).length(4);
  //     expect(screen.getByRole('heading', { level: 3, name: 'butterfree' }))
  //     expect(screen.getByRole('heading', { level: 3, name: 'kabuto' }))
  //     expect(screen.getByRole('heading', { level: 3, name: 'kabutops' }))
  //     expect(screen.getByRole('heading', { level: 3, name: 'butterfree-gmax' }))
  //   });
  // });
})