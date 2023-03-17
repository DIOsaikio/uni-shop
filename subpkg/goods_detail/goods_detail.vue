<template>
	<view class="goods_detail" v-if="goods_info.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区 -->
		<view class="goods-infobox">
			<view class="goods-pice">
				¥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="name">
					{{goods_info.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray" ></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品导航组件 -->
		<view class="goods_nav">
		  <!-- fill 控制右侧按钮的样式 -->
		  <!-- options 左侧按钮的配置项 -->
		  <!-- buttonGroup 右侧按钮的配置项 -->
		  <!-- click 左侧按钮的点击事件处理函数 -->
		  <!-- buttonClick 右侧按钮的点击事件处理函数 -->
		  <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations,mapGetters } from "vuex"
	import {
		reqgoodsDetail
	} from "@/api/goods.js"
	export default {
		data() {
			return {
				goods_info: {},
				goods_id: '',
				options: [{
				      icon: 'shop',
				      text: '店铺'
				    }, {
				      icon: 'cart',
				      text: '购物车',
				      info: 0
				    }],
				 buttonGroup: [{
				        text: '加入购物车',
				        backgroundColor: '#ff0000',
				        color: '#fff'
				      },
				      {
				        text: '立即购买',
				        backgroundColor: '#ffa200',
				        color: '#fff'
				      }
				    ]
			};
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total']),
		},
		watch:{
			total:{
				immediate:true,
				handler(newval){
					console.log(newval);
					const findResult=this.options.find(x=>x.text==='购物车')
					if(findResult){
						findResult.info=newval;
					}
				},
				
			}
		},
		onLoad(options) {
			console.log(options);
			this.goods_id = options.goods_id;
			this.getgoodsDetail();
		},
		methods: {
			 ...mapMutations('m_cart',['addToCart']),
			 
			async getgoodsDetail() {
				const {
					data: res
				} = await reqgoodsDetail(this.goods_id);
				if (res.meta.status !== 200) {
					return uni.$showMsg();
				}
				 res.message.goods_introduce= res.message.goods_introduce.replace(/<img /g,'<img style="display:block"')
				 
				this.goods_info = res.message;
				console.log(this.goods_info);
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				/* console.log(e); */
				if(e.content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				if(e.content.text==='加入购物车'){
					const goods={
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:false,
					};
					this.addToCart(goods);
				}
			},
			
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		padding-bottom: 100rpx;
		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
		.goods-infobox{
			padding: 20rpx;
			padding-right: 0;
			.goods-pice{
				color: #c00000;
				font-size: 36rpx;
				 margin: 10px 0;
			}
			.goods-info-body{
				display: flex;
				justify-content: space-between;
				.name{
					font-size: 26rpx;
					margin-right: 20rpx;
					align-items: center;
					justify-content: center;
					
				}
				.favi{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 240rpx;
					font-size: 24rpx;
					border-left: 1px solid #efefef;
				}
			}
		}
		.yf{
			font-size: 24rpx;
			color: gray;
			margin: 20rpx 0;
		}
		.goods_nav{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
