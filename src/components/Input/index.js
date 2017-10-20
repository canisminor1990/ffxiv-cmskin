import { Input } from 'antd';
import style from './index.scss';

export default ({ ...other }) => <Input className={style.input} {...other} />;
