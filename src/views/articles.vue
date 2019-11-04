<template>
  <div class="left clearfix">
    <h3 v-if="params.tagid" class="left-title">{{ tag_name }} 相关的文章：</h3>

    <div v-if="!isLoading" style="float: left;width: 870px;height: auto;">
<!--      文章过滤、检索-->
      <div style="height: 60px;background-color: white;margin-bottom: 10px;">
        <span style="margin: 10px;">文章名</span>
        <el-input
                style="width: 200px;"
                maxlength="10"
                show-word-limit
                placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <span style="margin: 10px;">类型</span>
        <el-select  clearable placeholder="请选择" style="margin: 10px;width: 200px;">
          <el-option>
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
          </el-option>
        </el-select>

      </div>
      <ul style="list-style: none;padding: 10px;margin: 0px;background-color: white;">
        <li v-for="item in articlesList" :key="item.id" style="cursor: pointer">
          <ArticleItem :article="item"></ArticleItem>
        </li>
      </ul>
      <div style="margin: 20px;text-align: center;">
        <el-pagination
                background
                layout="prev, pager, next"
                :total="50">
        </el-pagination>
      </div>
    </div>
    <LoadingCustom v-if="isLoading"></LoadingCustom>
    <LoadEnd v-if="isLoadEnd"></LoadEnd>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import {
  throttle,
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  getQueryStringByName,
  timestampToTime
} from "@/utils/utils";
import LoadEnd from "@/components/loadEnd.vue";
import LoadingCustom from "@/components/loading.vue";
import { ArticlesParams, ArticlesData } from "@/types/index";
import eathlogo from "@/components/eathlogo.vue";
import ArticleItem from "@/components/articleItem.vue";
// 获取可视区域的高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
// 用新的 throttle 包装 scroll 的回调
const lazyload = throttle(() => {
  // 获取所有的图片标签
  const imgs = document.querySelectorAll("#list .item img");
  // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
  let num = 0;
  for (let i = num; i < imgs.length; i++) {
    // 用可视区域高度减去元素顶部距离可视区域顶部的高度
    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
    let imgItem: any = imgs[i];
    // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
    if (distance >= 100) {
      // 给元素写入真实的 src，展示图片
      let hasLaySrc = imgItem.getAttribute("data-has-lazy-src");
      if (hasLaySrc === "false") {
        imgItem.src = imgItem.getAttribute("data-src");
        imgItem.setAttribute("data-has-lazy-src", "true");
      }
      // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
      num = i + 1;
    }
  }
}, 1000);

@Component({
  components: {
    LoadEnd,
    LoadingCustom,
    eathlogo,
    ArticleItem
  }
})
export default class Articles extends Vue {
  // initial data
  private isLoadEnd: boolean = false;
  private isLoading: boolean = false;
  private articlesList: Array<object> = [];
  private total: number = 0;
  // private tag_name: string = decodeURI(getQueryStringByName("tag_name"));
  private tag_name: string = '';
  private params: ArticlesParams = {
    keyword: "",
    likes: "", // 是否是热门文章
    state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
    tag_id: getQueryStringByName("tag_id"),
    category_id: getQueryStringByName("category_id"),
    pageNum: 1,
    pageSize: 10,
    orderParam: 1,
    orderType: 1
  };
  // private href: string =
  //   process.env.NODE_ENV === "development"
  //     ? "http://localhost:3001/articleDetail?article_id="
  //     : "https://biaochenxuying.cn/articleDetail?article_id=";

  // lifecycle hook
  mounted(): void {
    this.handleSearch();
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 150) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        if (this.isLoadEnd === false && this.isLoading === false) {
          this.handleSearch();
        }
      }
    };
    document.addEventListener("scroll", lazyload);
  }

  @Watch("$route")
  routeChange(val: Route, oldVal: Route): void {
    this.tag_name = decodeURI(getQueryStringByName("tag_name"));
    this.params.tag_id = getQueryStringByName("tag_id");
    this.params.category_id = getQueryStringByName("category_id");
    this.articlesList = [];
    this.params.pageNum = 1;
    this.handleSearch();
  }

  // method 请求跳转到文章明细页
  private articleDetail(id: string): void {
    this.$router.push(`/articleDetail?article_id=${id}`);
  }

  private async handleSearch(): Promise<void> {
    this.isLoading = true;
    let data:any = await this.axios.post(this.$urls.getArticleList,this.params).then( // 请求成功
        function (response) {
          data = response.data;
          return data;
        }
    ).catch(function (error) {// 请求异常

    });
    this.articlesList = [...this.articlesList, ...data.result.lists];
    this.total = data.result.totalCounts;
    this.isLoading = false;
    this.params.pageNum++;
    this.$nextTick(() => {
      lazyload();
    });

    if (data.result.lists.length === 0 || this.total === this.articlesList.length) {
      this.isLoadEnd = true;
      document.removeEventListener("scroll", () => {});
      window.onscroll = null;
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  .articles-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .title {
      color: #333;
      margin: 7px 0 4px;
      display: inherit;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
    .item > div {
      padding-right: 140px;
    }
    .item .wrap-img {
      position: absolute;
      top: 50%;
      margin-top: -50px;
      right: 0;
      width: 125px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
      }
    }
    li {
      line-height: 20px;
      position: relative;
      // width: 100%;
      padding: 15px 0px;
      padding-right: 150px;
      border-bottom: 1px solid #f0f0f0;
      word-wrap: break-word;
      cursor: pointer;
      &:hover {
        .title {
          color: #000;
        }
      }
      .abstract {
        min-height: 30px;
        margin: 0 0 8px;
        font-size: 13px;
        line-height: 24px;
        color: #555;
      }
      .meta {
        padding-right: 0 !important;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        a {
          margin-right: 10px;
          color: #b4b4b4;
          &::hover {
            transition: 0.1s ease-in;
            -webkit-transition: 0.1s ease-in;
            -moz-transition: 0.1s ease-in;
            -o-transition: 0.1s ease-in;
            -ms-transition: 0.1s ease-in;
          }
        }
        span {
          margin-right: 10px;
          color: #666;
        }
      }
    }
  }
}
</style>
