import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokédex', () => {
  let buttonNext;
  let buttonAll;
  const pikachu = 'Pikachu sprite';
  const charmander = 'Charmander sprite';
  const dragonair = 'Dragonair sprite';

  beforeEach(() => {
    renderWithRouter(<App />);
    buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
    buttonAll = screen.getByRole('button', { name: 'All' });
  });

  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    const title = screen.getByRole('heading', { name: 'Encountered Pokémon' });

    expect(title).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    expect(buttonNext).toBeInTheDocument();
    expect(screen.getByAltText(pikachu)).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.queryByAltText(pikachu)).not.toBeInTheDocument();
    expect(screen.getByAltText(charmander)).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText('Caterpie sprite')).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText('Ekans sprite')).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText('Alakazam sprite')).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText('Mew sprite')).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText('Rapidash sprite')).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText('Snorlax sprite')).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText(dragonair)).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.getByAltText(pikachu)).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonsFilterHTML = screen.getAllByTestId('pokemon-type-button');
    // console.log(buttonsFilterHTML);

    const buttonsFilterName = buttonsFilterHTML.map((button) => button.innerHTML);
    // console.log(buttonsFilterName);

    expect(buttonsFilterHTML.length).toBe(pokemonTypes.length);
    expect(buttonsFilterName.sort()).toEqual(pokemonTypes.sort());
    expect(buttonAll).toBeInTheDocument();

    const buttonDragon = buttonsFilterHTML.find((button) => button.innerHTML === 'Dragon');
    // console.log(buttonDragon);

    userEvent.click(buttonDragon);
    expect(screen.queryByAltText('Dragonair sprite')).toBeInTheDocument();
    expect(buttonNext).toBeDisabled();

    const buttonFire = buttonsFilterHTML.find((button) => button.innerHTML === 'Fire');

    userEvent.click(buttonFire);
    expect(screen.queryByAltText(charmander)).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(screen.queryByAltText('Rapidash sprite')).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonsFilterHTML = screen.getAllByTestId('pokemon-type-button');
    const buttonDragon = buttonsFilterHTML.find((button) => button.innerHTML === 'Dragon');

    userEvent.click(buttonNext);
    expect(screen.getByAltText(charmander)).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(screen.getByAltText(pikachu)).toBeInTheDocument();

    userEvent.click(buttonDragon);
    expect(screen.getByAltText(dragonair)).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(screen.getByAltText(pikachu)).toBeInTheDocument();
  });
});
