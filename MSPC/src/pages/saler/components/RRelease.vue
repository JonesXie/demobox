<template>
	<div class="rRelease">
		<div class="releaseHead">
			<p>发布商品</p>
		</div>
		<Form ref="ReleaseDate" :model="uploadData" :rules="ReleasRules">
			<div class="releaseContent">
				<div class="releaseName Public1">
					<em>商品名称：</em>
					<FormItem class="nameInput Public2" prop="goodsName">
						<Input style="width: 300px" v-model="uploadData.goodsName" placeholder="请输入商品名称"/>
					</FormItem>
				</div>
				<!--<div class="releaseType Public1">-->
				<!--<em>品牌：</em>-->
				<!--<FormItem class="businessInput Public2" prop="brandIdRule">-->
				<!--<Input search  style="width: 300px"  v-model="showDate.brandName"  @on-focus="brandIdRequest" placeholder="请选择品牌"/>-->
				<!--</FormItem>-->
				<!--<Modal-->
				<!--v-model="brandIdCover"-->
				<!--title="请选择品牌"-->
				<!--width="300"-->
				<!--@on-ok="brandIdSelected"-->
				<!--&gt;-->
				<!--<Scroll height="200">-->
				<!--<Tree :data="brandIdData"   ref="brandIdSelected"></Tree>-->
				<!--</Scroll>-->
				<!--</Modal>-->
				<!--</div>-->
				<!--<div class="releaseUnit Public1">-->
				<!--<em>单位：</em>-->
				<!--<p class="Unit Public2">件</p>-->
				<!--</div>-->
				<!--<div class="releasePrice Public1">-->
				<!--<em>商品平均价：</em>-->
				<!--<FormItem class="priceInput Public2" prop="goodprice">-->
				<!--<Input style="width: 300px"  v-model.trim="uploadData.goodprice" number placeholder="请输入商品均价"/>-->
				<!--</FormItem>-->
				<!--</div>-->
				<div class="releaseKeyword Public1">
					<em>产品关键字：</em>
					<FormItem class="keywordInput Public2" prop="keywords">
						<Input style="width: 300px" v-model="uploadData.keywords" placeholder="请输入产品关键字"/>
					</FormItem>
				</div>
				<div class="releasePhoto">
					<div class="photoHead">
						<em>商品详情图</em>
						<em>图片名称</em>
						<em>操作</em>
					</div>
					<ul class="photoUl">
						<li class="li1">
							<div class="li1L">
								<FormItem prop="picUrlRule" inline>
									<img :src="showDate.picUrl" alt="">
								</FormItem>
							</div>
							<div class="li1M">
								<p>主商品图(必填)</p>
								<p style="color: red;font-size: 16px">200*200像素</p>
							</div>
							<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="choosePhoto1 li1R" :on-success="picUrlSuccess"
									:show-upload-list="false" :data="{shopName:loginnamed}">
								<Button type="primary">选择图片</Button>
							</Upload>
						</li>
						<li class="li2" v-if="photoShow">
							<div class="li2L">
								<img :src="showDate.smallPic1Url" alt="">
							</div>
							<div class="li2M">
								<p>详情图一(选填)</p>
								<p style="color: red;font-size: 16px">200*200像素</p>
							</div>
							<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="choosePhoto2 li2R" :on-success="smallPic1UrlSuccess"
									:show-upload-list="false"  :data="{shopName:loginnamed}">
								<Button type="primary">选择图片</Button>
							</Upload>
						</li>
						<li class="li3" v-if="photoShow">
							<div class="li3L">
								<img :src="showDate.smallPic2Url" alt="">
							</div>
							<div class="li3M">
								<p>详情图二(选填)</p>
								<p style="color: red;font-size: 16px">200*200像素</p>
							</div>
							<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="choosePhoto3 li3R" :on-success="smallPic2UrlSuccess"
									:show-upload-list="false" :data="{shopName:loginnamed}">
								<Button type="primary">选择图片</Button>
							</Upload>
						</li>
						<li class="li4" v-if="photoShow">
							<div class="li4L">
								<img :src="showDate.smallPic3Url" alt="">
							</div>
							<div class="li4M">
								<p>详情图三(选填)</p>
								<p style="color: red;font-size: 16px">200*200像素</p>
							</div>
							<Upload :action="uploadAction"  :format="['jpg','jpeg','png']" class="choosePhoto4 li4R" :on-success="smallPic3UrlSuccess"
									:show-upload-list="false"  :data="{shopName:loginnamed}">
								<Button type="primary">选择图片</Button>
							</Upload>
						</li>
						<li class="li5" v-if="photoShow">
							<div class="li5L">
								<img :src="showDate.smallPic4Url" alt="">
							</div>
							<div class="li5M">
								<p>详情图四(选填)</p>
								<p style="color: red;font-size: 16px">200*200像素</p>
							</div>
							<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="choosePhoto5 li5R" :on-success="smallPic4UrlSuccess"
									:show-upload-list="false"  :data="{shopName:loginnamed}">
								<Button type="primary">选择图片</Button>
							</Upload>
						</li>
					</ul>
					<div class="mybtn">
						<Button type="success" @click="Showphoto" v-show="btnHide" class="photoBtn">添加商品详情图</Button>
					</div>
				</div>
				<div class="releaseCategory Public1">
					<em>商品分类选择：</em>
					<FormItem class="categoryInput Public2" prop="goodsTypeIdRule">
						<Input search style="width: 300px" v-model="showDate.goodsTypeName"
							   @on-focus="goodsTypeIdRequest" placeholder="请选择商品分类" readonly/>
					</FormItem>
					<Modal
						v-model="goodsTypeIdCover"
						title="请选择品牌"
						width="350"
						@on-ok="goodsTypeIdSelected"
					>
						<Scroll height="250">
							<Tree :data="goodsTypeIdData" ref="goodsTypeIdSelected"></Tree>
						</Scroll>
					</Modal>
				</div>
				<!--<div v-if="showItem">-->
					<div v-if="false"><!--发布商品列表-->
					<div class="outHead">商品录入列表：</div>
					<div class="releaseType scrollBar">
						<ul class="itemUl">
							<li class="itemLi itemA">
								<em class="em1"></em>
								<em class="em1"></em>
								<em>厚度1</em>
								<em>价格</em>
								<em>启用</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
						</ul>
						<ul class="itemUl">
							<li class="itemLi itemA">
								<em class="em1"></em>
								<em class="em1"></em>
								<em>厚度1</em>
								<em>价格</em>
								<em>启用</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
						</ul>
						<ul class="itemUl">
							<li class="itemLi itemA">
								<em class="em1"></em>
								<em class="em1"></em>
								<em>厚度1</em>
								<em>价格</em>
								<em>启用</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
						</ul>
						<ul class="itemUl">
							<li class="itemLi itemA">
								<em class="em1"></em>
								<em class="em1"></em>
								<em>厚度1</em>
								<em>价格</em>
								<em>启用</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small" style="margin: 0 auto;width: 98%">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
							<li class="itemLi itemB">
								<em class="em1">
									<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
								</em>
								<em class="em1">
									<img class="jianIcon" src="@/assets/img/jian.png" alt="">
								</em>
								<em>
									<Select size="small">
										<Option value="4" >4mm</Option>
										<Option value="5" >5mm</Option>
										<Option value="6" >6mm</Option>
										<Option value="7" >7mm</Option>
									</Select>
								</em>
								<em>
									<Input size="small" style="margin: 3px auto 0;width: 98%">
										<span slot="append">元</span>
									</Input>
								</em>
								<em>
									<Select size="small">
										<Option value="0" >是</Option>
										<Option value="1" >否</Option>
									</Select>
								</em>
							</li>
						</ul>
					</div>
					<div class="mybtn" v-if="!outSHOW">
						<Button type="success" class="outBtn" @click="outSHOW=true">剔除商品</Button>
					</div>
					<div v-if="outSHOW"><!--剔除-->
						<div class="outHead">商品剔除列表：</div>
						<div class="releaseOut scrollBar">
							<ul class="outUl">
								<li class="outLi outA">
									<em class="outLi1"></em>
									<em class="outLi1"></em>
									<em>厚度1</em>
									<em>厚度2</em>
									<em>厚度3</em>
									<em>厚度4</em>
									<em>厚度5</em>
									<em>厚度1</em>
									<em>厚度2</em>
									<em>厚度3</em>
									<em>厚度4</em>
									<em>厚度5</em>
									<em>厚度1</em>
									<em>厚度2</em>
									<em>厚度3</em>
									<em>厚度4</em>
									<em>厚度5</em>
									<em>厚度1</em>
									<em>厚度2</em>
								</li>
								<li class="outLi outB">
									<em class="outLi1">
										<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
									</em>
									<em class="outLi1">
										<img class="jianIcon" src="@/assets/img/jian.png" alt="">
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
								</li>
								<li class="outLi outB">
									<em class="outLi1">
										<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
									</em>
									<em class="outLi1">
										<img class="jianIcon" src="@/assets/img/jian.png" alt="">
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
								</li>
							</ul>
						</div>
					</div>
					<div class="mybtn" v-if="!specialSHOW">
						<Button type="success" @click="specialSHOW=true">商品特殊价格</Button>
					</div>
					<div v-if="specialSHOW"><!--特殊价格-->
						<div class="outHead">商品特殊价格：</div>
						<div class="releaseOut scrollBar">
							<ul class="outUl">
								<li class="outLi outA">
									<em class="outLi1"></em>
									<em class="outLi1"></em>
									<em>厚度1</em>
									<em>厚度2</em>
									<em>厚度3</em>
									<em>厚度4</em>
									<em>厚度5</em>
									<em>厚度6</em>
									<em>厚度7</em>
									<em>价格</em>
									<em>启用</em>
								</li>
								<li class="outLi outB">
									<em class="outLi1">
										<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
									</em>
									<em class="outLi1">
										<img class="jianIcon" src="@/assets/img/jian.png" alt="">
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Input size="small" style="margin: 3px auto 0;width: 98%">
											<span slot="append">元</span>
										</Input>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="0" >是</Option>
											<Option value="1" >否</Option>
										</Select>
									</em>
								</li>
								<li class="outLi outB">
									<em class="outLi1">
										<img class="jiaIcon" src="@/assets/img/jia.png" alt="">
									</em>
									<em class="outLi1">
										<img class="jianIcon" src="@/assets/img/jian.png" alt="">
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="4" >4mm</Option>
											<Option value="5" >5mm</Option>
											<Option value="6" >6mm</Option>
											<Option value="7" >7mm</Option>
										</Select>
									</em>
									<em>
										<Input size="small" style="margin: 3px auto 0;width: 98%">
											<span slot="append">元</span>
										</Input>
									</em>
									<em>
										<Select size="small" style="margin: 0 auto;width: 98%">
											<Option value="0" >是</Option>
											<Option value="1" >否</Option>
										</Select>
									</em>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="releaseUl" v-if="showItem">
				<!--<div class="releaseUl" v-if="false">-->
					<ul class="ulWrap">
						<li class="liHead">
							<em>添加</em>
							<em>删除</em>
							<em>序号</em>
							<em v-for="(items, indexs) in attrContent" :key="indexs">{{items.name}}</em>
							<em>销售价格</em>
							<!--<em>市场价格</em>-->
							<em>是否启用</em>
						</li>
						<li class="liModel" v-for="(content,count) in uploadData.goodsSkuList" v-model="newData">
							<em @click="addLi(count)">
								<img class="addIcon" src="@/assets/img/add.png" alt="">
							</em>
							<em @click="reduceLi(count)">
								<img class="reduceIcon" src="@/assets/img/reduce.png" alt="">
							</em>
							<em class="liIndex">{{count +1}}</em>
							<em v-for="(items, indexs) in attrContent" :key="indexs"
								@click="itemClick(items.name,items.id,count)">
								<Select @on-change="itemSelected" label-in-value
										:value="matchData(items.id,count,indexs)">
									<Option v-for="(item,index) in items.chirldren" :key="index" :value="item.id"
											:label="item.name">{{item.name}}
									</Option>
								</Select>
							</em>
							<em>
								<InputNumber placeholder="请输入销售价" @on-blur="salePriceBlur(count)" ref="salePrice"
											 :value="salePrice(count)" class="itemInput"/>
							</em>
							<!--<em><InputNumber placeholder="请输入市场价" @on-blur="marketPriceBlur(count)" ref="marketPrice" :value="marketPrice(count)" class="itemInput"/></em>-->
							<em @click="isUseClick(count)">
								<Select @on-change="isUseChoose" :value="isUse(count)">
									<Option value="0">是</Option>
									<Option value="1">否</Option>
								</Select>
							</em>
						</li>
					</ul>
				</div>
				<div class="releasePunch Public1">
					<em>打孔价格：</em>
					<FormItem class="punchInput Public2" prop="hole">
						<Input style="width: 150px" v-model="uploadData.hole" number placeholder="请输入打孔价格"/>
						<em class="public3">元/个</em>
					</FormItem>
				</div>
				<div class="releaseDrilling Public1">
					<em>挖角价格：</em>
					<FormItem class="drillingInput Public2" prop="top">
						<Input style="width: 150px" v-model="uploadData.top" number placeholder="请输入挖角价格"/>
						<em class="public3">元/个</em>
					</FormItem>
				</div>
				<div class="releasePeriod Public1">
					<em>基础天数：</em>
					<FormItem class="periodInput Public2" prop="cycle">
						<Input style="width: 150px" v-model="uploadData.cycle" number placeholder="请输入基础天数"/>
						<em class="public3">天</em>
					</FormItem>
				</div>
				<div class="releaseYield Public1">
					<em>日产量：</em>
					<FormItem class="yieldInput Public2" prop="dailyCapacity">
						<Input style="width: 150px" v-model="uploadData.dailyCapacity" number placeholder="请输入日产量"/>
						<em class="public3">m</em><em class="yieldUp">2</em>
					</FormItem>
				</div>
				<div class="releasePeriod Public1" id="minSize">
					<em>最小尺寸：</em>
					<FormItem class="periodInput Public2" prop="minKuan">
						<p class="sizeStyle">宽：</p><Input style="width: 80px" v-model.trim="showDate.minKuan" placeholder="最小宽度" />
						<em class="public3">mm</em>
					</FormItem>
					<FormItem class="periodInput Public2" prop="minChang">
						<p class="sizeStyle">长：</p><Input style="width: 80px" v-model.trim="showDate.minChang" placeholder="最小长度" />
						<em class="public3">mm</em>
					</FormItem>
				</div>
				<div class="releasePeriod Public1" id="maxSize">
					<em>最大尺寸：</em>
					<FormItem class="periodInput Public2" prop="maxKuan">
						<p class="sizeStyle">宽：</p><Input style="width: 80px" v-model.trim="showDate.maxKuan"  placeholder="最大宽度"/>
						<em class="public3">mm</em>
					</FormItem>
					<FormItem class="periodInput Public2" prop="maxChang">
						<p class="sizeStyle">长：</p><Input style="width: 80px" v-model.trim="showDate.maxChang"  placeholder="最大长度" />
						<em class="public3">mm</em>
					</FormItem>
				</div>
				<div class="releaseDeliver Public1">
					<em>配送方式：</em>
					<FormItem  prop="deliveryModeRule"  class="deliverInput Public2">
					<CheckboxGroup v-model="showDate.deliveryMode" @on-change="deliveryChange">
						<Checkbox label="0" disabled>
							<span>自提</span>
						</Checkbox>
						<Checkbox label="1">
							<span>配送</span>
						</Checkbox>
					</CheckboxGroup>
					</FormItem>
				</div>
				<div class="releaseDetail">
					<em>商品详细信息：</em>
					<FormItem class="detailInput">
						<quill-editor ref="EditorContent" :options="editorOption" :value="uploadData.goodsInfoPC"></quill-editor>
					</FormItem>
				</div>
				<Button type="info" class="submit" @click="submitInfo">保存</Button>
			</div>
		</Form>
	</div>
