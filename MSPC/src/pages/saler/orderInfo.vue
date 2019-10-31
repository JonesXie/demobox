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
			<div class="listName">
				<p style="display: inline-block">商品清单</p>
				<Button type="info" class="print" @click="printClick">打印</Button>
			</div>
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
								<a :download="item.combinate" :href="items.imgurl"><Button type="error" size="small">下载图纸</Button></a>
							</li>
							<li v-else><Button type="error" size="small" disabled>暂无图纸</Button></li>
						</ul>
					</li>
				</ul>
				<Modal v-model="picCheck" width="40%" title="查看图纸">
					<img :src="picUrl" alt="" style="width: 100%;">
				</Modal>
			</div>
		</div>
		<!--发票-->
		<!--<div class="billInfo" v-if="billStatus == '1'">-->
			<!--<div class="billHead">发票信息</div>-->
			<!--<div class="billContent">-->
				<!--<ul class="billInfoUl">-->
					<!--<li>-->
						<!--<p v-if="billInfo.billType == '0'">发票类型：增值税普通发票</p>-->
						<!--<p v-else>发票类型：增值税专用发票</p>-->
						<!--<p>发票抬头：{{billInfo.title}}</p>-->
						<!--<p>税务登记号：{{billInfo.discernNo}}</p>-->
					<!--</li>-->
					<!--<li>-->
						<!--<p>基本开户银行名称：{{billInfo.bankName}}</p>-->
						<!--<p>基本开户账号：{{billInfo.accountNo}}</p>-->
					<!--</li>-->
					<!--<li>-->
						<!--<p>注册场所地址：{{billInfo.registerAddress}}</p>-->
						<!--<p>注册固定电话：{{billInfo.registerPhone}}</p>-->
					<!--</li>-->
				<!--</ul>-->
			<!--</div>-->
		<!--</div>-->
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
			<Button type="error" class="btn" v-if="orderDetailVo.orderStatus === '0'"
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">取消订单
			</Button>
			<Button type="error" class="btn" v-else-if="orderDetailVo.orderStatus === '1'"
					@click="operateBtn(orderDetailVo.orderNo,orderDetailVo.orderStatus)">立即发货
			</Button>
			<Button type="error" class="btn" v-else-if="orderDetailVo.orderStatus === '2'" disabled>待确认</Button>
			<Button type="error" class="btn" v-else-if="orderDetailVo.orderStatus === '3'" disabled>待评价</Button>
			<Button type="error" class="btn" v-else-if="orderDetailVo.orderStatus === '4'"
					@click="deleteBtn(orderDetailVo.orderNo)">删除订单
			</Button>
			<Button type="error" class="btn" v-else-if="orderDetailVo.orderStatus === '5'" disabled>交易取消</Button>
			<Button type="error" class="btn" v-else>查看评价</Button>
		</div>
		<div id="printContent" style="background-color: #fff" v-show="false">
			<div class="printH">
				<p style="font-size: 20px;font-weight: bold;text-align: center">{{shopName}}订单详情页</p>
				<Row>
					<Col :xs="8" :sm="8" :md="8" :lg="8">客户名称:{{orderDetailVo.userName}}</Col>
					<Col :xs="8" :sm="8" :md="8" :lg="8">客户电话:{{orderDetailVo.phone}}</Col>
					<Col :xs="8" :sm="8" :md="8" :lg="8">订单编号:{{orderDetailVo.orderNo}}</Col>
				</Row>
				<Row>
					<Col :xs="8" :sm="8" :md="8" :lg="8">订货总片数：<em style="font-size: 16px;font-weight: bold;font-style: normal">{{totalAmount}}</em></Col>
					<Col :xs="8" :sm="8" :md="8" :lg="8">订货总面积：<em style="font-size: 16px;font-weight: bold;font-style: normal">{{totalArea}}</em></Col>
					<Col :xs="8" :sm="8" :md="8" :lg="8">发货时间：<em style="font-size: 18px;font-weight: bold;font-style: normal;color: red">{{FinalData}}</em></Col><!--发货日期:-->
				</Row>
				<div class="tableData">
					<table class="Table">
						<tbody>
						<tr>
							<td v-for="(item,index) in tableHead" :key="index">{{item}}</td>
						</tr>
						</tbody>
					</table><!--头部-->
					<table class="Table" v-for="(item,index) in orderDetailGoodsVos" :key="index">
						<thead>
						<tr>
							<th class="tHead" colspan="6">{{item.combinate}}</th>
							<th class="tHead" colspan="4">{{orderDetailVo.userName}}</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(items,indexs) in item.goodsDetailVos" :key="indexs">
							<td>{{items.customNo}}</td>
							<td>{{items.chang}}×{{items.kuan}}</td>
							<td>{{items.amount}}</td>
							<td>{{((items.area)/1000000).toFixed(3)}}</td><!--面积-->
							<td>{{orderDetailVo.message}}</td><!--附加要求-->
							<td>{{items.price}}</td>
							<td>{{items.money}}</td>
							<td>{{items.hole}}</td>
							<td>{{items.top}}</td>
							<td>{{items.process}}</td>
						</tr>
						<tr style="font-weight: bold">
							<td>小计</td>
							<td>{{item.postdata}}</td>
							<td>{{Allamount(item.goodsDetailVos)}}</td>
							<td>{{Allarea(item.goodsDetailVos)}}</td><!--面积-->
							<td></td><!--附加要求-->
							<td></td><!--面积-->
							<td>{{Allmoney(item.goodsDetailVos)}}</td>
							<td>{{Allhole(item.goodsDetailVos)}}</td>
							<td>{{Alltop(item.goodsDetailVos)}}</td>
							<td>{{Allprocess(item.goodsDetailVos)}}</td>
						</tr>
						</tbody>
					</table>
					<table class="Table">
						<tbody>
						<tr style="font-weight: bold;font-size: 15px">
							<td>总计</td>
							<td></td>
							<td>{{totalAmount}}</td>
							<td>{{totalArea}}</td><!--面积-->
							<td></td><!--附加要求-->
							<td></td><!--面积-->
							<td>{{orderDetailVo.oldMoney}}</td>
							<td></td>
							<td></td>
							<td>{{orderDetailVo.totalProcess}}</td><!--加工费-->
						</tr>
						</tbody>
					</table><!--尾部-->
				</div>
				<Row class="printFoot">
					<Col span="4" v-if="orderDetailVo.deliveryMode=='0'" offset="12">交货方式：自提</Col>
					<Col span="4" v-else-if="orderDetailVo.deliveryMode=='1'" offset="12">交货方式：配送</Col>
					<Col span="4">运费：{{orderDetailVo.deliveryMoney}}</Col>
					<Col span="4">实付款：<em style="font-size: 18px;font-weight: bold;font-style: normal;color: red">{{orderDetailVo.totalMoney}}</em></Col><!--发货日期:-->
				</Row>
				<div v-if="orderDetailVo.deliveryMode=='1'">
					<Row>
						<Col span="12" offset="2">送货地：{{orderDetailVo.address}}</Col>
						<Col span="5">收货人：{{orderDetailVo.userName}}</Col>
						<Col span="5">手机号：{{orderDetailVo.phone}}</Col>
					</Row>
					<Row>
						<Col span="5" offset="14">开单员：</Col>
						<Col span="5">司机：</Col>
					</Row>
				</div>
				<Row>
					<Col span="5" offset="14">财务签章：</Col>
					<Col span="5">客户签章：</Col>
				</Row>
				<hr/>
				<Row class="rowFoot">
					<Col span="5" offset="14">交货人：</Col>
					<Col span="5">收货人：</Col>
				</Row>
			</div>
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
				shopName:'',
				buyerName:'',
				orderNo: null,
				billStatus: '',
				billInfo: '',
				totalAmount:0,
				totalArea:0,
				FinalData:0,
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
				],
				tableHead:[
					'客户标注',
					'加工尺寸',
					'件数',
					'面积(m²)',
					'附加要求',
					'单价',
					'金额',
					'打孔',
					'挖角',
					'加工费',
				],
			}
		},
		methods: {
			//加载发票信息
			// getBillinfo(Id) {
			// 	axios.get('/bill/billInfo?billId=' + Id).then(
			// 		response => {
			// 			let res = JSON.parse(response.request.response);
			// 			// console.log(res)
			// 			if (res.code == '200') {
			// 				this.billInfo = res.data
			// 			}
			// 		}
			// 	)
			// },
			//获取成功
			orderDetailSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res);
				if (res.code == '200') {
					this.orderDetailGoodsVos = res.data.orderDetailGoodsVos;
					this.orderDetailVo = res.data.orderDetailVo;
					this.billStatus = res.data.orderDetailVo.billStatus;
					this.shopName = res.data.orderDetailGoodsVos[0].shopName;
					this.FinalData = res.data.orderDetailGoodsVos[0].postdata;
					this.buyerName = res.data.orderDetailVo.loginName;
					//有发票信息
					// if (this.billStatus == '1') {
					// 	let billId = res.data.orderDetailVo.billId;
					// 	this.getBillinfo(billId)
					// }
					this.TotalAmount();//计算总件数
					this.TotalArea();//计算总面积
				}
			},
			//操作订单
			operateBtn: function (No, Status) {
				let data = {
					orderNo: No,
					status: Status
				};
				// console.log(data);
				axios.post('/order/modifySellerStatus', qs.stringify(data)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success('修改成功！');
							axios.get('/order/orderDetail?orderNo=' + this.orderNo).then(this.orderDetailSucc);
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
							setTimeout(() => {
								this.$router.push('/salerInfo/ROrder')
							}, 1000)
						}
					}
				)
			},
			//打印
			printClick(){
				let subOutputRankPrint = document.getElementById('printContent');
				let newContent =subOutputRankPrint.innerHTML;
				// let oldContent = document.body.innerHTML;
				document.body.innerHTML = newContent;
					window.print();
					window.location.reload();
				// document.body.innerHTML = oldContent;
				return false;
			},
			//小计件数
			Allamount(data){
				let All=0;
				for (let i=0;i<data.length;i++){
					All += data[i].amount
				}
				return All;
			},
			//小计面积
			Allarea(data){
				let All=0;
				for (let i=0;i<data.length;i++){
					All += parseFloat(((data[i].area)/1000000).toFixed(3));
				}
				return All;
			},
			//小计金额
			Allmoney(data){
				let All=0;
				for (let i=0;i<data.length;i++){
					All += data[i].money
				}
				return All;
			},
			//小计打孔
			Allhole(data){
				let All=0;
				for (let i=0;i<data.length;i++){
					All += data[i].hole
				}
				return All;
			},
			//小计挖角
			Alltop(data){
				let All=0;
				for (let i=0;i<data.length;i++){
					All += data[i].top
				}
				return All;
			},
			//小计加工费
			Allprocess(data){
				let All=0;
				for (let i=0;i<data.length;i++){
					All += data[i].process
				}
				return All;
			},
			//总计件数
			TotalAmount(){
				let FirstData =0;
				let First = this.orderDetailGoodsVos;
				for(let i=0;i<First.length;i++){
					let SecondData=0;
					let Second = this.orderDetailGoodsVos[i].goodsDetailVos;
					for (let j=0;j<Second.length;j++){
						SecondData += parseFloat(Second[j].amount);
					};
					FirstData += SecondData
				};
				this.totalAmount = FirstData;
			},
			//总面积数
			TotalArea(){
				let FirstData =0;
				let First = this.orderDetailGoodsVos;
				for(let i=0;i<First.length;i++){
					let SecondData=0;
					let Second = this.orderDetailGoodsVos[i].goodsDetailVos;
					for (let j=0;j<Second.length;j++){
						SecondData += parseFloat(((Second[j].area)/1000000).toFixed(3));
					};
					FirstData += SecondData
				};
				this.totalArea = FirstData;
			},
			//查看图纸
			ckeckPic(img){
				this.picUrl = img;
				this.picCheck =true
			},
		},
		created() {
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
		},
	}
