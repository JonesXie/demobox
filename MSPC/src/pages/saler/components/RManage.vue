<template>
	<div class="rManage">
		<div class="manageHead">
			<p>店铺管理</p>
		</div>
		<Alert type="warning" show-icon class="alertMsg" v-if="checkstatus == '0'">审核中，请稍后访问...</Alert>
		<Alert type="success" show-icon class="alertMsg" v-else-if="checkstatus == '1'">店铺注册成功</Alert>
		<Alert type="error" show-icon class="alertMsg" v-else-if="checkstatus == '2'">申请失败，请重新填写...</Alert>
		<span v-else></span>
		<Form ref="ManageDate" :model="ManageDate" :rules="ManageRules">
			<div class="manageContent">
				<div class="contentLogo">
					<em>店铺Logo:</em>
					<FormItem class="salerLogo" prop="shoppicurlRule" inline>
						<!-- <img :src="`${ManageShow.shoppicurl}`" alt="" class="logoIMG"> -->
                           <img :src="`${ManageShow.shoppicurl}`" class="logoIMG">

					</FormItem>
					<ul class="logoUl">
						<li class="tips">尺寸:100*100像素</li>
						<li>
						<Upload :action="uploadAction" :format="['jpg','jpeg','png']" :show-upload-list="false" ref="uploadIMG"
								:on-success="uploadIMGSuccess"
								class="salerEditor" v-if="!read">
							<Button type="primary">编辑LOGO</Button>
						</Upload>
						</li>
					</ul>
					<router-link :to="{path:'/shopGoods',query:{id:ManageDate.storeid}}" class="myshop">进入店铺>>
					</router-link>
				</div>
				<div class="contentName">
					<em>店铺名称:</em>
					<FormItem class="name12 nameInput" prop="shopnameRule">
						<Input style="width: 300px" v-model="ManageDate.shopname" :maxlength="8" placeholder="请输入店铺名称(最大8位)"
							   :readonly="read"/>
						<p>店铺名称填写须知：不可与其他店铺昵称或本站业务冲突</p>
					</FormItem>
				</div>
				<div class="contentBusiness">
					<em>主营业务:</em>
					<FormItem class="businessInput" prop="mainbusinessRule" inline>
						<Input search style="width: 300px" v-model="ManageShow.mainbusiness"
							   @on-focus="getgoodsTypeTree" placeholder="请选择主营业务" :readonly="read"/>
					</FormItem>
					<Modal
						v-model="businessCover"
						title="请选择主营业务"
						width="350"
					>
						<Scroll height="300">
							<Tree :data="businessData" ref="businessSelected" @on-check-change="businessCheck"
								  show-checkbox></Tree>
						</Scroll>
					</Modal>
				</div>
				<div class="salerPhone">
					<em>手机号码:</em>
					<FormItem prop="phoneRule" class="name12 salerphoneInput">
						<Input style="width: 300px" v-model="ManageDate.phone" placeholder="请输入手机号码" :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentProvince">
					<em>公司所在区:</em>
					<FormItem class="provinceInput" prop="countyidRule" inline>
						<Input search style="width: 300px" @on-focus="cityCover01" v-model="ManageShow.countyid"
							   placeholder="请选择店铺所在区" :readonly="read"/>
					</FormItem>
					<Modal
						v-model="cityCover"
						title="请选择店铺所在区"
						width="350"
						@on-ok="countyidSelected"
					>
						<Scroll height="400">
							<Tree :data="cityData" :load-data="cityLoading" ref="countyidSelected"></Tree>
						</Scroll>
					</Modal>
				</div>
				<div class="salerSite">
					<em>发货地址:</em>
					<FormItem prop="addressRule" class="salersiteInput">
						<Input style="width: 300px" v-model="ManageDate.address" placeholder="请输入发货地址"
							   :readonly="read"></Input>
					</FormItem>
				</div>
				<div class="contentSummary">
					<em>店铺摘要:</em>
					<FormItem prop="summaryRule" class="SummaryInput">
						<Input v-model="ManageDate.summary" type="textarea" style="width: 300px" :rows="6"
							   :autosize="{minRows: 6,maxRows: 6}" placeholder="请输入店铺摘要..." :readonly="read"/>
					</FormItem>
				</div>
			</div>

			<div class="freightHead">
				<p>运费模板</p>
			</div>
			<div class="freightContent">
				<div class="contentProvince">
					<em>发货所在地:</em>
					<FormItem class="templetprovinceidInput" prop="templetprovinceidRule" inline>
						<Input search style="width: 300px" @on-focus="cityMap" v-model="ManageDate.templetcountyid"
							   placeholder="请选择发货所在地"/>
					</FormItem>
					<Modal
						v-model="citymapshow"
						:closable="false"
						:mask-closable="false"
						width="60"
					>
						<div class="map">
							<div id="mapContainer"></div>
							<div id="mapLeft">
								<input style="width: 300px" placeholder="请输入位置或点击地图" id="mapInput"/>
								<div class="mapTip">提示：请在搜索框输入地址或者在左边地图上点击选择地址</div>
								<div class="mapSite"><p style="font-weight: bold;font-size: 16px">您选择的位置：</p>
									<em class="mapem"
										v-if="ManageDate.templetcountyid!=null || ManageDate.templetcountyid!=''">{{ManageDate.templetcountyid}}</em>
									<em class="mapem" v-else>您还没有选择地址……</em>
								</div>
							</div>
						</div>
						<div slot="footer">
							<Button type="error" size="large" style=" width: 25%" @click="closeMap">确定</Button>
						</div>
					</Modal>
				</div>
				<div class="contentSite Public1">
					<em>具体发货地址:</em>
					<FormItem prop="linkaddressRule" class="siteInput">
						<Input style="width: 300px" v-model="ManageDate.linkaddress" placeholder="请输入具体发货地址"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentPhone Public1">
					<em>基础运费:</em>
					<FormItem prop="basecostRule" class="expressInput">
						<Input style="width: 150px" v-model.trim="ManageDate.basecost" placeholder="请输入基础费用"
							   :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentPhone Public1">
					<em>平方米抵消运费:</em>
					<FormItem prop="offsetradiusRule" class="phoneInput">
						<Input style="width: 150px" v-model.trim="ManageDate.offsetradius" placeholder="请输入平方米抵消运费"
							   :readonly="read"/>
						<em style="font-size: 16px;color: red">*达到多少平方米时可以抵消基础运费</em>
					</FormItem>
				</div>
				<div class="contentCircle Public1">
					<em>免费配送半径(KM):</em>
					<FormItem prop="areaRule" class="circleInput">
						<Input style="width: 150px" v-model.trim="ManageDate.area" placeholder="请输入免费配送半径" :readonly="read"/>
					</FormItem>
				</div>
				<div class="contentMoney Public1">
					<em>超出免费半径(元/KM):</em>
					<FormItem prop="logistfeeRule" class="moneyInput">
						<Input style="width: 150px" v-model.trim="ManageDate.logistfee" placeholder="请输入超出免费半径(元/KM)"
							   :readonly="read"/>
					</FormItem>
				</div>
				<Button type="info" class="submit" @click="submitInfo" v-if="!read">保存</Button>
			</div>
		</Form>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	import AMap from 'AMap';
	export default {
		name: "RManage",
		data() {
			//验证规则
			const shoppicurlRules = (rules, value, callback) => {
				if (this.ManageDate.shoppicurl == '' || this.ManageDate.shoppicurl == null) {
					callback(new Error('请上传店铺LOGO'));
				} else {
					callback();
				}
			};
			const shopnameRules = (rule, value, callback) => {
				if (this.ManageDate.shopname == '' || this.ManageDate.shopname == null) {
					callback(new Error('请输入店铺名称'));
				} else {
					callback();
				}
			};
			const mainbusinessRules = (rule, value, callback) => {
				if (this.ManageDate.mainbusiness == '' || this.ManageDate.mainbusiness == null) {
					callback(new Error('请填写主营业务'));
				} else {
					callback();
				}
			};
			const phoneRules = (rule, value, callback) => {
				if (this.ManageDate.phone == '' || this.ManageDate.phone == null) {
					callback(new Error('请输入手机号'));
				} else if (!(/^1[34578]\d{9}$/.test(this.ManageDate.phone))) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			const countyidRules = (rule, value, callback) => {
				let s = this.ManageShow.countyid;
				if (this.ManageDate.countyid == '') {
					callback(new Error('请填写店铺所在区'));
				}
				if (s != null || s != undefined) {
					let count = (s.split(',')).length - 1;
					if (count < 3) {
						callback(new Error('请填写到县区'));
					} else {
						callback();
					}
				}
			};
			const addressRules = (rule, value, callback) => {
				if (this.ManageDate.address == '' || this.ManageDate.address == null) {
					callback(new Error('请填写发货地址'));
				} else {
					callback();
				}
			};
			const summaryRules = (rule, value, callback) => {
				if (this.ManageDate.summary == '' || this.ManageDate.summary == null) {
					callback(new Error('请填写店铺摘要'));
				} else {
					callback();
				}
			};
			const templetprovinceidRules = (rule, value, callback) => {
				if (this.ManageDate.templetcountyid == '' || this.ManageDate.templetcountyid == null) {
					callback(new Error('请填写发货所在地'));
				} else {
					callback();
				}
			};
			const linkaddressRules = (rule, value, callback) => {
				if (this.ManageDate.linkaddress == '' || this.ManageDate.linkaddress == null) {
					callback(new Error('请填写具体发货地址'));
				} else {
					callback();
				}
			};
			const areaRules = (rule, value, callback) => {
				if (this.ManageDate.area == undefined || this.ManageDate.area == null) {
					callback(new Error('请填写免费配送半径'));
				} else if(isNaN(this.ManageDate.area)) {
					callback(new Error('免费配送半径必须是数字'));
				}else {
					callback();
				}
			};
			const logistfeeRules = (rule, value, callback) => {
				if (this.ManageDate.logistfee == undefined || this.ManageDate.logistfee == null) {
					callback(new Error('请填写超出免费半径(元/KM)'));
				}else if(isNaN(this.ManageDate.logistfee)) {
					callback(new Error('超出半径必须是数字'));
				} else {
					callback();
				}
			};
			const basecostRules = (rule, value, callback) => {
				if (this.ManageDate.basecost == undefined || this.ManageDate.basecost == null) {
					callback(new Error('请填写基础费用'));
				}else if(isNaN(this.ManageDate.basecost)) {
					callback(new Error('基础费用必须是数字'));
				} else {
					callback();
				}
			};
			const offsetradiusRules = (rule, value, callback) => {
				if (this.ManageDate.offsetradius == undefined || this.ManageDate.offsetradius == null) {
					callback(new Error('请填写平方米抵消运费'));
				}else if(isNaN(this.ManageDate.offsetradius)) {
					callback(new Error('平方米抵消运费必须是数字'));
				} else {
					callback();
				}
			};
			return {
				uploadAction: this.host + '/upload/uploadFile',
				businessData: [],
				cityData: [],
				cityData02: [],
				imgShow: [],
				businessCover: false,
				cityCover: false,
				citymapshow: false,
				checkstatus: '',//审核状态
				read: false,//是否只读
				ManageShow: {
					mainbusiness: '',
					countyid: '',
					templetcountyid: '',
					shoppicurl: require('@/assets/img/salerLogo.jpg'),
				},
				ManageDate: {
					shopsaleid: '',
					storeid: '',
					shoppicurl: '',
					shopname: '',
					mainbusiness: '',
					phone: '',
					provinceid: '',
					cityid: '',
					countyid: '',
					address: '',
					summary: '',
					linkaddress: '',
					templetcountyid: '',//发货区域名字
					lng: '',
					lat: '',
					area: null,
					logistfee: null,
					basecost:null,
					offsetradius: null
				},
				//验证规则转换
				ManageRules: {
					shoppicurlRule: [{validator: shoppicurlRules, trigger: 'change'}],
					shopnameRule: [{validator: shopnameRules, trigger: 'blur'}],
					mainbusinessRule: [{validator: mainbusinessRules, trigger: 'change blur'}],
					phoneRule: [{validator: phoneRules, trigger: 'blur'}],
					countyidRule: [{validator: countyidRules, trigger: 'change blur'}],
					addressRule: [{validator: addressRules, trigger: 'blur'}],
					summaryRule: [{validator: summaryRules, trigger: 'blur'}],
					templetprovinceidRule: [{validator: templetprovinceidRules, trigger: 'blur'}],
					linkaddressRule: [{validator: linkaddressRules, trigger: 'blur'}],
					areaRule: [{validator: areaRules, trigger: 'blur'}],
					logistfeeRule: [{validator: logistfeeRules, trigger: 'blur'}],
					basecostRule: [{validator: basecostRules, trigger: 'blur'}],
					offsetradiusRule: [{validator: offsetradiusRules, trigger: 'blur'}],
				}
			}
		},
		methods: {
			//是否可写
			isWrite: function () {
				let isCheck = this.checkstatus;
				if (isCheck == '0') {
					this.read = true;
				}else {
					this.read = false;
				}
			},
			//页面初始化
			defaultSucc: function (response) {
				let res = JSON.parse(response.request.response);
				// console.log(res);
				if (res.code == 200) {
					let data = res.data;
					this.checkstatus = res.data.shopStore.checkstatus;
					this.isWrite();
					this.checkstatus = data.shopStore.checkstatus;
					let shopLoge = this.strSub(data.shopStore.shoppicurl);
					let Area = this.numberClear(data.templet.area);
					let Logistfee = this.numberClear(data.templet.logistfee);
					let BaseCost = this.numberClear(data.templet.baseCost);
					let OffsetRadius = this.numberClear(data.templet.offsetRadius);
					this.ManageDate = {
						shopsaleid: data.shopStore.shopsaleid,
						storeid: data.shopStore.id,
						shoppicurl: shopLoge,
						shopname: data.shopStore.shopname,
						mainbusiness: data.mainBusiness,
						phone: data.shopStore.phone,
						provinceid: data.shopStore.provinceid,
						cityid: data.shopStore.cityid,
						countyid: data.shopStore.countyid,
						address: data.shopStore.address,
						summary: data.shopStore.summary,
						linkaddress: data.templet.linkaddress,
						templetcountyid: data.templet.county,
						lng: data.templet.lng,
						lat: data.templet.lat,
						area: Area,
						logistfee: Logistfee,
						basecost: BaseCost,
						offsetradius: OffsetRadius
						// area: parseFloat(data.templet.area),
						// logistfee: parseFloat(data.templet.logistfee),
						// basecost: parseFloat(data.templet.baseCost),
						// offsetradius: parseFloat(data.templet.offsetRadius)
					};
					this.ManageShow.mainbusiness = data.mainBusinessName;
					if (data.shopStore.areaName != null) {
						this.ManageShow.countyid = data.shopStore.areaName;
					}
					// if(data.templet.templetcountyid != null){
					// 	this.ManageDate.templetcountyid=data.templet.templetcountyid;
					// }
					if (data.shopStore.shoppicurl != null) {
						this.ManageShow.shoppicurl = data.shopStore.shoppicurl;
					}
				}
			},
			//图片地址提取
			strSub: function (data) {
				if (data != null || data != undefined) {
					let index = data.indexOf('/');
					let realdata = data.substring(index);
					return realdata
				} else {
					return null;
				}
			},
			numberClear(data){
				if(data !=null){
					return parseFloat(data)
				}else {
					return null;
				}
			},
			//上传图片
			uploadIMGSuccess: function (res) {
				this.ManageDate.shoppicurl =  res.data;
				this.ManageShow.shoppicurl =  res.data
			},
			//获取商品列表
			getgoodsTypeTree: function () {
				// console.log(this.ManageDate.mainbusiness)
				if (this.read == false) {
					axios.post('/saler/goodsTypeTree', qs.stringify({ids: this.ManageDate.mainbusiness,type:0})).then(this.businessTreeSucc);
					this.businessCover = true;
				}
			},
			//主营业务获取
			businessTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.businessData = res.data
			},
			//主营业务数据选中
			businessCheck: function (res) {
				this.ManageDate.mainbusiness = '';
				this.ManageShow.mainbusiness = '';
				// console.log(res)
				if (res.length > 0) {
					for (let i = 0; i < res.length; i++) {
						this.ManageDate.mainbusiness += res[i].id + ',';
						this.ManageShow.mainbusiness += res[i].title + ',';
						// arr1[i] = res[i].parentId;
					}
					// this.getFather(arr1);//调用函数
				}
			},
			//主营获取父节点
			// getFather:function(arr){
			// 	//获取父节点并赋值
			// 	let arr1 = Array.from(new Set(arr));
			// 	let arr2 = arr1.map(function (item) {
			// 		if(item == 'f941a14d702a42a985ab7c222859176c'){
			// 			item = '钢化玻璃'
			// 		}else if(item == '428b57d3e70e43eebfb3ae0f445ec070'){
			// 			item = '中空玻璃'
			// 		}else if(item == 'aded70b1596f45b2a5f397d6888a93d6'){
			// 			item = '夹胶玻璃'
			// 		}else {
			// 			item = ''
			// 		}
			// 		return item
			// 	});
			// 	let arr3 = arr2.filter(item=>item);//过滤空字符串
			// 	for (let i = 0; i < arr3.length; i++) {
			// 		this.ManageShow.mainbusiness += arr3[i] + ',';
			// 	}
			// },
			cityCover01() {
				if (this.read == false) {
					axios.post('/saler/AreaTree').then(this.cityTreeSucc);
					this.cityCover = true;
				}
			},
			cityMap() {
				if (this.read == false) {
					this.gdMap();
					this.citymapshow = true;
				}
			},
			//城市列表获取
			cityTreeSucc: function (response) {
				let res = JSON.parse(response.request.response);
				this.cityData = res.data;
			},
			//加载子城市
			cityLoading: function (item, callback, selected) {
				let id = item.id;
				axios.post('/saler/AreaTree', qs.stringify({parent_id: id, ids: selected})).then(
					response => {
						let res = JSON.parse(response.request.response);
						const data = res.data;
						callback(data);
					}
				);
			},
			//城市选中
			citySelected: function (params) {
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
							}
							else {
								childs.remove(item);
							}
						}
					}
					return false;
				}

				//获取所有选中节点
				// let params = this.$refs.countyidSelected.getSelectedNodes();
				//所有数据
				let allData = this.cityData;
				//循环执行所有选中的节点链，放到arr1数组里
				let arr1 = [];
				for (let i = 0; i < params.length; i++) {
					//单条数据链
					let aData = getParent(allData, [], params[i].id);//方法入口在这里
					for (let y = 0; y < aData.length; y++) {
						//拆分成单个json数组放到arr1里
						arr1.push(aData[y]);
					}
				}

				//arr1去重 es6的set方法
				function dedupe(array) {
					return Array.from(new Set(array));
				}

				arr1 = dedupe(arr1);
				return arr1;
			},
			//店铺所在区选取
			countyidSelected: function () {
				let params = this.$refs.countyidSelected.getSelectedNodes();
				let arr1 = this.citySelected(params);
				// 初始化数据，并输出;
				this.ManageDate.countyid = '';
				this.ManageShow.countyid = '';
				if (arr1 != null && arr1.length == 3) {
					this.ManageDate.provinceid = arr1[0].id;
					this.ManageDate.cityid = arr1[1].id;
					this.ManageDate.countyid = arr1[2].id;
					for (let i = 0; i < arr1.length; i++) {
						this.ManageShow.countyid += arr1[i].title + ','
					}
				}
			},
			//删除地图
			closeMap: function () {
				this.citymapshow = false;
			},
			//提交数据
			submitInfo: function () {
				this.$refs.ManageDate.validate((valid) => {
					console.log(this.ManageDate);
					if (valid) {
						axios.post('/store/applyStore', qs.stringify(this.ManageDate)).then(response => {
							let res = JSON.parse(response.request.response);
							// console.log(res)
							if (res.code == '200') {
								this.$Message.success({
									content: res.data.msg,
								});
								if (this.checkstatus == null || this.checkstatus == 2) {
									this.checkstatus = 0;
									this.isWrite();
								}else {
									this.checkstatus = 1;
									this.isWrite();
								}
								document.body.scrollTop = document.documentElement.scrollTop = 0;
							}
						});
					} else {
						this.$Message.error('请完整填写表格!');
						document.body.scrollTop = document.documentElement.scrollTop = 0;
					}
				});
			},
			//地图API
			gdMap() {
				const This = this;
				let geocoder, marker, lnglat;
				if (This.ManageDate.lng == null || This.ManageDate.lng == '') {
					lnglat = [117.25, 31.83]
				} else {
					let lng = parseFloat(This.ManageDate.lng);
					let lat = parseFloat(This.ManageDate.lat);
					lnglat = [lng, lat];
				}
				let mapObj = new AMap.Map('mapContainer', {
					resizeEnable: true, //是否监控地图容器尺寸变化
					center: lnglat, //初始化地图中心点
					zoom: 11
				});
				mapObj.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'], function () {
					let toolBar = new AMap.ToolBar();
					toolBar.hideDirection();//隐藏导航按钮
					mapObj.addControl(toolBar);
					mapObj.addControl(new AMap.Scale());
					mapObj.add(new AMap.Geocoder());
					//输入框
					let autoOptions = {
						city: "合肥",// 城市，默认全国
						input: "mapInput"	// 使用联想输入的input的id
					};
					let autocomplete = new AMap.Autocomplete(autoOptions);
					//输入完成选择
					let placeSearch = new AMap.PlaceSearch({
						city: '合肥',
						map: mapObj
					});
					AMap.event.addListener(autocomplete, 'select', function (e) {//监听输入框完成
						placeSearch.search(e.poi.name, (status, result) => {
							This.ManageDate.templetcountyid = result.poiList.pois[0].address
							This.ManageDate.lng = result.poiList.pois[0].location.lng;//选择的经度
							This.ManageDate.lat = result.poiList.pois[0].location.lat;//选择的纬度
						})
					})
					//placeSearch点击地点
					AMap.event.addListener(placeSearch, "markerClick", function (e) {
						This.ManageDate.templetcountyid = e.data.address;//选择的具体地址
						This.ManageDate.lng = e.data.location.lng;//选择的经度
						This.ManageDate.lat = e.data.location.lat;//选择的纬度
					});
				});

				//地图位置选择
				function regeoCode(lnglat) {
					let site = lnglat;
					if (!geocoder) {
						geocoder = new AMap.Geocoder({
							city: "hefei", //城市设为合肥，默认：“全国”
							radius: 1000 //范围，默认：1000
						});
					}
					//判断是否重建新的marker
					if (!marker) {
						marker = new AMap.Marker({
							bubble: true
						});
						mapObj.add(marker);
					}
					marker.setPosition(site);
					//根据点击获取地名
					geocoder.getAddress(site, (status, result) => {
						if (status === 'complete' && result.regeocode) {
							This.ManageDate.templetcountyid = result.regeocode.formattedAddress;
							This.ManageDate.lng = site[0];//点击的经度
							This.ManageDate.lat = site[1];//点击的纬度
						} else {
							alert(JSON.stringify(result))
						}
					});
				};
				mapObj.on('click', function (e) {
					let lnglat = [e.lnglat.lng, e.lnglat.lat]
					regeoCode(lnglat);
				});
				regeoCode(lnglat);
			}
		},
		mounted() {
			axios.post('/store/info').then(this.defaultSucc);
		},
	}
