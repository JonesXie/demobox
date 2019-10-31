<template>
    <div class="list_p">
        <!-- <div class="list_tables"> 当前所选 >>
             <Tag type="border" closable color="primary" v-for="(item,ins) in pingpai" :key="ins"  closable :fade='false' @on-close="handleClose1">{{item}}</Tag>
             <Tag  type="border" closable color="primary" v-for="(item,ins) in biaoqian" :key="item"  closable :fade='false' @on-close="handleClose2">{{item}}</Tag>
              <Tag  type="border" closable color="primary" v-for="(item,ins) in jutifenlei" :key="item"  closable :fade='false' @on-close="handleClose3">{{item}}</Tag>
        </div> -->
        <div class="list_tab">
             <div class="list_brands">
                <div class="list_brands_left">所有玻璃 :</div>
                <div class="list_brands_right">
                    <Button @click="allProduct">所有种类</Button>
                </div>
            </div>
            <div class="list_brands">
                <div class="list_brands_left">工厂 :</div>
                <div class="list_brands_right">
                    <ul>
                        <li v-for="(val,ins) in brandsList" :key="ins" @click="addtabPingpai(val.shopname,val.id,ins)" :class="{biaoqianListavtive: ins ==pingpaiindex}">{{val.shopname}}</li>
                    </ul>
                </div>
            </div>
             <div class="list_brands" >
              <div class="list_brands_left">分类 :</div>
                <div class="list_brands_right list_brands_right2">
                    <ul>
                        <li v-for="(val,ins) in biaoqianList" :key="ins" @click="addtabFenlei(val.goodsTypeName,val.id,ins)" :class="{biaoqianListavtive: ins ==tabindex}">
                            {{val.goodsTypeName}}   
                        </li>
                    </ul>
                </div>
             </div>
              <div class="list_brands" v-if="detailShow"  v-for="(val,ins) in threeLst" :key="ins" >
               <div class="list_brands_left" >{{ins | meuns}} :</div>
                <div class="list_brands_right list_brands_right2">
                    <ul>
                        <li v-for="(vals,inss) in val" :key="inss"  :class="{biaoqianListavtive: emptyArr.includes(`${ins}${inss}`)}" @click="addtabDetail(vals.goodsTypeName,vals.id,ins,inss)">
                         {{vals.goodsTypeName}}  
                        </li>
                    </ul>
                </div>
             </div>
        </div>
        <div class="list_info">
            <div class="list_se">
                 <ButtonGroup >
                    <Button :class="{buttonactive:errorindex==0}" @click="searcheFn(0,0)">
                        综合
                        <!-- <Icon type="md-arrow-dropdown"style="font-size:18px;"  /> -->
                    </Button>
                    <Button  :class="{buttonactive:errorindex==1}" @click="searcheFn(1,1)">
                        销量
                         <div class="fr" style="    height: 20px; line-height: 8px;">
                            <p> <Icon type="md-arrow-dropup" style="font-size:18px;    line-height: 10px;" @click.stop="shengxuFn(1,'ASC')"/></p>
                            <p> <Icon type="md-arrow-dropdown" style="font-size:18px;    line-height: 10px;"@click.stop="jiangxuFn(1,'DESC')" /></p>
                        </div>
                    </Button>
                    <Button  :class="{buttonactive:errorindex==2}"@click="searcheFn(2,2)" >
                        人气
                        <!-- <Icon type="md-arrow-dropdown"style="font-size:18px;"  /> -->
                         <div class="fr" style="    height: 20px; line-height: 8px;">
                            <p> <Icon type="md-arrow-dropup" style="font-size:18px;    line-height: 10px;" @click.stop="shengxuFn(2,'ASC')"/></p>
                            <p> <Icon type="md-arrow-dropdown" style="font-size:18px;    line-height: 10px;"@click.stop="jiangxuFn(2,'DESC')" /></p>
                        </div>
                    </Button>
                    <Button  style=" display: -webkit-box;"  :class="{buttonactive:errorindex==3}" @click="searcheFn(3,3)">
                        价格
                        <div class="fr" style="    height: 20px; line-height: 8px;">
                            <p> <Icon type="md-arrow-dropup" style="font-size:18px;    line-height: 10px;" @click.stop="shengxuFn(3,'ASC')"/></p>
                            <p> <Icon type="md-arrow-dropdown" style="font-size:18px;    line-height: 10px;"@click.stop="jiangxuFn(3,'DESC')" /></p>
                        </div>
                    </Button>
                </ButtonGroup>
            </div>
           <div class="list_in">
               价格区间  <Input  style="width: 60px" v-model="formData.priceRangeStart" :number="true"/>&nbsp;&nbsp; ~ &nbsp;&nbsp;<Input  style="width: 60px" v-model="formData.priceRangeEnd" :number="true" />  &nbsp;&nbsp; &nbsp;&nbsp;<Button type="primary" ghost @click="priceSearch">确定</Button>
           </div>
        </div>
        <div class="list_list">
           <div v-if="productList.length!=''">
                <ul>
                    <li v-for="(val,ins) in productList" :key="ins" >
                            <router-link  :to="{path:'/shopdetail',query: {goodsid: val.goodsId,shopid:val.shopId}}">
                                <div class="list_img_center">                               
                                
                                      <img :src='`${val.picUrl}`' >                              
                                </div>
                                <div class="list_p_centers" style="color:#ff0000;font-size:20px;height:50px;line-height:50px">￥ {{val.goodsPrice}}/m²  <span  class="fr" style="color:#999;font-size:15px"> <span style="color:#3653d3">{{val.orderNumber==null?0:val.orderNumber}}</span> 人已下单</span> </div>
                                <div class="list_p_centers" style="font-size:16px;color:#333"><span style="display:block;float:left;width:230px;;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{val.goodsName}}</span></div>
                                <div class="list_p_centers" style="color:#999;font-size:14px;  line-height: 33px;height:30px  "><span class="fl" style="width:130px;height:27px; white-space: nowrap ;overflow: hidden;text-overflow: ellipsis;" >{{val.shopName}}</span> <span  class="fr" style="color:#ff8635" > {{val.city}}{{val.county}}</span> </div>
                            </router-link>
                    </li>
              </ul>
           </div>
           <div v-else style="text-align:center">
               <img src="@/assets/img/null.jpg">
           </div>
        </div>
        <div class="pages" >
             <Page :total="totalLength" size="small"  :current="current"@on-change="pagechange" :page-size="12" />
        </div>
    </div>

    </div>
    </div>
