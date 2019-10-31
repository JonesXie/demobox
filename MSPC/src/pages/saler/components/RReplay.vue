<template>
	<div class="rReplay">
		<div class="replayHead">
			<p>评价回复</p>
		</div>

		<div class="replayContent">
			<div class="new" v-if="JSON.stringify(replayShow) != '{}'">
				<h2>买家：
					<span style="color: red;font-weight: bold">{{replayShow.loginName}}</span>
					对您的商品做出了评价
				</h2>
				<div class="newAsk">
					<img src="@/assets/img/dot1.png" alt="" class="askL">
					<div class="ask">
						<p class="askHead">订单号：{{replayShow.orderNo}}&#12288 商品名：{{replayShow.goodsName}}</p>
						<div class="askRate">
							<div class="desRate">商品与描述相符
								<Rate allow-half :value=parseFloat(replayShow.describeMatch) disabled class="rate01"/>
							</div>
							<div class="desRate">卖家服务态度
								<Rate allow-half :value=parseFloat(replayShow.logisticsService) disabled class="rate"/>
							</div>
							<div class="desRate">买家物流速度
								<Rate allow-half :value=parseFloat(replayShow.sellerService) disabled class="rate"/>
							</div>
						</div>
						<p class="askR">{{replayShow.appraiseGoods}}</p>
						<p class="askTime">{{replayShow.appraiseTime}}</p>
					</div>
					<div class="askIMG">
						<img :src="`${replayShow.picUrl}`" alt="">
						<p>{{replayShow.goodsName}}</p>
					</div>
				</div>
				<div class="newReplay">
					<img src="@/assets/img/dot2.png" alt="" class="replayL">
					<p class="replayR">回复买家：</p>
					<Input type="textarea" v-model="replyinfo" :rows="5" :autosize="{minRows: 5, maxRows: 5}"
						   placeholder="请输入..." class="replayTxt" :readonly="readOnly"/>
				</div>
				<div class="submitBtn">
					<Button type="error" size="large" @click="submitBtn" v-if="!readOnly">提交</Button>
					<Button type="error" size="large" disabled v-else>已提交</Button>
				</div>
			</div>

			<div class="all">
				<ul class="allHead alllist" v-if="replayList.length > 0">
					<li>所有评价</li>
					<li>买家昵称</li>
					<li>时间</li>
				</ul>
				<div class="bodyWrap">
					<ul class="alllist" v-for="(item,index) in replayList" :key="index">
						<li>{{item.appraiseGoods}}</li>
						<li>{{item.loginName}}</li>
						<li v-for="(items,indexs) in item.appraiseTime.split(' ')" v-if="indexs == 0">{{items}}</li>
						<li>
							<Button type="info" size="small" @click="replayBtn(index)" v-if="item.is_reply == '0'">回&#12288;复</Button>
							<Button type="info" size="small" @click="changeID(index,item.iD)" v-else>已回复</Button>
						</li>
					</ul>
				</div>
				<div class="showbodys" v-if="replayList.length <= 0">暂无数据</div>
				<Page :total="pageTotal" class="Pages" @on-change="pageChange" :current="nowPage"/>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs' //引入qs
	export default {
		name: "RReplay",
		data() {
			return {
				pageTotal: 0,
				replayList: [],
				nowPage:1,
				replyinfo: '',
				readOnly:false,
				showid: 0,
				replayShow: {}
			}
		},
		methods: {
			//列表获取
			appraiseSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res);
				if (res.code == '200') {
					let data = res.data;
					this.pageTotal = data.total;
					this.replayList = data.list;
					if (data.list.length > 0) {
						this.replayShow = data.list[0];
						this.getReplay(data.list[0].iD);
					}
				}
			},
			//页码变化
			pageChange: function (currentpage) {
				this.nowPage = currentpage;
				this.getPage();
			},
			//获取当前页数数据
			getPage(){
				axios.get('/saler/appraise/', {params: {page: this.nowPage}}).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.replayList = res.data.list;
						}
					}
				);
			},
			//评价数据提交
			submitBtn: function () {
				this.$Spin.show({
					render: (h) => {
						return h('div', [
							h('Icon', {
								'class':'Iconrotation',
								props: {
									type:'ios-refresh-circle',
									size: 60
								}
							}),
							h('div',{
								style:{
									fontSize:'20px',
									marginTop:'10px'
								}
							}, '数据提交中请稍后……')
						])
					}
				});//加载转圈样式
				let updata = {
					orderid: this.replayShow.orderGoodsId,
					salerid: this.replayShow.salerid,
					replyinfo: this.replyinfo,
					orderAppraiseId: this.replayShow.iD,
				};
				axios.post('/order/orderAppraiseReply', qs.stringify(updata)).then(
					response => {
						let res = JSON.parse(response.request.response);
						// console.log(res);
						if (res.code == '200') {
							this.$Spin.hide();
							this.$Message.success('回复成功！');
							this.readOnly = true;
							this.getPage();
						}else {
							this.$Spin.hide();
							this.$Message.error('回复失败！')
						}
					}
				);
			},
			//评价回复按钮
			changeID: function (index, id) {//已回复
				this.replayShow = this.replayList[index];//显示转到点击的ID上
				this.getReplay(id);
			},
			//获取商家评价回复
			getReplay(id){
				axios.get('/saler/appraiseReply/' + id).then(
					response => {
						let res = JSON.parse(response.request.response);
						// console.log(res)
						if (res.code == '200') {
							if (res.data != null) {
								this.readOnly = true;
								this.replyinfo = res.data.replyInfo
							}
						}
					}
				);
				document.body.scrollTop = document.documentElement.scrollTop = 180;
			},
			replayBtn(index) {//第一次回复
				this.replayShow = this.replayList[index];//显示转到点击的ID上
				// console.log(this.replayShow)
				document.body.scrollTop = document.documentElement.scrollTop = 180;
			}
		},
		mounted: function () {
			axios.get('/saler/appraise').then(this.appraiseSucc);
			let orderNo = this.$route.params.orderNo;
			if(orderNo != undefined && orderNo != null && orderNo != ''){
				axios.get('/saler/appraise?orderNo='+orderNo).then(
					response=>{
						let res = JSON.parse(response.request.response);
						// console.log(res);
						if (res.code == '200') {
							this.replayShow = res.data.list[0];
							this.getReplay(res.data.list[0].iD);
						}
					}
				);
			}
		}
	}
