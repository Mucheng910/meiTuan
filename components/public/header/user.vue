<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [
      <a @click="exit" >退出</a>
      ]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </template>

  </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        user: ''
      }
    },
    async mounted() {
      //生命周期，在组件加载完毕后调用
      const {status, data: {user}} = await this.$axios.get('/users/getUser')
      if (status === 200) {
        this.user = user
      }
    },
    methods: {
      async exit() {
        const {status, data} = await this.$axios.get('/users/exit')
        if (status === 200) {
          if (data && data.code === 0) {
            window.location.href = '/'
          }
        }else {
          console.log('服务器出错')
        }
      }
    }
  }
</script>

<style scoped>

</style>
