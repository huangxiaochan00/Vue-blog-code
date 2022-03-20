<template>
  <EditBlog @finishBlog="onCreate" />
</template>

<script>
import blog from "@/api/blog";
import EditBlog from "@/components/EditBlog";
export default {
  data() {
    return {};
  },
  components: {
    EditBlog,
  },
  methods: {
    onCreate({ title, description, content, atIndex }) {
      blog
        .createBlog({
          title: title,
          description: description,
          content: content,
          atIndex: atIndex,
        })
        .then((res) => {
          this.$message.success(res.message);
          this.$router.push({ path: `/detail/${res.data.id}` });
        });
    },
  },
};
</script>
