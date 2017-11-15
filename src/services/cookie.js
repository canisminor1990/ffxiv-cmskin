const setCookie = (name, value) => {
  const Days = 30;
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(value)};expires=${exp.toGMTString()};path=/`;
};

const getCookie = name => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let arr;
  if ((arr = document.cookie.match(reg))) return JSON.parse(arr[2]);
  else return null;
};

export { setCookie, getCookie };
