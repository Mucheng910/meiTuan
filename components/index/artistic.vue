<template>
  <div class="m-istyle">
    <dl @mouseover="artisticOver">
      <dt>有格调</dt>
      <dd
        :class="{active:kind === 'all'}"
        kind="all"
        keyword="景点"
      >全部
      </dd>
      <dd
        :class="{active:kind === 'part'}"
        kind="part"
        keyword="美食"
      >约会聚餐
      </dd>
      <dd
        :class="{active:kind === 'spa'}"
        kind="spa"
        keyword="spa"
      >丽人SPA
      </dd>
      <dd
        :class="{active:kind === 'movie'}"
        kind="movie"
        keyword="电影"
      >电影演出
      </dd>
      <dd
        :class="{active:kind === 'travel'}"
        kind="travel"
        keyword="旅游"
      >品质出行
      </dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cruKind"
        :key="item.title"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never"
        >
          <img
            :src="item.img"
            class="image"
            alt="artImg">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "artistic",
    data() {
      return {
        kind: 'all',
        list: {}
      }
    },
    computed: {
      cruKind() {
        return this.list[this.kind]
      }
    },
    async mounted() {
      let city = this.$store.state.geo.position.city.replace('市', '')
      let {status, data: {count, pois}} = await this.$axios.get('/search/resultsByKeywords', {
        params: {
          city,
          keywords: '景点'
        }
      })
      if (status === 200 && count > 0) {
        let r = pois.filter(item => item.photos.length).map(item => {
          return {
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost || '暂无',
            img: item.photos[0].url,
            url: '//abc.com'
          }
        })
        this.list = {
          all: r.slice(0, 9)
        }
      } else {
        this.list[this.kind] = []
      }
    },
    methods: {
      async artisticOver(e) {
        let city = this.$store.state.geo.position.city.replace('市', '')
        let dom = e.target
        let tagName = dom.tagName
        if (tagName === 'DD') {
          this.kind = dom.getAttribute('kind')
          let keywords = dom.getAttribute('keyword')
          let {status, data: {count, pois}} = await this.$axios.get('/search/resultsByKeywords', {
            params: {
              city,
              keywords
            }
          })
          if (status === 200 && count > 0) {
            let r = pois.filter(item => item.photos.length).map(item => {
              return {
                title: item.name,
                pos: item.type.split(';')[0],
                price: item.biz_ext.cost || '暂无',
                img: item.photos[0].url,
                url: '//abc.com'
              }
            })
            this.$set(this.list,this.kind,r.slice(0,9));
          } else {
            this.list[this.kind] = []
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/index/artistic.scss";
</style>
