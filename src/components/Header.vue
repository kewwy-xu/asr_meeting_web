<template>
  <div class="header">
    <el-row>
      <el-col :span="6"
        ><!--图标-->
        <div class="header-logo" @click="goHome">
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-erduo"></use>
          </svg> -->
          <i class="iconfont icon-erduo"></i>
          <span>{{ webName }}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <el-tabs v-model="activeName" :stretch="true" @tab-click="tabClick">
          <el-tab-pane name="meeting">
            <span slot="label"><i class="iconfont icon-huiyi"></i> 会议</span>
          </el-tab-pane>
          <el-tab-pane name="audio">
            <span slot="label"
              ><i class="iconfont icon-wenjianyinpin"></i> 音频</span
            >
          </el-tab-pane>
          <el-tab-pane name="keyWord">
            <span slot="label"
              ><i class="iconfont icon-guanjianci"></i> 关键词</span
            >
          </el-tab-pane>
          <el-tab-pane name="hotWord">
            <span slot="label"><i class="iconfont icon-reci"></i> 热词</span>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <div class="setting">
          <div v-if="loginIn" class="avator-uname" @click="userClick">
            <el-avator :src="avator" :size="medium" alt="用户头像" :fit="fit"></el-avator>
            <span>{{ username }}</span>
          </div>
          <div v-else class="register-login">
            <span @click="register" class="register">注册</span>
            <span @click="login" class="login">登录</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data: function () {
    return {
      webName: "智会",
      activeName: "meeting",
    };
  },
  computed: {
    ...mapGetters(["userId", "avator", "username", "loginIn"]),
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    tabClick(tab, event) {
      console.log(tab, event);
      let path = tab.name;
      this.$router.push({ path: path });
    },
    userClick() {},
    register(){
      this.$router.push('/register')
    },
    login(){}
  },
};
</script>

<style scoped lang="scss">
.el-row {
  height: 50px;
  margin-bottom: 20px;
}

.header-logo {
  margin-top: 11px;
  cursor: pointer;
}

.el-tabs {
  height: 50px;
  margin-left: auto;
  margin-right: auto;
}
.register-login {
  margin-top: 9px;
  .register {
    margin-right: 10px;
    cursor: pointer;
  }
  .login{
    cursor: pointer;
  }
}
</style>