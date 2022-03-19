<template>
  <div id="user">
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
      </div>
    </router-link>
  </div>
</template>

<script>
import blog from "@/api/blog";
import beautifyDate from "@/api/date";
import Register from "./Register.vue";
export default {
  components: { Register },
  data() {
    return {
      blogs: [],
      userId: 0,
      page: 1,
      total: 0,
      user: {},
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    this.page = this.$route.query.page || 1;
    blog.getBlogsByUserId(this.userId, { page: this.page }).then((res) => {
      console.log(res);
      this.page = res.page;
      this.total = res.total;
      this.blogs = res.data;
      if (res.data.length > 0) {
        this.user = res.data[0].user;
      }
      beautifyDate(this.blogs[0].createdAt);
    });
  },
  methods: {
    splitDate(dateStr) {
      let date = dateStr.split("T")[0].split("-");
      return { year: date[0], month: date[1], day: date[2] };
    },
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";
#user {
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
