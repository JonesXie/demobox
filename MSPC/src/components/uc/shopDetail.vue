<template>
	<div class="shopdetal">
		<div class="shopdetail_box">
			<!-- <div class="shopdetail_header">
				<Breadcrumb>
					<BreadcrumbItem to="/"> &nbsp;&nbsp;首页</BreadcrumbItem>
					<BreadcrumbItem :to=" {path: '/productlist',query: {shopname: explainList.goodsName}}">{{explainList.goodsName}}</BreadcrumbItem>
					<BreadcrumbItem :to="{path:'/shopGoods',query:{id:explainList.shopId}}">{{explainList.shopName}}店铺</BreadcrumbItem>
				</Breadcrumb>
			</div> -->
			<div class="shopdetail_main">
				<div class="shopdetail_main_left">
					<div class="shopdetail_main_left_bigimg">
						<img :src="`${imgList[imgindex]}`">
                       <!-- {{imgList[imgindex].indexOf('picture')}} -->
                        <!-- <img v-if="imgList[imgindex].indexOf('picture')=='-1'" :src="`${imgList[imgindex]}`">
                        <img v-else :src="`${host2}${imgList[imgindex]}`" > -->
					</div>
					<div class="shopdetail_main_left_smallimg">
						<ul>
							<li v-for="(val,ind) in imgList" :key="ind" :class="{actives:ind == imgindex}" @click="changeImg(ind)">		
                                <img :src="val" >
							</li>
						</ul>
					</div>
					<div class="shopdetail_main_left_share">

						<ul>
							<!-- <li>
								<Icon type="md-share" style="color:#199ed8;font-size:28px"/>
								分享
							</li> -->
							<li @click="collection()" style="cursor:pointer" v-if="produceHas==0">
							<img src="@/assets/img/love.png"  style="    width: 30px;height: 30px;   vertical-align: middle;">
								收藏
							</li >
                            <li style="cursor:pointer" v-else-if="produceHas==1">
						 	  <img src="@/assets/img/love1.png"  style="    width: 30px;height: 30px;   vertical-align: middle;">
								收藏
							</li>
						</ul>
					</div>
				</div>
				<div class="shopdetail_main_right">
					<div class="shopdetail_main_right_top">
						<div class="shopdetail_main_right_top_name">
							{{explainList.goodsName}}
						</div>
						<div class="shopdetail_main_right_top_notice">
							玻璃如有打孔,挖角,细节描述等信息的填写将在订单详情页显示,商品结算时请注意填写
						</div>
						<div class="shopdetail_main_right_top_card">
							<span class="price_span">价格&nbsp; &nbsp;&nbsp; ￥<span style="color:#ff0000;font-size:22px">{{price}}</span>
								<span class="fr" style="line-height:30px">已完成订单&nbsp;
									<span style="color:#199ed8;font-size:18px;text-align:center">{{order==null ?'0' : order}}</span></span></span>
							<p style="text-indent:5px;font-size:13px">可 <span style="color:#ff0000">{{explainList.getType}}</span> 当前产品工厂所在地
								:
								<span style="color:#ff0000">{{explainList.city}}</span>
							</p>
						</div>
						<div class="shopdetail_main_right_top_notice shopdetail_main_right_top_notice2" style="line-height:55px">
							卖家承诺发货时间 : <span style="color:#199ed8">1~{{parseInt(explainList.dailyCapacity)}}㎡ &nbsp;&nbsp;
								{{parseInt(explainList.cycle)+1}}天内发货</span>
						</div>
						<div class="shopdetail_main_right_top_notice shopdetail_main_right_top_notice2">
							由于厂家产能限制, 订单数量每超过<span style="color:#199ed8"> {{parseInt(explainList.dailyCapacity)}}㎡</span> ,发货时间顺延一天!
						</div>
					</div>
					<div class="nulls"></div>
					<div class="shopdetail_main_right_mid">
						<div class="shopdetail_main_right_mid_attr" v-for="(val,ind) in tabList" :key="ind">
							<div class="shopdetail_main_right_mid_attr_left">
								{{val.attName}}
							</div>
							<div class="shopdetail_main_right_mid_attr_right">
								<ul>
									<li style="cursor:pointer" v-for="(index,item) in val.list" :key="index" @click="tabShowAndMore(ind,item)"
									 :class="{actived:enptyArr.includes(`${ind}${item}`)}">{{index}}
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="shop_detail_buy">
						<ul>

							<li style="margin-left:0px">
								<Button type="error" long style="height:100%;font-size:16px;" @click="buyGlass()">立即购买
								</Button>
							</li>
							<li>
								<Button type="primary" long style="height:100%;font-size:16px;" @click="setBuyShopList()">加入购物车
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</div>

		</div>
		<div class="tuijian">
			<div class="tuijian_main">
				<div class="tuijian_main_left">
					<div class="tuijian_main_left_name">{{explainList.province}}{{explainList.brandName}}
					</div>
					<div class="tuijian_main_box">
						<div class="tuijian_main_rate">
							<div class="tuijian_main_rate_left" style="text-align:center;line-height:90px">
								<span style="font-size:90px;color:#43c346">{{rate.totalScore}}</span>星
							</div>
							<div class="tuijian_main_rate_left">
								<ul>
									<li>商品评价 : &nbsp; &nbsp;{{rate.totalDescribematch}}</li>
									<li>服务态度 : &nbsp; &nbsp;{{rate.totalSellerservice}}</li>
									<li>物流速度 : &nbsp; &nbsp;{{rate.totalLogisticsservice}}</li>
								</ul>
							</div>
						</div>
						<div class="tuijian_main_like">
							<!-- shopId -->
							<Button icon="ios-flower" :to="{path:'/shopGoods',query:{id:explainList.shopId}}" style="    width: 105px;">店铺首页</Button>
							<Button icon="md-heart" style="margin-left:2px;  width: 105px;" @click="shoucangdianpi" >收藏店铺</Button>
						</div>
						<div class="tuijian_main_local">
							<p>店铺地址:</p>
							<p style="line-height:20px;font-size:12px">{{explainList.address}}</p>
							<p> &nbsp;</p>
							<p v-if="explainList.companyWeb!=null&&explainList.companyWeb!=''">店铺网址:</p>
							<p v-if="explainList.companyWeb!=null&&explainList.companyWeb!=''" style="line-height:20px;font-size:13px">
								{{explainList.companyWeb}}
							</p>
						</div>
						<p style="color:#199ed8;text-align:center">推荐商品</p>
						<div class="tuijian_main_ul">
							<ul>
								<li v-for="(val,inx) in recommendList" @click="newdetail(val.goodsId,val.shopId)">
									<!-- <router-link :to="{path:'/shopdetail',query: {goodsid: val.goodsId,shopid:val.shopId}}"> -->
									<!-- <img :src="`${host2}${val.picUrl}`"> -->
                                       
                                     <img :src="`${val.picUrl}`" >
									<p style="color:#ff0000;font-size:20px;">￥ {{val.goodsPrice}}</p>
									<p style="display:bolck;width:88%;margin:0 auto;height:25px;line-height:25px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;color:#999">{{val.goodsName}}</p>
									<p>已有 <span style="color:#199ed8;line-height:25px">{{val.orderNumber==null?'0':val.orderNumber}}</span>人购买</p>
									<!-- </router-link> -->
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="tuijian_main_right">
					<div class="tuijian_main_right_top">
						<ul>
							<li style="cursor:pointer" v-for="(inx,item) in pingjia" :key='inx' :class="{tuijian_main_right_topactive:item==pingjiaIndex}"
							 @click="pingjiaFntba(item)">
								{{inx}}
							</li>
						</ul>
					</div>
					<div class="tuijian_main_right_content">
						<div v-if="pingjiaIndex==0" class="pinjiadetail" v-html="explainList.goodsInfoPC" style="padding:20px 30px">

						</div>
						<div v-if="pingjiaIndex==1" class="pinjiadetail">
							<div class="pinjiadetail_select">
								<RadioGroup v-model="pingjiaType" @on-change="getPingjiaListFn()">
									<Radio label="0" style=" padding-right: 20px;">全部</Radio>
									<Radio label="1" style=" padding-right: 20px;">好评</Radio>
									<Radio label="2" style=" padding-right: 20px;">中评</Radio>
									<Radio label="3" style=" padding-right: 20px;">差评</Radio>
								</RadioGroup>
							</div>
							<div class="pingjia_ul">
								<ul>
									<li v-for="(val,ins) in appraiseList.list" :key="ins">
										<div class="pingjia_ul_left">

											<!-- <img v-if="val.photo!=''" :src="val.photo"> -->
											<img v-if="val.photo==null" :src="defaultimg">
											<img v-else :src="val.photo">
											<span v-if="val.nicekname==null">匿名客户</span>
											<span v-else>{{val.nicekname}}</span>
										</div>
										<div class="pingjia_ul_right">
											<div class="pingjia_ul_right_header">评分:
												<Rate disabled v-model="val.elevel" />
											</div>
										</div>
										<div class="pingjia_ul_right_content">
											<div class="pingjia_ul_right_content_left">内容 :</div>
											<div class="pingjia_ul_right_content_right">{{val.appraiseGoods}}
											</div>
										</div>
										<div class="pingjia_ul_right">
											<div class="pingjia_ul_right_img" v-if="val.picture[0]!=''">
												<ul>
													<li v-for="(index,item) in val.picture" :key="item">
														<img :src="index" @click="bigImg(index)">
													</li>
												</ul>
											</div>
										</div>
										<div class="pingjia_ul_right">
											<div class="pingjia_ul_right_img" style="text-align:left;font-size:13px;height:40px;line-height:40px">
												{{val.appraiseTime | formatDate}}
											</div>
										</div>
										<div class="pingjia_ul_right_content" style="color:#ffcc00" v-if="val.replyVos!=''" v-for="(in1,in2) in val.replyVos"
										 :key="in2">
											<div class="pingjia_ul_right_content_left" style="width:70px">卖家回复 :</div>
											<div class="pingjia_ul_right_content_right" style="width:600px">
												{{in1.replyInfo}}
											</div>
										</div>
									</li>
								</ul>
								<div style="text-align:center;margin:10px auto">
									<Page :total="app_List_totel" :current="current" @on-change="pagechange" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Modal v-model="modal1" :footer-hide="true">
			<div class="img_model">
				<img :src="imgModel">
			</div>
		</Modal>
	</div>