</script>

<style scoped>
	#printContent{
		width: 800px;
	}
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
		margin: 15px 0px 15px 20px;
		border-left: 2px #e71818 solid;
		font-size: 16px;
		padding-left: 10px;
		font-weight: bold;
		overflow: hidden;
		height: 31px;
		line-height: 31px;
	}
	.print{
		float: right;
		margin-right: 20px;
		height: 30px;
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
	.listALL li:last-child {
		width: 160px;
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
	.tableData{
		width: 100%;
		border:1px solid #666;
	}
	.Table{
		width: 100%;
		/*border:1px solid #666;*/
		border-collapse: collapse;
		text-align: center;
	}
	.Table tr td{
		border:1px solid #666;
	}
	.tHead{
		font-weight: bold;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.Table tr td:first-child{
		width: 18%;
	}
	.Table tr td:nth-child(2){
		width: 15%;
	}
	.Table tr td:nth-child(3){
		width: 5%;
	}
	.Table tr td:nth-child(4){
		width: 8%;
	}
	.Table tr td:nth-child(5){
		width: 15%;
	}
	.Table tr td:nth-child(6){
		width: 10%;
	}
	.Table tr td:nth-child(7){
		width: 10%;
	}
	.Table tr td:nth-child(8){
		width: 5%;
	}
	.Table tr td:nth-child(9){
		width: 5%;
	}
	.printFoot{
		height: 30px;
		line-height: 30px;
	}
	.rowFoot{
		margin-top: 10px;
	}

</style>
