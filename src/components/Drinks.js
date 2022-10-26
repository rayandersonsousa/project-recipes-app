import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Recipes from './Recipes';

function Drinks() {
  return (
    <div>
      <Header titulo="Drinks" pesquisa="true" />
      <Recipes pagina="Drinks" />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Drinks;
