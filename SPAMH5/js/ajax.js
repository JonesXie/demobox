//需要jquery-3以上的支持
$(function(){

	//var countryAbbr;
	//var countryName;
/*

var country = getInputValue("country");
var base64Image = getInputValue("base64Image");
var telphone = getInputValue("telphone");
 */

})

function recordingCountry(dom)
{
	countryAbbr = $(dom).next(".til_cil").attr("ytxt");
	countryName = $(dom).next(".til_cil").attr("texts");
	
	
	//动态修改分享文案
	$share_title2 = '用颜值为'+countryName+'打call,不是谁都行的';
	$share_description = '用颜值为'+countryName+'打call,不是谁都行的';
	
	wxShareAppMessage($share_title, $share_description, $share_image);
	wxShareTimeline($share_title2, $share_description, $share_image);
	
}

//提交表单
function model(that, actionUrl, callback){
    //读取信息
    var hiddenForm = new FormData();

    var base64_sourceImage = document.getElementById("base64_sourceImage").src;//newImg
    var base64_ImageContailner = document.getElementById("base64_ImageContailner").src;//loadImg
    var base64_ImageContailnerPoster = document.getElementById("base64_ImageContailnerPoster").src;//img
    var telphone = document.getElementById("telphone").value;

    var form = $(that).parents('.rankForm');
    if (!actionUrl) actionUrl = form.attr("action");

    hiddenForm.append("base64_sourceImage", base64_sourceImage);
    hiddenForm.append("base64_ImageContailner", base64_ImageContailner);
    hiddenForm.append("base64_ImageContailnerPoster", base64_ImageContailnerPoster);

    hiddenForm.append("countryAbbr", countryAbbr);
    hiddenForm.append("countryName", countryName);

    hiddenForm.append("telphone", telphone);
    
    $(that).hide();


    //console.log("base64_sourceImage:" + base64_sourceImage)
    //console.log("base64_ImageContailner:" + base64_ImageContailner);
    //console.log("base64_ImageContailnerPoster:" + base64_ImageContailnerPoster);
    //console.log("countryAbbr:" + countryAbbr);
    //console.log("countryName:" + countryName);
    //console.log("telphone:" + telphone);

    var flag = false;

    $(that).attr('disabled',true);//按钮锁定
    $.ajax({
     url  : '/hmr/ywkxx/api.php/form',
     type : "post",
     dataType : 'json',
     data : hiddenForm,
     cache: false,
     processData: false,
     contentType: false,
     success : function(response){
         s = response.status
         m = response.msg
         d = response.dom
         $(that).removeAttr('disabled')
         if(s==200){
             // layer.open({content: json.msg ,btn: '确定'})
             //alert(m)
	       flag = true;
	     
	        //$("#ballsBody").html(m);
		
		
	        $('.barContent').stop().fadeOut(200);
		$('.success').stop().fadeIn(200);
		$('.rankBKG, .success').on('click',function(){
			localStorage.setItem('tele','1');
			$('.rankBar').stop().fadeOut(200);
		})
		setTimeout(function(){
			localStorage.setItem('tele','1');
			$('.rankBar').stop().fadeOut(200);
		},2000)
		
		
	     
	     return true;
             /*
	     if (d) {
                 window.location.href = d
             } else {
                 window.location.reload()
             }
	     */

         }else{
	 $(that).show();
             flag = false;
	     alert(m)
             form.find("input[name="+d+"]").focus()
         }
     },
     error : function(){
     $(that).show();
         $(that).removeAttr('disabled');
         alert('请按照提示操作, 以获得更好的服务');
     }
    })
    return flag;
}
//must include <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
//wechat share
function wxShareAppMessage(share_title, share_description, share_image){
    wx.onMenuShareAppMessage({
       title: share_title,
       desc: share_description,
       link: window.location.href,
       imgUrl: share_image,
       trigger: function (res) {

         //alert('用户点击发送给朋友');
       },
       success: function (res) {
         //alert("调用分享接口");
       },
       cancel: function (res) {
          //alert('已取消');
       },
       fail: function (res) {
         //alert(JSON.stringify(res));
       }
     });
}
function wxShareTimeline(share_title2, share_description, share_image) {
    wx.onMenuShareTimeline({

         title: share_title2,
         desc: share_description,
         link: window.location.href,
         imgUrl: share_image,
         trigger: function (res) {
           //alert('用户点击分享到朋友圈');
         },
         success: function (res) {
           //alert("调用分享接口");
         },
         cancel: function (res) {
           //alert('已取消');
         },
         fail: function (res) {
           //alert(JSON.stringify(res));
         }
       });
}


