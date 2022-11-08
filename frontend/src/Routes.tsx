import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import Home from 'Pages/Home';
import MoviesCatalog from 'Pages/MovieCatalog';
import MoviesDetails from 'Pages/MovieDetails';
import {Router, Route, Switch } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
      <Route path="/movies" exact>
        <MoviesCatalog />
      </Route>
      <Route path="/movies/:movieId">
        <MoviesDetails />
       </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
