import { ReactComponent as AuthImage } from 'assets/image/desenho.svg';
import { Route, Switch } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito.</p>
        <AuthImage />
      </div>
      <div className="auth-form-container">
        <Switch>
          <Route path="/login">
            <h1>Card Login</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
