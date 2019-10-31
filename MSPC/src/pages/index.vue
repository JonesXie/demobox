<template>
	<div class="indexs">
		<div class="index_loge">
			<Carousel v-model="value1" loop :autoplay-speed="4000" :autoplay="true">
				<CarouselItem v-for="(omg,ig) in bannerList" :key="ig">
					<div class="demo-carousel" >
                        <!-- <div :style="{ 'background-image': 'url(http://' + omg.picUrl + ') ' }" class="noname"></div> -->
                        <img :src="omg.picUrl" v-if="omg.urlId == null||omg.urlId==''">
                        <router-link v-else :to="{path:'/newsInfo',query:{data: omg.urlId}}" ><img :src="omg.picUrl" style="height:500px"></router-link>
                    </div>
				</CarouselItem>
			</Carousel>
		</div>
        <div class="index_thr">
            <ul>
                 <li><img src="@/assets/img/ys1.png"></li>
                 <li style="margin-left:0"><img src="@/assets/img/ys2.png"></li>
                <li><img src="@/assets/img/ys3.png"></li>
            </ul>
        </div>
        <div class="nav_im">
           <img  v-if="firstIMGid==''||firstIMGid==null" :src="firstIMG" style="width:1200px;height:150px">
           <router-link v-else :to="{path:'/newsInfo',query:{data: firstIMGid}}"><img :src="firstIMG" style="width:1200px;height:150px"></router-link>
       </div>
        <div class="index_title" style="height:50px;line-height:50px">
             <div class="starname starlogo"> <img src="@/assets/img/homes.png"  style="    vertical-align: middle;"></div>
             <div class="starname starname1"> 明星工厂</div>
             <div class="starname starnameenglish">Star factory</div>
              <div class="starline"> &nbsp;</div>
              <div class="starmore starname"> <router-link to='/allFactories' style="color:#999;font-size:15px">
                          查看全部 >></router-link></div>
       </div>
	    <div class="index_accordion">
            <Carousel v-model="value2" loop :autoplay-speed="4000" dots="none" :autoplay="true">
				<CarouselItem v-for="(omg,ig) in storeList" :key="ig">
					<div class="demo-carousel">
                         <ul>
                            <li v-for="(index,val) in omg.list" :key="val" >
                                <router-link :to="{path:'/shopGoods',query: {id: index.id}}" style="color:#666666">
                                    <div class="index_accordion_li_left">

                                        <img :src="`${index.shopPicUrl}`">
                                   
                                    </div>
                                    <div class="index_accordion_li_right">
                                        <p class="fonthideen" >名称 : {{index.shopname}} </p>
                                        <p class="fonthideen">地点 : {{index.province}} {{index.city}}</p>
                                        <p class="fonthideen">主营 : {{index.mainBusiness}}</p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
				</CarouselItem>
			</Carousel>
        </div>

         <div class="index_title" style="font-size:18px;text-indent: 40px;color: #333;">
              <ul>
                  <li v-for="(index,val) in  biaoqianList" :class="{listactive:val==indexIndex}" @click="showmoreinfo(val,index.id)">{{index.goodsTypeName}}</li>
              </ul>
              <span class="fr" ><router-link to='/productlist' style="color:#999;font-size:15px;margin-right:15px">查看全部  >></router-link></span></div>
          <div class="glass_box">
              <div class="glass_box_title">
                  <ul>
                      <li v-for="(val,ind) in goodsListDate" :class="{glass_box_title_active:ind == goodsNum}" :key="ind" @click="showGoods(ind,val.id)">{{val.goodsTypeName}}</li>
                  </ul>
              </div>
          <div class="glass_box_content" v-if="goodsListContent.length!=0">
                  <ul>
                       <li v-for="(val,ind) in goodsListContent" :key="ind">
                          <router-link  :to="{path:'/shopdetail',query: {goodsid: val.goodsId,shopid:val.shopId,index:goodsNum}}">
                            <div class="glass_box_content_img">
                                       <img :src="`${val.picUrl}`">                                   
                            </div>
                            <div class="glass_box_content_price">
                                <span>{{val.goodsPrice}} 元/㎡  <span class="fr" style="color:#999;font-size:13px"> <span style="color:#3653d3"> {{val.orderNumber==null?0:val.orderNumber}} </span>人已下单&nbsp;</span> </span>
                            </div>
                            <div class="glass_box_content_name" style="font-size:16px;color:#333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                {{val.goodsName}}
                            </div>
                            <div class="glass_box_content_name">
                               <span> {{val.city}}{{val.county}}  <span class="fr" style="color:#999;font-size:13px;width:150px;text-align:right; overflow: hidden;text-overflow: ellipsis;display:block; height:30px;"> <span style="color:#ff8635">{{val.province}}{{val.shopName}}</span> </span> </span>
                            </div>
                           </router-link>
                       </li>
                   </ul>
               </div>
               <div class="glass_box_content" style="text-align:center; font-size:16px; line-height:40px"  v-else>
                  暂无数据
               </div>
          </div>
         <div class="nav_im">
           <img  v-if="secondIMGid==''||secondIMGid==null" :src="secondIMG" style="width:1200px;height:150px">
           <router-link v-else :to="{path:'/newsInfo',query:{data: secondIMGid}}"><img :src="secondIMG" style="width:1200px;height:150px"></router-link>
          </div>
        <div class="index_title" style="height:50px;line-height:50px">
             <div class="starname starlogo"> <img src="@/assets/img/newss.png"  style="    vertical-align: middle;"></div>
             <div class="starname starname1"> 新闻资讯</div>
             <div class="starname starnameenglish" style="width:60px">News</div>
              <div class="starline"style="width:820px"> &nbsp;</div>

       </div>
      <div class="index_news">
           <div class="index_news_left">
               <div class="index_news_left_title">
                    <p>产业资讯 <span class="fr"> <router-link :to="{path:'/newsmore',query:{type:1}}" style="font-size:15px;color:#999">查看全部 >> </router-link></span></p>
               </div>
               <div class="index_news_left_content">
                   <ul>
                        <li v-for="(ind,val) in newsNew" :key="val"  :class="{flagtop:ind.topFlag=='1'}">
                           <router-link :to="{path:'/newsInfo',query:{data:ind.id}}" >
                                <div class="index_news_left_content_left">{{ind.title}}</div>
                                <div class="index_news_left_content_right"> <span v-if="ind.topFlag=='1'" ><img src="@/assets/img/fire.png" style="    vertical-align: middle;  width: 20px; height: 20px;    margin-top: -10px;"> </span> &nbsp;&nbsp;{{ind.releaseTime}} &nbsp;&nbsp;</div>
                            </router-link>
                        </li>
                   </ul>
               </div>
           </div>
           <div class="index_news_left" style="margin-left:40px">
                <div class="index_news_left_title">
                    <p>玻璃资讯 <span class="fr"> <router-link :to="{path:'/newsmore',query:{type:0}}" style="font-size:15px;color:#999">查看全部  >> </router-link></span></p>
               </div>
               <div class="index_news_left_content">
                   <ul>
                        <li v-for="(ind,val) in glassNew" :key="val" :class="{flagtop:ind.topFlag=='1'}">
                           <router-link  :to="{path:'/newsInfo',query:{data:ind.id}}">
                                <div class="index_news_left_content_left">{{ind.title}}</div>
                                <div class="index_news_left_content_right"><span v-if="ind.topFlag=='1'" style="color:#ff0000"><img src="@/assets/img/fire.png" style="    vertical-align: middle;  width: 20px; height: 20px;    margin-top: -10px;"></span>&nbsp;&nbsp;{{ind.releaseTime}}&nbsp;</div>
                            </router-link>
                        </li>
                   </ul>
               </div>
           </div>
      </div>
    </div>
