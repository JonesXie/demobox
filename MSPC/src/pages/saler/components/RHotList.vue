<template>
	<div class="rHotlist">
		<div class="hotlistHead">
			<p>热销列表</p>
		</div>
		<div class="hotlistContent">
			<div class="contentChoose">
				<em>商品名称</em>
				<Input style="width: 200px" class="HotlistName" v-model="checkdata.goodsName"/>
				<em>商品编号</em>
				<Input style="width: 200px" class="HotlistNumber" v-model="checkdata.goodsCustomNo"/>
				<em>上架状态</em>
				<Select class="selectStatus" v-model="checkdata.isHot">
					<Option v-for="item in statusList" :value="item.value" :key="item.value">
						{{ item.label }}
					</Option>
				</Select>
			</div>
			<div class="contentCommit">
				<div class="btn1" @click="checkedALL">全部</div>
				<div class="btn2" @click="checked">查询</div>
			</div>
			<div class="contentShow">
				<Table ref="selection" :columns="title" :data="hotData" @on-selection-change="onSelected"></Table>
				<Button type="info" class="upbtn" @click="uploadAll">批量热销</Button>
				<Button type="info" class="downbtn" @click="downloadAll">批量取消热销</Button>
			</div>
			<Page :total="pageTotal" class="Pages" @on-change="pageChange" :current="checkdata.page"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: "UpDate",
		data() {
			return {
				pageTotal: 0,
				statusList: [
					{
						value: '',
						label: '全部'
					},
					{
						value: '0',
						label: '未热销'
					},
					{
						value: '1',
						label: '已热销'
					},
				],
				title: [
					{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '商品编号',
						// width: 180,
						width: 200,
						align: 'center',
						key: 'goodsCustomNo',
						sortable: true,
					},
					{
						title: '商品名称',
						// width: 180,
						width: 230,
						align: 'center',
						key: 'goodsName',
					},
					{
						title: '发布日期',
						// width: 120,
						width: 140,
						align: 'center',
						key: 'pubdate',
						sortable: true
					},
					//暂时不用
					// {
					// 	title: '推荐商品',
					// 	width: 110,
					// 	align: 'center',
					// 	key: 'isSuggest',
					// 	render: (h, params) => {
					// 		let isSuggest;
					// 		let status = params.row.isSuggest;
					// 		if (status == '0') {
					// 			isSuggest = '否'
					// 		} else if (status == '1') {
					// 			isSuggest = '是'
					// 		}
					// 		return h('span', {}, isSuggest);
					// 	}
					// },
					{
						title: '是否热销',
						// width: 100,
						width: 110,
						align: 'center',
						key: 'isHot',
						render: (h, params) => {
							let isHot;
							let status = params.row.isHot;
							if (status == '0') {
								isHot = '未热销'
							} else if (status == '1') {
								isHot = '已热销'
							}
							return h('span', {}, isHot);
						}
					},
					{
						title: '操作',
						align: 'center',
						render: (h, params) => {
							let isChange;
							let isStatus;
							let status = params.row.isHot;
							// console.log(status)
							if (status == '0') {//未热销状态，显示热销按钮
								isChange = '热销';
								isStatus = '1';
							} else if (status == '1') {///热销状态，显示未热销按钮
								isChange = '不热销';
								isStatus = '0'
							}
							return h('Button', {
								props: {
									size: 'small',
									type: 'info'
								},
								on: {
									click: () => {
										let ids = params.row.id;
										let _data = [{
											"id": ids,
											"isHot": isStatus
										}];
										axios.post('/saler/salerGoods/uod', _data, {headers: {"Content-Type": "application/json;charset=utf-8"}}).then(
											response => {
												let res = JSON.parse(response.request.response);
												if (res.code == '200') {
													this.$Message.success('修改成功！');
													this.checked();
												}
											}
										);
									}
								}
							}, isChange)
						}
					}
				],
				hotData: [],
				batchData: [],
				checkdata: {
					goodsName: '',
					goodsCustomNo: '',
					isHot: '',
					page: 1
				}
			}
		},
		methods: {
			//商品列表初始获取成功
			salerGoodsSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res);
				if (res.code == '200') {
					this.hotData = res.data.list;
					this.pageTotal = res.data.total
				}
			},
			//页码变化
			pageChange: function (currentpage) {
				this.checkdata.page = currentpage;
				axios.get('/saler/salerGoods', {params: this.checkdata}).then(
					response => {
						let res = JSON.parse(response.request.response);
						this.hotData = res.data.list;
					}
				);
			},
			//查询
			checked: function () {
				axios.get('/saler/salerGoods', {params: this.checkdata}).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.hotData = res.data.list;
							this.pageTotal = res.data.total;
						}
					}
				);
			},
			//全部
			checkedALL: function () {
				this.checkdata = {
					goodsName: '',
					goodsCustomNo: '',
					isHot: '',
					page: 1
				};
				axios.get('/saler/salerGoods').then(this.salerGoodsSucc);
			},
			//列表选中
			onSelected: function (res) {
				for (let i = 0; i < res.length; i++) {
					let msg = {
						id: res[i].id,
						isHot: res[i].isHot
					};
					this.batchData[i] = msg;//向batchData传值
				}
			},
			//批量已热销
			uploadAll: function () {
				for (let i = 0; i < this.batchData.length; i++) {
					if (this.batchData[i].isHot == '0') {
						//对原始数据处理，未热销，变成已热销
						this.batchData[i].isHot = '1'
					}
				}
				;
				axios.post('/saler/salerGoods/uod', this.batchData, {headers: {"Content-Type": "application/json;charset=utf-8"}}).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success('提交成功！');
							this.checkedALL()
						}
					}
				);
			},
			//批量未热销
			downloadAll: function () {
				for (let i = 0; i < this.batchData.length; i++) {
					if (this.batchData[i].isHot == '1') {
						//对原始数据处理，已热销，变成未热销
						this.batchData[i].isHot = '0'
					}
				}
				;
				// console.log(this.batchData);
				axios.post('/saler/salerGoods/uod', this.batchData, {headers: {"Content-Type": "application/json;charset=utf-8"}}).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success('提交成功！');
							this.checkedALL()
						}
					}
				);
			},
		},
		mounted() {
			axios.get('/saler/salerGoods').then(this.salerGoodsSucc);
		}
	}
