<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="form.mobile"
          :maxlength="11"
          placeholder="请输入I茅台用户手机号"/>
        <div style="margin-top: 10px">
          <el-button
            type="primary"
            @click="sendCode(form.mobile)"
            :loading="sendCodeButton"
            :disabled="state"
          >发送验证码<span v-if="state">({{ stateNum }})</span>
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :loading="loginButton"
        @click="refresh(form.mobile, form.code)"
      >刷 新
      </el-button>
    </div>
  </div>
</template>

<script>

import {
  sendCode,
  login,
} from "@/api/imt/updateToken";

export default {
  data(){
    return {
      // 发送短信按钮倒计时
      state: false,
      stateNum: 60,
      sendCodeButton: false,
      loginButton: false,
      form: {},
      //发送验证码
      sendCode(mobile) {
        this.sendCodeButton = true;
        if (mobile === '' || mobile === undefined) {
          this.$modal.msgError("手机号不能为空");
          this.sendCodeButton = false;
          return;
        }
        sendCode(mobile).then((response) => {
          if (false === response.data) {
            this.$modal.msgError("手机号不存在");
            this.sendCodeButton = false;
            return;
          }
          this.$modal.msgSuccess("发送成功");
          this.sendCodeButton = false;
          this.state = true;
          let timer = setInterval(() => {
            this.stateNum--;
            if (this.stateNum === 0) {
              clearInterval(timer);
              this.state = false;
              this.stateNum = 60;
            }
          }, 1000);
        }).catch(error => {
          this.loginButton = false;
        });
      },
      //刷新
      refresh(mobile, code) {
        this.loginButton = true;
        if (code === '' || code === undefined) {
          this.$modal.msgError("验证码不能为空");
          this.loginButton = false;
          return;
        }
        login(mobile, code).then((response) => {
          this.$modal.msgSuccess("刷新成功");
          this.loginButton = false;
        }).catch(error => {
          this.loginButton = false;
        });
      },
    }
  }
}

</script>

<style>

</style>
