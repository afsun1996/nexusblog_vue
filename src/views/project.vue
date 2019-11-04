<template>
  <div class="project left">
    <div v-if="!isLoading">
<!--    头部-->
      <div style="clear: both;height: 260px;">
        <div style="float: left;width: 590px;">
          <el-carousel  height="260px" indicator-position="none">
            <el-carousel-item v-for="item in list" :key="item.id">
              <img
                      :src="item.articleurl"
                      data-has-lazy-src="false"
                      alt="文章封面"
                      style="width: 590px;height: 260px"
              />
            </el-carousel-item>
          </el-carousel>
        </div>

<!--        <div style="position:relative;margin-top: 10px;margin-bottom: 10px;float: right">-->

        <div class="headersub2">
          <ul>
            <li style="margin-bottom: 10px;overflow: hidden;position: relative;">
              <img src="img/h1.jpg">
              <span class="headtitle" style="" >为什么说10月24日是程序员的节日？</span>
            </li>

            <li style="margin-bottom: 10px;overflow: hidden;position: relative;">
              <img src="img/h2.jpg">
              <span class="headtitle">时光易逝.... 不再有</span>
            </li>
          </ul>
        </div>
<!--        每日一句-->
        <div style="float: right;width: 290px;position:relative;">
          <img src="img/say-bg.jpg" style="height: 260px;"/>
          <div style="position:absolute; z-index:2; left:30px; top:110px;color: white">书山有路勤为尽.</div>
        </div>
      </div>




    <!--    文章推荐-->
    <div>
      <div style="float: left;width: 870px;height: auto;margin-top: 10px;background-color: white">
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

        <div style="height: 265px;background-color: white">
          <h2  class="title-h2">
            关注我
          </h2>
          <div style="padding:10px;margin: 10px;height: 195px;padding-left: 40px;">

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

        <div style="background-color: white;height: 471px;margin-top: 10px;" class="commentmodel">
          <h2  class="title-h2">
            最新评论
          </h2>
          <ul>
            <li style="margin-bottom: 10px;height: 55px;">
              <div style="margin: 10px 0px 10px 10px;">
                <div style="float: left;width:55px; ">
                  <img src="img/tx1jpeg" style="width: 55px;height: 55px;">
                </div>
                <div style="float: right;width: 220px;line-height: 3px;">
                  <p style="font-size: 13px;color: #333;">afsun 评:</p>
                  <p style="font-size: 12px;color: #cc5500;">文章名称</p>
                  <p style="font-size: 12px;color: #333;">评论内容</p>
                </div>
              </div>
            </li>

            <li style="margin-bottom: 10px;height: 55px;">
              <div style="margin: 10px 0px 10px 10px;">
                <div style="float: left;width:55px; ">
                  <img src="img/tx1jpeg" style="width: 55px;height: 55px;">
                </div>
                <div style="float: right;width: 220px;line-height: 3px;">
                  <p style="font-size: 13px;color: #333;">afsun 评:</p>
                  <p style="font-size: 12px;color: #cc5500;">文章名称</p>
                  <p style="font-size: 12px;color: #333;">评论内容</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div style="background-color: white;height: 500px;margin-top: 10px;" class="commentmodel">
          <h2  class="title-h2">
            站点信息
          </h2>
          <div style="margin-bottom: 10px;">
            <p class="webinfo">
              <b class="infoname">建站时间:</b>
              <span class="infocontent">2019-11-14</span>
            </p>

            <p class="webinfo">
              <b class="infoname">网站名称:</b>
              <span class="infocontent">Nexus个人博客</span>
            </p>

            <p class="webinfo">
              <b class="infoname">文章统计</b>
              <span class="infocontent">总共文章 {{count}} 篇</span>
            </p>

            <p class="webinfo">
              <b class="infoname">建站时间:</b>
              <span class="infocontent">2019-11-14</span>
            </p>

            <p class="webinfo">
              <b class="infoname">关注我:</b>
              <span class="infocontent">2019-11-14</span>
            </p>

          </div>
        </div>

      </div>
    </div>
    </div>
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
import da from "element-ui/src/locale/lang/da";

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
  // 文章推荐
  private list: any[] = [];
  // 列表排名
  private viewsort: any[] = [];
  // 评论
  private comments: any[] = [];
  // 数量
  private count:number=0;
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
            this.$urls.getmaininfo,
            this.params
    ).then(function (response) {
      return response.data.result;
    });

    this.isLoading = false;
    this.comments = data.comments;
    this.viewsort = data.clicksort;
    this.list = [...this.list, ...data.articles];
    console.log(data);
    this.total = data.articles.length;
    this.count = data.count;
    this.params.pageNum++;
    if (this.total === data.articles.length) {
      this.isLoadEnd = true;
    }
  }
}
</script>
<style lang="less" scoped>
.project {
  overflow: hidden;
  padding: 10px 0;
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
    padding: 2px 0 5px 10px;
    border-left: 2px solid #409EFF;
    margin: 10px 0 2px 2px;
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
  .headersub2{
    width: 270px;
    float: left;
    margin-left:10px;
    height: 260px;
    img{
      border-radius: 4px;
      height: 125px;
      cursor: pointer;
      transition: all 0.6s;
    }
    ul{
      margin: 0px;
    }
    img:hover{
      transform: scale(1.2);
    }
    .headtitle{
      position: absolute;
      padding: 0 40px;
      top: 30%;
      line-height: 24px;
      left: 10px;
      color: white;
      font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif;;
    }
  }
  div{
    border-radius: 7px;
  }
  .commentmodel{

    .webinfo{
      margin-left: 20px;

      .infoname{
        font-size: 15px;
      }

      .infocontent{
        margin-left: 10px;
      }
    }
  }
}

</style>

