<template>
    <div style="margin-bottom:20px">     
 <div class="addinmain">
     <div class="uersinfo_header" style="text-align:left">
			<strong>发票记录</strong>
	</div>
      <div class="addmaim_herder" style="width:96%:margin:0 auto">
              <Row type="flex" justify="start" class="code-row-bg">
               
                <Col span="8" >
                       <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="8">店铺名称查询</Col>
                            <Col span="14">
                                 <Input v-model="shopname" placeholder="请输入店铺名称"  />
                            </Col>
                        </Row>
                   </Col>
                 <Col span="8">    
                      <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="8">发票状态</Col>
                            <Col span="14">
                                  <Select v-model="status" >
                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                            </Col>
                        </Row> 
                </Col>
                <Col span="4" offset="4"> <Button type="info" style="width:100%" @click="searchBllhistoryList(1)">查询</Button></Col>        
              </Row>
            </div> 
            <div style="width:96%:margin:0 auto">
                  <Table stripe :columns="columns1" :data="hasbillList"></Table>
            </div> 
            <div style="margin:10px auto;text-align:center">
                 <Page :total="billlength" :current="current"  @on-change="pagechange"/>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{    
            shopname:'',
            data1: [ ],
            current:1,
            billlength:1,
            status:'',
            cityList: [
                    {
                        value: '1',
                        label: '已开'
                    },
                    {
                        value: '0',
                        label: '未开'
                    }
                ],
                hasbillList:[

                ],
                  columns1: [
                    {
                        title: '店铺名',
                        key: 'shopName' 
                    },
                    {
                        title: '发票类型',
                        key: 'billType',
                        render: (h, params) => {
                            const row=params.row;
                            const status=row.billType=='0'?'增值税普通发票':'增值税专用发票';
                            return h('span', {
                            },status);
                        }
                    },
                    {
                        title: '发票抬头',
                        key: 'title'
                    },
                    {
                        title: '税务登记号',
                        key: 'accountNo'
                    },
                    {
                        title: '开票金额',
                        key: 'amount'
                    },
                    {
                        title: '状态',
                        key: 'billStatus',
                        render: (h, params) => {
                            const row=params.row;
                            const status=row.billStatus=='0'?'未开':'已开';
                            return h('span', {
                            },status);
                        }
                    }
                    ,
                    {
                        title: '操作',
                        key: 'amount',
                        _disabled: true,
                        render: (h, params) => {
                            if(params.row.billStatus=='0'){
                            return h('div', [
                                h('Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                          click: () => {
                                              let _data={
                                                 id:params.row.id
                                              }
                                           this.$http.post("/bill/delOrderBill",qs.stringify(_data)).then(res=>{
                                             let resp= JSON.parse(res.request.response)
                                             if(resp.code==200){
                                                 this.$Message.success('取消成功')
                                                  this.searchBllhistoryList(1)
                                             }else{
                                                  this.$Message.erroe('操作失败')
                                             }
                                           })            
                                        }
                                    }
                                }, '取消发票')
                            ]);
                           }
                        }
                    }
                ]
        }
    },methods:{
        searchBllhistoryList(pages){
            this.$http.get('/bill/userBill?shopName='+this.shopname+'&billStatus'+this.status+'&page='+pages).then(res=>{ 
                let resp=JSON.parse(res.request.response)
                if(resp.code==200){
                    this.hasbillList=resp.data.list;
                    this.billlength=resp.data.total
                    if(this.hasbillList.length==0){
                        this.$Message.success('并未查询到发票记录')
                    }
                }
            })
        },
        pagechange(page){
             this.searchBllhistoryList(page) 
        }
    },created(){
        this.searchBllhistoryList(1)
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

