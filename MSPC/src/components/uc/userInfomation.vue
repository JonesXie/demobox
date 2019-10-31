<template>
	<div class="uersinfo">
		<div class="uersinfo_header">
			<strong>个人信息</strong>
		</div>
		<div class="uersinfo_box">
			<Form :label-width="80">
				<div class="uploads">
					<div class="uploads_left">
						用户头像:
					</div>
					<div class="uploads_mid">
                         <img v-if="infodata.photo==''" src="@/assets/img/headimg.png">        
                         <img v-else :src="`${infodata.photo}`" >

					</div>
					<div class="uploads_right">
						<Upload :action="uploadAction" :on-success="imgsuccess" :show-upload-list="false">
							<Button type="primary">编辑图像</Button>
						</Upload>
					</div>
				</div>
                	<FormItem label="登录名:" style="display:none">
					<Input type="text" style="width: 200px;" v-model="hidename"  :readonly="infodata.wx" @on-blur="checkName"></Input>
				</FormItem>
				<FormItem label="登录名:">
					<Input type="text" style="width: 200px;" v-model="infodata.loginname"  :readonly="infodata.wx" @on-blur="checkName"></Input>
				</FormItem>
                <FormItem label="手机号:">
					<Input type="text" style="width: 200px;" readonly v-model="infodata.phone"></Input>
				</FormItem>
                	<FormItem label="用户类型:">
					<Select v-model="infodata.userType" style="width:200px">
						<Option v-for="(item,index) in allType" :value="item.dictValue" :key="index">{{ item.dictLabel
							}}
						</Option>
					</Select>
				</FormItem>
                	<FormItem label="所在地:">
                        <!-- infodata.addressDetai -->
					<Input search style="width: 200px;" @on-focus="cityCover01" v-model="mySite"
						   placeholder="请选择所在地"></Input>
				</FormItem>
				<FormItem label="真实姓名:">
					<Input type="text" style="width: 200px;" v-model="infodata.name"></Input>
				</FormItem>
                <FormItem label="性别:">
					<RadioGroup v-model="infodata.sex">
						<Radio label="0">男</Radio>
						<Radio label="1">女</Radio>
					</RadioGroup>
				</FormItem>
                <FormItem label="身份证">
					<Input type="text" style="width: 200px;" v-model="infodata.idcard" placeholder="请填写身份证信息" @on-blur="checkIdcard"></Input>
				</FormItem>		
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
				<FormItem label="我的邀请码:">
					<Input type="text" style="width: 200px;" readonly v-model="infodata.sharecode"
						   placeholder="暂无邀请码"></Input>
				</FormItem>
				<FormItem style="margin-top:35px">
					<Button type="primary" @click="saveInfo" style="width:120px">保存</Button>
				</FormItem>
			</Form>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'

	export default {
		data() {
			return {
                nameHsa:true,
                hidename:'',
                idcardHas:true,
                nameChange:false,
				uploadAction: this.host + '/upload/uploadFile',
				infodata: {
					photo: require('@/assets/img/headimg.png'),
                    name: '',
					sex: '',
					phone: '',
					sharemem: '',//邀请人
					userType: '',//类型
					province: '',//
					city: '',
                    county: '',
                    idcrad:'',
					address: '',
                    sharecode: '',//专属邀请码
                    addressDetail:''
				},
				mySite: '',
				allType: [],
				isUpload: false,
				cityCover: false,
                cityData: [],
                
			}
		},
		methods: {
			saveInfo() {
				if (this.isUpload) {
					var _data = {
                        name: this.infodata.name,
                        idcard:this.infodata.idcard,
						loginname: this.infodata.loginname,
						photo: this.infodata.photo,
                        sex: this.infodata.sex,
                          id:this.infodata.id,
						phone: this.infodata.phone,
						sharemem: this.infodata.sharemem,
						userType: this.infodata.userType,
						province: this.infodata.province,
						city: this.infodata.city,
						county: this.infodata.county,
						address: this.infodata.address,
                        sharecode: this.infodata.sharecode,
                        addressDetail:this.infodata.addressDetail
					}
				} else {
					var _data = {
						name: this.infodata.name,
                        loginname: this.infodata.loginname,
                        id:this.infodata.id,
                        idcard:this.infodata.idcard,
						photo:this.infodata.photo.length>100?"":this.infodata.photo,
						sex: this.infodata.sex,
						phone: this.infodata.phone,
						sharemem: this.infodata.sharemem,
						userType: this.infodata.userType,
						province: this.infodata.province,
						city: this.infodata.city,
						county: this.infodata.county,
						address: this.infodata.address,
                        sharecode: this.infodata.sharecode,
                        addressDetail:this.infodata.addressDetail
					}
                }
			   if(this.nameHsa){
                  this.$http.post('/user/memInfoUpdate', qs.stringify(_data)).then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
						this.$Message.success('修改成功')
						this.getInfo()
					} else {
						this.$Message.error('修改失败')
					}
				})
             }else{
                this.$Message.error('信息填写错误')  
             }
			},
			imgsuccess(resp) {
                this.infodata.photo = `${resp.data}`
				this.isUpload = true
            },
            checkName(){
               if(this.infodata.wx==false && this.nameChange){
                     let _data={
                     loginName:this.infodata.loginname
                }
                  this.$http.post('/user/checkUserExist',qs.stringify(_data)).then(res=>{
                            let resp=JSON.parse(res.request.response)
                            if(resp.code==200){
                            this.nameHsa=true      
                            }else{
                                this.nameHsa=false
                            this.$Message.error('用户名已存在')
                            }
                        })
               }
            },
            checkIdcard(){
            let    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(reg.test(this.infodata.idcard)== false){
                   this.$Message.error('身份证不合法')
                   this.idcardHas=false
              }else{
                   this.idcardHas=true
            }
            },
			getInfo() {
				this.$http.get('/user/memInfoBack?loginname=' + JSON.parse(sessionStorage.MEMBER).loginname).then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
                        this.infodata = resp.data;
                        this.mySite=resp.data.addressDetail
                        this.hidename=JSON.parse(JSON.stringify(resp.data.loginname))
						if (resp.data.photo == '' || resp.data.photo == null || resp.data.photo == undefined) {
							this.infodata.photo = require('@/assets/img/headimg.png')
						}
						
					}
				})
			},
			getType() {
				this.$http.get('dict/data/info?dictType=userType').then(res => {
					let resp = JSON.parse(res.request.response);
					if (resp.code == 200) {
						this.allType = resp.data;
					}
				})
			},
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
					this.infodata.province = arr1[0].title;
					this.infodata.city = arr1[1].title;
                    this.infodata.addressDetail=`${arr1[0].title}-${arr1[1].title}`
					for (let i = 0; i < arr1.length; i++) {
						this.mySite += arr1[i].title + ' '
					}
				}
			},
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
        watch:{   
            'infodata.loginname':function(e){
               if(this.hidename==e){
                   this.nameChange=false
               }else{
                     this.nameChange=true
                }
               }
        },
		created() {
			if (this.isLogin) {
				this.getInfo();
				this.getType();
			} else {
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

	.uersinfo_box {
		width: 400px;
		overflow: hidden;
		float: left;
		margin: 25px 0 25px 25px;
	}

	.uersinfo .uersinfo_box .ivu-form-item {
		margin-bottom: 12px;
		vertical-align: top;
		zoom: 1;
	}

	.uploads {
		width: 400px;
		height: 120px;
		margin-bottom: 33px
	}

	.uploads_left {
		float: left;
		height: 120px;
	}

	.uploads_mid {
		float: left;
		margin-left: 20px;
		width: 120px;
		height: 120px
	}

	.uploads_right {
		float: left;
		margin-left: 10px;
		width: 135px;
		height: 37px;
		margin-top: 85px;
	}

	.uploads_mid img {
		width: 120px;
		height: 120px;
	}
</style>

