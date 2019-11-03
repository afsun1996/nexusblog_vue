<template>
    <div style="background-color: white;height: 192px;margin-top: 14px;padding: 10px;position: relative;" @click="articleDetail(article.id)" class="shadow">

        <p class="common-label hot" v-if="false">
            热
            <span data-v-235bc085="" class="triangle-hot"></span>
        </p>
        <p class="common-label new" v-if="true">
            新
            <span data-v-235bc085="" class="triangle-new"></span>
        </p>

        <div style="float: left;padding: 10px;margin-top: 16px;position: relative;">
            <img :src="article.articleurl" style="width: 205px;height: 137px;margin-left: 10px" />
        </div>
        <div style="float: right;width: 550px;">
            <h3>{{article.articletitle}}</h3>
            <div>
                <p class="info">
                    <img src="img/userLogo.jpeg" style="width: 33px;height: 33px;border-radius:50%"/>
                    <span style="padding: 5px;">
                        {{article.author}}
                    </span>
                    <span>
                    发布时间：{{ formatTime(article.publishdate) }}
                    </span>
                    <span style="padding-left: 10px;">
                        分类：{{article.articletype}}
                    </span>
                </p>
                <p>
                    {{ showdesc(article.articletabloid)}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "articleItem",
    props:{article:Object},
    data(){
        return{
            // article:{}
        }
    },
    methods:{
        articleDetail(id){
            this.$router.push(`/articleDetail?article_id=${id}`);
        }
    }
    //     private articleDetail(id: string): void {
    //     this.$router.push(`/articleDetail?article_id=${id}`);
    // }
}
</script>

<style scoped>
    .info{
        color: #919898;
        font-size: 14px;
    }
    .shadow{
        transition-duration: 0.5s;
    }
    .shadow:hover{
        -webkit-box-shadow: #ccc 0px 0px 10px;
        /*-moz-box-shadow: #ccc 0px 10px 10px;*/
        /*box-shadow: #ccc 0px 10px 10px;*/
    }
    .common-label {
        position: absolute;
        overflow: visible;
        width: 30px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        top: 0px;
        left: 0px;
        z-index: 145;
        margin: 0px;
        padding: 0px;
    }

    .hot{
        background-color: #F56C6C;
    }
    .new{
        background-color: #409EFF;
    }

    .triangle-hot{
        position: absolute;
        top: 24px;
        left: -10px;
        width: 0;
        height: 0;
        z-index: 33;
        border-left: 10px solid transparent;
        border-right: 10px solid #df0d3a;
        border-bottom: 7px solid transparent;
    }

    .triangle-new{
        position: absolute;
        top: 24px;
        left: -10px;
        width: 0;
        height: 0;
        z-index: 33;
        border-left: 10px solid transparent;
        border-right: 10px solid #409EFF;
        border-bottom: 7px solid transparent;
    }
</style>