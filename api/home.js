import request from "@/utls/request.js"

export const reqswiperList = () => request({
	url: "/api/public/v1/home/swiperdata",
	method: 'get'
})

export const reqnavList=()=>request({
	url:"/api/public/v1/home/catitems",
	method:"get"
})

export const reqfloorList=()=>request({
	url:"/api/public/v1/home/floordata",
	method:'get'
})

export const reqgoodsList=()=>request({
	url:"/api/public/v1/home/floordata",
	method:"get"
})