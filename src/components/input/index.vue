<template>
  <div>
    <div class="inputComm">
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-input :placeholder="inputData.placeholder" v-model="moInput">
            <el-button slot="append" @click="inputTech(inputData.url)">{{inputData.name}}</el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inputs',
  components: {},
  data() {
    return {
      moInput: ''
    }
  },
  props: {
    inputData: {
      type: Object,
      default: () => null
    },
    cbData: {
      type: String,
      default: () => ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    async inputTech(url) {
      if (!this.moInput) {
        this.$message.error(this.inputData.placeholder)
        return ''
      }
      if (!url) {
        this.emitData()
        return ''
      }
      // 判断开头字母是否是小写j 如果是跳转到账户页面
      if (this.moInput.substring(0, 1) === 'j') {
        this.$router.push('account' + '/' + this.moInput)
        return ''
      }
      // 判断长度为32的代表是特征码，或者是存证指纹（这里的存证指纹跳到详情其它地方存证指纹跳交易），跳转到彩票朔源
      if (this.moInput.length === 32 || this.inputData.welfare) {
        this.$router.push('welfareDetail' + '/' + this.moInput)
        return ''
      }
      // 判断是否是交易哈希
      let res = await this.$http.post('/blockTrans/details', {
        txHash: this.moInput
      })
      if (res.content) {
        this.$router.push('dealDetail' + '/' + this.moInput)
        return ''
      }
      // 不符合以上条件则跳入区块详情
      this.$router.push(url + '/' + this.moInput)
    },
    emitData() {
      this.$emit('cbData', this.moInput)
    }
  },
  computed: {}
}
</script>

