import React from 'react';
import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página Not Found', () => {
  it('Testa se a página contém um heading h2 com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<NotFound />);
    const invalidRoute = '/teste-e-complicado';

    // console.log(history);
    history.push(invalidRoute); // o push é uma chave do history que tem o valor de uma

    const headingNotFound = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });

    expect(headingNotFound).toBeInTheDocument();
  });

  it('Testa se existe uma imagem com o src "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<NotFound />);
    const invalidRoute = '/teste-e-complicado';

    // ainda não entendi direito como funciona o act, mas quando não o utilizo, como no teste acima, aparece o seguinte erro no console:
    // Warning: An update to Router inside a test was not wrapped in act(...).
    // When testing, code that causes React state updates should be wrapped into act(...).
    // This ensures that you're testing the behavior the user would see in the browser

    act(() => {
      history.push(invalidRoute);
    });

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
