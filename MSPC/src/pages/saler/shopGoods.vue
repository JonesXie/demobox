<template>
	<div class="shopGoods">
		<Carousel class="shopHead" v-if="CarouselIMG.length > 0">
			<CarouselItem v-for="(item, index) in CarouselIMG" :key="index" class="carouselItem">
				<div class="demo-carousel">
                     <img :src="`${item}`" style="width:100%">          
				</div>
			</CarouselItem>
		</Carousel>
		<div v-if="goodsList.length >0 ">
			<div class="shopContent shopStyle">
				<div class="contentHead">
					<p class="headP">{{goodsList[0].shopName}}--店铺商品</p>
					<img :src="shopContentFooter" alt="">
				</div>
				<ul class="contentInfo">
					<li v-for="(item, index) in goodsList" :key="index">
						<router-link :to="{path:'/shopdetail',query: {goodsid: item.goodsId,shopid:item.shopId}}">
                               <img  :src="`${item.picUrl}`">
                              
							<div class="Infoname">
								<p class="infostyle infonameL">{{item.goodsPrice +'元/㎡'}}</p>
								<p class="infonameR" v-if="item.orderNumber !=null">{{item.orderNumber}}人已下单</p>
								<p class="infonameR" v-else>0人已下单</p>
							</div>
							<div class="Infoname02">
								<p class="infoname02L">{{item.goodsName}}</p>
							</div>
							<p class="infoSite">{{item.province+item.city + item.county}}</p>
						</router-link>
					</li>
				</ul>
				<Page :total="pageTotal" class="Pages" :page-size="pageSize" @on-change="pageChange"
					  :current="checkdata.page"/>
			</div>
			<div class="shopContent" v-if="hotList.length >0">
				<div class="contentHead">
					<p class="headP">{{goodsList[0].shopName}}--推荐商品</p>
					<img :src="shopContentFooter" alt="">
				</div>
				<div class="swiperFather" @mouseenter="swiperIn" @mouseleave="swiperOut">
					<swiper :options="swiperOption" ref="mySwiper">
						<swiper-slide v-for="(item,index) in hotList" :key="index">
							<router-link :to="{path:'/shopdetail',query: {goodsid: item.goodsId,shopid:item.shopId}}" class="hotLink">
								<img :src="`${item.picUrl}`" alt="" class="showIMG">
								<div class="Infoname">
									<p class="infostyle infonameL" style="width: 60%">{{item.goodsPrice +'元/㎡'}}</p>
									<p class="infonameR" v-if="item.orderNumber !=null" style="width: 40%">{{item.orderNumber}}人已下单</p>
									<p class="infonameR" v-else style="width: 40%">0人已下单</p>
								</div>
								<div class="Infoname02">
									<p class="infoname02L">{{item.goodsName}}</p>
								</div>
								<p class="infoSite">{{item.province+item.city + item.county}}</p>
							</router-link>
						</swiper-slide>
					</swiper>
					<div class="swiper-button-prev" slot="button-prev" v-if="hotList.length >4"></div>
					<div class="swiper-button-next" slot="button-next" v-if="hotList.length >4"></div>
				</div>
			</div>
		</div>
		<div class="Nodata" v-else>该店铺暂无商品</div>
	</div>
</template>

<script>
	import qs from 'qs'; //引入qs
	import axios from 'axios';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import 'swiper/dist/css/swiper.css'

	export default {
		name: "shopGoods",
		data() {
			return {
				// autoplaySpeed: 5000,
				CarouselIMG: [],
				goodsList: [],
				pageTotal: 0,
				pageSize: 0,
				hotList:[],
				shopContentFooter: require('@/assets/img/shopContentFooter.png'),
				checkdata: {
					shopStoreId: null,
					page: 1
				},
				swiperOption: {//swiper4
					speed:3000,
					autoplay : {
						delay:2000,
						// disableOnInteraction:false,//用户操作后依旧自动滚动
					},
					loop:true,
					slidesPerView : 5,//一页显示个数
					slidesPerGroup : 1, //滚动个数
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				},
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		methods: {
			//页面初始化
			selectGoodsSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res)
				if (res.code == '200') {
					if (res.data.templetArrList != null){
                        //  res.data.templetArrList.map((a,c)=>{
                        //   if(a.indexOf('/picture')=='0'){
                        //       a=`${this.host2}${a}`
                        //   }
                        //  })
                        this.CarouselIMG = res.data.templetArrList;//轮播图
                         
					}
					this.goodsList = res.data.pageInfo.list;
					this.pageTotal = res.data.pageInfo.total;
					this.pageSize = res.data.pageInfo.pageSize
				}
			},
			getHotlist(response){
				let res = JSON.parse(response.request.response);
				// console.log(res)
				if (res.code == '200') {
					let list = res.data.list;
					if(list !=null){
						this.hotList = list;
						if(list.length <5){
							this.swiperOption.loop = false
						}
					}
				}
			},
			//页码变化
			pageChange: function (currentpage) {
				this.checkdata.page = currentpage;
				axios.post('/storelist/selectGoods', qs.stringify(this.checkdata)).then(
					response => {
						let res = JSON.parse(response.request.response);
						// console.log(res)
						if (res.code == '200') {
							this.goodsList = res.data.pageInfo.list;
							document.body.scrollTop = document.documentElement.scrollTop = 665;
						}
					}
				);
			},
			//swiper 鼠标移入
			swiperIn(){
				this.$refs.mySwiper.swiper.autoplay.stop();
			},
			//swiper 鼠标移出
			swiperOut(){
				this.$refs.mySwiper.swiper.autoplay.start();
			},
		},
		mounted() {
			let ids =this.$route.query.id;
			this.checkdata.shopStoreId = ids;
			if (ids == null || ids == undefined) {
				this.$Message.error({
					content: '非法操作',
					duration: 3,
				});
				this.$router.push('/')
			} else {
				axios.post('/storelist/selectGoods', qs.stringify(this.checkdata)).then(this.selectGoodsSucc);
				//获取热销列表， 暂时不用
				// axios.get('goods/info?shopId='+ids+'&isHot=1').then(this.getHotlist);
			}
		}
	}
