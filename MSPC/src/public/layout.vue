<template>
	<div>
		<!--登录注册的头部-->
		<div class="lo_re_header" v-if="this.$route.fullPath=='/register' || this.$route.fullPath=='/login'">
			<div class="lo_re_main">
				<router-link to='/'><img src="@/assets/img/loge.png"></router-link>
			</div>
		</div>
		<!--正常页面的头部-->
		<div v-else>
			<div class="layout_header">
				<div class="app-header header_main">
					<Row type="flex">
						<Col span="14">
						<Row type="flex">
							<Col span="6" >
							 <router-link to='/' style="color:#949494">www.91mushi.com</router-link>
							</Col>
                           
						</Row>
						</Col>
						<Col span="10">
						<div class="header_right">
							<ul>
                                <li>
                                 <Row>
                                  <Col span="24" style="text-align:center;cursor:default" v-if="memberInfo.loginname">
                                    <span v-if="memberInfo.loginname">{{memberInfo.loginname}}</span> &nbsp; &nbsp;
                                        &nbsp; <span style="color:#199ed8;cursor:pointer" @click="loyout">退出</span> </span>
                                    </Col>
                                    <Col span="12" class="txt_center" v-if="!memberInfo.loginname">
                                    <router-link to='/login'>登录</router-link>
                                    </Col>
                                    <Col span="12" class="txt_center" v-if="!memberInfo.loginname">
                                    <router-link to='/register'>注册</router-link>
                                    </Col>
                                 </Row>
                                </li>
								<li @click="routers" style="color:#949494;cursor:pointer">
									买家中心
								</li>
								<li>
									<router-link to='/salerInfo/RManage' style="color:#949494;cursor:pointer">卖家中心</router-link>
								</li>
                                <li >
                                    <router-link to="/contact"  style="color:#949494;cursor:pointer"> 联系我们</router-link>				
								</li>
								<li> <span> <img src="@/assets/img/dingwei.png" style="width: 20px;  height: 20px; vertical-align: middle;"></span> 安徽省</li>
							</ul>
						</div>
						</Col>
					</Row>
				</div>
			</div>
			<div class="index_search">
				<div class="index_search_left">
					<router-link to='/'><img src="@/assets/img/loge.png"></router-link>
				</div>
				<div class="index_search_mid">
					<div class="index_search_mid_top">
						<ul>
							<li :class="{shopactive:val == indexNum}" v-for='(ind,val) in searchDate' :key="val" @click="tabShopactive(val)">{{ind}}
							</li>
						</ul>
					</div>
					<div class="index_search_mid_mid" style="position:relative">
						<div class="index_search_mid_mid_input"><input type="text" v-model.trim="searchContent" @keyup.13="searchFn($event)"></div>
                         <!-- @click="inputFns()"  @blur="inputhide" -->
						<div class="index_search_mid_mid_button">
							<button @click="searchFn">搜索</button>
						</div>
                        <div class="inputsearch" v-show="inputFocus"></div>
					</div>
					<div class="index_search_mid_btm">
						<ul>
							<li style="color:#199def">热门搜索 :</li>
							<li v-for="(inedx,item) in hotData" :key="item" style="cursor:pointer;" @click="hotSearchFnc(inedx.hotnamenpm)">
								{{inedx.hotname}}
							</li>
						</ul>
					</div>
				</div>
				<div class="index_search_left index_search_left2">
					<Icon type="md-cart"/>
					<router-link to='/shop' style="color:#199ed8">我的购物车</router-link>
					<div class="shopdetail">
						<div class="shopdetail_top">
							<div class="shopdetail_top_header">最近加入商品:</div>
							<div class="detail_top_centent" v-if="shopList.length!=0 ">
								<ul>
									<li v-for="(val,ind) in shopList" :key="ind">
										<div class="shopdetail_top_left">                                  
                                           <img  :src="`${val.picurl}`">                            
                                        </div>
										<div class="shopdetail_top_right">
											<p style="  white-space: nowrap;overflow: hidden;text-overflow: ellipsis; height: 30px;">{{val.goodsname}}
											</p>
											<p>数量 :1<span class="fr"> ¥ : <span style="color:#ff7700"> {{val.price}}</span> </span> </p>
										</div>
									</li>
								</ul>
							</div>
							<div v-else-if="shopList.length==0 "  class="detail_top_centent">
								<p style="font-size:13px;line-height:20px">购物车空空如也,快去采购吧</p>
                                <p style="font-size:13px;line-height:20px" v-if="!isLogin">请登录查看</p>
								<span class="fr"><Button type="success" to='/login'  v-if="!isLogin">登录 </Button> &nbsp;&nbsp;</span>
                                <span class="fr"><Button type="success" to='/productlist'  v-if="isLogin" >购物 </Button> &nbsp;&nbsp;</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="app-content">
			<router-view></router-view>
		</div>
		<div class="foot_lo_re" v-if="this.$route.fullPath=='/register' || this.$route.fullPath=='/login'">
			<div class="foot_ul"style="width:1200px;margin:0 auto" >
				<Row type="flex" justify="center" class="code-row-bg"  >
						<Row type="flex" justify="center" class="code-row-bg" style="width:1200px;margin:0 auto;margin-top:20px">
				     	<Col :span="4" class="border_right" v-for="(index,item) in  buttonList" :key="item">
			      		<router-link :to="{path:'/about',query:{name:index.menuName,id:index.id}}">{{index.menuName}}</router-link>
					</Col>
				</Row>
				</Row>
			</div>
			<div class="foot_explain" style="margin-top:40px">Copyright 幕饰网 &nbsp;&nbsp; www.91mushi.com &nbsp; &nbsp;版权所有&nbsp; © 沪 ICP备
				18007958号 -1
			</div>
		</div>
		<div class="foot" v-else>
			<div class="foot_loge_img"><img src="../assets/img/foot_loge.png"></div>
			<div class="foot_ul">
				<Row type="flex" justify="center" class="code-row-bg" >
					<Col :span="4" class="border_right" v-for="(index,item) in  buttonList" :key="item">
			      		<router-link :to="{path:'/about',query:{name:index.menuName,id:index.id}}">{{index.menuName}}</router-link>
					</Col>
				</Row>
			</div>
			<div class="foot_erweima_loge">
				<ul>
					<li><img src="../assets/img/fuwuhao.jpg" alt="服务号">
						<p>幕饰服务号</p>
					</li>
					<li style="margin-left:30px"><img src="../assets/img/dingyuehao.jpg" alt="订阅号">幕饰订阅号</li>
				</ul>
			</div>
            <div class="foot_explain2 foot_explain">
              <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="3"  style="font-size:13px" >
                      友情链接 :
                    </Col>  
                    <Col span="4"  v-for="(index,item) in friendList" :key="item"  style="font-size:13px" >
                     <a :href="`http://${index.url}`" target="_blank" style="color:#666">{{index.webName}}</a>
                    </Col>  
                      
                </Row>      
			</div>
			<div class="foot_explain" style="font-size:13px" >Copyright 幕饰网 &nbsp;&nbsp; www.91mushi.com &nbsp; &nbsp;版权所有&nbsp; © 沪 ICP备
				18007958号 -1
			</div>
		</div>
	</div>
