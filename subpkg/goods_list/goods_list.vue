<template>
	<view>
		123
	</view>
</template>

<script>
	import { reqfloorList } from "@/api/home.js"
	export default {
		data() {
			return {
				goodsList:[],
			};
		},
		onLoad() {
			/* this.getgoodsList(); */
		},
		methods:{
			getgoodsList(){
				const res=reqfloorList();
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">

</style>
