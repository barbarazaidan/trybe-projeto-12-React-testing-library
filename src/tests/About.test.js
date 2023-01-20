import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';

describe('Testa a página "About"', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    render(<About />);
    // screen.logTestingPlaygroundURL();

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex;', () => {
    render(<About />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    render(<About />);

    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const p2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
});
