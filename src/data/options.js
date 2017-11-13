import _ from 'lodash';

const Setting = {
  damage: {
    title: '输出',
    color: '#d86f87',
  },
  healing: {
    title: '治疗',
    color: '#649029',
  },
  tanking: {
    title: '承伤',
    color: '#4488fc',
  },
};

const EncounterRaw = {
  damage: {
    total: '总输出',
    avps: '均秒伤',
    ps: '总秒伤',
    ps10: '10秒伤',
    ps30: '30秒伤',
    ps60: '60秒伤',
    count: '攻数',
    highest: '最高伤',
    kills: '击杀',
  },
  healing: {
    total: '总治疗',
    ps: '秒秒疗',
    count: '疗数',
    highest: '最高疗',
    deaths: '死亡',
  },
  tanking: {
    total: '总承伤',
  },
};

const build = mainKey => {
  const buildData = {};
  _.forEach(EncounterRaw[mainKey], (item, key) => {
    buildData[`${mainKey}.${key}`] = item;
  });
  return buildData;
};

const Encounter = {
  time: '时间',
  ...build('damage'),
  ...build('healing'),
  ...build('tanking'),
};

const Combatant = {
  damage: {
    total: '总量',
    ps: '秒伤',
    ps10: '10秒伤',
    ps30: '30秒伤',
    ps60: '60秒伤',
    count: '次数',
    percent: '占比',
    highest: '最高伤',
    criticals: '暴击',
    directhit: '直击',
    critdirecthit: '直爆',
    kills: '击杀',
  },
  healing: {
    total: '总量',
    ps: '秒疗',
    count: '次数',
    percent: '占比',
    over: '过量',
    highest: '最高疗',
    criticals: '暴击',
    deaths: '死亡',
  },
  tanking: {
    total: '总量',
    percent: '占比',
    parry: '招架',
    block: '格挡',
    dodge: '回避',
  },
};

export default {
  EncounterRaw: EncounterRaw,
  Encounter: Encounter,
  Combatant: Combatant,
  Setting: Setting,
};
