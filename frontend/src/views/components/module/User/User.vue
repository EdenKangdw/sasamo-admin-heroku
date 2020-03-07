<template>
    <div>
    <vs-table 
    stripe 
    search
    pagination 
     :max-items="descriptionItems[0]" 
     :data="users"
    description
      :description-items="descriptionItems"
      description-title="사역자"
      description-connector="of"
      description-body="페이지"
    v-model="selected"
      @selected="handleSelected"
      @dblSelection="doubleSelection"

    >
      <template slot="header">
        <h2>
          사역자
        </h2>
      </template>
      <template slot="thead">
        <vs-th :sort-key="ssm_name">이름</vs-th>
        <vs-th :sort-key="ssm_team">소속 팀</vs-th>
        <vs-th :sort-key="grp_seq">소속 조</vs-th>
        <vs-th>사역신청</vs-th>
        <vs-th>출석체크</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
           <input type="hidden" :value="data[indextr].ssm_seq">

          <vs-td :data="data[indextr].ssm_name">
            {{data[indextr].ssm_name}}
            <template slot="edit">
              <vs-input label="사역자 이름" v-model="tr.ssm_name" class="inputx" :placeholder="data[indextr].ssm_name" @blur="updateData(tr)"/>
              
            </template>
          </vs-td>

          <vs-td :data="data[indextr].ssm_team">
            {{data[indextr].ssm_team}}
            <template slot="edit">
              <vs-input label="팀 번호" v-model="tr.ssm_team" class="inputx" placeholder="엔터를 눌러 수정하세요" @blur="updateData(tr)"/>
            </template>
          </vs-td>

          <vs-td :data="data[indextr].grp_seq">
            {{data[indextr].grp_seq}}
            <template slot="edit">
              <vs-input label="조 번호" v-model="tr.grp_seq" class="inputx" :placeholder="data[indextr].grp_seq" @blur="updateData(tr)"/>
            </template>
          </vs-td>

          <vs-td>
            <vs-switch color="success" v-model="tr.chk_isApply" @change="updateCheck(tr)">
              
              <span v-if="tr.chk_isApply == 'y' || tr.chk_isApply" slot="on">사역신청</span>
              <span v-else slot="off">신청안함</span>
            </vs-switch>
            
           
          </vs-td>

          <vs-td>
            

             <vs-switch color="success" v-model="tr.chk_isCheck" @change="updateCheck(tr)">
              
              <span v-if="tr.chk_isCheck == 'y' || tr.chk_isCheck" slot="on">출석체크</span>
              <span v-else slot="off">체크안함</span>
            </vs-switch>
          </vs-td>


          

          <template class="expand-user" slot="expand">
            <div class="con-expand-users">
              <div class="con-btns-user">
                <div class="con-userx">
                  <vs-avatar :badge="tr.ssm_seq" size="45px" :src="`https://randomuser.me/api/portraits/women/${indextr}.jpg`"/>
                  <span>
                    {{ tr.ssm_name }}
                  </span>
                </div>

                <div>
                  <vs-button vs-type="border" size="small" icon="phone_in_talk"></vs-button>
                  <vs-button vs-type="gradient" size="small" color="success" icon="send"></vs-button>
                  <vs-button vs-type="flat" size="small" color="danger" icon="delete_sweep"></vs-button>
                </div>
              </div>
              <vs-list>
                <vs-list-item icon="mail" title="이메일" :subtitle="tr.email">test@gmail.com</vs-list-item>
                <vs-list-item icon="phone" title="전화번호" :subtitle="tr.phone">{{ tr.ssm_phone }}</vs-list-item>
              </vs-list>
            </div>
          </template>
        </vs-tr>
        
      </template>
    </vs-table>
  </div>
</template>
<style lang="stylus">

.checkDataTrue
  color green
.checkDataFalse
  color red

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

  .vuesax-app-is-ltr .vs-list--slot
    margin-left 15px
</style>
<script>
export default {
  created () {

    let token = localStorage.getItem('access_token')
    console.log("LocalToken", token)
    let config = {
      headers : {
        "access-token" : token
      }
    }

    console.log(this, 'lkjsdlkfjskldjflk')

      this.$http.get('/api/admin/user/list', config)
        .then(res => {
          console.log(res.data)
          this.users = res.data
        })
    },
   

methods:{
   updateData(tr) {

    let token = localStorage.getItem('access_token')
    let config = {
      headers : {
        "access-token" : token
      }
    }

     console.log(this, 'uopdate')
     if( confirm('입력하신 정보로 수정하시겠습니까?') ){
       this.$http.post('/api/admin/user/update',  {
         ssm_seq : tr.ssm_seq,
         ssm_name : tr.ssm_name,
         ssm_team : tr.ssm_team,
         grp_seq : tr.grp_seq,
         chk_isApply : tr.chk_isApply,
         chk_isCheck : tr.chk_isCheck
       }, config)
       .then(result => {
         
         console.log(result)
       })

     } else {
       return false
     }

   },

   updateCheck(tr) {
    let token = localStorage.getItem('access_token')
    let config = {
      headers : {
        "access-token" : token
      }
    }

    let applyData = tr.chk_isApply ? 'y' : 'n'
    let checkData = tr.chk_isCheck ? 'y' : 'n'
    console.log('data --------', applyData, checkData)

    this.$http.post('/api/admin/user/update/check', {
      ssm_seq : tr.ssm_seq,
      chk_isApply : applyData,
      chk_isCheck : checkData
    }, config)
    .then(res => {
      console.log('update check success', res)
    })



   }
   
  },



data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    isTrue : true,
    users:[],
    
    
  })
}
</script>