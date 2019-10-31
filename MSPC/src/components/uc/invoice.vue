<template>
	<div style="width:100%;">
		<div class="uersinfo_header">
			<strong>我的发票</strong>
		</div>
		<div class="invoces">
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">发票类型</Col>
					<Col span="16">
						<RadioGroup v-model="invocesType">
							<Radio label="0">增值税普通发票</Radio>
							<Radio label="1">增值税专用发票</Radio>
						</RadioGroup>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">发票抬头</Col>
					<Col span="16">
						<Input v-model="invoceHeader" placeholder="请填写营业执照上的全称"/>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">税务登记证号</Col>
					<Col span="16">
						<Input v-model="invoceShuiwu" placeholder="请填写税务登记证上的编号"/>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">开户银行</Col>
					<Col span="16">
						<Input v-model="invoceBank" placeholder="请填写开户许可证上的开户银行"/>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">开户账户</Col>
					<Col span="16">
						<Input v-model="invoceCard" placeholder="请填写开户许可证上的开户账户"/>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">注册场所地址</Col>
					<Col span="16">
						<Input v-model="invoceAddress" placeholder="请填写注册场所地址"/>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="start" class="code-row-bg">
					<Col span="5">注册固定电话</Col>
					<Col span="16">
						<Input v-model="invocePhone" placeholder="请填写注册固定电话"/>
					</Col>
				</Row>
			</div>
			<div class="rowline">
				<Row type="flex" justify="center" class="code-row-bg">
					<Col span="5">
						<Button type="primary" long @click="addInvoce">保存</Button>
					</Col>

				</Row>
			</div>
		</div>
		<div class="myince">我的发票</div>
		<div class="myincetable">
			<Table :columns="columns1" :data="data1"></Table>
		</div>
	</div>
</template>
<style scoped>
	.uersinfo_header {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #d8d8d8;
		font-size: 16px;
		line-height: 45px;
		text-indent: 25px
	}

	.invoces {
		width: 500px;
		min-height: 330px;
		margin: 50px auto
	}

	.rowline {
		height: 40px;
		line-height: 40px;
	}

	.myince {
		width: 1005px;
		height: 35px;
		color: #999;
		background: #d2f1fc;
		line-height: 35px;
		text-indent: 12px;
	}

	.myincetable {
		width: 96%;
		overflow: hidden;
		margin-bottom: 30px;
		margin: 10px auto
	}
</style>
<script>
	import qs from 'qs';

	export default {
		data() {
			return {
				invocesType: '0',
				invoceHeader: '',
				invoceShuiwu: '',
				invoceBank: '',
				invoceCard: '',
				invoceAddress: '',
				invocePhone: '',
				data1: [],
				columns1: [
					{
						title: '注册时间',
						key: 'creatTime'
					},
					{
						title: '税务编号',
						key: 'title'
					},
					{
						title: '发票类型',
						key: 'billType',
						render: (h, params) => {
							const row = params.row;
							let billType = row.billType;
							if (billType == '0') {
								const billType = row.billType = '普通发票'
							} else if (billType == '1') {
								const billType = row.billType = '专用发票'
							}
							return h('span', {}, billType);
						}
					},
					{
						title: '开户行',
						key: 'bankName'
					},
					{
						title: '注册地址',
						key: 'registerAddress'
					},
					{
						title: '注册电话',
						key: 'registerPhone'
					},
					{
						title: '删除',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'warning',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: '删除税务信息',
												content: '<p>确认删除税务信息?</p>',
												onOk: () => {
													let a = {billId: params.row.id}
													this.$http.post('/bill/delete', qs.stringify(a)).then(res => {
														let resp = JSON.parse(res.request.response)
														if (resp.code == 200) {
															this.$Message.success('删除成功');
															this.getInvoice()
														}
													})
												},
												onCancel: () => {
													this.$Message.info(' 删除取消');
												}
											});

										}
									}
								}, '删除')
							]);
						}
					}
				]
			}
		}, methods: {
			addInvoce() {
				let _data = {
					billType: this.invocesType,
					title: this.invoceHeader,
					discernNo: this.invoceShuiwu,
					bankName: this.invoceBank,
					accountNo: this.invoceCard,
					registerAddress: this.invoceAddress,
					registerPhone: this.invocePhone
				}
				if (this.title == '') {
					this.$Message.error('请填写发票抬头')
				} else if (this.invoceShuiwu == '') {
					this.$Message.error('请填写税务编号')
				} else if (this.invoceBank == '') {
					this.$Message.error('请填写基本开户银行')
				} else if (this.invoceCard == '') {
					this.$Message.error('请填写开户银账户')
				} else if (this.invoceAddress == '') {
					this.$Message.error('请填写注册地址')
				} else if (this.registerPhone == '') {
					this.$Message.error('请填写注册地址电话')
				} else {
					this.$http.post('/bill/add', qs.stringify(_data)).then(res => {
						let resp = JSON.parse(res.request.response)
						if (resp.code = 200) {
							this.$Message.success('添加成功')
							this.getInvoice()
							this.invocesType = '0'
							this.invoceHeader = ''
							this.invoceShuiwu = ''
							this.invoceBank = ''
							this.invoceCard = ''
							this.invoceAddress = ''
							this.invocePhone = ''
						} else {
							this.$Message.error('添加失败')
						}
					})
				}
			},
			getInvoice() {
				this.$http.get('/bill/query').then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
						this.data1 = resp.data
					}
				})
			}
		}, created() {
			this.getInvoice()
		}
	}
</script>

