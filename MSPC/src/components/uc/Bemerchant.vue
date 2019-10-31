<template>
	<div class="Bemachant">
		<div class="Bemachant_header">
			入驻商家
		</div>
		<Alert type="success" show-icon class="alertMsg" v-if="isCheck == '1'">注册成功</Alert>
		<Alert type="warning" show-icon class="alertMsg" v-else-if="isCheck == '0'">审核中，请稍后访问...</Alert>
		<Alert type="error" show-icon class="alertMsg" v-else-if="isCheck == '2'">申请失败，请重新填写...</Alert>
		<span v-else></span>
		<div class="Bemachant_content">
			<Form ref="merchantDate" :model="merchantDate" :rules="merchantRules" inline>
				<div class="contentName Public1">
					<em>公司名称:</em>
					<FormItem class="nameInput Public2" prop="nameRule" inline>
						<Input style="width: 300px" v-model="merchantDate.company" placeholder="请输入公司名称"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentName Public1">
					<em>公司类型:</em>
					<FormItem class="Public2" prop="typeRule" inline>
						<Select style="width:200px" v-model="merchantDate.companyType" placeholder="请选择公司类型"
								v-if="!read">
							<Option value="0">企业</Option>
							<Option value="1">个人</Option>
						</Select>
						<Input style="width: 300px" :value="merchantDate.companyType==0? '企业':'个人'" v-if="read"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentArea Public1">
					<em>注册地区:</em>
					<FormItem class="areaInput Public2" prop="areaRule" inline>
						<Input search style="width: 300px" @on-focus="cityBtn" v-model="merchantShow.county"
							   placeholder="请选择注册地区" :readonly="read"/>
					</FormItem>
					<Modal
						v-model="cityCover"
						title="请选择注册地区"
						width="350"
					>
						<Scroll height="400">
							<Tree :data="cityData" :load-data="cityLoading" ref="citySelected"
								  @on-select-change="citySelected"></Tree>
						</Scroll>
					</Modal>
				</div>
				<div class="contentSite Public1">
					<em>详细地址:</em>
					<FormItem class="siteInput Public2" prop="siteRule" inline>
						<Input style="width: 300px" v-model="merchantDate.address" placeholder="请输入详细地址"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentPresent Public1">
					<em>法人代表:</em>
					<FormItem class="presentInput Public2" prop="presentRule" inline>
						<Input style="width: 300px" v-model="merchantDate.legal" placeholder="请输入法人代表"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentPresent Public1">
					<em>注册资金:</em>
					<FormItem class="presentInput Public2" prop="regMoneyRule" inline>
						<Input style="width: 200px" v-model="merchantDate.regMoney" placeholder="请输入注册资金"
							   :readonly="read"/>
					</FormItem>
					<em>万元</em>
				</div>
				<div class="contentDate Public1">
					<em>成立日期:</em>
					<FormItem class="Public2 datePicker" prop="dateRule" inline>
						<DatePicker type="date" placement='bottom-start' placeholder="选择日期" style="width: 200px"
									@on-change="dataChange" :value="merchantDate.estdate" :readonly="read"></DatePicker>
					</FormItem>
				</div>
				<div class="contentBusiness Public1">
					<em>主营业务:</em>
					<FormItem class="businessInput Public2" prop="businessRule" inline>
						<Input search style="width: 300px" v-model="merchantShow.mainBusiness" @on-focus="businessBtn"
							   placeholder="请选择主营业务" :readonly="read"/>
					</FormItem>
					<Modal
						v-model="businessCover"
						title="请选择主营业务"
						width="350"
					>
						<Scroll height="300">
							<Tree :data="businessData" ref="businessSelected" @on-check-change="businessCheck"
								  show-checkbox></Tree>
						</Scroll>
					</Modal>
				</div>
				<div class="contentURL Public1">
					<em>公司网址:</em>
					<Input style="width: 300px" class="urlInput Public2" v-model="merchantDate.companyWeb"
						   placeholder="请输入公司网址(可选填)" :readonly="read"/>
				</div>
				<div class="contentNumber Public1">
					<em>营业执照号码:</em>
					<FormItem class="numberInput" prop="numberRule" inline>
						<Input style="width: 300px" v-model="merchantDate.supplierLiceNo" placeholder="请输入营业执照号码"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentID1 ID">
					<em>营业执照图片:</em>
					<FormItem class="ID1IMG supplierliceurl" prop="supplierliceRule" inline>
						<img :src="merchantShow.supplierliceurl" alt="" class="ID1IMG picimg">
					</FormItem>
					<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="ID1Editor Public2"
							:on-success="supplierliceurlSuccess" :show-upload-list="false" v-if="!read">
						<Button type="primary">上传图片</Button>
					</Upload>
				</div>
				<div class="contentID1 ID">
					<em>手持身份证照片:</em>
					<FormItem class="ID1IMG Public2" prop="IMGRule01" inline>
						<img :src="merchantShow.idcardhandpic" alt="" class="ID1IMG picimg">
					</FormItem>
					<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="ID1Editor Public2"
							:on-success="uploadSuccess01" :show-upload-list="false" v-if="!read">
						<Button type="primary">上传图片</Button>
					</Upload>
				</div>
				<div class="contentID2 ID">
					<em>身份证正面:</em>
					<FormItem class="ID2IMG" prop="IMGRule02" inline>
						<img :src="merchantShow.idcardpic" alt="" class="upIMG">
					</FormItem>
					<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="ID2Editor"
							:on-success="uploadSuccess02" :show-upload-list="false" v-if="!read">
						<Button type="primary">上传图片</Button>
					</Upload>
				</div>
				<div class="contentID3 ID">
					<em>身份证反面:</em>
					<FormItem class="ID3IMG" prop="IMGRule03" inline>
						<img :src="merchantShow.idcardbackpic" alt="" class="upIMG">
					</FormItem>
					<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="ID3Editor"
							:on-success="uploadSuccess03" :show-upload-list="false" v-if="!read">
						<Button type="primary">上传图片</Button>
					</Upload>
				</div>
				<div class="contentTimeline Public1">
					<em>身份证到期时间:</em>
					<FormItem class="Public2 TimelinePicker" prop="timelineRule" inline>
						<DatePicker type="date" placement='top-end' placeholder="选择日期" style="width: 200px"
									@on-change="timelineChange" :value="merchantDate.idcardvaliddate"
									:readonly="read"></DatePicker>
					</FormItem>
				</div>
				<Button type="info" class="submit" @click="submitInfo" v-if="!read">保存</Button>
			</Form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs';

	export default {
		name: "Bemerchant",
		data() {
			//验证规则
			const nameRules = (rule, value, callback) => {
				if (this.merchantDate.company == '') {
					callback(new Error('请填写公司名称'));
				} else {
					callback();
				}
			};
			const typeRules = (rule, value, callback) => {
				if (this.merchantDate.companyType == '') {
					callback(new Error('请选择公司类型'));
				} else {
					callback();
				}
			};
			const numberRules = (rule, value, callback) => {
				if (this.merchantDate.supplierLiceNo == '') {
					callback(new Error('请填写营业执照号码'));
				} else {
					callback();
				}
			};
			const areaRules = (rule, value, callback) => {
				if (this.merchantShow.county == '') {
					callback(new Error('请填写发货所在区'));
				}
				let s = this.merchantShow.county;
				if (s != null || s != undefined) {
					let count = (s.split(',')).length - 1;
					if (count < 3) {
						callback(new Error('请填写到县区'));
					} else {
						callback();
					}
				}
			};
			const siteRules = (rule, value, callback) => {
				if (this.merchantDate.address == '') {
					callback(new Error('请填写详细地址'));
				} else {
					callback();
				}
			};
			const presentRules = (rule, value, callback) => {
				if (this.merchantDate.legal == '') {
					callback(new Error('请填写法人代表'));
				} else {
					callback();
				}
			};
			const regMoneyRules = (rule, value, callback) => {
				if (this.merchantDate.regMoney == '') {
					callback(new Error('请填写注册资金'));
				} else {
					callback();
				}
			};
			const dateRules = (rule, value, callback) => {
				if (this.merchantDate.estdate == '') {
					callback(new Error('请填写成立日期'));
				} else {
					callback();
				}
			};
			const businessRules = (rule, value, callback) => {
				if (this.merchantShow.mainBusiness == '') {
					callback(new Error('请填写主营业务'));
				} else {
					callback();
				}
			};
			const supplierliceRules = (rule, value, callback) => {
				if (this.merchantDate.supplierliceurl == '') {
					callback(new Error('请上传营业执照图片'));
				} else {
					callback();
				}
			};
			const IMGRules01 = (rule, value, callback) => {
				if (this.merchantDate.idcardhandpic == '') {
					callback(new Error('请上传手持身份证照片'));
				} else {
					callback();
				}
			};
			const IMGRules02 = (rule, value, callback) => {
				if (this.merchantDate.idcardpic == '') {
					callback(new Error('请上传身份证正面'));
				} else {
					callback();
				}
			};
			const IMGRules03 = (rule, value, callback) => {
				if (this.merchantDate.idcardbackpic == '') {
					callback(new Error('请上传身份证反面'));
				} else {
					callback();
				}
			};
			const timelineRules = (rule, value, callback) => {
				if (this.merchantDate.idcardvaliddate == '') {
					callback(new Error('请填写身份证到期时间'));
				} else {
					callback();
				}
			};
			return {
				uploadAction: this.host + '/upload/uploadFile',
				cityCover: false,
				businessCover: false,
				isCheck: '',
				read: false,
				merchantShow: {
					county: '',
					mainBusiness: '',
					supplierliceurl: require('@/assets/img/supplierlice.png'),
					idcardhandpic: require('@/assets/img/idcardhandpic.png'),
					idcardpic: require('@/assets/img/idcardpic.png'),
					idcardbackpic: require('@/assets/img/idcardbackpic.png'),
				},
				merchantDate: {
					company: '',
					companyType: '',
					supplierLiceNo: '',
					county: '',
					address: '',
					legal: '',
					regMoney: '',
					estdate: '',
					mainBusiness: '',
					companyWeb: '',
					supplierliceurl: '',
					idcardhandpic: '',
					idcardpic: '',
					idcardbackpic: '',
					idcardvaliddate: '',
					isCheck: '',
				},
				//验证规则转换
				merchantRules: {
					nameRule: [{validator: nameRules, trigger: 'blur'}],
					typeRule: [{validator: typeRules, trigger: 'blur'}],
					numberRule: [{validator: numberRules, trigger: 'blur'}],
					areaRule: [{validator: areaRules, trigger: 'change blur'}],
					siteRule: [{validator: siteRules, trigger: 'blur'}],
					presentRule: [{validator: presentRules, trigger: 'blur'}],
					regMoneyRule: [{validator: regMoneyRules, trigger: 'blur'}],
					dateRule: [{validator: dateRules, trigger: 'change'}],
					businessRule: [{validator: businessRules, trigger: 'change blur'}],
					supplierliceRule: [{validator: supplierliceRules, trigger: 'change'}],
					IMGRule01: [{validator: IMGRules01, trigger: 'change'}],
					IMGRule02: [{validator: IMGRules02, trigger: 'change'}],
					IMGRule03: [{validator: IMGRules03, trigger: 'change'}],
					timelineRule: [{validator: timelineRules, trigger: 'blur'}],
				},
				cityData: [],
				businessData: [],
			}
		},
		methods: {
			//是否可写
			isWrite: function () {
				let isCheck = this.isCheck;
				if (isCheck == '0') {
					this.read = true;
				} else if (isCheck == '1') {
					this.read = true;
				} else if (isCheck == '2') {
					this.read = false;
				} else {
					this.read = false;
				}
			},
			//图片地址提取
			strSub: function (data) {
				if (data != null || data != undefined) {
					let index = data.indexOf('/');
					let realdata = data.substring(index);
					return realdata
				} else {
					return null;
				}
			},
			//回显
			defaultSucc: function (response) {
				let res = JSON.parse(response.request.response);
				if (res.code == '200') {
					let data = res.data;
					this.isCheck = data.isCheck;
					//图片地址
					let supplierliceurl = this.strSub(data.supplierliceurl);
					let idcardhandpic = this.strSub(data.idcardhandpic);
					let idcardpic = this.strSub(data.idcardpic);
					let idcardbackpic = this.strSub(data.idcardbackpic);
					if (data.id != null) {
						this.merchantDate = {
							company: data.company,
							companyType: data.companyType,
							supplierLiceNo: data.supplierLiceNo,
							county: data.county,
							address: data.address,
							legal: data.legal,
							regMoney: data.regMoney,
							estdate: data.estdate,
							mainBusiness: data.mainBusiness,
							companyWeb: data.companyWeb,
							supplierliceurl: supplierliceurl,
							idcardhandpic: idcardhandpic,
							idcardpic: idcardpic,
							idcardbackpic: idcardbackpic,
							idcardvaliddate: data.idcardvaliddate,
							isCheck: data.isCheck
						};
						this.merchantShow = {
							county: data.area.names + ',',
							mainBusiness: data.mainBusinessNames,
							supplierliceurl:  data.supplierliceurl,
							idcardhandpic:data.idcardhandpic,
							idcardpic: data.idcardpic,
							idcardbackpic: data.idcardbackpic,
						};
					}
					this.isWrite()
				}
			},
			//城市数据获取
			areaTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.cityData = res.data
			},
			cityLoading: function (item, callback) {
				let id = item.id;
				axios.post('/saler/AreaTree', qs.stringify({parent_id: id})).then(
					response => {
						let res = JSON.parse(response.request.response);
						const data = res.data;
						callback(data);
					}
				);
			},
			//地区选取弹窗展开
			cityBtn: function () {
				if (this.read === false) {
					this.cityCover = true
				}
			},
			//主营业务弹窗展开
			businessBtn: function () {
				if (this.read === false) {
					this.businessCover = true
				}
			},
			//城市选中
			citySelected: function (res) {
				//======================================
				//扩展remove方法
				Array.prototype.remove = function (val) {
					let index = this.indexOf(val);
					if (index > -1) {
						this.splice(index, 1);
					}
				};
				//======================================
				//获取整条数据链
				function getParent(array, childs, ids) {
					for (let i = 0; i < array.length; i++) {
						let item = array[i];
						if (Number(item.id) === Number(ids)) {
							childs.push(item);
							return childs;
						}
						if (item.children && item.children.length > 0) {
							childs.push(item);
							let rs = getParent(item.children, childs, ids);
							if (rs) {
								return rs;
							}
							else {
								childs.remove(item);
							}
						}
					}
					return false;
				}

				//获取所有选中节点
				let params = this.$refs.citySelected.getSelectedNodes();
				//所有数据
				let allData = this.cityData;
				//循环执行所有选中的节点链，放到arr1数组里
				let arr1 = [];
				for (let i = 0; i < params.length; i++) {
					//单条数据链
					let aData = getParent(allData, [], params[i].id);//方法入口在这里
					for (let y = 0; y < aData.length; y++) {
						//拆分成单个json数组放到arr1里
						arr1.push(aData[y]);
					}
				}

				//arr1去重 es6的set方法
				function dedupe(array) {
					return Array.from(new Set(array));
				}

				arr1 = dedupe(arr1);

				// 初始化数据，并输出;
				this.merchantShow.county = '';
				for (let i = 0; i < arr1.length; i++) {
					this.merchantShow.county += arr1[i].title + ','
				}
				this.merchantDate.county = '';
				if (params != null && params.length > 0) {
					this.merchantDate.county = params[0].id;
				}
			},
			//主营业务数据获取
			businessTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.businessData = res.data
			},
			//成立日期
			dataChange: function (res) {
				this.merchantDate.estdate = res;
			},
			//主营业务数据选中
			businessCheck: function (res) {
				this.merchantDate.mainBusiness = '';
				this.merchantShow.mainBusiness = '';
				if (res.length > 0) {
					for (let i = 0; i < res.length; i++) {
						this.merchantDate.mainBusiness += res[i].id + ',';
						this.merchantShow.mainBusiness += res[i].title + ',';
					}
				}
			},
			//上传图片
			supplierliceurlSuccess: function (res) {
				this.merchantDate.supplierliceurl = res.data
				this.merchantShow.supplierliceurl =  res.data
			},
			uploadSuccess01: function (res) {
				this.merchantDate.idcardhandpic =  res.data
				this.merchantShow.idcardhandpic = res.data
			},
			uploadSuccess02: function (res) {
				this.merchantDate.idcardpic = res.data
				this.merchantShow.idcardpic =  res.data
			},
			uploadSuccess03: function (res) {
				this.merchantDate.idcardbackpic =  res.data
				this.merchantShow.idcardbackpic =  res.data
			},
			//timeline日期获取
			timelineChange: function (res) {
				this.merchantDate.idcardvaliddate = res;
			},
			//数据提交
			submitInfo: function () {
				this.$refs.merchantDate.validate((valid) => {
					if (valid) {
						if (this.isCheck == '2') {
							axios.put('/saler/salerReg', qs.stringify(this.merchantDate), {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(response => {
									let res = JSON.parse(response.request.response);
									if (res.code == 200) {
										this.$Message.success('提交成功，等待审核。。。');
										this.isCheck = 0;
										this.isWrite();
										document.body.scrollTop = document.documentElement.scrollTop = 0;
									}
								}
							);
						} else {
							axios.post('/saler/salerReg', qs.stringify(this.merchantDate)).then(response => {
									let res = JSON.parse(response.request.response);
									if (res.code == 200) {
										this.$Message.success('提交成功，等待审核。。。');
										this.isCheck = 0;
										this.isWrite();
										document.body.scrollTop = document.documentElement.scrollTop = 0;
									}
								}
							);
						}
					} else {
						this.$Message.error('请完整填写表格!');
					}
				});
			},
		},
		mounted() {
			axios.post('/saler/AreaTree').then(this.areaTreeSucc);
			axios.post('/saler/goodsTypeTree',qs.stringify({type:0})).then(this.businessTreeSucc);
			axios.get('/saler/salerReg').then(this.defaultSucc)
		}
	}
