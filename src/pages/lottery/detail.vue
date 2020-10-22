<template>
  <div>
    <div>
      <Card :cardData="tablesCard"></Card>
    </div>
    <div>
      <Card :cardData="lotteryNumCard"></Card>
    </div>
    <div>
      <Card :cardData="historyCard"></Card>
    </div>
     <div>
      <Card :cardData="bcDrawCard"></Card>
    </div>
    <div>
      <Card :cardData="newCard"></Card>
    </div>
    <div>
      <Card :cardData="capitalCard"></Card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '基础数据'
        },
        url: '',
        tableData: [],
        tableColumn: [
          {
            prop: 'wagerIssue',
            label: '期号',
            width: '120px'
          },
          {
            prop: 'stat',
            label: '当前销售状态',
            width: '130px',
            filter: 'statusDic'
          },
          {
            prop: 'endSaleTime',
            label: '截止销售时间',
            width: '170px'
          },
          {
            prop: 'drawTime',
            label: '开奖时间',
            width: '170px'
          },
          {
            prop: 'saleMoney',
            label: '销售金额（元）',
            width: '180px',
            filter: 'money'
          },
          {
            prop: 'totalMoney',
            label: '中奖金额（元）',
            filter: 'money'
          }
        ]
      },
      lotteryNumCard: {
        type: 'lotteryNumCard',
        data: ''
      },
      historyCard: {
        type: 'tablesCard',
        title: {
          name: '开奖流程溯源'
        },
        url: '',
        tableData: [],
        cleeStyle: 'txHash',
        detail: '/dealDetail',
        tableColumn: [
          {
            prop: 'actionTime',
            label: '时间',
            width: '170px'
          },
          {
            prop: 'actionName',
            label: '业务类型',
            width: '120px'
          },
          {
            prop: 'txHash',
            label: '区块链交易哈希',
            width: '330px',
            url: '/dealDetail'
          },
          {
            prop: 'transIntro',
            label: '备注信息',
            width: '400px'
          },
          {
            prop: '',
            label: ''
          }
        ]
      },
      newCard: {
        type: 'tablesCard',
        title: {
          name: '资金状态'
        },
        url: '',
        tableData: [],
        tableColumn: [
          {
            prop: 'gameAccName',
            label: '资金账户',
            width: '210px'
          },
          {
            prop: 'balanceStart',
            label: '期初金额',
            width: '130px',
            filter: 'money'
          },
          {
            prop: 'income',
            label: '收入',
            width: '130px',
            filter: 'money'
          },
          {
            prop: 'outcome',
            label: '支出',
            width: '130px',
            filter: 'money'
          },
          {
            prop: 'balanceEnd',
            label: '期末余额',
            filter: 'money'
          }
        ]
      },
      capitalCard: {
        type: 'tablesCard',
        title: {
          name: '资金流水'
        },
        url: '',
        tableData: [],
        cleeStyle: 'txHash',
        detail: '/dealDetail',
        tableColumn: [
          {
            prop: 'actionTime',
            label: '时间',
            width: '170px'
          },
          {
            prop: 'actionName',
            label: '业务类型',
            width: '120px'
          },
          {
            prop: 'txHash',
            label: '交易哈希',
            width: '330px',
            url: '/dealDetail'
          },
          {
            prop: 'accName',
            label: '付款方',
            width: '160px'
          },
          {
            prop: 'disAccName',
            label: '收款方',
            width: '160px'
          },
          {
            prop: 'transAmount',
            label: '金额（元）',
            width: '120px',
            filter: 'money'
          },
          {
            prop: 'transIntro',
            label: '备注信息'
          }
        ]
      },
      bcDrawCard: {
        type: 'tablesCard',
        title: {
          name: '摇奖过程溯源'
        },
        url: '',
        tableData: [],
        cleeStyle: 'txHash',
        detail: '/dealDetail',
        tableColumn: [
          {
            prop: 'actionTime',
            label: '时间',
            width: '160px'
          },
          {
            prop: 'actionName',
            label: '业务类型',
            width: '150px'
          },
          {
            prop: 'txHash',
            label: '交易哈希',
            width: '330px',
            url: '/dealDetail'
          },
          {
            prop: 'transIntro',
            label: '备注信息',
            width: '400px'
          },
          {
            prop: '',
            label: ''
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
      let res = await this.$http.post('/lottery/detailLottery', {
        gameId: this.$route.params.id,
        wagerIssue: this.$route.params.issue
      })
      if (res.content) {
        this.tablesCard.tableData.push(res.content.issueBase)
        this.historyCard.tableData.push(...res.content.issueHistoryList)
        this.newCard.tableData.push(...res.content.issueFundStatList)
        this.capitalCard.tableData.push(...res.content.issueTransHisList)
        this.bcDrawCard.tableData.push(...res.content.bcDrawHisList)
        this.lotteryNumCard.data = res.content.issueBase.winNum
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

