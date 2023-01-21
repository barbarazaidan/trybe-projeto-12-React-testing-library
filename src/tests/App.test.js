import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import APP from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente APP', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<APP />);

    const navegation = screen.getByRole('navigation');
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(navegation).toBeInTheDocument();
    expect(navegation).toContainElement(linkHome);
    expect(navegation).toContainElement(linkAbout);
    expect(navegation).toContainElement(linkFavorite);
  });

  it('Testa se a aplicação é redirecionada para a página inicial ao clicar no link Home da barra de navegação;', () => {
    const { history } = renderWithRouter(<APP />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página About ao clicar no link About da barra de navegação;', () => {
    const { history } = renderWithRouter(<APP />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para a página de favoritos ao clicar no link Favorite Pokémon da barra de navegação;', () => {
    const { history } = renderWithRouter(<APP />);

    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavorites);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida;', () => {
    const { history } = renderWithRouter(<APP />);
    const invalidURL = '/digimon-e-melhor';

    act(() => {
      history.push(invalidURL);
    });

    const notFoundPage = screen.getByText('Page requested not found');
    expect(notFoundPage).toBeInTheDocument();
  });
});
