import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para a ScrollBar', () => {
  const tituloPagina = 'page-title';
  const searchIcon = 'searchIcon';
  const profileIcon = 'profileIcon';
  it('Testa se a barra funciona corretamente na Página de Meals', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });
    const mealsTitle = screen.getByTestId(tituloPagina);
    expect(mealsTitle).toBeInTheDocument();
    const searchButton = screen.getByAltText(searchIcon);
    expect(searchButton).toBeInTheDocument();
    const profileButton = screen.getByAltText(profileIcon);
    expect(profileButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'water');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    expect(letterRadio).toBeInTheDocument();
    const botaoDeBuscar = screen.getByTestId('exec-search-btn');
    expect(botaoDeBuscar).toBeInTheDocument();
    userEvent.click(ingredientRadio);
    userEvent.click(botaoDeBuscar);
    const itensBuscados = await screen.findAllByRole('section');
    console.log(itensBuscados.length);
  });

  it('Testa se a barra funciona corretamente na Página de Drinks', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const drinksTitle = screen.getByTestId(tituloPagina);
    expect(drinksTitle).toBeInTheDocument();
    const searchButton2 = screen.getByAltText(searchIcon);
    expect(searchButton2).toBeInTheDocument();
    const profileButton2 = screen.getByAltText(profileIcon);
    expect(profileButton2).toBeInTheDocument();
    userEvent.click(searchButton2);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });
});
