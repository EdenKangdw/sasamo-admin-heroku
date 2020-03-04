<template>
    <vs-row>
			
        <vs-col :key="idx" v-for="(item, idx) in counts" vs-lg="3" vs-xs="6" vs-sm="3">
            <vs-card>
                <h4 class="mb-1">{{ item.count }}</h4>
                <span class="mb-1">{{item.title}}</span>
                <vs-progress :percent="item.percent" :color="item.color">primary</vs-progress>
            </vs-card>
        </vs-col>
		
       
    </vs-row>    
</template>
<style lang="stylus">
.vs-col 
    padding 10px
</style>
<script>
export default {
    name: "States",
 
    created: () => {
			  let token = localStorage.getItem('access_token')
        console.log("LocalToken", token)
        let config = {
            headers : {
                "access-token" : token
            }
        }
        
        this.$http.get('/api/admin/count/current', config)
        .then(res => {
          console.log(res.data)
          this.counts = res.data
        })
    },

    data : () => ({
				counts : [
					{ title: "이번주 참석자", count: 500, percent : 30, color: 'primary'},
					{ title: "전체 사역자", count: 3000, percent : 90, color: 'danger'},
					{ title: "전체 간증 수", count: 777000, percent : 70, color: 'success'},
					{ title: "뭘 넣고싶은지", count: 4040, percent : 60, color: 'warning'},
					
				
				]
    })
    

}
</script>