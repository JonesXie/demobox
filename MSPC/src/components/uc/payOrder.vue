<template>
	<div class="rOrder">
		<div class="orderHead">
			<p v-if="$route.name==0">待付款订单</p>
			<p v-else-if="$route.name==1">待发货订单</p>
			<p v-else-if="$route.name==2">待收货订单</p>
            <p v-else-if="$route.name==3">待评价订单</p>
		</div>
		<div class="orderContent">
		
			<div class="contentShow">
				<ul class="showHead orderlist">
					<li v-for="(item,index) in headData">{{item.title}}</li>
				</ul>
				<div class="showBody" v-for="(item,index) in orderInfo" :key="index">
					<ul class="bodyHead ">
						<li>{{item.orderTime}}</li>
						<li>订单编号：{{item.orderNo}}</li>
					</ul>
					<ul class="bodyContent orderlist">
						<li>
							<img :src="`${item.orderInfos[0].goodsPictureUrl}`" alt="" class="orderIMG">
						</li>
						<li class="orderName">
							<router-link class="bodyInfo" :to="{name:'/myorderInfo', params:{orderNo:item.orderNo}}">
								<!--<p v-for="(items,indexs) in item.orderInfos[0].combinate.split(' ')">{{items}}</p>-->
								<p style="display: table-cell;vertical-align: middle">{{item.orderInfos[0].combinate}}</p>
							</router-link>
						</li>
						<li>{{ '￥' + item.orderInfos[0].price}}</li>
						<li>{{item.amount}}</li>
                        <li v-if="item.deliveryMode =='0'">自提</li>
                        <li v-else>配送</li>    
						<li>{{ item.payMoney==null? '':'￥' + item.payMoney}}</li>
						<li v-if="item.orderStatus == '0'">待付款</li>
						<li v-else-if="item.orderStatus == '1'">待发货</li>
						<li v-else-if="item.orderStatus == '2'">待确认</li>
						<li v-else-if="item.orderStatus == '3'">待评价</li>
						<li v-else-if="item.orderStatus == '4'">交易关闭</li>
						<li v-else-if="item.orderStatus == '5'">交易取消</li>
						<li v-else>交易完成</li>
						<li>

							<Button type="primary" size="large" v-if="item.orderStatus == '0'"
									:to="{path:'/pay',query:{data:item.orderId,reqsn:item.orderNo}}">去付款
							</Button>
							<Button type="primary" size="large" v-else-if="item.orderStatus == '1'"
									@click="operateBtn(item.orderNo,item.orderStatus)">提醒发货
							</Button>
							<Button type="primary" size="large" v-else-if="item.orderStatus == '2'"
									@click="operateBtn(item.orderNo,item.orderStatus)">确认收货
							</Button>
							<Button type="primary" size="large" v-else-if="item.orderStatus == '3'"
									:to="{path:'/buyCenter/evaluate',query:{orderNo:item.orderId,spes:item.orderNo}}">
								去评价
							</Button>
							<Button type="error" size="large" v-else-if="item.orderStatus == '4'"
									@click="deleteBtn(item.orderNo)">删除订单
							</Button>
							<Button type="error" size="large" v-else-if="item.orderStatus == '5'"
									@click="deleteBtn(item.orderNo)">删除订单
							</Button>
							<Button type="error" size="large" v-else @click="deleteBtn(item.orderNo)">删除订单</Button>
						</li>
					</ul>
				</div>
				<div class="showbodys" v-if="orderInfo.length <= 0">暂无数据</div>
			</div>
			<Page :total="pageTotal" class="Pages" @on-change="pageChange" :current="checkdata.page"
				  :page-size="pageSize"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: "ROrder",
		data() {
			return {
				pageTotal: 0,
				pageSize: 0,
				orderInfo: [],
				statusList: [
					{
						value: '',
						label: '全部'
					},
					{
						value: '0',
						label: '待付款'
					},
					{
						value: '1',
						label: '待发货'
					},
					{
						value: '2',
						label: '待确认'
					},
					{
						value: '3',
						label: '待评价'
					},
					{
						value: '4',
						label: '交易关闭'
					},
					{
						value: '5',
						label: '交易取消'
					},
					{
						value: '6',
						label: '交易完成'
					}
				],
				headData: [
					{
						title: '时间',
						key: 'time',
					},
					{
						title: '商品',
						key: 'goodsCustomNo',
					},
					{
						title: '单价',
						key: 'price',
					},
					{
						title: '片数',
						key: 'amount',
                    },
                    {
                    title: '配送方式',
                    key: 'deliveryMode',
                    },
					{
						title: '实付款',
						key: 'payMoney',
					},
					{
						title: '交易状态',
						key: 'orderStatus',
					},
					{
						title: '操作',
						key: 'goodsCustomNo',
					},
				],
				checkdata: {
					goodsName: '',
					orderNo: '',
					orderStatus: this.$route.name,
					beginDate: '',
					endDate: '',
					userType:'0',
                    page: 1
				}
			}
		},
		watch: {
			'$route.name': function () {
				this.info()
			}
		},
		methods: {
			//页码变化
			pageChange: function (currentpage) {
				this.checkdata.page = currentpage;
				axios.post('/order/orderList', qs.stringify(this.checkdata)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.orderInfo = res.data.list;
							document.body.scrollTop = document.documentElement.scrollTop = 175;
						}
					}
				);
			},
			//操作订单
			operateBtn: function (No, Status) {
				let data = {
					orderNo: No,
					status: Status
				};
				axios.post('/order/modifyBuyerStatus', qs.stringify(data)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success('修改成功！');
							this.info()
						} else {
							this.$Message.error('修改失败！')
						}
					}
				)
			},
			//删除订单
			deleteBtn: function (No) {
				axios.post('/order/deleteOrder?orderNo=' + No).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success('删除成功！');
							this.checked()
						}else {
							this.$Message.error('删除失败！')
						}
					}
				)
			},
			info() {
				let data = {
					goodsName: '',
					orderNo: '',
					orderStatus: this.$route.name,
					beginDate: '',
					endDate: '',
					userType:'0',
					page: 1,
                    orderCategory:'0'
				};
				this.$http.post('/order/orderList', qs.stringify(data)).then(res => {
					let response = JSON.parse(res.request.response);
					if (response.code == '200') {
						this.pageTotal = response.data.total;
						this.orderInfo = response.data.list;
						this.pageSize = res.data.pageSize;
					}
				});
			}
		},
		mounted() {
			this.info()
		}
	}
