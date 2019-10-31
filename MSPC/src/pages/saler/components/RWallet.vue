<template>
	<div class="rWallet">
		<div class="walletHead">
			<p>{{itemHead}}</p>
		</div>
		<div class="walletContent">
			<div class="content1">
				<div class="content1L">
					<div class="content1l01">
						<p class="content1Lp1">可提现金额</p>
						<p class="content1Lp2" v-if="mon =='' || mon ==null || mon == undefined ">0.00元</p>
						<p class="content1Lp2" v-else>{{mon}}元</p>
					</div>
					<div class="content1l02">
						<p class="content1Lp1">在途金额</p>
						<p class="content1Lp2" v-if="lockmoney =='' || lockmoney ==null || lockmoney == undefined ">0.00元</p>
						<p class="content1Lp2" v-else>{{lockmoney}}元</p>
					</div>
				</div>
				<div class="content1R">
					<p><em>我的钱包</em>保障资金账户安全</p>
					<Button type="error" class="withdrawBtn" @click="ChangeItem">{{itemName}}</Button>
					<i>快速提现，解决资金问题</i>
				</div>
			</div>
			<div v-if="showItem">
				<div class="content2" >
					<p class="infoTxt">全部提现详情</p>
					<Table :columns="columns" :data="data" stripe></Table>
				</div>
				<Page :total="pageTotal" class="Pages" :page-size="pageSize" @on-change="pageChange"
					  :current="page"/>
			</div>
			<div v-else>
				<div class="cardInput">
					<div class="cardInputL">提现至银行卡:</div>
					<div class="cardInputR input01">
						<Input v-model="bank" placeholder="请输入银行卡号" style="width: 230px" @on-blur="cardCheck"/> &nbsp;
						<img :src="bankloge" style="vertical-align: middle;">
					</div>
				</div>
				<div class="cardInput">
					<div class="cardInputL">持卡人姓名:</div>
					<div class="cardInputR input02">
						<Input v-model="name" style="width: 180px" placeholder="银行卡所属人姓名"/> &nbsp;
						<span style="color:#999">请输入真实姓名,否则可能会导致无法提现</span>
					</div>
				</div>
				<div class="cardInput moneyForm">
					<div class="cardInputL">提现金额:</div>
					<Form class="cardInputR input03" ref="moneyValidate"  :rules="moneyValidate">
						<FormItem prop="money" inline>
							<Input v-model="money" style="width: 180px" class="MoneyInput" placeholder="提现金额"/>元
							<Button type="primary" @click="allMoney" class="MoneyBtn">全部</Button> &nbsp; &nbsp;
							<span style="color:#ff0000">提现手续费 0.8%</span>
						</FormItem>
					</Form>
					<!--<div class="cardInputR input03">-->
						<!--<Input v-model="money" style="width: 180px" class="MoneyInput" placeholder="提现金额"/>元-->
						<!--<Button type="primary" @click="allMoney" class="MoneyBtn">全部</Button> &nbsp; &nbsp;-->
						<!--<span style="color:#ff0000">提现手续费 0.8%</span>-->
					<!--</div>-->
				</div>
				<div class="cardInput">
					<div class="cardInputL">手机号码:</div>
					<div class="cardInputR input03">
						<Input :value="phone" style="width: 180px" class="MoneyInput" readonly placeholder="手机号码不可修改"/>
						<span style="color:#ff0000">手机号码不可修改</span>
					</div>
				</div>
				<div class="cardInput">
					<div class="cardInputL">验证码:</div>
					<div class="cardInputR input04">
						<Input v-model="code" style="width: 180px" @on-blur="codeCheck" placeholder="验证码"/> &nbsp;
						<Button type="primary" @click="getCode" :disabled="codeDisabled">{{codename}}</Button>
					</div>
				</div>
				<div class="cardInput">
					<div class="cardInputL">提现备注:</div>
					<div class="cardInputR input03">
						<Input v-model="remark" style="width: 180px" class="MoneyInput" placeholder="提现备注(可选填)"/>
					</div>
				</div>
				<div class="cardInput">
					<Button type="error" @click="submit" class="submitBtn"  :disabled="registerButton">确认提现</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';
	export default {
		name: "RWallet",
		data() {
			//验证规则
			const moneyRules = (rules, value, callback) => {
				if (parseFloat(this.money) > parseFloat(this.mon)) {
					callback(new Error('提现金额应小于等于总金额'));
				} else {
					callback();
				}
			};
			return {
				showItem:true,
				itemName:'提现',
				itemHead:'我的钱包',
				pageTotal: 0,
				pageSize: 0,
				page:1,
				mon: '',
				lockmoney:'',
				bank: '',
				name: '',
				money: '',
				cardname: '',
				bankloge: "",
				code: '',
				phone: '',
				remark:'',
				messagesToken: '',
				codeDisabled: false,
				registerButton: true,
				codename: '验证码',
				columns: [{
					title: '提现时间',
					key: 'formatcreatetime',
					align: 'center'
				}, {
					title: '提现金额',
					key: 'money',
					align: 'center'
				}, {
					title: '交易方式',
					key: 'paytype',
					align: 'center',
					render: (h,params)=>{
						let payType;
						let status = params.row.paytype;
						if (status == '0') {
							payType = '平台'
						} else if (status == '1') {
							payType = '支付宝'
						} else if (status == '2') {
							payType = '微信'
						}else if (status == '3') {
							payType = '银联'
						}
						return h('span', {}, payType);
					}
				}, {
					title: '审核状态',
					key: 'isagree',
					align: 'center',
					render: (h,params)=>{
						let payType;
						let status = params.row.isagree;
						if (status == '0') {
							payType = '待审核'
						} else if (status == '1') {
							payType = '审核通过'
						} else if (status == '2') {
							payType = '审核未通过'
						}
						return h('span', {}, payType);
					}
				}, {
					title: '备注',
					key: 'remark',
					align: 'center',
					width:200
				}],
				data: [],
				//规则验证
				moneyValidate:{
					money:[{validator: moneyRules, trigger: 'change blur'}],
				}
			}
		},
		methods: {
			//提现赋值
			allMoney() {
				this.money = this.mon
			},
			//银行验证
			cardCheck() {
				if (this.bank.length == '16' || this.bank.length == '19' && this.bank.length != 0) {
					this.$http.post('/bank/bankName?cardNo=' + this.bank).then(res => {
						let resp = JSON.parse(res.request.response)
						if (resp.code == 200) {
							this.bankName = resp.data.bankName
							this.bankloge = resp.data.bankLogo
						}
					})
				}
				else {
					this.$Message.error('请输入正确的银行卡号')
				}
			},
			//验证码验证
			codeCheck() {
				if (this.code != '') {
					this.$http.post('/user/validateCodeIsTrue?code=' + this.code + '&validateCodeToken=' + this.messagesToken).then(res => {
						let response = JSON.parse(res.request.responseText)
						if (response.code == 200) {
							this.registerButton = false
						} else {
							this.$Message.error('验证码输入错误')
						}
					})
				}
			},
			//倒计时
			getCode() {
				let timer = 60;
				this.codeDisabled = true;
				this.phoneCode();
				let interval = setInterval(() => {
					timer = timer - 1;
					this.codename = `${timer}秒重试`;
					if (timer == 0) {
						clearInterval(interval);
						this.codeDisabled = false;
						this.codename = '立即发送'
					}
				}, 1000)
			},
			//获取短信验证码
			phoneCode() {
				this.messagesToken = '';
				this.$http.get('/security/sms?phoneNum=' + this.phone).then(res => {
					if (res.status == 200) {
						this.$Message.success({title: `发送短信成功`, duration: 2});
						this.messagesToken = res.headers.validatecodetoken
					} else {
						this.$Message.error({title: `发送短信失败`, duration: 2})
					}
				})
			},
			//数据提交
			submit() {
				if (this.bank.length == '16' || this.bank.length == '19') {
					if (this.name != '') {
						if (this.money != '') {
							if (this.paypas != '') {
								let _data = {
									phone: this.phone,
									payCod: this.bank,
									cradName: this.name,
									money: this.money,
									remark:this.remark,
									rate: '0.008'
								}
								this.$http.post('/store/wallet/tx', qs.stringify(_data)).then(response => {
									let res = JSON.parse(response.request.response);
									// console.log(res)
									if (res.code == 200) {
										this.$Message.success('提交申请成功，等待审核中..')
										this.showItem = true;
										this.itemName = '提现';
										this.itemHead = '我的钱包';
										this.getInfo()
									}
								})
							} else {
								this.$Message.error('请输入支付密码')
							}
						} else {
							this.$Message.error('请输入提现金额')
						}
					} else {
						this.$Message.error('请输入提现人姓名')
					}
				}
				else {
					this.$Message.error('请输入正确的银行卡号')
				}
			},
			//更换页面
			ChangeItem:function () {
				if(this.showItem){
					if(parseFloat(this.mon) >= 10){
						this.showItem = false;
						this.itemName = '提现详情';
						this.itemHead = '我的钱包 - 提现'
					}else {
						this.$Message.error({
								content: '可提现金额必须大于10元才可以提现！',
								duration: 3
							})
					}
				}else {
					this.showItem = true;
					this.itemName = '提现';
					this.itemHead = '我的钱包'
				}
			},
			//页码变化
			pageChange: function (currentpage) {
				this.page = currentpage;
				this.$http.get('/store/wallet/info', params({page:this.page})).then(
					response => {
						let res = JSON.parse(response.request.response);
						// console.log(res)
						if (res.code == '200') {
							this.data = res.data.memLogMoneyList.list
						}
					}
				);
			},
			//初始获取
			getInfo:function () {
				this.$http.get('/store/wallet/info').then(response => {
					let res = JSON.parse(response.request.response);
					// console.log(res)
					if (res.code == 200) {
						this.mon = res.data.moeny;
						this.lockmoney = res.data.lockmoney;
						this.phone = res.data.phone;
						this.data = res.data.memLogMoneyList.list;
						this.pageTotal = res.data.memLogMoneyList.total;
						this.pageSize = res.data.memLogMoneyList.pageSize;
					}
				})
			}
		},
		created() {
			this.getInfo()
		}
	}
