webpackJsonp([12],{"7YgM":function(e,t){e.exports={name:"ffxiv-cmskin",version:"2.2.2",main:"src/index.html",repository:{type:"git",url:"git@github.com:canisminor1990/ffxiv-cmskin.git",coding:"git@git.coding.net:canisminor1990/ffxiv-cmskin.git"},author:{name:"CanisMinor",email:"i@canisminor.cc",url:"https://canisminor.cc/"},license:"MIT",scripts:{start:"ESLINT=none roadhog dev",build:"ESLINT=none roadhog build && gulp html",publish:"bash ./script/publish.sh",test:"gulp test",nga:"gulp nga -m ",lint:"lint-staged","lint:es":"eslint --fix --ext .js src"},"pre-commit":["lint"],"lint-staged":{"*.md":["prettier --trailing-comma all --single-quote --write","git add"],"*.json":["prettier --trailing-comma all --single-quote --write","git add"],"src/**/*.scss":["prettier --trailing-comma all --single-quote --write","git add"],"./*.js":["eslint --fix","git add"],"src/**/*.js":["eslint --fix","git add"]},dependencies:{antd:"^3.1.0",classnames:"^2.2.5",dva:"^2.1.0","dva-loading":"^1.0.4",g2:"^2.3.13","g2-react":"^1.3.2",history:"^4.7.2","include-media":"^1.4.9",path:"^0.12.7","qrcode.react":"^0.7.2",react:"^16.2.0","react-contextmenu":"^2.8.0","react-dom":"^16.2.0"},devDependencies:{"@babel/core":"^7.6.4","@babel/plugin-transform-runtime":"^7.6.2","@babel/preset-env":"^7.6.3","@babel/register":"^7.6.2","babel-eslint":"^10.0.3","babel-loader":"^8.0.6","babel-plugin-import":"^1.12.2","babel-plugin-lodash":"^3.3.4","browser-sync":"^2.23.5","connect-history-api-fallback":"^1.5.0",cssnano:"^3.10.0",eslint:"^4.13.1","eslint-config-prettier":"^2.9.0","eslint-config-standard":"^10.2.1","eslint-plugin-flowtype":"^2.37.0","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.2.0","eslint-plugin-prettier":"^2.3.1","eslint-plugin-promise":"^3.5.0","eslint-plugin-react":"^7.4.0","eslint-plugin-standard":"^3.0.1",expect:"^1.20.2","fs-extra":"^4.0.2",gulp:"^4.0.2","gulp-html-beautify":"^1.0.1",husky:"^0.14.3","lint-staged":"^4.2.3",lodash:"^4.17.4","node-sass":"^4.5.3","postcss-pxtorem":"^4.0.1","pre-commit":"^1.2.2",prettier:"^1.9.2","redbox-react":"^1.5.0",roadhog:"^2.5.0-beta.4","sass-loader":"^6.0.6"}}},VXAV:function(e,t,a){"use strict";var n=a("ouCL"),i=a("mhuh");Object.defineProperty(t,"__esModule",{value:!0}),t.FooterLite=t.PageComponent=void 0;var l=i(a("GiK3")),s=n(a("+TWC")),o=n(a("Q9dM")),r=n(a("F6AD")),u=n(a("fghW")),c=n(a("QwVp")),d=a("bGai"),g=a("oyqm"),f=n(a("CHcj")),m=d.View.Split,p=d.View.Footer,b=function(){return[l.default.createElement(m,{key:"split"}),l.default.createElement(p,{key:"footer",className:f.default.foot},l.default.createElement(d.Back,null))]};t.FooterLite=b;var h=function(e){function t(){var e,a;(0,o.default)(this,t);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return a=(0,r.default)(this,(e=(0,u.default)(t)).call.apply(e,[this].concat(i))),a.onDefault=function(){var e=(0,s.default)({timekey:a.state.timekey+1},(0,g.getSetting)(a.Setting,a.props.setting,!0));a.setState(e),d.Message.success((0,d.Lang)("setting.message.reset"))},a.onSave=function(){window.lang=a.state.lang,a.setState({timekey:a.state.timekey+1}),a.props.dispatch({type:"setting/update",payload:a.state}),d.Message.success((0,d.Lang)("setting.message.apply"))},a.Footer=[l.default.createElement(m,{key:"split"}),l.default.createElement(p,{key:"footer",className:f.default.foot,hasBtn:!0,rightContent:l.default.createElement("div",{className:f.default.btngroup},l.default.createElement(d.Button,{onClick:a.onDefault},(0,d.Lang)("setting.btn.reset")),l.default.createElement(d.Button,{onClick:a.onSave},(0,d.Lang)("setting.btn.apply")))},window.websocket?l.default.createElement(d.Back,null):null)],a}return(0,c.default)(t,e),t}(l.Component);t.PageComponent=h},h5Co:function(e,t,a){"use strict";var n=a("ouCL"),i=a("mhuh");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=i(a("GiK3")),s=n(a("Q9dM")),o=n(a("wm7F")),r=n(a("F6AD")),u=n(a("fghW")),c=n(a("QwVp")),d=a("VXAV"),g=a("bGai"),f=a("Oac0"),m=n(a("7YgM")),p=n(a("CHcj")),b=g.View.Content,h=g.View.Split,y=m.default.version,v=function(e){function t(){return(0,s.default)(this,t),(0,r.default)(this,(0,u.default)(t).apply(this,arguments))}return(0,c.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=function(e,t){return[l.default.createElement(h,{key:e+"split",className:p.default.title,id:e}),l.default.createElement("div",{key:e+"list",className:p.default.list},t.map(function(e){return l.default.createElement(g.InfoList,{key:e.title,title:e.title,desc:e.desc})}))]};return[l.default.createElement(b,{key:"content",className:p.default.content},l.default.createElement(h,{className:p.default.title,id:"setting.about.version"}),l.default.createElement("div",{className:p.default.logo},l.default.createElement(g.Logo,{size:300})),l.default.createElement("div",{className:p.default.list},l.default.createElement(g.InfoList,{title:"Version",desc:y})),e("setting.about.author",f.Author),e("setting.about.contact",f.Contact),e("setting.about.git",f.Github),e("setting.about.link",f.Link)),l.default.createElement(d.FooterLite,{key:"foot"})]}}]),t}(l.Component);t.default=v}});