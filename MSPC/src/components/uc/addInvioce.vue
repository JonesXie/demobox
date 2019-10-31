<template>
    <div > 
        <div class="uersinfo_header">
			<strong>发票统一管理</strong>
		</div>
        <div class="addinmain">
             <div class="addmaim_herder">
                  <Row type="flex" justify="center" class="code-row-bg">
                <Col span="12">
                    <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="8">店铺名称选择</Col>
                            <Col span="16"><Select v-model="shopid" clearable style="width:260px" @on-change="seacrdata">
                                <Option v-for="item in cityList" :value="item.id" :key="item.id" >{{ item.shopname }}</Option>
                            </Select></Col>
                        </Row>
                </Col>
                <Col span="8">
                     <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="8">店铺名称查询</Col>
                            <Col span="14">
                                 <Input v-model="shopname" placeholder="请输入店铺名称"  />
                            </Col>
                        </Row>
                </Col>
                <Col span="4"> <Button type="info" style="width:100%">查询</Button></Col>        
              </Row>
             </div>
             <div class="title">
                 <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="5">订单编号</Col>
                        <Col span="5">商品名称</Col>
                        <Col span="5">支付时间</Col>
                        <Col span="5">开票金额</Col>
                        <Col span="4">状态</Col>
                    </Row>
             </div>
              <div style="margin:20px auto">
                 <Table :border="false" ref="selection" :columns="columns4" :data="data1" @on-selection-change="seledata"></Table>        
             </div>
             <div style="margin:10px auto;height:45px;line-height:45px">
                  <Row>
                <Col span="5">  <Button type="info" style="width:200px" @click="moadshow">索取发票</Button></Col>
                <Col span="15" offset="1" style="text-align:left;font-size:14px">待开发票金额: <span style="color:#ff0000"> ￥  {{orderprice}}</span> (共 {{ordelength}} 笔订单)</Col>
            </Row>       
             </div>
        </div>
          <Modal
           v-model="modal6"
           title="统一开具发票"
           :mask-closable="false"
           :footer-hide="true"
           :width="800">
          <div class="divformoadl">
               <div class="divformoadl_header">您共选取了 <span style="color:#ff0000"> {{ordelength}} </span> 笔订单开具发票 (订单金额将合并在一个票据中)</div>
               <div class="divformoadl_header2">开票公司 :<span style="color:#199ed8">{{shopNames}}  &nbsp;  &nbsp; &nbsp; </span>开票金额 :<span style="color:#ff0000"> {{orderprice}}</span>元</div>
               <div class="divformoadl_body">
                   <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="6" style="text-align:right">发票类型 :</Col>
                        <Col span="15" offset="1">
                            <RadioGroup v-model="billid" >
                                <Radio :label="index.id" v-for="(index,item) in billList" :key="item"><span v-if="index.billType==0">增值税普通发票</span><span v-else>增值税专用发票</span></Radio>
                            </RadioGroup>
                         </Col>
                    </Row>    
               </div>
                <div class="divformoadl_body" style="margin-top:8px">
                   <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="6" style="text-align:right">配送方式 :</Col>
                        <Col span="15" offset="1">
                            <RadioGroup v-model="sendtype" >
                                <Radio label="0">                          
                                <span>自取</span>
                            </Radio>
                            <Radio label="1">
                                <span>邮递</span>
                            </Radio>
                            </RadioGroup>
                         </Col>
                    </Row>    
               </div>
                <div class="divformoadl_body" style="margin-top:8px;height:auto;overflow:hidden;border-bottom:1px solid #ccc">
                   <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="3" style="text-align:right"> </Col>
                        <Col span="18" offset="1">
                        <Row type="flex" justify="start" class="code-row-bg"  style="width:90%">
                        <Col span="4" >收件人</Col>
                        <Col span="6">手机号码</Col>
                        <Col span="14">地址</Col>
                             </Row>  
                         </Col>
                    </Row>                  
               </div>      
              <div class="divformoadl_body" style="margin-top:8px;height:auto;overflow:hidden">   
                 <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="3" style="text-align:right"> </Col>
                        <Col span="18" offset="1">
                          <div class="noname">
                                                  
                          <Row type="flex" justify="start" class="code-row-bg"  v-for="(index,item) in addressLst" :key="item">
                               <Col span="1">  <RadioGroup v-model="addressid" >
                                     <Radio :label="index.id" >  
                                         <span> </span>
                                  </Radio>
                                    </RadioGroup> 
                                    </Col>
                                <Col span="3" >  {{index.userName}}</Col>
                                <Col span="5"> {{index.phone}}</Col>
                                <Col span="12">  {{index.addressName}}-{{index.address}}  </Col>
                            </Row>   
                            
                        </div>  
                         </Col>
                    </Row>  
               </div> 
                <div class="divformoadl_body" style="margin:0 auto;text-align:center;margin-top:20px;">
                   <Button type="success" @click="okbill">开具发票</Button>
               </div>
          </div>
    </Modal>
    
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            billid:'',
            addressLst:[],
            addressid:'',
            sendtype:'',
            billList:[],
            orderIds:'',
            modal6:false,
            shopid:'',
            shopname:'',
            orderlist:[],
            cityList: [],    
            shopNames:"",
             ordelength:'',   
             orderprice:'',
                columns4: [
                       {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: ' ',
                        key: 'orderNo',
                        align: 'center'
                    },
                     {
                        title: ' ',
                        key: 'orderNo',
                       render: (h, params) => {
                            const row=params.row;
                            const shopname=row.orderInfos[0].combinate;
                            return h('span', {
                            },shopname)
                        },
                        align: 'center'
                    },
                     {
                        title: ' ',
                        key: 'orderTime',
                        align: 'center'
                    },
                     {
                        title: ' ',
                        key: 'orderNo',
                       render: (h, params) => {
                            const row=params.row;
                            const shopname=row.orderInfos[0].price;
                            return h('span', {
                            },shopname)
                        },
                        align: 'center'
                    },
                     {
                        title: ' ',
                        key: 'isOpenBill',
                       render: (h, params) => {
                            const row=params.row;
                            const isOpenBill=row.isOpenBill==0?'未索取':'已索取';
                            return h('span', {
                            },isOpenBill)
                        },
                        align: 'center'
                    }
                ],
                data1: [ ]
        }
    },methods:{
       getshopname(){
           this.$http.get('/bill/orderBillShop').then(res=>{
               let resp=JSON.parse(res.request.response)
               if(resp.code==200){
                   this.cityList=resp.data
               }else{
                   this.$Message.error('网络延迟')
               }
           })
       },
		getInvoice() {
				this.$http.get('/bill/query').then(res => {
					let resp = JSON.parse(res.request.response)
					if (resp.code == 200) {
                         this.billList=resp.data
                    if( this.billList.length==0){
                        this.$Message.error('请先去添加发票类型')
                  }
					}
				})
			},
       moadshow(){
           if(this.ordelength==0){
            this.$Message.error('请先勾选需要开发票的订单!')
           }else{
               this.modal6=true;
               this.getInvoice();
                let _data={
                    shopId:this.shopid,
                    orderIds:this.orderlist
                }
           this.$http.post('/bill/billParam', _data).then(res=>{
                   let resp=JSON.parse(res.request.response)
                 if(resp.code==200){
                     this.shopNames=resp.data.shopName;
                     this.addressLst=resp.data.memAddressList;
                     this.orderIds=resp.data.orderIds
                     if( this.addressLst.length==0){
                           this.$Message.error('请先添收货地址!')
                     }
                 }else{
                     this.$Message.error('网络延迟,莫慌!')  
                 }
           })
           }        
       },
       okbill(){     
           if(this.sendtype==''){
             this.$Message.error('请填写配送方式!')     
           }
             else if(this.billid==''){
                this.$Message.error('请勾选发票类型!')     
            } else if(this.addressid==''){
                  this.$Message.error('请勾选收货地址!')  
            }else{
            let   _data={
                          shopId:this.shopid,
                          addressId:this.addressid,
                          billId:this.billid,
                          getType:this.sendtype,
                          orderIds:this.orderIds,
                          amount:this.orderprice
                    }
                    this.$http.post('/bill/issueBill',_data).then(res=>{
                        console.log(res)
                            let resp=JSON.parse(res.request.response)
                            if(resp.code==200){
                                this.$Message.success('开具发票成功')  
                                this.modal6=false

                        }else{
                            this.$Message.error('网络延迟!')
                        }
                    })
            }    
       },
       seacrdata(){
           let _data={
               shopId:this.shopid
           }
           this.$http.post('/bill/orderBillList', qs.stringify(_data)).then(res=>{         
                let resp=JSON.parse(res.request.response)
               if(resp.code==200){
                 //  this.data1=resp.data.list
                   let adata=resp.data.list.map((a,b)=>{
                       let obj={}
                        obj.amount=a.amount;
                        obj.deliveryMode=a.deliveryMode;
                        obj._disabled=a.disabled;
                        obj.isOpenBill=a.isOpenBill;
                        obj.orderId=a.orderId;
                        obj.orderNo=a.orderNo;
                        obj.orderStatus=a.orderStatus;
                        obj.orderTime=a.orderTime;
                        obj.payMoney=a.payMoney;
                        obj.totalProcess=a.totalProcess;
                        obj.orderInfos=a.orderInfos;
              return obj
                   })
                   this.data1=adata
                   if(resp.data.list.length==0){
                       this.$Message.error('此店铺没有未开具发票的订单')
                   }
               }else{
                   this.$Message.error('网络延迟!')
               }
           })       
       },
       seledata(currentRow){     
         if(currentRow.length!=0){
             this.ordelength=currentRow.length;
          let avi=[]
          this.orderlist=[]
         let price= currentRow.forEach((a,v)=>{     
             avi.push(a.orderInfos[0].price) 
             this.orderlist.push(a.orderId) 
                   })
        let passeveryPrice = avi.reduce((prev, next) => {
						return Number(prev) + Number(next)
            })
         this.orderprice=passeveryPrice;
         }else{
               this.orderprice=0;
               this.ordelength=0
         }
       }
    },created(){
        this. getshopname()
    }
}
</script>
<style scoped>
.divformoadl_body .noname .ivu-radio{    margin-right: 4px; white-space: nowrap;  position: relative;  line-height: 1; cursor: pointer;   display: block;    width: 20px;   height: 20px; float: left;}
.addmaim_herder{ height: auto;line-height: 50px; width: auto}
.addinmain{width: 96%;margin: 0 auto;text-align: center;}
.divformoadl_body{ width: 750px;height: 30px;margin: 0 auto;margin-top: 20px}
.divformoadl{ width: 100%;height: auto; padding: 0px 0 10px 0;margin: 0 auto;}
.divformoadl_header{ height: 40px;line-height: 40px;width: 100%; background: #f3f3f3;text-indent: 12px}
.divformoadl_header2{ height: 30px;line-height: 30px;width: 100%;text-align: center; }
.title{ width: 100%;height: 40px;line-height: 40px;background: #bcc2c2;margin: 10px auto}
.uersinfo_header {width: 100%;height: auto;	border-bottom: 1px solid #d8d8d8;font-size: 16px;line-height: 45px;	text-indent: 25px}
</style>