</script>

<style scoped>
	.replayHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.replayHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.replayContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 30px 0 30px 0;
	}

	.new {
		margin-left: 50px;
	}

	.newAsk, .newReplay {
		padding-top: 20px;
		margin-left: 70px;
		border-left: 2px solid #3c3c3c;
		position: relative;
		top: 0;
		left: 0;
		width: 85%;
	}

	.askL {
		position: absolute;
		left: -11px;
		width: 20px;
		height: 20px;
	}

	.ask {
		padding-left: 20px;
		width: 70%;
		display: inline-block;
	}

	.askHead {
		font-size: 16px;
		color: #000;
	}

	.askR {
		font-size: 16px;
		color: #000;
	}

	.askRate {
		margin: 6px 0;
	}

	.rate {
		margin-left: 32px;
	}

	.rate01 {
		margin-left: 20px;
	}

	.askIMG {
		float: right;
		text-align: center;
		width: 30%;
	}

	.askIMG img {
		width: 100px;
		height: 100px;
	}

	.replayR {
		font-size: 16px;
		margin-left: 20px;
		color: #000;
		display: inline-block;
	}

	.askTime {
		display: inline-block;
		margin-top: 10px;
		color: #3c3c3c;
	}

	.replayL {
		position: absolute;
		top: 20px;
		left: -11px;
		width: 20px;
		height: 20px;
	}

	.replayTxt {
		display: inline-block;
		vertical-align: top;
		padding: 0;
		font-size: 16px;
		width: 70%;
	}

	.submitBtn {
		width: 58%;
		margin: 10px auto 0;
		text-align: right;
	}

	.all {
		width: 92%;
		margin: 40px auto 0;
		overflow: hidden;
	}

	.allHead {
		background-color: #f1f1f1;
		height: 36px;
		line-height: 36px;
		width: 100%;
		font-size: 16px;
	}

	.alllist li {
		float: left;
		width: 100px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.alllist li:first-child {
		width: 57%;
		text-align: left;
		margin-left: 10px;
	}

	.alllist li:nth-child(2) {
		width: 18%;
	}

	.bodyWrap {
		overflow: hidden;
	}

	.bodyWrap ul {
		height: 50px;
		line-height: 50px;
		width: 100%;
		font-size: 14px;
		padding-bottom: 10px;
		border-bottom: 1px solid #c3c3c3;
	}

	.Pages {
		margin: 10px auto;
		text-align: center;
	}

	.showbodys {
		font-size: 18px;
		width: 100%;
		text-align: center;
		margin: 10px 0;
	}

</style>
