<template>
  <div>
    <div class="welfareTop">
      <Inputs :inputData="input"></Inputs>
    </div>
    <Card :cardData="tablesCard"></Card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: {
        name: '查询',
        placeholder: '请输入交易哈希/钱包地址',
        url: '/dealDetail'
      },
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '交易信息'
        },
        url: '/blockTrans/page',
        cleeStyle: 'txHash',
        page: true,
        detail: '/dealDetail',
        tableColumn: [
          {
            prop: 'txHash',
            label: '交易哈希',
            width: '330px',
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
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

