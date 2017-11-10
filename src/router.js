import { Route, Router, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';
import Overlay from './routes/Overlay';
import Detail from './routes/Detail';
import History from './routes/History';

export default ({ app, history }) => {
  const Setting = dynamic({ app, component: () => import('./routes/Setting') });
  return (
    <Router history={history}>
      <Switch>
        <App>
          <Route exact path="/" component={Overlay} />
          <Route exact path="/detail/:name" component={Detail} />
          <Route exact path="/history" component={History} />
          <Route path="/setting" component={Setting} />
        </App>
      </Switch>
    </Router>
  );
};
