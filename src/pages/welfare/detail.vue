<template>
  <div>
    <div>
      <div class="welfareTop">
        <Inputs :inputData="input" @cbData="cbData"></Inputs>
      </div>
      <lotImg :imgData="detailImages"></lotImg>
      <Card :cardData="lotCard" ref="lotCard"></Card>
      <Card :cardData="tablesCard" ref="tables"></Card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: {
        name: '查询',
        placeholder: '请输入特征码/存证指纹'
      },
      detailImages: {
        type: 'real',
        data: {
          tickCode: '',
          playTypeName: '',
          time: '',
          gameName: '',
          ticketSn: '',
          stationId: '',
          wagerIssue: '',
          betTime: '',
          printAddr: '',
          ticketAmount: '',
          userTel: '',
          userId: ''
        },
        tltckItem: []
      },
      lotCard: {
        type: 'layoutCard',
        content: [
          {
            span: 10,
            offset: 4,
            name: '基本信息',
            dataObj: [
              {
                label: '游戏期号',
                key: 'wagerIssue',
                val: ''
              },
              {
                label: '投注站',
                key: 'stationName',
                val: ''
              },
              {
                label: '购买人',
                key: 'userId',
                val: ''
              },
              {
                label: '购买时间',
                key: 'betTime',
                val: ''
              },
              {
                label: '区块高度',
                key: 'blockIndex',
                val: ''
              },
              {
                label: '交易哈希',
                key: 'txHash',
                val: '',
                url: '/dealDetail'
              }
            ]
          },
          {
            span: 6,
            offset: 0,
            name: '信息核验',
            type: '',
            tree: true,
            dataObj: [
              {
                label: '存证指纹校验',
                key: '',
                val: '1',
                img: '1',
                oins: true,
                imgoi: true
              },
              {
                label: '消息指纹校验',
                key: '',
                val: '1',
                img: '1',
                oins: true,
                imgoi: true
              },
              {
                label: '签名验证结果',
                key: '',
                val: '1',
                img: '1',
                oins: true,
                imgoi: true
              },
              {
                label: '严格验证结果',
                key: '',
                val: '1',
                img: '1',
                oins: true,
                imgoi: true
              }
            ]
          }
        ]
      },
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '操作记录'
        },
        url: '',
        tableData: [],
        cleeStyle: 'txHash',
        detail: '/dealDetail',
        tableColumn: [
          {
            prop: 'actionTime',
            label: '时间',
            width: '200px'
          },
          {
            prop: 'actionName',
            label: '业务类型',
            width: '150px'
          },
          {
            prop: 'txHash',
            label: '交易哈希',
            width: '400px',
            url: '/dealDetail'
          },
          {
            prop: 'transIntro',
            label: '备注信息'
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
    async getDetail(hash) {
      // 判断是特征码还是存证指纹
      let data = {}
      if (hash.length === 32) {
        data = { tickCode: hash }
      } else {
        data = { txHash: hash }
      }
      let res = await this.$http.post('/lottery/check', data)
      if (res.content) {
        // 基本信息
        this.lotCard.content[0].dataObj.forEach(item => {
          if (Object.keys(res.content.tickets).includes(item.key)) {
            item.val = res.content.tickets[item.key]
          }
        })
        // 彩票信息
        this.detailImages.data = res.content.tickets
        this.detailImages.tltckItem.push(...res.content.ticketBody)
        // 操作记录
        this.tablesCard.tableData.push(...res.content.ticketHistoryList)
        // 根据是否有数据动态显示信息核验
        this.lotCard.content[1].dataObj.forEach(item => {
          item.val = '1'
          item.img = '1'
          item.oins = true
          item.imgoi = true
        })
        this.$refs.lotCard.loadion(this.lotCard.content[1].dataObj)
      } else {
        this.detailImages.tltckItem = []
        this.tablesCard.tableData = []
        this.detailImages.data = ''
        this.clear()
        // 根据是否有数据动态显示信息核验
        this.lotCard.content[1].dataObj.forEach(item => {
          item.val = '2'
          item.img = '2'
          item.oins = true
          item.imgoi = true
        })
        this.$refs.lotCard.loadion(this.lotCard.content[1].dataObj)
        this.$message.error('请输入正确的特征码/存证指纹')
      }
    },
    // 子组件返回
    cbData(data) {
      this.detailImages.tltckItem = []
      this.tablesCard.tableData = []
      this.getDetail(data)
      this.$refs.tables.getTables()
    },
    // 清空数据
    clear() {
      this.lotCard.content[0].dataObj = [
        {
          label: '游戏期号',
          key: 'wagerIssue',
          val: ''
        },
        {
          label: '投注站',
          key: 'stationName',
          val: ''
        },
        {
          label: '购买人',
          key: 'userId',
          val: ''
        },
        {
          label: '购买时间',
          key: 'betTime',
          val: ''
        },
        {
          label: '区块高度',
          key: 'blockIndex',
          val: ''
        },
        {
          label: '交易哈希',
          key: 'txHash',
          val: '',
          url: '/dealDetail'
        }
      ]
    }
  },
  computed: {},
  watch: {}
}
</script>
