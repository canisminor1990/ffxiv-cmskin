import classnames from 'classnames';
import Gitment from 'gitment';
import { Component } from 'react';
import styles from './index.scss';

const config = {
  owner: 'canisminor1990',
  repo: 'ffxiv-cmskin',
  oauth: {
    client_id: 'd6760d06923fcc46fcd8',
    client_secret: '003539c545e52133a6af75d5b4503d22bd24d22f',
  },
};

export default class extends Component {
  componentDidMount() {
    const Config = { id: window.location.pathname, ...config };
    const gitment = new Gitment(Config);
    gitment.renderComments('comments');
    gitment.renderEditor('editor');
  }

  render() {
    const { className, ...other } = this.props;
    return (
      <div className={classnames.bind(styles)(className, styles.command)} {...other}>
        <div id="comments" className={styles.item} />
        <div id="editor" className={styles.item} />
      </div>
    );
  }
}
