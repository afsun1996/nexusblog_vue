<template>
  <div class="project left">
    <div v-if="!isLoading">

      <div style="clear: both;height: 330px;">
        <div style="float: left;width: 720px;">
          <el-carousel  height="300px" indicator-position="outside">
            <el-carousel-item v-for="item in list" :key="item.id">
              <img
                      :src="item.articleurl"
                      data-has-lazy-src="false"
                      alt="文章封面"
                      style="width: 630px;height: 280px"
              />
            </el-carousel-item>
          </el-carousel>
        </div>

<!--        <div style="position:relative;margin-top: 10px;margin-bottom: 10px;float: right">-->
        <div style="float: right;width: 400px;position:relative;">
          <img src="img/say-bg.jpg" />
          <div style="position:absolute; z-index:2; left:30px; top:110px;color: white">书山有路勤为尽.</div>
        </div>
      </div>

    </div>


    <!--    文章推荐-->
    <div>
      <div style="float: left;width: 860px;height: auto;">
        <h2  class="title-h2">
          文章推荐
        </h2>
        <ul>
          <li v-for="item in list" :key="item.id" style="cursor: pointer">
            <ArticleItem :article="item"></ArticleItem>
          </li>
        </ul>
      </div>

<!--      首页侧边栏 -->
      <div style="float: right;width: 290px;">
<!--        关注我-->
        <h2  class="title-h2">
          关注我
        </h2>
        <div style="height: 215px;background-color: white">
          <div style="padding:20px;margin: 20px;height: 195px;">

            <p class = "title">联系我:
              <a href="#" class="icon iconqq" style="padding-left:30px;">
                <img src="img/qqicon.png" style="width: 50px;height: 50px;">
              </a>
            </p>
            <p class = "title">联系我:
              <a href="#" class="icon iconwx" style="padding-left:30px;">
                <img src="img/wxicon.png" style="width: 50px;height: 50px;">
              </a>
            </p>
            <P class = "title">打赏我:
              <img src="img/wxpaid.png" class="wxpaid"/>
            </P>
          </div>
        </div>

        <div style="height: 250px;background-color: white;" class="clicksort">
          <h2  class="title-h2">
            点击排行
          </h2>
          <ul>
            <li style="border-bottom: 1px solid #cecece;" v-for="(item,index) in list" :key="item.id" >
              <span  class="ulindex" :class>
                {{index+1}}
              </span>
              <span class="ultitle" >{{item.articletitle}}</span>
            </li>
          </ul>
        </div>

        <div style="background-color: white;height: 471px;margin-top: 20px;" class="commentmodel">
          <h2  class="title-h2">
            最新评论
          </h2>
        </div>

      </div>
    </div>

<!--    <el-row :gutter="20">-->
<!--      <el-col class="el-col-pointer"-->
<!--              :span="isMobileOrPc ? 24 : 12"-->
<!--              v-for="(l, index) in list"-->
<!--              :key="l.id"-->
<!--              style="margin-bottom: 20px">-->
<!--        <a :href="l.url"-->
<!--           target="_blank"-->
<!--           rel="noopener noreferrer">-->
<!--          <el-card shadow="hover">-->
<!--            <img :src="l.articleUrl"-->
<!--                 class="image">-->
<!--            <div style="padding: 14px;">-->
<!--              <h4>{{l.articleTitle}}</h4>-->
<!--              <div class="content">{{l.content}}</div>-->
<!--              <span>-->
<!--                {{formatTime(l.publishDate)}}&#45;&#45;-->
<!--              </span>-->
<!--              <span>-->
<!--                {{formatTime(l.updateDate)}}-->
<!--              </span>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </a>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <LoadingCustom v-if="isLoading"></LoadingCustom>
<!--    <LoadEnd v-if="isLoadEnd"></LoadEnd>-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoadEnd from "@/components/loadEnd.vue";
import LoadingCustom from "@/components/loading.vue";
import ArticleItem from "@/components/articleItem.vue";

import {
  throttle,
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  getQueryStringByName,
  timestampToTime,
  isMobileOrPc
} from "@/utils/utils";
import { Params, ProjectList, ProjectsData } from "@/types/index";

@Component({
  components: {
    LoadEnd,
    LoadingCustom,
    ArticleItem
  }
})
export default class Timeline extends Vue {
  private reverse: boolean = true;
  private isLoadEnd: boolean = false;
  private isLoading: boolean = false;
  private isMobileOrPc: boolean = isMobileOrPc();
  private list: any[] = [];
  private total: number = 0;
  private params: Params = {
    keyword: "",
    pageNum: 1,
    pageSize: 10
  };

  // lifecycle hook
  mounted(): void {
    this.handleSearch();
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        if (this.isLoadEnd === false && this.isLoading === false) {
          this.handleSearch();
        }
      }
    };
  }

  private async handleSearch(): Promise<void> {
    this.isLoading = true;

    const data: any = await this.axios.post(
            this.$urls.getArticleList,
            this.params
    ).then(function (response) {
      return response.data.result;
    });

    this.isLoading = false;

    this.list = [...this.list, ...data.lists];
    console.log(this.list)
    this.total = data.totalCounts;
    this.params.pageNum++;
    if (this.total === this.list.length) {
      this.isLoadEnd = true;
    }
  }
}
</script>
<style lang="less" scoped>
.project {
  overflow: hidden;
  padding: 40px 0;
  .el-col-pointer {
    cursor: pointer;
  }
  .content {
    height: 70px;
    text-overflow: ellipsis;
  }
  .image {
    width: 100%;
    height: 250px;
  }
  ol, ul {
    list-style: none;
  }
  ul{
    padding: 0px;
  }
  .title-h2{
    font-size: 1pc;
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #409EFF;
    margin: 20px 0 20px 2px;
    height: 25px;
    line-height: 25px;
  }
  .title{
    margin: 0;
    padding: 0;
    line-height: 30px;
    color: #545454;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .wxpaid{
    width: 50px;
    height: 50px;
    /*left: 15px;*/
    /*vertical-align: top;*/
    /*margin: 0px;*/
    /*padding: 0px;*/
    padding-left: 30px;
    position: relative;
  }
  a {
    cursor: pointer;
    text-decoration: none;
  }

  .clicksort{
    .ulindex{
      background-color: #F56C6C;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 4px;
      margin: 8px 5px 0;
      color: #fff;
      display: inline-block;
      margin-bottom: 5px;
    }
    .ultitle{
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
      color: #606266;
    }
    .ultitle:hover{
      color: #333;
    }
  }



}

</style>

