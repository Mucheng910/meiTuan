<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl
            v-if="isHotPlace"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd v-for="(item, idx) in $store.state.search.hotPlace.slice(0,5)" :key="idx">{{item.name}}</dd>
          </dl>
          <dl
            v-if="isSearchList"
            class="searchList">
            <dd v-for="(item, idx) in searchList " :key="idx">{{item.name}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            v-for="(item, index) in $store.state.search.hotPlace.slice(0, 5)"
            :key="index"
            href="#"
          >{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout">美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie">猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel">美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment">民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business">商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right"
      >
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    data() {
      return {
        isFocus: false,
        hotPlace: [],
        searchList: [],
        search: ''
      }
    },
    computed: {
      isHotPlace() {
        return this.isFocus && !this.search;
      },
      isSearchList() {
        return this.isFocus && this.search
      }
    },
    methods: {
      focus() {
        this.isFocus = true
      },
      blur() {
        setTimeout(() => {
            this.isFocus = false
          }, 200
        )
      },
      input: _.debounce(async function () {
        let city = this.$store.state.geo.position.city.replace('市', '')
        this.searchList = []
        let {status, data: {top}} = await this.$axios.get('/search/top', {
          params: {
            input: this.search,
            city
          }
        })
        this.searchList = status === 200 ? top.slice(0, 10) : []
      }, 300)
    }
  }
</script>

<style scoped>

</style>