</script>

<style scoped>
	.orderHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.orderHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.orderContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 30px 0 90px 0;
	}

	.contentChoose {
		margin-left: 52px;
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

	.OrderName {
		display: inline-block;
		margin: 0 30px 0 20px;
	}

	.OrderNumber {
		display: inline-block;
		margin: 0 30px 0 20px;
	}

	.selectStatus {
		width: 100px;
		margin-left: 20px;
	}

	.contentCommit {
		margin: 10px 0 30px 52px;
		height: 48px;
		line-height: 48px;
		overflow: hidden;
	}

	.dataPicker {
		margin-left: 20px;
	}

	.contentCommit .btn1, .contentCommit .btn2 {
		float: right;
		display: inline-block;
		top: 0;
		right: 0;
		width: 92px;
		height: 34px;
		line-height: 34px;
		background-color: #f7720f;
		color: #fff;
		text-align: center;
		margin-right: 30px;
		margin-top: 7px;
		font-size: 16px;
		cursor: pointer;
	}

	.contentCommit .btn2 {
		background-color: #199ed8 !important;
	}

	.contentShow {
		width: 95%;
		margin: 0 auto;
		overflow: hidden;
	}

	.Pages {
		margin: 10px auto;
		text-align: center;
	}

	.orderlist li {
		float: left;
		width: 95px;
		text-align: center;
	}

	.orderlist li:first-child {
		width: 130px;
	}

	.orderlist li:nth-child(2) {
		width: 200px;
		overflow: hidden;
		text-align: center;
	}
	.orderlist li:nth-child(3) {
		width: 85px;
	}
	.orderlist li:nth-child(4) {
		width: 80px;
	}
	.orderlist li:last-child {
		width: 105px;
	}
	.orderName{
		height: 130px !important;
	}

	.showHead {
		background-color: #f1f1f1;
		height: 36px;
		line-height: 36px;
		width: 100%;
		font-size: 16px;
	}

	.bodyHead {
		margin-top: 10px;
		background-color: #f1f1f1;
		height: 30px;
		line-height: 30px;
		width: 100%;
		font-size: 14px;
	}

	.bodyHead li {
		float: left;
		text-align: center;
	}

	.bodyHead li:nth-child(2) {
		width: 200px;
	}

	.bodyHead li:nth-child(1) {
		width: 180px;
	}

	.bodyContent {
		height: 137px;
		padding-bottom: 20px;
		border-bottom: 1px solid #f1f1f1;
		clear: both;
	}

	.bodyContent li {
		font-weight: bold;
		height: 137px;
		line-height: 137px;
	}

	.orderIMG {
		width: 90%;
		height: 110px;
		vertical-align: middle;
	}

	.bodyInfo {
		width: 100%;
		height: 100%;
		line-height: 1.8;
		font-weight: normal;
		text-align: left;
		text-indent: 5px;
		font-size: 14px;
		color: #000;
		display: table;
	}

	.bodyInfo:hover {
		color: #007ccb;
	}

	.bodyInfo p {
		margin-top: 6px;
	}

	.selectStatus .ivu-select-item {
		padding: 2px 16px !important;
	}

	.showbodys {
		font-size: 18px;
		width: 100%;
		text-align: center;
		margin: 10px 0;
	}
</style>
