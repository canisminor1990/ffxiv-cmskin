import _ from 'lodash';

const BuildData = (name, data) => {
  const Data = {};
  _.forEach(data, (group, key) => {
    Data[key] = {};
    group.forEach(item => (Data[key][item] = `${name}.${key}.${item}`));
  });
  return Data;
};

const Setting = {
  damage: {
    title: 'footer.dps',
    color: '#d86f87',
  },
  healing: {
    title: 'footer.heal',
    color: '#649029',
  },
  tanking: {
    title: 'footer.tank',
    color: '#4488fc',
  },
};

const EncounterRaw = BuildData('encounter', {
  damage: ['total', 'avps', 'ps', 'ps10', 'ps30', 'ps60', 'count', 'highest', 'kills'],
  healing: ['total', 'ps', 'count', 'highest', 'deaths'],
  tanking: ['total'],
});

const parse = mainKey => {
  const buildData = {};
  _.forEach(EncounterRaw[mainKey], (item, key) => {
    buildData[`${mainKey}.${key}`] = item;
  });
  return buildData;
};

const Encounter = {
  time: 'encounter.time',
  ...parse('damage'),
  ...parse('healing'),
  ...parse('tanking'),
};

const Combatant = BuildData('combatant', {
  damage: [
    'total',
    'ps',
    'ps10',
    'ps30',
    'ps60',
    'count',
    'percent',
    'highest',
    'criticals',
    'directhit',
    'critdirecthit',
    'kills',
  ],
  healing: ['total', 'ps', 'count', 'percent', 'over', 'highest', 'criticals', 'deaths'],
  tanking: ['total', 'percent', 'parry', 'block', 'dodge'],
});

export default {
  EncounterRaw: EncounterRaw,
  Encounter: Encounter,
  Combatant: Combatant,
  Setting: Setting,
};
