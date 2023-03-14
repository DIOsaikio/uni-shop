<template>
	<view class="goods">
		<view class="goods_list">
			<view v-for="(goods,index) in goodsList" :key="index" @click="goDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqgoodsList
	} from "@/api/goods.js"
	export default {
		data() {
			return {
				queryobj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading: false
			};
		},
		onLoad(option) {
			this.queryobj.query = option.query || '';
			this.queryobj.cid = option.cid || '';
			/* console.log(this.queryobj); */
			this.getgoodsList();
		},
		methods: {
			async getgoodsList(cb) {
				this.isloading = true;
				const {
					data: res
				} = await reqgoodsList(this.queryobj);
				this.isloading = false;
				cb && cb();
				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				this.goodsList = [...this.goodsList, ...res.message.goods];
				this.total = res.message.total;
				/* console.log(this.total); */
				
			},
			goDetail(goods){
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
				})
			}
		},
		onReachBottom() {
			if (this.queryobj.pagenum * this.queryobj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			if (this.isloading) return
			this.queryobj.pagenum++;
			this.getgoodsList();
		},
		onPullDownRefresh() {
			this.isloading = false;
			this.total = 0;
			this.goodsList = [];
			this.queryobj.pagenum = 1;
			this.getgoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goods {
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
	}
</style>
