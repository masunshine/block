<template>
  <div>
    <Card :cardData="lotCard" @parentLayout="parentLayout"></Card>
    <Card :cardData="tablesCard" ref="tables"></Card>
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
            name: '基本信息',
            dataObj: [
              {
                label: '出块时间',
                key: 'closeTime',
                val: ''
              },
              {
                label: '出块间隔',
                key: 'closeResolution',
                val: ''
              },
              {
                label: '区块高度',
                key: 'blockIndex',
                val: ''
              },
              {
                label: '交易数量',
                key: 'transnum',
                val: ''
              },
              {
                label: '区块哈希',
                key: 'blockHash',
                val: ''
              },
              {
                label: '上一区块',
                key: 'preBlockHash',
                val: '',
                reload: true
              },
              {
                label: '状态哈希树根',
                key: 'accountHash',
                val: ''
              },
              {
                label: '交易哈希树根',
                key: 'transactionHash',
                val: ''
              }
            ]
          }
        ]
      },
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '交易列表'
        },
        url: '/blockTrans/page',
        cleeStyle: 'txHash',
        page: true,
        detail: '/dealDetail',
        request: this.$route.params.hash,
        tableColumn: [
          {
            prop: 'txHash',
            label: '交易哈希',
            width: '330px',
            url: '/dealDetail'
          },
          {
            prop: 'blockIndex',
            label: '区块高度',
            width: '120px',
            sortable: true
          },
          {
            prop: 'txTime',
            label: '交易时间',
            width: '160px',
            sortable: true
          },
          {
            prop: 'account',
            label: '发送方',
            width: '170px'
          },
          {
            prop: 'destination',
            label: '接收方',
            width: '170px'
          },
          {
            prop: 'transAmount',
            label: '金额',
            width: '120px'
          },
          {
            prop: 'transStat',
            label: '交易状态',
            filter: 'trans'
          }
        ]
      }
    }
  },
  created() {
    this.getDetail(this.$route.params.hash)
  },
  mounted() {},
  methods: {
    // 详情页获取url传入参数请求接口
    async getDetail(data) {
      // 获取区块详情
      let res = await this.$http.post('/blockInfo/details', {
        blockHash: data
      })
      if (res.content) {
        this.lotCard.content[0].dataObj.forEach(item => {
          if (Object.keys(res.content).includes(item.key)) {
            item.val = res.content[item.key]
          }
        })
      }
    },
    // 子组件传入的最新值进行重新查数据
    parentLayout(val) {
      this.getDetail(val)
      this.tablesCard.request = val
      this.$refs.tables.parentTables()
    }
  },
  computed: {},
  watch: {}
}
</script>

