import Navbar from 'components/Navbar';
import Auth from 'Pages/Auth';
import Movies from 'Pages/Movies';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect from="/" to="/movies" exact/>
      <Route path="/movies">
        <Movies />
      </Route>
      {/* <Redirect from="/auth/login" to="/auth/login" />
      <Route path="/auth/login">
        <Auth />
      </Route>*/}
    </Switch>
  </BrowserRouter>
);

export default Routes;
