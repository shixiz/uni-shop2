import {
  mapGetters
} from "vuex"
export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch:{
    total(){
      this.setBade()
    }
  },
  onShow() {
    this.setBade()
  },
  methods:{
    setBade(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  }
}