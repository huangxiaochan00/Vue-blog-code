<template>
  <div id="personal">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar" />
      <h3>{{ user.username }}</h3>
    </section>
    <router-link
      :to="`/detail/${blog.id}`"
      v-for="(blog, index) in blogs"
      :key="index"
    >
      <div class="item">
        <div class="date">
          <span class="day">{{ splitDate(blog.createdAt).day }}</span>
          <span class="month">{{ splitDate(blog.createdAt).month }}</span>
          <span class="year">{{ splitDate(blog.createdAt).year }}</span>
        </div>
        <h3>{{ blog.title }}</h3>
        <p>
          {{ blog.description }}
        </p>
        <div class="actions">
          <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          <a href="#">删除</a>
        </div>
      </div>
    </router-link>
    <Pagination @updatePage="updatePage" :total="this.total" />
  </div>
</template>
<script>
import blog from "@/api/blog";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      blogs: [],
      page: 1,
      total: 0,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.page = this.$route.query.page || 1;
    blog.getBlogsByUserId(this.user.id, { page: this.page }).then((res) => {
      console.log(res);
      this.page = res.page;
      this.total = res.total;
      this.blogs = res.data;
    });
  },
  methods: {
    splitDate(dateStr) {
      let date = dateStr.split("T")[0].split("-");
      return { year: date[0], month: date[1], day: date[2] };
    },
    updatePage({ blogs, total, page }) {
      console.log(blogs);
      this.blogs = blogs;
      this.total = total;
      this.page = page;
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";
#my,
#personal {
  a {
    color: black;
  }
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
      margin-top: 10px;
    }
  }

  .item {
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 20px 0;

    .date {
      grid-column: 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: @textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
    }

    p {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }

    .actions {
      grid-column: 2;
      grid-row: 3;
      font-size: 12px;

      a {
        color: @themeLighterColor;
      }
    }
  }
}
</style>
