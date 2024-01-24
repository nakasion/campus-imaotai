<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="form.mobile"
          readonly
          placeholder="请输入I茅台用户手机号"
        />
        <div style="margin-top: 10px">
          <el-button
            type="primary"
            @click="sendCode(form.mobile)"
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
      form: {},
      //发送验证码
      sendCode(mobile) {
        sendCode(mobile).then((response) => {
          if (false === response.data) {
            this.$modal.msgSuccess("手机号不存在");
          }
          this.$modal.msgSuccess("发送成功");
          this.state = true;
          let timer = setInterval(() => {
            this.stateNum--;
            if (this.stateNum === 0) {
              clearInterval(timer);
              this.state = false;
              this.stateNum = 60;
            }
          }, 1000);
        });
      },
      //刷新
      refresh(mobile, code) {
        login(mobile, code).then((response) => {
          this.$modal.msgSuccess("刷新成功");
        });
      },
    }
  }
}

</script>

<style>

</style>
