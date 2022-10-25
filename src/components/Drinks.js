import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Drinks() {
  return (
    <div>
      <Header titulo="Drinks" pesquisa="true" />
      <h1>Drinks</h1>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Drinks;