</script>

<style scoped>
	.Bemachant_header {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #d8d8d8;
		font-size: 16px;
		line-height: 45px;
		text-indent: 25px
	}

	.Bemachant_content {
		position: relative;
		top: 0;
		left: 0;
		padding: 20px 0 50px 0;
	}

	em {
		text-decoration: none;
		font-style: normal;
		margin: 0;
		padding: 0;
		vertical-align: top;
	}

	.Public1 {
		height: 48px;
		margin-bottom: 20px;
	}

	.Public1 em:first-child, .contentPhoto em:first-child, .ID em:first-child {
		display: inline-block;
		margin: 5px 0 0 52px;
		font-size: 16px;
	}

	.Public1 em:last-child {
		display: inline-block;
		margin-top: 5px;
		font-size: 16px;
	}

	.Public2 {
		vertical-align: top;
		margin-left: 40px;
	}

	.numberInput {
		margin-left: 9px;
	}

	.ID {
		margin-bottom: 20px;
	}

	.ID1IMG {
		width: 240px;
		height: auto;
	}
	.picimg{
		width: 240px;
		height: auto;
	}

	.upIMG {
		width: 240px;
		height: 151px;
	}

	.ID1Editor, .ID2Editor, .ID3Editor {
		display: inline-block;
	}

	.ID2IMG, .ID3IMG {
		width: 200px;
		margin-left: 71px;
	}

	.ID2Editor, .ID3Editor {
		vertical-align: top;
		margin-left: 40px;
	}

	.supplierliceurl {
		vertical-align: top;
		margin-left: 55px;
	}

	.submit {
		margin: 68px 0 0 154px;
		font-size: 18px;
		height: 50px;
		width: 220px;
		text-align: center;
	}

	.alertMsg {
		width: 80%;
		margin: 20px 0 20px 50px;
	}
</style>
