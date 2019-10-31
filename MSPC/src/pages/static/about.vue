<template>
	<div class="about">
		<div class="about_hader">
			<div class="about_hader_left"><img src="@/assets/img/left_line.png"></div>
			<div class="about_hader_mid about_hader_left">{{$route.query.name}}</div>
			<div class="about_hader_left"><img src="@/assets/img/right_line.png"></div>
		</div>
		<div class="about_content" v-html="info.content">
		</div>
	</div>
</template>
<script>
export default {
    data(){
        return{
           info:{}
        }
    },methods:{
        getInfo(){
            this.$http.get('/bottom/menuContent?id='+this.$route.query.id).then(res=>{          
                let resp=JSON.parse(res.request.response)
                this.info=resp.data         
            })
        }
    },
    watch:{
   '$route.query.id':function(){
       this.getInfo()
   }
    },
    mounted(){
        this.getInfo()
    }
}
</script>

<style>
	.about {
		width: 1200px;
		height: auto;
		padding-bottom: 35px;
		margin: 0 auto;
		overflow: hidden;
	}

	.about_hader {
		width: 646px;
		height: 37px;
		margin: 30px auto;
	}

	.about_hader_left {
		width: 228px;
		height: 37px;
		float: left;
		line-height: 37px;
	}

	.about_hader_mid {
		width: 190px;
		height: 37px;
		text-align: center;
		float: left;
		font-size: 22px;
		line-height: 37px
	}

	.about_content {
		text-indent: 2rem;
		line-height: 25px;
		width: 700px;
		margin: 0 auto;
		font-size: 15px
	}
</style>




