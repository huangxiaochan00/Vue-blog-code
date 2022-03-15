<template>
  <div id="detail">
    <section class="user-info">
      <img
        src="http://cn.gravatar.com/avatar/1?s=128&d=identicon"
        alt=""
        class="avatar"
      />
      <div>
        <h3>前端异步大揭秘</h3>
        <p><router-link to="/user">若愚</router-link> 发布于3天前</p>
      </div>
    </section>
    <section class="article">
      <h1 id="css-网格布局学习指南">CSS 网格布局学习指南</h1>
      <p>
        CSS 网格布局(Grid Layout) 是CSS中最强大的布局系统。
        这是一个二维系统，这意味着它可以同时处理列和行，不像
        <a
          href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
          target="_blank"
          >flexbox</a
        >
        那样主要是一维系统。
        你可以通过将CSS规则应用于父元素（成为网格容器）和该元素的子元素（网格元素），来使用网格布局。
      </p>
      <blockquote>
        <p>
          <a
            href="https://css-tricks.com/snippets/css/complete-guide-grid/"
            target="_blank"
            >本文</a
          >出自于
          <a
            href="http://chris.house/blog/a-complete-guide-css-grid-layout/"
            target="_blank"
            >Chris House</a
          >
          的个人博客，由<a href="https://jirengu.com" target="_blank">饥人谷</a>
          <a href="https://www.zhihu.com/people/jirengu-ruo-yu" target="_blank"
            >若愚老师</a
          >翻译
        </p>
      </blockquote>
      <h2 id="引言">引言</h2>
      <p>
        CSS网格布局（又名“网格”）是一个二维的基于网格的布局系统，其目的只在于完全改变我们设计基于网格的用户界面的方式。
        CSS一直用来布局网页，但一直都不完美。 一开始我们使用table
        做布局，然后转向浮动、定位以及inline-block，但所有这些方法本质上都是
        Hack 的方式，并且遗漏了很多重要的功能（例如垂直居中）。
        Flexbox的出现在一定程度上解决了这个问题，但是它的目的是为了更简单的一维布局，而不是复杂的二维布局（Flexbox和Grid实际上一起工作得很好）。
        只要我们一直在制作网站，我们就一直在为解决布局问题不断探索，
        而Grid是第一个专门为解决布局问题而生的CSS模块。
      </p>
      <p>
        有两个东西，启发我写这篇指南。 第一个是雷切尔·安德鲁（Rachel
        Andrew）的书<a
          href="http://abookapart.com/products/get-ready-for-css-grid-layout"
          target="_blank"
          >为CSS Grid布局准备</a
        >。
        这本书对网格布局做了彻底、清晰的介绍，也是是整篇文章的基础，我强烈建议你购买并阅读他的书。
        我的另一个重要灵感是Chris Coyier的<a
          href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
          target="_blank"
          >Flexbox完全指南</a
        >，当需要查阅 flexbox 的一切资料时我就会找这篇文章。
        这篇文章帮助了很多人学习 Flex 布局，也是 Google
        上搜索“flexbox”关键字排名第一的文章。你会发现他的文章和我的很多相似之处，有最好的范例在那放着为什么咱不偷师学着写呢？
      </p>
      <p>
        本指南的目的是介绍网格概念，因为它们存在于最新版本的规范中。
        因此我不会覆盖过时的IE语法，而且随着规范的成熟，我会尽最大努力保存更新本指南。
      </p>
      <h2 id="基础知识以及浏览器支持情况">基础知识以及浏览器支持情况</h2>
      <p>
        一开始你需要使用<code>display：grid</code>把容器元素定义为一个网格，使用<code>grid-template-columns</code>和<code>grid-template-rows</code>设置列和行大小，然后使用<code
          >grid-column</code
        >
        和 <code>grid-row</code>把它的子元素放入网格。
        与flexbox类似，网格子元素的原始顺序不重要。 你的可以在 CSS
        里以任意顺序放置它们，这使得使用媒体查询重新排列网格变得非常容易。
        想象一下，我们需要定义整个页面的布局，然后为了适应不同的屏幕宽度完全重新排列，我们只需要几行CSS就能实现这个需求。
        网格是有史以来最强大的CSS模块之一。
      </p>
      <p>
        截至2017年3月，许多浏览器都提供了原生的、不加前缀的对CSS
        Grid的支持，比如
        Chrome（包括Android），Firefox，Safari（包括iOS）和Opera。
        另一方面，Internet Explorer 10和11支持它，但需要使用过时的语法。
        Edge浏览器已经宣布将支持标准的Grid语法，但暂未支持。
      </p>
      <p>
        除了微软之外，浏览器制造商在 Grid 规范完全落地以前似乎并没有放手让 Gird
        野生也长的打算。
        这是一件好事，这意味着我们不需要再去学习各种浏览器兼容版本的旧语法。
      </p>
      <p>在生产环境中使用Grid只是时间问题，但现在是我们该学习的时候了。</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style scoped lang='less'>
@import "../assets/base.less";
@import "../assets/article.less";

#detail {
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

      margin: 5px 0;
    }

    p {
      grid-column: 2;
      grid-row: 2;

      margin-top: 0;
      font-size: 12px;
      color: @textLighterColor;

      a {
        color: @themeColor;
        text-decoration: none;
      }
    }
  }

  .article {
    padding: 30px 0;
  }
}
</style>
