<template>
	<div class="pay_ok">
		<div class="pay_centers">
			<div class="pay_centers_img"><img src="@/assets/img/payok.png"></div>
			<div class="pay_p">购买成功</div>
			<div class="pay_p">我们会尽快处理订单</div>
			<div class="cen">订单编号 : {{orderNo}}</div>
			<div class="pay_router">
				<router-link to="/buyCenter/allorders">订单详情</router-link>
				|
				<router-link to="/">继续购物</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				orderNo: ''
			}
		}, mounted() {
			this.orderNo = this.$route.query.data
		}
	}
</script>

<style scoped>
	.pay_router {
		width: 100%;
		height: 35px;
		line-height: 35px;
		color: #3ed09f;;
		font-size: 16px;
	}

	.pay_ok {
		width: 1200px;
		height: 400px;
		margin: 10px auto;
		background: #fff;
		overflow: hidden;
	}

	.pay_centers {
		width: 600px;
		height: 300px;
		margin: 50px auto
	}

	.pay_centers_img {
		width: 100px;
		height: 100px
	}

	.pay_centers_img img {
		width: 80px;
		height: 80px
	}

	.cen {
		width: 100%;
		height: 45px;
		line-height: 45px;
	}

	.pay_p {
		width: 100%;
		height: 45px;
		line-height: 45px;
		color: #3ed09f;
		font-size: 30px;
	}
</style>

