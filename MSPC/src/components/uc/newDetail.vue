<template>
	<div class="news">
        <div class="new_title" >
            <Breadcrumb>
            <BreadcrumbItem to="/newsmore?type=1">幕饰网新闻</BreadcrumbItem>
           <!-- <BreadcrumbItem :to="'/newsmore?type='+newtypes"><span v-if="newtypes==1">产业资讯</span>
           <span v-else-if="newtypes==0">玻璃资讯</span></BreadcrumbItem> -->
            <BreadcrumbItem >{{info.title}}</BreadcrumbItem>
       </Breadcrumb>
        </div>

		<div class="new_main">

			<div class="newstitle">{{info.title}}</div>
			<div class="newsauthor">作者 :{{info.releaser}} &nbsp;&nbsp;&nbsp;发布时间 : {{info.releaseTime}}</div>
			<div class="new" v-html="info.content"></div>
            <div class="morenews">
                <div class="morenews_left">
                   <router-link :to="{path:'/newsInfo',query:{data:newbefor.id}}" v-if="newbefor != null">
                    <h4>上一篇</h4>
                    {{newbefor.title}}
                    </router-link>
					<div v-else>
						<h4>上一篇</h4>
						<p style="color: #999;">暂无</p>
					</div>
                </div>
                  <div class="morenews_left morenews_right">
                       <router-link :to="{path:'/newsInfo',query:{data:newafter.id}}" v-if="newafter != null">
                     <h4>下一篇</h4>
                     {{newafter.title}}
                        </router-link>
					  <div v-else>
						  <h4>下一篇</h4>
						  <p style="color: #999;">暂无</p>
					  </div>
                </div>
            </div>
		</div>
	</div>
</template>
<style scoped>
	.news {
		width: 100%;
		height: auto;
		overflow: hidden;

	}
.morenews{ width: 98%;height: 70px;margin: 0 auto; ;margin-bottom: 30px}
.morenews_left{ width: 300px;height: 70px ;float: left;text-align: center;cursor: pointer;}
.morenews_left h4{ font-size: 18px;font-weight: bold;line-height: 40px;text-align:center;color: #199ed8;}
.morenews_right{ float: right;}
.morenews_left a{color: #999;}
	.new_main {
		width: 1200px;
		min-height: 400px;
		margin: 20px auto;
		background: #fff;
        overflow: hidden
	}

	.newstitle {
		width: 1200px;
		height: 65px;
		line-height: 65px;
		text-align: center;
		font-size: 20px;;
	}

	.new {
		width: 1200px;
		margin: 0 auto;;
		text-indent: 15px;
		font-size: 15px;
        padding: 0 25px;
        padding-bottom: 100px
	}

.new_title{ height: 30px;line-height: 30px;width: 1200px;margin:10px auto;background: #fff;text-indent: 12px}
	.newsauthor {
		width: 1200px;
		float: right;
		text-align: right;;
		font-size: 17px;
		font-size: 16px;
		height: 30px;
		line-height: 30px;
		padding-right: 15px
	}
</style>
<script>
	export default {
		data() {
			return {
                info: {},
                newtypes:"玻璃资讯",
                newbefor:{
                    title:"",
                    id:''
                },
                newafter:{
                    title:"",
                    id:''
                }
			}
        },
        watch:{
            '$route.query.data':function(){
              this.getinfo()
            }
        },
        methods: {
			getinfo() {
				this.$http.post('news/getNews?id=' + this.$route.query.data).then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
                        this.info = resp.data
                        this.newbefor= resp.data.afterVoMap.before;
                        this.newafter= resp.data.afterVoMap.after;
                        document.getElementsByTagName("title")[0].innerText = resp.data.title;
					} else {
						this.$Messags.error('网络延迟')
					}
				})
			}
		}, created() {
            this.getinfo()
            this.newtypes=this.$route.query.type
		},destroyed(){
              document.getElementsByTagName("title")[0].innerText = '91幕饰网'
        }
	}
</script>


