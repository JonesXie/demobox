<template>
	<div class="salerWrap">
		<div class="salerInfo">
			<div class="salerInfo_box">
				<div class="salerInfo_box_left fl">
					<left-list></left-list>
				</div>
				<div class="salerInfo_box_right fr">
					<div class="rightWrap">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftList from './components/LeftList'

	export default {
		name: "salerInfo",
		components: {
			LeftList
		},
		beforeCreate(){
            if(sessionStorage.username=='null'||sessionStorage.username==null)
            {
               this.$Message.success({
					content: "请先登录", duration: 2
				});
				this.$router.push("/index");
            }
           else {
				this.$http.get('/saler/salerGoods/validate/0').then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '400') {
							this.$Message.error({
								content: '您尚未成为商家',
								duration: 3,
							});
							this.$router.push('/index')
						}
					}
				)
			}
		},
		computed: {
			'isLogin': function () {      
             if(sessionStorage.username=='undefined'||sessionStorage.username==undefined){      
                  return  false 
                }else{
                   return  true
                }	
			}
		},
		watch: {
			$route(to, from) {
				this.$http.get('/saler/salerGoods/validate/0').then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '400') {
							this.$Message.error({
								content: '您尚未成为商家',
								duration: 3,
							});
							this.$router.push('/index')
						} else if (res.code == '200') {
							let path = this.$route.path;
							if (path == '/salerInfo/RManage' || path == '/salerInfo/RQuality' || path == '/salerInfo/RModel' || path == '/salerInfo/RWallet') {
								return true
							} else {
								this.$http.get('/saler/salerGoods/validate/1').then(
									response => {
										let res = JSON.parse(response.request.response);
										if (res.code == '400') {
											this.$Message.error({
												content: '您的店铺尚未创建成功',
												duration: 3,
											});
											this.$router.push('/salerInfo/RManage')
										}
									}
								)
							}
						}
					}
				)
			}
		},
	}

</script>

<style scoped>
	.salerWrap {
		width: 100%;
		background: #f1f1f1;
		height: auto;
		overflow: hidden;
	}

	.salerInfo {
		width: 100%;
		background: #f1f1f1;
		margin-top: 10px;
		height: auto;
		overflow: hidden;
	}

	.salerInfo_box {
		width: 1200px;
		margin: 0 auto
	}

	.salerInfo_box_left {
		width: 240px;
		height: auto;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0px 0px 3px #999 inset;
		padding-bottom: 2px;
		margin-bottom: 20px;
	}

	.salerInfo_box_right {
		width: 940px;
		overflow: hidden;
		box-shadow: 0px 0px 3px #999 inset;
		background-color: #fff;
		margin-bottom: 20px;
	}
</style>
