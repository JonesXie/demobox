var audio = document.getElementById('audio');
(function () {
	document.addEventListener("WeixinJSBridgeReady", function () {
		audioAutoPlay();
	}, false);
	document.addEventListener('YixinJSBridgeReady', function () {
		audioAutoPlay();
	}, false);

	function audioAutoPlay() {
		play = function () {
			audio.play();
			document.removeEventListener("touchstart", play, false);
		};
		audio.play();
		document.addEventListener("touchstart", play, false);
	}
	audio.play();
	$('.BGM').on('click', function () {
		if (audio.paused) {
			audio.play();
			$('.BGM img').attr('src', './images/player.png');
			$('.BGM').addClass('active');
		} else {
			audio.pause();
			$('.BGM img').attr('src', './images/player2.png')
			$('.BGM').removeClass('active');
		}
	})
}());
$(function () {
	function _index() {
		$('.indeTitle').addClass('myflipInX');
		$('.loading').stop().hide();
		$('.BGM').stop().show();
		$('.BGM').addClass('active');
		$('.indexBtn').addClass('bounceInLeft');

		$('.bling img').addClass('blingAni');

		$('.indexBtn img').stop().show();

		setTimeout(function () {
			$('.bling').show();
		}, 600)
		pork();
		setInterval(function () {
			pork();
		}, 1200)
		// autoPlay();
	}
	// function autoPlay(){
	// 	var _audio = document.getElementById('audio');
	// 		_audio.currentTime = 0.0;//audio的当前时间
	// 		_audio.play();
	// 	document.addEventListener('WeixinJSBridgeReady', function(){
	// 		var _audio = document.getElementById('audio');
	// 		_audio.currentTime = 0.0;
	// 		_audio.play();
	// 	},false)
	// }
	$('.background').ready(function () {
		// 进度条加载
		$('.loadSpeed').show()
		var prg = 0;
		var timer = 0;
		progress([55, 75], [1, 3], 100)

		window.onload = function () {
			/*全部加载完毕*/
			progress(100, [1, 5], 10, function () {
				window.setTimeout(function () {
					_index();
				}, 1000)
			})
		}
		window.setTimeout(function () {
			/*超时10秒继续*/
			progress(100, [1, 5], 10, function () {
				window.setTimeout(function () {
					if ($('.loading').is(':visible') === true) {
						_index();
					}
				}, 1200)
			})
		}, 10000)

		function progress(dist, speed, delay, callback) {
			var _dist = random(dist)
			var _delay = random(delay)
			var _speed = random(speed)

			window.clearTimeout(timer)
			timer = window.setTimeout(function () {
				if (prg + _speed >= _dist) {
					prg = _dist
					callback && callback()
				} else {
					prg += _speed
					progress(_dist, speed, delay, callback)
				}
				$('.speedContain').css('width', parseInt(prg) + '%')
			}, _delay)
		}

		function random(n) { //获取随机数
			if (typeof n === 'object') {
				var times = n[1] - n[0]
				var offset = n[0]
				return Math.random() * times + offset
			} else {
				return n
			}
		}

	})
	//laoding动画结束

	function pork() {
		$('.pork').stop().animate({
			left: '0'
		}, 500, 'easeInOutElastic', function () {
			$('.pork').stop().animate({
				left: '-9%'
			}, 200)
		})
		$('.beer').stop().animate({
			right: '0'
		}, 500, 'easeInOutElastic', function () {
			$('.beer').stop().animate({
				right: '-9%'
			}, 200)
		})
	}
	// if (localStorage.length === 0) {
	// 	localStorage.setItem('tele','0');
	// }
	sessionStorage.setItem('tele', '0');
	// 跳转页面
	$('.indexFoot').click(function () {
		$('.Food').addClass('active');
		$('.foodBtn').addClass('zoomInRight');
		setTimeout(function () {
			$('.foodBtn img').addClass('jello');
		}, 1000)
	})
	$('.indexBtn').click(function () {
		$('.upLoad').addClass('active')
	})
	$('.foodBtn').click(function () {
		$('.upLoad').addClass('active')
	})
	$('.lists2').click(function () {
		$('.rank').addClass('active');
		topThree();
		mySelector();
		var $li = $('.Tbody').find('li')
		var m = 0;
		var timer1 = setInterval(function () {
			if (m <= $li.length) {
				$('.Tbody li:nth-child(' + m + ')').addClass('active');
				m++;
			} else {
				clearInterval(timer1);
			}
		}, 200)
		setTimeout(function () {
			$('.rankTxt>i').html(_text_fill);
			$('.barContent').stop().show();
			$('.success').stop().fadeIn();
			$('.rankBar').stop().fadeIn('mid');
			$('.phoneNum').val('');
		}, 1500)

	})

	// 跳转页面结束
	// rules
	$('.upLoadHref').click(function () {
		$('.rules').stop().fadeIn('fast');
	})
	$('.rulesClose').click(function () {
		$('.rules').stop().fadeOut();
	})

	//menu detail
	$('.List dt').on('click', function () {
		var i = $(this).index() + 1;
		$('.detail' + i).stop().fadeIn(300);
		$('.detail' + i + ' a > img').addClass('boingInUp');
	})
	$('.detail_close img').click(function () {
		$('.detailAll').fadeOut(300);
	})

	// rank

	//前三名
	function topThree() {
		$('.Tbody li:first-child > em:first-child').html('<img src="./images/one.png" alt="">')
		$('.Tbody li:nth-child(2) > em:first-child').html('<img src="./images/two.png" alt="">')
		$('.Tbody li:nth-child(3) > em:first-child').html('<img src="./images/three.png" alt="">')
	};

	//用户选定的team
	function mySelector() {
		var Lis = $('.Tbody').find('li');
		Lis.removeClass('myselector'); //修改用户选择多个
		for (i = 0; i < Lis.length; i++) {
			if (Lis[i].children[1].innerHTML == _text_fill) {
				$('.Tbody li:nth-child(' + (i + 1) + ')').addClass('myselector'); //用户选定的team,添加myselector
			}
		}
	};

	//input高度固定
	var HEIGHT = $('body').height();
	$(window).resize(function () {
		$('.rank').height(HEIGHT);
	});
	$('.phoneNum').on('focus', function () {
		var _this = this;
		setTimeout(function () {
			_this.scrollIntoViewIfNeeded();
		}, 200)
	})

	// 检测电话号码
	$('.phoneSubmit').on('click', function () { //点击时检测号码
		var Num = $('.phoneNum').val();
		var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!myreg.test(Num)) {
			confirm('号码输入错误!')
		} else { //电话正确，触发点击事件
			$('.barContent').stop().fadeOut(200);
			$('.success').stop().fadeIn(200);
			$('.rankBKG, .success').on('click', function () {
				sessionStorage.setItem('tele', '1');
				$('.rankBar').stop().fadeOut(200);
				$('.success').stop().fadeOut(200);
			})
			setTimeout(function () {
				sessionStorage.setItem('tele', '1');
				$('.rankBar').stop().fadeOut(200);
				$('.success').stop().fadeOut(200);
			}, 2000)
		};
		//传递电话号码到数据库
		// $.ajax({
		// 	type:'post',
		// 	url:'xxx',//数据库地址
		// 	data:{'phoneNumber':Num},
		// })
	})

	$('.contentWrap').on('touchmove', function (e) {
		e.stopPropagation();
	})

	var timer2;
	$('.rankClose').click(function () {
		$('.rankBar').stop().hide();
		timer2 = setTimeout(function () {
			if (sessionStorage.getItem('tele') == 1) {
				$('.rankBar').stop().fadeOut(200);
			} else if ($('.rankBar').is(':hidden')) {
				$('.rankBar').stop().fadeIn('mid');
			}
		}, 7000)

	})

	$('.footFR').click(function () {
		$('.rank').removeClass('active');
		$('.Tbody li').removeClass('active');
		clearTimeout(timer2)
	})

	$('.footH').click(function () {
		$('.share').stop().show()
	})
	$('.share').click(function () {
		$('.share').stop().hide()
	})

})


// $('.phoneNum').on('click',function(){
// 	var _div = $('.rankTxt h2').get(0);
// 	alert(window.getComputedStyle(_div).fontSize)
// })