</template>
<script>
	import qs from 'qs' //引入qs
	import axios from 'axios'
	import {quillEditor} from 'vue-quill-editor'//调用编辑器
	import {quillRedefine} from 'vue-quill-editor-upload'//调用编辑器上传图片插件
	export default {
		name: "RRelease",
		data() {
			//验证规则
			const brandIdRules = (rules, value, callback) => {
				if (this.uploadData.brandId == '') {
					callback(new Error('请选择商品品牌'));
				} else {
					callback();
				}
			};
			const picUrlRules = (rules, value, callback) => {
				if (this.uploadData.goodsFiles.picUrl == '') {
					callback(new Error('请上传主商品图'));
				} else {
					callback();
				}
			};
			const goodsTypeIdRules = (rules, value, callback) => {
				if (this.uploadData.goodsTypeId == '') {
					callback(new Error('请选择商品分类'));
				} else {
					callback();
				}
			};
			const deliveryModeRules =(rules, value, callback) => {
				if (this.showDate.deliveryMode.length == 0) {
					callback(new Error('请选择配送方式'));
				} else {
					callback();
				}
			};
			const minChangRules =(rules, value, callback) => {
				if (this.showDate.minChang == '') {
					callback(new Error('请填写最小长度'));
				} else if(isNaN(this.showDate.minChang)) {
					callback(new Error('最小长度必须是数字'));
				}else {
					callback();
				}
			};
			const minKuanRules =(rules, value, callback) => {
				if (this.showDate.minKuan == '') {
					callback(new Error('请填写最小宽度'));
				} else if(isNaN(this.showDate.minKuan)) {
					callback(new Error('最小宽度必须是数字'));
				}else {
					callback();
				}
			};
			const maxChangRules =(rules, value, callback) => {
				if (this.showDate.maxChang == '') {
					callback(new Error('请填写最大长度'));
				} else if(isNaN(this.showDate.maxChang)) {
					callback(new Error('最大长度必须是数字'));
				}else {
					callback();
				}
			};
			const maxKuanRules =(rules, value, callback) => {
				if (this.showDate.maxKuan == '') {
					callback(new Error('请填写最大宽度'));
				} else if(isNaN(this.showDate.maxKuan)) {
					callback(new Error('最大宽度必须是数字'));
				}else {
					callback();
				}
			};
			return {
                loginnamed:'',
				uploadAction: this.host + '/upload/uploadFile',
				isChange:true,//是否有值
				isOne:true,//是否改变
				outSHOW:false,
				specialSHOW:false,
				photoShow: false,
				btnHide: true,
				brandIdCover: false,
				brandIdData: [],
				goodsTypeIdCover: false,
				goodsTypeIdData: [],
				showItem: false,//是否显示
				attrContent: [],//商品多少个属性
				goodsNow: {//选择临时存放
					attId: "",
					attName: "",
					attValNo: "",
					attValContent: "",
					index: null,
				},
				goodsLiNow: {//一行列表临时存放
					salePrice: 0,//售价
					// marketPrice: null,//市场价
					isUsed: '0',//是否启用
					index: null,
					specList: []
				},
				newData: [],
				showDate: {//页面显示
					brandName: '',//商品品牌
					picUrl: require('@/assets/img/salerLogo.jpg'),//主图
					smallPic1Url: require('@/assets/img/salerLogo.jpg'),//图1
					smallPic2Url: require('@/assets/img/salerLogo.jpg'),//图2
					smallPic3Url: require('@/assets/img/salerLogo.jpg'),//图3
					smallPic4Url: require('@/assets/img/salerLogo.jpg'),//图4
					goodsTypeName: '',//商品分类
					deliveryMode:['0'],//配送方式(0:自取 1：配送)
					minChang:'',
					minKuan:'',
					maxChang:'',
					maxKuan:'',
				},
				uploadData: {
					id: '',//如果为空则是新增
					goodsName: '',//商品名称
					brandId: '',//商品品牌
					goodprice: 0,//商品平均价
					keywords: '',//商品关键字
					goodsFiles: {
						picUrl: '',//主图
						smallPic1Url: '',//图1
						smallPic2Url: '',//图2
						smallPic3Url: '',//图3
						smallPic4Url: '',//图4
					},
					goodsTypeId: '',//商品分类
					hole: '',//打孔（元/个）
					top: '',//挖角(元/个)
					size:'',
					cycle: '',//生产周期(天)
					dailyCapacity: '',//产量
					deliveryMode:[],//配送方式(0:自取 1：配送)
					goodsSkuList: [{isUsed:'0',salePrice:0,specList:[]}],//玻璃选择内容,属性列表全部
					goodsInfoPC: '',//图文详情
				},
				//验证规则转换
				ReleasRules: {
					goodsName: [{required: true, message: '请填写商品名称', trigger: 'blur'}],
					brandIdRule: [{validator: brandIdRules, trigger: 'change blur'}],
					goodprice: [{required: true, type: 'number', message: '商品均价必须是数字且不能为空', trigger: 'blur'}],
					keywords: [{required: true, message: '请填写产品关键字', trigger: 'blur'}],
					picUrlRule: [{validator: picUrlRules, trigger: 'change'}],
					goodsTypeIdRule: [{validator: goodsTypeIdRules, trigger: 'change blur'}],
					hole: [{required: true, type: 'number', message: '打孔价格必须是数字且不能为空', trigger: 'blur'}],
					top: [{required: true, type: 'number', message: '挖角价格必须是数字且不能为空', trigger: 'blur'}],
					cycle: [{required: true, type: 'number', message: '基础天数必须是数字且不能为空', trigger: 'blur'}],
					minChang: [{validator: minChangRules, trigger: 'blur'}],
					minKuan: [{validator: minKuanRules, trigger: 'blur'}],
					maxChang: [{validator: maxChangRules, trigger: 'blur'}],
					maxKuan: [{validator: maxKuanRules, trigger: 'blur'}],
					dailyCapacity: [{required: true, type: 'number', message: '日产量必须是数字且不能为空', trigger: 'blur'}],
					deliveryModeRule:[{validator: deliveryModeRules, trigger: 'change'}]
				},
				editorOption: {},
			}
		},
		components: {quillEditor, quillRedefine},
		methods: {
			//初始化
			defaultSucc: function (res) {
				// console.log(res);
				let data = res.data;
				let picUrl = this.strSub(data.goodsFiles.picUrl);
				let smallPic1Url = this.strSub(data.goodsFiles.smallPic1Url);
				let smallPic2Url = this.strSub(data.goodsFiles.smallPic2Url);
				let smallPic3Url = this.strSub(data.goodsFiles.smallPic3Url);
				let smallPic4Url = this.strSub(data.goodsFiles.smallPic4Url);
				let goodsTypeId = res.data.goodsTypeId;
				this.attrGet(goodsTypeId);
				//数据传输
				this.uploadData = {
					id: data.id,//如果为空则是新增
					goodsName: data.goodsName,//商品名称
					brandId: data.brandId,//商品品牌
					goodprice: 0,//商品平均价
					keywords: data.keywords,//商品关键字
					goodsFiles: {
						picUrl: picUrl,//主图
						smallPic1Url: smallPic1Url,//图1
						smallPic2Url: smallPic2Url,//图2
						smallPic3Url: smallPic3Url,//图3
						smallPic4Url: smallPic4Url,//图4
					},
					goodsTypeId: data.goodsTypeId,//商品分类
					hole: parseFloat(data.hole),//打孔（元/个）
					top: parseFloat(data.top),//挖角(元/个)
					cycle: parseFloat(data.cycle),//生产周期(天)
					size: data.size,//最大最小尺寸
					dailyCapacity: parseFloat(data.dailyCapacity),//产量
					deliveryMode: data.deliveryMode,//配送方式(0:自取 1：配送)  字符串转数组
					goodsSkuList: data.skulist,//玻璃选择内容,属性列表全部
					goodsInfoPC: data.goodsInfoPC,//图文详情
				};
				//数据显示
				let Pic1Url =data.goodsFiles.smallPic1Url;
				let Pic2Url =data.goodsFiles.smallPic2Url;
				let Pic3Url =data.goodsFiles.smallPic3Url;
				let Pic4Url =data.goodsFiles.smallPic4Url;
				this.showDate.brandName=data.brandName;//商品品牌
				this.showDate.picUrl=data.goodsFiles.picUrl;//主图
				this.showDate.goodsTypeName=data.goodsTypeName;//商品分类
				this.showDate.deliveryMode=data.deliveryMode.split(',');//配送方式(0:自取 1：配送)  字符串转数组
				if(Pic1Url !=''&& Pic1Url != null){
					this.showDate.smallPic1Url= data.goodsFiles.smallPic1Url;//图1
				}
				if(Pic2Url !=''&& Pic2Url != null){
					this.showDate.smallPic2Url=data.goodsFiles.smallPic2Url;//图2
				}
				if(Pic3Url !=''&& Pic3Url != null){
					this.showDate.smallPic3Url= data.goodsFiles.smallPic3Url;//图3
				}
				if(Pic4Url !=''&& Pic4Url != null){
					this.showDate.smallPic4Url=data.goodsFiles.smallPic4Url;//图4
				}
				this.showDate.minKuan=data.size.split(',')[0];//最小尺寸，进行分割
				this.showDate.minChang=data.size.split(',')[1];//最小尺寸，进行分割
				this.showDate.maxKuan=data.size.split(',')[2];//最大尺寸，进行分割
				this.showDate.maxChang=data.size.split(',')[3];//最小尺寸，进行分割
			},
			//图片地址提取
			strSub: function (data) {
				let index = data.indexOf('/');
				let realdata = data.substring(index);
				return realdata
			},
			//运费数组转字符[
			deliveryChange:function (data) {
				this.uploadData.deliveryMode = data.join(',');
			},
			//尺寸组合
			sizeJoin:function(){
				this.uploadData.size = this.showDate.minKuan+','+this.showDate.minChang+','+this.showDate.maxKuan+','+this.showDate.maxChang
			},
			//品牌获取
			brandIdRequest: function () {
				this.brandIdCover = true;
				axios.post('/saler/brand').then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							// console.log(res);
							this.brandIdData = res.data
						}
					}
				)
			},
			//品牌选中
			brandIdSelected: function () {
				let selectedNode = this.$refs.brandIdSelected.getSelectedNodes();
				if (selectedNode.length > 0) {
					this.uploadData.brandId = selectedNode[0].id;
					this.showDate.brandName = selectedNode[0].title;
				}
			},
			//主商品图片上传
			picUrlSuccess: function (res) {
					this.uploadData.goodsFiles.picUrl = res.data;
					this.showDate.picUrl =  res.data;
			},
			//详细图片上传
			smallPic1UrlSuccess: function (res) {
					this.uploadData.goodsFiles.smallPic1Url =   res.data;
					this.showDate.smallPic1Url =   res.data;
			},
			smallPic2UrlSuccess: function (res) {
					this.uploadData.goodsFiles.smallPic2Url =   res.data;
					this.showDate.smallPic2Url =   res.data;
			},
			smallPic3UrlSuccess: function (res) {
					this.uploadData.goodsFiles.smallPic3Url =   res.data;
					this.showDate.smallPic3Url =  res.data;
			},
			smallPic4UrlSuccess: function (res) {
					this.uploadData.goodsFiles.smallPic4Url =  res.data;
					this.showDate.smallPic4Url =  res.data
			},
			Showphoto: function () {
				this.photoShow = true;
				this.btnHide = false;
			},
			//商品分类判断
			goodsTypeIdRequest: function () {
				if(this.isChange){
					if(this.isOne){
						this.getgoodsType();
						this.isOne = false;
					}else {
						this.$Modal.confirm({
							title: '请您确认',
							content: '<p style="color: red;font-size: 16px">更换商品分类将会清除一些数据，是否更换？</p>',
							onOk: () => {
								this.clearGoodsNow();
								this.uploadData.goodsSkuList=[{}];//玻璃选择内容,属性列表全部
								this.getgoodsType();
							},
						});
					}
				}else {
					this.$Notice.error({
						title: '修改商品不可以更换商品分类',
						desc:''
					})
				}
			},
			//获取商品分类
			getgoodsType:function () {
				this.goodsTypeIdCover = true;
				axios.post('/saler/goodsTypeTree').then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.goodsTypeIdData = res.data
						}
					}
				)
			},
			//商品分类选中
			goodsTypeIdSelected: function () {
				let selectedNode = this.$refs.goodsTypeIdSelected.getSelectedNodes();
				let ID = selectedNode[0].id;
				let Title = selectedNode[0].title;
				if (selectedNode.length > 0) {
					this.uploadData.goodsTypeId = ID;
					this.showDate.goodsTypeName = Title;
					this.attrGet(ID);
				}
			},
			//商品属性获取
			attrGet: function (ids) {
				// console.log(ids)
				axios.get('/saler/attr/' + ids).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							// console.log(res);
							if (res.data.length == 0) {
								// this.attrContent = res.data;
								this.showItem = false;
								this.$Notice.error({
									title: '哎呀！该分类暂无属性，请重新选择~',
									desc: ''
								});
							} else {
								this.attrContent = res.data;
								// this.uploadData.goodsSkuList= [{isUsed:'0',salePrice:0,specList:[]}];
								this.showItem = true;
							}
						}
					}
				)
			},
			//添加一行
			addLi: function (index) {
				this.uploadData.goodsSkuList.splice((index + 1), 0, this.uploadData.goodsSkuList[index]);
			},
			//删除一行
			reduceLi: function (index) {
				if (this.uploadData.goodsSkuList.length > 1) {
					this.uploadData.goodsSkuList.splice(index, 1);
				} else {
					this.$Message.error('哎呀！这是最后一条啦~');
				}
			},
			//列表每一行item点击
			itemClick: function (name, id, count) {
				this.clearGoodsNow();
				this.goodsNow.attId = id;
				this.goodsNow.attName = name;
				this.goodsNow.index = count;
			},
			//列表每一行item选中
			itemSelected: function (res) {
				if (res != undefined) {
					this.goodsNow.attValNo = res.value;
					this.goodsNow.attValContent = res.label;
				}
				//调用
				this.addData();
			},
			//缓存的数据重置
			clearGoodsNow: function () {
				this.goodsNow = {//选择临时存放
					attId: "",
					attName: "",
					attValNo: "",
					attValContent: "",
					index: null,
				};
				this.goodsLiNow = {//一行列表临时存放
					salePrice: 0,
					// marketPrice: null,
					isUsed: '0',
					index: null,
					specList: []
				}
			},
			salePriceBlur: function (index) {
				let salePrice = this.$refs.salePrice[index].currentValue;
				if (JSON.stringify(this.uploadData.goodsSkuList[index]) != "{}") {
					this.goodsLiNow = JSON.parse(JSON.stringify(this.uploadData.goodsSkuList[index]));
				}
				this.goodsLiNow.salePrice = salePrice;
				// //调用
				this.addgoodsSkuList(index);

			},
			//市场价
			// marketPriceBlur: function (index) {
			// 	let marketPrice = this.$refs.marketPrice[index].currentValue;
			// 	if (JSON.stringify(this.uploadData.goodsSkuList[index]) != "{}") {
			// 		this.goodsLiNow = JSON.parse(JSON.stringify(this.uploadData.goodsSkuList[index]));
			// 	}
			// 	this.goodsLiNow.marketPrice = marketPrice;
			// 	// //调用
			// 	this.addgoodsSkuList(index);
			// },
			isUseChoose: function (res) {
				this.goodsLiNow.isUsed = res;
				let index = this.goodsLiNow.index;
				//调用
				this.addgoodsSkuList(index);
			},
			isUseClick: function (index) {
				if (JSON.stringify(this.uploadData.goodsSkuList[index]) != "{}") {
					this.goodsLiNow = JSON.parse(JSON.stringify(this.uploadData.goodsSkuList[index]));
				}
				this.goodsLiNow.index = index;
			},
			//每次输入时goodsLiNow向goodsSkuList写入
			addData() {
				//数据写入goodsLiNow
				let deepCopy = JSON.parse(JSON.stringify(this.goodsNow));//深度copy
				let currentIndex = deepCopy.index;
				let SpecList;
				//检测是有点击事件，否就不往下执行
				if (currentIndex == null) {
					return;
				}
				let arr = this.uploadData.goodsSkuList[currentIndex];
				//第一次输入
				if (JSON.stringify(arr) == "{}" || arr.specList.length == '0') {
					SpecList = this.goodsLiNow.specList;
					this.removeRepeat(SpecList, deepCopy, currentIndex);//去重
				} else {//第二次输入
					SpecList = arr.specList;
					this.goodsLiNow = JSON.parse(JSON.stringify(arr));
					this.removeRepeat(SpecList, deepCopy, currentIndex);//去重
				}
			},
			//去重检测
			removeRepeat: function (SpecList, deepCopy, currentIndex) {//判断是否重复
				let goodsLiNow = this.goodsLiNow.specList;
				if (SpecList.length > 0) {
					let count;
					for (let i = 0; i < SpecList.length; i++) {
						let m = SpecList[i].attName;
						if (m == deepCopy.attName) {//重复时，赋值
							this.$set(goodsLiNow, i, deepCopy);//向一行列表传值
							break;
						}
						count = i;
					}
					if (count == (SpecList.length - 1)) {//不重复，添加
						this.$set(goodsLiNow, SpecList.length, deepCopy);//向一行列表传值
					}
				} else if (SpecList.length == '0') {//第一次赋值
					this.$set(goodsLiNow, 0, deepCopy);//向一行列表传值
				};
				this.addgoodsSkuList(currentIndex);//写入
			},
			//数据写入goodsSkuList
			addgoodsSkuList: function (currentIndex) {
				let arr = this.uploadData.goodsSkuList;
				let arr2 = JSON.parse(JSON.stringify(this.goodsLiNow));//深度copy
				let index = currentIndex;

				this.$set(arr, index, arr2);//数据写入
			},
			//最后三个数据注入
			salePrice: function (count) {
				this.clearGoodsNow();
				let arr = this.uploadData.goodsSkuList;
				let _data;
				if (JSON.stringify(arr[0]) != "{}" && arr.length > 0) {
					_data = arr[count].salePrice
				}else {
					_data = 0;
				}
				return _data
			},
			// marketPrice: function (count) {
			// 	this.clearGoodsNow();
			// 	let arr = this.uploadData.goodsSkuList;
			// 	if (JSON.stringify(arr[0]) != "{}" && arr.length > 0) {
			// 		return arr[count].marketPrice
			// 	}
			// 	return null;
			// },
			isUse: function (count) {
				this.clearGoodsNow();
				let arr = this.uploadData.goodsSkuList;
				let _data;
				if (JSON.stringify(arr[0]) != "{}" && arr.length > 0) {
					_data= arr[count].isUsed
				}else {
					_data= '0';
				}
				return _data;
			},
			//选中数据注入
			matchData: function (ids, count, indexs) {
				let arr = this.uploadData.goodsSkuList;
				let arr2 = arr[count].specList;
				if (arr2 != undefined && arr2.length > 0) {
					for (let i = 0; i < arr2.length; i++) {
						if (arr2[i].attId == ids) {
							return arr2[i].attValNo;
						}
					}
				} else {
					return;
				}
			},
			//改变分类，去除多余数据
			changeData: function () {
				let arr = this.attrContent;
				let upArr = this.uploadData.goodsSkuList;
				let newArr = [];
				for (let m = 0; m < upArr.length; m++) {
					let SpecList = upArr[m].specList;
					let newSpecList = [];
					for (let n = 0; n < SpecList.length; n++) {
						for (let i = 0; i < arr.length; i++) {
							if (SpecList[n].attId == arr[i].id) {
								newSpecList[i] = SpecList[n]
							}
						}
					}
					newArr[m] = {//新的数据
						dailyCapacity: upArr[m].dailyCapacity,
						goodsSPUId: upArr[m].goodsSPUId,
						id: upArr[m].id,
						isUsed: upArr[m].isUsed,
						// marketPrice: upArr[m].marketPrice,
						saleNum: upArr[m].saleNum,
						salePrice: upArr[m].salePrice,
						specList: newSpecList,
						storageCount: upArr[m].storageCount,
						storagePrice: upArr[m].storagePrice,
						teptId: upArr[m].teptId
					}
				}
				return newArr;
			},
			//数据提交
			submitInfo: function () {
				this.$refs.ReleaseDate.validate((valid) => {
					if (valid) {
						if (parseFloat(this.showDate.minKuan) <= parseFloat(this.showDate.minChang) ){//最小宽小于最小长
							if (parseFloat(this.showDate.maxKuan) <= parseFloat(this.showDate.maxChang) ){//最大宽小于最大长
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
								this.sizeJoin();//长宽合并
								if(this.$refs.EditorContent._content == null || this.$refs.EditorContent._content == undefined){
									this.uploadData.goodsInfoPC = '<p><p/>';
								}else {
									this.uploadData.goodsInfoPC = this.$refs.EditorContent._content;
								}
								let goodsSkuList = this.changeData();
								this.uploadData.goodsSkuList = goodsSkuList;
								axios.post('/saler/salerGoods', this.uploadData, {headers: {"Content-Type": "application/json;charset=utf-8"}}).then(response => {
									let res = JSON.parse(response.request.response);
									// console.log(res);
									if (res.code == '200') {
										this.$Spin.hide();
										this.$Message.success({
											content: "数据提交成功",
											duration: 5,
										});
										// document.body.scrollTop = document.documentElement.scrollTop = 0;
										this.$router.push('/salerInfo/RProduct')
									}else{
										this.$Spin.hide();
										this.$Message.error({
											content: "数据提交失败",
										});
									}
								});
							}else {
								this.$Message.error({
									content:'最大宽度应小于最大长度!',
									duration:5
								});
								document.querySelector("#maxSize").scrollIntoView(true);
							}
						}else {
							this.$Message.error({
								content:'最小宽度应小于最小长度!',
								duration:5
							});
							document.querySelector("#minSize").scrollIntoView(true);
						}
					} else {
						this.$Message.error('请完整正确的填写表格!');
					}
				});
			}
		},
		created() {
         this.loginnamed= sessionStorage.username
			let id = this.$route.params.id;
			if (id != undefined) {
				axios.get('/saler/salerGoods/' + id).then(
					response => {
						let res = JSON.parse(response.request.response);
						// console.log(res);
						if (res.code == '200') {
							this.isChange = false;
							this.defaultSucc(res);
						}
					}
				)
			}
			this.editorOption = quillRedefine(//编辑器自定义
				{
					// 图片上传的设置
					uploadConfig: {
						action: this.host + '/upload/uploadFile',  // 必填参数 图片上传地址
						// 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
						// 你必须把返回的数据中所包含的图片地址 return 回去
						res: (response) => {
                            let res =  response.data;
							return res; // 这里切记要return回你的图片地址
						},
						methods: 'POST',
						name: 'file',
					},
					placeholder: '请输入商品详情....',  // 可选参数 富文本框内的提示语
				}
			);
		}
	}
