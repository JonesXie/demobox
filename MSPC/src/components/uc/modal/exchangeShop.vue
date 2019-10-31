<template>
	<div>
		<Modal title="选择商家" v-model="exhangshopModal" :closable="false" @on-ok="childEmit" :mask-closable="false"
			   @on-cancel="donotemit">
			<div class="moadltable" v-if="dats">
				<ul>
					<li  v-if="val.id!=null" :class="{shpolistacitve:vars==shopindex}" v-for="(val,vars) in shoplistData" :key="vars"
						@click="hasShop(val.id,vars,val.shopname,val.goodsSKUId,val.goodsSPUID)">{{val.shopname}}
					</li>
				</ul>
			</div>
            <div class="demo-spin-col" v-if="loadings">
             <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中......</div>
            </Spin>
            </div>
		</Modal>
	</div>
</template>
<script>
	import qs from 'qs'
	export default {
		props: ["show", "combinates", "showshopid",'goodsTypeId'],
		data() {
			return {
                loadings:true,
                dats:false,
                goodsId:'',
				exhangshopModal: false,
				shoplistData: [],
				shopindex: 1000,
				combinate: '',
				shopid: '',
				emitData: [],
				shopname: '',
				id: ''
			}
		},
		methods: {
			getinfo() {
                let _data={
                    skuStr:this.combinate,
                    shopId:this.shopid ,
                    goodsTypeId:this.goodsId
                }               
				this.$http.post('/store/shopListV2', qs.stringify(_data)).then(res => {
                    let resp = JSON.parse(res.request.response)                      
					if (resp.code == 200) {
                          this.dats=true
                          this.loadings=false          
                        if(resp.data.length==0){
                            this.$Message.error('其他店铺暂无类似产品')            
                        }
                           this.shoplistData = resp.data
					}else if(resp.code ==400 ){
                          this.dats=true
                          this.loadings=false 
                          this.$Message.error('暂无此类产品')   
                    }
				})
			},
			hasShop(e, ev, c, d,f) {
				this.shopindex = ev
				let _data = {
					goodsSPUId:f,
                    goodsSKUId: d,
                   skuStr:this.combinate
				}
				this.$http.post('/store/changeShopV2', qs.stringify(_data)).then(res => {
                    let resp = JSON.parse(res.request.response)
                  	if (resp.data == null) {
						this.$Message.error(`此店铺没有相同产品`)
					} else if (resp.code != 200) {
						this.$Message.error('参数错误')
					}
					else if (resp.data.GoodsSkuDto != null) {
						this.$Message.success(`此店铺有相同产品 价格 : ${resp.data.GoodsSkuDto.salePrice}`)
                        this.emitData = resp.data       
						this.shopname = c
						this.id = e
					}
				})
			},
			childEmit() {
				let infos = []
				if (this.emitData.GoodsSkuDto != null) {
					var _data = {
						childcombinate: false,
						info: this.emitData.GoodsSkuDto,
						shopname: this.shopname,
						id: this.id,
						message: this.emitData.message,
						distributionModel: this.emitData.distributionModel
					}
				} else {
					var _data = {
						childcombinate: false,
						info: []
					}
                }
            //    console.log(_data,'datas')
				this.$emit('childByValue', _data)
			},
			donotemit() {
				let _data = {
					childcombinate: false,
					info: []
				}
				this.$emit('childByValue', _data)
			}
		},
		watch: {
			show: function () {
				this.exhangshopModal = this.show
				if (this.show) {
				 setTimeout(()=>{
                 	this.getinfo()
                 },200)
					this.shopindex = 1000
				}
			},
			combinates: function () {
				this.combinate = this.combinates
			},
			showshopid: function () {
				this.shopid = this.showshopid
            },
            goodsTypeId:function(){
                this.goodsId=this.goodsTypeId
            }
		}
	}
</script>
<style scoped>
   .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
	.moadltable {
		width: 400px;
		min-height: 100px;
		margin: 20px auto;
	}

	.moadltable ul li {
		padding: 0px 20px;
		height: 30px;
		line-height: 30px;
		cursor: pointer;;
		text-align: center;
		border: 1px solid #ccc;
		margin: 0px 15px 15px 0px;
		float: left;
	}

	.shpolistacitve {
		color: #199de8;
		border: 1px solid #199de8 !important
	}

</style>
