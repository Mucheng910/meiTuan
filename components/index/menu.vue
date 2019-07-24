<template>
  <div class="m-menu" @mouseleave="mouseLeave">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in $store.state.home.menu" :key="idx" @mouseenter="mouseEnter">
        <i :class="item.type"></i> {{item.name}} <span class="arrow"></span>
      </dd>
    </dl>
    <div
      class="detail"
      v-if="kind"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave"
    >
      <template v-for="item in curDetail.child">
        <h4>{{item.title}}</h4>
        <span v-for="v in item.child">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menu.vue",
    data() {
      return {
        kind: '',
        // menu: [
        //   {
        //     type: 'food',
        //     name: '美食',
        //     child: [{
        //       title: "美食",
        //       child: ["代金券", "甜点饮品", '火锅', '自助餐', '小吃快餐']
        //     }]
        //   },
        //   {
        //     type: 'takeout',
        //     name: '外卖',
        //     child: [{
        //       title: "外卖",
        //       child: ["美团外卖"]
        //     }]
        //   },
        //   {
        //     type: 'hotel',
        //     name: '酒店',
        //     child: [{
        //       title: "酒店星际",
        //       child: ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
        //     },
        //       {
        //         title: "酒店星际",
        //         child: ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
        //       }
        //     ]
        //   }
        //
        // ]
      }
    },
    computed: {
      curDetail() {
        return this.$store.state.home.menu.filter((item) => {
          return item.type === this.kind
        })[0] || ''
      }
    },
    methods: {
      mouseLeave() {
        this._timer = setTimeout(() => {
          this.kind = ''
        }, 500)
      },
      mouseEnter(e) {
        this.kind = e.target.querySelector('i').className
      },
      detailEnter() {
        this._timer && clearTimeout(this._timer)
      },
      detailLeave() {
        this.kind = ''
      }
    }
  }
</script>

<style lang="scss">

</style>
