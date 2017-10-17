import { Route, Router } from 'dva/router';
import App from './routes/App';
import Overlay from './routes/Overlay';

export default ({ app, history }) => {
  history.listen(() => window.scrollTo(0, 0));
  return (
    <Router history={history}>
      <App>
        <Route exact path="/" component={Overlay} />
      </App>
    </Router>
  );
};