</script>

<style scoped>

	.manageHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.manageHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.manageContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 10px 0 30px 0;
	}

	.contentLogo {
		width: 100%;
		margin-bottom: 40px;
	}

	.contentLogo em:first-child {
		display: inline-block;
		margin-left: 52px;
		font-size: 16px;
	}

	em {
		text-decoration: none;
		font-style: normal;
		margin: 0;
		padding: 0;
		vertical-align: top;
	}

	.salerLogo {
		vertical-align: top;
		display: inline-block;
		margin-bottom: 0;
		margin-left: 33px;
		width: 100px;
		height: 100px;
	}

	.logoIMG {
		width: 100px;
		height: 100px;
	}

	.logoUl{
		/*float: left;*/
		display: inline-block;
		vertical-align: bottom;
	}

	.tips{
		display: inline-block;
		font-size: 10px;
		margin-left: 8px;
		margin-bottom: 8px;
		color: #999;
	}
	.salerEditor {
		display: inline-block;
		vertical-align: bottom;
		margin-left: 10px;
		cursor: pointer;
	}

	.myshop {
		display: inline-block;
		font-size: 16px;
		position: absolute;
		right: 40px;
		top: 10px;
	}

	.contentName {
		height: 48px;
		margin-bottom: 40px;
	}

	.contentName em:first-child {
		display: inline-block;
		margin: 5px 0 0 52px;
		font-size: 16px;
	}

	.nameInput {
		vertical-align: top;
		margin-left: 33px;
		display: inline-block;
	}

	.contentName p {
		font-size: 12px;
		color: #666;
	}

	.contentBusiness, .contentProvince, .salerSite {
		height: 32px;
		line-height: 32px;
		margin-bottom: 40px;
	}

	.contentBusiness em:first-child, .contentProvince em:first-child, .salerSite em:first-child, .contentSummary em:first-child {
		display: inline-block;
		margin-left: 52px;
		font-size: 16px;
	}

	.businessInput, .salersiteInput {
		display: inline-block;
		vertical-align: top;
		margin-left: 33px;
		width: 100px;
	}

	.provinceInput {
		display: inline-block;
		vertical-align: top;
		margin-left: 16px;
		width: 100px;
	}

	.templetprovinceidInput {
		display: inline-block;
		vertical-align: top;
		margin-left: 84px;
	}

	.salerPhone {
		height: 32px;
		line-height: 32px;
		margin-bottom: 40px;
	}

	.salerPhone em:first-child {
		display: inline-block;
		margin-left: 52px;
		font-size: 16px;
	}

	.salerphoneInput {
		vertical-align: top;
		margin-left: 33px;
	}

	.SummaryInput {
		vertical-align: top;
		display: inline-block;
		margin-left: 33px;
		font-size: 16px;
	}

	.freightHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.freightHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.freightContent {
		position: relative;
		top: 0;
		left: 0;
		padding: 30px 0 60px 0;
	}

	.Public1 {
		height: 48px;
		margin-bottom: 40px;
	}

	.Public1 em:first-child, .contentPhoto em:first-child {
		display: inline-block;
		margin: 5px 0 0 52px;
		font-size: 16px;
	}

	.Public2 {
		vertical-align: top;
		margin-left: 100px;
		display: inline-block;
	}

	.siteInput {
		vertical-align: top;
		margin-left: 68px;
		display: inline-block;
	}

	.circleInput {
		vertical-align: top;
		margin-left: 33px;
		display: inline-block;
	}

	.moneyInput {
		vertical-align: top;
		margin-left: 14px;
		display: inline-block;
	}

	.phoneInput {
		vertical-align: top;
		margin-left: 53px;
		display: inline-block;
	}

	.expressInput {
		vertical-align: top;
		margin-left: 100px;
		display: inline-block;
	}

	em {
		text-decoration: none;
		font-style: normal;
		margin: 0;
		padding: 0;
		vertical-align: top;
	}

	.contentMoney em:last-child {
		display: inline-block;
		margin-top: 5px;
		font-size: 16px;
	}

	.submit {
		margin-left: 154px;
		font-size: 18px;
		height: 50px;
		line-height: 50px;
		width: 220px;
		text-align: center;
		background-color: #2fa6ff;
		border-radius: 3px;
		padding: 0;
		border: 1px solid transparent;
		outline: none;
		color: #fff;
		cursor: pointer;
	}

	.name12 {
		display: inline-block;
	}

	.alertMsg {
		width: 80%;
		margin: 20px 0 10px 50px;
	}

	.map {
		width: 98%;
		margin: 0 auto;
	}

	#mapContainer {
		width: 75%;
		height: 400px;
		display: inline-block;
		/*display: none;*/
	}

	#mapLeft {
		display: inline-block;
		width: 23%;
		height: 100%;
		vertical-align: top;
		margin-left: 1%;
		overflow: hidden;
		clear: both;
	}

	#mapInput {
		display: inline-block;
		width: 94% !important;
		margin-left: 3%;
		outline: none;
		height: 28px;
		line-height: 1;
		padding: 2px 7px;
		font-size: 12px;
		border: 1px solid #dcdee2;
		border-radius: 4px;
		color: #515a6e;
		background-color: #fff;
		position: relative;
		cursor: text;
	}

	.mapSite {
		margin-top: 80px;
		font-size: 14px;
		width: 94% !important;
		margin-left: 3%;
	}

	.mapem {
		display: inline-block;
		margin-top: 5px;
		font-size: 16px;
		color: red;
	}

	.mapTip {
		color: #515a6e;
		font-size: 11px;
		margin-top: 15px;
		width: 94% !important;
		margin-left: 3%;
	}
</style>
