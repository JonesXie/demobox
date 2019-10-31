<template>
	<div class="factories">
		<div class="FHead">
			<p class="headL">全部工厂</p>
			<p class="headM">All factories</p>
			<!--<p class="headR">-->
				<!--<router-link to="/salerInfo/RManage">去入驻商家>></router-link>-->
			<!--</p>-->
		</div>
		<!--<div class="FChoose">-->
			<!--<ul>-->
				<!--<li v-for="(item,index) in style" :key="index" @click="changeStyle(item.id,index)"-->
					<!--:class="[nowLi==index ? 'nowStyle':'chooseStyle']">{{item.name}}-->
				<!--</li>-->
			<!--</ul>-->
		<!--</div>-->
		<ul class="factoriesInfo" v-if="shopsList != '' || shopsList.length >0 ">
			<li v-for="(item,index) in shopsList" :key="index">
				<router-link :to="{path:'/shopGoods',query:{id:item.id}}">
					<!-- <img :src="`${host2}${item.shoppicurl}`" alt="">    -->
         
                    <img :src="`${item.shoppicurl}`" >
					<p class="company">{{item.shopname}}</p>
					<p class="mainbusiness">主产：{{item.mainbusiness}}</p>
					<p class="star">商家星级：
						<Rate allow-half :value=parseFloat(item.shopScoreVo.totalScore) disabled class="rate"/>
					</p>
					<div class="footer">
						<!--<p class="footerA">-->
							<!--<Icon type="md-heart-outline" style="color: red"/>-->
							<!--<em>收藏</em></p>-->
						<p class="footerSite" v-if="item.contactAddress !=null && item.contactAddress !=undefined">地区：{{ item.contactAddress }}</p>
						<p class="footerSite" v-else>地区：暂无</p>
					</div>
				</router-link>
			</li>
		</ul>
		<div class="Nodata" v-else>暂无数据</div>
		<Page :total="pageTotal" class="Pages" :page-size="12" @on-change="pageChange" :current="checkdata.page"/>
	</div>
</template>

<script>
	import qs from 'qs' //引入qs
	import axios from 'axios'

	export default {
		name: "allFactories",
		data() {
			return {
				shopDetail: require('@/assets/img/product.jpg'),
				style: [{
					name: '所有种类',
					id: ''
				}, {
					name: '钢化玻璃',
					id: 'f941a14d702a42a985ab7c222859176c'
				},{
					name: '中空玻璃',
					id: '428b57d3e70e43eebfb3ae0f445ec070'
				}, {
					name: '夹胶玻璃',
					id: 'aded70b1596f45b2a5f397d6888a93d6'
				}],
				nowLi: 0,
				shopsList: '',
				pageTotal: 0,
				checkdata: {
					goodsTypeId:'',
					storeName:null,
					page: 1,
				}
			}
        },
         watch:{
			 '$route.query.storeName':function(){
				 //this.checkdata.storeName = this.$route.query.storeName;
				 this.getShopStore()
			 }
      	},
		methods: {
			ShopStoreSucc: function (response) {
				let res = JSON.parse(response.request.response);
				if (res.code == '200') {
					this.pageTotal = res.data.total
					this.shopsList = res.data.list;
					// cityChange.filter((ac, bd) => {
					// 	//获取城市
					// 	let arrId = ac.countyid.split('');
					// 	arrId[4] = 0;
					// 	arrId[5] = 0;
					// 	let cityId = arrId.join('');
					// 	axios.get('saler/area/' + cityId).then(
					// 		response => {
					// 			let res = JSON.parse(response.request.response);
					// 			console.log(res);
					// 			if (res.code == '200') {
					// 				ac.countyid = res.data
					// 			} else {
					// 				ac.countyid = '暂无'
					// 			}
					// 		}
					// 	);
					// })
					// this.shopsList = cityChange
				}
			},
			changeStyle: function (id, index) {
				this.nowLi = index;
				this.checkdata.goodsTypeId = id;
				axios.post('/storelist/selectShopStore', qs.stringify(this.checkdata)).then(this.ShopStoreSucc)
			},
			//页码变化
			pageChange: function (currentpage) {
				this.checkdata.page = currentpage;
				axios.post('/storelist/selectShopStore', qs.stringify(this.checkdata)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.shopsList = res.data.list
						}
					}
				);
			},
			//获取内容
			getShopStore:function () {
				let storeName = this.$route.query.storeName;
				if(storeName != undefined){
					this.checkdata.storeName = storeName
				}
				axios.post('/storelist/selectShopStore', qs.stringify(this.checkdata)).then(this.ShopStoreSucc)
			}
		},
		mounted() {
			this.getShopStore()
		}
	}
