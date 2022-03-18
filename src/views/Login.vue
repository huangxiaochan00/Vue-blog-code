<template>
  <div id="login">
    <Input @enter="onLogin">立即登录</Input>
    <!-- <el-button size="medium" @click="onLogin">立即登录</el-button> -->
    <p class="notice">
      没有账号？<router-link to="/register">注册新用户</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "@/components/Input";
export default {
  components: {
    Input,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["login"]),

    onLogin(a) {
      console.log(a[0], a[1]);
      this.login({ username: a[0], password: a[1] }).then(() => {
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";

#login {
  .notice {
    font-size: 12px;
    color: @textLighterColor;
    text-align: center;
    margin-top: 30px;

    a {
      color: @themeColor;
    }
  }
}
</style>
