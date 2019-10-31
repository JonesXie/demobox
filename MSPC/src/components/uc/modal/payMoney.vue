<template>
	<div class="pay">
		<div class="pay_mian">
			<div class="pay_span">
				<span class="spanspecial">|</span> 订单支付
			</div>
			<div class="pay_for">
				<p> 订单已提交,请尽快付款! 统一订单号 : {{orderNo}}<span class="fr spans">应付金额 : <span
					style="color:#ff0000">{{price}}&nbsp; &nbsp;</span></span>
				</p>
				<p> 请您在 <span style="color:#ff0000">2小时内完成支付</span>,否则订单会被取消</p>
			</div>
		</div>
		<div class="pay_span" style="margin:20px auto">
			<span class="spanspecial">|</span> 支付方式
		</div>
		<div class="pay_way">
			<ul>
				<li :class="{atvies:tabindex==1}" @click="tabname(1)"><img src="@/assets/img/timg.jpg"></li>
				<li :class="{atvies:tabindex==2}" @click="tabname(2)"><img src="@/assets/img/wxpay.png"></li>
				<li :class="{atvies:tabindex==3}" @click="tabname(3)"><img src="@/assets/img/zfbpay.png"></li>
			</ul>
		</div>
		<div class="pay_b">
			<Button type="error" style="width:200px" @click="goPay"> 立即支付</Button>
		</div>
		<div class="card_pay">
			<form name="form2" action="https://service.allinpay.com/gateway/index.do" method="post" id="tlpay">
				<input type="hidden" name="inputCharset" value="1"/>
				<input type="hidden" name="language" value="1"/>
				<input type="hidden" name="signType" value="0"/>
				<input type="hidden" name="tradeNature" value="GOODS"/>
				<input type="hidden" name="payerIDCard" value=""/>
				<input type="hidden" name="pid" value=""/>
                <input type="hidden" name="extTL" value=""/>
				<input type="hidden" name="productId" value=""/>
				<input type="hidden" name="productDesc" value=""/>
				<input type="hidden" name="issuerId" value=""/>
				<input type="hidden" name="pan" value=""/>
				<input type="hidden" name="customsExt" value="100"/>
				<input type="hidden" name="payerEmail" value=""/>
				<input type="hidden" name="productPrice" v-model="info.productPrice"/>
				<input type="hidden" name="pickupUrl" v-model="info.pickupUrl"/>
				<input type="hidden" name="receiveUrl" v-model="info.receiveUrl"/>
				<input type="hidden" name="version" v-model="info.version"/>
				<input type="hidden" name="merchantId" v-model="info.merchantId"/>
				<input type="hidden" name="payerName" v-model="info.payerName"/>
				<input type="hidden" name="payerTelephone" v-model="info.payerTelephone"/>
				<input type="hidden" name="orderNo" v-model="info.orderNo"/>
                <input type="hidden" name="inputCharset" v-model="info.inputCharset"/>
				<input type="hidden" name="orderAmount" v-model="info.orderAmount"/>
				<input type="hidden" name="orderCurrency" v-model="info.orderCurrency"/>
				<input type="hidden" name="orderDatetime" v-model="info.orderDatetime"/>
				<input type="hidden" name="orderExpireDatetime" v-model="info.orderExpireDatetime"/>
				<input type="hidden" name="productName" v-model="info.productName"/>
				<input type="hidden" name="productNum" v-model="info.productNum"/>
				<input type="hidden" name="ext1" v-model="info.ext1"/>
				<input type="hidden" name="ext2" v-model="info.ext2"/>
				<input type="hidden" name="payType" v-model="info.payType"/>
				<input type="hidden" name="signMsg" v-model="info.signMsg"/>
			</form>
		</div>
	</div>
