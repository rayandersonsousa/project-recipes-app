import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

function Profile() {
  const storage = JSON.parse(localStorage.getItem('user'));
  // const emailStorage = storage.email;
  console.log('log', storage);
  const history = useHistory();

  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header titulo="Profile" pesquisa="false" />

      {
        (storage !== null)
        && <h2 data-testid="profile-email">{storage.email}</h2>
      }

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
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
