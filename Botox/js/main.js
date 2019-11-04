$(document).ready(function () {
    let tickets = 0;
    let ticket1 = false;
    let ticket2 = false;
    let ticket3 = false;
    let ticket4 = false;
    // 视频
    let trust_video = $('#trust_video')[0];
    let promise_video = $('#promise_video')[0];
    let city_video = $('#city_video')[0];
    let identify_video = $('#identify_video')[0];

    let audio = $('#audio')[0];
    let BGM = $('.BGM');
    let audio_play_status = true;

    let timer;//content21

    //横屏动画
    function orient() {
        if (window.orientation == 90 || window.orientation == -90) {
            BGM_autoplay();
            $('.P1_txtL').addClass('P1_txtL_enter');
            $('.P1_txtR').addClass('P1_txtR_enter');
            $('.P1_train').addClass('P1_train_enter');
            setTimeout(function () {
                $('.P1_train').css('opacity', '1');
                $('.P1_img1').fadeOut(180);
                $('.P1_img2').delay(180).fadeIn(180);
            }, 3000);
        }
    }

    orient();
    $(window).bind('orientationchange', function () {
        orient();
    });

//背景音乐
    function BGM_autoplay() {
        audio_play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio_play();
        }, false);
        document.addEventListener('YixinJSBridgeReady', function () {
            audio_play();
        }, false);
        //iso 自带浏览器通过 touchstart 进行自动播放
        let audioStatus = true;
        document.addEventListener("touchstart", function (e) {
            if (audioStatus) {
                audio_play()
                audioStatus = false;
            }
        }, false);
    }

    function audio_play() {
        audio.play();
        $('.BGM img').attr('src', './images/Music_player.png');
        BGM.addClass('active');
    }

    function BGM_click() {
        BGM.bind('click', function () {
            toggle_audio();
        });
    }

    BGM_click();//点击播放暂定
    //暂停和播放切换
    function toggle_audio() {
        if (audio.paused) {
            audio.play();
            $('.BGM img').attr('src', './images/Music_player.png');
            $('.BGM').addClass('active');
            audio_play_status = true;
        } else {
            audio.pause();
            $('.BGM img').attr('src', './images/Music_player2.png')
            $('.BGM').removeClass('active');
            audio_play_status = false;
        }
    }

// train
    $(function () {
        // FastClick.attach(document.body);
        let _islet = false;
        let _isrewl = false;
        let $train = $('.train');
        let $startImg = $('.startImg');

        function isWeiXin() {
            //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
            let ua = window.navigator.userAgent.toLowerCase();
            //通过正则表达式匹配ua中是否含有MicroMessenger字符串
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }

        let _start = document.getElementById('start');
        let _width = document.documentElement.clientWidth || document.body.clientWidth;//屏幕宽度
        let _height = document.documentElement.clientHeight || document.body.clientHeight;//屏幕高度
        let _imgWidth = $('.prospect').outerWidth();//大图长度
        let _heis = _imgWidth;
        let _trainWidth = $train.outerWidth();//火车长度
        //let _left = -_width*0.49;//火车初始距离左侧距离
        let _left = -_trainWidth * 0.76;
        let overLeft = (_width * 0.96 - _trainWidth);//火车头终点停靠点
        if (isWeiXin()) {
            overLeft = (_width * 0.98 - _trainWidth);
        }
        $('.startImg').css('width', _imgWidth + 'px');
        $train.css('left', _left + 'px');
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        let totalLeft;
        $(window).on('load', function () {
            _imgWidth = $('.prospect img').outerWidth();//大图长度
            totalLeft = -(_imgWidth - _width);
            _islet = true;
        });
        (function () {
            document.addEventListener("WeixinJSBridgeReady", function () {
                _imgWidth = $('.prospect img').outerWidth();//大图长度
                totalLeft = -(_imgWidth - _width);
                _islet = true;
            }, false);
            document.addEventListener('YixinJSBridgeReady', function () {
                _imgWidth = $('.prospect img').outerWidth();//大图长度
                totalLeft = -(_imgWidth - _width);
                _islet = true;
            }, false);
        }());

        $(window).resize(function () {
            _width = document.documentElement.clientWidth || document.body.clientWidth;//灞忓箷瀹藉害
            _height = document.documentElement.clientHeight || document.body.clientHeight;//灞忓箷楂樺害
            _imgWidth = $('.prospect img').outerWidth();//澶у浘闀垮害
            _trainWidth = $(".train").outerWidth();//鐏溅闀垮害
            //_left = -_width*0.49;//鐏溅鍒濆璺濈宸︿晶璺濈
            _left = -_trainWidth * 0.76;
            let oiss = _heis / _imgWidth;
            // nums=0;offle=0;
            if (_isrewl) {
                $train.css('left', (_width * 0.96 - _trainWidth) + 'px');
                if (isWeiXin()) {
                    $train.css('left', (_width * 0.98 - _trainWidth) + 'px');
                }
                $startImg.css('left', -_imgWidth + _width + 'px');
                return false
            }
            else {
                $startImg.css('width', _imgWidth + 'px');
                $train.css('left', _left + 'px');
            }
            overLeft = (_width * 0.96 - _trainWidth);
            if (isWeiXin()) {
                overLeft = (_width * 0.98 - _trainWidth);
            }
            totalLeft = -(_imgWidth - _width);
        });

        function letsGo() {
            $('.frontWheel,.middle,.rearWheel,.trainText').addClass('active');
            $train.stop().animate({
                left: overLeft + 'px'
            }, 10000);
            $startImg.stop().animate({
                left: totalLeft + 'px'
            }, 10000, function () {
                _isrewl = true;
                $('.frontWheel,.middle,.rearWheel').removeClass('active');
                setTimeout(function () {
                    $('.P3').show(800);
                }, 800)
            })
        }

        $('.P1_img3_button').click(function () {
            $('.P1').fadeOut(function () {
                letsGo();
            });
            $('.P2').css('visibility', 'visible')
        });
    });
