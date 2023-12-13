<template>
  <view>
    <view class="goods-item">
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler" />
        <image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
      </view>
      <view class="goods-item-right">
        <view class="goods-name"> {{goods.goods_name}} </view>
        <view class="goods_info_box">
          <view class="goods_price"> ￥{{goods.goods_price |toFixed}} </view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        // 默认的图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_count:val+0,
          goods_id:this.goods.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-left: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1; 

      .goods-name {
        font-size: 13px;
      }

      .goods_info_box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods_price {
          font-size: 16px;
          color: #C00000;
        }
      }
    }
  }
</style>