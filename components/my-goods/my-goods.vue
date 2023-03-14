<template>
		<view class="goods-item">
			<view class="item-left">
				<image :src="goods.goods_small_logo|| defaultPic" class="pic"></image>
			</view>
			<view class="item-right">
				<view class="message">
					{{goods.goods_name}}
				</view>
				<view class="info-box">
					<view class="price">
						¥{{goods.goods_price | tofixed}}
					</view>
				</view>
		
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			tofixed(val){
				return Number(val).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
.goods_list {
			.goods-item {
				padding: 20rpx, 10rpx;
				display: flex;
				border-bottom: 2rpx solid bisque;

				.item-left {
					margin-right: 10rpx;

					.pic {
						width: 200rpx;
						height: 200rpx;
						display: block;
					}
				}

				.item-right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.message {
						font-size: 26rpx;
					}

					.info-box {
						.price {
							font-size: 32rpx;
							color: #c00000;
						}
					}
				}
			}
		}
</style>