// frame

    $('.P1_img2').click(function () {
        $('.P1_img2').fadeOut(200);
        $('.P1_img3').delay(180).fadeIn(200);
    });

// A页面
    $('.P3_button1').click(function () {
        $('.content1').fadeIn(300);
        videoStatus(trust_video);
    });
    $('.P3_button2').click(function () {
        $('.content2').fadeIn(300);
    });
    $('.P3_button3').click(function () {
        $('.content3').fadeIn(300);
    });
    $('.P3_button4').click(function () {
        $('.content4').fadeIn(300);
    });

// content1
    // close
    $('.content1_close').click(function () {
        $('.content1').fadeOut(300);
        $('.P3_ticket1').attr('src', './images/P3_passed.png');
        removeEL(trust_video);
        trust_video.pause();
        if (ticket1 === false) {
            tickets += 1;
            if (tickets === 4) {
                ticketsAll()
            }
            ticket1 = true;
        }
    });

//content2
    // close
    $('.content2_close').click(function () {
        $('.content2').fadeOut(300);
        $('.P3_ticket2').attr('src', './images/P3_passed.png');
        if (ticket2 === false) {
            tickets += 1;
            if (tickets === 4) {
                ticketsAll()
            }
            ticket2 = true;
        }
    });
    $('.trust_li1').click(function () {
        content2Enter();
        $('.content21').delay(800).fadeIn(300);
        setTimeout(function () {
            content21_scroll();
        }, 1500);
        videoStatus(promise_video);
    });
    $('.trust_li2').click(function () {
        content2Enter();
        $('.content22').delay(800).fadeIn(300);
    });
    $('.trust_li3').click(function () {
        content2Enter();
        $('.content23').delay(800).fadeIn(300);
        videoStatus(city_video);
    });
    $('.trust_li4').click(function () {
        content2Enter();
        $('.content24').delay(800).fadeIn(300);
    });
    // content21
    $('.content21_close').click(function () {
        content2Out();
        $('.content21').fadeOut(200);
        removeEL(promise_video);
        promise_video.pause();
        clearInterval(timer);
        recover();
    });
    //content22
    $('.content22_new').on('touchstart click', function () {
        $('.content22 .slide_down').hide(100);
    });
    $('.content22_close').click(function () {
        content2Out();
        $('.content22').fadeOut(200);
        $('.content22 .slide_down').delay(1000).fadeIn();
    });
    //content23
    $('.content23_close').click(function () {
        content2Out();
        $('.content23').fadeOut(200);
        removeEL(city_video);
        city_video.pause();
    });
    //content24
    $('.content24_close').click(function () {
        content2Out();
        $('.content24').fadeOut(200);
    });

    function vote_ios_css() {
        if (navigator.userAgent.match(/(iPhone)/)) { // 判断是不是iphone
            $('.vote_hospital').addClass('ios_vote_hospital');
        }
    }

    vote_ios_css();

    //点击按钮，心变换动画
    $('.button_wrap').click(function () {
        let Like = $(this).attr('rel');
        let $vote_like = $(this).children(':last').children();
        let count = $(this).prev().children(':last').html();
        let num = parseInt(count);
        if (Like === 'like') {//点击变红
            num -= 1;
            $(this).prev().children(':last').html(num);
            $vote_like.removeClass('vote_like_animation');
            $vote_like.css("background-position", "left");
            $(this).attr('rel', 'unlike');
        } else if (Like === 'unlike') {//点击变白
            num += 1;
            $(this).prev().children(':last').html(num);
            $vote_like.addClass('vote_like_animation');
            $vote_like.css("background-position", "right");
            $(this).attr('rel', 'like');
        }

    });

