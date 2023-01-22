import React from 'react';
// import { render, screen } from '@testing-library/react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import pokemonList from '../data';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testa o componente FavoritePokemon', () => {
  it('Testa se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    render(<FavoritePokemon />);
    const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
    const text = screen.getByText('No favorite Pokémon found');

    expect(titleFavorite).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  // testando com props
  // it('Testa se são exibidos na tela apenas os Pokémon favoritado', () => {
  //   renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

  //   const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
  //   const text = screen.queryByText('No favorite Pokémon found');
  //   const favorite = screen.getByText(/Charmander/i);

  //   expect(titleFavorite).toBeInTheDocument();
  //   expect(text).not.toBeInTheDocument();
  //   expect(favorite).toBeInTheDocument();
  // });

  // fazendo o caminho do usuário
  it('Testa se são exibidos na tela apenas os Pokémon favoritado', () => {
    const { history } = renderWithRouter(<App />);

    const menu = screen.getByRole('navigation');
    const linkDetails = screen.getByRole('link', { name: /more details/i });

    expect(menu).toBeInTheDocument();
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    // const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    const isFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    expect(isFavorite).toBeDefined();
    expect(isFavorite).not.toBeChecked();

    userEvent.click(isFavorite);
    act(() => {
      history.push('/favorites');
    });
    const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
    const text = screen.queryByText('No favorite Pokémon found');
    const pikachu = screen.getByText(/pikachu/i);

    expect(titleFavorite).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });
});
