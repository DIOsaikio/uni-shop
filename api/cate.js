import request from "@/utls/request.js"

export const  reqcateList=()=>request({
	url:"/api/public/v1/categories",
	method:"get"
})