<template>
    <div>
        <div class="screen">
            <div class="bg" />
            <div class="logo">低代码大屏</div>
            <div class="desc">一站式数据大屏制作平台</div>
            <transition name="slide-fade">
                <div v-if="show" class="login-box">
                    <div class="radio-group">
                        <div
                            class="radio-btn"
                            :class="{ active: tab === 'login' }"
                            @click="tab = 'login'"
                        >
                            登录
                        </div>
                        <div
                            class="radio-btn"
                            :class="{ active: tab === 'reg' }"
                            @click="tab = 'reg'"
                        >
                            注册
                        </div>
                    </div>
                    <el-input v-model="form.user" placeholder="请输入用户名" />
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        :type="tab === 'login' ? 'password' : 'text'"
                        style="margin-top: 10px"
                    />
                </div>
            </transition>
            <div class="btn-wrapper">
                <span class="btn" @click="handleClick">进入系统</span>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import md5 from "js-md5";

export default {
  data() {
    return {
      show: false,
      tab: "login",
      form: {
        user: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    handleClick() {
      if (!this.show) {
        if (localStorage.getItem("uid")) {
          this.$router.push("home");
        } else {
          this.show = true;
        }
      } else {
        // 开始检查
        const md5pass = md5(this.form.password); // 对密码进行MD5加密
        this.$http
          .post(`/user/${this.tab}`, {
            user: this.form.user,
            pass: md5pass,
          })
          .then((res) => {
            const { errno, errmsg, data } = res.data;
            if (errno === 0) {
              this.$message({
                type: "success",
                message: "验证成功",
              });
              const userInfo = {
                token: md5pass,
                userName: data.name
              }
              localStorage.setItem('userInfo',JSON.stringify(userInfo))
              this.$store.commit('SET_USERINFO', userInfo)
              localStorage.setItem("uid", data.uid);
              localStorage.setItem("user", data.name);
              this.$router.push("home");
            } else {
              this.$message.error(errmsg);
            }
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-position: 50%;

  .bg {
    width: 100vw;
    height: 100vh;
    background: url("../assets/img/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    z-index: -1;
    filter: brightness(0.5);
  }
  
}
.logo {
  height: 72px;
  line-height: 72px;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: #FFF;
  margin-top: 180px;

  &::after {
    content: ".";
    font-size: 42px;
    color: rgba(255, 0, 0, 0.6);
  }
}
.desc {
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans SC", sans-serif;
  letter-spacing: 4px;
  color: #808080;
  margin: 0 0 40px;
}

.login-box {
  background: #ffffff;
  width: 240px;
  margin: 20px auto 40px;
  padding: 0 40px 36px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
  .radio-group {
    text-align: center;
    .radio-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 10px 10px;
      color: #999999;
      &.active {
        color: #00145F;
        border-bottom: 2px solid #212121;
      }
    }
  }
}

.btn-wrapper {
  margin-top: 40px;
  text-align: center;
  a {
    text-decoration: none;
    color: #ffffff;
  }
  .btn {
    padding: 12px 32px;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    transition: background 0.3s ease;
    font-size: 14px;
    border-radius: 50px;
    &:hover {
      background: #409eff;
      cursor: pointer;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