</script>

<style scoped>
	.releaseType,.releaseOut{
		/*position: absolute;*/
		border-spacing: 0;
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
		width: 98%;
		margin: 0 auto 20px;
	}
	.itemUl{
		width: 300px;
		display: inline-block;
	}
	.itemLi{
		width: 100%;
		height: 30px;
		line-height: 30px;
	}
	.itemLi em{
		display: inline-block;
		float: left;
		overflow: hidden;
		width: 25.33%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 15px;
	}
	.jiaIcon{
		height: 90%;
		padding-top: 5%;
		width: auto;
		display: inline-block;
	}
	.jianIcon{
		height: 90%;
		padding-top: 5%;
		width: auto;
		display: inline-block;
	}
	.itemA{
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		/*color: #00b3ff;*/
		font-weight: bold;
		background-color: #72c4e7;
		color: #fff;
	}
	.itemB{
		/*padding: 8px 0;*/
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-left: 1px solid rgba(0, 0, 0, 0.1);
	}
	.mybtn {
		width: 100%;
		text-align: center;
	}
	.outBtn{
		margin-bottom:20px;
	}
	.outHead{
		font-size: 16px;
		margin-left: 16px;
		margin-bottom: 5px;
		color: #00a2ffc7;
		font-weight: bold;
	}
	.outUl{
		display: inline-block;
	}
	.outLi{

	}
	.outA{
		font-weight: bold;
		background-color: #72c4e7;
		color: #fff;
	}
	.outB{
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.outLi em{
		display: inline-block;
		/*float: left;*/
		overflow: hidden;
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 15px;
	}
	.em1{
		width: 12% !important;
	}
	.outLi1{
		width: 36px !important;
	}

	.scrollBar::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}

	.scrollBar::-webkit-scrollbar {
		height: 10px;
		background-color: #F5F5F5;
	}

	.scrollBar::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #a5a5a5;
	}

	.releaseHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.releaseHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.releaseContent {
		padding: 30px 0 60px 0;
	}

	.Public1 {
		height: 48px;
		margin-bottom: 20px;
	}

	.Public1 em:first-child {
		display: inline-block;
		margin: 5px 0 0 52px;
		font-size: 16px;
	}

	.Public2 {
		vertical-align: top;
		margin-left: 40px;
		display: inline-block;
	}

	.Unit {
		display: inline-block;
		border: 1px solid #ccc;
		height: 28px;
		line-height: 28px;
		width: 60px;
		font-size: 16px;
		text-align: center;
		box-sizing: border-box;
		border-radius: 5px;
		margin-left: 73px;
	}

	em {
		text-decoration: none;
		font-style: normal;
		margin: 0;
		padding: 0;
		vertical-align: top;
	}

	.releasePhoto {
		width: 840px;;
		margin: 0px auto 20px;
	}

	.photoHead {
		background-color: #72c4e7;
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		color: #fff;
	}

	.photoHead em {
		display: inline-block;
		width: 100px;
		margin-left: 120px;
		text-align: center;
	}
	.photoHead em:nth-child(2){
		width: 150px;
	}
	.photoHead em:last-child{
		margin-left: 143px;
	}

	.li1L, .li2L, .li3L, .li4L, .li5L {
		display: inline-block;
		width: 100px;
		height: 100px;
		margin: 20px 120px;
	}

	.li1M, .li2M, .li3M, .li4M, .li5M {
		display: inline-block;
		width: 150px;
		height: 100px;
		/*line-height: 100px;*/
		text-align: center;
		font-size: 18px;
		margin-top: 20px;
		padding-top: 33px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.li1R, .li2R, .li3R, .li4R, .li5R {
		display: inline-block;
		vertical-align: top;
		width: 80px;
		height: 50px;
		margin: 55px 0 0 160px;
	}

	.photoUl li {
		border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
	}

	.photoBtn {
		margin-top: 15px;
	}

	.public3 {
		display: inline-block;
		margin: 5px 0 0 0px;
		font-size: 16px;
	}

	.releaseDetail {
		margin-bottom: 20px;
	}

	.releaseDetail em:first-child {
		display: inline-block;
		margin: 5px 0 0 52px;
		font-size: 16px;
	}

	.detailInput {
		width: 90%;
		margin: 10px auto;
	}

	.yieldUp {
		vertical-align: sub;
	}

	.submit {
		margin: 40px 0 0 164px;
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

	.businessInput {
		margin-left: 73px;
	}

	.yieldInput {
		margin-left: 57px;
	}

	.priceInput, .keywordInput {
		margin-left: 25px;
	}

	.categoryInput {
		margin-left: 9px;
	}

	.releaseUl {
		font-size: 16px;
		width: 840px;
		margin: 0px auto 20px;
	}

	.photoUl img {
		width: 100%;
		height: 100%;
	}

	.ulWrap {
		width: 840px;
		border-spacing: 0;
		overflow-x: scroll;
		overflow-y: hidden;
	}

	.ulWrap li {
		white-space: nowrap;
	}

	.ulWrap li em {
		display: inline-block;
		width: 135px;
		text-align: center;
		margin: 0px 2px 0px;
	}

	.ulWrap::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}

	.ulWrap::-webkit-scrollbar {
		height: 10px;
		background-color: #F5F5F5;
	}

	.ulWrap::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #a5a5a5;
	}

	.liHead {
		display: inline-block;
		font-size: 16px;
		height: 42px;
		line-height: 42px;
		color: #fff;
		background-color: #72c4e7;
	}

	.liModel {
		display: inline-block;
		font-size: 16px;
		height: 42px;
		line-height: 42px;
		color: #3c3c3c;
		text-align: center;
		background-color: #f2f2f2;
		margin-top: 5px;
	}

	.addIcon {
		height: 40px;
		width: 40px;
	}

	.reduceIcon {
		height: 40px;
		width: 40px;
	}

	.ulWrap li em .ivu-select {
		width: 80%;
	}

	.ulWrap li em .ivu-input-wrapper {
		width: 80%;
	}

	.ulWrap li em:first-child, .ulWrap li em:nth-child(2), .ulWrap li em:nth-child(3) {
		width: 83px;
	}

	.itemInput {
		width: 80%;
	}
	.deliverInput{
		font-size: 16px;
	}
	.sizeStyle{
		font-size: 16px;
		display: inline-block;
	}
	.releasePunch{
		margin-top: 20px;
	}
</style>
