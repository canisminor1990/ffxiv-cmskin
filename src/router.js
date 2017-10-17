import dynamic from 'dva/dynamic';
import { Route, Router, Switch } from 'dva/router';
import App from './routes/App';

export default ({ app, history }) => {
  history.listen(() => window.scrollTo(0, 0));

  const Overlay = dynamic({ app, component: () => import('./routes/Overlay') });

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" component={Overlay} />
          <Route path="/test" component={Overlay} />
        </Switch>
      </App>
    </Router>
  );
};
