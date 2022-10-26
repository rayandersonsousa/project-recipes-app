import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Meals() {
  return (
    <div>
      <header>
        <Header titulo="Meals" pesquisa="true" />
      </header>
      <h1>Meals</h1>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Meals;
