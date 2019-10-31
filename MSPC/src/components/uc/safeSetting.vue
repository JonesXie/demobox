<template>
	<div class="uersinfo">
		<div class="uersinfo_header">
			<strong>安全设置</strong>
		</div>
		<div class="uersinfo_fase">
			<div class="safe_line" style="margin-bottom:60px">
				<div class="uersinfo_fase_left" style="line-height:60px">
					安全等级
				</div>
				<div class="uersinfo_fase_mid">
					<Progress :percent="percent" :stroke-width="30" style="margin-top:10px"/>
				</div>
			</div>
			<div class="safe_line">
				<div class="uersinfo_fase_left">
					登录密码
				</div>
				<div class="uersinfo_fase_mid">
					安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。
				</div>
				<div class="uersinfo_fase_right">
					<Button type="default" @click="showBox(1)">修改</Button>
				</div>
			</div>
			<div class="hidebox" v-if="hideBoxNum==1">
				<div class="hidebox_main">
					<Form :label-width="80" style="margin-top:20px">
						<FormItem label="手机号 :">
							{{infodata.phone}}
							<Button type="primary" :disabled="dis.disabled1" @click="getCode()">{{cod.name1}}</Button>
						</FormItem>
						<FormItem label="验证码:">
							<Input type="text"  v-model="code"  @on-blur="codeCheck" style="width:200px"></Input>
						</FormItem>
						<FormItem label="新密码">
							<Input type="password"  v-model="pass" @on-focus="minlenghs" style="width:200px"></Input>
						</FormItem>
						<FormItem label="重复密码" >
							<Input type="password"  v-model="passCheck" style="width:200px"></Input>
						</FormItem>
						<FormItem>
							<Button type="primary" style="width:100px" @click="submit(1)" :disabled="sumdisa">保存</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                code:'',
                passCheck:'',
                pass:'',
                messagesToken: '',
                sumdisa:true,
				infodata: {},
				cod: {
					name1: '验证码',
				},
				dis: {
					disabled1: false,	
				},
				headImg: require('@/assets/img/headimg.png'),
				uploadAction: 'url',
				percent: 50,
				hideBoxNum: 0
			}
		},
		computed: {
			'isLogin': function () {
			 if(sessionStorage.username=='null'||sessionStorage.username==null){           
                    return  false 
                }else{
                    return  true
                }	
			}
		},
		methods: {
			getInfo() {
				this.$http.get('/user/memInfoBack?loginname=' + JSON.parse(sessionStorage.MEMBER).loginname).then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
						this.infodata = resp.data
					}
				})
            },
            minlenghs(){
                if(this.pass.length<6&&this.pass.length!=0){
                    this.$Message.error('出于安全考虑,密码长度不得小于六位')
                }
            },
			getCode() {		
				let timer = 60;
                this.phoneCode();
                this.dis.disabled1=true
				let interval = setInterval(() => {
                    timer = timer - 1;
                    this.cod.name1=`${timer}秒后获取`
					if (timer == 0) {				
							clearInterval(interval)
							this.dis.disabled1 = false;
							this.cod.name1 = '立即发送'		
				              	}
			  	}, 1000)
			},
			phoneCode() {
				this.messagesToken = '';
				this.$http.get('/security/sms?phoneNum=' + this.infodata.phone).then(res => {
					if (res.status == 200) {
						this.$Notice.success({title: `发送短信成功`, duration: 2});
						this.messagesToken = res.headers.validatecodetoken
					} else {
						this.$Notice.error({title: `发送短信失败`, duration: 2})
					}
				})
            },
        	codeCheck() {
				if (this.code!= '') {
					this.$http.post('/user/validateCodeIsTrue?code=' + this.code + '&validateCodeToken=' + this.messagesToken).then(res => {
						let response = JSON.parse(res.request.responseText)
						if (response.code == 200) {
							this.sumdisa = false
						}
						else {
							this.$Message.error('验证码输入错误')
							this.sumdisa = true
						}
					})
				}
			},
			submit() {
           if(this.code==''){
               this.$Message.error('请填写验证码')      
           } else if(this.passCheck!=this.pass&&this.passCheck!=''&&this.pass!=''){
                   this.$Message.error('密码不一致')      
           } else if(this.passCheck.length<=6){
               this.$Message.error('出于安全考虑,密码长度不得小于六位')
           }
           else{
                 this.$http.post('/user/modifyPasswordByPhone?password=' + this.passCheck + '&phone=' + this.infodata.phone).then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 200) {
                            this.$Message.success('修改成功')
                            this.$router.push('/buyCenter/userinfomation')
						} else {
							this.$Message.error('修改失败')
						}
				})
           }
			},
			showBox(e) {
				if (e == this.hideBoxNum) {
					this.hideBoxNum = 0
				} else {
					this.hideBoxNum = e;
				}
			}
		},
		created() {
			if (this.isLogin) {
				this.getInfo()
			}
			else {
				this.$Message.error('请登录')
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
	.uersinfo {
		width: 100%;
		height: auto;
	}

	.uersinfo_header {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #d8d8d8;
		font-size: 16px;
		line-height: 45px;
		text-indent: 25px
	}

	.uersinfo_fase {
		width: 780px;
		overflow: hidden;
		margin: 25px auto;
		font-size: 14px
	}

	.uersinfo_fase_left {
		width: 100px;
		height: 50px;
		float: left;
		font-size: 15px
	}

	.uersinfo_fase_mid {
		width: 540px;
		height: 60px;
		float: left;;
		margin-left: 20px;
		line-height: 24px;
	}

	.safe_line {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 10px
	}

	.uersinfo_fase_right {
		width: 100px;
		height: 60px;
		float: left;
		margin-left: 20px
	}

	.hidebox {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20px;
		border: 1px solid #ccc;
		border-radius: 3px;;
		box-shadow: 0px 0px 2px #999 inset;
	}

	.hidebox_main {
		width: 400px;
		margin: 10px auto;
	}
</style>

