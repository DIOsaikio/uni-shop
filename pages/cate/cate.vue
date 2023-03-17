<template>
	<view class="cate">
		<!-- 搜索组件 -->
		<my-search @click="goSearch"></my-search>
		<!-- 滑动区 -->
		<view class="scroll-container">
			<!-- 左侧滚动栏 -->
			<scroll-view scroll-y="true" :style="{height:windowheight+'px'}" class="scroll-left">
				<block v-for="(item,index) in cateListlevel1" :key="item.cat_id">
					<view class="scrollItem-left " :class="activeindex===index?'active':''" @click="clickNav(index)">
						{{item.cat_name}}
					</view>
				</block>

			</scroll-view>
			<!-- 右侧滚动栏 -->
			<scroll-view scroll-y="true" :style="{height:windowheight+'px'}" class="scroll-right" :scroll-top='scrollTop'>
				<view class="cate--lv2"  v-for="(item2,index) in cateListlevel2" :key="item2.cat_id">
					<view class="title">
						/ {{item2.cat_name}} /
					</view>
					<view class="catelv3-box">
						<view class="catelv3-item" v-for="(item3,index) in item2.children" :key="item3.cat_id" @click="gotoGoodslist(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		reqcateList
	} from "@/api/cate.js"
	import {
		log
	} from 'util';
	import badgeMix from "@/mixins/tabbar-badge.js"
	export default {
		mixins:[badgeMix],
		data() {
			return {
				windowheight: 0,
				cateListlevel1: [],
				cateListlevel2: [],
				activeindex: 0,
				scrollTop:0
			};
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			this.windowheight = info.windowHeight-50;
			/* console.log(this.windowheight); */
			this.getcateList();
		},
		methods: {
			async getcateList() {
				const {
					data: res
				} = await reqcateList();
				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				this.cateListlevel1 = res.message;
				this.cateListlevel2=res.message[0].children;
				/* console.log(this.cateListlevel2); */
			},
			clickNav(index) {
				this.activeindex = index;
				this.cateListlevel2=this.cateListlevel1[index].children
				console.log(this.cateListlevel2);
				this.scrollTop=this.scrollTop===0? 1:0;
			},
			//跳转到商品列表
			gotoGoodslist(item){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${item.cat_id}`,
				})
			},
			goSearch(){
				console.log(222);
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate {
		.scroll-container {
			display: flex;

			.scroll-left {
				width: 240rpx;

				/deep/::-webkit-scrollbar {
					display: none;
					width: 0;
					height: 0;
					loadingstate: 0,
				}

				.scrollItem-left {
					background-color: #f7f7f7;
					line-height: 120rpx;
					text-align: center;
					font-size: 24rpx;

					&.active {
						background-color: #ffffff;
						position: relative;

						&::before {
							content: "";
							display: block;
							width: 6rpx;
							height: 60rpx;
							background-color: #c00000;
							position: absolute;
							top: 50%;
							left: 0;
							transform: translateY(-50%);
						}
					}

				}
			}
			.title{
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 30rpx 0;
			}
			.catelv3-box{
				display: flex;
				flex-wrap: wrap;
				.catelv3-item{
					width: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 20rpx;
					image{
						width: 120rpx;
						height: 120rpx;
					}
					text{
						font-size: 24rpx;
					}
				}
			}
		}

	}
</style>
