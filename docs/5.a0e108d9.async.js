webpackJsonp([5],{478:function(t,a){t.exports={view:"view___3g3n9",bar:"bar___1Fy6q",content:"content___1QZ3O",list:"list___24G6Q",active:"active___2yV37",date:"date___1flzb",title:"title___1z4bE",history:"history___gyBX-",showup:"showup___1eacI"}},495:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(10),n=e.n(i),o=e(19),c=e.n(o),s=e(16),r=e.n(s),_=e(0),u=(e.n(_),e(54)),d=(e.n(u),e(32)),l=(e.n(d),e(52)),p=e(111),h=e(23),v=e.n(h),b=e(478),y=e.n(b),f=l.p.Header,m=l.p.Content,g=l.p.Bar,O=l.p.Footer,j=l.p.Split,N=["historyPage","uiMini"],w=function(t){return r()({data:t.act},Object(p.a)(N,t.setting))},M=n()(j,{},"split"),E=n()(O,{},"footer",n()(l.b,{})),P=function(t){var a=t.data,e=t.dispatch,i=c()(t,["data","dispatch"]),o=[];a[0]?a.forEach(function(t,a){var c=t.Encounter,s=t.Date,r=v.a.bind(y.a)("list",{active:a===i.historyPage});o.push(n()(d.Link,{className:r,to:"/",onClick:function(){return e({type:"setting/update",payload:{historyPage:a}})}},a,n()("div",{className:y.a.date},void 0,s),n()("div",{className:y.a.title},void 0,c.zone,"Encounter"!==c.name?n()("span",{},void 0," \xb7 ".concat(c.name)):"")))}):o=n()("div",{className:y.a.history},void 0,Object(l.i)("history.null"));var s=i.uiMini?null:n()(g,{className:y.a.bar},"bar",Object(l.i)("history.bar"));return[n()(f,{uiMini:i.uiMini},"header",Object(l.i)("history.header")),s,n()(m,{className:y.a.content},"content",o),M,E]};a.default=Object(u.connect)(w)(P)}});