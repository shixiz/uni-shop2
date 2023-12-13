 <template>
   <view>
     <view class="cart-container" v-if="cart.length!==0">
       <!-- 收货地址组件 -->
       <my-address></my-address>
       <view class="cart-title">
         <uni-icons type="shop" size="18"></uni-icons>
         <text class="text-title-text">购物车</text>
       </view>
       <!-- 循环渲染购物车的数据 -->
       <uni-swipe-action>
         <blcok v-for="(goods,i) in cart" :key="i">
           <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
             <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :show-num="true"
               @num-change="numberChangeHandler"></my-goods>
           </uni-swipe-action-item>
         </blcok>
       </uni-swipe-action>
       <!-- 使用自定义结算组件 -->
       <my-settle></my-settle>
     </view>
     <!-- 空白购物车区域 -->
     <view class="empty-cart" v-else>
       <image src="/static/cart_empty@2x.png" class="empty-img"></image>
       <text class="tips-text">空空如也</text>
     </view>
   </view>
 </template>

 <script>
   import baddgeMix from '@/mixins/tabbar-baddge.js'
   import {
     mapState,
     mapMutations
   } from 'vuex'
   export default {
     computed: {
       ...mapState('m_cart', ['cart'])
     },
     mixins: [baddgeMix],
     data() {
       return {
         options: [{
           text: '删除', // 显示的文本内容
           style: {
             backgroundColor: '#C00000' // 按钮的背景颜色
           }
         }]
       };
     },
     methods: {
       ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
       radioChangeHandler(e) {
         this.updateGoodsState(e)
       },
       numberChangeHandler(e) {
         this.updateGoodsCount(e)
       },
       swipeItemClickHandler(goods) {
         this.removeGoodsById(goods.goods_id)
       },

     }
   }
 </script>

 <style lang="scss">
   .cart-container {
     background-color: white;
     padding-bottom: 50px;
   }

   .cart-title {
     height: 40px;
     display: flex;
     align-items: center;
     padding-left: 5px;
     border-bottom: 1px solid #efefef;

     .text-title-text {
       font-size: 14px;
       margin-left: 10px;
     }
   }
   .empty-cart{
     display: flex;
     flex-direction: column;
     align-items: center;
     padding-top: 150px;
     .empty-img{
       width: 90px;
       height: 90px;
     }
     .tips-text{
       font-size: 12px;
       color: gray;
       margin-top: 15px;
     }
   }
 </style>