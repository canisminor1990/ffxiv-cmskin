import { Component } from 'react';
import { View } from '../../../components';
import { FooterLite } from '../Page';
import style from '../index.scss';
import cyStyle from './index.scss';
import { createNs, createMobileNs, loadVersionJs } from './changyan';

const { Content } = View;

const CHANGYAN_API = {
  appid: 'cytjdgeJ7',
  conf: 'prod_e0ae268a3629c862b8790af46e93c5cb',
};

export default class extends Component {
  componentWillMount() {
    setTimeout(() => {
      createNs();
      createMobileNs();
      loadVersionJs();
      window.changyan.api.config(CHANGYAN_API, 100);
    });
  }

  render() {
    return [
      <Content key="content" className={style.content}>
        <div id="SOHUCS" className={cyStyle.command} />
      </Content>,
      <FooterLite key="foot" />,
    ];
  }
}
