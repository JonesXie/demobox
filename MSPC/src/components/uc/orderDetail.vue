<template>
	<div class="oders">
		<div class="oders_center">
			<div class="oders_center_top">
				确认订单
			</div>
			<div class="oders_center_local">
				<div class="oders_center_local_top">
					<p><span class="spans">| </span> 收货地址 <span class="fr" style="color:#199ed8;cursor:pointer"
																@click="addLocalFn">+新增收货地址</span></p>
				</div>
				<div class="oders_center_local_ul">
					<ul>
						<li v-for="(val,ins) in localdata" :key="ins">
							<div style="width:100%;height:100%;overflow:hidden" :class="{bgxingzhuang:val.isDefault==1}"
								 @click.prevent="setDefault(val.id,ins)">
								<div class="loacl_datal">
									<div class="loca_home"><span style='font-size:20px;color:#ec4848'>
											<Icon type="md-home"/></span> {{val.userName}} &nbsp; <span
										style="font-size:12px">{{val.countyName}}</span>
										<span class="fr"> <Button size="small" type="primary"
																  @click.stop="getLocalInfo(val.id)">编辑</Button></span></div>
									<p>{{val.phone}}</p>
									<p>{{val.addressName}}</p>
									<P>{{val.address}}</P>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="oders_center_local" style="margin-top:12px;height;auto;">
				<div class="oders_center_local_top">
					<p><span class="spans">| </span> 商品清单 <span class="fr" style="color:#199ed8;cursor:pointer">
							<router-link to="/shop">返回购物车</router-link>
						</span></p>
				</div>
				<div v-for="(vala,inxa) in shopdata" :key="inxa" v-if="vala.length!=0">
					<div class="oders_center_local_topw" style="height:auto;overflow:hidden ;" v-for="(val,inx) in vala"
						 :key="inx">
						<div class="oders_center_local_datal_top">
							<div class="oders_center_local_top"
								 style="height:50px;line-height:29px;font-size:14px;margin-top:5px">
								<Row type="flex" justify="start" class="code-row-bg">
									<Col span="15">
										<p><strong>商家 : {{val.shopname}}
											<Button size="small" type="error" @click="exchangeShops(inxa,inx)">更换商家
											</Button>
										</strong></p>
										<p>{{val.combinate}}</p>
									</Col>
									<Col span="8">
                                        <span style=" margin-top: 20px;display: block;" v-if='val.checked==false'> <Button
											type="info" size="small"
											@click="computedTime(inx,inxa)">点击查看发货时间</Button> </span>
										<span style=" margin-top: 20px;display: block;" v-else>{{val.checked}}</span>
									</Col>
								</Row>
							</div>
						</div>
						<div class="oders_center_local_topw">
							<div class="oders_center_local_top" style="height:45px;line-height:50px;font-size:14px">
								<Row type="flex" justify="start" class="code-row-bg">
									<Col span="2">操作</Col>
									<Col span="2">客户标注</Col>
									<Col span="6">尺寸</Col>
									<Col span="1">片数</Col>
									<Col span="2" style="text-align:center">面积(㎡)</Col>
									<Col span="2" style="text-align:center">金额</Col>
									<Col span="7">交货期限</Col>
									<Col span="1">加工费</Col>
									<Col span="2">
									</Col>
								</Row>
							</div>
						</div>
						<div class="oders_center_local_datal_btom" style="padding:0px 10px"
							 v-for="(vals,inxs) in val.goodsVos" :key="inxs">
							<Row type="flex" justify="start" class="code-row-bg">
								<Col span="2"><span class="fl dis" style="color:#199ed8"
													@click="addList(inx,inxa)">+</span> <span class="fr dis "
																							  style="color:#ff0000;margin-right:15px"
																							  @click="lessList(inx,inxs,inxa)">-</span>
								</Col>
                    		<Col span="2"><Input size="small" style="width:80px" v-model="vals.customno"/></Col>
								<Col span="6" style="text-align:center">
                               <div v-if="vals.size==null||vals.size=='undefinde' ||vals.size==''">
                                        <span class="fl inpoutdis">长{{vals.size}} : <Input size="small" v-model.trim="vals.chang" 											                       
																		  style="width:80px"/> mm</span>
							            <span class="fl inpoutdis">宽 : <Input size="small" v-model.trim="vals.kuan"  style="width:80px" /> mm</span>                          
                               </div>
                               <div v-else-if="vals.size.split(',').length==2">
                                        <span class="fl inpoutdis">长 : <Input size="small" v-model.trim="vals.chang" 											                       
																		  style="width:80px"/> mm</span>
							          <span class="fl inpoutdis">宽 : <Input size="small" v-model.trim="vals.kuan"  style="width:80px" /> mm</span>                          
                               </div>
                                <div v-else-if="vals.size.split(',').length==4">
                                    <span class="fl inpoutdis">长 : <Input size="small" v-model.trim="vals.chang" :maxlength="vals.size.split(',')[3].length"
																	      @on-blur="inputLengthFn(vals.chang,vals.size.split(',')[1],'change',vals.size.split(',')[3])"                     
																		  style="width:80px"/> mm</span>
							       <span class="fl inpoutdis">宽 : <Input size="small" v-model.trim="vals.kuan"
																		  style="width:80px" :maxlength="vals.size.split(',')[2].length"
							        @on-blur="inputLengthFn(vals.kuan,vals.size.split(',')[0],'kuan',vals.size.split(',')[2])"/> mm</span>                           
                               </div>  
                                    <!-- <span class="fl inpoutdis">长{{vals.size}} : <Input size="small" v-model="vals.chang" :maxlength="vals.size.split(',')[2].length"
																	      @on-blur="inputLengthFn(vals.chang,vals.size.split(',')[0],'change',vals.size.split(',')[2])"                     
																		  style="width:80px"/> mm</span>
							       <span class="fl inpoutdis">宽 : <Input size="small" v-model="vals.kuan"
																		  style="width:80px" :maxlength="vals.size.split(',')[3].length"
							        @on-blur="inputLengthFn(vals.kuan,vals.size.split(',')[1],'kuan',vals.size.split(',')[3])"/> mm</span>  
                        -->
                            	</Col>
								<Col span="1"><Input size="small" v-model="vals.amount"  @on-blur="minamout(vals.amount)" :maxlength="5"/></Col>
								<Col span="2" style="color:#ff0000;text-align:center">
									{{((vals.chang*vals.kuan*vals.amount)/1000000).toFixed(2)}}
								</Col>
								<Col span="2" style="text-align:center">
									{{Number(((vals.chang*vals.kuan*vals.amount*vals.price)/1000000+(vals.hole*vals.holePrice)+(vals.top*vals.topPrice)).toFixed(2))}}
								</Col>
								<Col span="6">
									<div v-if="vals.checked">
										<Row type="flex" justify="center" class="code-row-bg">
											<Col span="6">
												<Upload
													:on-success="imgsuccess"
													:action="action"
													:show-upload-list="false">
													<Button style="width:68px;padding:2px 8px"
															@click="imgIndex(inxa,inx,inxs)">上传图纸
													</Button>
												</Upload>
											</Col>
											<Col span="9">
												<Poptip trigger="focus" :content="`单个打孔价格 :${vals.holePrice}`">
													<Input style="width:100px;margin-top:8px" size="small"
														   v-model="vals.hole">
														<span slot="prepend">打孔</span>
														<span slot="append">个</span>
													</Input>
												</Poptip>
											</Col>
											<Col span="9">
												<Poptip trigger="focus" :content="`单个挖角价格 :${vals.topPrice}`">
													<Input style="width:100px;margin-top:8px" size="small"
														   v-model="vals.top">
														<span slot="prepend">挖角</span>
														<span slot="append">个</span>
													</Input>
												</Poptip>
											</Col>
										</Row>
									</div>
								</Col>
								<Col span="1" style="text-align:center">
									{{vals.hole*vals.holePrice+vals.top*vals.holePrice}}
								</Col>
								<Col span="2" style="text-align:center">
									<Button size="small" @click="chekedshow(inx,inxs,vals.checked,inxa)">特殊要求</Button>
								</Col>
							</Row>
						</div>
						<div class="odre_fapiao">
							<Row>
								<Col span="8">
									<Row type="flex" justify="end" class="code-row-bg">
										<Col span="5" style="text-align:center">买家留言</Col>
										<Col span="19"><Input v-model="val.message"/></Col>
									</Row>
								</Col>
								<Col span="6">
									<Row type="flex" justify="end" class="code-row-bg">
										<Col span="8" style="text-align:center">配送方式</Col>
										<Col span="16">
											<Select v-model="val.distributionModel"
													@on-change="distributionModelFn(val.distributionModel,val,inx,inxa)">
												<Option value="0">买家自提</Option>
												<Option value="1" v-if="val.goodsVos[0].diliverFlag">商家配送</Option>
											</Select></Col>
									</Row>
								</Col>
								<Col span="6" style="text-indent:15px;color:#ff0000">
									价格: {{logisticsPriceArr[inxa]}}
								</Col>
							</Row>
						</div>
                        <div  class="noticeclass">
                           <div class="noticeclass_top" >      
                               <!-- 临时用 -->
                              <div v-if="val.goodsVos[0].size.length>12" >
                                   商家:{{val.shopname}}  {{val.combinate}} 尺寸限制 : <span style="color:#f6606c">长度 : {{val.goodsVos[0].size.split(",")[1]}}mm ~ {{val.goodsVos[0].size.split(",")[3]}}mm</span>
                                  &nbsp; <span style="color:#f6606c">宽度 : {{val.goodsVos[0].size.split(",")[0]}}mm ~ {{val.goodsVos[0].size.split(",")[2]}}mm</span>
                               </div>       
                            <!-- <div>{{val.goodsVos[0].size.split(",")[0]}}-{{val.goodsVos[0].size.split(",")[1]}}-{{val.goodsVos[0].size.split(",")[2]}}-{{val.goodsVos[0].size.split(",")[3]}}</div> -->
                           </div>
                           <div class="noticeclass_top noticeclass_mid">
                            预计发货时间:  <span style="color:#199de8" > {{val.time}}</span>
                           </div>
                           <div class="noticeclass_top noticeclass_mid">
                            运费模板:  <span style="color:#f6606c" > {{val.arriveMessage}}</span>
                           </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
		<Modal v-model="exchangemodel" title="修改收货地址信息" @on-ok="submitLocal">
			<div class="exchangeMode">
				<Form v-model="backshow" :label-width="80">
					<FormItem label="收货姓名">
						<Input type="text" v-model="backshow.userName"></Input>
					</FormItem>
					<FormItem label="手机号码">
						<Input type="text" v-model="backshow.phone"></Input>
					</FormItem>
					<FormItem label="详细地址">
						<Input type="text" v-model="backshow.address"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<Modal v-model="addLocaModal" title="添加收货地址">
			<div class="exchangeMode">
				<Form :label-width="80">
					<FormItem label="收货姓名:">
						<Input type="text" style="width: 200px;" v-model="info.userName"></Input>
					</FormItem>
					<FormItem label="地址信息:">
						<Input search enter-button v-model="info.localtion" @on-focus="modelshow"/>
					</FormItem>
					<FormItem label="详细地址:">
						<Input type="textarea" v-model="info.address"/>
					</FormItem>
					<FormItem label="手机号码:" prop="age">
						<Input type="text" style="width: 200px;" v-model="info.phone"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="success" size="large" long @click="saveInfo">添加</Button>
			</div>
		</Modal>
		<Modal v-model="cityCover" title="请选择注册地区" width="350">
			<Scroll height="400">
				<Tree :data="cityData" :load-data="cityLoading" ref="citySelected"
					  @on-select-change="citySelected"></Tree>
			</Scroll>
			<div slot="footer">
				<Button type="success" size="large" :disabled="querendisab" @click="oksend">确认</Button>
			</div>
		</Modal>
		<div class="order_footer">
			<div class="order_fott">
				<div class="prders">
					<div class="order_f_left">
						<div class="order_f_P">{{addressLocal.userName}} &nbsp; &nbsp;{{addressLocal.phone}} <span
							class="fr" style="font-weight:bold">总计
								: <span style="color:#ff0000;font-size:18px">¥ {{orderPrice}}</span></span></div>
						<div class="order_f_P">{{addressLocal.addressName}}&nbsp; &nbsp;{{addressLocal.address}} <span
							class="fr" style="font-weight:bold">物流
								: <span style="color:#ff0000;font-size:18px">¥ {{wuliuPrice}}</span></span></div>
					</div>
					<div class="order_f_righ" >
						
                        <Button type="error" :disabled="enddisab" @click="submitData" style="width:100%;height:100%;border-radius:0;font-size:18px;border:none">提交订单</Button>
					</div>
				</div>
			</div>
		</div> 
		<modals :show="showmoadl" :combinates="showcombinate" :showshopid="showshopid" :goodsTypeId="goodstypeid"
				@childByValue="getchiilddata" ></modals>
	</div>