</template>

<script>
    let timer='1'
	import Vue from 'vue'
	import store from '@/config/store.js'
import { clearInterval } from 'timers';
	export default {
		data() {
			return {
                indexNum: 0,
                inputFocus:false,
                logintime:1,
				memberInfo: {},
				searchContent: '',
				searchDate: ['玻璃', '工厂'],
				shopList: [],
                hotData: [],
                friendList:[],
                timers:false,
                islogined:false,
                buttonLength:'1',
                buttonList:[]
			}
		},
		computed: {
			'isLogin': function () {
			    if(sessionStorage.username=='null'||sessionStorage.username==null){
                       localStorage.setItem("time", -1);
                        this.memberInfo = {}
               
                    return  false 
                }else{
                  
                this.$http.get('/user/memInfoBack?loginname=' + sessionStorage.username).then(res => {
                    let resp = JSON.parse(res.request.response) 
                      this.timers=true
                      this.settime()
				   	if (resp.code == 200) {      
                          this.memberInfo= resp.data                     
					}
			    	})
                    return  true
                }	
            },   
           '$store.getters.isLogin':function () {
        
               if(this.$store.getters.isLogin){
                    this.islogined=true
                    alert(1)
                   	this.$http.get('/user/memInfoBack?loginname=' + sessionStorage.username).then(res => {
                    let resp = JSON.parse(res.request.response) 
				  	if (resp.code == 200) {      
                           this.memberInfo= resp.data                     
					}
				})
               }else{     
                   alert(2)
                    this.islogined=false
                    this.memberInfo={}
               }
            }
		},
		watch: {
			'$store.state.addlist': function () {
				if (this.$store.state.addlist == 1) {
					this.getshopCar()
					localStorage.setItem("addlist", 0);
					this.$store.commit('lessAdd', 0);
				}
			},
			'$route.query.reLogin': function () {
				if (this.$route.query.reLogin) {
					this.$Notice.error({
                         title: 'TOKEN过期',
                         desc:'账号过期,出于安全考虑,点击退出,并请重新登录',
					     duration: 3
					})
				}
            }
		},
		methods: {
            inputFns(){
           
                this.inputFocus=true    
            },
            inputhide(){
              this.inputFocus=false  
            },
            getFriend(){
            this.$http.get('/friendShipLink/detail').then(res=>{
                let resp=JSON.parse(res.request.response)    
               this.friendList=resp.data;           
            })
            },
            hotSearchFnc(e){
             if(e=='免费配送'){
                this.$router.push({path: '/productlist',query: {deliveryMode: '1', shopname:''}
					})  
             }else{
                 this.$router.push({path: '/productlist', query: {shopname: e}})
             }
            },
			routers() {
				if (this.$route.query.reLogin) {
					this.$Notice.error({
						 title: '回话已过期',
                         desc:'点击退出,并请重新登录',
					     duration: 4
					})
				} else {
					this.$router.push('/buyCenter/userinfomation')
				}
			},
			searchFn() {
				// ==1店铺查询
				if (this.indexNum == 1) {
					this.$router.push({
						path: '/allFactories',
						query: {
							storeName: this.searchContent
						}
					})
				}
				else if (this.indexNum == 0) {
					this.$router.push({
						path: '/productlist',
						query: {
							shopname: this.searchContent
						}
					})
                }
                //免费配送查询
                else if (this.indexNum == 2) {
					this.$router.push({
						path: '/productlist',
						query: {
                            deliveryMode: '1',
                            shopname: this.searchContent
					    	}
					}) 
				}
			},
			tabShopactive(a) {
				this.indexNum = a
				if (a == 1) {
					this.hotSearch(0)
				}
			},
			uersInfo() {
				if (this.isLogin) {
                 	this.$http.get('/user/memInfoBack?loginname=' + sessionStorage.username).then(res => {
                    let resp = JSON.parse(res.request.response) 
                  
				  	if (resp.code == 200) {      
                          this.memberInfo= resp.data                     
					}
				})
				} else {
                    sessionStorage.setItem("time", -1);
					this.memberInfo = {}
					return false
                }        
			},
			loyout() {
                 sessionStorage.setItem("time", -1);
                 this.$store.commit('setTime',-1); 
                 localStorage.setItem("token", null);   
                 sessionStorage.setItem("username", 'null');     
		  	     localStorage.setItem("username", null);
                 localStorage.setItem("MEMBER", '');
                 this.memberInfo={};
                 this.timers=false;
                 this.settime()
				 this.$router.push('/')
				setInterval(() => {
					window.location.reload();
				}, 300)
			},
			hotSearch() {
				this.$http.get('HostSearch/hostName').then(res => {
                    let response = JSON.parse(res.request.response)
                    console.log(response)
					this.hotData = response.data
				})
			},
			getshopCar() {
				if (this.isLogin) {
					this.$http.get('/car/showThereCarInfo').then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 400) {
							this.shopList = {}
						} else if (response.code == 200) {
							this.shopList = response.data
						}
					})
				}
            },
            settime(){  
                if(this.timers){
                          var adc=sessionStorage.time    
                          var timer= setInterval(()=>{                 
                          this.$store.commit('setTime', adc++);
                          sessionStorage.setItem("time", adc);
                         if(adc >= 1200){
                            this.$http.post('/security/refreshToken').then(res=>{ 
                            adc=0
                            sessionStorage.setItem("token",  res.headers.token); 
                            sessionStorage.setItem("time", 0); 
                            this.$store.commit('setTime', 0);         
                            })
                        }                               
                        },1000)  
                         
                    } else {    
                             sessionStorage.setItem("time", -1);
                             return false
                    }
                } ,
                getButton(){
                    this.$http.get('/bottom/menuName').then(res=>{
                        let resp=JSON.parse(res.request.response)         
                        this.buttonLength=  Math.ceil(24/Number(resp.data.length));
                        this.buttonList=resp.data
                      
                    })
                } 
           
        },
		created() {  
            this.getButton()
			this.hotSearch(0)
            this.getshopCar()
            this.getFriend()
                   }     
	            }


