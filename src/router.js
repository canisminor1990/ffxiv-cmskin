import { Route, Router, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

export default ({ app, history }) => {
  const Overlay = dynamic({ app, component: () => import('./routes/Overlay') });
  const Team = dynamic({ app, component: () => import('./routes/Team') });
  const History = dynamic({ app, component: () => import('./routes/History') });
  const Detail = dynamic({ app, component: () => import('./routes/Detail') });
  const Qrcode = dynamic({ app, component: () => import('./routes/Qrcode') });
  const Setting = dynamic({ app, component: () => import('./routes/Setting') });

  return (
    <Router history={history}>
      <Switch>
        <App>
          <Route exact path="/" component={Overlay} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/history" component={History} />
          <Route exact path="/qrcode" component={Qrcode} />
          <Route path="/detail" component={Detail} />
          <Route path="/setting" component={Setting} />
        </App>
      </Switch>
    </Router>
  );
};
