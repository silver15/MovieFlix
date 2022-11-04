import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import history from 'util/history';
import { getTokenData, isAuthenticated, removeAuthData, TokenData } from 'util/requests';
import './styles.css';

type authData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const [authData, setAuthData] = useState<authData>({ authenticated: false });

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthData({
        authenticated: false,
      });
    }
  }, []);

    const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      removeAuthData();
      setAuthData({
        authenticated: false,
      });
      history.replace('/');
    }

  return (
    <nav className="bg-primary">
      <div className="nav-log-navbar">
        <h4>MovieFlix</h4>

        <div>
          {authData.authenticated ? (
            <Link to="/movies" onClick={handleLogoutClick} className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">LOGOUT</Link>
          ) : (
            <Link to="#"></Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
