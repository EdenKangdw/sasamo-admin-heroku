<template>
    <div>
    <vs-table 
    stripe 
    search
    pagination 
     :max-items="descriptionItems[0]" 
     :data="groups"
    description
      :description-items="descriptionItems"
      description-title="사역자"
      description-connector="of"
      description-body="페이지"
    v-model="selected"

    >
      <template slot="header">
        <h2>
          조 목록
        </h2>
      </template>
      <template slot="thead">
        <vs-th sort-key="grp_number">조 번호</vs-th>
        <vs-th sort-key="grp_pastor">교역자</vs-th>
        <vs-th sort-key="grp_leader">조장</vs-th>
        <vs-th sort-key="grp_subldr">부조장</vs-th>
        <vs-th sort-key="grp_cnt">인원 수</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].grp_number">
            {{data[indextr].grp_number}}
          </vs-td>

          <vs-td :data="data[indextr].grp_pastor">
            {{data[indextr].grp_pastor}}
          <template slot="edit">
              <vs-input label="이름을 입력해주세요" v-model="tr.grp_pastor" class="inputx" :placeholder="data[indextr].grp_pastor" @blur="updateGroupPastor(tr)"/>
          </template>
          </vs-td>

          <vs-td :data="data[indextr].grp_leader">
            {{data[indextr].grp_leader}}
             <template slot="edit">
              <vs-input label="이름을 입력해주세요" v-model="tr.grp_leader" class="inputx" :placeholder="data[indextr].grp_leader" @blur="updateGroupLeader(tr)"/>
          </template>
          </vs-td>
          <vs-td :data="data[indextr].grp_subldr">
            {{data[indextr].grp_subldr}}
             <template slot="edit">
              <vs-input label="이름을 입력해주세요" v-model="tr.grp_subldr" class="inputx" :placeholder="data[indextr].grp_subldr" @blur="updateGroupSubLdr(tr)"/>
          </template>
          </vs-td>
          <vs-td :data="data[indextr].grp_cnt">
            {{data[indextr].grp_cnt}}
          </vs-td>

          
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<style lang="stylus">

.con-expand-users 
    width 100%
  .con-btns-user
    display flex
    padding 10px
    padding-bottom 0px
    align-items center
    justify-content space-between
    .con-userx
      display flex
      align-items center
      justify-content flex-start
  .list-icon
    i
      font-size .9rem !important
</style>
<script>
const interval = require('interval-call')

let token = localStorage.getItem('access_token')
    console.log("LocalToken", token)
    let config = {
      headers : {
        "access-token" : token
      }
    }
export default {
  

created () {


      this.$http.get('/api/admin/group/list', config)
        .then(res => {
          console.log(res.data.data)
          this.groups = res.data.data
        })
    }, 
methods:{
  updateGroupLeader(tr){
    console.log('DATA :::::::::', typeof tr.grp_leader)
      this.$http.post('/api/admin/event/leader', {
        ssm_name : tr.grp_leader 
      }, config)
      .then(res => {
        console.log('GRP LEADER1', res.data)
        const success = res.data.success
        console.log('GRP LEADER2', res.data.success)
        const error = res.data.error
        console.log('GRP LEADER3', res.data)
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${tr.grp_leader}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            console.log('LEADER :', tr.grp_leader, res.data.data.ssm_seq)
            this.leader_seq = res.data.data.ssm_seq
            this.$http.post('/api/admin/group/update', {
              grp_number : tr.grp_number,
              grp_ldrType : 1,
              grp_ldrSeq : this.leader_seq,
            }, config)
          } else {
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
          tr.grp_leader = ''
        } else {
          return false
        }


      })
    },
  updateGroupSubLdr(tr){
      this.$http.post('/api/admin/event/leader', {
        ssm_name : tr.grp_subldr 
      }, config)
      .then(res => {
        console.log('GRP SUBLDR', res.data)
        const success = res.data.success
        const error = res.data.error
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${tr.grp_subldr}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            this.leader_seq = res.data.data.ssm_seq
            this.$http.post('/api/admin/group/update', {
              grp_number : tr.grp_number,
              grp_ldrType : 2,
              grp_ldrSeq : this.leader_seq,
            }, config)
          } else {
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
           tr.grp_subldr  = ''
        } else {
          return false
        }


      })
    },
  updateGroupPastor(tr){
      this.$http.post('/api/admin/event/leader', {
        ssm_name : tr.grp_pastor 
      }, config)
      .then(res => {
        console.log('GRP PASTOR', res.data)
        const success = res.data.success
        const error = res.data.error
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${tr.grp_pastor}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            this.leader_seq = res.data.data.ssm_seq
            this.$http.post('/api/admin/group/update', {
              grp_number : tr.grp_number,
              grp_ldrType : 3,
              grp_ldrSeq : this.leader_seq,
            }, config)
            
          } else {
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
          tr.grp_pastor = ''
        } else {
          return false
        }


      })
    },

},

data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    groups:[],
    leader_seq : '',
  })
}
</script>