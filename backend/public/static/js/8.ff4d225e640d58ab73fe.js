webpackJsonp([8],{UvhZ:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=localStorage.getItem("access_token");console.log("LocalToken",a);var r={headers:{"access-token":a}},n={created:function(){var t=this;console.log(this,"lkjsdlkfjskldjflk"),this.$http.get("/api/admin/user/list",r).then(function(e){console.log(e.data),t.users=e.data})},methods:{arrangeTeams:function(){console.log(this.selected[0]),this.$http.post("/api/admin/team/arrange",{ssm_user:this.selected,ssm_new_team:this.tm_number},r).then(function(t){alert("팀 배정에 성공하였습니다.")}).catch(function(t){alert("팀 배정에 실패하였습니다. 아래의 {errorCode}로 관리자에게 문의해주세요. ERROR CODE :",t)})}},data:function(){return{descriptionItems:[5,10,15],selected:[],isTrue:!0,users:[],color:"#e95ea2",selectedColor:["primary","#e95ea2","success","danger","warning","dark","#B035E9"]}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("vs-table",{attrs:{stripe:"",search:"",multiple:"",pagination:"","max-items":t.descriptionItems[0],data:t.users,description:"","description-items":t.descriptionItems,"description-title":"color","description-connector":"color","description-body":"color"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,function(e,r){return s("vs-tr",{key:r,attrs:{data:e}},[s("vs-td",{attrs:{data:a[r].ssm_name}},[t._v("\n          "+t._s(a[r].ssm_name)+"\n        ")]),t._v(" "),s("vs-td",{attrs:{data:a[r].ssm_team}},[t._v("\n          "+t._s(a[r].ssm_team)+"\n        ")]),t._v(" "),s("vs-td",{attrs:{data:a[r].grp_seq}},[t._v("\n          "+t._s(a[r].grp_seq)+"\n        ")])],1)})}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[t._v("\n\n  >\n    "),s("template",{slot:"header"},[s("h2",[t._v("\n        팀 배정 \n      ")])]),t._v(" "),s("template",{slot:"thead"},[s("vs-th",{attrs:{"sort-key":t.ssm_name}},[t._v("이름")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.ssm_team}},[t._v("소속 팀")]),t._v(" "),s("vs-th",{attrs:{"sort-key":t.grp_seq}},[t._v("소속 조")])],1)],2),t._v(" "),s("div"),t._v(" "),s("div",{staticClass:"vs-con-table"},[s("vs-row",{attrs:{"vs-type":"flex","vs-justify":"end"}},[s("vs-col",{staticClass:"arrangeForm2",attrs:{"vs-justify":"center","vs-w":"12","vs-align":"center","vs-lg":"3","vs-xs":"3","vs-sm":"3"}},[s("vs-input",{attrs:{label:"배정할 팀 번호",color:t.color},model:{value:t.tm_number,callback:function(e){t.tm_number=e},expression:"tm_number"}})],1),t._v(" "),s("vs-col",{attrs:{"vs-justify":"center","vs-w":"12","vs-align":"center","vs-lg":"6","vs-xs":"12","vs-sm":"8"}},[s("div",{staticClass:"button-container"},[s("vs-button",{staticClass:"button-form",attrs:{color:t.color,type:"filled"},on:{click:t.arrangeTeams}},[t._v("팀 등록하기")])],1)])],1)],1),t._v(" "),s("div",{staticClass:"vs-con-table arrangeForm"},[s("h2",[t._v("선택된 팀원들 ("+t._s(t.selected.length)+")")]),t._v(" "),""!=t.selected[0]?s("div",{staticClass:"selectedItem_wrapper",attrs:{"vs-type":"flex"}},t._l(t.selected,function(e,a){return s("pre",{key:a,staticClass:"selectedItem",attrs:{data:e}},[t._v("      "),s("vs-button",{attrs:{color:t.selectedColor[a%7],type:"filled"}},[t._v(t._s(t.selected[a].ssm_name))]),t._v("\n    ")],1)}),0):t._e()])],1)},staticRenderFns:[]};var l=s("VU/8")(n,o,!1,function(t){s("rzC7")},null,null);e.default=l.exports},rzC7:function(t,e){}});
//# sourceMappingURL=8.ff4d225e640d58ab73fe.js.map