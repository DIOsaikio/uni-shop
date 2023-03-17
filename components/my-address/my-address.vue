<template>
	<view class="address" >
		<view class="address-chose-box" v-if="JSON.stringify(address)=='{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货信息 -->
		<view class="address-info-box" v-else  @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addstr}} </view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from "vuex"
	export default {
		name: "my-address",
		data() {
			return {
			};
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress() {
				const [err, success] = await uni.chooseAddress({

				}).catch(err => err);
				if (err === null && success.errMsg === 'chooseAddress:ok') {
					this.updateAddress(success)
				}
			}
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr']),
		},
	}
</script>

<style lang="scss">
	.address {
		.address-chose-box {
			height: 180rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.address-info-box {
			font-size: 24rpx;
			height: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 10rpx;

			.row1 {
				display: flex;
				justify-content: space-between;

				.row1-left {}

				.row1-right {
					display: flex;
					justify-content: space-between;
				}
			}

			.row2 {
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				.row2-left {
					white-space: nowrap;
				}

				.row2-right {}
			}

		}

		.address-border {
			display: block;
			width: 100%;
			height: 10rpx;
		}

	}
</style>
