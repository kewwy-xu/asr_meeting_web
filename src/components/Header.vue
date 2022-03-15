<template>
  <div class="header">
    <!--图标-->
    <div class="header-logo" @click="goHome">
      <img src="../assets/logo-erduo.svg" alt="智会 logo" >
      <span>{{ webName }}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Header",
  data: function () {
    return {
      webName: '智会',
      navBarList: [
        {name: '会议',path: ''},
        {name: '音频',path: ''},
        {name: '关键词',path: ''},
        {name: '热词',path: ''},
      ]
    };
  },
  methods: {
    goHome () {
      this.$router.push({path: '/'})
    },
  },
};
</script>

<style scoped>
</style>