<template>
  <div id="index">
    <section class="blog-posts">
      <router-link
        :to="`/detail/${blog.id}`"
        class="item"
        v-for="(blog, index) in blogs"
        :key="index"
      >
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username" />
          <figcaption>{{ blog.user.username }}</figcaption>
        </figure>
        <h3>
          {{ blog.title }} <span>{{ blog.createdAt }}</span>
        </h3>
        <p>
          {{ blog.description }}
        </p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="this.total"
        @current-change="onChange"
      >
      </el-pagination>
    </section>
  </div>
</template>
<script>
import blog from "@/api/blog";
export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1,
    };
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getIndexBlogs({ page: this.page }).then((res) => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
    });
  },
  methods: {
    onChange(newPage) {
      blog.getIndexBlogs({ page: newPage }).then((res) => {
        this.blogs = res.data;
        this.total = res.total;
        this.page = res.page;
        this.$router.push({ path: "/", query: { page: newPage } });
      });
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";
#index {
  .pagination {
    display: grid;
    justify-items: center;
  }
  a {
    color: #000;
  }
  .item {
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 20px 0;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: center;
      margin-left: 0;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      figcaption {
        font-size: 12px;
        color: @textLighterColor;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;

      & > span {
        color: @textLighterColor;
        font-size: 12px;
        font-weight: normal;
      }
    }
    p {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }
  }
}
</style>