</script>

<style scoped>
	.hotlistHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.hotlistHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.hotlistContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 30px 0 60px 0;
	}

	.contentChoose {
		margin: 30px 0 0 52px;
		height: 48px;
		line-height: 48px;
	}

	em {
		text-decoration: none;
		font-style: normal;
		margin: 0;
		padding: 0;
		vertical-align: top;
		font-size: 16px;
	}

	.HotlistName {
		display: inline-block;
		margin: 0 30px 0 20px;
	}

	.HotlistNumber {
		display: inline-block;
		margin: 0 30px 0 20px;
	}

	.selectStatus {
		width: 100px;
		margin-left: 20px;
	}

	.contentCommit {
		margin-top: 10px;
		height: 48px;
		line-height: 48px;
		overflow: hidden;
	}

	.contentCommit div {
		float: right;
		display: inline-block;
		top: 0;
		right: 0;
		width: 92px;
		height: 34px;
		line-height: 34px;
		background-color: #ff9900;
		color: #fff;
		text-align: center;
		margin-right: 30px;
		font-size: 16px;
		cursor: pointer;
	}

	.btn2 {
		background-color: #2d8cf0 !important;
	}

	.contentShow {
		width: 97%;
		margin: 0 auto;
	}

	.upbtn, .downbtn {
		margin-top: 10px;
		margin-left: 20px;
	}

	.Pages {
		margin: 10px auto;
		text-align: center;
	}
</style>
