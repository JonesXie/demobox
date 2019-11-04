var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var _PUBLIC_ = "./";
(function () {
  var stageWidth = document.documentElement.clientWidth;
  var stageHeight = document.documentElement.clientHeight;
  var stageScale = stageWidth / 750;
  canvas.style.width = 750 * stageScale + 'px';
  if (navigator.userAgent.match(/(iPhone)/)) { // 判断是不是iphone
    if ((screen.availHeight == 812) && (screen.availWidth == 375)) {
      canvas.setAttribute("height", 1450);
      canvas.style.height = stageHeight + 'px';
      loadStartAnimImg(true);
      return false;
    }
  }
  canvas.style.height = stageHeight + 'px';
  loadStartAnimImg(false);
}());

// 播放结束动画 结束后播放视频动画
function playStartAnim() {
  $('.loading-m >.loadAnim').addClass('loadEndAnim');
  $('.loading').one('animationend webkitAnimationEnd', '.loadAnim', function () {
    $('.loading').hide();
    var drawh = canvas.getAttribute("height");
    ctx.drawImage(videoArr[1], 0, 0, 750, drawh);
    var videoNum = 2;
    var videotimer = setInterval(function () {
      if (videoNum >= 46) {
        $('#canvas').hide();
        $('.KV').show();
        // preload();
        clearInterval(videotimer);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(videoArr[videoNum], 0, 0, 750, drawh);
        videoNum++;
      };
    }, 100);
  })
}

// 加载video图片
function loadStartAnimImg(isX) {
  videoArr = [];
  var imagesIndex = 0;
  for (var i = 1; i < 46; i++) {
    (function (i) {
      videoArr[i] = new Image();
      if (isX) {
        var imgSrc = _PUBLIC_ + "images/videoXSprite/video" + i + ".jpg"
      } else {
        var imgSrc = _PUBLIC_ + "images/videoSprite/video" + i + ".jpg"
      }
      videoArr[i].src = imgSrc;
      videoArr[i].onload = function () {
        imagesIndex++;
        if (imagesIndex >= 45) { // 全部加载完成
          imgloadEnd = true;
          playStartAnim();
        }
      }
    }(i))
  }
}