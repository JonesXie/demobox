<template>
	<div class="rModel">
		<div class="modelHead">
			<p>店铺模板</p>
		</div>
		<div class="modelContent">
			<div class="Content1 Content">
				<div class="content1L ContentL">
					<p>轮播图1</p>
					<img :src="`${fileShow.photo01}`" alt="图片加载失败" title="轮播图1">
				</div>
				<div class="content1R ContentR">
					<div class="btn">
						<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="btn1" :on-success="uploadSuccess01"
								:show-upload-list="false">
							<Button class="btn10">修改</Button>
						</Upload>
						<div class="btn2" @click="submit">保存</div>
					</div>
					<p>建议图片尺寸：1920*500像素</p>
				</div>
			</div>
			<div class="Content2 Content">
				<div class="content2L ContentL">
					<p>轮播图2</p>
					<img :src="fileShow.photo02" alt="图片加载失败" title="轮播图2">
				</div>
				<div class="content2R ContentR">
					<div class="btn">
						<Upload :action="uploadAction" :format="['jpg','jpeg','png']" class="btn1" :on-success="uploadSuccess02"
								:show-upload-list="false">
							<Button class="btn10">修改</Button>
						</Upload>
						<div class="btn2" @click="submit">保存</div>
					</div>
					<p>建议图片尺寸：1920*500像素</p>
				</div>
			</div>
			<div class="Content3 Content">
				<div class="content3L ContentL">
					<p>轮播图3</p>
					<img :src="fileShow.photo03" alt="图片加载失败" title="轮播图3">
				</div>
				<div class="content3R ContentR">
					<div class="btn">
						<Upload class="btn1" :format="['jpg','jpeg','png']" :action="uploadAction" :on-success="uploadSuccess03"
								:show-upload-list="false">
							<Button class="btn10">修改</Button>
						</Upload>
						<div class="btn2" @click="submit">保存</div>
					</div>
					<p>建议图片尺寸：1920*500像素</p>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import qs from 'qs'

	export default {
		name: "RModel",
		data() {
			return {
				uploadAction: this.host + '/upload/uploadFile',
				fileShow: {
					photo01: require('@/assets/img/Carousel.jpg'),
					photo02: require('@/assets/img/Carousel.jpg'),
					photo03: require('@/assets/img/Carousel.jpg'),
				},
				fileUrl: {
					shopStoreId: '',
					fileUrl1: '',
					fileUrl2: '',
					fileUrl3: '',
				}
			}
		},
		methods: {
			uploadSuccess01: function (res) {
					this.fileUrl.fileUrl1 =  res.data
					this.fileShow.photo01 =  res.data		
			},
			uploadSuccess02: function (res) {
					this.fileUrl.fileUrl2 =  res.data
					this.fileShow.photo02 =  res.data
			},
			uploadSuccess03: function (res) {
					this.fileUrl.fileUrl3 = res.data
					this.fileShow.photo03 = res.data
			},
			strSub: function (data) {
				let index = data.indexOf('/');
				let realdata = data.substring(index);
				return realdata
			},
			submit: function () {
				this.$http.post('/store/templet/do', qs.stringify(this.fileUrl)).then(
					response => {
						let res = JSON.parse(response.request.response);
						if (res.code == '200') {
							this.$Message.success({
								content: res.data,
								duration: 5
							});
						}
					}
				)
			}
		},
		mounted() {
			this.$http.post('/store/templet/info').then(
				response => {
					let res = JSON.parse(response.request.response);
					if (res.code == '200') {
						let url1 = this.strSub(res.data.fileUrl1);
						let url2 = this.strSub(res.data.fileUrl2);
						let url3 = this.strSub(res.data.fileUrl3);
						this.fileUrl = {
							shopStoreId: res.data.shopStoreId,
							fileUrl1: url1,
							fileUrl2: url2,
							fileUrl3: url3,
                        };       
                     //   console.log(this.fileUrl.fileUrl1.indexOf('/picture'))                  
						if (res.data.fileUrl1 != '') {
                          if(this.fileUrl.fileUrl1.indexOf('picture')=='-1'){
                                    this.fileShow.photo01 = res.data.fileUrl1
                          }else{
                                    this.fileShow.photo01= this.host2 + res.data.fileUrl1                      
                          }    
						}
						if (res.data.fileUrl2 != '') {         
                            if(this.fileUrl.fileUrl2.indexOf('picture')=='-1'){
                                 this.fileShow.photo02 =res.data.fileUrl2                            
                            }else{                       
                                this.fileShow.photo02= this.host2 +  res.data.fileUrl2
                            }                
						}
						if (res.data.fileUrl3 != '') {  
                            if(this.fileUrl.fileUrl3.indexOf('picture')=='-1'){
                                 this.fileShow.photo03 =  res.data.fileUrl3                            
                            }else{                       
                                this.fileShow.photo03= this.host2 +res.data.fileUrl3
                            }

						}
					}
				}
			)
		}
	}
</script>

<style scoped>

	.modelHead {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border: 1px solid #ccc;
	}

	.modelHead p {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-left: 30px;
	}

	.modelContent {
		position: relative;
		top: 0;
		left: 0;
		margin-bottom: 30px;
		padding: 30px 0 60px 0;
	}

	.Content {
		margin: 30px 0 0 52px;
		overflow: hidden;
		height: 220px;
	}

	.ContentL {
		width: 550px;
		float: left;
		top: 0;
		left: 0;
	}

	.ContentL p {
		font-size: 16px;
		display: inline-block;
		margin-bottom: 10px;
	}

	.ContentL img {
		display: block;
		width: 550px;
		height: 181px;
	}

	.ContentR {
		float: right;
		top: 0;
		right: 0;
		width: calc(100% - 550px);
		height: 206px;
		text-align: center;
	}

	.btn {
		margin-top: 86px;
		text-align: center;
	}

	.btn2 {
		display: inline-block;
		width: 82px;
		height: 36px;
		line-height: 36px;
		color: #fff;
		text-align: center;
		background-color: #3d9ba9;
		font-size: 16px;
		cursor: pointer;
		border-radius: 4px;
	}

	.btn1 {
		display: inline-block;
		margin-right: 40px;
	}

	.btn10 {
		color: #fff;
		background-color: #2d8cf0;
		border-color: #2d8cf0;
		width: 82px;
		height: 36px;
		font-size: 16px;
	}

	.ContentR p {
		display: inline-block;
		font-size: 16px;
		margin-top: 10px;
	}
</style>
