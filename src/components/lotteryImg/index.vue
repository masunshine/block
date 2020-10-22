<template>
  <div>
    <div class="lotImg">
      <div v-if="imgData.type === 'noz'">
        <img src="./bj.png" />
        <span class="bjSpan">请在上方输入特征码/存证指纹核验彩票</span>
      </div>
      <div v-if="imgData.type === 'real'">
        <img src="./bj.png" />
        <div class="real">
          <div class="bjform">
            <h4>{{imgData.data.tickCode}}</h4>
            <img src="./title.png" />
            <div
              class="formLeft"
            >基诺/{{imgData.data.playTypeName}} {{imgData.data.wagerIssue}}期</div>
            <div
              class="formLeft"
            >站号：{{imgData.data.stationId}} 操作员：{{imgData.data.operatorId}} 流水号：{{imgData.data.ticketSn}} 期：{{imgData.data.issueAcount}}</div>
            <img src="./line.png" />
            <ul>
              <li
                v-if="imgData.tltckItem.length >0"
              >① {{imgData.tltckItem[0].betnums}} [{{imgData.tltckItem[0].multiTimes}}倍]</li>
              <li
                v-if="imgData.tltckItem.length >1"
              >② {{imgData.tltckItem[1].betnums}} [{{imgData.tltckItem[1].multiTimes}}倍]</li>
              <li
                v-if="imgData.tltckItem.length >2"
              >③ {{imgData.tltckItem[2].betnums}} [{{imgData.tltckItem[2].multiTimes}}倍]</li>
              <li
                v-if="imgData.tltckItem.length >3"
              >④ {{imgData.tltckItem[3].betnums}} [{{imgData.tltckItem[3].multiTimes}}倍]</li>
              <li
                v-if="imgData.tltckItem.length >4"
              >⑤ {{imgData.tltckItem[4].betnums}} [{{imgData.tltckItem[4].multiTimes}}倍]</li>
            </ul>
            <div class="formLeft">销售时间：{{imgData.data.betTime}} 面额：{{imgData.data.ticketAmount}}元</div>
            <div class="formLeft">站地址：{{imgData.data.printAddr}}</div>
            <div class="formLeft">验票码：*****************************</div>
            <div class="formLeft">手机号：{{imgData.data.userTel}} 会员名称：{{imgData.data.userId}}</div>
            <div class="formLeft">存证指纹：{{imgData.data.txHash}}</div>
            <div class="formLeft">钱包地址：{{imgData.data.adress}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lotImg',
  components: {},
  data() {
    return {}
  },
  props: {
    imgData: {
      type: Object,
      default: () => null
    }
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

