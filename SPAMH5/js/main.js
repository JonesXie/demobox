$(function(){
  var _base64_l,data=[], _newsrc,source,_opens=false;
  var imgout = new Array(4);
  var _sw = $('.filedLoad').outerWidth();
  var _sh = $('.filedLoad').outerHeight();
  var count_left = [];
  var count_right = [];
  var _cw,_ch,_ct,_cl,_maxoutline,_rotates,_dark;
  var _eyebrow = [];
  var _leye=[];
  var _reye=[];
  var _mouth=[];
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var _MainFace_x=[],_MainFace_y=[],_tolc,_tolg,
      _eblx,_ebly,_tolj=[],_Calculationy,_Calculationx,
      _Ebcomputedx,_Ebcomputedy, _facem=[],_nationalImg,_eyebrow_da=[],_faceeye=[],accord_coordinate=[],canvasData_renlian,
    leyes_one=[],mouth_one=[],division,canvasData_guoqi,nose_tip,_chinas,leyes_two=[],mouth_two=[];
  var encoders=[],encoder_max,encoder_min,_H,_S,_V,_L,_fill_width,_fill_height,num_str,alpha=0.7,num_txts;
  var num_array = {
    "agt": 1.2, "adly": 0.5, "bx": 1, "bl": 0.7, "bnm":1.1, "dm":0.9, "hg":1, "ml":0.9,
    "mxg":1, "rd":0.9, "mlg":0.8, "nrly":0.9, "rs":0.8, "senj":1, "stalb":0.8,
    "wlg":0.8, "yl":0.9, "sewy":0.9, "tns":0.8, "xby":0.8, "ygl":0.8, "rb":0.7, "pty":0.7,
    "els":1,"fg":1,"kldy":0.9,"gsdlj":0.8,"bd":0.9,"glby":0.9,"dg":0.8,"aj":0.8,"bls":0.8
  };//不同的国旗对应不同的透明度
  function lastname(filename) {
    var index = filename.lastIndexOf(".");
    var ext = filename.substr(index+1);
    return ext;
  }
  function rotateImage(image) {
    var width = image.width;
    var height = image.height;

    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext('2d');

    var newImage = new Image();

    //旋转图片操作
    EXIF.getData(image,function () {
        var orientation = EXIF.getTag(this,'Orientation');
        // orientation = 6;//测试数据
        //console.log('orientation:'+orientation);
        switch (orientation){
          //正常状态
          case 1:
            //console.log('旋转0°');
            // canvas.height = height;
            // canvas.width = width;
            newImage = image;
            break;
          //旋转90度
          case 6:
            //console.log('旋转90°');
            canvas.height = width;
            canvas.width = height;
            ctx.rotate(Math.PI/2);
            ctx.translate(0,-height);

            ctx.drawImage(image,0,0)
            imageDate = canvas.toDataURL('Image/jpeg',1)
            newImage.src = imageDate;
            break;
          //旋转180°
          case 3:
            //console.log('旋转180°');
            canvas.height = height;
            canvas.width = width;
            ctx.rotate(Math.PI);
            ctx.translate(-width,-height);

            ctx.drawImage(image,0,0)
            imageDate = canvas.toDataURL('Image/jpeg',1)
            newImage.src = imageDate;
            break;
          //旋转270°
          case 8:
            //console.log('旋转270°');
            canvas.height = width;
            canvas.width = height;
            ctx.rotate(-Math.PI/2);
            ctx.translate(-height,0);

            ctx.drawImage(image,0,0)
            imageDate = canvas.toDataURL('Image/jpeg',1)
            newImage.src = imageDate;
            break;
          //undefined时不旋转
          case undefined:
            //console.log('undefined  不旋转');
            newImage = image;
            break;
        }
      }
    );
    return newImage;
  }
  $('input[name=uploadPicture]').on('change', function(e){
    var file = this;
    var exts ="jpg,jpeg,gif,png,bmp,JPG,JPEG,GIF,PNG,BMP";
    if (exts.indexOf(lastname(file.value)) < 0) {
      dialog(3,["请上传JPG、BMP、PNG、GIF格式", "上传格式不正确"],{cancel:"取消"});
      return;
    }
    $('.selectBlessing-container .item').removeClass('active');
    clearCanvas();
    clearCanvasone();
    canvasData_guoqi='';
    canvasData_renlian='';
    data=[];
    base64=[];
    _newsrc = '';
    _opens=false;
    $("#img").html('');
    var _that = this.files[0];
    if(isiOS){
      lrz(this.files[0], {width: 1080,height :1080}).then(function (rst) {
        var textHtml = "<img src='"+rst.base64+"'/>";
        $("#img").html(textHtml);
        $("#img").addClass("upImg");
        _base64_l = rst.base64;
        data = [_base64_l];
        hecheng();
        return rst;
      }).always(function () {

      });
    }
    else{
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (function (file) {
        return function (e) {
          _base64_l = this.result;
          data = [_base64_l];
          $("#img").addClass("upImg");
          var textHtml = "<img src='"+_base64_l+"'/>";
          $("#img").html(textHtml);
          hecheng();
        };
      })(e.target.files[0]);
    }

  });
  function hecheng(){
    draw(function(){
      $('.img-two').html('');
      $('.img-two').html('<img src="'+base64[0]+'">');
      $('input[name=uploadPicture]').val('');
      _opens = true;
    })
  }
  function draw(fn){
    var c=document.createElement('canvas'),
      ctx=c.getContext('2d'),
      len=data.length;
      c.width=_sw;
      c.height=_sh;
      ctx.rect(0,0,c.width,c.height);
      ctx.fillStyle='#fff';
      ctx.fill();
    function drawing(n) {
      var img=new Image;
      img.src=data[n];
      img.onload=function(){
        var newImage = rotateImage(img);
        source = newImage;
        getimgsize(source.naturalWidth, source.naturalHeight, _sw, _sh, imgout);
                   //图片真实宽度        真实高度               盒子宽度 盒子高度 自定义数组
        ctx.drawImage(source, imgout[0], imgout[1], imgout[2], imgout[3], 0, 0, c.width, c.height);
        //保存生成作品图片
        $('.img-two').html('');
        base64.push(c.toDataURL("image/jpeg",0.8));
        _newsrc = base64;
        fn();
        _shangchuan();
      }
    }
    drawing(0);
  }
  function _ajaxs(_base_64) {
    $.ajax({
      type: 'POST',
      dataType: "json",
      url: "https://api-cn.faceplusplus.com/facepp/v3/detect",
      data: {
        api_key: "xdwrMx_QUGeD3IOm5qqUUjN6MXojBPrc",
        api_secret: "4M183G1csB6PqtMQaVCBlVH6iKUGOGmi",
        image_base64: ""+_base_64+"",
        return_landmark: "2",
        return_attributes:"eyestatus,headpose"
      },
      success: function (res) {
        _cw='';_ch='';_ct='';_cl='';_maxoutline=[];_rotates='';_dark='';nose_tip='';
        count_left = [];
        count_right = [];
        _eyebrow = [];
        _leye=[];
        _reye=[];
        _mouth=[];
        _eyebrow_da=[];
        _faceeye=[];
        division='';
        leyes_one=[];
        mouth_one=[];
        leyes_two=[];
        mouth_two=[];
        _chinas ='';
        encoders=[];
        if(res.faces.length>0){
          _rotates = res.faces[0].attributes.headpose.roll_angle;
          _dark = res.faces[0].attributes.glass.value;//None
          if(_dark == "None"){
            if(Math.abs(_rotates)<10){
              _cw = res.faces[0].face_rectangle.width;
              _ch = res.faces[0].face_rectangle.height;
              _ct = res.faces[0].face_rectangle.top;
              _cl = res.faces[0].face_rectangle.left;
              for(var i = 1;i<17;i++){
                count_left.push(res.faces[0].landmark['contour_left'+i+'']);
                count_right.push(res.faces[0].landmark['contour_right'+i+'']);
              }
              nose_tip = res.faces[0].landmark['nose_middle_contour'].y;
              _eyebrow_da.push(res.faces[0].landmark['right_eyebrow_upper_right_quarter']);
              _eyebrow_da.push(res.faces[0].landmark['right_eyebrow_upper_middle']);
              _eyebrow_da.push(res.faces[0].landmark['left_eyebrow_upper_middle']);
              _eyebrow_da.push(res.faces[0].landmark['left_eyebrow_upper_left_quarter']);

              _eyebrow.push(res.faces[0].landmark['contour_right1']);
              _eyebrow.push({"x":res.faces[0].landmark['contour_right1'].x,"y":Math.ceil(res.faces[0].landmark['left_eyebrow_upper_middle'].y-(nose_tip-res.faces[0].landmark['left_eyebrow_upper_middle'].y))});
              _eyebrow.push({"x":res.faces[0].landmark['contour_left1'].x,"y":Math.ceil(res.faces[0].landmark['right_eyebrow_upper_middle'].y-(nose_tip-res.faces[0].landmark['right_eyebrow_upper_middle'].y))});
              _eyebrow.push(res.faces[0].landmark['contour_left1']);
              division = Math.ceil(res.faces[0].landmark['contour_left1'].y);

              //左边眼睛
              _leye.push(res.faces[0].landmark['left_eye_left_corner']);
              _leye.push(res.faces[0].landmark['left_eye_upper_left_quarter']);
              _leye.push(res.faces[0].landmark['left_eye_top']);
              _leye.push(res.faces[0].landmark['left_eye_upper_right_quarter']);
              _leye.push(res.faces[0].landmark['left_eye_right_corner']);
              _leye.push(res.faces[0].landmark['left_eye_lower_right_quarter']);
              _leye.push(res.faces[0].landmark['left_eye_bottom']);
              _leye.push(res.faces[0].landmark['left_eye_lower_left_quarter']);
              _leye.push(res.faces[0].landmark['left_eye_left_corner']);
              leyes_one.push(res.faces[0].landmark['left_eye_left_corner']);
              //右边眼睛
              _reye.push(res.faces[0].landmark['right_eye_left_corner']);
              _reye.push(res.faces[0].landmark['right_eye_upper_left_quarter']);
              _reye.push(res.faces[0].landmark['right_eye_top']);
              _reye.push(res.faces[0].landmark['right_eye_upper_right_quarter']);
              _reye.push(res.faces[0].landmark['right_eye_right_corner']);
              _reye.push(res.faces[0].landmark['right_eye_lower_right_quarter']);
              _reye.push(res.faces[0].landmark['right_eye_bottom']);
              _reye.push(res.faces[0].landmark['right_eye_lower_left_quarter']);
              _reye.push(res.faces[0].landmark['right_eye_left_corner']);
              leyes_two.push(res.faces[0].landmark['right_eye_right_corner']);
              //嘴巴外唇
              _mouth.push(res.faces[0].landmark['mouth_left_corner']);
              _mouth.push(res.faces[0].landmark['mouth_upper_lip_left_contour2']);
              _mouth.push(res.faces[0].landmark['mouth_upper_lip_left_contour1']);
              _mouth.push(res.faces[0].landmark['mouth_upper_lip_top']);
              _mouth.push(res.faces[0].landmark['mouth_upper_lip_right_contour1']);
              _mouth.push(res.faces[0].landmark['mouth_upper_lip_right_contour2']);
              _mouth.push(res.faces[0].landmark['mouth_right_corner']);
              _mouth.push(res.faces[0].landmark['mouth_lower_lip_right_contour2']);
              _mouth.push(res.faces[0].landmark['mouth_lower_lip_right_contour3']);
              _mouth.push(res.faces[0].landmark['mouth_lower_lip_bottom']);
              _mouth.push(res.faces[0].landmark['mouth_lower_lip_left_contour3']);
              _mouth.push(res.faces[0].landmark['mouth_lower_lip_left_contour2']);
              _mouth.push(res.faces[0].landmark['mouth_left_corner']);
              mouth_one.push(res.faces[0].landmark['mouth_left_corner']);
              mouth_two.push(res.faces[0].landmark['mouth_right_corner']);
              count_right = count_right.reverse();
              _maxoutline = count_left.concat(count_right);
              _faceeye = _maxoutline;
              //_maxoutline = _maxoutline.concat(_eyebrow);
              _faceeye = _maxoutline.concat(_eyebrow_da);
              //_newc(_cw,_ch,_maxoutline,_leye,_reye,_mouth,_ct,_cl,_srcs,_rotates);
              $('.upLoadFooter').addClass('active');
            }
            else{
              alert('脸部请不要过度倾斜!!!');
            }
          }
          else{
            alert('请不要佩戴墨镜或普通眼镜!!!');
          }
        }
        else{
          alert('请上传清晰的正脸照!!!');
        }
        $('.LoadingCall').addClass('active');
      },
      error: function (err) {
        $('.LoadingCall').addClass('active');
        alert('系统故障，请重试!!!');
      }
    })
  }
  var _srcs = '';
  var _ba_src = [],_loadDate=[];
  function _shangchuan() {
    clearCanvas();
    clearCanvasone();
    canvasData_renlian = '';
    canvasData_guoqi = '';
    var _datab = _newsrc[0].split('data:image/jpeg;base64,')[1];
    if(!_opens){
      return false
    }
    else{
      _srcs = '';
      _ba_src = [];
      _srcs = $('.selectBlessing-container .item.active').children().attr('src');
      $('.LoadingCall').removeClass('active');
      setTimeout(function () {
        _ajaxs(_datab);
      },500);
    }
  }
  $('.selectBlessing-container').on('click','.item',function () {
    clearCanvas();
    clearCanvasone();
    canvasData_renlian = '';
    canvasData_guoqi = '';
    _chinas ='';
    if(_newsrc){
      $('.LoadingCall').removeClass('active');
      var _datab = _newsrc[0].split('data:image/jpeg;base64,')[1];
      if(!_opens){
        return false
      }
      else{
        $('.selectBlessing-container .item').removeClass('active');
        $(this).addClass('active');
        _srcs = '';
        _ba_src = [];
        _text_fill='';
        num_txts='';
        num_txts = $(this).siblings('.til_cil').attr('ytxt');
        _srcs = $('.selectBlessing-container .item.active').children().attr('alt');
        _chinas = $(this).attr('china_src');
        _text_fill = $(this).siblings('.til_cil').attr('texts');
        if(_srcs){
          _generateImg(_newsrc);
        }
        else{
          alert('没有选择国家');
        }
      }
    }
    else{
      alert('请上传图片');

    }
  });
  $('.numClick').click(function () {
    clearCanvas();
    clearCanvasone();
    canvasData_renlian = '';
    canvasData_guoqi = '';
    _chinas ='';
    if(_newsrc){
      $('.LoadingCall').removeClass('active');
      var _datab = _newsrc[0].split('data:image/jpeg;base64,')[1];
      if(!_opens){
        return false
      }
      else{
        if(_srcs){
          $('.LoadingCall').addClass('active');
          _generateImg(_newsrc);
        }
        else{
          alert('没有选择国家');
          $('.LoadingCall').addClass('active');
        }
      }
    }
    else{
      alert('请上传图片');
      $('.LoadingCall').addClass('active');
    }
  })
  $('.selectBlessing-container').on('click','.actives',function () {
    $('.windowAlert').addClass('active');
    setTimeout(function () {
      $('.windowAlert').removeClass('active');
    },2000);
  });
  $('.wa_bg').click(function () {
    $('.windowAlert').removeClass('active');
  });
  $('.up_btns').click(function () {
    _written();
  });
  $('.lists1').click(function () {
    clearCanvas();
    clearCanvasone();
    $('.img-two').html('');
    $("#img").html('');
    _cw='';_ch='';_ct='';_cl='';_maxoutline=[];_rotates='';_dark='';
    count_left = [];
    count_right = [];
    _eyebrow = [];
    _leye=[];
    _reye=[];
    _mouth=[];
    _opens = false;
    _newsrc='';
    division='';
    canvasData_renlian = '';
    canvasData_guoqi = '';
    $('.selectBlessing-container .item').removeClass('active');
    $('.upLoadImgs,.upLoadFooter').removeClass('active');
  });
  //生成人脸
  var _outlengths,_outwidth,_outheight,_out_X,_out_Y,r_color=[],g_color=[],b_color=[],
    r_min,r_max,g_min,g_max,b_min,b_max,r_mean,g_mean,b_mean;
  var _twowidth,_twoheight,_two_X,_two_Y,r_mean_t,g_mean_t,b_mean_t;
  function _generateImg(_newsrc) {
    var can = document.getElementById('canvasOne');
    var ctx = can.getContext('2d');
    can.width=_sw;
    can.height=_sh;
    function _drawing_face() {
      canvasData_renlian='';
      var img=new Image;
      img.src=""+_newsrc+"";
      img.onload=function(){
        source = img;
        ctx.drawImage(source, 0, 0,_sw,_sh);
        canvasData_renlian = ctx.getImageData(0, 0, _sw, _sh);
        //获取中心25个点的像素值
        function _lengths() {
          _outwidth=0;_outheight=0;_outlengths=0;_out_X=0;_out_Y=0;r_color=[];g_color=[];b_color=[];
          r_min=0;r_max=0;g_min=0;g_max=0;b_min=0;b_max=0;r_mean=0;g_mean=0;b_mean=0;
          _outwidth = Math.abs(leyes_one[0].x - mouth_one[0].x);
          _outheight = Math.abs(leyes_one[0].y - mouth_one[0].y);
          _outlengths = Math.sqrt(Math.pow((leyes_one[0].x - mouth_one[0].x),2)+Math.pow((leyes_one[0].y - mouth_one[0].y),2));
          if(_outwidth>=_outheight){
            _out_X = leyes_one[0].x+_outwidth/2;
            _out_Y = _outheight/_outwidth*(_out_X-mouth_one[0].x)+mouth_one[0].y;
          }
          else{
            _out_Y = leyes_one[0].y + _outheight/2;
            _out_X = (_out_Y - mouth_one[0].y)/_outheight*_outwidth+mouth_one[0].x;
          }
          var canvasData_color = ctx.getImageData(0,0,_sw,_sh);
          var tempCanvasData = copyImageData(ctx, canvasData_color);
          for (var rx = -2;rx <= 2;rx++){
            for (var ry = -2;ry <= 2;ry++){
              var idx = ((Math.ceil(_out_X)+rx)+(Math.ceil(_out_Y)+ry)*tempCanvasData.width) * 4;
              var r = tempCanvasData.data[idx];
              var g = tempCanvasData.data[idx+1];
              var b = tempCanvasData.data[idx+2];
              r_mean+=r;
              g_mean+=g;
              b_mean+=b;
              r_color.push(r);
              g_color.push(g);
              b_color.push(b);
            }
          }
          r_mean = r_mean/25;
          g_mean = g_mean/25;
          b_mean = b_mean/25;
          r_min = Math.min.apply(null,r_color);
          r_max = Math.max.apply(null,r_color);
          g_min = Math.min.apply(null,g_color);
          g_max = Math.max.apply(null,g_color);
          b_min = Math.min.apply(null,b_color);
          b_max = Math.max.apply(null,b_color);
        }
        _lengths();
        function length_t() {
          _twowidth=0;_twoheight=0;_two_X=0;_two_Y=0;r_mean_t=0;g_mean_t=0;b_mean_t=0;
          _twowidth = Math.abs(leyes_two[0].x - mouth_two[0].x);
          _twoheight = Math.abs(leyes_two[0].y - mouth_two[0].y);
          if(_twowidth>=_twoheight){
            _two_X = leyes_two[0].x+_twowidth/2;
            _two_Y = _twoheight/_twowidth*(_two_X-mouth_two[0].x)+mouth_two[0].y;
          }
          else{
            _two_Y = leyes_two[0].y + _twoheight/2;
            _two_X = (_two_Y - mouth_two[0].y)/_twoheight*_twowidth+mouth_two[0].x;
          }
          var canvasData_colors = ctx.getImageData(0,0,_sw,_sh);
          var tempCanvasDatas = copyImageData(ctx, canvasData_colors);
          for (var rx = -2;rx <= 2;rx++){
            for (var ry = -2;ry <= 2;ry++){
              var idx = ((Math.ceil(_two_X)+rx)+(Math.ceil(_two_Y)+ry)*tempCanvasDatas.width) * 4;
              var r = tempCanvasDatas.data[idx];
              var g = tempCanvasDatas.data[idx+1];
              var b = tempCanvasDatas.data[idx+2];
              r_mean_t+=r;
              g_mean_t+=g;
              b_mean_t+=b;
            }
          }
          r_mean_t = r_mean_t/25;
          g_mean_t = g_mean_t/25;
          b_mean_t = b_mean_t/25;
        }
        length_t();
        r_mean = (r_mean+r_mean_t)/2;
        g_mean = (g_mean+g_mean_t)/2;
        b_mean = (b_mean+b_mean_t)/2;
        ctx.clearRect(0, 0, _sw, _sh);
        _newc(_cw,_ch,_maxoutline,_leye,_reye,_mouth,_ct,_cl,_srcs,_rotates,_eyebrow,_newsrc);
      }
    }
    _drawing_face();
  }
  //统一调用
  function copyImageData(context, src) {//canvas rgba
    var dst = context.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
  }
  //绘制人脸
  function _newc(_cw,_ch,dada,_leye,_reye,_mouth,_ct,_cl,_srcs,_rotates,_eyebrow,_newsrc,_faceeye) {
    var can = document.getElementById('canvasTwo');
    var ctx = can.getContext('2d');
    can.width=_sw;
    can.height=_sh;
    //找所有边缘坐标
    //找所有边缘坐标
    _MainFace_x=[];_MainFace_y=[];
    var _line1,_line2,_line3;
    //描点
    function _soius(canvasDatas) {
      _MainFace_x=[];_MainFace_y=[];
      _line1='';_line1='';_line1='';
      _MainFace_x = _lineMain(dada);
      _MainFace_y = _lineMain(_eyebrow);
      _MainFace_x=_MainFace_x.concat(_MainFace_y);
      _line1 = _lineMain(_leye);
      _line2 = _lineMain(_reye);
      _line3 = _lineMain(_mouth);
      function _facepoint(x,y){
        this.X = x;
        this.Y = y;
      }
      var facepoints = [];
      var leye_points = [];
      var reye_points = [];
      var mouth_points = [];
      for (var _point = 0;_point < _MainFace_x.length;_point++){
        var _point_x = _MainFace_x[_point].x;
        var _point_y = _MainFace_x[_point].y;
        var car1 = new _facepoint(_point_x,_point_y);
        facepoints.push(car1);
      }
      for (var _lpoint = 0;_lpoint < _line1.length;_lpoint++){
        var _point_x = _line1[_lpoint].x;
        var _point_y = _line1[_lpoint].y;
        var car1 = new _facepoint(_point_x,_point_y);
        leye_points.push(car1);
      }
      for (var _rpoint = 0;_rpoint < _line2.length;_rpoint++){
        var _point_x = _line2[_rpoint].x;
        var _point_y = _line2[_rpoint].y;
        var car1 = new _facepoint(_point_x,_point_y);
        reye_points.push(car1);
      }
      for (var _mpoint = 0;_mpoint < _line3.length;_mpoint++){
        var _point_x = _line3[_mpoint].x;
        var _point_y = _line3[_mpoint].y;
        var car1 = new _facepoint(_point_x,_point_y);
        mouth_points.push(car1);
      }
      var canvasDatas = canvasDatas;
      _faceMain(dada,canvasDatas,facepoints,leye_points,reye_points,mouth_points);
    }
    //方法2
    function _lineMain(_eyebrow) {
      _MainFace_y = [];_Ebcomputedx='';_Ebcomputedy='';_facex_x=[];_facex_y=[];
      for(var b = 0;b<_eyebrow.length-1;b++){
        _eblx = Math.abs(_eyebrow[b]['x']-_eyebrow[b+1]['x']);//每条折线的长度 x轴长度
        _ebly = Math.abs(_eyebrow[b]['y']-_eyebrow[b+1]['y']);//每条折线的高度 y轴长度
        var _spy = _eyebrow[b]['y'];
        var _spx = _eyebrow[b]['x'];
        if(_eyebrow[b+1]['y']>_eyebrow[b]['y']){
          if(_eblx<_ebly){
            for(var t=0;t<Math.abs(_ebly)+1;t++){
              _eblx = _eyebrow[b+1]['x']-_eyebrow[b]['x'];
              _ebly = _eyebrow[b+1]['y']-_eyebrow[b]['y'];
              var _sp = _spy++;
              _Ebcomputedx = ((_sp-_eyebrow[b+1]['y'])/(_ebly)*_eblx)+_eyebrow[b+1]['x'];
              if(_ebly == 0){
                _Ebcomputedx =  _eyebrow[b]['x'];
              }
              _Ebcomputedx =  Math.ceil(_Ebcomputedx);
              _MainFace_y.push({'x':_Ebcomputedx,'y':_sp});
              _facex_x.push(_Ebcomputedx);
              _facex_y.push(_sp);
            }
          }
          else{
            for(var l=0;l<Math.abs(_eblx)+1;l++){
              _eblx = _eyebrow[b+1]['x']-_eyebrow[b]['x'];
              _ebly = _eyebrow[b+1]['y']-_eyebrow[b]['y'];
              if(_eyebrow[b]['x']>_eyebrow[b+1]['x']){
                var _sp = _spx--;
                _Ebcomputedy = ((_ebly)/(_eblx)*(_sp-_eyebrow[b+1]['x']))+_eyebrow[b+1]['y'];
                if(_eblx == 0){
                  _Ebcomputedy = _eyebrow[b]['y'];
                }
                _Ebcomputedy = Math.ceil(_Ebcomputedy)
                _MainFace_y.push({'x':_sp,'y':_Ebcomputedy});
                _facex_x.push(_sp);
                _facex_y.push(_Ebcomputedy);
              }
              else{
                var _sp = _spx++;
                _Ebcomputedy = ((_ebly)/(_eblx)*(_sp-_eyebrow[b+1]['x']))+_eyebrow[b+1]['y'];
                if(_ebly == 0){
                  _Ebcomputedy = _eyebrow[b]['y'];
                }
                _Ebcomputedy = Math.ceil(_Ebcomputedy)
                _MainFace_y.push({'x':_sp,'y':_Ebcomputedy});
                _facex_x.push(_sp);
                _facex_y.push(_Ebcomputedy);
              }
            }
          }
        }
        else{
          _eblx = _eyebrow[b+1]['x']-_eyebrow[b]['x'];//每条折线的长度 x轴长度
          _ebly = _eyebrow[b+1]['y']-_eyebrow[b]['y'];//每条折线的高度 y轴长度
          if(Math.abs(_eblx)<Math.abs(_ebly)){
            for(var l=0;l<Math.abs(_ebly)+1;l++){
              var _sp = _spy--;
              _Ebcomputedx = ((_sp-_eyebrow[b+1]['y'])/(_ebly)*_eblx)+_eyebrow[b+1]['x'];
              if(_ebly == 0){
                _Ebcomputedx =  _eyebrow[b]['x'];
              }
              _Ebcomputedx = Math.ceil(_Ebcomputedx)
              _MainFace_y.push({'x':_Ebcomputedx,'y':_sp});
              _facex_x.push(_Ebcomputedx);
              _facex_y.push(_sp);
            }
          }
          else{
            for(var l=0;l<Math.abs(_eblx)+1;l++){
              if(_eyebrow[b]['x']>_eyebrow[b+1]['x']){
                var _sp = _spx--;
                _Ebcomputedy = ((_ebly)/(_eblx)*(_sp-_eyebrow[b+1]['x']))+_eyebrow[b+1]['y'];
                if(_eblx == 0){
                  _Ebcomputedy = _eyebrow[b]['y'];
                }
                _Ebcomputedy = Math.ceil(_Ebcomputedy);
                _MainFace_y.push({'x':_sp,'y':_Ebcomputedy});
                _facex_x.push(_sp);
                _facex_y.push(_Ebcomputedy);
              }
              else{
                var _sp = _spx++;
                _Ebcomputedy = ((_ebly)/(_eblx)*(_sp-_eyebrow[b+1]['x']))+_eyebrow[b+1]['y'];
                if(_eblx == 0){
                  _Ebcomputedy = _eyebrow[b]['y'];
                }
                _Ebcomputedy = Math.ceil(_Ebcomputedy);
                _MainFace_y.push({'x':_sp,'y':_Ebcomputedy});
                _facex_x.push(_sp);
                _facex_y.push(_Ebcomputedy);
              }
            }
          }
        }
      }
      return _MainFace_y;
    }
    //找到所有坐标
    var _ytotal,_xtotal,_xfor,_yfor,_xtol = [],_ytol = [],_minytol = [];
    function _coordinate(dada) {
      //找到最大值最小值
      _xtol = [];
      _ytol = [];
      _minytol = [];
      //  最新修改
      for(var ops = 0;ops < _eyebrow.length;ops++){
        _minytol.push(_eyebrow[ops]['y']);
      }
      //最新修改结束
      for(var y = 0;y<dada.length;y++){
        _xtol.push(dada[y]['x']);
        _ytol.push(dada[y]['y']);
      }
      //起始坐标
      _xtotal = Math.min.apply(null,_xtol)-5;
      // _ytotal = Math.min.apply(null,_ytol)/2.2;
      //重新算起点坐标
      _ytotal = Math.min.apply(null,_minytol);
      //起始坐标结束
      //终点坐标
      _xfor = Math.max.apply(null,_xtol)+5;
      _yfor = Math.max.apply(null,_ytol)+8;
      _facem=[];
    }
    _coordinate(dada);
    function _faceMain(dada,canvasDatas,facepoints,lefteyepoints,righteyepoints,mouthpoints) {
      var canvasData_guoqi = canvasDatas;
      //打点  原点开始 右下角结束描绘
      var facepoint_X = [],leye_X=[],reye_X=[],mouth_X=[],len,min,max,
        lefteyemin,lefteyemax,righteyemin,righteyemax,mouthmin,mouthmax;
      for(var y=0;y<canvasData_guoqi.height;y++){
        facepoint_X = [];
        for(var faceinx=0;faceinx<facepoints.length;faceinx++) {
          if(facepoints[faceinx].Y==y){
            facepoint_X.push(facepoints[faceinx].X);
          }
        }
        leye_X=[];
        for(var leyex=0;leyex<lefteyepoints.length;leyex++) {
          if(lefteyepoints[leyex].Y==y){
            leye_X.push(lefteyepoints[leyex].X);
          }
        }
        reye_X = [];
        for(var reyex=0;reyex<righteyepoints.length;reyex++) {
          if(righteyepoints[reyex].Y==y){
            reye_X.push(righteyepoints[reyex].X);
          }
        }
        mouth_X=[];
        for(var mouthx=0;mouthx<mouthpoints.length;mouthx++) {
          if(mouthpoints[mouthx].Y==y){
            mouth_X.push(mouthpoints[mouthx].X);
          }
        }
        min='';max='';lefteyemin='';lefteyemax='';righteyemin='';righteyemax='';mouthmin='';mouthmax='';
        min= Math.min.apply(null,facepoint_X);
        max= Math.max.apply(null,facepoint_X);
        lefteyemin= Math.min.apply(null,leye_X);
        lefteyemax= Math.max.apply(null,leye_X);
        righteyemin= Math.min.apply(null,reye_X);
        righteyemax= Math.max.apply(null,reye_X);
        mouthmin= Math.min.apply(null,mouth_X);
        mouthmax= Math.max.apply(null,mouth_X);
        if(facepoint_X.length>=1) {
          for(var x=min;x<=max;x++){
            var idx = (x+y*canvasData_guoqi.width)*4;
            var r_col = canvasData_renlian.data[idx];
            var g_col = canvasData_renlian.data[idx+1];
            var b_col = canvasData_renlian.data[idx+2];
            encoders=[];encoder_max='';encoder_min='';_H='';_S='';_V='';_L='';
            encoders=[r_col,g_col,b_col];
            encoder_max=Math.ceil(Math.max.apply(null,encoders));
            encoder_min=Math.ceil(Math.min.apply(null,encoders));
            _V=encoder_max;
            _S=(encoder_max-encoder_min)/encoder_max;
            if(encoder_max===0) _S = 0;
            _L = (encoder_max+encoder_min)/2;
            if(encoder_max === encoder_min)_H=0;
            if(r_col === encoder_max&&g_col>=b_col) _H =(g_col-b_col)/(encoder_max-encoder_min)* 60;
            if(r_col === encoder_max&&g_col< b_col) _H =(g_col-b_col)/(encoder_max-encoder_min)* 60 + 360;
            if(g_col === encoder_max) _H = 120+(b_col-r_col)/(encoder_max-encoder_min)* 60;
            if(b_col === encoder_max) _H = 240+(r_col-g_col)/(encoder_max-encoder_min)* 60;
            if(leye_X.length>=1) {
              if(x>lefteyemin && x<lefteyemax) continue;
            }
            if(reye_X.length>=1) {
              if(x>righteyemin && x<righteyemax) continue;
            }
            if(mouth_X.length>=1) {
              if(x>mouthmin && x<mouthmax) continue;
            }
            //肤色检测
            var fangcha=Math.sqrt((r_col-r_mean)*(r_col-r_mean)+(g_col-g_mean)*(g_col-g_mean)+(b_col-b_mean)*(b_col-b_mean));
            if(y<division){//(((_H>=0&&_H<30)||(_H>=335&&_H<360))&&(_S>=0&&_S<=0.6&&_V>=0.4))
              if(!((_H>=0&&_H<35)||(_H>=335&&_H<360))) continue;
              if(canvasData_guoqi.data[idx+3]===0) continue;
            }
            alpha = 0.7;
            alpha = num_array[num_txts];
            if(num_array[num_txts]==undefined){
              alpha = 0.7;
            }
            //console.log(alpha)
            //alpha = 0.7;
            // if(fangcha>158) continue;
            // num_str = '';
            // num_str = $('.numText').val();
            // if(num_str == ''){
            //   num_str = 0.7;
            // }
            // alpha = num_str;
            // if((r_col+g_col+b_col)/3>225||(r_col+g_col+b_col)/3<35){
            //   alpha = 0.28;
            // }
            alpha = alpha*canvasData_guoqi.data[idx+3]/255;
            canvasData_renlian.data[idx] = canvasData_renlian.data[idx]*(1-alpha) +canvasData_guoqi.data[idx]*alpha;
            canvasData_renlian.data[idx+1] = canvasData_renlian.data[idx+1]*(1-alpha) +canvasData_guoqi.data[idx+1]*alpha;
            canvasData_renlian.data[idx+2] = canvasData_renlian.data[idx+2]*(1-alpha) +canvasData_guoqi.data[idx+2]*alpha;
            // canvasData_renlian.data[idx] = canvasData_guoqi.data[idx]*alpha;
            // canvasData_renlian.data[idx+1] = canvasData_guoqi.data[idx+1]*alpha;
            // canvasData_renlian.data[idx+2] = canvasData_guoqi.data[idx+2]*alpha;
            if(fangcha>10) {
              canvasData_renlian.data[idx+3]=255-fangcha*1.5;
            }
          }
        }
      }
      ctx.putImageData(canvasData_renlian, 0, 0);
    }
    //模糊
    function blurProcess(facepoints,lefteyepoints,righteyepoints,mouthpoints) {
      //x轴长度
      var _xcon = Math.abs(_xfor-_xtotal);
      //y轴长度
      var _ycon = Math.abs(_yfor-_ytotal);
      var canvasData = ctx.getImageData(0,0,_sw,_sh);
      var tempCanvasData = copyImageData(ctx, canvasData);
      var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;//红绿蓝三色系
      for (var x = 0; x < tempCanvasData.width; x++) {
        for (var y = 0; y < tempCanvasData.height; y++) {
          var idx = (x + y * tempCanvasData.width) * 4;
          for (var subCol = -2; subCol <= 2; subCol++) {
            var colOff = subCol + x;
            if (colOff < 0 || colOff >= tempCanvasData.width) {
              colOff = 0;
            }
            for (var subRow = -2; subRow <= 2; subRow++) {
              var rowOff = subRow + y;
              if (rowOff < 0 || rowOff >= tempCanvasData.height) {
                rowOff = 0;
              }
              var idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
              var r = tempCanvasData.data[idx2];
              var g = tempCanvasData.data[idx2 + 1];
              var b = tempCanvasData.data[idx2 + 2];
              sumred += r;
              sumgreen += g;
              sumblue += b;
            }
          }
          var nr = (sumred / 25.0);
          var ng = (sumgreen / 25.0);
          var nb = (sumblue / 25.0);
          sumred = 0.0;
          sumgreen = 0.0;
          sumblue = 0.0;
          canvasData.data[idx] = nr; // Red channel
          canvasData.data[idx + 1] = ng; // Green channel
          canvasData.data[idx + 2] = nb; // Blue channel
          canvasData.data[idx + 3] = 255; // Alpha channel
        }
      }
      ctx.putImageData(canvasData, 0, 0);

    }
    //添加图片
    function drawing() {
      var img=new Image;
      img.src=""+_srcs+"";
      img.onload=function(){
        source = img;
        _fill_width='';_fill_height='';
        _fill_width = (_xfor-_xtotal);
        _fill_height = _fill_width*2;
        ctx.drawImage(source, _xtotal, _ytotal,_fill_width,_fill_height);
        var _src = ctx.getImageData(0, 0, _sw, _sh);
        var canvasData = copyImageData(ctx,ctx.getImageData(0, 0, _sw, _sh));
        ctx.clearRect(0, 0, _sw, _sh);
        _soius(canvasData);
        _ba_src.push(can.toDataURL("image/png",1));
        $('.newImg').attr('src',_ba_src[0]);
        $('.prompt').stop().hide();
        $('.LoadingCall').addClass('active');
      }
    }
    drawing();
  }
  //清除画布
  function clearCanvas() {
    var cxt=document.getElementById("canvasTwo").getContext("2d");
    cxt.clearRect(0,0,_sw,_sh);
  }
  function clearCanvasone() {
    var cxt=document.getElementById("canvasOne").getContext("2d");
    cxt.clearRect(0,0,_sw,_sh);
  }
  var _swl = $('.upLoadImgsCtrl').outerWidth();
  var _shl = $('.upLoadImgsCtrl').outerHeight();
  function _loadImg() {
    var c=document.createElement('canvas'),
      ctx=c.getContext('2d'),
      len=_loadDate.length;
      c.width=_swl;
      c.height=_shl;
    var _lhs = _shl*0.248;
    var _rw = c.width*0.82;
    var _rh = _rw*_sh/_sw;
    var _rwf = c.width*0.09;
    var _rwt = c.width*0.1;
    var _lwc = (c.height - _rh - _rwt)/2;
    var _lwt = (_rwt + _rh + _lwc*0.1);
    var _lwf = (_rwf + _lwc*1.05);
    var _lwk = (c.width - _lwf)*0.95;
    var _lwg = _lwc*0.92;
    var _gt = (_rwt + _rh - _lwc*0.1);
    var textPx = document.body.clientWidth * 32 / 320;
    function isIphoneX(){
      return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }
    function _text() {
      ctx.font= "bold " + 0.89 * textPx + "px" + " Microsoft YaHei";
      ctx.textBaseline = 'bottom';//设置基线对其 第四基线
      ctx.lineWidth = 4;
      var str1 = "刚好五个字";
      var txtWidth = ctx.measureText(str1).width;
      var str = _text_fill;
      var txtWidth1 = ctx.measureText(str).width;
      ctx.strokeStyle = '#a10831';
      ctx.strokeText(str, _rwt*0.5+_lwc*0.95+(c.width-_rwt*0.5-_lwc)*0.09+(txtWidth-txtWidth1)/2,((_shl-_lhs)+(_lhs-_lwg)/2+(0.89 * textPx)*1.73));
      ctx.fillStyle = '#fef11d';
      ctx.fillText(str, _rwt*0.5+_lwc*0.95+(c.width-_rwt*0.5-_lwc)*0.09+(txtWidth-txtWidth1)/2,((_shl-_lhs)+(_lhs-_lwg)/2+(0.89 * textPx)*1.73));
    }
    function _colors() {
      ctx.fillStyle = "#a10831";
      ctx.fillRect(c.width*0.01, _rwt+_rh-10, c.width*0.98, 10);
    }
    function drawing(n){
      if(n<len){
        var img=new Image;
        img.src=_loadDate[n];
        img.onload=function(){
          if(n===0){
            ctx.drawImage(img,0,0,c.width,c.height);
          }
          else if(n===1||n===2){
            ctx.drawImage(img,_rwf,_rwt,_rw,_rh);
            //_colors();
          }
          else if(n===3){
            ctx.drawImage(img,(c.width-_lwc*0.6)*0.92,(_shl-_lhs-_lwc*0.6),_lwc*0.6,_lwc*0.6);
          }
          else if(n===4){
            if(isIphoneX()){
              ctx.drawImage(img,_rwt*0.5,(_shl-_lhs)+(_lhs-_lwc*0.8*1.129)/2,_lwc*0.8,_lwc*0.8*1.129);
            }
            else{
              ctx.drawImage(img,_rwt*0.5,(_shl-_lhs)+(_lhs-_lwc*0.9*1.129)/2,_lwc*0.9,_lwc*0.9*1.129);
            }
          }
          else if(n===5){
            ctx.drawImage(img,_rwt*0.5+_lwc*0.95,(_shl-_lhs)+(_lhs-_lwg)/2,c.width-_rwt*0.7-_lwc,_lwg);
          }
          else if(n===6){
            ctx.drawImage(img,c.width*0.01,c.width*0.05,c.width*0.98,_rh*1.1);
          }
          drawing(n+1);
        }
      }else{
        //保存生成作品图片
        _text();
        _loadBase.push(c.toDataURL("image/png",0.8));
        //alert(JSON.stringify(base64));
        $('.loadImg').attr('src','');
        $('.loadImg').attr('src',_loadBase);
        $('.upLoadImgs').addClass('active');
        setTimeout(function () {
          $('.WrittenWords').stop().fadeOut();
        },500)
      }
    }
    drawing(0);
  }
  function _written() {
    var total_ime,total_ani;
    if(_newsrc){
      if(_srcs){
        $('.WrittenWords .list').css({'left':'-80px','opacity':'0'})
        $('.WrittenWords').stop().fadeIn(function () {
          var imes = 0;
          $('.WrittenWords .list').each(function (i,e) {
            imes+=300;
            $(e).stop().delay(imes).animate({
              left:'0',
              opacity:'1'
            },500,'easeInOutElastic')
          })
        });
        total_ime = '';
        total_ani = '';
        total_ime = 300*($('.WrittenWords .list').length);
        total_ani = 500+200;
        setTimeout(function () {
          if(_newsrc){
            if(_opens){
              if(_srcs){
                _loadDate=[];
                _loadBase=[];
                _loadDate.push('images/blue1.jpg',_newsrc[0],_ba_src[0],'images/qiu1.png','images/ewm.png','images/txt1.png','images/caidai.png');
                _loadImg();
              }
              else{
                alert('没有选择国家')
              }
            }
            else {
              return false
            }
          }
          else{
            alert('请上传图片')
          }
        },(total_ime+total_ani))
      }
      else{
        alert('请选择国家')
      }
    }
    else{
      alert('请上传图片');
    }
  }
});