</template>
<style scoped>
	.pay {
		width: 100%;
		min-height: 500px;
		background: #f1f1f1;
		padding: 0 20px;
		border-top: 1px solid #B7E0F2
	}

	.pay_mian {
		width: 1200px;
		background: #fff;
		overflow: hidden;
		margin: 20px auto
	}

	.pay_span {
		width: 1200px;
		height: 35px;
		line-height: 35px;
		text-indent: 15px;
		font-size: 16px;
		font-weight: bold;
	}

	.spanspecial {
		color: #ff0000;
		font-size: 25px;
	}

	.pay_for {
		width: 100%;
		height: 50px;
		margin-top: 8px;
		line-height: 25px;;
		text-indent: 15px;
		font-size: 13px;
	}

	.spans {
		font-size: 16px;
		font-weight: bold;
	}

	.pay_way {
		width: 1200px;
		background: #fff;
		height: 80px;
		margin: 0 auto;
	}

	.pay_way ul li {
		width: 200px;
		height: 60px;
		margin-top: 10px;
		border: 2px solid #fff;
		float: left;
		margin-left: 30px;
		text-align: center
	}

	.pay_way ul li img {
		width: 192px;
		height: 54px;
		margin-top: 2px
	}

	.pay_b {
		width: 1200px;
		height: 50px;
		margin: 30px auto;;
	}

	.atvies {
		border: 2px solid #199de8 !important
	}

</style>
<script>
	import $ from 'jquery'
	import qs from 'qs'

	export default {
		data() {
			return {
				info: {},
				price: '1',
				tabindex: 0,
				go: false,
                orderNo: '',
                thisarr:''
			}
		},
		methods: {
			infomation() {
				let _data = {
					payType: 0,
					orderNo: this.orderNo,
					orderIds: this.$route.query.data
				}
				this.$http.post('/order/unionPay', _data).then(res => {
					let resp = JSON.parse(res.request.response);
					if (resp.code == 200) {
						this.info = resp.data.singn;
                        this.$Message.success('马上跳转到银联支付')
                        console.log(this.info)
						setInterval(() => {
							$('#tlpay').submit();
						}, 1000)
					} else {
						this.$Message.error('网络错误')
					}
				})
			},
			getinfo() {
				if (typeof this.$route.query.data == 'object') {
					this.$http.post('/order/totalFee', this.$route.query.data, {
						headers: {
							"Content-Type": "application/json"
						}
					}).then(res => {
						let resp = JSON.parse(res.request.response)
						this.price = resp.data
					})
				} else if (typeof this.$route.query.data == 'string') {
					let _data = []
					let orderIds = this.$route.query.data
					_data.push(orderIds)
					this.$http.post('/order/totalFee', _data, {
						headers: {
							"Content-Type": "application/json"
						}
					}).then(res => {
						let resp = JSON.parse(res.request.response)
						this.price = resp.data
					})
				}
			},
			tabname(e) {
				this.tabindex = e
				this.go = true
			},
			goPay() {
				if (this.go) {
					if (this.tabindex == 1) {
						this.infomation()
					} else if (this.tabindex == 2) {
						this.$router.push({
							path: '/money',
							query: {
								data: 'W01',
								orderNo: this.orderNo,
								orderIds: this.$route.query.data,
								paytype: "微信",
								price: this.price
							}
						})
						//去 银联
					} else if (this.tabindex == 3) {
						this.$router.push({
							path: '/money',
							query: {
								data: 'A01',
								orderNo:this.orderNo,
								orderIds: this.$route.query.data,
								paytype: "支付宝",
								price: this.price
							}
						})
						//去 银联
					}
				} else {
					this.$Message.error('请选择付款方式')
				}
			},
			getreqsn() {		
                if( (typeof this.$route.query.data)=="string"){
                    let arrs=[]
                    arrs.push(this.$route.query.data)
                    this.$http.post('/order/reqsn', arrs, {headers: {"Content-Type": "application/json"}}).then(ress => {
					let along = JSON.parse(ress.request.response)
                    this.orderNo = along.data
                    arrs=[]
				})
                } else if((typeof this.$route.query.data)=="object"){
                    this.thisarr=this.$route.query.data
				this.$http.post('/order/reqsn', this.thisarr, {headers: {"Content-Type": "application/json"}}).then(ress => {
					let along = JSON.parse(ress.request.response)
                    this.orderNo = along.data
                    this.thisarr=''
				})
                }		
			}
		},
		created() {
			this.getreqsn()
			this.getinfo()
		}
	}

</script>
