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
          계수관리
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
          </vs-td>

          <vs-td :data="data[indextr].ssm_team">
            {{data[indextr].ssm_team}}
          </vs-td>

          <vs-td :data="data[indextr].grp_seq">
            {{data[indextr].grp_seq}}
          </vs-td>

          <vs-td :data="data[indextr].chk_isApply">
            {{  data[indextr].chk_isApply == 'y' 
              ? '사역신청'
              : '신청안함'
            }}
          </vs-td>

          <vs-td :data="data[indextr].chk_isCheck">
             {{  data[indextr].chk_isCheck == 'y' 
              ? '출석체크'
              : '미출석'
            }}
          </vs-td>

          <template class="expand-user" slot="expand">
            <div class="con-expand-users">
              <div class="con-btns-user">
                <div class="con-userx">
                  <vs-avatar :badge="tr.id" size="45px" :src="`https://randomuser.me/api/portraits/women/${indextr}.jpg`"/>
                  <span>
                    {{ tr.name }}
                  </span>
                </div>

                <div>
                  <vs-button vs-type="border" size="small" icon="phone_in_talk"></vs-button>
                  <vs-button vs-type="gradient" size="small" color="success" icon="send"></vs-button>
                  <vs-button vs-type="flat" size="small" color="danger" icon="delete_sweep"></vs-button>
                </div>
              </div>
              <vs-list>
                <vs-list-item icon="mail" title="Email" :subtitle="tr.email"></vs-list-item>
                <vs-list-item icon="check" title="Website" :subtitle="tr.website"></vs-list-item>
              </vs-list>
            </div>
          </template>
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
      this.$http.get('/api/admin/user/list', {})
        .then(res => {
          console.log(res.data)
          this.users = res.data
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
    users:[
      {
        "id": 1,
        "name": "사역자1",
        "username": "강동원",
        "email": "Sincere@april.biz",
        "website": "hildegard.org",
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "website": "anastasia.net",
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "website": "ramiro.info",
      },
      {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "website": "kale.biz",
      },
      {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "website": "demarco.info",
      },
      {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info",
        "website": "ola.org",
      },
      {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "website": "elvis.io",
      },
      {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me",
        "website": "jacynthe.com",
      },
      {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io",
        "website": "conrad.com",
      },
      {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "website": "ambrose.net",
      }
    ]
  })
}
</script>