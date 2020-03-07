<template>
<div>
<vs-row vs-justify="center">
  <vs-col vs-justify="center" vs-w="12" vs-align="center" vs-lg="10" vs-xs="12" vs-sm="6">
    <vs-card>
      <div slot="header">
        <h3>
          조 생성
        </h3>
      </div>
      <div id="formdata">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-input label="조 번호" :color="color" v-model="grp_number"/>
          <vs-input label="조장 이름" :color="color" v-model="grp_leader" @blur="findLeader(grp_leader)"/>
        </vs-row>
        <vs-row vs-type="flex" vs-justify="center">
          <vs-input label="부조장 이름" :color="color" v-model="grp_subldr" @blur="findSubLeader(grp_subldr)"/>
          <vs-input label="목회자 이름" :color="color" v-model="grp_pastor" @blur="findPastor(grp_pastor)"/>
        </vs-row>
      </div>
      <br>
      <vs-row vs-type="flex" vs-justify="center">
      <div class="button-container">
         <vs-button class="button-form" :color="color" type="filled" @click="registerGroup">조 등록하기</vs-button>
      </div>
      </vs-row>
    </vs-card>
   
  </vs-col>
</vs-row>
   </div>  
</template>

<style lang="stylus">
  #formdata
  display flex
  .centerx labelx
    .vs-input
      margin 10px
  .button-container
    width 100%
    display contents
  .button-form
    width 40%
  .con-vs-checkbox
    margin-top 20px
</style>

<script>
let token = localStorage.getItem('access_token')
    console.log("LocalToken", token)
    let config = {
      headers : {
        "access-token" : token
      }
    }


export default {
  created () {

    
    
  },

methods:{
    handleSelected(tr) {
      this.$vs.notify({
        title:`Selected ${tr.username}`,
        text:`Email: ${tr.email}`
      })
    },
    doubleSelection(tr) {
      this.$vs.notify({
        title:`Double Selection ${tr.username}`,
        text:`Email: ${tr.email}`,
        color: 'success'
      })
    },
    findLeader(name){
      this.$http.post('/api/admin/event/leader', {
        ssm_name : name 
      }, config)
      .then(res => {
        console.log('조장', res.data)
        const success = res.data.success
        const error = res.data.error
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${name}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            this.grp_leader_seq = res.data.data.ssm_seq
          } else {
            this.grp_leader = ''
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
          this.grp_leader = ''
        } else {
          return false
        }


      })
    },
    findSubLeader(name){
      this.$http.post('/api/admin/event/leader', {
        ssm_name : name 
      }, config)
      .then(res => {
        console.log('부조장', res.data)
        const success = res.data.success
        const error = res.data.error
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${name}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            this.grp_subldr_seq = res.data.data.ssm_seq
          } else {
            this.grp_subldr = ''
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
          this.grp_subldr = ''
        } else {
          return false
        }


      })
    },
    findPastor(name){
      this.$http.post('/api/admin/event/leader', {
        ssm_name : name 
      }, config)
      .then(res => {
        console.log('목회자', res.data)
        const success = res.data.success
        const error = res.data.error
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${name}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            this.grp_pastor_seq = res.data.data.ssm_seq
          } else {
            this.grp_pastor = ''
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
          this.grp_pastor = ''
        } else {
          return false
        }


      })
    },
    registerGroup() {

      if(this.grp_number != '' && this.grp_leader != '' && this.grp_leader_seq != ''){

        this.$http.post('/api/admin/group/create', {
          grp_number : this.grp_number,
          grp_leader : this.grp_leader_seq,
          grp_subldr : this.grp_subldr_seq,
          grp_pastor : this.grp_pastor_seq

        }, config)
        .then(res => {
          console.log(res.data)
          if(res.data.success){
  
            alert('조 등록이 완료되었습니다.')
          } else {
            alert('조 등록에 실패하였습니다.')
          }
  
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        alert('조 정보를 모두 입력해주세요')
      }
      
    }
  },

data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    color: '#e95ea2',
    grp_number : '',
    grp_leader : '',
    grp_subldr : '',
    grp_pastor : '',
    
  })
}
</script>