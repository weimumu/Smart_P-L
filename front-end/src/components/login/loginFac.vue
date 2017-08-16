<template>
  <div class="loginFin">
     <img src="/static/logo.png" class="logo"/>
     <div class="loginContent">
       <span class="loginMes">企业用户登录</span>
       <div class="line"></div>
       <div class="same">
         <span>邮箱地址</span>
         <input class="textfield" type="email" placeholder="请输入邮箱地址"> 
       </div>
       <div class="same" :style="{marginTop: '10.605px'}">
         <span>密码</span>
         <input class="textfield" type="password" placeholder="密码"> 
       </div>
       <span class="forgetMes">忘记密码？</span>
       <span class="registMes" @click="goToRegist">没有账户？点击注册</span>
       <div class="underLine"></div>
       <button class="loginButton"></button>
     </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
      };
    },
    methods: {
      goToRegist () {
        this.$router.push('/regist');
      }
    }
  };
</script>

<style scoped>
  .loginFin {
    text-align: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: fixed;
    background-image: url("/static/background.png");
    background-size: 100% 100%;
  }
  .logo{
    height: 90px;
    margin-top: 35.35px;
  }
  .loginContent{
    text-align: left;
    position: relative;
    top: 42.5px;
    width: 520px;
    height: 250px;
    background: url("/static/whitebox.png") no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
  }
  .loginMes{
    font-size: 19.8px;
    color: #4b4b44;
    position: relative;
    left: 49.5px;
    top: 14.5px;
  }
  .line{
    width: 396px;
    height: 1.5px;
    background-color: #dcdcdc;
    position: relative;
    left: 49.5px;
    top: 21.21px;
  }
  .same{
    left: 49.5px;
    width: 396px;
    height: 34.64px;
    position: relative;
    top: 49px;
    display:table;
  }
  .same>span{
    vertical-align:middle;  
    display:table-cell;
    font-size: 16.26px;
    color: #4b4b4b;
  }
  .textfield{
    font-size: 14.14px;
    padding-left: 14.14px;
    border: 0px;
    outline: none;
    width: 257.3px;
    height: 34.64px;
    background: url("/static/typebox.png");
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    color: #6f6f6f;
  }
  .forgetMes, .registMes{
    position: absolute;
    bottom: 46px;
    left: 49.49px;
    font-size: 11.31px;
    color: #898989;
    cursor: pointer;
  }
  .registMes{
    left: 247.45px;
  }
  .loginButton{
    cursor: pointer;
    position: absolute;
    right: 69px;
    bottom: 38px;
    border: 0;
    width: 76.356px;
    height: 29.694px;
    background: url("/static/loginButton.png");
    background-size: 100% 100%;
  }
  .underLine{
    width: 46.66px;
    position: absolute;
    right: 170px;
    bottom: 43px;
    height: 1.5px;
    background: #dcdcdc;
  }
</style>

