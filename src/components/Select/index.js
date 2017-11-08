import { Select } from 'antd';
import style from './index.scss';
import _ from 'lodash';

const Option = Select.Option;

export default ({ defaultValue, options, ...other }) => {
  let Options = [];
  _.forEach(options, (item, key) => {
    Options.push(<Option key={key}>{item}</Option>);
  });
  return (
    <Select
      className={style.input}
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="请选择数据标签..."
      defaultValue={defaultValue}
      dropdownMatchSelectWidth={false}
      dropdownClassName={style.menu}
      {...other}
    >
      {Options}
    </Select>
  );
};
