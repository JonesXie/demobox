<template>
	<div>
	<div class="rProduct" v-if="isChange">
		<div class="productHead">
			<p>发票管理</p>
		</div>
		<div class="productContent">
			<div class="contentChoose">
				<em>用户名</em>
				<Input style="width: 200px" class="ProductName" v-model="checkdata.loginName"/>
				<em>开票状态</em>
				<Select class="selectStatus" v-model="checkdata.billStatus">
					<Option v-for="item in statusList" :value="item.value" :key="item.value">
						{{ item.label }}
					</Option>
				</Select>
				<div class="btn2" @click="checked">查询</div>
				<div class="btn1" @click="checkedALL">全部</div>
			</div>
			<div class="contentShow">
				<Table :columns="title" :data="Listdata" size="small" class="Table"></Table>
			</div>
			<Page :total="pageTotal" :page-size="pageSize" class="Pages" @on-change="pageChange" :current="checkdata.page"/>
		</div>
	</div>
	<div v-else class="billInfo">
		<div class="productHead" style="background-color: #fff">
			<p>发票详情</p>
			<em class="headEm" @click="isTurn">返回发票列表>></em>
		</div>
		<div class="infoH">
			<div class="name">
				<div class="name1">姓名：</div>
				<div class="name2 name201">{{siteData.userName}}</div>
			</div>
			<div class="name">
				<div class="name1">手机号码：</div>
				<div class="name2">{{siteData.phone}}</div>
			</div>
			<div class="name">
				<div class="name1">详细地址：</div>
				<div class="name2">{{siteData.addressName}}</div>
			</div>
		</div>
		<div class="infoM">
			<div class="name">
				发票所合并的订单
			</div>
			<ul class="ulWrap">
				<li>
					<ul class="liWrap liFirst">
						<li>下单时间</li>
						<li>订单编号</li>
						<li>订单状态</li>
						<li>金额</li>
					</ul>
				</li>
				<li v-for="(item,index) in orderData" :key="index">
					<ul class="liWrap">
						<li>{{item.orderTime}}</li>
						<li>{{item.orderNo}}</li>
						<li v-if="item.orderStatus == '0'">待付款</li><!-- 暂时关闭-->
						<li v-else-if="item.orderStatus == '1'">待发货</li>
						<li v-else-if="item.orderStatus == '2'">待确认</li>
						<li v-else-if="item.orderStatus == '3'">待评价</li>
						<li v-else-if="item.orderStatus == '4'">交易关闭</li><!-- 暂时关闭-->
						<li v-else-if="item.orderStatus == '5'">交易取消</li><!-- 暂时关闭-->
						<li v-else-if="item.orderStatus == '6'">交易完成</li>
						<li>{{'￥'+item.orderInfos[0].price}}</li>
					</ul>
				</li>
			</ul>
			<div class="allMoney">
				总计：<span style="color: red;font-size: 18px" >{{'￥'+amount}}</span>
			</div>
		</div>
		<div class="infoF">
			<div class="name">
				发票开具信息
			</div>
			<div class="billDes">
				<div class="desL">
					<span>发票类型：</span>
					<span>发票抬头：</span>
					<span>税务登记证号：</span>
					<span>基本开户银行名称：</span>
					<span>基本开户账号：</span>
					<span>注册场所地址：</span>
				</div>
				<div class="desR">
					<span v-if="billData.billType == '0'">增值税普通发票</span>
					<span v-else>增值税专用发票</span>
					<span>{{billData.title}}</span>
					<span>{{billData.discernNo}}</span>
					<span>{{billData.bankName}}</span>
					<span>{{billData.accountNo}}</span>
					<span>{{billData.registerAddress}}</span>
				</div>
			</div>
		</div>
		<div class="footer">
			<Button type="primary" class="btn"
					@click="isTurn">返回发票列表
			</Button>
		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs';
	export default {
        name: "RBills",
		data() {
			return {
				pageTotal: 0,
				pageSize:0,
				isChange:true,
				siteData:'',
				orderData:'',
				billData:'',
				amount:0,
				statusList: [
					{
						value: '0',
						label: '未开'
					},
					{
						value: '1',
						label: '已开'
					}
				],
				title: [
					{
						title: '用户名',
						width: 110,
						align: 'center',
						key: 'loginName',
						ellipsis:true
					},
					{
						title: '发票类型',
						width: 120,
						align: 'center',
						key: 'billType',
						render: (h, params) => {
							let isChange;
							let status = params.row.billType;
							if (status == '0') {
								isChange = '增值税普通发票'
							} else if (status == '1') {
								isChange = '增值税专用发票'
							}
							return h('span', {}, isChange);
						}
					},
					{
						title: '发票抬头',
						// width: 180,
						align: 'center',
						key: 'title',
						ellipsis:true
					},
					{
						title: '税务登记证号',
						// width: 180,
						align: 'center',
						key: 'discernNo',
						ellipsis:true
					},
					{
						title: '开票金额',
						width: 100,
						align: 'center',
						key: 'amount',
						className:'billColor',
						ellipsis:true
					},
					{
						title: '状态',
						width: 60,
						align: 'center',
						key: 'billStatus',
						render: (h, params) => {
							let isChange;
							let status = params.row.billStatus;
							if (status == '0') {
								isChange = '未开'
							} else if (status == '1') {
								isChange = '已开'
							}
							return h('span', {
								style:{
									color:'red',
								}
							}, isChange);
						}
					},
					{
						title: '操作',
						align: 'center',
						width: 125,
						render: (h, params) => {
							let isChange;
							let isUsed=true;
							let status = params.row.billStatus;
							if (status == '0') {
								isChange = '开票';//未开,开具操作
								isUsed = false
							} else if (status == '1') {
								isChange = '已开';
								isUsed=true
							}
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'primary',
										disabled:isUsed
									},
									on: {
										click: () => {
											let data = params.row;
											if(!isUsed){
												axios.get('/bill/open?id='+data.id).then(
													response => {
														let res = JSON.parse(response.request.response);
														// console.log(res.data)
														if (res.code == '200') {
															this.$Message.success('开票成功！');
															this.checked()
														}else {
															this.$Message.error('开票失败！')
														}
													}
												);
											}
										}
									}
								}, isChange),
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginLeft: '5px'
									},
									on: {
										click: () => {
											let data = params.row;
											axios.get('bill/billDetail?id='+data.id).then(
												response => {
													let res = JSON.parse(response.request.response);
													// console.log(res.data)
													if (res.code == '200') {
														this.siteData = res.data.memAddressVO;
														this.orderData = res.data.orderListVoList;
														this.billData = res.data.memBillVo;
														this.amount = res.data.amount;
														this.isTurn()
													}
												}
											);
										}
									}
								}, '详情'),
							]);
						}
					}
				],
				Listdata: [],
				checkdata: {
					loginName: '',
					billStatus: '',
					page: 1
				}
			}
		},
		methods: {
			//商品列表初始获取成功
			billSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res)
				if (res.code == '200') {
					this.Listdata = res.data.list;
					this.pageTotal = res.data.total;
					this.pageSize = res.data.pageSize;
				}
			},
			//页码变化
			pageChange: function (currentpage) {
				this.checkdata.page = currentpage;
				axios.post('/bill/storeBill', qs.stringify(this.checkdata)).then(
					response => {
						let res = JSON.parse(response.request.response);
						this.Listdata = res.data.list;
					}
				);
			},
			//查询
			checked: function () {
				axios.post('/bill/storeBill', qs.stringify(this.checkdata)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.Listdata = res.data.list;
							this.pageTotal = res.data.total;
							this.pageSize = res.data.pageSize;
						}
					}
				);
			},
			//全部
			checkedALL: function () {
				this.checkdata = {
					loginName: '',
					billStatus: '',
					page: 1
				};
				axios.post('/bill/storeBill').then(this.billSucc);
			},
			//页面转换
			isTurn(){
				if (this.isChange){
					this.isChange=false
				} else {
					this.isChange=true
				}
				document.body.scrollTop = document.documentElement.scrollTop = 165
			}
		},
		mounted() {
			axios.post('/bill/storeBill').then(this.billSucc);
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
		display: inline-block;
	}
	.headEm{
		float: right;
		margin-right: 30px;
		font-size: 15px;
		cursor: pointer;
		color:#57a3f3;
	}

	.productContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 0 0 60px 0;
	}

	.contentChoose {
		margin: 30px 0 10px 52px;
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


	.selectStatus {
		width: 100px;
		margin-left: 20px;
	}
	.btn2,.btn1 {
		display: inline-block;
		width: 92px;
		height: 32px;
		line-height: 32px;
		background-color: #ff9900;
		color: #fff;
		text-align: center;
		margin-right: 30px;
		font-size: 16px;
		cursor: pointer;
		border-radius: 5px;
	}

	.btn2 {
		background-color: #2d8cf0 !important;
		margin-left: 60px;
	}

	.contentShow {
		width: 97%;
		margin: 0 auto;
	}

	.Pages {
		margin: 10px auto;
		text-align: center;
	}
	.billInfo{
		background-color: #f1f1f1;
	}
	.infoH{
		width: 100%;
		background-color: #ffffff;
		margin-top: 10px;
		box-shadow: 0px 0px 3px #999 inset;
		padding: 20px 0 ;
	}
	.name {
		font-size: 15px;
		font-weight: bold;
		margin-left: 30px;
	}

	.name1 {
		display: inline-block;
	}

	.name2 {
		display: inline-block;
		margin-left: 10px;
	}

	.name201 {
		margin-left: 40px;
	}
	.infoM{
		width: 100%;
		background-color: #ffffff;
		margin-top: 10px;
		box-shadow: 0px 0px 3px #999 inset;
		padding: 10px 0 ;
		overflow: hidden;
	}
	.ulWrap{
		width: 880px;
		margin: 10px auto;
	}
	.ulWrap>li{
		margin: 5px auto;
	}
	.liWrap{
		overflow: hidden;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}
	.liWrap li{
		float: left;
		width: 25%;
		border-bottom: 1px solid #999999;
		padding: 5px 0;
	}
	.liFirst li{
		border-bottom: none;
		font-size: 14px;
	}
	.allMoney{
		font-size: 15px;
		font-weight: bold;
		float: right;
		margin-right: 100px;
	}
	.infoF{
		width: 100%;
		background-color: #ffffff;
		margin-top: 10px;
		box-shadow: 0px 0px 3px #999 inset;
		padding: 10px 0 ;
		overflow: hidden;
	}
	.billDes{
		width: 880px;
		margin: 10px auto;
		padding: 0 20px;
		overflow: hidden;
		font-size: 15px;
	}
	.billDes span{
		display: inline-block;
		width: 100%;
	}
	.desL{
		width: 22%;
		float: left;
	}
	.desR{
		width: 50%;
		float: left;
		color: #43b7d1;
		font-weight: bold;
	}
	.footer {
		margin-top: 20px;
		width: 100%;
		overflow: hidden;
	}

	.btn {
		float: right;
		width: 200px;
		height: 50px;
		font-size: 25px;
	}
</style>>
