<template>
  <div>
    <div class="accput">
      <el-row type="flex" justify="left" :gutter="20" style="margin-right:0">
        <el-col :span="4" :offset="4">
          <el-autocomplete
            v-model="state"
            v-bind="$attrs"
            ref="searchTips"
            :fetch-suggestions="querySearchAsync"
            valueKey="wagerIssue"
            placeholder="请输入期号"
            :clearable="true"
            :maxlength="maxlength"
            @select="handleSelect"
            @clear="clear"
            @blur="handleBlur"
            class="tips"
          ></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-select v-model="gameSelect" placeholder="请选择游戏" clearable class="tips">
            <el-option
              v-for="item in gameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-button type="primary" @click="inputTech()" class="tipsButton">查询</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchTips',
  components: {},
  data() {
    return {
      state: '',
      newTipme: '',
      gameSelect: '',
      gameList: [
        {
          value: '基诺',
          label: '基诺'
        }
      ]
    }
  },
  props: {
    url: {
      type: String,
      default: () => ''
    },
    maxlength: {
      type: Number,
      default: () => 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    querySearchAsync(queryString, cb) {
      // 输入两个字符才开始模糊搜索
      if (this.state.length <= 2) {
        this.$refs.searchTips.loading = false
        return
      }
      this.getData(queryString, cb)
    },
    // 获取数据
    async getData(val, cb) {
      let res = await this.$http.post(this.url, { wagerIssue: val })
      if (res.content && res.content.length > 0) {
        cb(res.content)
      } else {
        this.$refs.searchTips.suggestions = []
        this.$message.warning('搜索结果为空！')
        cb()
        // this.$refs.searchTips.loading = false;
      }
    },
    // 清除信息
    clear() {
      this.newTipme = ''
    },
    handleSelect(val) {
      this.newTipme = val
    },
    inputTech() {
      this.$emit('select', this.newTipme)
    },
    handleBlur() {
      this.newTipme = { wagerIssue: this.state }
    }
  },
  computed: {}
}
</script>