</template>
<script>
	import {
		formatDate
	} from '@/assets/js/data.js';
	import qs from 'qs';

	export default {
		data() {
			return {
				productHas: 0,
				defaultimg: require('@/assets/img/headimg.png'),
				imgList: [],
				current: 1,
				explainList: [],
				tabList: [],
				recommendList: [],
				imgindex: 0,
				price: '',
				order: '',
				tabArrALL: [],
				enptyArr: [],
				shopnNumber: 1,
				rate: {},
				pingjia: ['商品详情', '评价'],
				pingjiaIndex: 0,
				pingjiaType: '0',
				appraiseList: [],
				modal1: false,
				imgModel: '',
				app_List_totel: 0,
				thisshopid: '',
				thisspuid: "",
				islogind: false,
				buyInfo: {},
				sendData: {},
				soucangde: 0,
				produceHas: 0
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		computed: {
			'isLogin': function () {
				if (sessionStorage.username == 'null' || sessionStorage.username == null) {
					return false
				} else {
					return true
				}
			}
		},
		methods: {
			newdetail(a, c) {
				this.$router.push({
					path: '/shopdetail',
					query: {
						goodsid: a,
						shopid: c
					}
				})
				this.thisspuid = this.$route.query.goodsid;
				this.thisshopid = this.$route.query.shopid;
				this.getShopDetail(this.thisspuid, this.thisshopid)
				this.getRate(this.thisshopid)
				this.getAppraise(this.thisspuid, 0, 1)
			},
			collection() {
				if (this.isLogin) {
					//if (this.produceHas == 0) {
						let _data = {
							spuId: this.explainList.spuId
						}
						this.$http.post('/collection/addcollectgoods', qs.stringify(_data)).then(res => {
							let resp = JSON.parse(res.request.response)		
							if (resp.code == 200) {
                                this.$Message.success('收藏商品成功')
                                let _data={
                                goodsSpuId:this.thisspuid,
                                shopId:this.thisshopid
                                }
                            this.$http.post('/collection/checkCollection',qs.stringify(_data)).then(res=>{
                                let resped=JSON.parse(res.request.response)
                               if(resped.code==200){
                                   this.produceHas=1;
                               } 
                            })
							} else if (resp.code == 204) {
								this.$Message.error('此商品是自己的商品')
							} else if (resp.code == 400) {
								this.$Message.error(resp.message)
							}
						})
				} else {
					this.$Message.error('请先登录')
				}
			},
			shoucangdianpi() {
				if (this.isLogin) {
					if (this.soucangde == 0) {
						let _data = {
							shopId: this.explainList.shopId
						}
						this.$http.post('/collection/addcollectshop', qs.stringify(_data)).then(res => {
							let resp = JSON.parse(res.request.response)
							this.soucangde = 1
							if (resp.code == 200) {
								this.$Message.success('收藏店铺成功')
							} else if (resp.code == 204) {
								this.$Message.error('此店铺是自己的店铺')
							}
						})
					} else {
						return false
					}
				} else {
					this.$Message.error('请先登录')
				}
			},
			pagechange(pages) {
				this.getAppraise(this.thisspuid, this.pingjiaType, pages)
			},
			getShopDetail(spuid, shopid) {
				this.$http.get('/goodsdetails/info?spuId=' + spuid + '&shopId=' + shopid).then(res => {
					let response = JSON.parse(res.request.response)
					if (response.code == 200) {
                       let  obj=[];
                        response.data[0].map((r,b)=>{          
                              if(r.indexOf('picture')!='-1'){
                                    obj.push(`${this.host2}${r}`)
                              }     
                          else{
                                obj.push(r)
                          }
                         })
                        this.imgList =obj
						this.explainList = response.data[1];
						this.tabList = response.data[2];
						this.recommendList = response.data[3];
						this.price = this.explainList.goodsPrice
						this.order = this.explainList.orderNumber;
						let statics = response.data[1].skuAttList;
						let staticarr = []
						statics.forEach((a, c) => {
							staticarr.push(a.attValContent)
						})
						let aarrs = []
						this.tabList.forEach((indx, itm) => {
							this.tabList[itm].list.forEach((e, v) => {
								if (this.tabList[itm].list[v] == staticarr[itm]) {
									aarrs.push(`${itm}${v}`)
								}
							})
						})
						this.enptyArr = aarrs;
                        this.searchPrice();
                        if(this.isLogin){
                            let _data={
                                goodsSpuId:spuid,
                                shopId:shopid
                            }
                            this.$http.post('/collection/checkCollection',qs.stringify(_data)).then(res=>{
                                let resped=JSON.parse(res.request.response)
                               if(resped.code==200){
                                   this.produceHas=1;
                               } 
                            })
                        }
					} else {
						this.$Message.error('数据有问题')
						//	this.$router.push('/index')
					}
				})
			},
			//图片显示
			changeImg(e) {
				this.imgindex = e
			},
			tabShowAndMore(e, v) {
				let newarr = `${e}${v}`;
				if (this.enptyArr.length == 0) {
					this.enptyArr[0] = newarr
					this.searchPrice()
				} else {
					this.enptyArr[e] = newarr;
					this.enptyArr = [...new Set(this.enptyArr)];
					this.searchPrice()
					return false
				}
			},
			searchPrice() {
				let fuckarr = []
				let wordarr = []
				this.enptyArr.forEach((value, item) => {
					fuckarr.push(value.charAt(value.length - 1))
					wordarr.push(this.tabList[item].list[(fuckarr[item])])
				})
				let word = wordarr.join("%2B")
				this.$http.get('/goodsdetails/checkSku?spuId=' + this.explainList.spuId + '&skuStr=' + word)
					.then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 200) {
							this.price = response.data.salePrice;
							this.buyInfo = response.data;
							this.sendData = response.data
						} else {
							this.price = '暂未录入此商品';
							this.buyInfo = {}
						}
					})
			},
			addNum() {
				this.shopnNumber = this.shopnNumber + 1
			},
			lessNum() {
				if (this.shopnNumber == 1) {
					this.shopnNumber = 1
					this.$Message.warning('数量不能小于1')
				} else {
					this.shopnNumber = this.shopnNumber - 1;
				}
			},
			//评分 
			getRate(id) {
				this.$http.get('/order/shopScore?shopId=' + id).then(res => {
					let response = JSON.parse(res.request.response)
					this.rate = response.data
					if (response.code == 200) {
						this.rate = response.data
						this.app_List_totel = Number(response.total)
					} else {
						this.rate = {}
					}
				})
			},
			//评价
			getAppraise(id, type = 1, page) {
				this.$http.get('/order/goodSAppraise?productSpuId=' + id + '&appraiseType=' + type + '&page=' + page).then(res => {
					let response = JSON.parse(res.request.response)
					this.appraiseList = response.data
					this.app_List_totel = response.data.total
				})
			},
			pingjiaFntba(e) {
				this.pingjiaIndex = e
			},
			getPingjiaListFn() {
				this.getAppraise(this.thisspuid, this.pingjiaType, 1)
			},
			bigImg(e) {
				this.modal1 = true
				this.imgModel = e
			},
			//加入购物车
			setBuyShopList() {
				if (this.isLogin) {
					if (this.buyInfo.salePrice == undefined) {
						this.$Message.error('请购买已录入的产品')
					} else {
						let _data = {
							memid: JSON.parse(sessionStorage.MEMBER).isused,
							goodsspuid: this.buyInfo.spuId,
							goodsskuid: this.buyInfo.skuId,
							shopid: this.buyInfo.shopId,
							price: this.buyInfo.salePrice,
							combinate: `${this.explainList.goodsName} ${this.buyInfo.skuStr}`,
							amount: this.shopnNumber,
							goodsTypeId: this.explainList.goodsTypeId
						}
						this.$http.post('/car/addCar', qs.stringify(_data)).then(res => {
							let response = JSON.parse(res.request.response)
							if (response.code == 200) {
								this.$Message.success('添加购物车成功');
								sessionStorage.setItem("addlist", 1);
								this.$store.commit('setAdd', 1);
							} else {
								this.$Message.error(response.message);
							}
						})
					}
				} else {
					this.$Message.error('请登录')
				}
			},
			stringsFn(obj) {
				let newname = obj.split('+')
				let names = newname.map((a, b) => {
					if (b % 2 == 0) {
						let ada = []
						if (newname[b + 1] == undefined) {
							newname[b] = `${newname[b]}`
						} else {
							newname[b] = `${newname[b]}+${newname[b + 1]}`
						}
						return newname[b]
					}
				})
				let datas = names.filter((index, item) => {
					return index != undefined
				})
				let newproducename = datas.join(" ");
				return newproducename
			},
			buyGlass() {
				if (this.isLogin) {
					if (this.buyInfo.skuId == undefined) {
						this.$Message.error('请勾选商品')
					} else {
						let _data = {
							spuId: this.explainList.spuId
						}
						this.$http.post('order/checkGoodsBelong', qs.stringify(_data)).then(res => {
							let response = JSON.parse(res.request.response)
							if (response.code == 200) {
								let producenameOfDetail = this.stringsFn(this.sendData.skuStr)
								let producename = `${this.explainList.goodsName} ${producenameOfDetail}`
								this.$router.push({
									path: '/orders',
									query: {
										sku: this.buyInfo.skuId,
										goodsTypeId: this.explainList.goodsTypeId,
										laiyuan: '0',
										shopid: this.sendData.shopId,
										spuId: this.sendData.spuId,
										customno: producename,
										shopName: this.explainList.shopName
									}
								})
							} else {
								this.$Message.error('不能购买自家店铺的商品，请选择商品后重试！')
							}
						})

					}

				} else {
					this.$Message.error('请先登录')
				}
			}
		},

		created() {
			this.thisspuid = this.$route.query.goodsid;
			this.thisshopid = this.$route.query.shopid;
             this.getShopDetail(this.thisspuid, this.thisshopid)
			this.getRate(this.thisshopid)
			this.getAppraise(this.thisspuid, 0, 1)
		},
		mounted() {

		}
	}

