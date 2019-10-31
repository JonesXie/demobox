<template>
	<div class="help">
		<div class="help_main">
			<div class="help_main_left fl">
				<div class="help_main_titl">帮助中心</div>
				<div class="help_main_name">
					<Collapse v-for="(index,item) in listinfo" :key="item">
						<Panel name="1" >
							{{index[0].dictLabel}}
							<p slot="content" style="text-align:center;height:35px;line-height:35px;cursor:pointer"
							   v-for="(ac,de) in index" :key="de" @click="getmore(ac.id)">{{ac.title}}</p>
						</Panel>

					</Collapse>
				</div>
			</div>
			<div class="help_main_rigt fr">
				<div v-html="contents">{{contents}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'

	export default {
		data() {
			return {
				listinfo: [],
				contents: ' '
			}
		}, methods: {
			list() {
				this.$http.get('/helper/helpCenterColumn').then(res => {
					let resp = JSON.parse(res.request.response)
					this.listinfo = resp.data
				})
			},
			getmore(e) {
				let _data = {
					id: e
				}
				this.$http.post('/helper/helpCenterContentInfo', qs.stringify(_data)).then(res => {
					let resp = JSON.parse(res.request.response)
					this.contents = resp.data.content
				})
			}
		},
		created() {
			this.list()
		}
	}
</script>

<style scoped>
.ivu-collapse-content>.ivu-collapse-content-box{ padding-top:0px !important; padding-bottom: 0px !important;}
	.help {
		width: 100%;
		overflow: hidden;
	}

	.help_main {
		width: 1200px;
		min-height: 500px;
		margin: 40px auto;
	}

	.help_main_left {
		width: 200px;
		height: auto;;
	}

	.help_main_rigt {
		width: 950px;
		height: auto;
	}

	.help_main_name {
		width: 200px;
		height: auto;
        font-size: 16px;
	}

	.help_main_titl {
		width: 200px;
		height: 60px;
		line-height: 60px;
		font-size: 20px;
		color: #fff;
		background: #199ed8;
		text-align: center
	}
</style>

