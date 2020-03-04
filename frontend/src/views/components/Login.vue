<template lang="html">
<div id="app">
<vs-row class="total_container" vs-w="12">
    <vs-col class="logo_container" vs-offset="4" vs-lg="4" vs-type="flex" vs-justify="center" vs-align="center">
      <img id="logo2" src="../../assets/images/logo/beloved_logo2.png">
      <img id="logo1" src="../../assets/images/logo/beloved_logo1.png">
    </vs-col>
  </vs-row>
  <br>
  <vs-row vs-w="12">
    <vs-col class="form_container" vs-offset="4" vs-lg="4" vs-type="flex" vs-justify="center" vs-align="center">
      <vs-input color="rgb(213,14,151)" class="form_field" label-placeholder="아이디" v-model="ssm_id"/>
      <br>
      <vs-input color="rgb(213,14,151)" type="password" class="form_field" label-placeholder="비밀번호" v-model="ssm_pw"/>
    </vs-col>
  </vs-row>
  <br>
  <vs-row vs-w="12">
    <vs-col class="form_container" vs-offset="4" vs-lg="4" vs-type="flex" vs-justify="center" vs-align="center">
      <vs-button color="rgb(213,14,151)" type="filled" v-on:click="login">로그인</vs-button>
    </vs-col>
  </vs-row>
</div> 
        
</template>
<style scoped>
#login{
    text-align : center;
    margin-left: auto; 
    margin-right: auto;

}
#wrapper_btn{
    margin-top: 10%;
}

.logo_container{
  flex-direction : column;
  
  
  
}
.total_container {
  margin-top: 5%;
}
.form_container{
  flex-direction : column;
 }
 
#logo1{
  max-width: 120%;
  height:auto;
}
#logo2{
  max-width: 60%;
  height:auto;
}


</style>

<script>
export default {
  created () {
      
    
  },
  data () {
    return {
      token: "",
      greeting: "사역자님 안녕하세요!",
      ssm_id : "",
      ssm_pw : ""
    }
  },
  methods: {
      login() {
				console.log(this.ssm_id, "id")
      	if(this.ssm_id == null || this.ssm_pw == null){
          alert("아이디와 비밀번호를 입력해주세요.")
        }else {
					this.$http.post('/api/admin/user/login', {
          	id: this.ssm_id,
            pw: this.ssm_pw
        }).then((res) => {
          	this.token = res.data
            console.log("TOKEN :", res.data.data, typeof res.data)
            if(res.data.success){
              this.$store.commit("updateToken", res.data.data)
              this.$router.push({ name: 'Main' })
            }
            else if (!res.data.access){
              console.log("로그인 실패 : 접근 권한 없음")
              alert("접근 권한이 없습니다. 관리자에 문의해주세요")
            }
            else{
              console.log("로그인 실패 : 아이디, 패스워드 오류")
              alert("올바른 아이디와 비밀번호를 입력해주세요.")
            }
            
        	})
        }
      }

  }

}
</script>