<template>
  <div class="registSuccess">
    <div class="header"></div>
    <img src="/static/logo.png" class="logo"/>
    <div class="successMes">提交成功！</div>
    <div class="faceback">审核结果将在24h发到您的邮箱，请查收</div>
    <button class="return">回到首页</button>
  </div>
</template>

<style scoped>
  .registSuccess{
    text-align: center;
  }
  .header{
    background: #d6a12c;
    height: 100px;
  }
  .logo {
    margin-top: 80px;
  }
  .successMes {
    margin-top: 20px;
    padding-left: 20px; 
    color: #4b4b4b;
    font-size: 30px;
  }
  .faceback {
    margin-top: 15px;
    font-size: 19px;
    color: #4b4b4b;
  }
  .return {
    width: 145px;
    height: 60px;
    border: 0;
    font-size: 22px;
    background: #d6a12c;
    margin-top: 30px;
    border-radius: 8px; 
    color: white;
  }
</style>
