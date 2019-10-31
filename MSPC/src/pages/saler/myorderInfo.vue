<template>
	<div class="orderInfoWrap">
		<div class="orderInfo">
			<div class="orderHead">订单详情</div>
			<div class="orderStatus">
				<div class="orderStatusL">
					<div class="statusHead">订单状态</div>
					<div class="statusContent">
						<div class="statusContent1" v-if="orderDetailVo.orderStatus === '0'">待付款</div>
						<div class="statusContent1" v-else-if="orderDetailVo.orderStatus === '1'">待发货</div>
						<div class="statusContent1" v-else-if="orderDetailVo.orderStatus === '2'">待确认</div>
						<div class="statusContent1" v-else-if="orderDetailVo.orderStatus === '3'">待评价</div>
						<div class="statusContent1" v-else-if="orderDetailVo.orderStatus === '4'">交易关闭</div>
						<div class="statusContent1" v-else-if="orderDetailVo.orderStatus === '5'">交易取消</div>
						<div class="statusContent1" v-else>交易完成</div>
						<div class="statusContent2">订单编号：{{orderDetailVo.orderNo}}</div>
					</div>
				</div>
				<div class="orderStatusR">
					<div class="statusRsite">收货地址</div>
					<div class="siteInfo">
						<div class="name">
							<div class="name1">姓名：</div>
							<div class="name2 name201">{{orderDetailVo.userName}}</div>
						</div>
						<div class="name">
							<div class="name1">手机号码：</div>
							<div class="name2">{{orderDetailVo.phone}}</div>
						</div>
						<div class="name">
							<div class="name1">详细地址：</div>
							<div class="name2">{{orderDetailVo.address}}</div>
						</div>
					</div>
					<div class="statusRmessage">买家留言</div>
					<div class="messageInfo">
						<div class="siteInfo2">{{orderDetailVo.message}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="orderList">
			<div class="listName">商品清单</div>
			<div class="listContent" v-for="(item,index) in orderDetailGoodsVos" :key="index">
				<div class="salerInfo">
					<div class="salerInfoName">商家：{{item.shopName}}</div>
					<div class="salerInfoName">买家：{{buyerName}}</div>
					<div class="salerInfoTime">交货期限：<em style="font-size: 18px;font-weight: bold;font-style: normal;color: red">{{item.postdata}}</em></div>
				</div>
				<div class="listHead">{{item.combinate}}</div>
				<ul class="listHead listALL" style="font-weight: normal">
					<li v-for="(content, number) in listHead" :key="number">{{content}}</li>
				</ul>
				<ul class="listUl">
					<li v-for="(items,indexs) in item.goodsDetailVos" :key="indexs">
						<ul class="listUl02 listALL">
							<li>{{indexs +1}}</li>
							<li v-if="items.customNo == ''">暂无</li>
							<li v-else>{{items.customNo}}</li>
							<li>长<span style="color: red">{{items.chang}}</span>mm&#12288;宽<span style="color: red">{{items.kuan}}</span>mm
							</li>
							<li>{{items.amount}}</li>
							<li>{{items.price}}</li>
							<li>{{((items.area)/1000000).toFixed(3)}}</li><!--面积-->
							<li><span style="color: red">{{items.money}}</span></li>
							<li>{{items.hole}}</li>
							<li>{{items.top}}</li>
							<li v-if="orderDetailVo.orderStatus === '0'">待付款</li>
							<li v-else-if="orderDetailVo.orderStatus === '1'">待发货</li>
							<li v-else-if="orderDetailVo.orderStatus === '2'">待确认</li>
							<li v-else-if="orderDetailVo.orderStatus === '3'">待评价</li>
							<li v-else-if="orderDetailVo.orderStatus === '4'">交易关闭</li>
							<li v-else-if="orderDetailVo.orderStatus === '5'">交易取消</li>
							<li v-else>交易完成</li>
							<li v-if="items.imgurl !=null && items.imgurl.length > 0">
								<Button type="info" size="small" @click="ckeckPic(items.imgurl)">查看图纸</Button>
							</li>
							<li v-else><Button type="error" size="small" disabled>暂无图纸</Button></li>
						</ul>
						<Modal v-model="picCheck" width="40%" title="查看图纸">
							<img :src="picUrl" alt="" style="width: 100%;">
						</Modal>
					</li>
				</ul>
			</div>
		</div>
		<div class="payInfo">
			<div class="payHead">付款信息</div>
			<div class="payContent">
				<ul class="payContentL">
					<li>商品总价：</li>
					<li>运费：</li>
					<li>加工费：</li>
					<li>订单总价：</li>
					<li style="color: red;font-weight: bold">实付款：</li>
				</ul>
				<ul class="payContentR">
					<li>{{'￥'+orderDetailVo.oldMoney}}</li>
					<li>{{'￥'+orderDetailVo.deliveryMoney}}</li>
					<li>{{'￥'+orderDetailVo.totalProcess}}</li>
					<li>{{'￥'+orderDetailVo.totalMoney}}</li>
					<li style="color: red;font-weight: bold;font-size: 16px">{{'￥'+orderDetailVo.totalMoney}}</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<Button type="error"  class="btn" v-if="orderDetailVo.orderStatus === '0'" :to="{path:'/pay',query:{data:orderDetailVo.id,reqsn:orderDetailVo.orderNo} }">
            <!-- orderDetailVo.orderNo -->
            <!-- ,query:{data:item.orderId,reqsn:item.orderNo ,query:{data:item.orderId,reqsn:item.orderNo}-->
				去付款
			</Button>
			<Button type="error" class="btn"
					v-else-if="orderDetailVo.orderStatus === '1'"
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">提醒发货
			</Button>
			<Button type="error" class="btn"
					v-else-if="orderDetailVo.orderStatus === '2'"
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">确认收货
			</Button>
			<Button type="error" class="btn"
					v-else-if="orderDetailVo.orderStatus === '3'">去评价
			</Button>
			<Button type="error" class="btn"
					v-else-if="orderDetailVo.orderStatus === '4'"
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">删除订单
			</Button>
			<Button type="error" class="btn"
					v-else-if="orderDetailVo.orderStatus === '5'"
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">删除订单
			</Button>
			<Button type="error" class="btn"  v-else
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">删除订单
			</Button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
   import qs from 'qs'
	export default {
		name: "orderInfo",
		data() {
			return {
				orderDetailVo: {},
				orderDetailGoodsVos: [],
				orderNo: null,
				buyerName:'',
				picCheck:false,
				picUrl:'',
				listHead:[
					'编号',
					'客户标注',
					'尺寸',
					'片数',
					'单价',
					'面积(m²)',
					'金额(元)',
					'打孔(个)',
					'挖角(个)',
					'状态',
					'操作'
				]
			}
		},
		methods: {
			//获取成功
			orderDetailSucc: function (response) {
				let res = JSON.parse(response.request.response);
				 // console.log(res);
				if (res.code == '200') {
					this.orderDetailGoodsVos = res.data.orderDetailGoodsVos;
					this.orderDetailVo = res.data.orderDetailVo;
					this.buyerName = res.data.orderDetailVo.loginName;
				}
			},
			//操作订单
			operateBtn: function (No, Status) {
				let data = {
					orderNo: No,
					status: Status
				};
				// console.log(data);
				axios.post('/order/modifyBuyerStatus', qs.stringify(data)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success('修改成功！');
							axios.get('/order/orderDetail?orderNo=' + this.orderNo).then(this.orderDetailSucc);
						}
					}
				)
			},
			//查看图纸
			ckeckPic(img){
				this.picUrl = img;
				this.picCheck =true
			},
		},
		mounted() {
			this.orderNo = this.$route.params.orderNo;//使用的是params
			let sessionData = sessionStorage.getItem('orderNo');
			if (sessionData) {
				if (this.orderNo == null || this.orderNo == undefined) {
					this.orderNo = sessionData;
				}
			}
			if (this.orderNo == null || this.orderNo == undefined) {
				this.$router.push('/index')
			} else {
				axios.get('/order/orderDetail?orderNo=' + this.orderNo).then(this.orderDetailSucc);
				sessionStorage.setItem('orderNo', this.orderNo)
			}
		}
	}
