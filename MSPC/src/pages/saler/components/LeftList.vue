<template>
	<div class="leftWrap">
		<div class="list1">
			<h2>店铺管理</h2>
			<ul class="ul1">
				<li>
					<router-link to="/salerInfo/RManage" exact>店铺管理</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RQuality" exact>店铺资质</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RModel" exact>店铺模板</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RWallet" exact>我的钱包</router-link>
				</li>
			</ul>
		</div>
		<div class="list2">
			<h2>商品管理</h2>
			<ul class="ul2">
				<li>
					<router-link to="/salerInfo/RProduct" exact>商品管理</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RRelease" exact>发布商品</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RHotList" exact>热销列表</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RUpDate" exact>上下架</router-link>
				</li>
			</ul>
		</div>
		<div class="list3">
			<h2>订单管理</h2>
			<ul class="ul3">
				<li>
					<router-link to="/salerInfo/ROrder" exact>所有订单</router-link>
				</li>
				<!--暂时不用-->
				<!--<li>-->
					<!--<router-link to="/salerInfo/RPayment" exact>待付款</router-link>-->
				<!--</li>-->
				<li>
					<router-link to="/salerInfo/RConfirm" exact>待确认</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/REvaluation" exact>待评价</router-link>
				</li>
			</ul>
		</div>
		<div class="list4" style="padding-bottom: 50px;">
			<h2>更多管理</h2>
			<ul class="ul4">
				<li>
					<router-link to="/salerInfo/RReplay" exact>评价回复</router-link>
				</li>
				<li>
					<router-link to="/salerInfo/RBills" exact>发票管理</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LeftList"
	}
</script>

<style scoped>
	.list1, .list2, .list3, .list4, .list5 {
		width: 100%;
		border-bottom: 1px solid #f1f1f1;
	}

	h2 {
		display: block;
		width: 100%;
		height: 45px;
		line-height: 45px;
		color: #000;
		font-size: 19px;
		text-indent: 85px;
	}

	ul > li > a {
		display: inline-block;
		font-size: 16px;
		color: #666;
		text-indent: 85px;
		width: 100%;
		height: 35px;
		line-height: 35px;
		border-radius: 3px;
	}

	ul {
		padding-bottom: 10px;
		width: 100%;
	}

	hr {
		height: 1px;
		border: none;
		border-top: 1px solid #f1f1f1;
	}

	ul > li > .router-link-active {
		background: #199ed8;
		color: #fff;
	}

	.list4 h2 > a {
		color: #000;
	}

</style>
