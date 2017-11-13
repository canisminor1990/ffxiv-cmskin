import { Select } from 'antd';
import style from './index.scss';
import classnames from 'classnames/bind';
import _ from 'lodash';

export default ({ defaultValue, options, mode = 'multiple', ...other }) => {
  let Options = [];
  if (mode === 'multiple') {
    _.forEach(options, (item, key) => {
      Options.push(<Select.Option key={key}>{item}</Select.Option>);
    });
  } else {
    _.forEach(options, item => {
      Options.push(
        <Select.Option key={item.value} value={item.value}>
          {item.text}
        </Select.Option>
      );
    });
  }
  return (
    <Select
      className={classnames.bind(style)('input', { single: !mode, multiple: mode === 'multiple' })}
      mode={mode}
      style={{ width: '100%' }}
      placeholder="请选择数据标签..."
      defaultValue={defaultValue}
      dropdownMatchSelectWidth={true}
      dropdownClassName={style.menu}
      {...other}
    >
      {Options}
    </Select>
  );
};
