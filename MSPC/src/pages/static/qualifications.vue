<template>
	<div class="about">
		<div class="about_hader">
			<div class="about_hader_left"><img src="@/assets/img/left_line.png"></div>
			<div class="about_hader_mid about_hader_left">公司资质</div>
			<div class="about_hader_left"><img src="@/assets/img/right_line.png"></div>
		</div>
		<div class="qusli">
			<ul>
				<li><img src="@/assets/img/zizhi1.png"></li>
				<li><img src="@/assets/img/zizhi2.png"></li>
			</ul>
		</div>
	</div>
</template>
<style>
	.about {
		width: 1200px;
		height: auto;
		padding-bottom: 35px;
		margin: 0 auto;
		overflow: hidden;
	}

	.about_hader {
		width: 646px;
		height: 37px;
		margin: 30px auto;
	}

	.about_hader_left {
		width: 228px;
		height: 37px;
		float: left;
		line-height: 37px;
	}

	.about_hader_mid {
		width: 190px;
		height: 37px;
		text-align: center;
		float: left;
		font-size: 22px;
		line-height: 37px
	}

	.qusli {
		width: 700px;
		height: 487px;
		margin: 0 auto
	}

	.qusli ul li {
		width: 340px;
		height: 487px;;
		float: left;
		margin-left: 10px
	}

	.qusli ul li img {
		width: 340px;
		height: 487px;
	}
</style>
<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>



