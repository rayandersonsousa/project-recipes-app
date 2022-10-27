import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Recipes from './Recipes';

function Meals() {
  return (
    <div>
      <Header titulo="meals" pesquisa="true" />
      <Recipes pagina="meals" />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Meals;
