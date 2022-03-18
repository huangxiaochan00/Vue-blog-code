<template>
  <div id="register">
    <Input @enter="onRegister">立即注册</Input>
    <p class="notice">
      已有账号？<router-link to="/login">立即登录</router-link>
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
    ...mapActions(["register"]),

    onRegister(a) {
      console.log(a[0], a[1]);
      this.register({ username: a[0], password: a[1] }).then(() => {
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";
#register {
  display: grid;
  justify-content: center;
  padding-top: 30px;
  button {
    margin-top: 30px;
    justify-self: start;
  }

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

