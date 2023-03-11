import axios from "@/sdk/uniapp-axios/dist/uni-axios.js"

const request = axios.create({
	baseURL:'https://api-hmugo-web.itheima.net',
	timeout: 5000
})
	request.interceptors.request.use((config) => {
	uni.showLoading({
		title: '数据加载中'
	})
	return config
})

request.interceptors.response.use((res) => {
	uni.hideLoading()
	return res
}, error => {
	Promise.reject(new Error())
})

export default request
