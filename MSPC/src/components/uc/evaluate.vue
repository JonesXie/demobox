<template>
	<div>
		<div class="orderHead">
			<p>商品评价</p>
		</div>
		<div class="order_name">
			<Row type="flex" justify="start" class="code-row-bg">
				<Col span="8">订单编号 : {{resp}}</Col>
				<Col span="8">时间 : {{time}}</Col>
			</Row>
		</div>
		<div class="prode" v-for="(ind,val) in info" :key="val">
			<div class="prode_left">
				<div class="prode_left_img">
					<img :src="`${host2}${ind.picUrl}`">
				</div>
				<div class="prode_left_name">{{ind.combinate}}</div>
				<div class="prode_left_name" style="color:#ff0000"><strong> ¥ : {{ind.price*ind.amount}}</strong></div>
			</div>
			<div class="prode_right">
				<div class="prode_right_p">{{ind.orderTime}}</div>
				<div class="prode_right_p">商品与描述相符 <span style="color:#ff0000"
														 v-if="ind.rate_derc!=0">{{ind.rate_derc}}</span></div>
				<div style="margin-left:5px">
					<Rate v-model="ind.rate_derc"/>
				</div>
				<div class="prode_right_text"><Input v-model="ind.textarea" type="textarea"
													 :autosize="{minRows: 4,maxRows: 4}"/></div>
				<div class="prode_right_update">
					<div class="prode_right_update_left">
						<Upload :format="['jpg','jpeg','png']" :on-success="successimg" :max-size="2048"
								:before-upload="stopUpdate"
								:action="action"
								style="display: inline-block;width:40px;;height:40px;border:1px dashed #ccc">
							<div style="width: 40px;height:40px;line-height: 40px;" @click="getitem(val)">
								<Icon type="ios-camera" size="20"></Icon>
							</div>
						</Upload>
					</div>
					<div class="prode_right_update_right">
						<ul>
							<li v-for="(iindex,intm) in ind.imgs" :key="intm" class="posttions">
								<img :src="iindex">
								<div class="postabs"><img src="@/assets/img/del.png" style="width:16px;height:16px"
														  @click="removeImg(intm)"></div>
							</li>
						</ul>
					</div>
				</div>
				<div class="prode_right_p" style="height:35px;line-height:35px"> 卖家服务态度
					<Rate v-model="ind.rate_serv"/>
				</div>
				<div class="prode_right_p" style="height:20px;line-height:20px"> 卖家物流速度
					<Rate v-model="ind.rate_fast"/>
				</div>
			</div>

		</div>
		<div class="sumbit">
			<Button type="primary" style="width:120px" size="large" @click="submitData">发表</Button>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'

	export default {
		data() {
			return {
				info: [],
				resp: '',
				time: '',
				action: this.host + '/upload/uploadFile',
				items: ""
			}
		},
		methods: {
			getitem(e) {
				this.items = e;
			},
			successimg(resp) {
				this.info[this.items].imgs.push(resp.data)
			},
			stopUpdate() {
				if (this.info[this.items].imgs.length >= 5) {
					this.$Message.error('最多上传五张图片')
					return false
				}
			},
			removeImg(e) {
				this.info[this.items].imgs.splice(e, 1);
			},
			init() {
				this.$http.get('/order/appraiseInfo?orderId=' + this.$route.query.orderNo).then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
						let mapdata = resp.data.map((a, c) => {
							let object = {}
							object.amount = a.amount;
							object.combinate = a.combinate;
							object.memid = a.memid;
							object.orderGoodsId = a.orderGoodsId;
							object.orderTime = a.orderTime;
							object.orderid = a.orderid;
							object.picUrl = a.picUrl;
							object.price = a.price;
							object.imgs = [];
							object.productskuid = a.productskuid;
							object.productspuid = a.productspuid;
							object.shopId = a.shopId;
							object.textarea = '请输入商品评价'
							object.rate_derc = 5;
							object.rate_serv = 5;
							object.rate_fast = 5;
							return object
						})
						this.info = mapdata
						this.time = mapdata[0].orderTime
					}
				})
			},
			submitData() {
				let obj = []
				this.info.forEach((b, c) => {
					if (b.textarea == '请输入商品评价') {
						this.$Message.error('请输入商品评价')
                    }else if (b.rate_derc.length>60) {
						this.$Message.error('请输入商品评价字符不超过60个字')
					} 
                    else if (b.rate_derc == 0) {
						this.$Message.error('请检查对于店铺描述评分')
					} else if (b.rate_serv == 0) {
						this.$Message.error('请检查对于店铺服务评分')
					} else if (b.rate_fast == 0) {
						this.$Message.error('请检查对于店铺物流评分')
					} else {
						obj.push(b)
					}
				})
				let av = obj.map((a, b) => {
					let avi = {}
					avi.orderGoodsId = a.orderGoodsId;
					avi.orderid = this.$route.query.orderNo;
					avi.memid = JSON.parse(sessionStorage.MEMBER).id;
					avi.shopId = a.shopId;
					avi.productspuid = a.productspuid;
					avi.productskuid = a.productskuid;
					avi.elevel = 5;
					avi.appraisegoods = a.textarea;
					avi.appraiseservice = ' ';
					avi.pics = a.imgs;
					avi.describematch = a.rate_derc;
					avi.sellerservice = a.rate_serv;
					avi.logisticsservice = a.rate_fast;
					avi.appraiseuserid = JSON.parse(sessionStorage.MEMBER).id;
					avi.isagain = '0';
					avi.orderNo = this.$route.query.spes;
					avi.anonymityflag = '0';
					return avi
				})
				this.$http.post('/order/orderAppraise', av).then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
						this.$Message.success('评价成功')
					//	setInterval(() => {
							this.$router.push('/buyCenter/allorders')
					//	}, 300)
					}
				})
			}

		},
		mounted() {
			this.init()
			this.resp = this.$route.query.spes
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

	.prode {
		width: 99%;
		margin: 0 auto;
		min-height: 330px;
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #ccc
	}

	.order_name {
		font-size: 15px;
		text-indent: 30px;
		line-height: 45px;
		height: 45px;
		background: #f1f1f1;
		width: 100%;
		margin: 0 auto
	}

	.prode_left {
		width: 270px;
		float: left;
		border-right: 1px solid #ccc;
		height: 175px;
		margin-top: 35px
	}

	.prode_left_img {
		width: 105px;
		height: 115px;
		line-height: 115px;
		margin: 0 auto;
		border: 1px solid #f1f1f1;
		text-align: center
	}

	.prode_left_img img {
		width: 100px;
		height: 110px;
	}

	.prode_left_name {
        overflow: hidden;
		width: 80%;
        margin:0 auto;white-space: nowrap;text-overflow: ellipsis;
		text-align: center;
		height: 25px;
		line-height: 25px;
		color: #666;
		font-size: 14px
	}

	.prode_right {
		width: 610px;
		background: #fff;
		float: left;
		margin-left: 20px;
		min-height: 280px;
		margin-top: 20px
	}

	.prode_right_p {
		width: 610px;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		color: #999;
		text-indent: 10px
	}

	.prode_right_text {
		width: 610px;
		height: 95px;
		overflow: hidden;
	}

	.prode_right_update {
		width: 610px;
		height: 55px;
		border-bottom: 1px solid #ccc;
		line-height: 55px;
		overflow: hidden;
	}

	.prode_right_update_left {
		width: 40px;
		height: 40px;
		margin-top: 7px;
		float: left;
		line-height: 40px;
		text-align: center;
	}

	.prode_right_update_left img {
		width: 40px;
		height: 40px;
	}

	.prode_right_update_right {
		width: 500px;
		height: 40px;
		margin-left: 50px;
		margin-top: 7px;
	}

	.prode_right_update_right ul li {
		width: 40px;
		height: 40px;
		float: left;
		margin-left: 10px;
		cursor: pointer;
	}

	.prode_right_update_right ul li img {
		width: 40px;
		height: 40px;
	}

	.posttions {
		position: relative;
	}

	.prode_right_update_right ul li:hover .postabs {
		display: block
	}

	.postabs {
		position: absolute;
		display: none;
		width: 100%;
		height: 100%;
		text-align: center;
		background: rgba(0, 0, 0, 0.5);
		left: 0;
		top: 0;
		vertical-align: middle
	}

	.sumbit {
		width: 100%;
		height: 50px;
		margin-top: 15px;
		text-align: center;
	}

</style>
