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
  const emailString = 'email-input';
  const senhaString = 'password-input';
  const emailDoUsuario = 'teste@teste.com';

  it('Testa se os campos de login estão na tela', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId(emailString);
    const passInput = screen.getByTestId(senhaString);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });
  it('Testa se o botão de login está desabilitado caso os campos sejam inválidos', () => {
    renderWithRouter(
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
    userEvent.type(passInput, '123456');
    expect(loginBtn).toBeDisabled();
  });

  it('Testa se o botão de login está habilitado caso os campos sejam válidos', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId(emailString);
    const passInput = screen.getByTestId(senhaString);
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passInput, '1234567');
    expect(loginBtn).not.toBeDisabled();
  });

  it('Testa se o botão salva o email e troca para a página de comidas', () => {
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
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    const emailUser = JSON.parse(localStorage.getItem('user'));
    expect(emailUser).toStrictEqual({ email: emailDoUsuario });
  });
});
