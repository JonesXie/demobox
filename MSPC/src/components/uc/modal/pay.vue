<template>
	<div class="pay">
		<div class="erweima">
			<div class="pay_header">支付方式 : {{paytype}} <span class="fr"><strong>金额:</strong><span style="color:#ff0000">{{price}} </span></span>
			</div>
			<div class="pay_center">
				<div v-show="qrcodeUrl" class="response">
					<qrcode
						:value="qrcodeUrl"
						v-if="qrcodeUrl"
						:options="{ size: 300 }">
					</qrcode>
					<div class="erweimabo">
						<div v-if="paytype=='支付宝'">
							<img src="@/assets/img/zfbfq.png">
						</div>
						<div v-else-if="paytype=='微信'">
							<img src="@/assets/img/wxfq.png">
						</div>
					</div>
				</div>
				<div class="response_ri">
					<div v-if="paytype=='支付宝'">
						<img src="@/assets/img/zfbtp.png">
					</div>
					<div v-else-if="paytype=='微信'">
						<img src="@/assets/img/wxtp.png">
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import Qrcode from '@xkeshi/vue-qrcode';
	var timer
	export default {

		data() {
			return {
				qrcodeUrl: '',
				pay: false,
				paytype: '',
                price: '',
                reqsn:''
			}
		},
		components: {
			qrcode: Qrcode
		},
		methods: {
			payd() {
				let _data = {
					payType: this.$route.query.data,
					orderNo: this.$route.query.orderNo,
					orderIds: this.$route.query.orderIds
				}
				this.$http.post('/order/thirdPay', _data).then(res => {
					let resp = JSON.parse(res.request.response);
                    this.qrcodeUrl = resp.data.payinfo;
                 //   console.log(resp.data.payinfo)
                    this.reqsn= resp.data.reqsn
			this.getpay()
				})
			},
			getpay() {
				timer = setInterval(() => {
					this.$http.get('/order/checkPaySuccess?orderNo=' +  this.reqsn).then(res => {
						let resp = JSON.parse(res.request.response);
						if (resp.code == 200) {
							this.pay = true;
							this.$router.push({path: '/paySuccess', query: {data: this.reqsn}})
							clearInterval(timer)
						}
					})
				}, 1000)
			}
		},
		mounted() {
			this.payd()
			this.paytype = this.$route.query.paytype
			this.price = this.$route.query.price
		},
		destroyed() {
		    	clearInterval(timer)
		}
	}
</script>

<style scoped>
	.pay {
		width: 100%;
		background: #f1f1f1;
		height: 800px;
		overflow: hidden;
	}

	.erweima {
		width: 1200px;
		height: 600px;
		margin: 100px auto;
		background: #fff
	}

	.response {
		width: 400px;
		height: 400px;
		float: left;
		margin-left: 30px;
	}

	.erweimabo {
		width: 300px;
		height: 100px;
		margin-top: 5px
	}

	.erweimabo img {
		width: 300px;
		height: 100px;
	}

	.pay_center {
		width: 800px;
		height: 530px;
		margin: 10px auto;
	}

	.pay_header {
		width: 1140px;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		margin: 0 auto
	}

	.response_ri {
		width: 300px;
		height: 405px;
		float: left;
		margin-left: 0px;
	}
</style>
