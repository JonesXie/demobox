<template>
	<div>
		<Upload :format="['jpg','jpeg','png']" :on-success="successimg" :max-size="2048" :before-upload="stopUpdate"
				:action="action" style="display: inline-block;width:40px;">
			<div style="width: 40px;height:40px;line-height: 40px;">
				<Icon type="ios-camera" size="20"></Icon>
			</div>
		</Upload>
	</div>
</template>
<script>
	export default {
		props: [],

		data() {

		},
		methods: {
			stopUpdate() {
			},
			successimg() {
			}
		}
	}
</script>

