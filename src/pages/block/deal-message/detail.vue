<template>
  <div>
    <Card :cardData="lotCard"></Card>
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
            name: '交易信息',
            dataObj: [
              {
                label: '交易时间',
                key: 'txTime',
                val: ''
              },
              {
                label: '交易序号',
                key: 'txSeq',
                val: ''
              },
              {
                label: '交易哈希',
                key: 'txHash',
                val: ''
              },
              {
                label: '区块高度',
                key: 'blockIndex',
                val: ''
              },
              {
                label: '区块哈希',
                key: 'blockHash',
                val: '',
                url: '/blockDetail'
              },
              {
                label: '发起方',
                key: 'account',
                val: '',
                show: false
              },
              {
                label: '接收方',
                key: 'destination',
                val: '',
                show: false
              },
              {
                label: '交易金额',
                key: 'transAmount',
                val: '',
                filter: 'dismon',
                show: false
              },
              {
                label: '交易结果',
                key: 'transStat',
                val: '',
                style: '#00CA9B',
                filter: 'trans'
              },
              {
                label: '业务类型',
                key: 'bizTypeName',
                val: '',
                // filter: 'bizForamt',
                welfareUrl: '/welfareDetail',
                hash: this.$route.params.hash
              },
              {
                label: '备注信息',
                key: 'txMemo',
                val: ''
              }
            ]
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
      let res = await this.$http.post('/blockTrans/details', { txHash: data })
      if (res.content) {
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

