import style from './index.scss';
import { Job as JobData } from '../../data';
import path from 'path';

export default ({ size = '2.5rem', deaths = 0, job, diy }) => {
  const avatarStyle = {
    minWidth: size,
    width: size,
    height: size,
  };

  const Jobs = Object.keys(JobData);
  const Job = Jobs.indexOf(job) === -1 ? 'default' : job;
  const Img = diy ? (
    <div className={style.diy}>
      <div style={{ backgroundImage: `url(${job})` }} />
    </div>
  ) : (
    <img src={path.join('/img/jobs', Job + '.png')} />
  );
  return (
    <div className={style.avatar} style={avatarStyle}>
      {deaths > 0 ? <div className={style.deaths}>✗{deaths}</div> : null}
      {Img}
    </div>
  );
};
