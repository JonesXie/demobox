<template>
	<div class="buy">
	
		<div class="buycenter">
			<div class="buycenter_left fl">
				<div class="noname">
					<div class="buycenter_left_title">
						<h2>账户管理</h2>
						<ul>
							<li>
								<router-link to='/buyCenter/userinfomation' exact>个人信息</router-link>
							</li>
							<li>
								<router-link to='/buyCenter/localtions'>收货地址</router-link>
							</li>
							<li>
								<router-link to='/buyCenter/safe'>安全设置</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="noname">
					<div class="buycenter_left_title ">
						<h2>我的订单</h2>
						<ul>
							<li>
								<router-link to='/buyCenter/allorders' exact>所有订单</router-link>
							</li>
							<li>
								<router-link to='/buyCenter/payOrder'>待付款</router-link>
							</li>
							<li>
								<router-link to='/buyCenter/paySend'>待发货</router-link>
							</li>
							<li>
								<router-link to='/buyCenter/payGet'>待收货</router-link>
							</li>
							<li>
								<router-link to='/buyCenter/payEvaluate'>待评价</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="noname">
					<div class="buycenter_left_title">
						<h2>我的账户</h2>
						<ul>
							<li>
								<router-link to='/buyCenter/invoices'>添加发票</router-link>
							</li>
                            <li>
								<router-link to='/buyCenter/invoicesList'>发票记录</router-link>
							</li>
                            <li>
								<router-link to='/buyCenter/addinvoices'>开具发票</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="noname">
					<div class="buycenter_left_title">
						<h2>我的关注</h2>
						<ul>
							<li><router-link to='/buyCenter/shopcollection'>关注店铺</router-link></li>
							<li><router-link to="/buyCenter/collections">收藏商品</router-link> </li>
						</ul>
					</div>
				</div>
				<div class="noname" style="border-bottom:none;padding-bottom:50px">
					<div class="buycenter_left_title">
						<h2>入驻商家</h2>
						<ul>
							<li>
								<router-link to='/buyCenter/Bemerchant'>入驻商家</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="buycenter_right fr">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {};
		},
		created() {
			if (sessionStorage.username=='null'||sessionStorage.username==null) {
				this.$Message.success({
					content: "请先登录", duration: 2
				});
				this.$router.push("/index");
			}
		},		 
		methods: {}
	};
</script>
<style scoped>
	.buy {
		width: 100%;
		height: auto;
		padding-bottom: 20px;
		background: #f1f1f1;
		overflow: hidden;
	}
	.buycenter {
		width: 1200px;
		height: auto;
		margin: 0px auto;
        margin-top:10px;
		overflow: hidden;
	}

	.buycenter_left {
		width: 240px;
		background: #fff;
		box-shadow: 0px 0px 3px #999 inset;
	}

	.buycenter_right {
		width: 940px;
		height: auto;
		overflow: hidden;
		border: 1px solid #d8d8d8;
		box-shadow: 0px 0px 3px #999 inset;
		background: #fff
	}

	.buycenter_left_title ul li .router-link-active {
		color: #fff;
		background: #199ed8
	}

	.noname {
		border-bottom: 1px solid #f1f1f1;
		width: 240px;
	}

	.buycenter_left_title {
		width: 240px;
	}

	.mianbao {
		width: 1200px;
		margin: 0 auto;
		height: 35px;
		line-height: 35px
	}

	.buycenter_left_title h2 {
		display: block;
		width: 240px;
		height: 45px;
		line-height: 45px;
		color: #000;
		font-size: 19px;
		text-indent: 85px
	}

	.buycenter_left_title ul li {
		width: 100%;
		height: 35px;
		line-height: 35px;
		color: #666;
		font-size: 16px;
		cursor: pointer;
		text-indent: 85px
	}

	.buycenter_left_title ul li a {
		color: #666;
		display: block;
		width: 100%;
		height: 35px;
		line-height: 35px;
		border-radius: 3px
	}

	.buycenter_left_title ul li:nth-last-child(1) {
		margin-bottom: 8px;
	}
</style>
