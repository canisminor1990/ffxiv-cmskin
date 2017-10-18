import { Job } from '../lang/cn';
import _ from 'lodash';

const parseName = db => {
  if (typeof db['name'] === 'undefined') return false;
  if (db['name'].indexOf('(') !== -1) {
    return 'Chocobo';
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
  count: db['swings'],
  percent: db['damage%'],
  highest: {
    full: _.startCase(db['maxhit']),
    value: db['MAXHIT'],
  },
  accuracy: {
    hits: db['hits'],
    misses: db['misses'],
    percent: db['tohit'],
  },
  criticals: {
    count: db['crithits'],
    percent: db['crithit%'],
  },
  directhit: {
    count: db['DirectHitCount'],
    percent: db['DirectHitPct'],
  },
  critdirecthit: {
    percent: db['CritDirectHitPct'],
  },
});

const parseHealing = db => ({
  total: parseInt(db['healed']),
  ps: parseInt(db['enchps']),
  count: db['heals'],
  percent: db['healed%'],
  over: db['OverHealPct'],
  highest: {
    full: _.startCase(db['maxhit']),
    value: db['MAXHEAL'],
  },
  criticals: {
    count: db['critheals'],
    percent: db['critheal%'],
  },
});
const parseTanking = db => ({
  total: parseInt(db['damagetaken']),
  parry: db['ParryPct'],
  block: db['BlockPct'],
});
const parseData = db => ({
  name: parseName(db),
  job: parseJob(db),
  longjob: parseLongjob(db),
  role: db['Job'] !== '' ? Job[db['Job'].toLowerCase()].role : '其他',
  damage: parseDamage(db),
  healing: parseHealing(db),
  tanking: parseTanking(db),
  kills: db['kills'],
  deaths: db['deaths'],
});

const parseCombatant = db => {
  let Combatant = [];
  _.forEach(db, (item, key) => {
    Combatant.push(parseData(item));
  });
  return Combatant;
};

const parseEncounter = db => ({
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
