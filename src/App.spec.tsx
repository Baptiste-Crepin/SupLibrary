import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
const queryClient = new QueryClient();
import { Router } from './layouts/Router'

describe('PokemonList', () => {
  it('renders charizard', async () => {
    // Given
    render(<QueryClientProvider client={queryClient}><MemoryRouter>
      <Router /></MemoryRouter></QueryClientProvider>)

    //when
    const $pokemon = await screen.findByRole('button')
    userEvent.click($pokemon)

    //then  
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'charizard' }))
    })
  });


})