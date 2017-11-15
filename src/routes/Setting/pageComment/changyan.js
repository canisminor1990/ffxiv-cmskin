const createNs = () => {
  if (window.changyan !== undefined) {
  } else {
    window.changyan = {};
    window.changyan.api = {};
    window.changyan.api.config = conf => {
      window.changyan.api.tmpIsvPageConfig = conf;
    };
    window.changyan.api.ready = fn => {
      window.changyan.api.tmpHandles = window.changyan.api.tmpHandles || [];
      window.changyan.api.tmpHandles.push(fn);
    };
    window.changyan.ready = fn => {
      if (window.changyan.rendered) {
        fn && fn();
      } else {
        window.changyan.tmpHandles = window.changyan.tmpHandles || [];
        window.changyan.tmpHandles.push(fn);
      }
    };
  }
};

const createMobileNs = () => {
  if (window.cyan) return;
  window.cyan = {};
  window.cyan.api = {};
  window.cyan.api.ready = fn => {
    window.cyan.api.tmpHandles = window.cyan.api.tmpHandles || [];
    window.cyan.api.tmpHandles.push(fn);
  };
};
const loadVersionJs = () => {
  var loadJs = (src, fun) => {
    const head =
      document.getElementsByTagName('head')[0] || document.head || document.documentElement;

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    script.setAttribute('src', src);

    if (typeof fun === 'function') {
      if (window.attachEvent) {
        script.onreadystatechange = function() {
          const r = script.readyState;
          if (r === 'loaded' || r === 'complete') {
            script.onreadystatechange = null;
            fun();
          }
        };
      } else {
        script.onload = fun;
      }
    }

    head.appendChild(script);
  };

  const ver = +new Date() + window.Math.random().toFixed(16);
  const url = 'https://changyan.itc.cn/upload/version-v4.js?' + ver;
  loadJs(url);
};

export { createNs, createMobileNs, loadVersionJs };
