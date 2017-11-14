import { Message } from './components';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import './index.scss';
import Console from './utils/console';
import Baidu from './utils/baiduPush';
import Debug from './utils/debug';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    Message.error(e.message, 3);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/setting'));
app.model(require('./models/updateActData'));
app.model(require('./models/event'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 6. Other
window.debug = false;
if (window.location.search.indexOf('?HOST_PORT=ws://') !== -1) window.websocket = true;
if (process.env.NODE_ENV === 'development') {
  Debug();
} else {
  Console();
  Baidu();
}