</script>
<style scoped>
	.shopdetal {
		width: 100%;
		overflow: hidden;
		background: #fff
	}

	.shopdetail_box {
		width: 1200px;
		min-height: 200px;
		margin: 0 auto
	}

	.shopdetail_header {
		width: 1200px;
		height: 45px;
		background: #f1f1f1;
		line-height: 45px
	}

	.shopdetail_main {
		width: 1200px;
		min-height: 550px;
		margin: 15px auto
	}

	.shopdetail_main_left {
		width: 420px;
		min-height: 560px;
		float: left;
	}

	.shopdetail_main_left_bigimg {
		width: 420px;
		height: 420px;
		border: 1px solid #eeeeee;
		border-radius: 3px;
		-webkit-box-shadow: 0px 0px 1px 1px #eeeeee inset;
	}

	.shopdetail_main_left_bigimg img {
		width: 400px;
		height: 400px;
		margin: 9px 9px;
	}

	.shopdetail_main_left_smallimg {
		width: 420px;
		height: 62px;
		margin-top: 20px
	}

	.shopdetail_main_left_smallimg ul li {
		float: left;
		width: 65px;
		height: 60px;
		border: 1px solid #eeeeee;
		margin-left: 4px;
		-webkit-box-shadow: 0px 0px 1px 1px #eeeeee inset;
	}

	.shopdetail_main_left_smallimg ul li img {
		width: 63px;
		height: 57px;
		margin-top: 1px
	}

	.shopdetail_main_left_smallimg .actives {
		border: 1px solid #199de8
	}

	.shopdetail_main_left_share {
		width: 420px;
		height: 30px;
		;
		margin: 0px auto;
		margin-top: 40px
	}

	.shopdetail_main_left_share ul li {
		float: left;
		width: 100px;
		height: 30px;
		font-size: 15px;
		line-height: 30px;
	}

	.shopdetail_main_right {
		width: 650px;
		float: left;
		margin-left: 40px;
		min-height: 650px;
		padding-bottom: 30px
	}

	.shopdetail_main_right_top {
		width: 650px;
		height: 270px;
		border-bottom: 2px dashed #CCC
	}

	.shopdetail_main_right_top_name {
		width: 650px;
		height: 40px;
		line-height: 50px;
		font-size: 20px;
		color: #000;
	}

	.shopdetail_main_right_top_notice {
		width: 650px;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		color: #ff0000;
	}

	.shopdetail_main_right_top_card {
		width: 650px;
		height: 100px;
		background: #f1f1f1;
		margin-top: 10px
	}

	.price_span {
		display: block;
		width: 98%;
		height: 60px;
		line-height: 60px;
		font-size: 17px;
		margin: 0 auto
	}

	.shopdetail_main_right_top_notice2 {
		color: #666666;
		height: 40px;
		line-height: 40px;
	}

	.shopdetail_main_right_mid {
		width: 650px;
		height: auto;
		border-bottom: 2px dashed #ccc;
		padding-bottom: 10px
	}

	.shopdetail_main_right_mid_attr {
		width: 650px;
		height: auto;
		overflow: hidden;
		;
		line-height: 30px;
		margin-top: 10px
	}

	.shopdetail_main_right_mid_attr_left {
		float: left;
		width: 75px;
		font-size: 14px;
		color: #999999
	}

	.shopdetail_main_right_mid_attr_right {
		float: left;
		width: 575px;
	}

	.nulls {
		width: 100%;
		height: 20px;
	}

	.shopdetail_main_right_mid_attr_right ul li {
		float: left;
		cursor: default;
		padding: 0 8px;
		height: 30px;
		text-align: center;
		border: 1px solid #199ed8;
		margin-left: 10px;
		margin-bottom: 8px;
	}

	.actived {
		background: #199ed8;
		color: #fff
	}

	.shop_detail_buy {
		width: 650px;
		height: 46px;
		margin-top: 20px;
	}

	.shop_detail_buy ul li {
		width: 120px;
		height: 46px;
		float: left;
		margin-left: 20px;
		background: #fff;
	}

	.tuijian {
		width: 100%;
		background: #f1f1f1;
		overflow: hidden;
		padding-bottom: 30px
	}

	.tuijian_main {
		width: 1200px;
		margin: 0 auto;
	}

	.tuijian_main_box {
		width: 100%;
		height: auto;
		background: #fff;
		padding-bottom: 20px
	}

	.tuijian_main_left {
		width: 280px;
		min-height: 200px;
		float: left;
		font-size: 15px;
		padding-bottom: 20px
	}

	.tuijian_main_left_name {
		width: 280px;
		height: 60px;
		line-height: 60px;
		;
		text-align: center;
		border: 1px solid #ccc;
		background: #f1f1f1
	}

	.tuijian_main_rate {
		width: 220px;
		margin: 0 auto;
		height: 120px;
		border-bottom: 1px solid #ccc;
		padding-top: 15px
	}

	.tuijian_main_rate_left {
		width: 110px;
		height: 90px;
		float: left;
	}

	.tuijian_main_rate_left ul li {
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #999
	}

	.tuijian_main_like {
		width: 220px;
		height: 35px;
   
		margin: 15px auto
	}

	.tuijian_main_local {
		width: 220px;
		height: auto;
		overflow: hidden;
		margin: 20px auto;
		font-size: 14px;
		color: #999;
		line-height: 25px
	}

	.tuijian_main_local a {
		color: #666
	}

	.tuijian_main_ul {
		width: 200px;
		height: auto;
		margin: 0 auto;
	}

	.tuijian_main_ul ul li {
		width: 200px;
		height: 24W0px;
		border: 1px solid #eee;
		margin-top: 25px;
		text-align: center;
		line-height: 25px;
		font-size: 14px
	}

	.tuijian_main_ul ul li img {
		width: 100px;
		height: 100px;
		margin: 30px 50px 10px 50px
	}

	.tuijian_main_right {
		width: 885px;
		min-height: 300px;
		background: #fff;
		float: right;
	}

	.tuijian_main_right_top {
		height: 50px;
		width: 100%;
		border-bottom: 2px solid #199ed8;
		line-height: 50px
	}

	.tuijian_main_right_top ul li {
		width: 120px;
		height: 50px;
		float: left;
		text-align: center;
		font-size: 16px
	}

	.tuijian_main_right_topactive {
		background: #199ed8;
		color: #fff;
	}

	.tuijian_main_right_content {
		width: 885px;
		min-height: 200px;
	}

	.pinjiadetail {
		width: 860px;
		height: auto;
		overflow: hidden;
		margin: 0 auto
	}

	.pinjiadetail_select {
		height: 50px;
		width: 860px;
		border-bottom: 2px solid #eee;
		line-height: 50px
	}

	.pingjia_ul ul li {
		width: 820px;
		;
		padding-bottom: 20px;
		overflow: hidden;
		margin: 0 auto;
		margin-top: 20px;
		border-bottom: 1px solid #eee
	}

	.pingjia_ul_left {
		width: 60px;
		height: 120px;
		float: left;
		text-align: center;
		font-size: 15px;
		line-height: 40px
	}

	.pingjia_ul_left img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.pingjia_ul_right {
		width: 730px;
		;
		float: right;
		text-align: center;
		font-size: 15px
	}

	.pingjia_ul_right_header {
		width: 100%;
		height: 30px;
		line-height: 30px;
		background: #eefaff;
		text-align: left;
		margin-bottom: 10px
	}

	.pingjia_ul_right_content {
		width: 730px;
		overflow: hidden;
		float: right
	}

	.pingjia_ul_right_content_left {
		width: 40px;
		float: left;
		line-height: 20px
	}

	.pingjia_ul_right_content_right {
		width: 680px;
		float: left;
		line-height: 20px
	}

	.pingjia_ul_right_content_right img {
		width: 50px;
		height: 50px;
		;
	}

	.pingjia_ul_right_img {
		width: 680px;
		float: left;
		overflow: hidden;
		margin-left: 40px
	}

	.pingjia_ul_right_img ul li {
		width: 50px;
		height: 50px;
		float: left;
		margin-right: 8px;
		margin-top: 8px;
		border-bottom: none;
		border: 1px solid #eee;
	}

	.pingjia_ul_right_img ul li img {
		width: 50px;
		height: 50px;
	}

	.img_model {
		width: 300px;
		height: 300px;
		margin: 0 auto;
	}

	.img_model img {
		width: 300px;
		height: 300px;
	}

	.tuijian_main_ul ul li:hover {
		cursor: pointer;
	}

</style>
