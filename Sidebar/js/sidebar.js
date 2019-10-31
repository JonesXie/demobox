(function(){
	//menubar构造函数
 	var Menubar = function(){
 		this.el = document.querySelector('#sidebar ul');
 		this.state = 'allClosed';//hasOpened
 		this.el.addEventListener('click',function(e){
 			e.stopPropagation();
 		});
 		var self= this;
 		this.currentOpenedMenuContent = null;
 		this.menuList = document.querySelectorAll('#sidebar ul > li');
 		for(var i = 0;i<this.menuList.length;i++){
 			this.menuList[i].addEventListener('click',function(e){
 				var menuContentEl = document.getElementById(e.currentTarget.id + '-content');//找到li中的div
 				if(self.state === 'allClosed'){
 					//console.log('打开'+ menuContentEl.id);
 					menuContentEl.style.left='-80px';
 					menuContentEl.style.top = '0';
 					menuContentEl.className = 'nav-content';
 					menuContentEl.classList.add('menuContent-move-right');
 					self.state = 'hasOpened';
 					self.currentOpenedMenuContent = menuContentEl;//保存menuContentEl状态
 				}else{
 					//console.log('关闭'+ self.currentOpenedMenuContent.id);
 					self.currentOpenedMenuContent.className = 'nav-content';
 					self.currentOpenedMenuContent.style.left ='40px';
 					self.currentOpenedMenuContent.style.top = '0';
 					self.currentOpenedMenuContent.classList.add('menuContent-move-left');
 					//console.log('打开'+ menuContentEl.id);
 					menuContentEl.style.left='30px';
 					menuContentEl.style.top = '250px';
 					menuContentEl.classList.add('menuContent-move-up');
 					self.state = 'hasOpened';
 					self.currentOpenedMenuContent = menuContentEl;//保存menuContentEl状态
 				}
 			});
 		}

		this.menuContentList = document.querySelectorAll('.nav-content > div.nav-content-close');//.nav-content > div.nav-content-close
 		//使用jquery中的查询方式找到元素
 		 	for (i = 0; i < this.menuContentList.length; i++) {
 			 this.menuContentList[i].addEventListener('click',function(e){
 				var menuContent = e.currentTarget.parentNode;//currentTarget当前目标
 					menuContent.className = 'nav-content';
 					menuContent.style.left ='40px';
 					menuContent.style.top = '0';
 					menuContent.classList.add('menuContent-move-left');
 					this.state = 'allClosed';
 			});
 		}
 	};

 		

	//sidebar 开关构造函数
	var Sidebar = function(eId,closeBarId){
		this.state = 'opened';
		this.el = document.getElementById(eId || 'sidebar');
		this.closeBarEl = document.getElementById(closeBarId || 'close');
		var self = this;//闭包
		this.menubar = new Menubar();
		this.el.addEventListener('click',function(event){
			if(event.target !== self.el){//如果点击事件不是sidebar本身就执行下面函数
				self.Swich();
			}
		});//添加事件监听，利用冒泡机制
	};
	Sidebar.prototype.close = function(){
		//console.log('关闭sidebar');
		this.el.style.left= '0';
		this.el.className = 'sidebar-move-left';
		this.closeBarEl.style.left ='10px';
		this.closeBarEl.className ='closebar-move-right';
		this.state = "closed";
		

		this.menuContent2 = document.querySelectorAll('.nav-content');
 		//使用jquery中的查询方式找到元素
 		for (i = 0; i < this.menuContent2.length; i++) {	
 			 this.menuContent2[i].className = 'nav-content';
 			 this.menuContent2[i].style.left = '-80px';
 		}

	};//原型链设置函数
	Sidebar.prototype.open = function(){
		//console.log('打开sidebar');
		this.el.style.left= '-40px';
		this.el.className = 'sidebar-move-right';
		this.closeBarEl.style.left ='160px';
		this.closeBarEl.className = 'closebar-move-left';
		this.state = "opened";
	};
	Sidebar.prototype.Swich = function(){
		if(this.state === 'opened'){
			this.close();
		}else{
			this.open();
		}
	};
	var sidebar = new Sidebar();//创建Sidebar


})();//采用匿名函数立即执行函数