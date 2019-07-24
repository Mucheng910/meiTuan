import Router from 'koa-router'
import axios from './utils/axios'
import config from '../dbs/config'
import poi from '../dbs/models/poi'

let router = new Router({prefix: '/search'})
const sign = config.sign

router.get('/top', async (ctx) => {
  let {status, data: {top}} = await axios.get(
    `http://cp-tools.cn/search/top`, {
      params: {
        input: ctx.query.input,
        city: ctx.query.city,
        sign
      }
    })
  ctx.body = {top: status === 200 ? top : []}
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.position.city : ctx.query.city
  let {status, data: {result}} = await axios.get(
    `http://cp-tools.cn/search/hotPlace`, {
      params: {
        city,
        sign
      }
    })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  let {city, keywords} = ctx.query
  let {status, data: {count, pois}} = await axios.get(
    `https://restapi.amap.com/v3/place/text`, {
      params: {
        offset: 10,
        page: 1,
        key: 'b598c12de310236d9d40d3e28ea94d03',
        extensions: 'all',
        city,
        keywords,
      }
    })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})


export default router
