webpackJsonp([4],{"/FY7":function(e,t){e.exports={content:"content___1dIc4",qrcode:"qrcode___ZaXmv",scan:"scan___2Znr2",showup:"showup___gdbL-"}},MyLS:function(e,t,a){"use strict";var n=a("ouCL");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a("GiK3")),c=n(a("09s/")),d=a("bGai"),o=n(a("/FY7")),r=d.View.Header,u=d.View.Content,s=d.View.Split,f=d.View.Footer,i=function(){var e=window.wsURL?l.default.createElement(c.default,{value:window.wsURL,bgColor:"#eee1c5",fgColor:"#333",size:160,level:"Q"}):(0,d.Lang)("qrcode.null");return[l.default.createElement(r,{key:"header"},(0,d.Lang)("qrcode.header")),l.default.createElement(u,{className:o.default.content,key:"content"},l.default.createElement("div",{className:o.default.qrcode},e),l.default.createElement("div",{className:o.default.scan},(0,d.Lang)("qrcode.scan"))),l.default.createElement(s,{key:"split"}),l.default.createElement(f,{key:"footer"},l.default.createElement(d.Back,null))]};t.default=i}});