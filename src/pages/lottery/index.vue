<template>
  <div>
    <searchTips url="/lottery/queryWagerIssue" @select="lotterySelect" :maxlength="10"></searchTips>
    <div v-loading="loading" v-if="loading" style="height:800px;margin:20px 16.66667%"></div>
    <Card :cardData="lotCard" v-else></Card>
    <div class="lottery-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.pageNum"
        :page-sizes="[10, 20, 40]"
        :page-size="pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      lotCard: {
        type: 'lotteryCard',
        title: [],
        // more: true,
        path: ['/lotteryDetail']
      },
      pages: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      loading: true
    }
  },
  created() {
    this.getIssur()
    // this.$loading.service({ fullscreen: true });
  },
  mounted() {},
  methods: {
    // 查询一条数据
    async getData(issur = 0) {
      let res = await this.$http.post('/lottery/recentInSale', {
        wagerIssue: issur,
        pageNum: 1,
        pageSize: 20
      })
      if (res.content && res.content.length > 0) {
        this.lotCard.title = res.content
        this.total = res.content.length
      } else {
        this.$message.warning('搜索结果为空！')
      }
    },
    lotterySelect(val) {
      val.wagerIssue ? this.getData(val.wagerIssue) : this.getIssur()
    },
    // 默认查询历史期
    async getIssur() {
      let res = await this.$http.post('/lottery/page', {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize
      })
      if (res.content) {
        this.lotCard.title = res.content.list
        this.total = res.content.total
        let $this = this
        setTimeout(function() {
          $this.loading = false
        }, 300)
      }
    },
    // 分页功能(每页多少条)
    handleSizeChange(val) {
      this.pages.pageSize = val
      this.getIssur()
    },
    // 分页功能(当前页)
    handleCurrentChange(val) {
      this.pages.pageNum = val
      this.getIssur()
    }
  },
  computed: {},
  watch: {}
}
</script>

