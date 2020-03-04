<template>
<div>
<vs-row vs-justify="center">
  <vs-col vs-justify="center" vs-w="12" vs-align="center" vs-lg="10" vs-xs="12" vs-sm="6">
    <vs-card>
      <div slot="header">
        <h3>
          팀 생성
        </h3>
      </div>
      <div id="formdata">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-input label="팀 번호" :color="color" v-model="tm_number"/>
          <vs-input label="팀장 이름" :color="color" v-model="tm_leader" @blur="findTeamLeader"/>
        </vs-row>
      </div>
      <br>
      <vs-row vs-type="flex" vs-justify="center">
      <div class="button-container">
         <vs-button class="button-form" :color="color" type="filled" @click="registerTeam">팀 등록하기</vs-button>
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
    findTeamLeader(tm_leader){
      this.$http.post('/api/admin/event/leader', {
        ssm_name : this.tm_leader 
      }, config)
      .then(res => {
        console.log('slkdajflksadjf', res.data)
        const success = res.data.success
        const error = res.data.error
        if(success) {
          console.log(res.data)
          if(confirm(`이름 : ${this.tm_leader}, 연락처 : ${res.data.data.ssm_phone} 이 맞으신가요?`)) {
            this.tm_leader_seq = res.data.data.ssm_seq
          } else {
            return false
          }

        } else if(error == 'no data') {
          alert('등록되지 않은 이름입니다. 다시 한번 확인해주세요.')
          this.tm_leader = ''
        } else {
          return false
        }


      })
    },
    registerTeam() {

      if(this.tm_number != '' && this.tm_leader != '' && this.tm_leader_seq != ''){

        this.$http.post('/api/admin/team/create', {
          tm_leader : this.tm_leader_seq,
          tm_number : this.tm_number

        }, config)
        .then(res => {
          console.log(res.data)
          if(res.data.success){
  
            alert('팀 등록이 완료되었습니다.')
          } else {
            alert('팀 등록에 실패하였습니다.')
          }
  
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        alert('팀 정보를 모두 입력해주세요')
      }
      
    }
  },

data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    color: '#e95ea2',
    tm_number : '',
    tm_leader : '',
    tm_leader_seq : '',
    
  })
}
</script>