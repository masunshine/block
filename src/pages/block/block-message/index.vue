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
        placeholder: '请输入区块哈希/钱包地址',
        url: '/blockDetail'
      },
      tablesCard: {
        type: 'tablesCard',
        title: {
          name: '区块信息'
        },
        url: '/blockInfo/page',
        cleeStyle: 'blockHash',
        page: true,
        detail: '/blockDetail',
        tableColumn: [
          {
            prop: 'blockIndex',
            label: '区块高度',
            width: '170px',
            sortable: true
          },
          {
            prop: 'closeTime',
            label: '出块时间',
            width: '200px'
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

