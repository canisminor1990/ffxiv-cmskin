import style from './index.scss';
import path from 'path';

export default ({ size = '2.5rem', deaths = 0, job }) => {
  const avatarStyle = {
    minWidth: size,
    width: size,
    height: size,
  };

  return (
    <div className={style.avatar} style={avatarStyle}>
      {deaths > 0 ? <div className={style.deaths}>✗{deaths}</div> : null}
      <img src={path.join('/img/jobs', job + '.png')} />
    </div>
  );
};
