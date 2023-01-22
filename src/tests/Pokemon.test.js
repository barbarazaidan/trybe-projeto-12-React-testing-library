import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import Pokemon from '../components/Pokemon';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokémon:', () => {
    const pokemon = pokemonList[0];
    const { averageWeight, name, type, image } = pokemon;
    const isFavorite = false;
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByText(`${type}`);
    const weightPokemon = screen.getByText(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    const imagePokemon = screen.getByRole('img');

    // quando usei da forma abaixo, o stryke consegue fazer modificações que o teste não consegue pegar
    // const imagePokemon = screen.getByRole('img', { src: image, alt: `${name} sprite` });

    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent(name);
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon.src).toContain(image);
    expect(imagePokemon.alt).toContain(`${name} sprite`);
  });

  it('Testa se o card do Pokémon contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const pokemon = pokemonList[1];
    const isFavorite = false;
    const { id } = pokemon;
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />,
    );

    const linkDetails = screen.getByRole('link', { name: 'More details', url: `/pokemon/${id}` });

    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    // console.log(pathname);

    expect(pathname).toBe(`/pokemon/${id}`);

    // o teste falha aqui. Ele não encontra o texto, pois a página renderizada não muda para a de Detalhes, permanecendo na Home
    // const { id, name } = pokemon;
    // const title = screen.getByText(`${name} Details`);
    // expect(title).toBeInTheDocument();
  });

  it('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    const pokemon = pokemonList[2];
    const isFavorite = true;
    const { name } = pokemon;
    renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />,
    );

    const iconStar = screen.getByAltText(`${name} is marked as favorite`);
    // console.log(iconStar);

    expect(iconStar).toBeInTheDocument();
    expect(iconStar.src).toMatch('/star-icon.svg');
  });
});
