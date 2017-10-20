import style from './index.scss';
import path from 'path';

export default ({ size = '2.5rem', deaths = 0, job, diy }) => {
  const avatarStyle = {
    minWidth: size,
    width: size,
    height: size,
  };

  const Jobs = [
    'acn',
    'arc',
    'ast',
    'blm',
    'brd',
    'cnj',
    'drg',
    'drk',
    'gla',
    'limitbreak',
    'lnc',
    'mch',
    'mnk',
    'mrd',
    'nin',
    'pet',
    'pgl',
    'pld',
    'rdm',
    'rog',
    'sam',
    'sch',
    'smn',
    'thm',
    'war',
    'whm',
  ];
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
