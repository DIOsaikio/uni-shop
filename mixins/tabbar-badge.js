import {
	mapGetters
} from "vuex"
export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	methods: {
		setBadge() {
			if(!this.total)return
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	},
	onShow() {
		this.setBadge();
	}
}
