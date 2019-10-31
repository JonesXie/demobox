<template>
	<div class="uersinfo">
		<div class="uersinfo_header">
			<strong>收货地址</strong>
		</div>
		<div class="uersinfo_box">
			<Form :label-width="80">
				<FormItem label="收货姓名:">
					<Input type="text" style="width: 200px;" v-model="info.userName"></Input>
				</FormItem>
				<FormItem label="地址信息:">
					<Input search enter-button @on-focus="modelshow" v-model="info.localtion"/>
				</FormItem>
				<FormItem label="详细地址:">
					<Input type="textarea" v-model="info.address"/>
				</FormItem>
				<FormItem label="手机号码:" prop="age">
					<Input type="text" style="width: 200px;" v-model="info.phone"></Input>
				</FormItem>
				<FormItem style="margin-top:35px">
					<Button type="primary" @click="saveInfo" style="width:120px">保存</Button>
				</FormItem>
			</Form>
		</div>
		<div class="localnotice">你已添加了 <span style="font-size:16px; color:#ff0000"> {{totals}}</span> 条收货地址,最多可添加10条
		</div>
		<div class="localtable">
			<Table border :columns="tableColumns" :data="localdata"></Table>
		</div>
		<Page :total="totals" style="text-align:center;margin-bottom:35px" @on-change="pagechange" :current="page"/>
		<Modal
			v-model="cityCover"
			title="请选择注册地区"
			width="350">
			<Scroll height="400">
				<Tree :data="cityData" :load-data="cityLoading" ref="citySelected"
					  @on-select-change="citySelected"></Tree>
			</Scroll>
			<div slot="footer">
				<Button type="success" size="large" @click="oksend" :disabled="senddisabled">确认</Button>
			</div>
		</Modal>
		<Modal
			v-model="exchangemodel"
			title="修改收货地址信息"
			@on-ok="okexchange"
		>
			<div style="width:350px;height:auto;overflow:hidden;margin:10px auto">
				<Form v-model="backshow" :label-width="100">
					<FormItem label="收货姓名">
						<Input type="text" v-model="backshow.userName"></Input>
					</FormItem>
					<FormItem label="手机号码">
						<Input type="text" v-model="backshow.phone"></Input>
					</FormItem>
					<FormItem label="详细地址:">
						<Input type="textarea" v-model="backshow.address"/>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>
