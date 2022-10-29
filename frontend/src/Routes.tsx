import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import Auth from 'Pages/Auth';
import Movies from 'Pages/Movies';
import {Router, Route, Switch } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <PrivateRoute path="/movies">
      <Route path="/movies" exact>
        <Movies />
      </Route>
      <Route path="/movies:movieId">
        <h1>catalogo</h1>
       </Route>
      </PrivateRoute>
     
    </Switch>
  </Router>
);

export default Routes;
