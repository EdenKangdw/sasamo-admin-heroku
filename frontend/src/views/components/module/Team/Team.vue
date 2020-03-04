<template>
    <div>
    <vs-table 
    stripe 
    search
    pagination 
     :max-items="descriptionItems[0]" 
     :data="teams"
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
          팀 목록
        </h2>
      </template>
      <template slot="thead">
        <vs-th sort-key="email">팀 번호</vs-th>
        <vs-th sort-key="username">팀장 이름</vs-th>
        <vs-th sort-key="id">소속 팀원 수</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].email">
            {{data[indextr].tm_number}}
          </vs-td>

          <vs-td :data="data[indextr].tm_leader">
            {{data[indextr].tm_leader}}
          </vs-td>

          <vs-td :data="data[indextr].tm_count">
            {{data[indextr].tm_count}}
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

    console.log(this, 'lkjsdlkfjskldjflk')

      this.$http.get('/api/admin/team/list', config)
        .then(res => {
          console.log(res.data)
          this.teams = res.data
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
    teams:[]
  })
}
</script>