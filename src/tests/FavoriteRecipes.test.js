import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para a página de Receitas Favoritas', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('testa se os botões de filtro são renderizados na tela', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });

    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    const btnMeal = screen.getByRole('img', {
      name: /meals/i,
    });
    const btnDink = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(btnAll).toBeInTheDocument();
    expect(btnDink).toBeInTheDocument();
    expect(btnMeal).toBeInTheDocument();
  });

  it('Testa se o filtro "meal" funciona corretamente', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });

    const btnMeal = screen.getByRole('img', {
      name: /meals/i,
    });
    const cardDrink = screen.getByRole('img', {
      name: /aquamarine/i,
    });

    userEvent.click(btnMeal);
    expect(cardDrink).not.toBeInTheDocument();
  });

  it('Testa se o filtro "drink" funciona corretamente', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });

    const btnDrink = screen.getByRole('img', {
      name: /drinks/i,
    });
    const cardMeal = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });

    userEvent.click(btnDrink);
    expect(cardMeal).not.toBeInTheDocument();
  });

  it('Testa se o filtro "drink" funciona corretamente', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });

    const btnAll = screen.getByRole('img', {
      name: /all/i,
    });
    const cardMeal = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const cardDrink = screen.getByRole('img', {
      name: /aquamarine/i,
    });

    userEvent.click(btnAll);
    expect(cardMeal).toBeInTheDocument();
    expect(cardDrink).toBeInTheDocument();
  });
});
