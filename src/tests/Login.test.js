import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import App from '../App';
import Provider from '../context/Provider';

describe('Testes para a tela de Login', () => {
  // it('Testa se a página login é renderizada na rota "/"', () => {
  //   render(<App />);
  // });
  it('Testa se os campos de login estão na tela', () => {
    render(<Provider><App /></Provider>);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });
  it('Testa se o botão de login está desavilitado caso os campos sejam inválidos', () => {
    render(<Provider><App /></Provider>);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'testeteste.com');
    userEvent.type(passInput, '123456');
    expect(loginBtn).toBeDisabled();
  });
});
