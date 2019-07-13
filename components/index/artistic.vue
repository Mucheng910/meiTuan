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
        keyword="丽人"
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
        list: {
          all: [
            {
              img: 'https://p0.meituan.net/mogu/b5940b1b9103e87a43f64fca533b5ea0101306.jpg@736w_416h_1e_1c',
              title: '必胜客（阳光天地店）',
              pos: '[半价] 豪华丰盛5-6人餐一份',
              price: '369'
            },
            {
              img: '//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg',
              title: '1',
              pos: '[半价] 豪华丰盛5-6人餐一份',
              price: '369'
            },
            {
              img: '//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg',
              title: '2',
              pos: '[半价] 豪华丰盛5-6人餐一份',
              price: '369'
            },
            {
              img: '//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg',
              title: '3',
              pos: '[半价] 豪华丰盛5-6人餐一份',
              price: '369'
            }
          ],
          spa: [{}]
        }
      }
    },
    computed: {
      cruKind() {
        return this.list[this.kind]
      }
    },
    methods: {
      artisticOver(e) {
        let dom = e.target
        let tagName = dom.tagName
        if (tagName === 'DD') {
          this.kind = dom.getAttribute('kind')
          let keyWord = dom.getAttribute('keyword')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/index/artistic.scss";
</style>
