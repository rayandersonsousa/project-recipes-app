import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Recipes from './Recipes';

function Drinks() {
  return (
    <div>
      <Header titulo="drinks" pesquisa="true" />
      <Recipes pagina="drinks" />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Drinks;
