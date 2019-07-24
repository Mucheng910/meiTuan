<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <div class="login">
          <em class="bold">已有美团账户？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small"
            >登录
            </el-button>
          </a>
        </div>
      </header>
    </article>
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxLength="4"></el-input>
        </el-form-item>
        <!--        <el-form-item label="手机号" prop="phoneNum">-->
        <!--          <el-input v-model="ruleForm.phoneNum"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="短信动态码" prop="verifyNum">-->
        <!--          <el-input v-model="ruleForm.verifyNum"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="创建密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册
          </el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>

  </div>
</template>

<script>
  import CryptoJs from 'crypto-js'

  export default {
    layout: "blank",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
      return {
        statusMsg: '',
        error: '',
        ruleForm: {
          name: '',
          email: '',
          code: '',
          phoneNum: '',
          verifyNum: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          name: [
            {required: true, type: 'string', message: '请输入昵称', trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      sendMsg() {
        console.log('send')
        let namePass, emailPass
        if (this.timerid) {
          console.log('hhhh')
          return false
        }
        this.$refs['ruleForm'].validateField('name', (valid) => {
          namePass = valid
        })
        this.statusMsg = ''
        if (namePass) {
          return false
        }
        this.$refs['ruleForm'].validateField('email', (valid) => {
          emailPass = valid
        })
        if (!namePass && !emailPass) {
          this.$axios.post('/users/verify', {
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email
          }).then(({status, data}) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              this.timerid = setInterval(() => {
                if (count === 0) {
                  console.log('hhhhhhhhhhhh')
                  clearInterval(this.timerid)
                  this.timerid=''
                  this.statusMsg=''
                }else {
                  this.statusMsg = `验证码已发送，剩余${count--}秒`
                }
              }, 1000)
            } else {
              this.statusMsg = data.msg
            }
          })
        }
      },
      register() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('/users/signup', {
              username: window.encodeURIComponent(this.ruleForm.name),
              password: CryptoJs.MD5(this.ruleForm.pass).toString(),
              email: this.ruleForm.email,
              code: this.ruleForm.code
            }).then(({status, data}) => {
              if (status === 200) {
                console.log('hhhhhhhh')
                if (data && data.code === 0) {
                  console.log('zzzzzzzz')
                  location.href = '/login'
                } else {
                  this.error = data.msg
                }
              } else {
                this.error = `服务器出错，错误代码${status}`
              }
              setTimeout(() => {
                this.error = ''
              }, 1500)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/register/index";

</style>
