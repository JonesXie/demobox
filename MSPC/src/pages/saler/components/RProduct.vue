<template>
	<div class="rProduct">
		<div class="productHead">
			<p>商品管理</p>
		</div>
		<div class="productContent">
			<div class="contentChoose">
				<em>商品名称</em>
				<Input style="width: 200px" class="ProductName" v-model="checkdata.goodsName"/>
				<em>商品编号</em>
				<Input style="width: 200px" class="ProductNumber" v-model="checkdata.goodsCustomNo"/>
				<em>上架状态</em>
				<Select class="selectStatus" v-model="checkdata.isUpload">
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
				<Table :columns="title" :data="Listdata" class="Table"></Table>
			</div>
			<Page :total="pageTotal" class="Pages" @on-change="pageChange" :current="checkdata.page"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs';

	export default {
		name: "RProduct",
		data() {
			return {
				pageTotal: 0,
				statusList: [
					{
						value: '',
						label: '全部'
					},
					{
						value: '1',
						label: '上架'
					},
					{
						value: '0',
						label: '下架'
					},
					{
						value: '2',
						label: '待上架'
					},
				],
				title: [
					{
						title: '商品编号',
						// width: 160,
						width: 180,
						align: 'center',
						key: 'goodsCustomNo',
						sortable: true,
					},
					{
						title: '商品名称',
						// width: 180,
						width: 210,
						align: 'center',
						key: 'goodsName',
					},
					{
						title: '发布日期',
						// width: 110,
						width: 120,
						align: 'center',
						key: 'pubdate',
						sortable: true
					},
					//暂时不用
					// {
					// 	title: '推荐商品',
					// 	width: 90,
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
						title: '上架状态',
						// width: 90,
						width: 110,
						align: 'center',
						key: 'isUpload',
						render: (h, params) => {
							let isUpload;
							let status = params.row.isUpload;
							if (status == '0') {
								isUpload = '下架'
							} else if (status == '1') {
								isUpload = '上架'
							} else if (status == '2') {
								isUpload = '待上架'
							}
							return h('span', {}, isUpload);
						}
					},
					{
						title: '是否热销',
						// width: 90,
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
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											let data = params.row;
											// console.log(data)
											this.$router.push({
												path: '/shopdetail',
												query: {goodsid: data.id, shopid: data.shopId}
											})
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											// console.log(params.row.id)
											this.$router.push({
												name: '/salerInfo/RRelease',
												params: {id: params.row.id}
											})
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										size: 'small',
										type: 'error'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											axios.delete('saler/salerGoods/' + params.row.id).then(
												response => {
													let res = JSON.parse(response.request.response);
													if (res.code == '200') {
														this.$Message.success('删除成功！');
														this.checked()
													}
												}
											);
										}
									}
								}, '删除')
							]);
						}
					}
				],
				Listdata: [],
				checkdata: {
					goodsName: '',
					goodsCustomNo: '',
					isUpload: '',
					page: 1
				}
			}
		},
		methods: {
			//商品列表初始获取成功
			salerGoodsSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res)
				if (res.code == '200') {
					this.Listdata = res.data.list;
					this.pageTotal = res.data.total
				}
			},
			//页码变化
			pageChange: function (currentpage) {
				this.checkdata.page = currentpage;
				axios.get('/saler/salerGoods', {params: this.checkdata}).then(
					response => {
						let res = JSON.parse(response.request.response);
						this.Listdata = res.data.list;
					}
				);
			},
			//查询
			checked: function () {
				axios.get('/saler/salerGoods', {params: this.checkdata}).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.Listdata = res.data.list;
							this.pageTotal = res.data.total
						}
					}
				);
			},
			//全部
			checkedALL: function () {
				this.checkdata = {
					goodsName: '',
					goodsCustomNo: '',
					isUpload: '',
					page: 1
				};
				axios.get('/saler/salerGoods').then(this.salerGoodsSucc);
			}
		},
		mounted() {
			axios.get('/saler/salerGoods').then(this.salerGoodsSucc);
		}
	}
</script>

<style scoped>
	.productHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.productHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.productContent {
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

	.ProductName {
		display: inline-block;
		margin: 0 30px 0 20px;
	}

	.ProductNumber {
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

	.Pages {
		margin: 10px auto;
		text-align: center;
	}
</style>
