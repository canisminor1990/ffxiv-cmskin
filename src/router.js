import { Route, Router, Switch } from 'dva/router';
import App from './routes/App';
import Overlay from './routes/Overlay';
import Detail from './routes/Detail';
import Team from './routes/Team';
import History from './routes/History';
import Setting from './routes/Setting';
export default ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <App>
          <Route exact path="/" component={Overlay} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/history" component={History} />
          <Route path="/detail" component={Detail} />
          <Route path="/setting" component={Setting} />
        </App>
      </Switch>
    </Router>
  );
};
