import { Job } from '../data/index';
import { Lang } from '../components/index';
import _ from 'lodash';
import cacheResult from '../utils/cacheResult';

const parseEncounter = db => ({
  time: db['duration'],
  zone: db['CurrentZoneName'],
  name: db['title'],
  duration: parseInt(db['DURATION']),
  damage: parseDamage(db),
  healing: parseHealing(db),
  tanking: parseTanking(db),
});

const parseCombatantData = (db, Damage) => ({
  name: parseName(db),
  job: parseJob(db),
  role: parseRole(db),
  damage: parseDamage(db),
  healing: parseHealing(db),
  tanking: parseTanking(db, Damage),
  isMy: db['name'] === 'YOU',
});

// 分组：damage/healing/tanking

const parseDamage = db => ({
  total: parseInt(db['damage']),
  ps: parseInt(db['encdps']),
  ps10: parseInt(db['Last10DPS']),
  ps30: parseInt(db['Last30DPS']),
  ps60: parseInt(db['Last60DPS']),
  count: parseInt(db['swings']),
  percent: db['damage%'],
  criticals: db['crithit%'],
  directhit: db['DirectHitPct'],
  critdirecthit: db['CritDirectHitPct'],
  highest: parseHighest(db['maxhit']),
  kills: parseInt(db['kills']),
});

const parseHealing = db => ({
  total: parseInt(db['healed']),
  ps: parseInt(db['enchps']),
  count: parseInt(db['heals']),
  percent: db['healed%'],
  over: db['OverHealPct'],
  criticals: db['critheal%'],
  highest: parseHighest(db['maxheal']),
  deaths: parseInt(db['deaths']),
});

const parseTanking = (db, Damage) => ({
  total: parseInt(db['damagetaken']),
  percent: parseInt((db['damagetaken'] / Damage) * 100) + '%',
  parry: db['ParryPct'],
  block: db['BlockPct'],
  dodge: parseInt(100 - db['IncToHit']) + '%',
});

// 处理Combatant数组

const parseCombatant = db => {
  let Combatant = [];
  let Damage = 0;
  _.forEach(db, item => {
    Damage = Damage + parseInt(item['damagetaken']);
  });
  _.forEach(db, item => {
    Combatant.push(parseCombatantData(item, Damage));
  });
  return Combatant;
};

export { parseCombatant, parseEncounter };

// 格式化方法

/**
 * check if a name is a npc in the trust system
 * @param {string} name
 * @returns {string|null}
 */
const isNpc = cacheResult(name => {
  if (typeof name !== 'string') return null;
  const npcName = Lang('npcName');
  const match = name.match(/^(.+?) \((.+?)\)$/);
  if (!match) return null;
  // `阿莉塞 (玩家ID)`
  if (npcName.indexOf(match[1]) !== -1) return match[1];
  // `月长石宝石兽 (阿尔菲诺)`
  if (npcName.indexOf(match[2]) !== -1) return name;
  return null;
});

const parseName = db => {
  if (typeof db['name'] === 'undefined') return false;
  if (isNpc(db['name']) !== null) {
    return isNpc(db['name']);
  } else if (db['name'].indexOf('(') !== -1) {
    return Lang('role.chocobo');
  } else if (db['name'].toLowerCase() === 'you') {
    return Lang('role.you');
  } else if (db['name'].toLowerCase() === 'limit break') {
    return Lang('role.limitbreak');
  } else {
    return db['name'];
  }
};

const parseRole = db => (db['Job'] !== '' ? Job[db['Job'].toLowerCase()] : false);

const parseJob = db => {
  if (typeof db['Job'] !== 'undefined' && db['Job'] !== '') {
    return db['Job'].toLowerCase();
  } else if (typeof db['name'] !== 'undefined' && db['name'].indexOf('(') !== -1) {
    return 'chocobo';
  } else {
    return db['name'].replace(' ', '').toLowerCase();
  }
};

const parseHighest = db => db.replace('unknown', Lang('role.other'));