</template>
<script>
    import Vue from 'vue'
import { setTimeout, clearInterval } from 'timers';
	export default {
		data() {
			return {
                indexIndex:0,
                firstIMG:'',
                firstIMGid:"",
                secondIMG:'',
                secondIMGid:'',
                bannerList:[],
                indexNum:0,
                searchContent:'',
                value1: 0,
                value2:0,
                biaoqianList:[],
                storeList:[],
                searchDate:['商品','店铺'],
                newsNew:[],
                glassNew:[],
                shopList:[{'name':'xxxxxxx','price':'6666','number':'5555'},{'name':'xxxxxxx','price':'6666','number':'5555'}] ,
                goodsListDate:{},
                goodsNum:0 ,
                goodsListContent:[]
			}
        },
		methods: {
            // 轮播图
            getBanner(){
                this.$http.get('/goods/picInfo?picType=1').then(res=>{
                    let resp=JSON.parse(res.request.response)
                    if(resp.code==200){
                       this.bannerList=resp.data
                    }
                })
            },
            // 第一张广告图
             getGuanggao(){
                this.$http.get('/goods/picInfo?picType=2').then(res=>{
                    let resp=JSON.parse(res.request.response)
                    if(resp.code==200){
                        if(resp.data.length!=0){
                         this.firstIMG=resp.data[0].picUrl
                         this.firstIMGid=resp.data[0].urlId

                        }
                    }
                })
            },
             // 第二张广告图
             getGuanggaomore(){
                this.$http.get('/goods/picInfo?picType=3').then(res=>{
                    let resp=JSON.parse(res.request.response)
                    if(resp.code==200){
                        if(resp.data.length!=0){
                            this.secondIMG=resp.data[0].picUrl
                            this.secondIMGid=resp.data[0].urlId
                        }
                    }
                })
            },
              //明星店铺
                getStore(){
                    this.$http.get('/storelist/info').then(res => {
                            let resp=JSON.parse(res.request.response)
                           if(resp.code==200){
                                this.storeList=resp.data
                           }
                    })
                },
                //产业资讯
                getnewsNew(){
                    this.$http.get('/news/newList?newsType=1').then(res=>{
                         let response=JSON.parse(res.request.response)
                         this.newsNew=response.data.list
                    })
                },
                // 玻璃资讯
                getGlassNew(){
                      this.$http.get('/news/newList?newsType=0').then(res=>{
                         let response=JSON.parse(res.request.response)
                         this.glassNew=response.data.list
                    })
                } ,
                //商品列表
                getgoos(){
                    this.$http.get('/goods/type?parentId=0').then(res=>{
                           let response=JSON.parse(res.request.response)
                                if(response.code==200){
                                     this.biaoqianList=response.data
                                }else{
                                     this.$Message.error('获取商品失败')
                                }
                            })
                },
                showmoreinfo(e,id){
                      this.indexIndex=e
                      this.goodsNum=0;
                      this.$http.get('/goods/recommend?goodsTypeId='+id).then(res=>{
                             let resp=JSON.parse(res.request.response);
                             this.goodsListDate=resp.data
                             let arr=[]
                             let passdata=resp.data.map((a,c)=>{
                                 let obj={}
                                a.goodsList.forEach((b,d)=>{
                                   arr.push(b)
                             })

                              return obj
                             })
                            this.goodsListContent=arr;

                    });
					let  timers= setTimeout(()=>{
						this.$http.get('/goods/recommend?goodsTypeId='+id).then(res=>{
							let resp=JSON.parse(res.request.response);
							let ids=resp.data[0].id
							this.showGoods(0,resp.data[0].id)

						})
						clearInterval(timers)
					},100)
                },
                showGoods(e,id){
                      this.goodsNum=e;
                      e=Number(e);
                      this.goodsListContent=this.goodsListDate[e].goodsList
                },
                getinit(){
                         this.$http.get('/goods/type?parentId=0').then(res=>{
                               let response=JSON.parse(res.request.response)
                                if(response.code==200){
                                let ids=response.data[0].id
                                this.showmoreinfo(0,ids) ;
                       // let  timers= setTimeout(()=>{
                       //              this.$http.get('/goods/recommend?goodsTypeId='+ids).then(res=>{
                       //          let resp=JSON.parse(res.request.response);
                       //          let ids=resp.data[0].id
                       //          this.showGoods(0,resp.data[0].id)
					   //
                       //     })
                       //     clearInterval(timers)
                       //  },100)
                                }else{
                                     this.$Message.error('获取商品失败')
                                }
                            })
                      }
                },
		created() {
            this. getinit()
           this.getgoos()
           this.getStore()
           this.getnewsNew()
           this.getGuanggao()
           this.getGuanggaomore()
           this.getGlassNew()
           this.getBanner()

		}
	}