</script>

<style scoped>
	.walletHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.walletHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.walletContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 30px 0 60px 0;
	}

	.content1 {
		overflow: hidden;
		width: 100%;
		height: 220px;
	}

	.content1L {
		float: left;
		top: 0;
		left: 0;
		width: 55%;
		height: 180px;
		text-align: center;
	}

	.content1Lp1 {
		margin-top: 50px;
		font-size: 25px;
		color: #000;
	}

	.content1Lp2 {
		font-size: 40px;
		color: #ff0000;
	}
	.content1l01{
		width: 49%;
		height: 180px;
		text-align: center;
		display: inline-block;
	}
	.content1l02{
		width: 49%;
		height: 180px;
		text-align: center;
		display: inline-block;
	}

	.content1R {
		float: right;
		top: 0;
		right: 0;
		width: 45%;
		height: 180px;
		text-align: center;
	}

	em, i {
		font-style: normal;
		text-decoration: none;
	}

	.content1R p {
		margin-top: 50px;
		font-size: 14px;
		color: #000;
	}

	.content1R p > em {
		color: #199ed8;
		font-size: 15px;
	}

	.content1R i {
		font-size: 14px;
		display: block;
		color: #ff0000;
	}

	.withdrawBtn {
		width: 45%;
		margin: 10px;
		font-size: 18px;
	}

	.infoTxt {
		font-size: 16px;
		color: #ff0000;
		margin-left: 10px;
		margin-bottom: 5px;
	}
	.content2{
		width: 96%;
		margin: 0 auto;
	}
	.Pages {
		margin: 20px auto 0;
		text-align: center;
	}
	.walletHead{
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}
	.walletHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}
	.withdraw{
		overflow: hidden;
	}
	.withdrawH {
		width: 50%;
		text-align: center;
		margin-bottom: 30px;
	}

	.withdrawH p:first-child {
		margin-top: 10px;
		font-size: 25px;
		color: #000;
	}

	.withdrawH p:last-child {
		font-size: 40px;
		color: #ff0000;
	}
	.cardInput{
		margin-left: 100px;
		font-size: 14px;
		margin-bottom: 30px;
	}
	.cardInputL{
		display: inline-block;
	}
	.cardInputR{
		display: inline-block;
	}
	.input01{
		margin-left: 30px;
	}
	.input02{
		margin-left: 44px;
	}
	.input03{
		margin-left: 57px;
	}
	.input04{
		margin-left: 70px;
	}
	.MoneyInput{
		margin-right: 5px;
	}
	.MoneyBtn{
		margin-left: 5px;
	}
	.submitBtn{
		margin-left: 125px;
	}
	.moneyForm{
		margin-bottom: 10px;
	}
</style>
