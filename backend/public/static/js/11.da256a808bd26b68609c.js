webpackJsonp([11],{aIDg:function(t,e){},jcxX:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={created:function(){var t=this,e=localStorage.getItem("access_token");console.log("LocalToken",e);var s={headers:{"access-token":e}};this.$http.get("/api/admin/event/list",s).then(function(e){console.log(e.data),t.events=e.data.data}).catch(function(t){console.log(t)})},methods:{handleSelected:function(t){this.$vs.notify({title:"Selected "+t.username,text:"Email: "+t.email})},doubleSelection:function(t){this.$vs.notify({title:"Double Selection "+t.username,text:"Email: "+t.email,color:"success"})}},data:function(){return{descriptionItems:[5,10,15],selected:[],events:[]}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("vs-table",{attrs:{stripe:"",search:"",pagination:"","max-items":t.descriptionItems[0],data:t.events,description:"","description-items":t.descriptionItems,"description-title":"이벤트","description-connector":"of","description-body":"페이지"},on:{selected:t.handleSelected,dblSelection:t.doubleSelection},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.data;return t._l(n,function(e,a){return s("vs-tr",{key:a},[s("input",{attrs:{type:"hidden"},domProps:{value:n[a].evt_seq}}),t._v(" "),s("vs-td",{attrs:{data:n[a].evt_name}},[t._v("\n          "+t._s(n[a].evt_name)+"\n        ")]),t._v(" "),s("vs-td",{attrs:{data:n[a].evt_date}},[t._v("\n          "+t._s(n[a].evt_date)+"\n        ")]),t._v(" "),s("vs-td",{attrs:{data:n[a].evt_kind}},[t._v("\n          "+t._s(n[a].evt_kind)+"\n        ")]),t._v(" "),s("vs-td",{attrs:{data:n[a].evt_today}},[s("vs-switch",{attrs:{color:"success"},on:{change:function(s){return t.updateCheck(e)}},model:{value:e.evt_today,callback:function(s){t.$set(e,"evt_today",s)},expression:"tr.evt_today"}},["y"==e.evt_today||e.evt_today?s("span",{attrs:{slot:"on"},slot:"on"},[t._v("이번주")]):s("span",{attrs:{slot:"off"},slot:"off"},[t._v("X")])])],1),t._v(" "),s("vs-td",{attrs:{data:n[a].evt_cnt_apply}},[t._v("\n           "+t._s(n[a].evt_cnt_apply)+"  \n            \n        ")]),t._v(" "),s("vs-td",{attrs:{data:n[a].evt_cnt_check}},[t._v("\n           "+t._s(n[a].evt_cntevt_cnt_check)+"  \n            \n        ")])],1)})}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[s("template",{slot:"header"},[s("h2",[t._v("\n        이벤트 관리\n      ")])]),t._v(" "),s("template",{slot:"thead"},[s("vs-th",{attrs:{"sort-key":t.evt_name}},[t._v("이름")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.evt_date}},[t._v("날짜")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.evt_kind}},[t._v("종류")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.evt_today}},[t._v("이번주 이벤트")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.evt_cnt_apply}},[t._v("사역신청 수")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.evt_cnt_check}},[t._v("출석체크 수")])],1)],2)],1)},staticRenderFns:[]};var o=s("VU/8")(n,a,!1,function(t){s("aIDg")},null,null);e.default=o.exports}});
//# sourceMappingURL=11.da256a808bd26b68609c.js.map