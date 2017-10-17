import _ from 'lodash';

const PrimaryColor = '#62e6ac';

const Base = {
  '@primary-color': PrimaryColor,
  '@link-color': PrimaryColor,
  '@border-radius-base': '2px',
  '@font-size-base': '16px',
  '@line-height-base': '1.2',
};

const Layout = {
  '@layout-body-background': '#ffffff',
  '@layout-header-background': '#ffffff',
  '@layout-header-height': '64px',
  '@layout-header-padding': '0 50px',
  '@layout-footer-padding': '24px 50px',
  '@layout-trigger-height': '48px',
  '@layout-zero-trigger-width': '36px',
  '@layout-zero-trigger-height': '42px',
};

const ThemeConfig = _.assign(Base, Layout);
export default ThemeConfig;
