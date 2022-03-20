<template>
  <div id="editBlog">
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
      v-model="content"
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 30 }"
    ></el-input>
    <p class="msg">限30个字</p>
    <el-button @click="onSure">确定</el-button>
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
      content: "",
      atIndex: false,
      blogId: 0,
    };
  },
  created() {
    this.blogId = this.$route.params.blogId | 0;
    console.log(this.blogId);
    if (this.blogId !== 0) {
      blog.getDetail({ blogId: this.blogId }).then((res) => {
        console.log(res);
        this.title = res.data.title;
        this.content = res.data.content;
        this.description = res.data.description;
        this.atIndex = res.data.atIndex;
      });
    }
  },
  methods: {
    onSure() {
      this.$emit("finishBlog", {
        title: this.title,
        description: this.description,
        content: this.content,
        atIndex: this.atIndex,
      });
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";

#editBlog {
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
