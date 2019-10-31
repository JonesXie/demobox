<template>
	<div class="shop">
		<div class="shop_main">
			<div class="shop_main_box">全部商品</div>
		</div>
		<div class="shoptable">
			<div class="table_car">
				<div class="table_car_header">
					<div class="table_car_header_main">
						<Row type="flex" justify="start" class="code-row-bg">
							<Col span="2">
								<Checkbox v-model="checkallbutton" @on-change="allChecked()"></Checkbox>
								全选
							</Col>
							<Col span="11">商品</Col>
							<Col span="3">单价</Col>
							<Col span="2">数量</Col>
							<Col span="2">小计</Col>
							<Col span="4">操作</Col>
						</Row>
					</div>
					<div v-if="carlistData.length==0" class="ulldata">
						<img src="@/assets/img/null.jpg">
					</div>
					<div v-for="(vala, inxa) in carlistData" :Key="inxa">
						<div class="forcarlist">
							<div class="forcarlist_top">
								<Checkbox v-model="vala.checked" @on-change="nameChecked(inxa,vala.checked)"></Checkbox>
								{{vala.shopname}}
							</div>
							<div>
								<!-- -->
								<div :class="[{forcarlist_detail:true},{forcarlist_detail_dis:sval.isUpload!='1'}]"
									 v-for="(sval,sinx) in vala.goodsVos"
									 :key="sinx">
									<div style="width:1160px;margin:0 auto; height:130px">
										<Row type="flex" justify="start" class="code-row-bg" style="height:130px">
											<Col span="2">
												<Checkbox v-model="sval.checked" :disabled="sval.isUpload!='1'"
														  @on-change="selectCheckBox(sval.checked,inxa,sinx)"></Checkbox>
											</Col>
											<Col span="11" style="overflow:hidden;text-overflow:ellipsis;      white-space:nowrap;">
                                               
                                                <img :src="`${sval.goodsImgUrl}`"	style="width:106px;height:106px;margin-top:12px;float:left;border:1px solid #eee">
                                                   {{sval.combinate}}
                                                   
											</Col>
											<Col span="3"> ￥ {{sval.price}}</Col>
											<Col span="2">
												1
											</Col>
											<Col span="2" style="color:#000;font-weight:bold"> ￥ {{sval.price }}
											</Col>
											<Col span="4">
												<div
													style="width:100%;height:60px;margin-top:35px;line-height:60px;cursor:default">
													<p @click="delCar(sval.carId)">删除</p>
													<!-- <p>移动至收藏</p> -->
												</div>
											</Col>
										</Row>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="shopbottom">
				<div class="shopbottom_mian">
					<!--  -->
					<div class="shopft">
						<Row>
							<Col span="2">
								<Checkbox v-model="checkallbutton" @on-change="allChecked()"></Checkbox>
								全选
							</Col>
							<Col span="2">&nbsp;</Col>
							<Col span="3" offset="11">已选择 <span
								style="color:#ff0000;font-size:16px">{{newchecked}} </span>件商品
							</Col>
							<Col span="3">
								<p style="line-height:30px">总价<span
									style="color:#ff0000;font-size:17px">￥ {{endPrice}}</span></p>
								<p style="line-height:20px"> 不包含运费,包装费</p>
							</Col>
							<Col span="3">
								<div class="jiesuan" @click="linkto">结算</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import qs from 'qs';

	export default {
		data() {
			return {
				checkallbutton: false,
				allDataLength: 0,
				carlistData: [],
				shopByhandList: [],
				shopnNumber: '',
				carid: [],
				allPrice: [],
				newchecked: 0,
				endPrice: '0',
				namearr: [],
				fuckarr: [],
				fuckspuid: []
			}
		},
		computed: {
			'isLogin': function () {
                if(sessionStorage.username=='null'||sessionStorage.username==null){
                   return  false 
                }else{
                    return  true
                }		
			}
		},
		methods: {
			init() {
				if (sessionStorage.token == null || sessionStorage.MEMBER == null) {
					this.$Message.success({
						content: "请先登录",
						duration: 2
					});
					this.$router.push("/login");
				}
			},
			carList() {
				this.$http.get('/car/list').then(res => {
                    let response = JSON.parse(res.request.response)
					let mapdata = response.data;
					let abc = mapdata.map((val, item) => {
						let obj = {}
						mapdata[item].forEach((gs, its) => {
							obj.checked = gs.checked;
							obj.shopname = gs.shopname;
							obj.shopid = gs.shopid;
							obj.memid = gs.memid;
							obj.id = gs.id;
							obj.combinate = gs.combinate;
						})
						if (val.length > 1) {
							let fuck = []
							mapdata[item].forEach((gs, its) => {
								fuck.push((mapdata[item])[its].goodsVos[0])
							})
							obj.goodsVos = fuck
						} else if (val.length == 1) {
							obj.goodsVos = mapdata[item][0].goodsVos
						}
						return obj
					})
                    this.carlistData = abc
                    console.log( this.carlistData)
					//计算数据的总长度
                    let picklength = []
                       /* 
                        if (picklength.length!= 0)
                        此处当时为!= 
                        2018-12-12改成== 就可以了  鄙人也不知道为何 
                       */ 
                  
					if (picklength.length== 0) {
						abc.forEach((ab, cd) => {
							picklength.push(ab.goodsVos.length)
                        }) 
                        if(abc.length==0){
                           this.allDataLength=0
                        }else{
                            this.allDataLength = picklength.reduce((prev, next) => {
							return prev + next
                         })  
                        }
						
					}
				})
			},
			forId(index) {
				return "shop_id" + index
			},
			delCar(e) {
				let _data = []
				_data.push(e)
				this.$http.post('/car/delete', _data, {headers: {"Content-Type": "application/json;charset=utf-8"}}).then(res => {
					let response = JSON.parse(res.request.response)
					if (response.code == 200) {
                        this.$Message.success('删除成功')
                        sessionStorage.setItem("addlist", 1);
			     		this.$store.commit('setAdd', 1);
                            this.carList()
                            this.nameChecked()	
					} else {
						this.$Message.error('删除失败')
					}
				})
			},
			linkto() {
				let _data = this.fuckspuid
				if (_data.length == 0) {
					this.$Message.error('请选择商品')
				} else {           
					this.$router.push({
						path: '/orders',
						query: {
							data: _data
						}
					})
				}
			},
			// 全选的fN
			allChecked() {
				if (this.checkallbutton) {
					this.fuckarr = []
					this.fuckspuid = []
					let lengtharr = []
					this.carlistData.forEach((va, ix) => {
						this.carlistData[ix].checked = true
						this.carlistData[ix].goodsVos.forEach((index, item) => {
							this.carlistData[ix].goodsVos[item].checked = true
							if (this.carlistData[ix].goodsVos[item].checked) {
								lengtharr.push(item)
								this.fuckarr.push(this.carlistData[ix].goodsVos[item].price)
								this.fuckspuid.push(this.carlistData[ix].goodsVos[item].productskuid)
								this.endPrice = this.fuckarr.reduce((prev, next) => {
									return prev + next
								})
							}
						})
					})
					this.newchecked = lengtharr.length
				} else {
					this.fuckarr = []
					this.fuckspuid = []
					this.newchecked = this.fuckarr.length
					this.carlistData.forEach((va, ix) => {
						this.carlistData[ix].checked = false
						this.carlistData[ix].goodsVos.forEach((index, item) => {
							this.carlistData[ix].goodsVos[item].checked = false
						})
					})
					this.endPrice = 0
				}
			},
			nameChecked(e, v) {
				if (v) {
					this.fuckspuid = []
					let clicelength = 0
					let namearr = []
					this.carlistData[e].checked = true
					this.carlistData[e].goodsVos.forEach((val, ind) => {
						this.carlistData[e].goodsVos[ind].checked = true;
						if (this.carlistData[e].checked) {
							this.fuckarr.push(this.carlistData[e].goodsVos[ind].price)
							this.fuckspuid.push(this.carlistData[e].goodsVos[ind].productskuid)
						}
					})
					this.newchecked = this.fuckarr.length;
					this.endPrice = this.fuckarr.reduce((prev, next) => {
						return prev + next
                    })
                  //  console.log(this.fuckarr.length ,this.allDataLength)
					if (this.fuckarr.length == this.allDataLength) {
						this.checkallbutton = true
						this.allChecked()
					}
				} else {
					this.fuckarr = []
                    this.fuckspuid = []
                    /* 位置bug
                      很久之前的代码  忘记了
                    */
					//this.checkallbutton = false
	         		//		this.carlistData[e].checked = false
					this.carlistData.forEach((val, ind) => {
						if (val.checked == false) {
							this.carlistData[ind].goodsVos.forEach((ac, de) => {
								ac.checked = false
							})
						} else if (val.checked) {
							val.goodsVos.forEach((qw, er) => {
								this.fuckarr.push(qw.price)
								this.fuckspuid.push(qw.productskuid)
							})
						}
					})
					if (this.fuckarr.length != 0) {
						this.endPrice = this.fuckarr.reduce((prev, next) => {
							return prev + next
						})
					} else {
						this.endPrice = 0
					}
					this.newchecked = this.fuckarr.length;
				}
			},
			selectCheckBox(e, b, c) {
				if (e) {
					this.fuckarr = []
					this.fuckspuid = []
					this.carlistData[b].goodsVos[c].checked = true
					this.carlistData.forEach((vak, ind) => {
						let truearr = []
						this.carlistData[b].goodsVos.forEach((swift, kobe) => {
							if (swift.checked) {
								truearr.push(this.carlistData[b].goodsVos[c].checked)
								if (truearr.length == this.carlistData[b].goodsVos.length) {
									this.carlistData[b].checked = true
								}
							}
						})

					})
					// 计算几个的循环   
					this.carlistData.forEach((val, ind) => {
						val.goodsVos.forEach((nb, bs) => {
							if (nb.checked) {
								this.fuckarr.push(nb.price)
								this.fuckspuid.push(nb.productskuid)
							}
						})
					})
					this.endPrice = this.fuckarr.reduce((prev, next) => {
						return prev + next
					})
					this.newchecked = this.fuckarr.length;
					if (this.fuckarr.length == this.allDataLength) {
						this.checkallbutton = true
						this.allChecked()
					}
				} else {
					this.fuckarr = []
					this.fuckspuid = []
					this.checkallbutton = false
					this.carlistData[b].goodsVos[c].checked = false
					this.carlistData.forEach((val, ind) => {
						val.goodsVos.forEach((nb, bs) => {
							if (nb.checked) {
								this.fuckarr.push(nb.price)
								this.fuckspuid.push(nb.productskuid)
							}
							if (nb.checked == false) {
								val.checked = false
							}
						})
					})
					if (this.fuckarr.length != 0) {
						this.endPrice = this.fuckarr.reduce((prev, next) => {
							return prev + next
						})
					} else {
						this.endPrice = 0
					}
					this.newchecked = this.fuckarr.length;
				}
			}
		},
		created() {
			if (this.isLogin) {
				this.carList()
			} else {
			  this.$Message.error('请先登录')
			}
		}
	}

