<template>
  <div>
    <Card :cardData="lotCard"></Card>
    <Card :cardData="tablesCard"></Card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      lotCard: {
        type: 'layoutCard',
        content: [
          {
            span: 16,
            offset: 4,
            name: '账户信息',
            dataObj: [
              {
                label: '账户地址',
                key: 'address',
                val: '',
                span: 6
              },
              {
                label: '资产种类',
                key: 'accbelongto',
                val: '',
                span: 6
              },
              {
                label: '资产数量',
                key: 'swtBalance',
                val: '',
                span: 6
              },
              {
                label: '账户类型',
                key: 'acctype',
                val: '',
                span: 6,
                filter: 'acctype'
              },
              {
                label: '账户用途',
                key: 'accname',
                val: '',
                span: 6
              }
            ]
          }
        ]
      },
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '账户交易'
        },
        url: '/blockTrans/page',
        cleeStyle: 'txHash',
        page: true,
        detail: '/dealDetail',
        request: this.$route.params.hash,
        account: true,
        tableColumn: [
          {
            prop: 'txHash',
            label: '交易哈希',
            width: '300px',
            url: '/dealDetail'
          },
          {
            prop: 'blockIndex',
            label: '所在区块',
            width: '140px'
          },
          {
            prop: 'txTime',
            label: '交易时间',
            width: '170px'
          },
          {
            prop: 'counterAccount',
            label: '对方账户',
            width: '170px'
          },
          {
            prop: 'transAmount',
            label: '金额',
            width: '150px'
          },
          {
            prop: 'transType',
            label: '类型',
            filter: 'accountType'
          }
        ]
      }
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  methods: {
    async getDetail() {
      let res = await this.$http.post('/blockWallats/details', {
        address: this.$route.params.hash
      })
      if (res.content) {
        // 彩票信息
        this.lotCard.content[0].dataObj.forEach(item => {
          if (Object.keys(res.content).includes(item.key)) {
            item.val = res.content[item.key]
          }
        })
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

