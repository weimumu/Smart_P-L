<template>
  <div class="registSuccess">
    <div class="header"></div>
    <img src="/static/logo.png" class="logo"/>
    <div class="successMes">提交成功！</div>
    <div class="faceback">审核结果将在24h发到您的邮箱，请查收</div>
    <button class="return" @click="returnHome">回到首页</button>
  </div>
</template>

<script>
export default {
  methods: {
    returnHome () {
      this.$router.push('/');
    }
  }
};
</script>


<style scoped>
  .registSuccess{
    text-align: center;
  }
  .header{
    background: #d6a12c;
    height: 70.7px;
  }
  .logo {
    height: 90px;
    margin-top: 56.56px;
  }
  .successMes {
    margin-top: 14.14px;
    padding-left: 14.14px; 
    color: #4b4b4b;
    font-size: 21.21px;
  }
  .faceback {
    margin-top: 20.605px;
    font-size: 13.43px;
    color: #4b4b4b;
  }
  .return {
    width: 102.52px;
    height: 42.42px;
    border: 0;
    font-size: 15.55px;
    background: #d6a12c;
    margin-top: 21.21px;
    border-radius: 5.65px; 
    color: white;
  }
</style>
