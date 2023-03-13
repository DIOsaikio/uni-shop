import request from "@/utls/request.js"

export const reqsearchList=(query)=>request({
	url:`/api/public/v1/goods/qsearch?query=${query}`,
	method:'get'
})