</script>

<style scoped>
	.orderInfoWrap {
		width: 100%;
		background: #f1f1f1;
		height: auto;
		overflow: hidden;
	}

	.orderInfo {
		width: 1200px;
		margin: 0 auto;
	}

	.orderHead {
		font-size: 18px;
		font-weight: bold;
		text-align: left;
		height: 60px;
		line-height: 60px;
	}

	.orderStatus {
		height: 210px;
		width: 100%;
		background-color: #fff;
		box-shadow: 0px 0px 3px #999 inset;
		overflow: hidden;
		margin-bottom: 12px;
	}

	.orderStatusL {
		width: 300px;
		display: inline-block;
		vertical-align: top;
	}

	.statusHead {
		margin: 15px 0px 0px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
	}

	.statusContent {
		width: 300px;
		margin-top: 44px;
		text-align: center;
	}

	.statusContent1 {
		font-size: 30px;
		font-weight: bold;
		color: #3ed09f;
		margin-bottom: 23px;
	}

	.statusContent2 {
		font-size: 16px;
	}

	.orderStatusR {
		display: inline-block;
		height: 100%;
		width: 890px;
		flex: fit-content;
		border-left: 1px solid #999;
	}

	.statusRsite {
		margin: 15px 0px 0px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
	}

	.siteInfo {
		padding: 10px 0 0 30px;
	}

	.siteInfo2 {
		padding: 10px 0 0 30px;
		font-weight: bold;
		width: 100%;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.name {
		font-size: 14px;
		font-weight: bold;
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

	.statusRmessage {
		margin: 15px 0px 0px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
	}

	.orderList {
		width: 1200px;
		margin: 0 auto 15px;
		padding-bottom: 50px;
		background-color: #fff;
		box-shadow: 0px 0px 3px #999 inset;
		overflow: hidden;
	}

	.listName {
		margin: 15px 0px 25px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
	}

	.listHead {
		font-size: 14px;
		margin-left: 30px;
		height: 40px;
	}

	.listALL li {
		float: left;
		text-align: center;
		width: 80px;
	}

	.salerInfo {
		height: 40px;
		line-height: 40px;
		width: 100%;
		box-shadow: 0px 0px 3px #999 inset;
		font-size: 14px;
		background-color: #f1f1f1;
	}

	.salerInfoName {
		font-weight: bold;
		margin: 0 30px 0 29px;
		display: inline-block;
	}

	.salerInfoTime {
		display: inline-block;
	}

	.listHead {
		font-weight: bold;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		margin-left: 29px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.listUl02 {
		box-shadow: 0px 0px 3px #999 inset;
		height: 40px;
		line-height: 40px;
		padding-left: 29px;
		font-size: 14px;
		font-weight: bold;
	}

	.listALL li:first-child {
		width: 35px;
		text-align: left;
	}

	.listALL li:nth-child(2) {
		width: 130px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.listALL li:nth-child(3) {
		width: 220px;
	}

	.billInfo {
		height: 160px;
		width: 1200px;
		margin: 0 auto 15px;
		background-color: #fff;
		-webkit-box-shadow: 0px 0px 3px #999 inset;
		box-shadow: 0px 0px 3px #999 inset;
		overflow: hidden;

	}

	.billHead {
		margin: 15px 0px 15px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
		display: inline-block;
	}

	.billContent {
		overflow: hidden;
		font-size: 14px;
		margin-left: 25px;
	}

	.billInfoUl {

	}

	.billInfoUl li {
		float: left;
		margin-right: 50px;
	}

	.payInfo {
		height: 160px;
		width: 1200px;
		margin: 0 auto 40px;
		background-color: #fff;
		-webkit-box-shadow: 0px 0px 3px #999 inset;
		box-shadow: 0px 0px 3px #999 inset;
		overflow: hidden;
	}

	.payHead {
		margin: 15px 0px 25px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
		display: inline-block;
	}

	.payContent {
		float: right;
		margin-top: 22px;
		margin-right: 30px;
		height: 116px;
		overflow: hidden;
		font-size: 14px;
	}

	.payContentL {
		float: left;
		margin-right: 50px;
	}

	.payContentR {
		float: right;
		text-align: right;
	}

	.footer {
		width: 1200px;
		margin: 0 auto 40px;
		overflow: hidden;
	}

	.btn {
		float: right;
		width: 200px;
		height: 50px;
		font-size: 25px;
	}
</style>