</template>
<script>
	import qs from 'qs'
	import modals from './modal/exchangeShop.vue'

	export default {
		data() {
			return {
				imgindex1: '0',
				imgindex2: '0',
				imgindex3: '0',
				action: this.host + '/fastdfs/upload/file/sample',
				showmoadl: false,
                detailData: [],
                enddisab:false,
				fapiaoModal: false,
				itemone: '0',
				laiyuan: 1,
				itemtwo: '0',
				logisticsPriceArr: [],
                showshopid: '',
                goodstypeid:'',
				showcombinate: '',
				allShop: [],
				exchangezuhe: '',
				exchangeShopData: [],
				shopindex: 0,
				shoplistData: [],
				passPrice: 0,
				wuliuPrice: 0,
				getProductType: '0',
				localdata: [],
				fapiaosingle: false,
				hehe: false,
				shopdata: [],
				exchangemodel: false,
				addressLocal: [],
				backshow: {},
				cityData: [],
				addFapiao: false,
				querendisab: true,
				addLocaModal: false,
				cityCover: false,
				info: {
					localtion: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					userName: '',
					address: '',
					phone: '',
					code: ''
				}
			}
		},
		components: {
			modals
		},
		watch: {
			shopdata: {
				handler(val, oldVal) {
					let everyPrice = []
					val.forEach((b, c) => {
						b.forEach((e, f) => {
							e.goodsVos.forEach((h, i) => {
								everyPrice.push(((h.chang * h.kuan * h.amount * h.price) / 1000000 + h.hole * h.holePrice + h.top * h.topPrice))
									.toFixed(2)
							})
						})
					})
					let passeveryPrice = everyPrice.reduce((prev, next) => {
						return prev + next
					});
					this.passPrice = Number(passeveryPrice).toFixed(2);
				},
				deep: true
			},
			logisticsPriceArr: function () {
				return this.wuliuPrice = this.logisticsPriceArr.reduce((prev, next) => {
					return prev + next
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
			},
			'orderPrice': function () {
				return (Number(this.passPrice) + Number(this.wuliuPrice)).toFixed(2)
			}
		},
		methods: {
            // 图片上传
			imgsuccess(resp) {
				if (resp.httpUrl != '') {
					this.$Notice.success({
						title: '文件上传成功',
						desc: `文件名称${resp.httpUrl}`,
						duration: 2
					});
					(this.shopdata[this.imgindex1])[this.imgindex2].goodsVos[this.imgindex3].imgurl = `http://${resp.httpUrl}`
				} else {
					(this.shopdata[this.imgindex1])[this.imgindex2].goodsVos[0].imgurl = ''
				}
            },
             // 图纸上传
			imgIndex(a, v, i) {
			     	this.imgindex1 = a,
					this.imgindex2 = v,
					this.imgindex3 = i
			},
		   // 输入尺寸限制
			inputLengthFn(e,v,name,max) {
               let ei=Number(e);
               let vi=Number(v);
               let maxi=Number(max)
              if(name=='change'){
                   if (ei < vi) {                      
                      this.$Message.error(`最小长度不能小于${vi}`)              
			      } else if(ei>maxi){
                       
                      this.$Message.error(`最大长度不能大于${maxi}`)
                 }else{ 
                      return false
                 }
               }
             else{
                  if (ei< vi) {           
                      this.$Message.error(`最小宽度不能小于${vi}`)              
			      } else if(ei>maxi){
                      this.$Message.error(`最大宽度不能大于${maxi}`)
                 }else{
                      return false
                 }
             }
            },
            // 检查数量
            minamout(e){
                  let amout=parseInt(e)
                  if(amout<1){
                      this.$Message.error('最小数量不等小于 1')
                  }
            },
            // 计算基础运费
			distributionModelFn(e, id, item,ev) {
                if (this.addressLocal.id != undefined){
                if (e == 1) {     
                          let obj=[]    
                           let dars= (this.shopdata[ev]).forEach((d,f)=>{
                                d.goodsVos.map((a,c)=>{                              
                                 obj.push(a.chang*a.kuan*a.amount)              
                                return obj
                            })   
                         })          
            
                   let orderNumbers = obj.reduce((prev, next) => {
						return prev + next
                    })
					let _data = {
						shopId: id.shopid,
                        addressId: this.addressLocal.id,
                        orderNumber:orderNumbers
                    }
					this.$http.post('/order/deliveryFee', qs.stringify(_data)).then(res => {
                        let resp = JSON.parse(res.request.response);
						if (resp.code == 200) {
                              (this.shopdata[ev])[0].arriveMessage= `当前基础运费是 ${ resp.data.baseCost},免费配送距离是:${resp.data.radius}km , 若超出免费配送距离每公里:${resp.data.logisee}元,若超过${resp.data.offsetRadius}的平方米的下单量,免基础运费.`	
						      this.logisticsPriceArr.splice(ev, 1, resp.data.deliveryFee)
						}
					})
				} else if (e == 0) {         
                  (this.shopdata[ev])[0].arriveMessage='请选择此店铺的配送方式'
                           this.logisticsPriceArr.splice(ev, 1, '0')
				}
                }else{
                    this.$Message.error('请确认收货地址,才能计算价格!')
                }
            },
            //计算运费时间
			computedTime(e, ev) {
				let arrMianji = [];
				(this.shopdata[ev])[e].goodsVos.forEach((va, ind) => {
                 
					arrMianji.push((this.shopdata[ev])[e].goodsVos[ind].chang * (this.shopdata[ev])[e].goodsVos[ind].kuan * (this.shopdata[
						ev])[e].goodsVos[
						ind].amount)
				})
				let mianji = arrMianji.reduce((prev, next) => {
					return prev + next
				})
				let _data = {
					orderoods: mianji,
					shopId: (this.shopdata[ev])[e].shopid,
					productSPUId: (this.shopdata[ev])[e].goodsVos[0].productspuid == undefined ? (this.shopdata[ev])[e].goodsVos[0].spuId : (this.shopdata[ev])[e].goodsVos[0].productspuid
				}
				if (mianji == 0) {
					this.$Message.error('请输入商品信息')
				} else {
					this.$http.post('/order/getTime', qs.stringify(_data)).then(res => {
                        let resp = JSON.parse(res.request.response);
                   if(resp.code==200){
                       (this.shopdata[ev])[e].time=`${resp.data}`;
                   }else{
                       this.$Message.error(resp.message)
                    }
					})
				}
            },
            // 提交订单
			submitData() {          
                let letgo = false;
                this.enddisab=true;
				this.shopdata.forEach((a, c) => {
					a.forEach((s, b) => {
						s.goodsVos.forEach((u, i) => {                 
							if ( Number(u.chang) < Number(u.size.split(',')[1]) || Number(u.chang) > Number( u.size.split(',')[3])||Number(u.kuan)<  Number(u.size.split(',')[0])||Number(u.kuan)>  Number(u.size.split(',')[2])||u.amount<1) {                            
                                 letgo = false                                            
                            } 
                            else{
                                 letgo = true     
                            }
						})
					})
				})
				if (letgo) {
                    let _data = []
					this.shopdata.forEach((a, v) => {
                        let _pasdata = {} ;                          
                        _pasdata.shopId = a[0].shopid;
                        _pasdata.orderCategory='0';
						_pasdata.orderType = this.laiyuan == 2 ? 1 : 0;
                        _pasdata.message = a[0].message ;
                        _pasdata.distributionModel = a[0].distributionModel ;     
						_pasdata.memId = JSON.parse(sessionStorage.MEMBER).id;
                        _pasdata.addressId = this.addressLocal.id     ; 
                        _pasdata.billId = a[0].billid == 0 ? '' : a[0].billid;                       
						_pasdata.shops = []
						a.forEach((j, k) => {       
							let product = {}
							product.productspus = []
							product.productspuid = j.goodsVos[0].productspuid
							j.goodsVos.map((n, m) => {
								let obj = {}
								obj.memId = JSON.parse(sessionStorage.MEMBER).id;
								obj.shopid = a[0].shopid;
								obj.productspuid = n.productspuid;
								obj.productskuid = n.productskuid;
								if (n.checked) {
									obj.specialRequirements = 0
								} else if (n.checked == false) {
									obj.specialRequirements = 1
								}
								obj.hole = n.hole;
								obj.top = n.top;
								obj.chang = n.chang;
								obj.kuan = n.kuan;
								obj.imgurl = n.imgurl;
								obj.amount = n.amount;
								obj.customno = n.customno;
								obj.message = a.message;
								obj.distributionModel = a[0].distributionModel;
								obj.combinate = n.combinate
								obj.billStatus = '0';
								product.productspus.push(obj)
							})
							_pasdata.shops.push(product)
						})
						_data.push(_pasdata)
					})
                    let distribution = false;             
					_data.forEach((me, pe) => { 
					if (me.distributionModel == undefined) {
							distribution = false
							this.$Message.error('请填写运送方式!')
						} else {
							distribution = true
						}
					})
					if (distribution) {
                      
						if (this.addressLocal.id != undefined) {
							this.$http.post('/order/placeOrderByCar', _data, {headers: {"Content-Type": "application/json"}}).then(res => {
                                let resp = JSON.parse(res.request.response)            
								if (resp.code == 200) {
									this.$Notice.success({
										title: '进去付款页面'
									});
									this.$http.post('/order/reqsn', resp.data.orderIdList, {headers: {"Content-Type": "application/json"}}).then(ress => {
                                        let along = JSON.parse(ress.request.response)
                                       // 更新购物车数据
                                         sessionStorage.setItem("addlist", 1);
                                         this.$store.commit('setAdd', 1);
                                         
										this.$router.push({
											name: 'pay',
											query: {
												data: resp.data.orderIdList,
												reqsn: along.data
											}
										})
									})
								} else {
                                    this.$Message.error(resp.message)
                                      this.enddisab=false
								}
							})
						} else {
                            this.enddisab=false
							this.$Message.error('请填写收货地址')
						}
					}
                } 
                else {
                     this.$Message.error('商品参数填写不正确')
                      this.enddisab=false
				}
            },
        // 获取子组件的数据, 更换商家
			getchiilddata(res) {
                  console.log(res);
				 this.showmoadl = res.childcombinate
				if (res.info.salePrice == undefined) {   
					return false
				} else {
					if (res.id != (this.shopdata[this.itemone])[this.itemtwo].shopid) {
						let newgoodVos = (this.shopdata[this.itemone])[this.itemtwo].goodsVos.map((index, item) => {
                            let objict = {}
							objict.price = res.info.price;
							objict.holePrice = res.info.holePrice;
							objict.topPrice = res.info.topPrice;
							objict.skuId = res.info.skuId;
							objict.shopId = res.info.shopId;
							objict.spuId = res.info.spuId;
							objict.amount = index.amount;
                            objict.chang = index.chang;
                            objict.productspuid=index.productspuid;
                            objict.productskuid=index.productskuid;
                            objict.size= index.size;
							objict.checked = index.checked;
							objict.customno = index.customno;
							objict.hole = index.hole;
							objict.kuan = index.kuan;
							objict.top = index.top;
							return objict
                        })        
						let shopdatas = []
						let _data = {
							checked: false,
							combinate: (this.shopdata[this.itemone])[this.itemtwo].combinate,
							shopid: res.id,
                            shopname: res.shopname,
                            goodsTypeId:res.info.goodsTypeId,
							goodsVos: newgoodVos,
                            message: res.message,
                            time : '请先点击商品右侧 发货时间按钮查询',
                            arriveMessage:'请选择此店铺的配送方式',
							distributionModel: res.distributionModel
                        }
                        
                         shopdatas.push(_data);                     
                        this.shopdata[this.itemone].splice(this.itemtwo, 1)                  
                            // 改日修改 老夫在这里面绕晕了
                            /*
                               恭喜你找到这个bug
                             */
                          this.shopdata.splice(this.itemone, 0,shopdatas) 
                          let passshpodata=this.shopdata;
                           passshpodata.forEach((a,v)=>{             
                              if(a.length==0){
                                   passshpodata.splice(v,1)
                              }
                         })
                   } 
                    else {                
						return false
					}
                }
            },
            //更换店铺
			exchangeShops(e, ev) {
				    this.itemone = e;
                    this.itemtwo = ev;    
			 		this.showshopid = (this.shopdata[e])[ev].shopid;
                    this.showcombinate = (this.shopdata[e])[ev].combinate;
                    this.goodstypeid=(this.shopdata[e])[ev].goodsTypeId;
				    this.showmoadl = true
            },
           // 特殊需求 按钮  
			chekedshow(e, v, data, ev) {
				if (data) {
					(this.shopdata[ev])[e].goodsVos[v].checked = false
				} else {
					(this.shopdata[ev])[e].goodsVos[v].checked = true
				}
            },
            // 添加收货地址
			saveInfo() {
				if (this.info.userName == '') {
					this.$Message.error('请填写用户名');
					return false
				} else if (this.info.localtion == '') {
					this.$Message.error('请输入地址');
					return false
				} else if (this.info.address == '') {
					this.$Message.error('请输入详细地址');
					return false
				} else if (!/^1[34578]\d{9}$/.test(this.info.phone)) {
					this.$Message.error('请输入正确的手机号')
					return false
				} else {
					let _data = {
						memid: JSON.parse(sessionStorage.MEMBER).id,
						userName: this.info.userName,
						phone: this.info.phone,
						code: '666',
						addressName: this.info.localtion,
						provinceId: this.info.provinceId,
						cityId: this.info.cityId,
						countyid: this.info.countyId,
						address: this.info.address
					}
					this.$http.post('/user/address/addAddress', qs.stringify(_data)).then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 200) {
							this.$Message.success(response.message)
							this.info = {}
							this.getLocalList(1)
						} else {
							this.$Message.error(response.message)
						}
						this.addLocaModal = false
					})
				}
            },
            // 军哥代码 不解释 优秀!!!
			modelshow() {
				this.cityCover = true
			},
			oksend() {
				this.cityCover = false
			},
			areaTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.cityData = res.data
			},
			cityLoading: function (item, callback) {
				let id = item.id;
				this.$http.post('/saler/AreaTree', qs.stringify({parent_id: id})).then(
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
							} else {
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
					let aData = getParent(allData, [], params[i].id); //方法入口在这里
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
					this.querendisab = false
					this.info.localtion = `${arr1[0].title}-${arr1[1].title}-${arr1[2].title}`
					this.info.provinceId = arr1[0].id;
					this.info.cityId = arr1[1].id;
					this.info.countyId = arr1[2].id;
				}
            },
            // 获取地址列表
			getLocalList(e = 0) {
				this.$http.get('/user/address/addressInfo?memid=' + JSON.parse(sessionStorage.MEMBER).id + '&page=' + e + '&size=10')
					.then(res => {
						let response = JSON.parse(res.request.response);
						this.localdata = response.data.list;
						this.localdata.forEach((a, b) => {
							if (a.isDefault == 1) {
								this.addressLocal = this.localdata[b]
							}
						})
					})
			},
			//modal新的显示
			addLocalFn() {
				this.addLocaModal = true
			},
			//设置收货地址
			setDefault(ids, item) {
				let _data = {
					id: ids
                }
             this.$Message.error('您已更换地址,运费模板需要再次手动计算运费')
               this.shopdata.forEach((index,item)=>{
                   index.forEach((a,c)=>{
                       a.distributionModel='0'
                       a.arriveMessage='请选择此店铺的配送方式'
                   })
               })
               this.logisticsPriceArr=['0']
				this.$http.post('/user/address/updateStateById', qs.stringify(_data)).then(response => {
					let res = JSON.parse(response.request.response);
					if (res.code == 200) {
						this.getLocalList(1)
						this.addressLocal = this.localdata[item]
					} else {
						this.$Message.error('设置失败')
					}
				})
			},
			//收货地址显示
			getLocalInfo(id) {
				this.$http.get('/user/address/QueryInfoById?id=' + id).then(res => {
					let response = JSON.parse(res.request.response)
					if (response.code == 200) {
						this.backshow = response.data
						this.exchangemodel = true
					} else {
						this.$Message.error(response.message)
					}
				})
			},
			//确认修改 收货信息
			submitLocal() {
                if(this.backshow.address.length<=20){
                         	let _data = {
					id: this.backshow.id,
					memid: JSON.parse(sessionStorage.MEMBER).id,
					userName: this.backshow.userName,
					phone: this.backshow.phone,
					code: '666',
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
                }else{
                    this.$Message.error('详细地址请勿超过20个字符')
                }	
            },
            // 增加商品数据 
			addList(item, ev) {
                let price = (this.shopdata[ev])[item].goodsVos[0].price
				let holePrice = (this.shopdata[ev])[item].goodsVos[0].holePrice
				let topPrice = (this.shopdata[ev])[item].goodsVos[0].topPrice
				let a = {
					'amount': '',
					'chang': '',
                    'customno': '',
                    'combinate':(this.shopdata[ev])[item].goodsVos[0].combinate,
					'hole': '0',
					'topPrice': topPrice,
                    'imgurl': '',
                     checked: false,
                     'size': (this.shopdata[ev])[item].goodsVos[0].size,
					'productskuid': (this.shopdata[ev])[item].goodsVos[0].productskuid,
					'productspuid': (this.shopdata[ev])[item].goodsVos[0].productspuid,
					'specialRequirements': '1',
					'kuan': '',
					'top': '0',
					'price': price,
					'holePrice': holePrice
				}
				let ab = (this.shopdata[ev])[item].goodsVos
                ab.push(a)
            },
            //删除商品数据
			lessList(item, item2, inxa) {
				if (item2 != 0) {
					(this.shopdata[inxa])[item].goodsVos.splice(item2, 1)
				}
			}
		},
		mounted() {
            // 一个是从购物车进来 一个是商品详情进来的! 妈的! 就是这么悲催!!
			if (this.isLogin) {
				this.getLocalList(1)
				if (this.$route.query.laiyuan != undefined) {
					let _data = this.$route.query.sku
					this.$http.get('/goods/skuInfo?skuId=' + _data).then(res => {
						let response = JSON.parse(res.request.response)
						this.laiyuan = 2
						if (response.code == 200) {
							let nullarr = []
							nullarr.push(response.data)
							let dat1s = nullarr.map((a, b) => {
								let obj = []
								let data = {}
								let nuarr = []
								let goodsVos = {}
								//公共部分
								data.message = ''
								data.shopname = this.$route.query.shopName
                                data.combinate = this.$route.query.customno
                                data.time = '请先点击商品右侧 发货时间按钮查询',
                                data.arriveMessage='请选择此店铺的配送方式',
                                data.billIdcheck = false,
                                data.goodsTypeId= this.$route.query.goodsTypeId
								data.checked = false
                                data.billid = '0'                 
								data.shopid = this.$route.query.shopid
								data.distributionModel = ''
								data.memId = JSON.parse(sessionStorage.MEMBER).id
								data.addressId = ''
								goodsVos.amount = ''
								goodsVos.chang = ''
								goodsVos.checked = false
								goodsVos.customno = ''
								goodsVos.combinate = this.$route.query.customno
								goodsVos.hole = 0
                                goodsVos.message = ''; 
								goodsVos.holePrice = a.topPrice
								goodsVos.price = a.salePrice
								goodsVos.topPrice = a.topPrice
								goodsVos.shopid = this.$route.query.shopid
								goodsVos.productspuid = this.$route.query.spuId
								goodsVos.productskuid = this.$route.query.sku
                                goodsVos.spuId = ''                          
                                goodsVos.diliverFlag=a.deliveryMode.indexOf('1')==-1?false:true
                                goodsVos.kuan = ''
                                goodsVos.size=a.size
								goodsVos.shopId = this.$route.query.shopid
								goodsVos.skuId = 1
								goodsVos.top = 0
								goodsVos.imgurl = ''
								nuarr.push(goodsVos)
								data.goodsVos = nuarr
								obj.push(data)
								return obj
							})
                            this.shopdata = dat1s
                             //console.log(this.shopdata)
							for (var i = 0; i < this.shopdata.length; i++) {
								this.logisticsPriceArr.push(0)
                            }
						} else {
							this.$Message.error('网络错误,问题不大')
						}
					})
				} else {
					this.laiyuan = 1
					let _data = this.$route.query.data
					this.$http.post('/car/selectedGoods', _data, {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					}).then(res => {
						let response = JSON.parse(res.request.response)
						if (response.code == 200) {
                            this.shopdata = response.data
							for (var i = 0; i < this.shopdata.length; i++) {
								this.logisticsPriceArr.push(0)
                            }
						} else {
							this.$Message.error('网络错误,问题不大')
						}
					})
				}
				this.$http.post('/saler/AreaTree').then(this.areaTreeSucc);
			} else {
				this.$Message.success({
					content: "请先登录", duration: 2
				});
				this.$router.push("/login");
			}
		}
	}

