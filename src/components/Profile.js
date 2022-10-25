import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  return (
    <div>
      <Header titulo="Profile" pesquisa="false" />
      <h1>Profile</h1>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
