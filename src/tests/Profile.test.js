import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para o Profile', () => {
  const emailString = 'email-input';
  const senhaString = 'password-input';
  const emailDoUsuario = 'teste@teste.com';

  it('testes botão "Done Recipes" e suas funcionalidades', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId(emailString);
    const passInput = screen.getByTestId(senhaString);
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });
    userEvent.type(emailInput, emailDoUsuario);
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const profileButton = screen.getByRole('button', { name: /profileicon/i });
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('testes botão "Favorite Recipes" e suas funcionalidades', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId(emailString);
    const passInput = screen.getByTestId(senhaString);
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });
    userEvent.type(emailInput, emailDoUsuario);
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const profileButton = screen.getByRole('button', { name: /profileicon/i });
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('testes botão "Logout" e suas funcionalidades', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId(emailString);
    const passInput = screen.getByTestId(senhaString);
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });
    userEvent.type(emailInput, emailDoUsuario);
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const profileButton = screen.getByRole('button', { name: /profileicon/i });
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
