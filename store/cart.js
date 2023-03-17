export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),

	}),
	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
			console.log(findResult);
			if (!findResult) {
				state.cart.push(goods);

			} else {
				findResult.goods_count++;
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart));
		},
		updateGoodsState(state,cartgoods){
			/* console.log(cartgoods); */
			const findResult=state.cart.find(x=>x.goods_id===cartgoods.goods_id);
			/* console.log(findResult); */
			if(findResult){
				findResult.goods_state=cartgoods.goods_state;
			}
			this.commit('m_cart/saveToStorage');
			/* console.log(state.cart.goods_state); */
		},
		updateGoodsCount(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_count=goods.goods_count;
			}
			this.commit('m_cart/saveToStorage');
		},
		deleteGoods(state,goods){
			state.cart=state.cart.filter(x=>x.goods_id!==goods.goods_id);
			this.commit('m_cart/saveToStorage');
		},
		updateAllgoodsState(state,newState){
			state.cart.forEach(item=>{
				item.goods_state=newState;
			})
			this.commit('m_cart/saveToStorage');
		}
		
		
	},
	getters: {
		total(state) {
			/* let c = 0;
			state.cart.forEach(goods => c += goods.goods_count)
			return c */
			return state.cart.reduce((total,item)=>total+=item.goods_count,0);
		},
		checkCount(state){
			return  state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count,0);
		},
		checkgoodsAmout(state){
			 return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
				
		}
	},
	actions: {}

}
