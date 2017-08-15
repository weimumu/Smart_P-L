<template>
  <div class="loginFin">
     <img src="/static/logo.png" class="logo"/>
     <div class="loginContent">
       <span class="loginMes">金融机构登录</span>
       <div class="line"></div>
       <div class="same">
         <span>邮箱地址</span>
         <input class="textfield" type="email" placeholder="请输入邮箱地址"> 
       </div>
       <div class="same" :style="{marginTop: '15px'}">
         <span>密码</span>
         <input class="textfield" type="password" placeholder="密码"> 
       </div>
       <span class="forgetMes">忘记密码?</span>
       <button class="loginButton"></button>
     </div>
  </div>
</template>

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
    margin-top: 50px;
  }
  .loginContent{
    text-align: left;
    position: relative;
    top: 58px;
    width: 720px;
    height: 340px;
    background: url("/static/whitebox.png") no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
  }
  .loginMes{
    font-size: 28px;
    color: #4b4b44;
    position: relative;
    left: 70px;
    top: 20px;
  }
  .line{
    width: 560px;
    height: 2px;
    background-color: #dcdcdc;
    position: relative;
    left: 70px;
    top: 30px;
  }
  .same{
    left: 70px;
    width: 560px;
    height: 49px;
    position: relative;
    top: 62px;
    display:table;
  }
  .same>span{
    vertical-align:middle;  
    display:table-cell;
    font-size: 23px;
    color: #4b4b4b;
  }
  .textfield{
    font-size: 20px;
    padding-left: 20px;
    border: 0px;
    outline: none;
    width: 364px;
    height: 49px;
    background: url("/static/typebox.png");
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    color: #6f6f6f;
  }
  .forgetMes{
    position: absolute;
    bottom: 55px;
    left: 70px;
    font-size: 16px;
    color: #898989;
  }
  .loginButton{
    position: absolute;
    right: 85px;
    bottom: 45px;
    border: 0;
    width: 108px;
    height: 42px;
    background: url("/static/loginButton.png");
    background-size: 100% 100%;
  }
</style>

