export default () => {
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?4bd4ebaa032babcb958a74b644bb924b';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
};
