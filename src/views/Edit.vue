<template>
  <EditBlog @finishBlog="updateBlog" />
</template>

<script>
import blog from "@/api/blog";
import EditBlog from "@/components/EditBlog";
export default {
  data() {
    return {
      blogId: 0,
    };
  },
  components: {
    EditBlog,
  },
  methods: {
    updateBlog({ title, description, content, atIndex }) {
      this.blogId = this.$route.params.blogId;
      blog
        .updateBlog(
          { blogId: this.blogId },
          {
            title: title,
            description: description,
            content: content,
            atIndex: atIndex,
          }
        )
        .then((res) => {
          this.$message.success(res.message);
          this.$router.push({ path: `/personal` });
        });
    },
  },
};
</script>

