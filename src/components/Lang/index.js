import langData from '../../lang';

export default ({ id }) => {
  try {
    return langData[window.lang][id].toString();
  } catch (e) {
    console.log('No lang:', id);
    return id.toString();
  }
};
