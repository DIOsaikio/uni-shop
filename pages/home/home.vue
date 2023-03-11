<template>
	<view>
		<!-- 轮播图区 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
					<image :src="item.image_src" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav-List">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="gonavDetail(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-List">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-imagebox">
					<navigator class="imagebox-left" :url="item.product_list[0].navigator_url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="imagebox-right">
						<view class="imageitem-right" v-for="(picitem,index) in item.product_list" :key="index"
							v-if="!index==0">
							<image :src="picitem.image_src" :style="{width:picitem.image_width+'rpx'}" mode="widthFix">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqswiperList,
		reqnavList,
		reqfloorList
	} from "@/api/home.js"
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getswiperList();
			this.getnavList();
			this.getfloorList();
		},
		methods: {
			async getswiperList() {
				const {
					data: res
				} = await reqswiperList();
				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				this.swiperList = res.message;
			},

			async getnavList() {
				const {
					data: res
				} = await reqnavList();

				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				this.navList = res.message;
			},
			async getfloorList() {
				const {
					data: res
				} = await reqfloorList();
				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				res.message.forEach((item)=>{
					item.product_list.forEach(prop=>{
						prop.navigator_url=prop.navigator_url.replace(/\pages/gi,'subpkg/goods_list');
					})
				})
				this.floorList = res.message;
				console.log(this.floorList);
			},
			gonavDetail(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper {
		height: 330rpx;

		.swiper-item {
			image {
				width: 100%;
			}
		}
	}

	.nav-List {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		.nav-item {
			.nav-img {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor-List {
		.floor-title {
			width: 100%;
			height: 60rpx;
		}

		.floor-imagebox {
			display: flex;

			.imagebox-left {
				padding-left: 10rpx;
			}

			.imagebox-right {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}

	}
</style>
