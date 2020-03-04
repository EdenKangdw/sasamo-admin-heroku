<template lang="html">

   <div id="parentx">
    <vs-sidebar default-index="1" :parent="parent" :hiddenBackground="doNotClose" color="primary" class="sidebarx" spacer v-model="isSidebarActive" :click-not-close="doNotClose" >
        <div class="header-sidebar text-center" slot="header">
            <vs-avatar size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>
            <h4>Eden Kang<br/>
              <small>{{ log }}</small>
            </h4>
        </div>
         <vs-sidebar-item icon="favorite_border" to="/main" :key="`sidebarLink-${index}`" :index="index">
              <span class="hide-in-minisidebar">메인</span>
            </vs-sidebar-item>
        <template v-for="(sidebarLink, index) in sidebarLinks" >
          <vs-sidebar-group :title="sidebarLink.group">
            <template v-for="item in sidebarLink.item">
            <vs-sidebar-item :icon="item.icon" :to="item.url" :key="`sidebarLink-${index}`" :index="index">
              <span class="hide-in-minisidebar">{{ item.name }}</span>
            </vs-sidebar-item>
            </template>
            </vs-sidebar-group>
            
        </template>  
        
        

    </vs-sidebar>
  </div>


</template>
<style scoped>


</style>

<script>

export default {
  name: "SideBar",
  props: {
    parent: {
        type: String
    },
    sidebarLinks: {
      type: Array,
      required: true,
    },
    index: {
        default: null,
        type: [String, Number]
    }
  },
  data:()=>({
    doNotClose: false,
    windowWidth: window.innerWidth,
    log : "관리자님 환영합니다."
  }),
  computed: {
      //This is for mobile trigger
      isSidebarActive: {
        get() {
          return this.$store.state.isSidebarActive
        },
        set(val) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', val)
        }
      }
   },
   watch: {
      
   },   
   methods : {
      handleWindowResize(event) {
            this.windowWidth = event.currentTarget.innerWidth;
            this.setSidebar();
        },
      setSidebar() {
        if (this.windowWidth < 1170) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', false);
          this.doNotClose= false
        } 
        else {
          this.$store.commit('IS_SIDEBAR_ACTIVE', true);
          this.doNotClose= true 
        }
      }
  },
  mounted() {
      this.$nextTick(() => {
            window.addEventListener('resize', this.handleWindowResize);
        });
      this.setSidebar();
    },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.setSidebar();
  }
}
</script>