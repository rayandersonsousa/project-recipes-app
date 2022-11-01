import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helpers/helpers';

describe('Testes para Recipes', () => {
  const emailString = 'email-input';
  const senhaString = 'password-input';
  const emailDoUsuario = 'teste@teste.com';
  it('test Radio', async () => {
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


    const text = screen.getByRole('heading', {  name: /meals/i})
    expect(text).toBeInTheDocument()
    const radioAll = screen.getByTestId('All-category-filter');
    expect(radioAll).toBeInTheDocument();
    
  });
});
