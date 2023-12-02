<template>
  <view>
    <my-search :bgcolor="'pink'" @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view scroll-y :style="{height:wh+'px'}" class="left-scroll-view">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChange(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y :style="{height:wh+'px'}" class="right-scroll-view" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <!-- 二级分类的标题 -->
          <view class="cate-lv2-title"> / {{item2.cat_name}} / </view>
          <!-- 当前二级分类下的三级分类列表 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
              <!-- 三级分类的图片 -->
              <image :src="item3.cat_icon"></image>
              <!-- 三级分类的文本 -->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0, // 当前设备可用高度
        cateList: [], // 分类数据的列表
        active: 0, //激活项
        cateLevel2: [], //二级分类的列表
        scrollTop: 0, // 滚动条距离顶部的距离
      };
    },
    onLoad() {
      const sysinfo = uni.getSystemInfoSync()
      this.wh = sysinfo.windowHeight-50 
      this.getCateList()
    },
    methods: {
      // 获取分类列表数据
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        // 判断是否获取失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeChange(i) {
        this.active = i
        // 重新为二级分类赋值
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: '/subpackage/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url:"/subpackage/search/search"
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: white;
          position: relative;

          &::before {
            content: '';
            width: 3px;
            height: 30px;
            background-color: red;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-style: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0px;
  }

  .right-scroll-view {
    background-color: white;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>