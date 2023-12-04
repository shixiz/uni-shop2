<template>
  <view class="all">
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量
        total: 0,
       isLoading:false
      
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading=true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading=false
        cb&&cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
        console.log(this.goodsList);
      },
      gotoDetail(goods){
        uni.navigateTo({
          url:'/subpackage/goods_detail/goods_detail?gooos_id'+goods.goods_id
        })
      }
    },
    onReachBottom(){
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕')
      // 让页码自增+1  
      if(this.isLoading==true) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh(){
      // 重置关键数据
      this.queryObj.pagenum=1
      this.goodsList=[]
      this.total=0
      this.isLoading=false
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
 
</style>