</script>
<style scoped>
.noname{     background-position: center 0;
     background-repeat: no-repeat;
     height: 500px;
     margin: 0 auto;
     max-width: 1900px;
     min-width: 1200px;
     box-sizing: content-box;
}
.listactive{ background: #199de8;color: #fff;background: url('../assets/img/actives.png') no-repeat;}
.flagtop{ font-weight: bold;}
.glass_box{ width: 1200px;min-height: 150px;;margin: 0px auto;}
.starname{ margin-left: 30px;font-weight: bold;line-height: 50px;float: left;height: 50px;width: 90px;font-size: 18px;color:#333;}
.starnameenglish{ margin-left: 0px; font-size: 13px;}
.starname1{ margin-left: 15px}
.starlogo{ width: 35px;}
.starmore{ font-weight: 400}
.starline{ width: 810px; float: left;background: url('../assets/img/starline.png')no-repeat; background-position-y: 25px;}
.fonthideen{  white-space: nowrap ;overflow: hidden;text-overflow: ellipsis;display:block; height:30px;width:100% }
.glass_box_title{ width: 1200px;height:auto;overflow: hidden;;line-height: 60px;text-align: center; background: #fff}
.glass_box_title ul li{  padding: 0px 12px !important;  color: #666;  height: 46px; float: left; font-size: 13px; cursor: pointer;}
.glass_box_title ul li:nth-child(1){margin-left: 20px}
.glass_box_title_active{ color:#ff6101 !important}
.glass_box_content{ width: 1200px;height: auto;overflow: hidden; background: #fff;padding-bottom: 20px}
.glass_box_content ul li{ width: 297px;height: 430px;; float: left;margin: 10px 0px -10px 2px}
.glass_box_content_img{  width: 270px; height: 270px; margin: 12px auto;   border-radius: 5px 5px 0 0;}
.glass_box_content_img img{ width: 270px; height: 270px}
.glass_box_content_price{ width: 250px;height: 50px;;margin:0 auto;line-height: 55px;font-size: 25px;color:#ff0000}
.index_news{ width: 1200px;height: 358px;overflow: hidden; background:#fff;margin: 10px auto}
.glass_box_content_name{  width: 250px;height: 25px;color:#666; margin:0px auto;line-height:30px;font-size: 13px;}
.index_news_left{ width: 560px;height: 400px;margin-left: 20px;float: left;}
.index_news_left_title{ width: 560px;height: 60px;line-height:60px;border-bottom: 2px solid #289692;font-size: 20px;color:#289692;text-indent: 1rem}
.index_news_left_content{ width: 560px; height: 338px;margin: 0 auto}
.glass_box_content ul li:hover{box-shadow:0px 0px 2px 2px #ccc ;transition:all  0.7s; }
.index_news_left_content ul li{ width: 100%;border-bottom: 1px solid #ccc;height: 48px;line-height: 48px;font-size: 14px}
.index_news_left_content ul li:nth-last-child(1){ border-bottom: none}
.index_news_left_content ul li a{color:#666}
.index_news_left_content_left{ width: 360px;height: 48px;float: left;;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-indent: 0.5rem}
.index_news_left_content_right{width: 180px;height: 48px;float: right;color:#289692;text-align: right}
.indexs {width: 100%;height: auto;	margin: 0 auto;overflow: hidden;}
.index_loge {height: 500px;background: #ccc;position: relative;}
.indexs .index_loge .ivu-carousel {height: 500px;}
.index_thr{ width: 1200px;height: 180px;margin-top: 5px;	margin: 0 auto; margin-bottom: 5px}
.index_thr ul li{ height: 180px;float: left;margin-right: 2px}
.index_thr ul li:nth-child(3){margin-right: 0}
.index_thr ul li img{ height:180px; }
.nav_im{  width: 1200px;height: 150px;	margin: 0 auto;}
.index_title{ width: 1200px;margin: 10px auto;height: 65px;line-height: 65px;font-size:16px }
.index_accordion{ width: 1200px;height: 170px; margin:10px auto;overflow: hidden;}
.index_title ul li{ float: left;width: 215px;cursor: pointer;text-align: center;text-indent: 40px}
.index_accordion ul{ position: relative;overflow: hidden; width:100000px;height: 168px;    background: #fff;}
.index_accordion ul{ position: relative;overflow: hidden; width: 100%;height: 170px;}
.index_accordion ul li{ width: 300px;border: 1px solid #ededed;height: 170px;float: left;border-radius: 5px}
.index_accordion ul li:hover {box-shadow:0px 0px 3px 2px #999 inset;    transition: all 0.88s;}
.index_accordion_li_left{ width: 110px;height: 110px;margin:30px 0 0 20px; float: left;}
.index_accordion_li_left img{width: 110px;height: 110px;}
.index_accordion_li_right{ width: 155px;height: 125px;float: left;;margin:40px 0 0 10px;text-indent: 0.5rem;line-height:30px;font-size: 13px}
</style>
