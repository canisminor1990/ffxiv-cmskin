import { Route, Router, Switch } from 'dva/router';
import App from './routes/App';
import Overlay from './routes/Overlay';
import Detail from './routes/Detail';
import History from './routes/History';
import Setting from './routes/Setting';
export default ({ app, history }) => {
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