</script>

<style scoped>
	.factories {
		overflow: hidden;
		width: 1200px;
		margin: 0 auto;
		padding-bottom: 20px;
	}

	.FHead {
		width: 1200px;
		background-color: #fff;
		height: 60px;
		border-bottom: 2px solid #2787fd;
	}

	.headL {
		display: inline-block;
		font-size: 24px;
		color: #2d99fb;
		margin-left: 18px;
		float: left;
		height: 60px;
		line-height: 60px;
	}

	.headM {
		display: inline-block;
		font-size: 16px;
		color: #666666;
		margin: 23px 0 0 15px;
		float: left;
		font-weight: lighter;
	}

	.headR {
		display: inline-block;
		font-size: 16px;
		color: #1a9fd9;
		margin-right: 20px;
		float: right;
		height: 60px;
		line-height: 60px;
	}

	.FChoose {
		width: 100%;
		height: 84px;
		background-color: #fff;
	}

	.FChoose ul {
		width: 605px;
		margin: 0 auto;
		height: 40px;
	}

	.chooseStyle {
		display: inline-block;
		background-color: #f1f1f1;
		font-size: 15px;
		text-align: center;
		float: left;
		width: 123px;
		height: 35px;
		line-height: 35px;
		border-radius: 20px;
		margin-top: 22px;
		margin-right: 36px;
		cursor: pointer;
	}

	.nowStyle {
		display: inline-block;
		background-color: #40a7ff;
		color: #fff;
		font-size: 15px;
		text-align: center;
		float: left;
		width: 123px;
		height: 35px;
		line-height: 35px;
		border-radius: 20px;
		margin-top: 22px;
		margin-right: 36px;
		cursor: pointer;
	}

	.FChoose li:last-child {
		margin-right: 0;
	}

	.factoriesInfo {
		margin: 15px 0;
		overflow: hidden;
	}

	.factoriesInfo li {
		background-color: #fff;
		float: left;
		display: inline-block;
		width: 294px;
		margin: 0 3px 10px 3px;
		padding-bottom: 10px;
		height: 400px;
		overflow: hidden;
		transition:all 0.88s;
	}
	.factoriesInfo li:hover {
		box-shadow: 0px 0px 5px 2px #DCDCDC inset;
		transform:  translate(-1px,-1px);
	}

	.factoriesInfo li img {
		display: inline-block;
		width: 240px;
		height: 240px;
	    margin: 27px 13px 0px 28px;
	}

	.gotoShop {
		display: inline-block;
		float: right;
		margin: 10px 15px 5px 0;
		font-size: 16px;
	}

	.rate {
		margin-left: 5px;
	}

	.company {
		font-size: 16px;
		font-weight: bold;
		margin-left: 20px;
		width: 90%;
		color:#666;
        margin-top: 15px;
	}

	.mainbusiness {
		margin-left: 20px;
		font-size: 14px;
		width: 90%;
		color: #999999;
		overflow: hidden;
		white-space: nowrap; /*不换行*/
		text-overflow: ellipsis; /*超出部分省略号显示*/
	}

	.star {
		margin-left: 20px;
		font-size: 12px;
		color: #999999;
	}

	.footer {
		margin-left: 20px;
		font-size: 12px;
		color: #999999;
		width: 90%;
	}

	.footerA p {
		margin-left: 3px;
	}

	.footerA p {
		margin-left: 3px;
	}

	.footer p {
		display: inline-block;
	}

	.footerSite {
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.Pages {
		margin: 10px auto;
		text-align: center;
	}

	.Nodata {
		font-size: 16px;
		text-align: center;
		padding: 10px;
	}

	.footerA {
		display: inline-block;
		cursor: pointer;
	}

	.footerA em {
		display: inline-block;
		margin-left: 3px;
		text-decoration: none;
		font-style: normal;
	}
</style>
