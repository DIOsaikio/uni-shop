<template>
	<view class="search">
		<view class=".search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
		</view>
		<view class="sugg-list" v-if="searchList.length!==0">
			<view class="sugg-item" v-for="(item,index) in searchList" :key="index" @click="goDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanTag"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" type="error " v-for="(item,index) in histories" :key="index" @click="goGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqsearchList
	} from "@/api/search.js"
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				searchList: [],
				historyList: [],
			};
		},
		onLoad() {
			this.historyList =JSON.parse(uni.getStorageSync('keywords') || []) ;
		},
		computed: {
			histories: {
				get() {
					return [...this.historyList].reverse()
				}
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.keyword = e;
					console.log(this.keyword);
					if (this.keyword === "") {
						this.searchList = [];
						return
					}
					this.getsearchList();
				}, 500)

			},
			async getsearchList() {
				const {
					data: res
				} = await reqsearchList(this.keyword);
				console.log(res);
				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				this.searchList = res.message;
				this.saveHistory();
			},
			goDetail(item) {
				console.log(item.goods_id);
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?id=${item.goods_id}`,
				})
			},
			goGoodsList(item){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?query=${item}`
				})
			},
			saveHistory() {
				let a = this.historyList.indexOf(this.keyword);
				if (a !== -1) {
					this.historyList.splice(a, 1);
				}
				this.historyList.push(this.keyword);
				uni.setStorageSync('keywords', JSON.stringify(this.historyList));
			},
			/* 清空历史记录 */
			cleanTag(){
				this.historyList=[];
				uni.setStorage('keywords',[]);
			}
		},
	}
</script>

<style lang="scss">
	.search {
		.search-box {
			position: sticky;
			top: 0;
			z-index: 999;
		}

		.sugg-list {
			padding: 0 10rpx;

			.sugg-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #efefef;

				.goods-name {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden; //溢出内容隐藏
					text-overflow: ellipsis; //文本溢出部分用省略号表示
					display: -webkit-box; //特别显示模式
					-webkit-line-clamp: 1; //行数
					line-clamp: 1;
					-webkit-box-orient: vertical; //盒子中内容竖直排列
				}
			}
		}

		.history-box {
			.history-title {
				display: flex;
				justify-content: space-between;
				padding: 0 10rpx;
				height: 80rpx;
				align-items: center;
				font-size: 26rpx;
				border-bottom: 1rpx solid #efefef;
			}

			.history-list {
				display: flex;
				flex-wrap: wrap;

				uni-text {
					display: block;
					margin-top: 10rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