//content3
    // close
    $('.content3_close').click(function () {
        $('.content3').fadeOut(300);
        $('.P3_ticket3').attr('src', './images/P3_passed.png');
        if (ticket3 === false) {
            tickets += 1;
            if (tickets === 4) {
                ticketsAll()
            }
            ticket3 = true;
        }
    });
    $('.achieve_li2').click(function () {
        $('.content3_bkg').addClass('active2');
        $('.content3_cover').fadeOut();
        $('.content32').delay(900).fadeIn(200);
        videoStatus(identify_video);
    });
    // content32
    $('.content32_close').click(function () {
        $('.content3_bkg').removeClass('active2');
        $('.content3_cover').delay(800).fadeIn(200);
        $('.content32').fadeOut(100);
        removeEL(identify_video);
        identify_video.pause();
    });

//content4
    // close
    $('.content4_close').click(function () {
        $('.content4').fadeOut(300);
        $('.P3_ticket4').attr('src', './images/P3_passed.png');
        if (ticket4 === false) {
            tickets += 1;
            if (tickets === 4) {
                ticketsAll()
            }
            ticket4 = true;
        }
    });

    //content缩放
    function content2Enter() {
        $('.content2_bkg').addClass('active2');
        $('.content2_cover').fadeOut();
    }

    function content2Out() {
        $('.content2_bkg').removeClass('active2');
        $('.content2_cover').delay(800).fadeIn(200);
    }

    //content21文字滚动
    const content21_p = $('#content').html();

    function recover() {
        $('#content').html(content21_p);
    }

    function content21_scroll() {
        let speed = 30;
        let $text = $('.text');
        let $content = $('.content');
        let $marquee = $('.marquee');
        let _width = $text.outerWidth();
        let _outwidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        let _content = document.getElementById('content');
        let _offsetLeft = 0;
        let _clone = $text.clone();
        $content.append(_clone);
        $content.css('width', _width * 2 + 2 + 'px');

        function marquee() {
            if (_offsetLeft >= _width + 1) {
                _offsetLeft = 0;
                $marquee.scrollLeft(0);
                $text.slice(0, 1).appendTo($content);
            }
            $marquee.scrollLeft(_offsetLeft++);
        }

        if (_width > _outwidth) {
            timer = setInterval(marquee, speed);
            _content.addEventListener('touchstart', function () {
                clearInterval(timer)
            });
            _content.addEventListener('touchend', function () {
                timer = setInterval(marquee, speed);
            });
        }
    }


    //视频和音频播放暂停
    function videoStatus(el) {
        el.addEventListener('play', f1, false);
        el.addEventListener('pause', f2, false);
    }

    function f1() {
        if (audio_play_status) {
            audio.pause();
            $('.BGM img').attr('src', './images/Music_player2.png')
            BGM.removeClass('active');
        }
        BGM.unbind('click');
    }

    function f2() {
        if (audio_play_status) {
            audio.play();
            $('.BGM img').attr('src', './images/Music_player.png');
            BGM.addClass('active');
        }
        BGM_click();
    }

    //移除事件监听
    function removeEL(el) {
        if (!el.paused) {
            BGM_click();
        }
        el.removeEventListener('play', f1, false);
        el.removeEventListener('pause', f2, false);
    }

    //车票集齐
    function ticketsAll() {
        $('.P3_congratulation, .P3_foot').delay(300).show().addClass('active');
    }
});
