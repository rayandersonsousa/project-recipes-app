import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from './Header';

function Profile() {
  const { email } = useContext(AppContext);
  return (
    <div>
      <Header titulo="Profile" pesquisa="false" />
      <h1>Profile</h1>
      <h2 data-testid="profile-email">{email}</h2>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
