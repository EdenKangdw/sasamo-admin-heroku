<template>
<div>
<vs-row vs-justify="center">
  <vs-col vs-justify="center" vs-w="12" vs-align="center" vs-lg="10" vs-xs="12" vs-sm="6">
    <vs-card>
      <div slot="header">
        <h3>
          이벤트 생성
        </h3>
      </div>
      <div id="formdata">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-input label="이벤트 이름" :color="color" v-model="evt_name"/>
          <vs-input class="vs-input" type="date" label="이벤트 날짜" :color="color" v-model="evt_date"/>
          <vs-select
            class="vs-input"
            label="이벤트 종류"
            v-model="evt_kind"
            :color="color"
          >
           <vs-select-item :key="index" :value="item.value" :text="item.name" v-for="(item,index) in event_kinds" />
          </vs-select>
          <vs-checkbox :color="color" v-model="evt_today">이번주 이벤트 여부</vs-checkbox>
           </vs-row>
      </div>
      <br>
      <vs-row vs-type="flex" vs-justify="center">
      <div class="button-container">
         <vs-button class="button-form" :color="color" type="filled" @click="registerEvent">등록하기</vs-button>
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
    registerEvent() {

      if(this.evt_name != '' && this.evt_date != ''){

        this.$http.post('/api/admin/event/create', {
          evt_name : this.evt_name ? this.evt_name : '이름없는 이벤트',
          evt_date : this.evt_date,
          evt_kind : this.evt_kind ? this.evt_kind : 6,
          evt_today : this.evt_today ? "y" :'n'
        }, config)
        .then(res => {
          console.log(res.data)
          if(res.data.success){
  
            alert('이벤트 등록이 완료되었습니다.')
          } else {
            alert('이벤트 등록에 실패하였습니다.')
          }
  
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        alert('이벤트 정보를 모두 입력해주세요')
      }
      
    }
  },

data:()=>({
    descriptionItems : [5,10,15],
    selected:[],
    events:[],
    color: '#e95ea2',
    evt_name: '', 
    evt_date: '', 
    evt_kind: '', 
    evt_today: false,
    event_kinds: [
      {name : "화요기도회", value : 1},
      {name : "목요훈련", value : 2},
      {name : "사사모", value : 3},
      {name : "집회 낮", value : 4},
      {name : "집회 저녁", value : 5},
      {name : "기타", value : 6},

    ],
  })
}
</script>