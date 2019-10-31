<template>
	<div class="more_new">
		<div class="more_mian">
			<div class="more_mian_left">
				<ul>
					<li :class="{actives:active==1}" @click="newsFn(1)">产业资讯</li>
					<li :class="{actives:active==0}" @click="newsFn(0)">玻璃资讯</li>
				</ul>
			</div>
			<div class="more_mian_right">
				<ul>
					<li v-for="(ind,xrv) in newsNew" :key="xrv">
						<router-link :to="{path:'/newsInfo',query:{data:ind.id,type:active}}">
                         <div class="right_left">
                            <img v-if="ind.imgUrl==''" src="@/assets/img/noimg.png">     
                         <img v-else :src="`${ind.imgUrl}`">                     
                         </div>
							<div class="right_mid">
                                <div class="right_mid_title">{{ind.title}}</div> 
                                <div class="right_mid_sumry"> {{ind.summary}}</div> 
                               <div class="right_mid_time">{{ind.releaseTime}}</div> 
                            </div> 
							<!-- -->
						</router-link>
					</li>
				</ul>
			</div>
        	<div  class="pages">
			      <Page :total="totalLength" :current="current" @on-change="pagechange" />
			</div>
		</div>
	</div>
</template>
<style scoped>
	.more_new {
		width: 100%;
		min-height: 600px;
		overflow: hidden;
	}

	.actives {
		background: #199ed8;
		color: #fff
	}

	.more_mian {
		width: 1200px;
		height: 500px;
		margin: 40px auto;
	}

	.more_mian_left {
		width: 200px;
		height: 120px;
        background: #fff;
		float: left;
	}

	.more_mian_left ul li {
		width: 200px;
		height: 60px;
		line-height:60px;
		cursor: pointer;
		text-align: center;
		font-size: 18px;;
	}

	.more_mian_right {
		width: 980px;
		min-height: 400px;
		float: right;
		background: #fff
	}
   .pages{
       width: 980px;
		height: 60px;
        line-height: 60px;
		float: right;

        text-align: center;
   }
	.more_mian_right ul li {
		width: 980px;
		padding: 15px 15px;
		height: 160px;
		line-height: 150px;
        overflow: hidden;
            margin-bottom: 10px;
    background: #f1f1f1;
    border-radius: 5px;
		font-size: 16px;
	
	}
    .more_mian_right ul li:hover .right_mid_sumry{
	  color:#199ed8;
	
	}
     .more_mian_right ul li:hover .right_mid_title{
         color:#199de8
     }
     .more_mian_right ul li a{
		color:#666;
	}
	.more_mian_right ul li:nth-last-child(1) {
		border-bottom: none
	}

	.right_left {
		width: 130px;
		float: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 130px;
        line-height: 130px
        
	}
.right_left img{width: 130px;height: 130px; }
.right_mid{	width:770px;
        
		float:left;
		text-align:left;margin-left: 50px ; ;font-size: 15px
      }
	.right_mid_title{
        width: 100%;height: 50px;
        line-height: 50px;  font-weight: bold;
        color: #666; ;font-size: 19px;
      
    }
    .right_mid_sumry{ width: 100%;height: 60px;  line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;}
        .right_mid_time{ height: 25px;line-height: 25px;width: 100%;text-align: right;color: #199ed8}
</style>
<script>
	export default {
		data() {
			return {
				active: 1,
                newsNew: [],
                current:1,
                totalLength:0,
                newstar:0
			}
		},
		methods: {
            pagechange(page){      
              if(this.newstar==1){
                  this.newstar=0
                  this.getinfo(this.active,1)             
                } else if(this.newstar==0){
                    this.getinfo(this.active,page)
                }
            },
			getinfo(type,e) {
				this.$http.get('/news/newList?newsType=' + type+'&page='+e).then(res => {
					let response = JSON.parse(res.request.response)
					if (response.code == 200) {       
                        this.newsNew = response.data.list
                      //  console.log(this.newsNew )
                        this.totalLength=response.data.total
					} else if (response.code == 500) {
						this.$Message.error('接口错误')
					} else {
						this.$Message.error('网络延迟')
					}
				})
			},
			newsFn(e) {        
                  this.newstar=1
                  this.active = e;
			      this.getinfo(e,1)
			}
		},
		created() {
			this.active = this.$route.query.type
            this.getinfo(this.active,1)
		}
	}
</script>


