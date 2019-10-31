<template>
    <div>
        <div class="uersinfo_header">
			<strong>收藏店铺</strong>
		</div>
        <div class="comain">
            <div class="comain_top">
                 <Row>
                    <Col span="8">
                      <Row>
                            <Col span="10"><Button style="width:100%" >操作</Button></Col>
                            <Col span="12" offset="2">
                                  <Row type="flex" justify="center" class="code-row-bg">
                                    <!-- <Col span="12" style="text-align:center;color:#999;cursor:pointer">全选</Col> -->
                                    <Col span="12"  style="text-align:center;color:#999;cursor:pointer" ><span @click="del()">删除</span></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <!-- <Col span="12" offset="4">
                         <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="18"> <Input v-model="shopname"  style="width: 100%" /></Col>
                            <Col span="5" offset="1"><Button type="info">宝贝搜索</Button></Col>
                        </Row>
                    </Col> -->
                </Row>
            </div>
            <div class="co_list">
                <ul>
                    <li v-for="(index,item) in datalist" :key="item" @click="liclick(item,index.shopId)" :class="{active:item==indexitem}">
                     
                        <div class="co_list_img"><img :src="`${index.shopPicUrl}`" ></div>
                        <div class="line" style="color:#999;font-size:13px">{{index.city}}</div>
                         <router-link :to="{path:'/shopGoods',query: {id: index.shopId}}" style="color:#666666">
                        <div class="line" style="color:#999;font-size:13px">{{index.shopName}}</div> </router-link> 
                      
                    </li>
                </ul>
            </div>
           
        </div>
         <div class="pagrs">
                  <Page :total="10" />
            </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            shopname:'',
            datalist:[],
            indexitem:-1,
            id:''
        }
    },
    methods:{
        baby(){
            this.$http.get('/collection/shop').then(res=>{       
                let resp =JSON.parse(res.request.response)
                 resp.data.filter((index,item)=>{
                 return    index.shopPicUrl=index.shopPicUrl.indexOf('picture')!='-1'?`${this.host2}${index.shopPicUrl}`:index.shopPicUrl
                })
                this.datalist=  resp.data
              //  console.log(this.datalist)
            })
        },
        liclick(e,i){
           this.indexitem=e
           this.id=i
        },
        del(){        
            let _data={
                shopId:this.id
            }
            this.$http.post('/collection/delcollectshop',qs.stringify(_data)).then(res=>{
                console.log(res)
                let resp=JSON.parse(res.request.response)
                if(resp.code==200){
                    this.$Message.success('删除成功')
                    this.baby()
                }else{
                    this.$Message.error('删除失败')
                }
            })
        }
    },created(){
        this.baby()
    }
}
</script>
<style scoped>
.line{ width: 100%;height: 25px;line-height: 25px;font-size: 16px;color:#333;text-align: center}
.uersinfo_header {width: 100%;height: 45px;	border-bottom: 1px solid #d8d8d8;font-size: 16px;line-height: 45px;	text-indent: 25px}
.comain{ width: 100%;padding: 10px 40px;height: auto;overflow: hidden;}
.comain_top{ width: 100%;height: 40px;line-height: 40px;font-size: 15px;;}
.co_list{ width: 100%;height: auto;margin-top: 25px}
.co_list ul li{ width: 23%;height: 185px;border: 2px solid #dcdee2;border-radius: 3px;float: left;margin-left:2%;margin-top: 15px}
.co_list ul li:nth-child(4n+1){ margin-left: 0}
.active{ border: 2px solid #199ed8 !important}
.co_list_img{ width: 70%;height: 100px;margin: 10px auto;}
.co_list_img img{ width:100%;height: 100px; }
.pagrs{margin-top: 10px;margin-bottom: 10px;text-align: center;height: 40px;line-height: 40px;}
</style>

