<template>
    <div>
    <vs-table 
    stripe 
    search
    pagination 
     :max-items="descriptionItems[0]" 
     :data="events"
    description
      :description-items="descriptionItems"
      description-title="이벤트"
      description-connector="of"
      description-body="페이지"
    v-model="selected"
      @selected="handleSelected"
      @dblSelection="doubleSelection"

    >
      <template slot="header">
        
        <h2>
          이벤트 관리
        </h2>
        
      </template>
      <template slot="thead">
        <vs-th :sort-key="evt_name">이름</vs-th>
        <vs-th :sort-key="evt_date">날짜</vs-th>
        <vs-th :sort-key="evt_kind">종류</vs-th>
        <vs-th :sort-key="evt_today">이번주 이벤트</vs-th>
        <vs-th :sort-key="evt_cnt_apply">사역신청 수</vs-th>
        <vs-th :sort-key="evt_cnt_check">출석체크 수</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
           <input type="hidden" :value="data[indextr].evt_seq">
          <vs-td :data="data[indextr].evt_name">
            {{data[indextr].evt_name}}
          </vs-td>

          <vs-td :data="data[indextr].evt_date">
            {{data[indextr].evt_date}}
          </vs-td>

          <vs-td :data="data[indextr].evt_kind">
            {{ data[indextr].evt_kind }}
          </vs-td>

          <vs-td :data="data[indextr].evt_today">
            <vs-switch color="success" v-model="tr.evt_today" @change="updateCheck(tr)">
              
              <span v-if="tr.evt_today == 'y' || tr.evt_today" slot="on">이번주</span>
              <span v-else slot="off">X</span>
            </vs-switch>
              
          </vs-td>

          <vs-td :data="data[indextr].evt_cnt_apply">
             {{  data[indextr].evt_cnt_apply }}  
              
          </vs-td>

          <vs-td :data="data[indextr].evt_cnt_check">
             {{  data[indextr].evt_cntevt_cnt_check }}  
              
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
export default {
  created () {
    let token = localStorage.getItem('access_token')
    console.log("LocalToken", token)
    let config = {
      headers : {
        "access-token" : token
      }
    }
    
      this.$http.get('/api/admin/event/list', config)
      .then(res => {
        console.log(res.data)
        this.events = res.data.data

      })
      .catch(err => {
        console.log(err)
      })
    
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
    }
  },

data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    events:[]
  })
}
</script>