</script>
<style scoped>
    .noticeclass{ width: 98%;height: 75px;margin:0 auto}
    .noticeclass_top{ width: 100%;text-align: left;height: 30px; line-height: 30px;color: #666}
    .noticeclass_mid{ height: 20px; line-height: 20px;}
	.fapiaos {
		width: 450px;
		height: 60px;
		margin: 0 auto
	}

	.rowline {
		margin: 15px auto
	}

	.oders {
		width: 100%;
		background: #f1f1f1;
	}

	.oders_center {
		width: 1200px;
		height: auto;
		overflow: hidden;
		margin: 0 auto
	}

	.oders_center_top {
		height: 55px;
		line-height: 55px;
		font-size: 17px;
		font-weight: bold;
		text-indent: 8px
	}

	.addbillsstyle {
		width: 400px;
		height: 380px;
		margin: 0 auto;
	}

	.oders_center_local {
		width: 1200px;
		overflow: hidden;;
		border: 1px solid #d1d1d1;
		background: #fff
	}

	.oders_center_local_top {
		width: 1160px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		font-size: 15px;
		font-weight: 400
	}

	.spans {
		font-size: 20px;
		color: #ff0000;
	}

	.oders_center_local_ul {
		width: 1000px;;
		height: auto;
		overflow: hidden;
		margin: 10px auto
	}

	.oders_center_local_ul ul li {
		width: 240px;
		height: 145px;
		border: 1px solid red;
		border: 1px solid #d1d1d1;
		border-radius: 5px;
		float: left;
		margin: 0px 10px 10px 0px;
		background: #fff
	}

	.loacl_datal {
		width: 200px;
		height: 105px;
		margin: 20px auto;
		font-size: 14px
	}

	.loca_home {
		width: 100%;
		height: 40px;
		line-height: 40px;
	}

	.bgxingzhuang {
		background: url(../../assets/img/xingzhuang.png) no-repeat;
		background-size: 100% 100%
	}

	.exchangeMode {
		width: 300px;
		height: auto;
		overflow: hidden;
		margin: 0 auto
	}

	.oders_center_local_topw {
		width: 1200px;
		height: 45px;
		border-bottom: 1px solid #d1d1d1;;
	}

	.oders_center_local_datal_top {
		height: 55px;
		width: 100%;;
	}

	.oders_center_local_datal_btom {
		width: 1200px;
		margin: 0 auto;
		min-height: 40px;
		line-height: 40px
	}

	.dis {
		display: block;
		width: 30px;
		cursor: pointer;
		height: 30px;
		border-radius: 50%;
		background: #f1f1f1;
		text-align: center;
		margin-top: 5px;
		line-height: 30px;
		font-size: 22px
	}

	.inpoutdis {
		width: 46%;
	}

	.odre_fapiao {
		height: 65px;
		line-height: 65px;
		width: 1200px;
		margin: 0 auto;;
		border-bottom: 1px solid #d1d1d1;
	}

	.odre_fapiaorale {
		height: 90px;
		border-bottom: 2px solid #199df8
	}

	.order_footer {
		width: 100%;
		height: 130px;
		background: #f1f1f1;
		margin-top: 20px
	}

	.order_fott {
		width: 100%;
		height: 80px;
		background: #fff;
	}

	.order_f_P {
		height: 25px;
		line-height: 25px;
		width: 1020px;
		margin: 0px auto;
		overflow: hidden;
		font-size: 16px;
	}

	.prders {
		width: 1200px;
		height: 80px;
		margin: 0 auto;
	}

	.order_f_left {
		width: 1020px;
		height: 50px;
		margin: 15px auto;
		float: left;
		text-indent: 15px
	}

	.order_f_righ {
		width: 160px;
		height: 80px;
		float: right;
		cursor: pointer;;

		line-height: 80px;
		text-align: center;
		color: #fff;
		font-size: 25px
	}
</style>
