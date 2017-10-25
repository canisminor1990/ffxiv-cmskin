import { Job } from '../lang/cn';
import _ from 'lodash';

const parseName = db => {
  if (typeof db['name'] === 'undefined') return false;
  if (db['name'].indexOf('(') !== -1) {
    return '陆行鸟';
  } else if (db['name'].toLowerCase() === 'you') {
    return '我';
  } else if (db['name'].toLowerCase() === 'limit break') {
    return '极限技';
  } else {
    return db['name'];
  }
};

const parseJob = db => {
  if (typeof db['Job'] !== 'undefined' && db['Job'] !== '') {
    return db['Job'].toLowerCase();
  } else if (typeof db['name'] !== 'undefined' && db['name'].indexOf('(') !== -1) {
    return 'pet';
  } else {
    return db['name'].replace(' ', '').toLowerCase();
  }
};

const parseLongjob = db => {
  if (typeof db['Job'] !== 'undefined' && db['Job'] !== '') {
    return Job[db['Job'].toLowerCase()].name;
  } else if (typeof db['name'] !== 'undefined') {
    try {
      return db['name'].indexOf('(') !== -1 ? 'Chocobo' : Job[db['name'].toLowerCase()].name;
    } catch (e) {
      return db['name'];
    }
  } else {
    return db['name'];
  }
};

const parseDamage = db => ({
  total: parseInt(db['damage']),
  ps: parseInt(db['encdps']),
  count: parseInt(db['swings']),
  percent: db['damage%'],
  highest: {
    full: _.startCase(db['maxhit']),
    value: parseInt(db['MAXHIT']),
  },
  accuracy: {
    hits: parseInt(db['hits']),
    misses: db['misses'],
    percent: parseInt(db['tohit']) + '%',
  },
  criticals: {
    count: parseInt(db['crithits']),
    percent: db['crithit%'],
  },
  directhit: {
    count: parseInt(db['DirectHitCount']),
    percent: db['DirectHitPct'],
  },
  critdirecthit: {
    percent: db['CritDirectHitPct'],
  },
});

const parseHealing = db => ({
  total: parseInt(db['healed']),
  ps: parseInt(db['enchps']),
  count: parseInt(db['heals']),
  percent: db['healed%'],
  over: db['OverHealPct'],
  highest: {
    full: _.startCase(db['maxheal']).replace('Unknown', '其他'),
    value: parseInt(db['MAXHEAL']),
  },
  criticals: {
    count: parseInt(db['critheals']),
    percent: db['critheal%'],
  },
});
const parseTanking = (db, Damage) => ({
  total: parseInt(db['damagetaken']),
  percent: parseInt(db['damagetaken'] / Damage * 100) + '%',
  parry: db['ParryPct'],
  block: db['BlockPct'],
  inc: parseInt(100 - db['IncToHit']) + '%',
});
const parseData = (db, Damage) => ({
  name: parseName(db),
  job: parseJob(db),
  longjob: parseLongjob(db),
  role: db['Job'] !== '' ? Job[db['Job'].toLowerCase()].role : '其他',
  damage: parseDamage(db),
  healing: parseHealing(db),
  tanking: parseTanking(db, Damage),
  kills: db['kills'],
  deaths: db['deaths'],
  isMy: db['name'] === 'YOU',
});

const parseCombatant = db => {
  let Combatant = [];
  let Damage = 0;
  _.forEach(db, item => {
    Damage = Damage + parseInt(item['damagetaken']);
  });
  _.forEach(db, item => {
    Combatant.push(parseData(item, Damage));
  });
  return Combatant;
};

const parseEncounter = db => ({
  time: db['duration'],
  zone: db['CurrentZoneName'],
  name: db['title'],
  duration: db['duration'],
  kills: db['kills'],
  deaths: db['deaths'],
  dps: {
    s10: db['Last10DPS'],
    s30: db['Last30DPS'],
    s60: db['Last60DPS'],
  },
  damage: parseDamage(db),
  healing: parseHealing(db),
  tanking: parseTanking(db),
});

export { parseCombatant, parseEncounter };
