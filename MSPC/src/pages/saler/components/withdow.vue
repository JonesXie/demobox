<template>
	<div>
		<div class="walletHead">
			<p>我的钱包 - 提现</p>
		</div>
		<div class="withdraw">
			<div class="withdrawH">
				<p>全部金额：</p>
				<p>{{mon}}元</p>
			</div>
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
					<Input v-model="name" style="width: 100px"/> &nbsp;
					<span style="color:#999">请输入真实姓名,否则可能会导致无法提现</span>
				</div>
			</div>
			<div class="cardInput">
				<div class="cardInputL">提现金额:</div>
				<div class="cardInputR input03">
					<Input v-model="money" style="width: 100px" class="MoneyInput"/>元
					<Button type="primary" @click="allMoney" class="MoneyBtn">全部</Button> &nbsp; &nbsp;
					<span style="color:#ff0000">提现手续费 0.8%</span>
				</div>
			</div>
			<div class="cardInput">
				<div class="cardInputL">验证码:</div>
				<div class="cardInputR input04">
					<Input v-model="code" style="width: 100px" @on-blur="codeCheck"/> &nbsp;
					<Button type="primary" @click="getCode" :disabled="codeDisabled">{{codename}}</Button>
				</div>
			</div>
			<div class="cardInput">
				<Button type="error" @click="submit" class="submitBtn"  :disabled="registerButton">确认提现</Button>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'

	export default {
		data() {
			return {
				mon: '',
				bank: '',
				name: '',
				money: '',
				cardname: '',
				bankloge: "",
				code: '',
				phone: '',
				messagesToken: '',
				codeDisabled: false,
				registerButton: true,
				codename: '验证码'
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
							this.cardname = resp.data.bankName
							this.bankloge = resp.data.bankLogo
						}
					})
				}
				else {
					this.$Message.error('请输出正确的银行卡号')
				}
			},
			//验证码验证
			codeCheck() {
				if (this.code != '') {
					this.$http.post('/user/validateCodeIsTrue?code=' + this.code + '&validateCodeToken=' + this.messagesToken).then(res => {
						let response = JSON.parse(res.request.responseText)
						if (response.code == 200) {
							this.registerButton = false
						}
						else {
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
					timer = timer - 1
					this.codename = `${timer}秒重试`
					if (timer == 0) {
						clearInterval(interval)
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
						this.$Notice.success({title: `发送短信成功`, duration: 2});
						this.messagesToken = res.headers.validatecodetoken
					} else {
						this.$Notice.error({title: `发送短信失败`, duration: 2})
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
									cradName: this.cardname,
									money: this.money,
									remark: '',
									rate: '0.008'
								}
								this.$http.post('http://192.168.1.101:8088/store/wallet/tx', qs.stringify(_data)).then(res => {
									console.log(res)
									let response = JSON.parse(res.request.responseText)
									if (response.code == 200) {
										this.$Message.success('提现操作成功')
										// setInterval(()=>{
										//     this.$router.push('/salerInfo/RWallet')
										// },300)
									}
								})
							} else {
								this.$Message.error('请输出支付密码')
							}
						} else {
							this.$Message.error('请输出提现金额')
						}
					} else {
						this.$Message.error('请输出提现人姓名')
					}
				}
				else {
					this.$Message.error('请输出正确的银行卡号')
				}
			}
		},
		created() {
			this.$http.get('http://192.168.1.101:8088/store/wallet/info').then(response => {
				let res = JSON.parse(response.request.response);
				console.log(res)
				if (res.code == 200) {
					this.mon = res.data.moeny;
					this.phone = res.data.phone
				}
			})
		}
	}
</script>

<style scoped>
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
		margin-left: 50px;
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

</style>
