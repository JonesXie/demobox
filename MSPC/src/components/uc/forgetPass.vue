<template>
	<div class="gorfet">
		<div class="formain">
			<Form ref="formCustom" :model="formCustom" :label-width="80">
				<FormItem label="手机号">
					<Input type="text" v-model="formCustom.phone"></Input>
				</FormItem>
				<FormItem label="验证码">
					<Row>
						<Col span="15"><Input type="text" v-model="formCustom.code" @on-blur="codeCheck"></Input></Col>
						<Col span="8" offset="1">
							<Button type="primary" style="width:100%" size="small" @click="getcode"
									:disabled="codeDisabled">{{name}}
							</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="新密码">
					<Input type="password" v-model="formCustom.passwd"></Input>
				</FormItem>
				<FormItem label="确认密码">
					<Input type="password" v-model="formCustom.passwdCheck" number></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit()" style="width:200px" :disabled="registerButton">修改
					</Button>
				</FormItem>
			</Form>

		</div>
	</div>
</template>
<style
<style scoped>
	.gorfet {
		width: 100%;
		height: 500px;
		overflow: hidden;
		overflow: hidden;
	}

	.formain {
		width: 350px;
		height: 300px;
		margin: 100px auto;
	}
</style>
<script>
	export default {
		data() {
			return {
                name: '验证码',
                confirmtoken:"",
				registerButton: true,
				messagesToken: '',
				codeDisabled: false,
				formCustom: {
					phone: '',
					code: '',
					passwd: '',
					passwdCheck: '',
					age: ''
				}
			}
		},
		methods: {
			getcode() {
				if ((/^1[3456789]\d{9}$/.test(this.formCustom.phone))) {
					let timer = 60;
					if ((/^1[3456789]\d{9}$/.test(this.formCustom.phone))) {
						this.$http.get('/user/phone?phone=' + this.formCustom.phone).then(res => {
							let response = JSON.parse(res.request.response)
							if (response.code == 400) {
								this.codeDisabled = true
								this.phoneCode();
								let interval = setInterval(() => {
									timer = timer - 1
									this.name = `${timer}秒重试`
									if (timer == 0) {
										clearInterval(interval)
										this.codeDisabled = false;
										this.name = '立即发送'
									}
								}, 1000)
							} else if (response.code == 200) {
								this.$Notice.error({title: `该号码没有注册过`, duration: 2})
								this.codeDisabled = false
							}
						})
					} else {
						this.$Message.error('输入正确的号码')
					}
				}
			},
			hasPhone() {
				if ((/^1[3456789]\d{9}$/.test(this.formCustom.phone))) {
					this.$http.get('/user/phone?phone=' + this.formCustom.phone).then(res => {
						let response = JSON.parse(res.request.response)
						
						if (response.code == 400) {
							this.codeDisabled = true

						} else if (response.code == 200) {
							this.$Notice.error({title: `该号码没有注册过`, duration: 2})
							this.codeDisabled = false
						}
					})
				} else {
					this.$Message.error('输入正确的号码')
				}
			},
			codeCheck() {
				if (this.formCustom.code != '') {
					this.$http.post('/user/validateCodeIsTrue?code=' + this.formCustom.code + '&validateCodeToken=' + this.messagesToken).then(res => {
						let response = JSON.parse(res.request.responseText)
						if (response.code == 200) {
                            this.registerButton = false
                            this.confirmtoken=res.headers.confirmtoken
						}
						else {
							this.$Message.error('验证码输入错误')
							this.registerButton = true
						}
					})
				}
			},
			phoneCode() {
				this.messagesToken = '';
				this.$http.get('/security/sms?phoneNum=' + this.formCustom.phone).then(res => {
					if (res.status == 200) {
						this.$Notice.success({title: `发送短信成功`, duration: 2});
						this.messagesToken = res.headers.validatecodetoken
					} else {
						this.$Notice.error({title: `发送短信失败`, duration: 2})
					}
				})
			},
			handleSubmit() {
				if (this.formCustom.phone == '') {
					this.$Message.error('请输入手机号码')
				} else if (this.formCustom.code == '') {
					this.$Message.error('请输入验证码')
				} else if (this.formCustom.passwd == '') {
					this.$Message.error('请输入密码')
				} else if (this.formCustom.passwdCheck == '') {
					this.$Message.error('请确认密码')
				} else if (this.formCustom.passwdCheck != this.formCustom.passwd) {
					this.$Message.error('两次密码不一致')
				} else {
					this.$http.post('/user/modifyPassword?password=' + this.formCustom.passwdCheck + '&phone=' + this.formCustom.phone).then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 200) {
                            this.$Message.success('修改成功')
                            setInterval(()=>{
                                this.$router.push('login')
                            },300)
						} else {
							this.$Message.error('修改失败')
						}
					})
				}
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		}
	}
</script>


