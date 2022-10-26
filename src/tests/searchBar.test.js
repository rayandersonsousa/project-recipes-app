import React, { useState } from 'react';
import { act, screen, waitFor } from '@testing-library/react';
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
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'chicken');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(ingredientRadio);
    expect(nameRadio).toBeInTheDocument();
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    expect(letterRadio).toBeInTheDocument();
    const botaoDeBuscar = screen.getAllByRole('button');
    expect(botaoDeBuscar[2]).toBeInTheDocument();
    userEvent.click(botaoDeBuscar[2]);
    const itensBuscados = await screen.findAllByText(/chicken/i);
    expect(itensBuscados.length).toBe(9);
  });

  it('Testa se a barra funciona corretamente na Página de Drinks', async () => {
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
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'vodka');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    expect(letterRadio).toBeInTheDocument();
    const botaoDeBuscar = screen.getAllByRole('button');
    expect(botaoDeBuscar[2]).toBeInTheDocument();
    userEvent.click(botaoDeBuscar[2]);
    const itensBuscados = await screen.findAllByText(/vodka/i);
    expect(itensBuscados.length).toBe(9);
  });

  it('Testa se redireciona para a página de detalhes quando o resultado é apenas 1 Drink', async () => {
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
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'Aquamarine');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const botaoDeBuscar = screen.getAllByRole('button');
    expect(botaoDeBuscar[2]).toBeInTheDocument();
    userEvent.click(botaoDeBuscar[2]);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'), { timeout: 3000 });
  });

  it('Testa se redireciona para a página de detalhes quando o resultado é apenas 1 Meal', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });
    const drinksTitle = screen.getByTestId(tituloPagina);
    expect(drinksTitle).toBeInTheDocument();
    const searchButton2 = screen.getByAltText(searchIcon);
    expect(searchButton2).toBeInTheDocument();
    const profileButton2 = screen.getByAltText(profileIcon);
    expect(profileButton2).toBeInTheDocument();
    userEvent.click(searchButton2);
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'Arrabiata');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const botaoDeBuscar = screen.getAllByRole('button');
    expect(botaoDeBuscar[2]).toBeInTheDocument();
    userEvent.click(botaoDeBuscar[2]);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'), { timeout: 3000 });
  });

  it('Testa se só renderizam 12 receitas', async () => {
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
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'water');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(ingredientRadio);
    expect(nameRadio).toBeInTheDocument();
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    expect(letterRadio).toBeInTheDocument();
    const botaoDeBuscar = screen.getAllByRole('button');
    expect(botaoDeBuscar[2]).toBeInTheDocument();
    userEvent.click(botaoDeBuscar[2]);
    const itensBuscados = await screen.findAllByText(/chicken/i);
    expect(itensBuscados.length).toBe(2);
  });
});
