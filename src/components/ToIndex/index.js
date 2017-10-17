import { Redirect, Route } from 'dva/router';

export default ({ path, to }) => <Route exact path={path} render={() => <Redirect to={to} />} />;
