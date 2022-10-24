import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para a tela de Login', () => {
  // it('Testa se a página login é renderizada na rota "/"', () => {
  //   render(<App />);
  // });
  it('Testa se os campos de login estão na tela', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });
  it('Testa se o botão de login está desabilitado caso os campos sejam inválidos', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'testeteste.com');
    userEvent.type(passInput, '123456');
    expect(loginBtn).toBeDisabled();
  });

  it('Testa se o botão de login está habilitado caso os campos sejam válidos', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passInput, '1234567');
    expect(loginBtn).not.toBeDisabled();
  });
});
