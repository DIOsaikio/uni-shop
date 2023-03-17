<template>
		<view class="goods-item">
			<view class="item-left">
				<radio :checked="goods.goods_state"  color="#c00000" v-if="showradio" @click="radioChange"></radio>
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
					<uni-number-box :min="1" :value="goods.goods_count" v-if="shownumber" @change="numchange"></uni-number-box>
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
			},
			showradio:{
				type:Boolean,
				default:false
			},
			shownumber:{
				type:Boolean,
				default:false
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
		},
		methods:{
			radioChange(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numchange(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:+val
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
			.goods-item {
				width: 750rpx;
				padding: 20rpx, 10rpx;
				display: flex;
				border-bottom: 2rpx solid bisque;

				.item-left {
					margin-right: 10rpx;
					display: flex;
					justify-content:space-around;
					align-items: center;
					box-sizing: border-box;
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
					flex: 1;
					.message {
						font-size: 26rpx;
					}

					.info-box {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.price {
							font-size: 32rpx;
							color: #c00000;
						}
					}
				}
			}
</style>