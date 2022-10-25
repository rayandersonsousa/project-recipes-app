import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para o Footer', () => {
  it('Testa se os botões são renderizados no footer', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/profile');
    });

    const drinks = screen.getByRole('img', {
      name: /drinkicon/i,
    });
    const meals = screen.getByRole('img', {
      name: /mealicon/i,
    });

    expect(drinks).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
  });

  it('Testa se o botão de drinks redireciona para a página de drinks', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/profile');
    });

    const drinks = screen.getByRole('img', {
      name: /drinkicon/i,
    });

    userEvent.click(drinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Testa se o botão de meals redireciona para a página de meals', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/profile');
    });

    const meals = screen.getByRole('img', {
      name: /mealicon/i,
    });

    userEvent.click(meals);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
