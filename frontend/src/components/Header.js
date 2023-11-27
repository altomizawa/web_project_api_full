import Logo from '../images/Around_the_US.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './AppContext';


function Header({setLoggedIn, user}) {
  const navigate = useNavigate();
  const location = useLocation();
  let context = useContext(AppContext);


  let currentLocationText = '';

  if (location.pathname === '/signin') {
    currentLocationText = 'Faça o Login';
  } else if (location.pathname === '/signup') {
    currentLocationText = 'Inscreva-se';
  }

  //------------SIGN OUT FUNCTION----------------
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <nav className="header">
      <img
        src={Logo}
        id="around-the-us"
        alt="logotipo de Around the US"
        className="logo"
      />
      {context.state ? (
        <div className="header__logged-in">
          <p>{context.user.email}</p>
          <button className="header__logout-button" onClick={signOut}>
            Logout
          </button>
        </div>
      ) : (
        <p>{currentLocationText}</p>
      )}
      <div className="header__menu">
        <div className="header__menu-line" id="top"></div>
        <div className="header__menu-line" id="middle"></div>
        <div className="header__menu-line" id="bottom"></div>
      </div>
    </nav>
  );
}

export default Header;
