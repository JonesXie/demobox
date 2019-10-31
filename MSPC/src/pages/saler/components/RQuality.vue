<template>
	<div class="rQuality">
		<div class="qualityHead">
			<p>店铺资质</p>
		</div>
		<div class="qualityContent">
			<div class="contentName Public1">
				<em>公司名称:</em>
				<Input style="width: 300px" class="nameInput Public2" :value="qualityDate.company" readonly/>
			</div>
			<div class="contentType Public1">
				<em>公司类型:</em>
				<Input style="width: 150px" class="typeInput Public2" :value="qualityDate.companyType==0? '企业':'个人'"
					   readonly/>
			</div>
			<div class="contentNumber Public1">
				<em>营业执照号码:</em>
				<Input style="width: 300px" class="numberInput Public2" :value="qualityDate.supplierLiceNo" readonly/>
			</div>
			<div class="contentSite Public1">
				<em>注册地址:</em>
				<Input style="width: 300px" class="siteInput Public2" :value="qualityDate.address" readonly/>
			</div>
			<div class="contentPresent Public1">
				<em>法人代表:</em>
				<Input style="width: 150px" class="presentInput Public2" :value="qualityDate.legal" readonly/>
			</div>
			<div class="contentMoney Public1">
				<em>注册资金:</em>
				<Input style="width: 150px" class="moneyInput Public2" :value="qualityDate.regMoney" readonly/>
				<em>万元</em>
			</div>
			<div class="contentDate Public1">
				<em>成立日期:</em>
				<Input style="width: 150px" class="dateInput Public2" :value="qualityDate.estdate" readonly/>
			</div>
			<div class="contentBusiness Public1">
				<em>主营业务:</em>
				<Input style="width: 300px" class="businessInput Public2" :value="qualityDate.mainBusiness" readonly/>
			</div>
			<div class="contentURL Public1">
				<em>公司网址:</em>
				<Input style="width: 300px" class="urlInput Public2" :value="qualityDate.companyWeb" readonly/>
			</div>
			<div class="contentPhoto">
				<em>营业执照图片:</em>
				<img :src="qualityDate.supplierliceurl" alt="" class="photoShow">
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs'

	export default {
		name: "RQuality",
		data() {
			return {
				qualityDate: {
					company: '',
					companyType: '',
					supplierLiceNo: '',
					address: '',
					legal: '',
					regMoney: '',
					estdate: '',
					mainBusiness: '',
					companyWeb: '',
					supplierliceurl: require('@/assets/img/zizhi1.png'),
				}
			}
		},
		methods: {
			//解析数据
			qualityInfoSucc: function (response) {
				let res = JSON.parse(response.request.response);
				if (res.code == 200) {
					let _data = res.data.shopSaler
					this.qualityDate = {
						company: _data.company,
						companyType: _data.companyType,
						supplierLiceNo: _data.supplierLiceNo,
						address: _data.address,
						legal: _data.legal,
						regMoney: _data.regMoney,
						estdate: _data.estdate,
						mainBusiness: _data.mainBusinessNames,
						companyWeb: _data.companyWeb,
						supplierliceurl: this.host2 + _data.supplierliceurl,
					}
				}
			}
		},
		mounted() {
			//获取数据
			axios.post('/store/qualification/info').then(this.qualityInfoSucc);
		}
	}
</script>

<style scoped>

	.qualityHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.qualityHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.qualityContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 30px 0 60px 0;
	}

	.Public1 {
		height: 48px;
		margin-bottom: 20px;
	}

	.Public1 em:first-child, .contentPhoto em:first-child {
		display: inline-block;
		margin: 5px 0 0 52px;
		font-size: 16px;
	}

	.Public2 {
		vertical-align: top;
		margin-left: 40px;
	}

	.numberInput {
		margin-left: 8px;
	}

	em {
		text-decoration: none;
		font-style: normal;
		margin: 0;
		padding: 0;
		vertical-align: top;
	}

	.contentMoney em:last-child {
		display: inline-block;
		margin-top: 5px;
		font-size: 16px;
	}

	.photoShow {
		vertical-align: top;
		margin-left: 10px;
		width: 341px;
		height: 487px;
	}

</style>
