<template>
	<view class="cart">
		<view class="cart-container" v-if="cart.length!==0">
			<my-address></my-address>
			<!-- 标题区 -->
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-text">购物车</text>
			</view>
			<!-- 循环渲染购物车物品信息 -->
			<uni-swipe-action>
				<block v-for="(goods,index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="deletegoods(goods)">
						<my-goods :goods="goods" :showradio="true" @radio-change="radioHandler" :shownumber="true"
							@num-change="numChange"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<my-settle></my-settle>
		</view>
		<view class="empty-cart" v-else>
			<image src="../../static/cart_empty@2x.png" class="emptuy-pic"></image>
			<text class="empty-text">空空如也~</text>
		</view>
	</view>

</template>

<script>
	import badgeMix from "@/mixins/tabbar-badge.js"
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex"
	export default {
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}]
			};
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total']),
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoods']),
			radioHandler(e) {
				this.updateGoodsState(e)
			},
			numChange(e) {
				this.updateGoodsCount(e);
				this.setBadge();
			},
			deletegoods(goods) {
				this.deleteGoods(goods);
			}
		}

	}
</script>

<style lang="scss">
	.cart {
		padding-bottom: 100rpx;

		.cart-container {
			.cart-title {
				height: 80rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #efefef;

				.cart-text {
					margin-left: 10rpx;
					font-size: 28rpx;
				}
			}
		}

		.empty-cart {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 300rpx;

			.emptuy-pic {
				width: 180rpx;
				height: 180rpx;
			}

			.empty-text {
				font-size: 24rpx;
				color: gray;
				padding-top: 20rpx;
			}
		}
	}
</style>
