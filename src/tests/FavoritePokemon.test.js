import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemon', () => {
  it('Testa se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    render(<FavoritePokemon />);

    const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
    const text = screen.getByText('No favorite Pokémon found');

    expect(titleFavorite).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  //   it('Testa se são exibidos na tela apenas os Pokémon favoritado', () => {
  //     const pokemonlist = [
  //       {
  //         id: 25,
  //         image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  //         moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  //         name: 'Pikachu',
  //         summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  //         type: 'Electric',
  //       },
  //       {
  //         id: 23,
  //         image: '"https://archives.bulbagarden.net/media/upload/1/18/Spr_5b_023.png"',
  //         moreInfo: '"https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)"',
  //         name: 'Ekans',
  //         summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  //         type: 'Poison',
  //       },
  //     ];

  //     render(<FavoritePokemon pokemonlist={ pokemonlist } />);

  //     const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
  //     const text = screen.getByText('No favorite Pokémon found');

  //     expect(titleFavorite).toBeInTheDocument();
  //     expect(text).not.toBeInTheDocument();
  //   });
  it('Testa se são exibidos na tela apenas os Pokémon favoritado', () => {
    const { history } = renderWithRouter(<App />);

    const menu = screen.getByRole('navigation');
    const linkDetails = screen.getByRole('link', { name: /more details/i });

    expect(menu).toBeInTheDocument();
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    const isFavorite = screen.getByRole('checkbox');

    expect(favoritePokemon).toBeDefined();
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
