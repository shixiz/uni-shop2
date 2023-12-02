<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" placeholder="请输入搜索内容" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods_name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag inverted  type="primary" :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
import { computed } from "vue";
  export default {
    data() {
      return {
        timer: null, //延时器的timerId
        kw: '', //搜索关键词
        searchResults: [], //搜索的结果
        historyList: [] //搜索历史
      };
    },
    onload(){
      this.historyList=JSON.parse(uni.getStorageSync("kw")||'[]')
    },
    methods: {
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpackage/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      saveSearchHistory(){
       // this.historyList.push(this.kw)
       const set= new Set(this.historyList)
       set.delete(this.kw)
       set.add(this.kw)
       this.historyList=Array.from(set)
       // 搜索历史数据进行持久化的存储
       uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean(){  
         this.historyList=[]
         uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
         uni.navigateTo({
            url: '/subpackage/goods_list/goods_list?query=' + kw
          })
      }
    },
    computed: {
      histories(){
       return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: white;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      border-bottom: 1px solid lightgray;
      padding: 13px 0;

      .goods_name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .history-box {
    padding: 0 5px;
  
    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid lightgray;
    }
  
    .history-list {
      display: flex;
      flex-wrap: wrap;
       margin-top: 5px;
      .uni-tag{
        margin-right: 5px;
      }
    }
  }
</style>