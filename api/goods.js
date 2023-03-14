import request from "@/utls/request.js"

export const reqgoodsList = (queryobj) => request({
	url: `/api/public/v1/goods/search?query=${queryobj.query}&cid=${queryobj.cid} `,
	method: 'get'
})

export const reqgoodsDetail=(query)=>request({
	url:`/api/public/v1/goods/detail?goods_id=${query}`
})