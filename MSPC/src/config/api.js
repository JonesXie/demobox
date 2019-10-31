import axios from "axios";
import Vue from 'vue';

var CryptoJS = require('@js/crypto-js.js');
Vue.prototype.$http = axios;
axios.defaults.headers.common["token"] =  localStorage.getItem('token')
axios.defaults.headers.common["username"] = localStorage.getItem('username')
// axios.interceptors.request.use(function (config) {
//     // 对所有POST请加密，必须是json数据提交，不支持表单
//     // var xtoken = localStorage.token;
//     let url = config.url;
//     if (config.method == "post") {
//        config.data = Encrypt(JSON.stringify(config.data));
//       if(url.indexOf("login")>-1){
//          localStorage.setItem('token',"");
//          config.headers.token = "";
//          config.headers.username = "";
//        }
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
// axios.interceptors.request.use( (config) => {
// 	if (config.method=="post"){
// 		config.data = qs.stringify(config.data);
//          config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//     }
//     console.log(config)
// 	return config;
// },  (error) => {
// 	return Promise.reject(error);
// });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 后端返回字符串表示需要解密操作
       response.data = Decrypt(response.data);
     let resp=JSON.parse(response.request.response)
       if(resp.code==401){
      //  router.push('/index')
       } else if(resp.code==1006){
        localStorage.setItem('code',resp.code)
       } else if(resp.code==404){
       //   router.push('/index')
       }
       else if(resp.code==401){
       //   router.push('/index')
       }
        return response;
}, function (error) {
    return Promise.reject(error);
});

const key = CryptoJS.CryptoJS.enc.Utf8.parse("abcdef0123456789");
function Decrypt(word) {
    var  decrypt = CryptoJS.CryptoJS.AES.decrypt(word,key, {
         mode : CryptoJS.CryptoJS.mode.ECB,
         padding : CryptoJS.CryptoJS.pad.Pkcs7
    });
    return CryptoJS.CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
function Encrypt(word) {
    var srcs = CryptoJS.CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.CryptoJS.AES.encrypt(srcs, key, {
        mode : CryptoJS.CryptoJS.mode.ECB,
        padding : CryptoJS.CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
axios.defaults.baseURL='http://192.168.1.184:8082';
// 192.168.1.184:8082;
// 47.97.180.251:8082;
// 192.168.1.188:8088;
// 192.168.1.101:8088;
// 192.168.1.199:8088;
// 192.168.1.101:8088;
// 192.168.1.117:8082
Vue.prototype.host = 'http://192.168.1.184:8082';
export default {

}
