<template>
    <div>
    <vs-table 
    stripe 
    search
    multiple 
    v-model="selected"
    pagination 
     :max-items="descriptionItems[0]" 
     :data="users"
    description
      :description-items="descriptionItems"
      description-title="color"
      description-connector="color"
      description-body="color">

    >
      <template slot="header">
        <h2>
          팀 배정 
        </h2>
        
      </template>
      <template slot="thead">
        <vs-th :sort-key="ssm_name">이름</vs-th>
        <vs-th :sort-key="ssm_team">소속 팀</vs-th>
        <vs-th :sort-key="grp_seq">소속 조</vs-th>
      </template>
     

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >

          <vs-td :data="data[indextr].ssm_name">
            {{data[indextr].ssm_name}}
          </vs-td>

          <vs-td :data="data[indextr].ssm_team">
            {{data[indextr].ssm_team}}
          </vs-td>

          <vs-td :data="data[indextr].grp_number">
            {{data[indextr].grp_number}}
          </vs-td>
        </vs-tr>
        
      </template>
    </vs-table>
    <div>
  </div>
  <div class="vs-con-table">
  <vs-row vs-type="flex" vs-justify="end">
    <vs-col class="arrangeForm2" vs-justify="center" vs-w="12" vs-align="center" vs-lg="3" vs-xs="3" vs-sm="3">
      <vs-input label="배정할 팀 번호를 입력해주세요" :color="color" v-model="tm_number"/>
    </vs-col>
    <vs-col vs-justify="center" vs-w="12" vs-align="center" vs-lg="6" vs-xs="12" vs-sm="6">
      <div class="button-container">
         <vs-button class="button-form" :color="color" type="filled" @click="arrangeTeams">팀 등록하기</vs-button>
      </div>
    </vs-col>
  </vs-row>
  </div>
    <div class="vs-con-table arrangeForm">
    <h2>선택된 팀원들 ({{selected.length}})</h2>
    
    <div class="selectedItem_wrapper" v-if="selected[0] != ''" vs-type="flex">
      <pre class="selectedItem" v-for="(item, idx) in selected" :key="idx" :data="item">
        <vs-button :color="selectedColor[idx%7]" type="filled">{{selected[idx].ssm_name}}</vs-button>
      </pre>
    </div>
  </div>
    </div>
</template>
<style lang="stylus"> 

.vs-checkbox-primary input:checked+.vs-checkbox 
    background #e95ea2 !important
    border 2px solid #e95ea2 !important
.vs-table-primary .is-selected
  color #e95ea2 !important
  box-shadow 0 0 1px 0 #e95ea2 !important
.vs-pagination-primary .effect, .vs-pagination-primary .vs-pagination--buttons:hover
  background #e95ea2 !important
.vs-description-primary
  color #e95ea2 !important

.con-vs-checkbox
  margin-top 0 !important
.vs-con-input-label
  margin-left 15px
  margin-bottom 15px

.selectedItem_wrapper
  flex-wrap wrap
  display flex
  margin-top 5px
.selectedItem 
  display flex
  margin-left 4px
  font-size initial
.arrangeTeam2
   width 100%
   margin 10px
.button-container   
  .arrangeTeam
   width 100%
  .button-form
    margin-top 0px 
    width 100%
.arrangeForm
  margin-top 15px
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

let token = localStorage.getItem('access_token')
    console.log("LocalToken", token)
    let config = {
      headers : {
        "access-token" : token
      }
    }
    
export default {
  
  created () {

    console.log(this, 'lkjsdlkfjskldjflk')

      this.$http.get('/api/admin/user/list', config)
        .then(res => {
          console.log(res.data)
          this.users = res.data
        })
    },

methods:{
    arrangeTeams() {
      console.log(this.selected[0])
      this.$http.post('/api/admin/team/arrange', {
        ssm_user : this.selected,
        ssm_new_team : this.tm_number
      }, config)
      .then(res => {
        alert('팀 배정에 성공하였습니다.')
      })
      .catch(err => {
        alert('팀 배정에 실패하였습니다. 아래의 {errorCode}로 관리자에게 문의해주세요. ERROR CODE :', err)
      })
    }
  },
data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    isTrue : true,
    users:[],
    color: '#e95ea2',
    tm_number: '',
    selectedColor : ['#1A8CFF', '#e95ea2', 'success', 'danger', 'warning', 'dark', '#B035E9'],
    
    
  })
}
</script>