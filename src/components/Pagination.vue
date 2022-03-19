<template>
  <section class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="this.total"
      @current-change="onChange"
    >
    </el-pagination>
  </section>
</template>
<script>
import blog from "@/api/blog";
export default {
  data() {
    return {
      blogs: [],
      page: 1,
    };
  },
  props: ["total"],

  methods: {
    onChange(newPage) {
      blog.getIndexBlogs({ page: newPage }).then((res) => {
        this.blogs = res.data;
        this.total = res.total;
        this.page = res.page;
        this.$emit("updatePage", {
          blogs: this.blogs,
          total: this.total,
          page: this.page,
        });
        this.$router.push({ path: "/", query: { page: newPage } });
      });
    },
  },
};
</script>

<style scoped>
.pagination {
  display: grid;
  justify-items: center;
}
</style>