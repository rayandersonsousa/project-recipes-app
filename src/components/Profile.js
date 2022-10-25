import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

function Profile() {
  const storage = JSON.parse(localStorage.getItem('user'));
  const emailStorage = storage.email;
  const history = useHistory();

  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>
      <Header titulo="Profile" pesquisa="false" />
      <h1>Profile</h1>

      <h2 data-testid="profile-email">{emailStorage}</h2>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickDone }
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes

      </button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
