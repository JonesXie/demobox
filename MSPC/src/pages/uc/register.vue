<template>
    <div class="login">
        <div class="login_main">
            <h2>注册</h2>
            <Form ref="registerdata" :model="registerdata" :rules="ruleCustom" :label-width="80">
                 <FormItem label="用户类型:" class="margin_b_15">
                       <Select v-model="registerdata.occupation" style="width:220px">
                            <Option v-for="(index,val) in storeType" :value="index.dictValue" :key="val" style="    text-indent: 5px;">{{index.dictLabel}} </Option>
                        </Select>    
                </FormItem>
                <!-- <FormItem label="用户名:" prop="namerules" class="margin_b_25">
                    <Input type="text" v-model.trim="registerdata.name" placeholder="请输入用户名"></Input>
                </FormItem> -->
                	<FormItem label="所在地:" class="margin_b_25">
					<Input search style="width: 220px;"
                         v-model="registerdata.adress"
						    placeholder="请选择所在地" @on-focus="cityCover01"></Input>
				</FormItem>
                <FormItem label="手机号码:" prop="phonerules" class="margin_b_25">
                    <Input type="text" v-model.trim="registerdata.phone" placeholder="可用于登录" @on-blur="hasPhone"></Input>
                </FormItem>
                <FormItem label="密码:" prop="passwordrules" class="margin_b_25">
                    <Input type="password" v-model.trim="registerdata.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码:" prop="passwordRealrules" class="margin_b_25">
                    <Input type="password" v-model.trim="registerdata.passwordReal" placeholder="确认密码"></Input>
                </FormItem>
                <FormItem label="推荐码:"  class="margin_b_25">
                    <Input type="text" v-model.trim="registerdata.recommendation" placeholder="可输入推荐码"></Input>
                </FormItem>
                <Row class="login_code">
                    <Col span='16'>
                        <FormItem label="验证码:" prop="coderules" class="margin_b_25">
                            <Input v-model.trim="registerdata.code" placeholder="请输入验证码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="7" style="height:33px;margin-left:12px">
                        <Button type="primary" class="code_button" :disabled="codeDisabled" @click='getCode'>
                            {{registerdata.codename}}
                        </Button>
                    </Col>
                </Row>
                <div class="resigter_buton">
                    <Button type="primary" long @click.prevent="registerUser" :disabled="registerButton">立即注册</Button>
                </div>      
                <div class="login_check">                  
                     <Checkbox v-model="registerdata.remeber"> &nbsp;&nbsp;&nbsp;注册幕饰网账户并同意
                            <router-link to='/agreement' target="_blank" style="color:#199ed8">《用户协议》</router-link>
                     </Checkbox>                
                </div>
            </Form>
        </div>
        	<Modal
					v-model="cityCover"
					title="所在区"
					width="350"
					@on-ok="countyidSelected"
				>
					<Scroll height="400">
						<Tree :data="cityData" :load-data="cityLoading" ref="countyidSelected"></Tree>
					</Scroll>
				</Modal>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            const phonerulesPhone = (rule, value, callback) => {
                if (this.registerdata.phone == '') {
                    callback(new Error('请输入手机号'));
                } else if (!(/^1[3456789]\d{9}$/.test(this.registerdata.phone))) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            const phonerulesPass = (rule, value, callback) => {
                if (this.registerdata.password == '') {
                    callback(new Error('请输入密码'));
                } else if (this.registerdata.password.length <= 6) {
                    callback(new Error('请输入大于6位的密码'));
                } else {
                    callback();
                }
            };
            const phonerulesRealPass = (rule, value, callback) => {
                if (this.registerdata.passwordReal == '') {
                    callback(new Error('请输入确认的密码'));    
                } else if (this.registerdata.passwordReal != this.registerdata.password) {
                    callback(new Error('两次密码输入不一致'));
                } else {
                    callback();
                }
            };
            return {
                storeType:[],
                cityData: [],
                cityCover:false,
                infodata:{
                    province:'',
                    city:"",
                    county:''
                },
                phoneHasCheck:false,
                registerdata: {
                    recommendation:'',
                    phone: '',
                    password: '',
                    passwordReal: '',
                    adress:'',
                    code: '',
                    occupation:'1',
                    remeber: true,
                    codename: '立即发送'
                },
                messagesToken: '',
                codeDisabled: true,
                registerButton: true,
                ruleCustom: {
                    phonerules: [{
                        validator: phonerulesPhone,
                        trigger: 'blur'
                    }],
                    passwordrules: [{
                        validator: phonerulesPass,
                        trigger: 'blur'
                    }],
                    passwordRealrules: [{
                        validator: phonerulesRealPass,
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted(){
            this.getType()
        },
        watch: {
            'registerdata.code':function () {
              if(this.registerdata.code.length==6){
                  this.codeCheck()
              }
            } 
        },
        methods: {
            	//城市弹窗
			cityCover01() {
				this.$http.post('/saler/AreaTree').then(this.cityTreeSucc);
				this.cityCover = true;
            },
            	//城市列表获取
			cityTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.cityData = res.data;
            },
            //加载子城市
			cityLoading: function (item, callback, selected) {
                let id = item.id;
				this.$http.post('/saler/AreaTree', qs.stringify({parent_id: id, ids: selected})).then(
					response => {
						let res = JSON.parse(response.request.response);
                        const data = res.data;                  
                      if( res.data[0].level==2){
                           callback(data);
                      }else{
                          callback({});
                           
                      }					
					}
				);
            },
            //城市选中
			citySelected: function (params) {
				//扩展remove方法
				Array.prototype.remove = function (val) {
					let index = this.indexOf(val);
					if (index > -1) {
						this.splice(index, 1);
					}
				};
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
				// let params = this.$refs.countyidSelected.getSelectedNodes();
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
				return arr1;
            },
            	//店铺所在区选取
			countyidSelected: function () {
				let params = this.$refs.countyidSelected.getSelectedNodes();
				let arr1 = this.citySelected(params);
				// 初始化数据，并输出;
                this.mySite = '';
				if (arr1 != null && arr1.length == 2) {
                     this.infodata.province = arr1[0].id;
                       this.infodata.city = arr1[1].id;                    
                    this.CHadress=`${arr1[0].title}-${arr1[1].title}`
                    this.registerdata.adress=`${arr1[0].title}-${arr1[1].title}`	
					for (let i = 0; i < arr1.length; i++) {
						this.mySite += arr1[i].title + ','
					}
				}
			},
            // 获取短信验证码按钮
            getCode() {
                this.codeDisabled = true;
                let timer = 60; 
                this.phoneCode();
                let interval = setInterval(() => {
                //    clearInterval(interval)
                    timer = timer - 1;
                    this.registerdata.codename = `${timer}秒重试`;
                    if (timer == 0) {
                        clearInterval(interval)
                        this.codeDisabled = false;
                        this.registerdata.codename = '立即发送'
                    }
                }, 1000)
            },
          
            //获取短信验证码
            getType(){
                this.$http.get('/dict/data/info?dictType=userType').then(res=>{
                    let resp=JSON.parse(res.request.response)
                   this.storeType=resp.data
                })
            },
            phoneCode() {
                this.messagesToken = '';
                this.$http.get('/security/sms?phoneNum=' + this.registerdata.phone).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({title: `发送短信成功`, duration: 2});
                        this.messagesToken = res.headers.validatecodetoken
                    } else {
                        this.$Notice.error({title: `发送短信失败`, duration: 2})
                    }
                })
            },
            hasPhone() {
                if(this.phoneHasCheck==true){  
                    this.codeDisabled = true  ;
                }
                else{ 
             if ((/^1[3456789]\d{9}$/.test(this.registerdata.phone))) {
                     this.$http.get('/user/phone?phone=' + this.registerdata.phone).then(res => {
                       let response = JSON.parse(res.request.response)
                            if (response.code == 200) {
                                this.phoneHasCheck=true;
                                this.codeDisabled = false;
                            } else {
                                this.$Notice.error({title: `该号码已经被注册`, duration: 2})
                                this.codeDisabled = true;
                                this.phoneHasCheck=false;
                            }
                        })
                            } else {
                                this.$Message.error('输入正确的号码')
                            }
                      }     
            },
            // 验证码验证
            codeCheck() {
                if(this.registerdata.code!=''){
                    this.$http.post('/user/validateCodeIsTrue?code=' + this.registerdata.code + '&validateCodeToken=' + this.messagesToken).then(res => {
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
            registerUser() {
                if (this.registerdata.remeber== false) {
                    this.$Message.error(`点击同意服务条框`)
                } else if (this.registerdata.code == '') {
                    this.$Message.error( `请输入验证码`)
                }
                else if(this.registerdata.password!= this.registerdata.passwordReal){
                    this.$Message.error('两次密码不一致')
                } 
                else if(this.registerdata.adress==''){
                    this.$Message.error('请选择地址')
                } 
                 else {
                     let _data={
                          province:this.infodata.province,
                          addressDetail:this.registerdata.adress,
                          city:this.infodata.city,
                          county:this.infodata.county,
                          password:this.registerdata.password,
                          phone:this.registerdata.phone,
                          userType:this.registerdata.occupation,
                          sharemem:this.registerdata.recommendation==''?'':this.registerdata.recommendation
                     }
                
                    this.$http.post('/user/register',qs.stringify(_data)).then(res => {
                        let response = JSON.parse(res.request.response)
                        if (response.code == 200) {
                            this.$Message.success('注册成功')
                            setInterval(() => {
                                this.$router.push('/login')
                            }, 1000)
                        } else {
                                this.$Message.error(response.message)
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
    * {
        margin: 0 auto;
        padding: 0
    }
.margin_b_15 {
        margin-bottom: 15px;
    }
    .margin_b_25 {
        margin-bottom: 25px;
    }

    .login {
        width: 100%;
        min-height: 670px;
        background: #f9f9f9;
        overflow: hidden;
    }

    .login_main {
        width: 300px;
        height: 460px;
        margin-top: 20px;

    }

    .login_main a {
        color: #666
    }

    .login_main h2 {
        font-weight: 400;
        font-size: 25px;
        text-align: center;
        line-height: 80px
    }

    .login_code {
        height: 33px;
    }

    button {
        width: 100%;
        height: 100%;
    }

    .resigter_buton {
        width: 83%;
        margin: 0 auto;
        height: 33px;
        margin-top: 30px
    }

    .login_check {
        width: 85%;
        height: 25px;
        line-height: 25px;
        margin-top: 25px
    }
</style>
   /* const phonerulesName = (rule, value, callback) => {
                this.registerdata.name=this.registerdata.name.replace(/\s+/g,"")
                if (this.registerdata.name == '') {
                    callback(new Error('请输入用户名'));    
                } else if (this.registerdata.name.length< 3 ||this.registerdata.name.length > 6 ) {
                    callback(new Error('请输入3~6位的用户名'));
                }
                 else {
                      let pattem= /^[\u4e00-\u9fa5_a-zA-Z0-9_]{3,6}$/;
                      if(pattem.test(this.registerdata.name)==false){
                         callback(new Error('请输入字母，数字，中文,下划线'));
                       } 
                    else{     
                          // 检查用户名是否存在       
                          let _data={
                            loginName:this.registerdata.name
                        }
                        this.$http.post('/user/checkUserExist',qs.stringify(_data)).then(res=>{
                            let resp=JSON.parse(res.request.response)
                            if(resp.code==200){
                                 callback();
                            }else{
                             callback(new Error('用户名已存在'));
                            }
                        })
                      
                    }
                }
            }; */