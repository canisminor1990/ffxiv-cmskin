export default func => {
  const cache = {};
  const executed = new Set();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!executed.has(key)) {
      cache[key] = func(...args);
      executed.add(key);
    }
    return cache[key];
  };
};
