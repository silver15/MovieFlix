import { AuthContext } from 'AuthContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import history from 'util/history';
import { getTokenData, isAuthenticated, removeAuthData} from 'util/requests';
import './styles.css';



const Navbar = () => {

  const {authContextData, setAuthContextData} = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

    const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      removeAuthData();
      setAuthContextData({
        authenticated: false,
      });
      history.replace('/');
    }

  return (
    <nav className="bg-primary">
      <div className="nav-log-navbar">
        <h4>MovieFlix</h4>

        <div className="button">
          {authContextData.authenticated ? (
            <Link className="button-sair" to="/movies" onClick={handleLogoutClick}>SAIR</Link>
          ) : (
            <Link to="#"></Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
