<template>
  <div>
    <div class="usel">
      <el-carousel :height="homeus()">
        <el-carousel-item v-for="item in img" :key="item">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <Inputs :inputData="input"></Inputs>
    <div>
      <Card :cardData="contCard"></Card>
    </div>
    <div>
      <Card :cardData="bjcolorCard"></Card>
    </div>
    <div>
      <Card :cardData="tablesCard"></Card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      contNum: '',
      numList: [
        {
          name: '银行机构',
          num: ''
        },
        {
          name: '财政部',
          num: ''
        },
        {
          name: '彩票中心',
          num: ''
        },
        {
          name: '公证机构',
          num: ''
        },
        {
          name: '民政部',
          num: ''
        },
        {
          name: '银行机构',
          num: ''
        },
        {
          name: '财政部',
          num: ''
        },
        {
          name: '彩票中心',
          num: ''
        },
        {
          name: '公证机构',
          num: ''
        },
        {
          name: '民政部',
          num: ''
        }
      ],
      img: [require('@/assets/img/top1.png'), require('@/assets/img/2.png')],
      input: {
        name: '查询',
        placeholder: '请输入区块哈希/钱包地址/特征码/存证指纹',
        url: '/blockDetail'
      },
      contCard: {
        type: 'contCard',
        title: {
          name: '区块信息'
        },
        data: {
          blockIndex: ''
        }
      },
      bjcolorCard: {
        type: 'bjcolorCard',
        title: {
          name: '平台状态'
        },
        data: require('@/assets/img/status1.png'),
        arrList: [
          {
            name: '银行机构',
            num: ''
          }
        ]
      },
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '最新区块'
        },
        tabs: true,
        tabsData: [
          {
            name: '最新区块'
          },
          {
            name: '最新交易'
          }
        ],
        url: ['/blockInfo/page', '/blockTrans/page'],
        more: true,
        path: ['/block', '/deal'],
        cleeStyle: ['blockHash', 'txHash'],
        detail: ['/blockDetail', '/dealDetail'],
        tableColumn: {
          0: [
            {
              prop: 'closeTime',
              label: '区块时间',
              width: '160px'
            },
            {
              prop: 'blockIndex',
              label: '区块高度',
              width: '150px',
              sortable: true
            },
            {
              prop: 'blockHash',
              label: '区块哈希'
            },
            {
              prop: 'transnum',
              label: '交易数',
              width: '120px'
            }
          ],
          1: [
            {
              prop: 'txHash',
              label: '交易哈希',
              width: '320px',
              url: '/dealDetail'
            },
            {
              prop: 'txTime',
              label: '交易时间',
              width: '160px',
              sortable: true
            },
            {
              prop: 'blockIndex',
              label: '区块高度',
              width: '120px',
              sortable: true
            },
            {
              prop: 'account',
              label: '发送方',
              width: '160px'
            },
            {
              prop: 'destination',
              label: '接收方',
              width: '160px'
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
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    let vm = this
    let num = 1
    let cont = 1
    let imgNum = 1
    this.bjcolorCard.num = num
    setInterval(function() {
      num > 9 ? (num = 1) : num++
      imgNum >= 5 ? (imgNum = 1) : imgNum++
      // 判断是否大于8 大于的话清除数组
      if (vm.bjcolorCard.arrList.length > 9) {
        vm.bjcolorCard.arrList.splice(0, 2)
      }
      vm.bjcolorCard.data = require('@/assets/img/status' + imgNum + '.png')
      vm.bjcolorCard.arrList.push(vm.numList[num - 1])
      vm.bjcolorCard.arrList[vm.bjcolorCard.arrList.length - 1].num = parseInt(vm.contNum + cont)
      cont++
    }, 10000)

    console.log(this)
  },
  methods: {
    async getData() {
      let res = await this.$http.get('/lottery/index')
      if (res.content) {
        // 开奖销售状态
        // this.lotCard.title = res.content.recentLottery;
        this.contCard.data = res.content.blockInfo
        this.numList[0].num = res.content.blockInfo.blockIndex
        this.contNum = res.content.blockInfo.blockIndex
        this.bjcolorCard.arrList[0].num = res.content.blockInfo.blockIndex
      }
    },
    homeus() {
      if (window.innerWidth < 1550) {
        return '220px'
      }
      return '350px'
    }
  },
  computed: {},
  watch: {}
}
</script>
