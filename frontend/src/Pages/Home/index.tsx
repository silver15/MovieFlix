import { ReactComponent as AuthImage } from 'assets/image/desenho.svg';
import { isAuthenticated } from 'util/requests';

import Login from '../../components/Login';

import './styles.css';

const Home = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Avalie Filmes</h1>
        <p>
          Diga o que você achou do seu <br /> filme favorito.
        </p>
        <AuthImage />
      </div>
      <div className="auth-form-container">
        <Login />
      </div>
    </div>
  );
};

export default Home;
