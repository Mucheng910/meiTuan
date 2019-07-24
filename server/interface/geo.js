import Router from "koa-router";
import axios from './utils/axios'
import config from "../dbs/config";
import Province from '../dbs/models/province'
import City from '../dbs/models/city'

let router = new Router({prefix: '/geo'})
const sign = config.sign
router.get('/getPosition', async (ctx) => {
  let {status, data: {province, city}} = await axios.get(
    `http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})
router.get('/menu', async (ctx) => {
  let {status, data: {menu}} = await axios.get(
    `http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {menu}
  } else {
    ctx.body = {menu: []}
  }
})
router.get('/province', async (ctx) => {
  // let province = await Province.find()
  // ctx.body={
  //   province:province.map((item)=>{
  //     return{
  //       id:item.id,
  //       name: item.value
  //     }
  //   })
  // }
  let {status, data: {province}} = await axios.get(
    `http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {province: status === 200 ? province : []}
})
router.get('/province/:id', async (ctx) => {
  let city = await City.findOne({id: ctx.parame.id})
  ctx.body = {
    code: 0,
    city: city.value.map((item) => {
      return {
        province: item.province,
        id: item.id,
        name: item.name
      }
    })
  }
})

export default router
