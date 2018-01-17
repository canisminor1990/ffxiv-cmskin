import { Select } from 'antd';
import style from './index.scss';
import { Lang } from '../';
import classnames from 'classnames/bind';
import _ from 'lodash';

export default ({ defaultValue, options, mode = 'multiple', ...other }) => {
  let Options = [];
  if (mode === 'multiple') {
    _.forEach(options, (item, key) => {
      Options.push(<Select.Option key={key}>{Lang(item)}</Select.Option>);
    });
  } else {
    _.forEach(options, item => {
      Options.push(
        <Select.Option key={item} value={item}>
          {Lang(item)}
        </Select.Option>
      );
    });
  }
  return (
    <Select
      className={classnames.bind(style)('input', { single: !mode, multiple: mode === 'multiple' })}
      mode={mode}
      style={{ width: '100%' }}
      placeholder={Lang('placeholder.select')}
      defaultValue={defaultValue}
      dropdownMatchSelectWidth={true}
      dropdownClassName={style.menu}
      {...other}
    >
      {Options}
    </Select>
  );
};
