webpackJsonp([9],{"1jj8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=localStorage.getItem("access_token");console.log("LocalToken",s);var a={headers:{"access-token":s}},n={created:function(){},methods:{handleSelected:function(e){this.$vs.notify({title:"Selected "+e.username,text:"Email: "+e.email})},doubleSelection:function(e){this.$vs.notify({title:"Double Selection "+e.username,text:"Email: "+e.email,color:"success"})},findLeader:function(e){var t=this;this.$http.post("/api/admin/event/leader",{ssm_name:e},a).then(function(r){console.log("조장",r.data);var s=r.data.success,a=r.data.error;if(s){if(console.log(r.data),!confirm("이름 : "+e+", 연락처 : "+r.data.data.ssm_phone+" 이 맞으신가요?"))return t.grp_leader="",!1;t.grp_leader_seq=r.data.data.ssm_seq}else{if("no data"!=a)return!1;alert("등록되지 않은 이름입니다. 다시 한번 확인해주세요."),t.grp_leader=""}})},findSubLeader:function(e){var t=this;this.$http.post("/api/admin/event/leader",{ssm_name:e},a).then(function(r){console.log("부조장",r.data);var s=r.data.success,a=r.data.error;if(s){if(console.log(r.data),!confirm("이름 : "+e+", 연락처 : "+r.data.data.ssm_phone+" 이 맞으신가요?"))return t.grp_subldr="",!1;t.grp_subldr_seq=r.data.data.ssm_seq}else{if("no data"!=a)return!1;alert("등록되지 않은 이름입니다. 다시 한번 확인해주세요."),t.grp_subldr=""}})},findPastor:function(e){var t=this;this.$http.post("/api/admin/event/leader",{ssm_name:e},a).then(function(r){console.log("목회자",r.data);var s=r.data.success,a=r.data.error;if(s){if(console.log(r.data),!confirm("이름 : "+e+", 연락처 : "+r.data.data.ssm_phone+" 이 맞으신가요?"))return t.grp_pastor="",!1;t.grp_pastor_seq=r.data.data.ssm_seq}else{if("no data"!=a)return!1;alert("등록되지 않은 이름입니다. 다시 한번 확인해주세요."),t.grp_pastor=""}})},registerGroup:function(){""!=this.grp_number&&""!=this.grp_leader&&""!=this.grp_leader_seq?this.$http.post("/api/admin/group/create",{grp_number:this.grp_number,grp_leader:this.grp_leader_seq,grp_subldr:this.grp_subldr_seq,grp_pastor:this.grp_pastor_seq},a).then(function(e){console.log(e.data),e.data.success?alert("조 등록이 완료되었습니다."):alert("조 등록에 실패하였습니다.")}).catch(function(e){console.log(e)}):alert("조 정보를 모두 입력해주세요")}},data:function(){return{descriptionItems:[5,10,15],selected:[],color:"#e95ea2",grp_number:"",grp_leader:"",grp_subldr:"",grp_pastor:""}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("vs-row",{attrs:{"vs-justify":"center"}},[r("vs-col",{attrs:{"vs-justify":"center","vs-w":"12","vs-align":"center","vs-lg":"10","vs-xs":"12","vs-sm":"6"}},[r("vs-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("h3",[e._v("\n          조 생성\n        ")])]),e._v(" "),r("div",{attrs:{id:"formdata"}},[r("vs-row",{attrs:{"vs-type":"flex","vs-justify":"center"}},[r("vs-input",{attrs:{label:"조 번호",color:e.color},model:{value:e.grp_number,callback:function(t){e.grp_number=t},expression:"grp_number"}}),e._v(" "),r("vs-input",{attrs:{label:"조장 이름",color:e.color},on:{blur:function(t){return e.findLeader(e.grp_leader)}},model:{value:e.grp_leader,callback:function(t){e.grp_leader=t},expression:"grp_leader"}})],1),e._v(" "),r("vs-row",{attrs:{"vs-type":"flex","vs-justify":"center"}},[r("vs-input",{attrs:{label:"부조장 이름",color:e.color},on:{blur:function(t){return e.findSubLeader(e.grp_subldr)}},model:{value:e.grp_subldr,callback:function(t){e.grp_subldr=t},expression:"grp_subldr"}}),e._v(" "),r("vs-input",{attrs:{label:"목회자 이름",color:e.color},on:{blur:function(t){return e.findPastor(e.grp_pastor)}},model:{value:e.grp_pastor,callback:function(t){e.grp_pastor=t},expression:"grp_pastor"}})],1)],1),e._v(" "),r("br"),e._v(" "),r("vs-row",{attrs:{"vs-type":"flex","vs-justify":"center"}},[r("div",{staticClass:"button-container"},[r("vs-button",{staticClass:"button-form",attrs:{color:e.color,type:"filled"},on:{click:e.registerGroup}},[e._v("조 등록하기")])],1)])],1)],1)],1)],1)},staticRenderFns:[]};var l=r("VU/8")(n,o,!1,function(e){r("Ce15")},null,null);t.default=l.exports},Ce15:function(e,t){}});
//# sourceMappingURL=9.263884e04117548047ae.js.map