<script>
import qs from 'qs'
	export default {
		data() {
			return {
				defLocal: false,
				localdata: [],
				cityCover: false,
				senddisabled: true,
				cityData: [],
				exchangemodel: false,
				totals: 0,
				page: 1,
				info: {
					localtion: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					userName: '',
					address: '',
                    phone: ''
                    // ,
					// code: ''
				},
				businessData: [],
				backshow: [],
				tableColumns: [
					{
						title: '收货人',
						key: 'userName'
					},
					{
						title: '地址信息',
						key: 'addressName'
					},
					{
						title: '详细地址',
						key: 'address'
					},
					{
						title: '手机号码',
						key: 'phone'
					},
					{
						title: '操作',
						key: 'address',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: '删除此收货地址',
												content: `确认删除 ${params.row.address}的收货地址?`,
												onOk: () => {
													this.$http.get('/user/address/deleteAddressById?id=' + params.row.id).then(res => {
														let response = JSON.parse(res.request.response)
														if (response.code == 200) {
															this.$Message.success(response.message)
															this.getLocalList()
														} else {
															this.$Message.error(response.message)
														}
													})
												},
												onCancel: () => {
													this.$Message.info('Clicked cancel');
												}
											});
										}
									}
								}, '删除'),
								h('Button', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.$http.get('/user/address/QueryInfoById?id=' + params.row.id).then(res => {
												let response = JSON.parse(res.request.response)
												if (response.code == 200) {
													this.backshow = response.data
													this.exchangemodel = true

												} else {
													this.$Message.error(response.message)
												}
											})
										}
									}
								}, '修改')
							]);
						}
					},
					{
						title: '设为默认',
						key: 'address',
						render: (h, params) => {
							const row = params.row;
							const isDefault = row.isDefault;
							if (isDefault == '1') {
								return h('div', [
									h('Button', {
										props: {
											size: 'small'
										},
										style: {
											marginRight: '5px',
											border: '1px solid #199ed8',
											color: '#199ed8'
										}
									}, '默认地址')
								]);
							}
							else {
								return h('div', [
									h('Button', {
										props: {
											size: 'small'
										},
										style: {
											marginRight: '5px',
										},
										on: {
											click: () => {
												this.$http.post('/user/address/updateStateById',  qs.stringify({id: params.row.id})).then(response => {
													let res = JSON.parse(response.request.response);
													if (res.code == 200) {
														this.$Message.success('设置成功')
														this.getLocalList()
													} else {
														this.$Message.error('设置失败')
													}
												})
											}
										}
									}, '设为默认')
								]);
							}
						}
					}
				]
			}
		},
		methods: {
			saveInfo() {
				if (this.info.userName == '') {
					this.$Message.error('请填写用户名');
					return false
				} else if (this.info.localtion == '') {
					this.$Message.error('请输入地址');
					return false
				}
				else if (this.info.address == '') {
					this.$Message.error('请输入详细地址');
					return false
				} else if (!/^1[34578]\d{9}$/.test(this.info.phone)) {
					this.$Message.error('请输入正确的手机号')
					return false
				} else {              
                if(this.localdata.length>=10){
                     this.$Message.error('最多添加10个');
                }
				else{
                    	let _data = {
						memid: JSON.parse(sessionStorage.MEMBER).id,
						userName: this.info.userName,
						phone: this.info.phone,
						// code: this.info.code,
						addressName: this.info.localtion,
						provinceId: this.info.provinceId,
						cityId: this.info.cityId,
						countyid: this.info.countyId,
						address: this.info.address
					}
					this.$http.post('/user/address/addAddress',  qs.stringify(_data)).then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 200) {
							this.$Message.success('添加成功')
							this.info = {}
							this.getLocalList()
						} else {
							this.$Message.error(response.message)
						}
					})
                }
				}
			},
			modelshow() {
				this.cityCover = true;
			},
			oksend() {
				this.cityCover = false;
			},
			//城市数据获取
			areaTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.cityData = res.data
			},
			cityLoading: function (item, callback) {
                let id = item.id;
                let datas={parent_id: id}
				this.$http.post('/saler/AreaTree', qs.stringify(datas)).then(
					response => {
						let res = JSON.parse(response.request.response);
						const data = res.data;
						callback(data);
					}
				);
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

				function dedupe(array) {
					return Array.from(new Set(array));
				}

				arr1 = dedupe(arr1);
				if (arr1.length == 3) {
					this.senddisabled = false;
					this.info.localtion = `${arr1[0].title}-${arr1[1].title}-${arr1[2].title}`
					this.info.provinceId = arr1[0].id;
					this.info.cityId = arr1[1].id;
					this.info.countyId = arr1[2].id;
				}
			},
			getLocalList(e = 0) {
				this.$http.get('/user/address/addressInfo?memid=' + JSON.parse(sessionStorage.MEMBER).id + '&page=' + e + '&size=10').then(res => {
					let response = JSON.parse(res.request.response);
					this.localdata = response.data.list;
					this.totals = response.data.total
				})

			},
			pagechange(page) {
				// let pages=Number(page)-1;
				this.getLocalList(page)
			},
			okexchange() {
				let _data = {
					id: this.backshow.id,
					memid: JSON.parse(sessionStorage.MEMBER).id,
					userName: this.backshow.userName,
					phone: this.backshow.phone,
					// code: this.backshow.code,
					provinceId: this.backshow.provinceId,
					cityId: this.backshow.cityId,
					countyid: this.backshow.countyId,
					address: this.backshow.address,
					addressName: this.backshow.addressName,
					isDefault: this.backshow.isDefault
				}

				this.$http.post('/user/address/UpdateAddressInfo', qs.stringify(_data)).then(res => {
					let response = JSON.parse(res.request.response);
					if (response.code == 200) {
						this.$Message.success('修改成功')
						this.getLocalList()
					} else {
						this.$Message.error('修改失败')
					}
					this.exchangemodel = false
				})
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

		created() {
			if (this.isLogin) {
				this.getLocalList()
				this.$http.post('/saler/AreaTree').then(this.areaTreeSucc);
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

	.localnotice {
		width: 890px;
		margin: 0 auto;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		text-indent: 25px;
		background: #d2f1fc;
		color: #666;;
		overflow: hidden;
	}

	.localtable {
		width: 890px;
		margin: 0 auto;;
		overflow: hidden;
		margin-bottom: 10px
	}
</style>

