<template>
  <div>
    <!-- 彩票卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'lotteryCard'">
      <el-row>
        <el-col
          :span="8"
          v-for="(item,index) in cardData.title"
          :key="index"
          :offset="index % 2 === 0?4:0"
          :style="style(index)"
        >
          <el-card class="locard">
            <div slot="header" class="clearfix">
              <span class="icon"></span>
              <span class="name">
                <img src="../../assets/img/game.png" />
                {{item.gameName}}
              </span>
              <span class="stage">第 {{item.wagerIssue}} 期</span>
            </div>
            <div>
              <el-row v-if="cardData.rowType === 'indexLottery'">
                <el-col :span="12" class="cardLeft">当前状态</el-col>
                <el-col :span="12" class="cardRight">{{$filter.statusDic(item.stat)}}</el-col>
                <el-col :span="12" class="cardLeft">截止销售时间</el-col>
                <el-col :span="12" class="cardRight">{{item.saleTime}}</el-col>
                <el-col :span="12" class="cardLeft">开奖时间</el-col>
                <el-col :span="12" class="cardRight">{{item.drawTime}}</el-col>
                <el-col :span="12" class="cardLeft">奖池金额（元）</el-col>
                <el-col :span="12" class="cardRight">{{$filter.money(item.winPool)}}</el-col>
                <el-col :span="12" class="cardLeft">实时销量（元）</el-col>
                <el-col :span="12" class="cardRight">{{$filter.money(item.saleMoney)}}</el-col>
              </el-row>
              <el-row v-else>
                <div @click="lotteryMore(cardData.path,item.gameId,item.wagerIssue)">
                  <el-col :span="10" class="cardLeft">期号</el-col>
                  <el-col :span="14" class="cardRight">
                    <span>{{item.wagerIssue}}</span>
                  </el-col>
                  <el-col :span="10" class="cardLeft">当前状态</el-col>
                  <el-col :span="14" class="cardRight">{{$filter.statusDic(item.stat)}}</el-col>
                  <el-col :span="10" class="cardLeft">截止销售时间</el-col>
                  <el-col :span="14" class="cardRight">{{item.endSaleTime}}</el-col>
                  <el-col :span="10" class="cardLeft">开奖时间</el-col>
                  <el-col :span="14" class="cardRight">{{item.drawTime}}</el-col>
                  <el-col :span="10" class="cardLeft">销售金额</el-col>
                  <el-col :span="14" class="cardRight">{{$filter.money(item.saleMoney)}}</el-col>
                  <el-col :span="10" class="cardLeft">中奖金额</el-col>
                  <el-col :span="14" class="cardRight">{{$filter.money(item.totalMoney)}}</el-col>
                  <el-col :span="10" class="cardLeft">本期开奖号码</el-col>
                  <el-col :span="14" class="cardRight">
                    <span
                      class="welfare"
                      v-for="(list,listindex) in sciptDic(item.winNum)"
                      :key="listindex"
                    >{{list}}</span>
                  </el-col>
                </div>
              </el-row>
            </div>
            <div class="tableButtom" v-if="cardData.more">
              <div
                v-if="cardData.more"
                class="more"
                @click="lotteryMore(cardData.path,item.gameId,item.wagerIssue)"
              >显示更多...>></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 图表卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'echartsCard'">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card class="echcard">
            <div slot="header" class="clearfix">
              <span>{{cardData.title.name}}</span>
            </div>
            <div class="chLeft">
              <div class="chlname">
                <div>区块高度</div>
                <div>交易数</div>
                <div>账户个数</div>
                <div>节点个数</div>
                <div>出块时间</div>
              </div>
              <div class="chrval">
                <div class="chcolor1">{{cardData.data.blockIndex}}</div>
                <div class="chcolor2">{{cardData.data.num}}</div>
                <div class="chcolor3">{{cardData.data.conter}}</div>
                <div class="chcolor4">{{cardData.data.num}}</div>
                <div class="chcolor5">{{cardData.data.closeResolution}}</div>
              </div>
            </div>
            <div id="echCard" style="width:75%;height:400px;margin-left:25%"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 统计卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'contCard'">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card class="echcard">
            <div slot="header" class="clearfix">
              <span>{{cardData.title.name}}</span>
            </div>
            <div class="contCard">
              <el-row>
                <el-col :span="6">
                  <div class="contLeft">
                    <img src="../../assets/img/cont1.png" />
                  </div>
                  <div class="contRight">
                    <div class="contData">{{cardData.data.blockIndex}}</div>
                    <div class="contName">区块高度</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="contLeft">
                    <img src="../../assets/img/cont2.png" />
                  </div>
                  <div class="contRight">
                    <div class="contData">
                      {{cardData.data.txNum}}
                      <!-- <img src="../../assets/img/lines.png" />
                      <span>0</span>-->
                    </div>
                    <div class="contName">交易数量</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="contLeft">
                    <img src="../../assets/img/cont3.png" />
                  </div>
                  <div class="contRight">
                    <div class="contData">
                      {{cardData.data.accountNum}}
                      <!-- <img src="../../assets/img/lines.png" />
                      <span>0</span>-->
                    </div>
                    <div class="contName">账户数量</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="contLeft">
                    <img src="../../assets/img/cont4.png" />
                  </div>
                  <div class="contRight">
                    <div class="contData">{{cardData.data.nodeNum}}</div>
                    <div class="contName">节点个数</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 背景图卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'bjcolorCard'">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card class="bjcolor">
            <div slot="header" class="clearfix">
              <span>{{cardData.title.name}}</span>
            </div>
            <div class="imgcard">
              <img :src="cardData.data" />
            </div>
            <div class="imgReight">
              <div class="messTitle">正在出块...</div>
              <div v-for="(item,index) in cardData.arrList" :key="index" :class="'classNum'+index">
                <div class="name">{{item.name}}</div>
                <div class="num">{{item.num}}</div>
              </div>
               <div class="bottomLine"><span class="dot" style="margin-top:15px">...</span></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 表格卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'tablesCard'">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card class="tablesCard">
            <div slot="header" class="clearfix">
              <span>{{cardData.title.name}}</span>
              <div v-if="cardData.tabs" class="tableTab">
                <div
                  v-for="(item,ti) in cardData.tabsData"
                  :key="ti"
                  :class="checked(ti)"
                  @click="newche(ti)"
                >{{item.name}}</div>
              </div>
            </div>
            <div class="table">
              <el-table
                ref="tables"
                :data="tables"
                style="width: 100%"
                :cell-style="tableClass"
                @row-click="tableRoute"
                :highlight-current-row="true"
                v-loading="loading"
                v-if="cardData.tabs"
              >
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column
                  v-for="(item,index) in cardData.tableColumn[checkIndex]"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :sortable="item.sortable"
                >
                  <template slot-scope="scope">
                    <span v-if="item.filter" style="white-space: pre-line;">{{ filterVal(item.filter,scope.row[item.prop])}}</span>
                    <span v-else-if="item.url" style="color: #438EF7;cursor: pointer;white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" @click="monting(item.url,scope.row[item.prop])">{{scope.row[item.prop]}}</span>
                    <span v-else style="white-space: pre-line;">{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                :data="tables"
                style="width: 100%"
                :cell-style="tableClass"
                @row-click="tableRoute"
                :highlight-current-row="true"
                v-loading="loading"
                v-else
              >
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column
                  v-for="(item,index) in cardData.tableColumn"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :sortable="item.sortable"
                >
                  <template slot-scope="scope">
                    <span v-if="item.filter" style="white-space: pre-line;">{{ filterVal(item.filter,scope.row[item.prop])}}</span>
                    <span v-else-if="item.url" style="color: #438EF7;cursor: pointer;white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" @click="monting(item.url,scope.row[item.prop])">{{scope.row[item.prop]}}</span>
                    <span v-else style="white-space: pre-line;">{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="tableButtom" v-if="cardData.more || cardData.page">
              <div v-if="cardData.more" class="more" @click="more(cardData.path)">显示更多...>></div>
              <div v-if="cardData.page" class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pages.pageNum"
                  :page-sizes="[20, 40, 60]"
                  :page-size="pages.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 栅栏卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'layoutCard'">
      <el-row :gutter="20" style="margin-right:0">
        <el-col
          v-for="(item,index) in cardData.content"
          :key="index"
          :span="item.span"
          :offset="item.offset"
          style="padding-right:0"
        >
          <el-card class="layouts">
            <div slot="header" class="clearfix">
              <span class="name">{{item.name}}</span>
              <span class="type">{{item.type}}</span>
            </div>
            <div v-if="item.tree">
              <el-row v-for="(cont,ci) in item.dataObj" :key="ci" style="height:44px;">
                <el-col :span="14" class="cardLeft">{{cont.label}}</el-col>
                <el-col :span="6" class="cardRight">
                  <div v-if="cont.oins">
                    检测中
                    <span class="dot">...</span>
                  </div>
                  <div v-else>{{getFilter(cont.val)}}</div>
                </el-col>
                <el-col :span="4" class="cardRight2" v-if="!cont.imgoi">
                  <img :src="getFilterImg(cont.img)" />
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row v-for="(cont,ci) in item.dataObj" :key="ci">
                <div v-if="!cont.show">
                  <el-col :span="cont.span?cont.span:8" class="cardLeft">{{cont.label}}</el-col>
                  <el-col :span="cont.span === 6?18:16" v-if="cont.reload" class="cardRightColor">
                    <span @click="preLoad(cont.val)">{{cont.val}}</span>
                  </el-col>
                  <el-col :span="cont.span === 6?18:16" v-else-if="cont.url" class="cardRightColor">
                    <span @click="monting(cont.url,cont.val)">{{cont.val}}</span>
                  </el-col>
                   <el-col :span="cont.span === 6?18:16" v-else-if="cont.welfareUrl && cont.val === '4000'" class="cardRightColor">
                    <span @click="monting(cont.welfareUrl,cont.hash)">{{$filter[cont.filter](cont.val)}}</span>
                  </el-col>
                  <el-col
                    :span="cont.span === 6?18:16"
                    v-else-if="cont.filter"
                    class="cardRight"
                    :style="'color:'+cont.style"
                  >
                    <span>{{$filter[cont.filter](cont.val)}}</span>
                  </el-col>
                  <el-col
                    :span="cont.span === 6?18:16"
                    v-else
                    class="cardRight"
                    :style="'color:'+cont.style"
                  >{{cont.val}}</el-col>
                </div>
              </el-row>
            </div>
            <div class="tableButtom" v-if="cardData.more">
              <div v-if="cardData.more" class="more" @click="more(cardData.path)">显示更多...>></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 中奖号码卡片 -->
    <div class="lotteryCard" v-if="cardData.type === 'lotteryNumCard'">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card class="tablesCard">
            <div slot="header" class="clearfix">
              <span>本期开奖号码</span>
            </div>
            <div class="locard">
                <span class="welfareDetail" v-for="(item,index) in sciptDic(cardData.data)" :key="index">{{item}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { dataDic, dataDicImg } from '@/common/utils/filter'
let echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// // 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
export default {
  name: 'Card',
  components: {},
  data() {
    return {
      checkIndex: 0,
      tables: [],
      pages: {
        pageNum: 1,
        pageSize: 20
      },
      tabPages: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      loading: true
    }
  },
  props: {
    cardData: {
      type: Object,
      default: () => null
    }
  },
  created() {},
  mounted() {
    // 图表时初始化
    if (this.cardData.type === 'echartsCard') {
      this.getEcharts()
    }
    // 判断是否是表格卡片 根据传进来的url
    if (this.cardData.type === 'tablesCard') {
      this.getTables(this.cardData.url)
    }
    // 找栅栏卡片的tree
    if (this.cardData.type === 'layoutCard') {
      let tree = this.cardData.content.filter(item => item.tree)
      if (tree.length === 0) return
      if (tree[0].tree) {
        this.loadion(tree[0].dataObj)
      }
    }
  },
  methods: {
    // 图表请求数据
    async getEcharts() {
      let res = await this.$http.post(this.cardData.url, {
        stDate: moment().format('YYYY-MM-DD')
      })
      if (res) {
        let timeList = []
        let txcont = []
        res.content.forEach(item => {
          timeList.push(item.stTime)
          txcont.push(item.txcount)
        })
        this.echartsInit(timeList, txcont)
      }
    },
    // 图表渲染数据
    echartsInit(timeList, txcont) {
      let echartthird = echarts.init(document.getElementById('echCard'))
      // let colors = ["#c994ff", "#fe943e", "#fd4f53", "#02e9a9"];
      // let seriesData = [];
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeList
        },
        yAxis: [
          {
            name: '(K)',
            type: 'value'
          },
          {
            name: '区块日交易数',
            nameLocation: 'start',
            type: 'value',
            inverse: true
          }
        ],
        series: [
          {
            name: '1',
            data: txcont,
            type: 'line',
            areaStyle: {
              // color: "#7C5DF1"
            },
            smooth: true, // 曲线平滑
            symbol: 'none',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, // 变化度
                    // 三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: '#7963EE'
                      },
                      {
                        offset: 0.5,
                        color: '#7C5DF1'
                      },
                      {
                        offset: 1,
                        color: '#FCFCFE'
                      }
                    ]
                  )
                },
                lineStyle: {
                  // 线的颜色
                  color: '#7C5DF1'
                }
              }
            }
          }
        ]
      }
      echartthird.setOption(option, true)
    },
    // tab切换时改变样式
    newche(num) {
      this.checkIndex = num
      this.getTables(this.cardData.url)
    },
    // 样式替换
    checked(num) {
      if (this.checkIndex === num) {
        return 'checked'
      }
      return ''
    },
    // 根据传进url获取数据 赋值给表格上
    getTables(url) {
      // 判断是否是外面带进的数据，这里不请求
      if (!this.cardData.url) {
        this.tables = this.cardData.tableData
        this.loading = false
        return
      }
      // 判断是否是有tabs属性的表格
      if (this.cardData.tabs) {
        this.$http.post(url[this.checkIndex], this.tabPages).then(res => {
          this.total = res.content.total
          this.tables = res.content.list
          this.loading = false
        })
        return
      }
      // 请求
      if (this.cardData.data) {
        this.$http.post(url, { queryString: this.cardData.data }).then(res => {
          this.tables = res.content.ticketHistoryList
          this.loading = false
        })
        return
      }
      // 判断是否钱包地址里的交易信息
      if (this.cardData.account) {
        this.$http.post(url, {
          list: [
            {
              account: this.cardData.request
            }
          ],
          pageNum: this.pages.pageNum,
          pageSize: this.pages.pageSize
        })
          .then(res => {
            this.total = res.content.total
            this.tables = res.content.list
            this.loading = false
          })
        return
      }
      // 判断是否区块详情里查最新区块交易信息
      if (this.cardData.request) {
        this.$http.post(url, {
          list: [
            {
              blockHash: this.cardData.request
            }
          ],
          pageNum: this.pages.pageNum,
          pageSize: this.pages.pageSize
        })
          .then(res => {
            this.total = res.content.total
            this.tables = res.content.list
            this.loading = false
          })
        return
      }
      this.$http.post(url, this.pages).then(res => {
        this.total = res.content.total
        this.tables = res.content.list
        this.loading = false
      })
    },
    // 显示更多跳转页面
    more(route) {
      this.$router.push(route[this.checkIndex])
    },
    // 分页功能(每页多少条)
    handleSizeChange(val) {
      this.pages.pageSize = val
      this.getTables(this.cardData.url)
    },
    // 分页功能(当前页)
    handleCurrentChange(val) {
      this.pages.pageNum = val
      this.getTables(this.cardData.url)
    },
    // 获取数据字典过滤值
    getFilter(val) {
      return dataDic(val)
    },
    // 获取图片字典过滤值
    getFilterImg(val) {
      return dataDicImg(val)
    },
    // 点击表格中蓝色跳转路由
    tableRoute(row, column) {
      // 判断是否是有tabs属性的表格
      if (this.cardData.tabs) {
        if (column.property === this.cardData.cleeStyle[this.checkIndex]) {
          this.$router.push(
            this.cardData.detail[this.checkIndex] +
              '/' +
              row[this.cardData.cleeStyle[this.checkIndex]]
          )
        }
        return
      }
      // 如果选中蓝色表示的当前表格则进入详情跳转
      if (column.property === this.cardData.cleeStyle) {
        this.$router.push(
          this.cardData.detail + '/' + row[this.cardData.cleeStyle]
        )
      }
    },
    // 改变可点击表格样式
    tableClass({ column }) {
      // 判断是否是有tabs属性的表格
      if (this.cardData.tabs) {
        if (column.property === this.cardData.cleeStyle[this.checkIndex]) {
          return { color: '#438EF7', cursor: 'pointer' }
        }
        return
      }
      if (column.property === this.cardData.cleeStyle) {
        return { color: '#438EF7', cursor: 'pointer' }
      } else {
        return { color: '' }
      }
    },
    // 卡片右边为点击时跳转页面
    monting(url, val) {
      if (url === '/account') {
        this.$router.push(url)
      } else {
        this.$router.push(url + '/' + val)
      }
    },
    // 根据新数据刷新当前页
    preLoad(val) {
      this.$emit('parentLayout', val)
    },
    // 彩票卡片跳转详情
    lotteryMore(url, id, issue) {
      this.$router.push(url + '/' + id + '/' + issue)
    },
    // 表格过滤器
    filterVal(type, val) {
      return this.$filter[type](val)
    },
    // 计算为奇数时
    style(val) {
      return val % 2 === 0 ? '' : 'margin-left:20px;'
    },
    // 中奖号码格式化 改变样式
    sciptDic(val) {
      return val.split('|').filter(item => item !== '')
    },
    // 彩票详情动画效果加载
    loadion(val) {
      setTimeout(() => {
        val[0].oins = false
      }, 3000)
      setTimeout(() => {
        val[0].imgoi = false
      }, 3500)
      setTimeout(() => {
        val[1].oins = false
      }, 4000)
      setTimeout(() => {
        val[1].imgoi = false
      }, 4500)
      setTimeout(() => {
        val[2].oins = false
      }, 5000)
      setTimeout(() => {
        val[2].imgoi = false
      }, 5500)
      setTimeout(() => {
        val[3].oins = false
      }, 6000)
      setTimeout(() => {
        val[3].imgoi = false
      }, 6500)
    },
    text() {
      return true
    },
    // 重新加载表格
    parentTables() {
      this.getTables(this.cardData.url)
    }
  },
  computed: {}
}
</script>
<style>
.dot {
  font-family: simsun;
}
:root .dot {
  display: inline-block;
  width: 1.5em;
  vertical-align: bottom;
  overflow: hidden;
}
@-webkit-keyframes dot {
  0% {
    width: 0;
    margin-right: 1.5em;
  }
  33% {
    width: 0.5em;
    margin-right: 1em;
  }
  66% {
    width: 1em;
    margin-right: 0.5em;
  }
  100% {
    width: 1.5em;
    margin-right: 0;
  }
}
.dot {
  -webkit-animation: dot 3s infinite step-start;
}

@keyframes dot {
  0% {
    width: 0;
    margin-right: 1.5em;
  }
  33% {
    width: 0.5em;
    margin-right: 1em;
  }
  66% {
    width: 1em;
    margin-right: 0.5em;
  }
  100% {
    width: 1.5em;
    margin-right: 0;
  }
}
.dot {
  animation: dot 3s infinite step-start;
}
</style>
