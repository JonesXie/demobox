// 加载了loading.js 和 video.js
$(function () {
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var _PUBLIC_ = "./";

	// 背景音乐
	$('.BGM').tap(function () {
		if ($('.BGM div:first-of-type').attr('class') == 'BGMicon') {
			$('.BGM div:first-of-type').removeClass('BGMicon');
			$('.BGM img').attr('src', _PUBLIC_ + 'images/player2.png');
		} else {
			$('.BGM div:first-of-type').addClass('BGMicon');
			$('.BGM img').attr('src', _PUBLIC_ + 'images/player.png')
		}
		if ($('#audio').get(0).paused) {
			$('#audio').get(0).play();
		} else {
			$('#audio').get(0).pause();
		}
	})

	//背景音乐结束

	// KV cover
	$('.KV .KV_dotted div').on('touchstart', function () {
		switch ($(this).index()) {
			case 0:
				$('#Cover1 .cover1_header').attr('src', _PUBLIC_ + "images/product1.gif")
				$('#Cover1').fadeIn(800);
				break;
			case 1:
				$('#Cover2 .cover2_header').attr('src', _PUBLIC_ + "images/product2.gif")
				$('#Cover2').fadeIn(800);
				break;
			case 2:
				$('#Cover3 .cover3_header').attr('src', _PUBLIC_ + "images/product3.gif")
				$('#Cover3').fadeIn(800);
				break;
		}
		$('.KV .KV_footTxt').hide();
		$('.KV .Choose_footTxt').show();

	})
	$('.KV_cover .KV_Close').on('touchstart', function (e) {
		e.preventDefault();
		$(this).parent().fadeOut(800);
		setTimeout(function () {
			$('.cover1_header, .cover2_header, .cover3_header ').attr('src', "")
		}, 800)

	})

	// 页面上滑事件
	// KV choose中“我想要”,"送给你"滑动下一页
	$('.KV .Choose_footTxt ul li').tap(function () {
		$('.KV').css('display', 'none');
		$('.Interact').css('display', 'block');
		$('.Interact_Bground').addClass('Interact_Animation');
		$('.circle_left').addClass("Inner_enter");
		setTimeout(function () {
			$('.Interact_slideCursor').css('display', 'block');
		}, 2400)

		// 背景音乐
		$('.BGM').css('display', 'block');
		$('.BGM > div').addClass('BGMicon');
		var _audio = document.getElementById('audio');
		_audio.currentTime = 0.0; //audio的当前时间
		_audio.play();
		document.addEventListener('WeixinJSBridgeReady', function () {
			var _audio = document.getElementById('audio');
			_audio.currentTime = 0.0;
			_audio.play();
		})
	})

	// 滑动事件结束


	// interact
	var footerControl = { // 转盘底部控制参数
		wind: false,
		temperature: false,
		windNum: 0,
		temperatureNum: 0
	}
	var turntableSpeed = 1;
	var turntableNum = 1; // 选择速度
	var turntableType = 'grade0';
	var animStart = true;
	var turntableAnimNum = 0;
	var lastTime;

	// 监听初次点击
	$('.Interact_cover').one('touchstart', function (e) {
		e.preventDefault();
		$('.Interact_slideCursor').css('display', 'none');
		$('.Interact_control_wind').css('display', 'block');
		$('.Interact_wind').addClass('Control_animate')
		setTimeout(function () {
			$('.Interact_control_wind').css('display', 'none');
			$('.Interact_control_temp').css('display', 'block');
			$('.Interact_temp').addClass('Control_animate');
			setTimeout(function () {
				$('.Interact_control_temp').css('display', 'none');
			}, 2000)
		}, 2000)
		setTimeout(function () {
			$('.Interact_cover').remove();
			lastTime = Date.now();
			var turntableAnimTimr = window.requestAnimationFrame(turntableAnim);
		}, 4000)


	})
	// 监听初次点击结束
	// swiper1
	var mySwiper1 = new Swiper('#Swiper1', {
		observer: true,
		observeParents: true,

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		on: {
			slideNextTransitionStart: function () {
				$('#Swiper1 .swiper-button-prev').css('display', 'block');
				$('#Swiper1 .swiper-button-next').css('display', 'none');
			},
			slidePrevTransitionStart: function () {
				$('#Swiper1 .swiper-button-next').css('display', 'block');
				$('#Swiper1 .swiper-button-prev').css('display', 'none');
			},
		},
		onSlideChangeStart: function () {
			animStart = false;
		},
		onSlideChangeEnd: function () {
			animStart = true;
		}
	})
	//swiper1结束

	// 点击控制风速
	$(".Interact_wind").on("tap", function () {
		$(".Interact_yes").css('display', 'block');
		var index = footerControl.windNum;
		if (!footerControl.wind) {
			footerControl.windNum++;
			$(".Interact_dot_left li").eq(index + 1).css('display', 'block');

		} else {
			footerControl.windNum--;
			$(".Interact_dot_left li").eq(index).css('display', 'none');
			index--;
		}
		turntableSpeed = footerControl.windNum;
		if (footerControl.windNum == 2 && !footerControl.wind) {
			footerControl.wind = true;
		} else if (footerControl.windNum == 0 && footerControl.wind) {
			footerControl.wind = false;
		}
	})

	// 控制风速结束


	// 控制温度
	$(".Interact_temp").on("tap", function () {
		$(".Interact_yes").css('display', 'block');
		var index = footerControl.temperatureNum;
		if (!footerControl.temperature) {
			$(".Interact_dot_right li").eq(index).css('display', 'block');
			index++;
			turntableType = 'grade' + index;
			footerControl.temperatureNum++;
		} else {
			index--;
			footerControl.temperatureNum--;
			turntableType = 'grade' + index;
			$(".Interact_dot_right li").eq(index).css('display', 'none');
		}

		if (index == 3 && !footerControl.temperature) {
			footerControl.temperature = true;
		} else if (index == 0 && footerControl.temperature) {
			footerControl.temperature = false;
		}
	})
	// 控制温度结束

	// 转盘转动

	function turntableAnim() {
		var now = Date.now();
		var startTime = now - lastTime;
		turntableSpeed = turntableSpeed == 3 ? 2.5 : turntableSpeed;
		var speed = 100 - turntableSpeed * 25;
		window.requestAnimationFrame(turntableAnim);
		if (startTime >= speed && animStart) {
			turntableNum = turntableNum >= 13 ? 1 : turntableNum;
			if (mySwiper1.activeIndex == 0) {
				$('.left_imge').attr('src', _PUBLIC_ + 'images/' + turntableType + '/' + turntableNum + '.png');

			} else {
				$('.right_bg').attr('src', _PUBLIC_ + 'images/' + turntableType + '/bg.png')
				$('.right_imge').attr('src', _PUBLIC_ + 'images/grade4/' + turntableNum + '.png');

			}

			turntableNum++;
			lastTime = Date.now();
		}
		// 存储swiper1激活块、speed、turntableType(温度样式)
		localStorage.clear();
		localStorage.setItem("swiperOn", mySwiper1.activeIndex);
		localStorage.setItem('Speed', speed);
		localStorage.setItem('TurntableType', turntableType);
	}
	// 转盘转动结束

	//interact
	// 转盘滑动
	// 滑动事件
	$('.Interact_yes').tap(function () {
		$('.Interact').hide();
		$('.Blessing').show();
		Bless();
	})
	// 转盘滑动结束	
	//interact结束

	//blessing
	function Bless() {
		// 获取localStorage的值
		var swiperOn = localStorage.hasOwnProperty('swiperOn');
		var Speed = localStorage.hasOwnProperty('Speed');
		var TT = localStorage.hasOwnProperty('TurntableType');
		var _swiperOn = localStorage.getItem('swiperOn');
		var _Speed = localStorage.getItem('Speed');
		var _TT = localStorage.getItem('TurntableType');
		var turntableNums = 1;
		var lastTime2;

		if (swiperOn && Speed && TT) { //进行圆圈赋值
			var lastTime2 = Date.now();
			window.requestAnimationFrame(turntableAnim2);
		}

		function turntableAnim2() {
			var now2 = Date.now();
			var startTime2 = now2 - lastTime2;
			window.requestAnimationFrame(turntableAnim2);
			if (startTime2 >= _Speed) {
				turntableNums = turntableNums >= 13 ? 1 : turntableNums;
				if (_swiperOn == 0) {
					$('.containTbg').attr('src', _PUBLIC_ + 'images/blessing_circle_bg.png');
					$('.containTurn').attr('src', _PUBLIC_ + 'images/' + _TT + '/' + turntableNums + '.png');
				} else {
					$('.containTbg').attr('src', _PUBLIC_ + 'images/' + _TT + '/bg.png');
					$('.containTurn').attr('src', _PUBLIC_ + 'images/grade4/' + turntableNums + '.png');
				}
				turntableNums++;
				lastTime2 = Date.now();
			}

		}

		// swiper2
		var mySwiper2 = new Swiper('#Swiper2', {
			observer: true,
			observeParents: true,
			loop: true,


			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
		//swiper2结束


		// 分享遮罩
		$('.Blessing_footer').on('tap', function () {
			$(this).next().fadeIn(1000);
			var _title = $('#Swiper2 .swiper-slide:nth-child(' + mySwiper2.activeIndex + ') span').text();
			$('title').html(_title);
			$('#audio').get(0).pause();
			$('.BGM > div').removeClass('BGMicon');
			$('.BGM').css('display', 'none');
		})

		$('.Blessing_share').on('tap', function () {
			$(this).fadeOut(1000);
			$('.BGM').fadeIn(1000);
			$('.BGM > div').addClass('BGMicon');
			var _audio = document.getElementById('audio');
			_audio.play();
			document.addEventListener('WeixinJSBridgeReady', function () {
				var _audio = document.getElementById('audio');
				_audio.play();
			})
		})
	}
})