</script>
<style scoped>
	.ulldata {
		width: 1200px;
		min-height: 500px;
		margin: 0 auto;
		text-align: center
	}

	.ulldata img {
		margin: 120px auto
	}

	.shop {
		width: 100%;
		overflow: hidden;
		height: auto;
		background: #fff;
	}

	.info_car {
		width: 1200px;
		overflow: hidden;
		height: 1000px;;
		margin: 0 auto
	}

	.shop_main {
		width: 1200px;
		height: 40px;
		margin: 0 auto
	}

	.shop_main_box {
		width: 1200px;
		height: 40px;
		line-height: 40px;
		font-size: 17px;
		font-weight: bold;
		float: left;
	}

	.shoptable {
		width: 100%;
		min-height: 200px;
		background-size: 100% 100%;
		background: #f1f1f1;
		margin: 0 auto
	}

	.table_car {
		width: 1200px;
		overflow: hidden;
		margin: 0 auto;
		background: #f1f1f1
	}

	.table_car_header {
		width: 100%;
		overflow: hidden;
	}

	.table_car_header_main {
		width: 1200px;
		height: 45px;
		line-height: 45px;
		border: 1px solid #d4d4d4;
		margin: 0 auto;
		text-align: center;
		font-size: 15px
	}

	.forcarlist {
		width: 1200px;
		overflow: hidden;
		margin-top: 5px;
		border: 1px solid #d4d4d4;
	}

	.forcarlist_top {
		width: 1160px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto
	}

	.forcarlist_detail {
		width: 1200px;
		height: 130px;
		background: #fff;
		line-height: 130px;
		text-align: center;
		border-bottom: 1px solid #eee;
		font-size: 15px
	}

	.moreandless {
		width: 140px;
		height: 37px;
		line-height: 35px;
		margin: 47px auto;;
		cursor: default;
		border: 1px solid #eee
	}

	.moreandless_left {
		width: 39px;
		height: 35px;
	}

	.forcarlist_detail_dis {
		background: #d4d4d4
	}

	.moreandless_left2 {
		width: 60px;
		height: 35px;
		text-align: center
	}

	.buttondis {
		width: 100%;
		height: 100%;
		margin-top: -2px;
	}

	.shopbottom {
		width: 100%;
		height: 90px;
		background: #f1f1f1;
		margin: 0px auto;
		margin-top: 15px
	}

	.shopbottom_mian {
		width: 100%;
		height: 60px;
		background: #fff;
		margin-top: 30px;
		border-top: 2px solid #eee;
		border-bottom: 2px solid #eee
	}

	.shopft {
		width: 1200px;
		height: 60px;
		margin: 0 auto;
		line-height: 60px
	}

	.jiesuan {
		width: 100%;
		height: 56px;
		background: #ff0000;
		font-size: 18px;
		text-align: center;
		color: #fff;
	}

</style>
