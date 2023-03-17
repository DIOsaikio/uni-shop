<template>
	<view class="settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" :checked="isFullCheck" @click="changeAllState"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amout-box">
			合计:<text class="amout">¥{{checkgoodsAmout}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapMutations } from "vuex"
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed:{
			...mapGetters('m_cart',['checkCount','total','checkgoodsAmout']),
			isFullCheck(){
				return this.total===this.checkCount;
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllgoodsState']),
			changeAllState(){
				this.updateAllgoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		padding-left: 10rpx;

		.radio {
			display: flex;
			align-items: center;
		}

		.amout-box {
			font-weight: bold;
			color: #c00000,
		}

		.btn-settle {
			background-color: #c00000;
			height: 100rpx;
			line-height: 100rpx;
			color: #fff;
			padding: 0 20rpx;
			min-width: 200rpx;
			text-align: center;
		}
	}
</style>