</script>
<style>
	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
	
	}

	ul li {
		list-style: none;
	}

	.app-content {
		width: 100%;
		height: auto;
		background: #f8f8f8;
	}

	/* 公告的css样式 */
	/*start*/
	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.clearfix {
		overflow: auto;
		_height: 1%;
	}
  .inputsearch{ position:absolute; width:100%;height: 200px;background: #dfd;top:39px; z-index: 5000}
	.txt_center {
		text-align: center
	}

	/*end*/
	.foot {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.foot_lo_re {
		width: 100%;
		height: 120px;
		background: #fff;
	}

	.foot_titl {
		width: 1200px;
		color: #fff;
		line-height: 45px;
		height: 45px;
		margin: 0 auto;
		font-size: 15px;
	}

	.foot_ul {
		width: 800px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		margin-top: 35px
	}
.foot_ul .border_right:last-child{ border-right: none}
	.border_right {
		border-right: 1px solid #cccccc
	}

	.foot_ul a {
		color: #666666;
		display: block;
		width: 100%;
		height: 100%;
		font-size: 16px
	}

	.foot_explain {
		width: 800px;
		text-align: center;
		font-size: 15px;
		color: #666666;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		margin-top: 10px;
        margin-bottom: 25px
	}

    .foot_explain2{
            margin-top: 0px;
             max-width: 1200px;
             margin-bottom: 0px;
            height: auto;
            overflow: hidden;
}


	.layout_header {
		width: 100%;
        background: #ebebeb;
		height: 35px;
	
	}

	.app-header {
		width: 1200px;
		height: 80px;
		margin: 0 auto;
	}

	.header_main {
		height:35px;
		line-height: 35px;
		font-size: 12px
	}

	.header_right ul li {
		width: 15%;
		height: 35px;
		line-height: 35px;
		margin-left: 1%;
		text-align: center;
		float: left;
	}
	.header_right ul li:nth-child(1) {
		width: 35%;
		height: 35px;
		line-height: 35px;
		margin-left: 1%;
		text-align: center;
		float: left;
	}
	.lo_re_header {
		width: 100%;
		background: #fff;
		height: 100px;
	}

	.lo_re_main {
		width: 1200px;
		height: 100px;
		margin: 0 auto;
	}

	.lo_re_main img {
		float: left;
		margin-top: 10px;
	}

	.foot_loge_img {
		width: 400px;
		height: 100px;
		margin: 0 auto;
		margin-top: 45px
	}

	.foot_erweima_loge {
		width: 230px;
		height: 120px;
		margin: 20px auto;
		text-align: center;
		line-height: 20px;
		color: #999999;
		font-size: 15px
	}

	.foot_erweima_loge ul Li {
		float: left;
		width: 100px;
		height: 120px;
	}

	.foot_erweima_loge ul Li img {
		width: 100px;
		height: 100px;
	}

	.index_search {
		width: 1200px;
		height: 120px;
		margin: 0 auto;
	}

	.index_search_left {
		width: 250px;
		height: 80px;
		margin-top: 20px;
		float: left;
	}

	.index_search_left2 {
		margin-left: 77px;
		width: 143px;
		font-size: 16px;
		cursor: pointer;
		position: relative;
		;
		color: #00a1ff;
		height: 40px;
		margin-top: 45px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #00a1ff;
		border-radius: 3px
	}

	.shopdetail {
		position: absolute;
		color: #666;
		background: #fff;
		display: none;
		width: 244px;
		min-height: 120px;
		overflow: hidden;
		top: 38px;
		left: -102px;
		border: 1px solid #00a1ff;
		z-index: 10000;
	}

	.index_search_mid {
		width: 670px;
		height: 100px;
		margin: 10px 30px 0 30px;
		float: left;
	}

	.index_search_left2:hover .shopdetail {
		display: block
	}

	.index_search_left2:hover {
		border-bottom: none
	}

	.shopdetail_top .shopdetail_top_header {
		width: 240px;
		text-align: left;
		height: 60px;
		float: left;
		text-indent: 5px;
		height: 60px;
		overflow: hidden;
	}

	.detail_top_centent {
		width: 100%;
		height: auto;
		overflow: hidden;
		
	}

	.detail_top_centent ul li {
		width: 100%;
		height: 65px;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
	}

	.shopdetail_top_left {
		width: 65px;
		height: 55px;
		margin: 5px 0 0 5px;
		float: left;
	}

	.detail_top_centent ul li img {
		width: 65px;
		height: 55px;
	}

	.shopdetail_top_right {
		width: 155px;
		font-size: 13px;
		margin-right: 10px;
		margin-top: 5px;
		line-height: 26px;
		text-align: left;
		float: right;
		height: 55px
	}

	.index_search_mid_top {
		width: 210px;
		height: 35px;
	}

	.index_search_mid_mid {
		width: 670px;
		height: 40px;
		border: 1px solid #00a1ff
	}

	.index_search_mid_mid_input {
		width: 590px;
		height: 40px;
		float: left;
		margin-left: 1px;
	}

	.index_search_mid_mid_input input {
		display: block;
		color: #666;
		width: 590px;
		height: 38px;
		border: none;
		outline: none;
		text-indent: 1rem
	}

	.index_search_mid_mid_button {
		width: 77px;
		height: 38px;
		float: left;
	}

	.index_search_mid_mid_button button {
		display: block;
		width: 79px;
		height: 38px;
		outline: none;
		font-size: 15px;
		background: #00a1ff;
		color: #fff;
		border: none;
		cursor: pointer;
	}

	.index_search_mid_top .shopactive {
		background: #00a1ff;
		color: #fff;
	}

	.index_search_mid_top ul li {
		width: 70px;
		height: 35px;
		line-height: 35px;
		float: left;
		cursor: pointer;
		text-align: center;
		font-size: 14px
	}

	.index_loge img {
		width: 100%;
		height: 500px
	}

	.index_search_mid_btm {
		width: 600px;
		height: 25px;
		line-height: 25px;
		overflow: hidden;
	}

	.index_search_mid_btm ul li {
		width: auto;
		height: 25px;
		float: left;
		padding: 0px 12px
	}

</style>
