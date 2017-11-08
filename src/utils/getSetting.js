const getSetting = (data, props, Default = false) => {
  const Settings = {};
  data.forEach(item => (Settings[item] = Default ? props[`${item}Default`] : props[item]));
  return Settings;
};

export { getSetting };