</template>
<style scoped>
.list_p{ width: 100%; height: auto;overflow: hidden; background: #f1f1f1}
.list_tables{ width: 1200px;height: 35px; line-height: 35px;margin: 0 auto;margin-top:10px;background: #fff;font-size: 14px;text-indent: 15px}
.list_tab{ min-height: 120px;background: #fff;margin: 0 auto; width: 1200px;margin-top:10px}
.list_brands{ width: 1200px;overflow: hidden;;border-bottom: 1px solid #d4d4d4;font-size: 14px;color:#666;    padding-top: 20px}
.list_brands_left{ width: 120px;height: 50px; line-height: 30px; text-indent: 20px;float: left;}
.list_brands_right{ width: 1070px; height: auto;float: right;}
.list_brands_right ul li{ width: auto;height: 30px;padding: 0 8px;cursor: default; line-height: 30px;text-align: center;float: left; margin: 0 5px 5px 0px}
.list_brands_right ul li img{ width: 60px;height: 40px;}
.biaoqianListavtive{background:#199ed8 !important;color:#fff }
.list_info{ width: 1200px; height: 40px; background: #fff;margin: 10px auto;}
.list_se{ width: 350px;float: left;   margin-top: 4px;}
.list_in{width: 380px;float: left;height: 40px;line-height: 40px}
.list_list{ width: 1200px;min-height: 280px; margin: 10px auto;overflow: hidden}
.list_list ul li{ width: 295px;;height: 370px; float: left; margin-right: 5px;margin-bottom: 5px;}
.pages{ width: 1200px;height: 40px; margin: 20px auto;text-align: center}
.list_list ul li:hover{box-shadow:0px 0px 2px 2px #ccc ;transition:all  0.7s; }
.list_img_center{ width: 235px;height: 235px; margin: 30px 30px 10px 30px}
.list_img_center img{ width: 235px;height: 235px;}
.list_p_centers{ width: 230px;height: 28px;line-height: 28px;margin: 0 auto;color:#000}
.buttonactive{color:#ff0000}
.list_p{ width: 100%; height: auto;overflow: hidden; background: #f1f1f1}
.list_tables{ width: 1200px;height: 35px; line-height: 35px;margin: 0 auto;margin-top:10px;background: #fff;font-size: 14px;text-indent: 15px}
.list_tab{ min-height: 120px;background: #fff;margin: 0 auto; width: 1200px;margin-top:10px}
.list_brands{ width: 1200px;overflow: hidden;;border-bottom: 1px solid #d4d4d4;font-size: 14px;color:#666;    padding-top: 20px}
.list_brands_left{ width: 120px;height: 50px; line-height: 30px; text-indent: 20px;float: left;}
.list_brands_right{ width: 1070px; height: auto;float: right;}
.list_brands_right ul li{ width: auto;height: 30px;padding: 0 8px;cursor: default; line-height: 30px;text-align: center;float: left; margin: 0 5px 5px 0px}
.list_brands_right ul li img{ width: 60px;height: 40px;}
.biaoqianListavtive{background:#199ed8 !important;color:#fff }
.list_info{ width: 1200px; height: 40px; background: #fff;margin: 10px auto;}
.list_se{ width: 350px;float: left;   margin-top: 4px;margin-left: 18px}
.list_in{width: 380px;float: left;height: 40px;line-height: 40px}
.list_list{ width: 1200px;min-height: 280px; margin: 10px auto;overflow: hidden;background: #fff;}
.list_list ul li{ width: 295px;height: 430px; float: left; margin:10px 3px 10px 2px}
.pages{ width: 1200px;height: 40px; margin: 20px auto;text-align: center}
.list_img_center{ width: 297px;height: 297px; margin: 13px 0px 0px 0px}
.list_img_center img{ width: 270px;height: 290px;    margin-left: 13px;}
.list_p_centers{ width: 230px;height: 28px;line-height: 28px;margin: 0 auto;color:#000}
</style>
<script>

import qs from 'qs'
 export default {
    data(){
         return{
              emptyArr:[],
              pingpai:[],
              current:1,
              shopname1:'',
              biaoqian:[],
              brandsList:[],
              threeLst:[],
              jutifenlei:[],
              detailShow:false,
              biaoqianList:[],
              pingpaiindex:-1,
              tabindex:-1,
              daital:-1,
              productList:[],
              totalLength:1,
              errorindex:-1,
               price1:'',
               price2:'',
               formData:{
                   goodsName:'',
                   deliveryMode:'',
                   goodsTypeId:'', 
                   shopId:'',
                   grandfatherTypeId:'',
                   sortWay:'0',
                   sortType:'',
                   priceRangeStart:'',
                   priceRangeEnd:''
               },
               hasgoodsTypeId:0,
               hasbrandId:0,
               bigTabName:"",
               smallTabName:'',
               firstindex:-1,
               arrForTab:['1111'],
               replaceIndex:{
                  bool:true,
                  index:''
         }
         }
    },
    watch:{
         '$route.query.shopname':function(){
              this.shopgetList()
        },
        '$route.query.deliveryMode':function(){
              this.shopgetList()
        }
    },
    filters:{
        meuns:function(value){
            if(value=='0'){
                return '一级分类'
            }
            else if(value=='1'){
                 return '二级分类'
            }
            else if(value=='2'){
                 return '三级分类'
            }
             else if(value=='3'){
                 return '四级分类'
            }
             else if(value=='4'){
                 return '五级分类'
            }
            else if(value=='5'){
                 return '六级分类'
            } 
            else if(value=='6'){
                 return '七级分类'
            }
        }

    }
    ,methods:{
        pagechange(e){
            this.current=e;
            this.getList()
        },
        allProduct(){
             var _datas={
                goodsName:'',
                goodsTypeId:'',
                shopId:'',
                sortWay:'',
                grandfatherTypeId:'',
                sortType:'',
                priceRangeStart:'',
                priceRangeEnd:'',
                size:'12',
                page:this.current
           }
           this.emptyArr=[];
           this.pingpaiindex=-1;
           this.threeLst=[]
           this.tabindex=-1;
           this.$http.post('/goods/info?',qs.stringify(_datas)).then(res=>{
              let response=  JSON.parse(res.request.response)
              if(response.code==200){
                  this.productList=response.data.list;
                  this.totalLength=Number(response.data.total)
                 }
                 else{
                      this.$Message.error('数据发生错误');
                 }
           })
        },
        getbrands(){
           this.$http.get('/goods/store').then(res=>{
               this.brandsList=JSON.parse(res.request.response).data
           })
         },
          getBiaoqianList(){
           this.$http.get('/goods/type').then(res=>{
               this.biaoqianList=JSON.parse(res.request.response).data
           })
       },
       addtabPingpai(e,id,v){
            this.pingpai.splice(0,1,e)
             this.current=1;
            this.pingpaiindex=v
            this.formData.shopId=id
            this.getList()
       },
       handleClose1(){
           this.pingpai=[]
           this.pingpaiindex=-1;
           this.formData.shopId='';
           this.getList()
       },
       addtabFenlei(e,id,v){
            this.detailShow=true;
            this.tabindex=v; 
            this.current=1;
            this.biaoqian.splice(0,1,e);
            this.formData.grandfatherTypeId=id;    
           this.formData.goodsTypeId='';      
        if(this.firstindex=='ok'){    
           this.$http.get('/goods/type?parentId='+id).then(res=>{
                   let resp=JSON.parse(res.request.response);
                   let data1=(resp.data)  
                   this.threeLst.splice(0,1,data1)      
                   this.threeLst.splice(1,this.threeLst.length)    
              //     this.emptyArr.splice(1,this.threeLst.length)    
                   this.replaceIndex={
                         bool:true,
                         index:''
                   }                                                      
           })  
           
        }  else{
             this.firstindex = 'ok'
            this.$http.get('/goods/type?parentId='+id).then(res=>{
                  let resp=JSON.parse(res.request.response);
                  let data1=(resp.data)                   
                  this.threeLst.push(data1)    
           })     
         
        }
             this.getList()   
       },  
       handleClose2(){
            this.biaoqian=[]
            this.tabindex=-1;  
            this.formData.grandfatherTypeId=''
            this.getList()
       },
     addtabDetail(e,id,index1,index12){
            console.log(this.emptyArr)
         this.current=1;  
         this.arrForTab.push(index1)
         this.arrForTab.map((val,item)=>{
             if(val==index1){         
                this.arrForTab.splice(item,1,index1)
                   return this.replaceIndex={
                         bool:false,
                         index:'has'
                   }   
             }
         })
         this.emptyArr.push(`${index1}${index12}`)
         let passnullarr=[...new Set( this.emptyArr)]
         this.emptyArr=passnullarr
         this.emptyArr.forEach((olddata,oldindex)=>{
            if(index1==olddata.substr(0,1)){
                this.emptyArr.splice(oldindex,1,`${index1}${index12}`)
            }
         })
 //  console.log( index1)   
     if(this.replaceIndex.bool){
           this.$http.get('/goods/type?parentId='+id).then(res=>{
                  let resp=JSON.parse(res.request.response)     
                   let _data=resp.data;    
                      if(resp.data.length==0){
                            this.formData.goodsTypeId=id   
                               this.getList()
                     } else{
                         this.formData.grandfatherTypeId=id; 
                         this.formData.goodsTypeId=''   
                         this.threeLst.push(_data)
                            this.getList()
                    }            
           })      
    }
    else{
           this.$http.get('/goods/type?parentId='+id).then(res=>{
                  let resp=JSON.parse(res.request.response)     
                   let _data=resp.data;    
                      if(resp.data.length==0){
                         this.formData.goodsTypeId=id;  
                         this.getList()
                   } else{
                          this.formData.grandfatherTypeId=id;    
                          this.formData.goodsTypeId=''
                          this.threeLst.splice(index1+1,1,_data)    
                    if(this.emptyArr.length>=3){
                         this.emptyArr.splice(this.emptyArr.length-1,1,'')
         
                    }                  
                         this.getList()       
                    }               
           })         
    } 
                               
       },
       handleClose3(){
            this.jutifenlei=[]
            this.daital=-1
            this.formData.goodsTypeId=''
            this.getList()
       },
       // 综合 销量 人气 搜索
       searcheFn(e,sortWay){
           this.errorindex=e;
           this.formData.sortWay=sortWay  
           this.getList()
       },
       // 价格的升降 搜索
       shengxuFn(e,sortType){
           this.errorindex=e
           this.formData.sortType=sortType
           this.formData.sortWay=e;
           this.getList()
       },
       // 降序的升降 搜索
       jiangxuFn(e,sortType){
           this.errorindex=e
           this.formData.sortWay=e;
           this.formData.sortType=sortType
           this.getList()
       },
       //价格区间搜索
       priceSearch(){
           if(this.formData.priceRangeEnd=='' && typeof Number(this.formData.priceRangeEnd)=='number'){
                 this.getList()

           } else if(this.formData.priceRangeStart==''&& typeof Number(this.formData.priceRangeStart)=='number'){
                 this.getList()
           }
            else if(Number(this.formData.priceRangeStart) > Number(this.formData.priceRangeEnd)){
                  this.$Message.error('输入有误')
           }
           else{
                this.getList()
           }
       },
       shopgetList(){
           let mode=this.$route.query.deliveryMode==undefined?'':this.$route.query.deliveryMode;
           this.$http.get('/goods/info?goodsName='+this.$route.query.shopname+'&deliveryMode='+mode).then(res=>{
               let response=JSON.parse(res.request.response)
                  this.productList=response.data.list;
                   this.totalLength=Number(response.data.total)
           })
       },
       getList(){  
           if(this.formData.goodsTypeId!=''){
                  this. hasgoodsTypeId=1
           } else if(this.formData.shopId!=''){
                   this.hasbrandId=1
           }
           var _datas={
                goodsName:this.formData.goodsName,
                goodsTypeId:this.formData.goodsTypeId,
                shopId:this.formData.shopId,
                sortWay:this.formData.sortWay,
                grandfatherTypeId:this.formData.grandfatherTypeId,
                sortType:this.formData.sortType,
                priceRangeStart:this.formData.priceRangeStart,
                priceRangeEnd:this.formData.priceRangeEnd,
                size:'12',
                page:this.current
           }
           this.$http.post('/goods/info?',qs.stringify(_datas)).then(res=>{
              let response=  JSON.parse(res.request.response)
              if(response.code==200){
                  this.productList=response.data.list;
                  this.totalLength=Number(response.data.total)
                 }
                 else{
                      this.$Message.error('数据发生错误');
                 }
           })
       }
    },created(){    
        this.getbrands()
        this.getBiaoqianList()
      if(this.$route.query.shopname || this.$route.query.deliveryMode){
         this.shopgetList()
       }else{
            this.getList()
       }
    }
}
</script>


