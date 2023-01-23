import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  let moreDetails;
  let pokemon;
  let pokemonName;

  beforeEach(() => {
    renderWithRouter(<App />);
    moreDetails = screen.getByText('More details');
    pokemon = screen.getByTestId('pokemon-name');
    pokemonName = pokemon.innerHTML;
  });

  // const textDetails = 'More details';
  // const dataTestIdPokemon = 'pokemon-name';

  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    // renderWithRouter(<App />);

    // const moreDetails = screen.getByText(textDetails);
    // const pokemon = screen.getByTestId(dataTestIdPokemon);
    // const pokemonName = pokemon.innerHTML;

    userEvent.click(moreDetails);

    const summary = screen.getByRole('heading', { name: 'Summary' });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    const title = screen.getByText(`${pokemonName} Details`);

    expect(summary).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    // renderWithRouter(<App />);

    // const moreDetails = screen.getByText(textDetails);
    // const pokemon = screen.getByTestId(dataTestIdPokemon);
    // const pokemonName = pokemon.innerHTML;

    userEvent.click(moreDetails);

    const titleH2 = screen.getByRole('heading', { level: 2, name: `Game Locations of ${pokemonName}` });
    expect(titleH2).toBeInTheDocument();

    const pokemonData = pokemonList.find((pok) => pok.name === pokemonName);
    const imagesPokemon = screen.getAllByRole('img');
    // console.log(pokemonData);

    pokemonData.foundAt.forEach((local) => {
      const localName = screen.getByText(local.location);
      const localImage = imagesPokemon.find((image) => image.src === local.map);
      // console.log(localImage);

      expect(localName).toBeInTheDocument();
      expect(localImage).toBeInTheDocument();
      expect(localImage.alt).toBe(`${pokemonName} location`);
    });
  });

  it('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    // renderWithRouter(<App />);

    // const moreDetails = screen.getByText(textDetails);
    // const pokemon = screen.getByTestId(dataTestIdPokemon);
    // const pokemonName = pokemon.innerHTML;

    userEvent.click(moreDetails);

    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?', { selector: 'input' });
    console.log(checkboxFavorite.checked);

    expect(checkboxFavorite).toBeInTheDocument();
    expect(checkboxFavorite.type).toBe('checkbox');

    userEvent.click(checkboxFavorite);
    const iconFavorite = screen.queryByAltText(`${pokemonName} is marked as favorite`);
    expect(iconFavorite).toBeInTheDocument();

    userEvent.click(checkboxFavorite);
    expect(iconFavorite).not.toBeInTheDocument();
  });
});
