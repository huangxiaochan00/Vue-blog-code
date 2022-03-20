<template>
  <div class="inputComponent">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名" />
    <h4>密码</h4>
    <input
      v-model="password"
      type="password"
      placeholder="密码"
      @keyup.enter="onEnter"
    />
    <el-button size="medium" @click="onEnter"><slot /></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    onEnter() {
      this.$emit("enter", [this.username, this.password]);
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";
.inputComponent {
  display: grid;
  justify-content: center;
  padding-top: 30px;
  button {
    margin-top: 30px;
    justify-self: start;
  }
  h4 {
    margin: 10px 0 5px;
  }

  p {
    margin: 5px 0;
  }

  input {
    width: 400px;
    height: 30px;
  }

  .error {
    font-size: 12px;
    color: #f00;
  }
}
</style>
