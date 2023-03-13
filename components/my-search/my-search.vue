<template>
	<view class="search-container" :style="{'background-color':bgcolor}" @click.native=goSearch>
		<view class="search-box" :style="{'border-radius':borderRadius+'rpx'}">
			<!-- 使用uniapp提供的组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			/* 背景颜色 */
			bgcolor:{
				type:String,
				default:"#c00000"
			},
			borderRadius:{
				type:Number,
				default:36//rpx
				
			}
		},
		name: "my-search",
		data() {
			return {

			};
		},
		methods:{
			goSearch(){
				console.log(111);
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container {
		height: 100rpx;
		/* background-color: #c00000; */
		display: flex;
		align-items: center;
		padding: 0 20rpx;

		.search-box {
			width: 100%;
			height: 72rpx;
			background-color: #ffffff;
			/* border-radius: 36rpx; */
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-size: 30rpx;
			}
		}
	}
</style>
