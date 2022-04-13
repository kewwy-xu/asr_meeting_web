<template>
  <div class="cotn_principal">
    <div class="cont_centrar">
      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <div class="col_md_login">
            <div class="cont_ba_opcitiy">
              <h2>登录</h2>
              <button class="btn_login" @click="cambiar_login">登录</button>
            </div>
          </div>
          <div class="col_md_sign_up">
            <div class="cont_ba_opcitiy">
              <h2>注册</h2>
              <button class="btn_sign_up" @click="cambiar_sign_up">注册</button>
            </div>
          </div>
        </div>
        <div class="cont_back_info">
          <div class="cont_img_back_grey">
            <img src="../assets/img/po.jpg" alt="" />
          </div>
        </div>
        <div class="cont_forms">
          <div class="cont_img_back_">
            <img src="../assets/img/po.jpg" alt="" />
          </div>
          <div class="cont_form_login">
            <a href="#" @click="ocultar_login_sign_up"
              ><i class="material-icons">&#xE5C4;</i></a
            >
            <h2>登录</h2>
            <input v-model="emailLogin" type="text" placeholder="Email" />
            <input v-model="pwdLogin" type="password" placeholder="Password" />
            <button class="btn_login" @click="login">登录</button>
          </div>
          <div class="cont_form_sign_up">
            <a href="#" @click="ocultar_login_sign_up"
              ><i class="material-icons">&#xE5C4;</i></a
            >
            <h2>注册</h2>
            <input v-model="email" type="text" placeholder="Email" />
            <span>
              <input v-model="verifyCode" type="text" placeholder="验证码" />
              <el-button type="primary" @click="getVerifyCode" size="small"
                >获取验证码</el-button
              >
            </span>
            <input v-model="pwd" type="password" placeholder="Password" />
            <input
              v-model="pwd2"
              type="password"
              placeholder="Confirm Password"
            />
            <button class="btn_sign_up" @click="register">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "RegisterOrLogin",
  data() {
    return {
      emailLogin: "",
      pwdLogin: "",
      email: "",
      verifyCode: "",
      pwd: "",
      pwd2: "",
    };
  },
  components: {},
  methods: {
    ...mapMutations(['setUserId','setUsername','setAvator','setLoginIn']),
    login() {
      let ths = this;
      let data = {
        userIdentifier: ths.emailLogin,
        password: ths.pwdLogin,
      };
      this.axios
        .post("/user/pwdLogin", data)
        .then((res) => {
          console.log(res);
          if (res.data["status"] == 200) {
            ths.$message({
              message: "登录成功",
              type: "success",
              // center: true,
            });
            const data=res.data.data;
            //保存用户信息到本地
            ths.setLoginIn("true");
            ths.setUserId(data["id"]);
            ths.setUsername(data["name"]);
            ths.setAvator(data["avatorPath"]);

            ths.$router.push('/');
          } else {
            ths.$message({
              message: "登录失败",
              type: "error",
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    register() {
      let ths = this;
      if (ths.pwd != ths.pwd2) {
        ths.$message({
          message: "两次密码输入不一致",
          type: "error",
          center: true,
        });
        return;
      }
      let data = {
        email: ths.email,
        password: ths.pwd,
        verifyCode: ths.verifyCode,
      };
      ths.axios
        .post("/user/saveUser", data)
        .then((res) => {
          console.log(res);
          const data = res.data;
          if (data["status"] == 200) {
            ths.$message({
              message: "注册成功,请登录",
              type: "success",
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getVerifyCode() {
      let ths = this;
      this.axios
        .get("/user/getEmailCode", {
          params: {
            email: ths.email,
          },
        })
        .then((res) => {
          console.log(res);
          let data = res.data;
          if (data["status"] == 200) {
            ths.$message({
              message: "发送验证码成功",
              type: "success",
              center: true,
            });
          } else {
            ths.$message({
              message: "发送验证码失败",
              type: "error",
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cambiar_login() {
      document.querySelector(".cont_forms").className =
        "cont_forms cont_forms_active_login";
      document.querySelector(".cont_form_login").style.display = "block";
      document.querySelector(".cont_form_sign_up").style.opacity = "0";

      setTimeout(function () {
        document.querySelector(".cont_form_login").style.opacity = "1";
      }, 400);

      setTimeout(function () {
        document.querySelector(".cont_form_sign_up").style.display = "none";
      }, 200);
    },
    cambiar_sign_up() {
      document.querySelector(".cont_forms").className =
        "cont_forms cont_forms_active_sign_up";
      document.querySelector(".cont_form_sign_up").style.display = "block";
      document.querySelector(".cont_form_login").style.opacity = "0";

      setTimeout(function () {
        document.querySelector(".cont_form_sign_up").style.opacity = "1";
      }, 100);

      setTimeout(function () {
        document.querySelector(".cont_form_login").style.display = "none";
      }, 400);
    },
    ocultar_login_sign_up() {
      document.querySelector(".cont_forms").className = "cont_forms";
      document.querySelector(".cont_form_sign_up").style.opacity = "0";
      document.querySelector(".cont_form_login").style.opacity = "0";

      setTimeout(function () {
        document.querySelector(".cont_form_sign_up").style.display = "none";
        document.querySelector(".cont_form_login").style.display = "none";
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/registerOrLogin.css";
@import "https://fonts.googleapis.com/css?family=Lato";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
</style>