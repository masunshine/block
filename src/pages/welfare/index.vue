<template>
  <div>
    <div class="welfareTop">
      <Inputs :inputData="input"></Inputs>
    </div>
    <div>
      <lotImg :imgData="imagesData"></lotImg>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      img: true,
      input: {
        name: '查询',
        placeholder: '请输入特征码/存证指纹',
        welfare: true,
        url: '/welfareDetail'
      },
      imagesData: {
        type: 'noz'
      }
    }
  },
  created() {},
  mounted() {},
  methods: {

  },
  computed: {},
  watch: {}
}
</script>

