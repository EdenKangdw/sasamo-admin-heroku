import Vue from 'vue'
import Vuex from 'vuex'
import color from '../../config/color'
Vue.use(Vuex)

/* eslint-disable */
export default new Vuex.Store({
  state: {
    
  	isSidebarActive: false,
    themeColor: color.theme,
    token: "",
    log : "HELLO",
    event: "",
  },
  mutations: {
  	//This is for Sidbar trigger in mobile
  	IS_SIDEBAR_ACTIVE(state, value) {
        state.isSidebarActive = value;
    },
    updateToken(state, payload) {
      state.token = payload
      localStorage.setItem("access_token", payload)
    },
    updateEvent(state, payload) {
      state.event = payload
      localStorage.setItem("Event", payload)
      console.log('Store : update event:', state.event)
    }
    
  },  
  actions: {
  	
  },
  getters:{
  	
  }
})