</script>

<style scoped>
	.shopGoods {
		overflow: hidden;
		width: 100%;
		padding-bottom: 30px;
	}

	.shopHead {
		width: 100%;
		height: 500px;
		text-align: center;
		overflow: hidden;
	}
	.carouselItem{
		width: 100%;
		height: 500px;
		text-align: center;
		overflow: hidden;
	}
	.shopHead img {
		display: inline-block;
		margin: 0 auto;
		width: auto;
		height: 500px;
	}

	.shopContent {
		width: 1200px;
		height: auto;
		margin: 10px auto;
	}
	.shopStyle{
		margin-bottom: 30px;
	}

	.contentHead {
		text-align: center;
		width: 100%;
		margin: 10px 0;
	}
	.headP{
		font-size: 22px;
		width: 1194px;
		text-align: center;
	}

	.contentHead img {
		width: 1194px;
	}

	.contentInfo li {
		background-color: #fff;
		float: left;
		display: inline-block;
		width: 294px;
		margin: 0 3px 8px 3px;
		padding-bottom: 10px;
		height: 370px;
		overflow: hidden;
		transition: all 0.88s;
	}
	.contentInfo li:hover {
		box-shadow: 0px 0px 5px 2px #DCDCDC inset;
		transform: translate(-1px,-1px);
	}

	.contentInfo li img {
		display: inline-block;
		width: 250px;
		height: 250px;
		margin: 20px 22px 10px 22px;
	}

	.infostyle {
		font-size: 18px;
		color: #e71818
	}

	.Infoname {
		width: 92%;
		font-size: 18px;
		color: #666;
		vertical-align: bottom;
		margin-left: 15px;
	}
	.Infoname02 {
		width: 92%;
		font-size: 18px;
		color: #666;
		vertical-align: bottom;
		margin-top: 3px;
		margin-bottom: 2px;
		margin-left: 15px;
		overflow: hidden;
	}

	.contentInfo {
		overflow: hidden;
	}

	.Infoname {
		display: inline-block;
	}
	.infonameL{
		float: left;
		width: 63%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}
	.infoname02L{
		float: left;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}


	.infonameR {
		width: 37%;
		font-size: 13px;
		text-align: right;
		font-weight: lighter;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.infoSite {
		color: #aaaaaa;
		margin-top: 2px;
		margin-left: 15px;
	}

	.Nodata {
		font-size: 16px;
		text-align: center;
		padding: 10px;
	}

	.Pages {
		margin: 20px auto 0;
		text-align: center;
	}
	.showIMG{
		box-shadow: 0px 0px 3px #666  ;
	}
	.swiperFather{
		width: 100%;
		position: relative;
		top: 0;
		left: 0;
	}
	.swiper-button-next{
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23199ED8'%2F%3E%3C%2Fsvg%3E");
		margin-right: -90px;
		outline: none
	}
	.swiper-button-prev{
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23199ED8'%2F%3E%3C%2Fsvg%3E");
		margin-left: -90px;
		outline: none;
	}
	.hotLink{
		background-color: #fff;
		display: inline-block;
		width: 234px;
		margin: 0 3px;
		padding-bottom: 10px;
		overflow: hidden;
		transition: all 0.88s;
	}
	.hotLink:hover{
		box-shadow: 0px 0px 5px 2px #DCDCDC inset;
		transform: translate(-1px,-1px);
	}
	.hotLink img{
		display: inline-block;
		width: 180px;
		height: 180px;
		margin: 20px 27px 10px 27px
	}
</style>
