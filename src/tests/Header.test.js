import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para o Header', () => {
  const tituloPagina = 'page-title';
  const searchIcon = 'searchIcon';
  const profileIcon = 'profileIcon';
  it('Testa se o componente Header é renderizado nas páginas Meals e etc', () => {
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

    act(() => {
      history.push('/drinks');
    });
    const drinksTitle = screen.getByTestId(tituloPagina);
    expect(drinksTitle).toBeInTheDocument();
    const searchButton2 = screen.getByAltText(searchIcon);
    expect(searchButton2).toBeInTheDocument();
    const profileButton2 = screen.getByAltText(profileIcon);
    expect(profileButton2).toBeInTheDocument();

    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipesTitle = screen.getByTestId(tituloPagina);
    expect(doneRecipesTitle).toBeInTheDocument();
    const profileButton3 = screen.getByAltText(profileIcon);
    expect(profileButton3).toBeInTheDocument();

    act(() => {
      history.push('/done-recipes');
    });
    const favoriteRecipesTitle = screen.getByTestId(tituloPagina);
    expect(favoriteRecipesTitle).toBeInTheDocument();
    const profileButton4 = screen.getByAltText(profileIcon);
    expect(profileButton4).toBeInTheDocument();
  });

  it('Testa se o Botão de Pesquisa habilita e desabilita a Barra de Pesquisa', () => {
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
  });

  it('Testa se o Botão de Profile leva para a página de Profile', () => {
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
    const profileButton = screen.getByRole('button', { name: /profileicon/i });
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
