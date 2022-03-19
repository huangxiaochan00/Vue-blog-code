<template>
  <div id="create">
    <h1>编辑文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input
      v-model="description"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 5 }"
    ></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input
      v-model="text"
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 30 }"
    ></el-input>
    <p class="msg">限30个字</p>
    <el-button @click="onCreate">确定</el-button>
    <el-switch
      class="switch"
      v-model="atIndex"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
    <label>展示在主页</label>
  </div>
</template>

<script>
import blog from "@/api/blog";
export default {
  data() {
    return {
      title: "",
      description: "",
      text: "",
      atIndex: false,
    };
  },
  methods: {
    onCreate() {
      blog
        .createBlog({
          title: this.title,
          description: this.description,
          content: this.text,
          atIndex: this.atIndex,
        })
        .then((res) => {
          this.$message.success(res.message);
          this.$router.push({ path: `/detail/${res.data.id}` });
        });
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";

#create {
  padding-bottom: 30px;

  h1 {
    text-align: center;
  }
  .switch {
    margin-left: 20px;
  }
  .msg {
    text-align: right;
    font-size: 12px;
    color: @textLighterColor;
  }
}
</style>
