import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import pokemonList from '../data';

describe('Testa o componente Pokédex', () => {
  const pokemonFavorite = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    // dá este erro: You should not use <Link> outside a <Router>
    // render(
    //   <Pokedex
    //     pokemonList={ pokemonList }
    //     isPokemonFavoriteById={ pokemonFavorite }
    //   />,
    // );

    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ pokemonFavorite }
      />,
    );

    const title = screen.getByRole('heading', { name: 'Encountered Pokémon' });

    expect(title).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ pokemonFavorite }
      />,
    );

    const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });

    expect(buttonNext).toBeInTheDocument();
  });
});
