<template>
  <div class="main">
  
    <div class="header">
      <div class="part1">
        <div class="head1">
          <span>更高效的企业融资平台</span>
        </div>
        <div class="head2">
          <span>智产智融搭建中小企业合作伙伴关系网，使企业间借贷，担保与贷款更方便高效</span>
        </div>
      </div>
      <div class="buttons">
        <button class="singleButton" id="button1" @click="goToLogin('/loginFin')"></button>
        <button class="singleButton" id="button2" @click="goToLogin('/loginFac')"></button>
      </div>
      <div class="bg">
      </div>
      <div class="line">
      </div>
    </div>
  
    <div class="Item">
        <div class="Description" id="description1">
            <span class="Subtitle" id="subtitle1">面向客户</span>
            <p class="Detail" id="detail1">“智产智融”平台面向两类客户，分别是中小企业和与企业借贷业务相关的金融机构。</p>
        </div>
        <img class="Logo" id="logo1" src="/static/homepageImage/introduction/icon_custom.png">
    </div>
  
    <div class="Item">    
        <div class="Description" id="description2">
            <span class="Subtitle">企业合作伙伴关系网</span>
            <p class="Detail" id="detail2">平台在注册企业的用户基础上建立企业合作伙伴关系网，并基于合作伙伴关系网开展中小企业的债权融资业务和股权交易业务，为企业融资提供便捷的信息对接匹配和信用审核、风险评估服务。 </p>
        </div>
        <img class="Logo" id="logo2" src="/static/homepageImage/introduction/icon_network.png"></img>
    </div>
  
    <div class="Item">
        <div class="Description" id="description3">
            <span class="Subtitle">交易双方智能匹配推荐</span>
            <p class="Detail" id="detail3">我们通过金融机构借贷的智能推荐功能，实现金融机构和中小企业业务的信息对接和匹配。</p>
        </div>
        <img class="Logo" id="logo3" src="/static/homepageImage/introduction/icon_fit.png"></img>
    </div>
  
    <div class="Item">
        <div class="Description" id="description4">
            <span class="Subtitle">业务高效，规范</span>
            <p class="Detail" id="detail4">通过平台，中小企业基于他们各自的合作伙伴关系网络完成企业融资的相关业务，包括企业间借贷，企业间担保、企业贷款等，让中小企业更加规范，方便和高效率。</p>
        </div>
        <img class="Logo" id="logo4" src="/static/homepageImage/introduction/icon_efficiency.png"></img>
    </div> 
</div>
</template>

<script>
export default{
  methods: {
    goToLogin (mes) {
      this.$router.push(mes);
    }
  }
};
</script>


<style scoped>

.main{
    width: 100%;
    min-width: 1280px;
    height: auto;
}

.part1 {
  height: 200px;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 0px;
  text-align: center;
}

.head1 {
  height: 75px;
  width: 764px;
  font-size: 35px;
  margin-left: auto;
  margin-right: auto;
}

.head2 {
  height: 38px;
  width: 894px;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
}

.buttons {
  height: 52px;
  width: 452px;
  margin-top: 21px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0px;
  padding-right: 0px;
}

.singleButton {
  height: 52px;
  width: 190px;
  display: inline;
  border: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.singleButton{
    height: 52px;
    width: 190px;
    display: inline;
    border: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    cursor: pointer;
    }
#button1{
    background: url("/static/homepageImage/introduction/signin_financial.png");
    background-size: 190px 52px;
    background-repeat: no-repeat;
    margin-right: 54px;
}

#button2 {
  background: url("/static/homepageImage/introduction/signin_company.png");
  background-size: 190px 52px;
  background-repeat: no-repeat;
}

.bg {
  height: 404px;
  width: 1063px;
  background: url("/static/homepageImage/introduction/pic_main.png");
  background-size: 1063px 404px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}

.line {
  height: 3px;
  width: 100%;
  background-color: #f0e0b8;
  margin-bottom: 0px;
}

.Item{
    width: 940px;
    height: 278px;
    margin: 0 auto;
    text-align: left;
    color: #4b4b4b;
    padding: 1px;
}
.Description{
    display: inline-block;
    position: relative;
    width: 450px;
    height: 100%;
}
.Subtitle{
    font-size: 28px;
}
.Detail{
    font-size: 20px;
    position: relative;
    margin-top: 0px;
    top: 25px;
}
.Logo{
    position: relative;
    top: 50%;
}

#description1{
    float: left;
    padding-top: 80px;
}
#detail1 {
    height: 72px;
}
#logo1{
    float: left;
    height: 48.2%;
    width: 14.1%;
    margin-top: -6.7%;
    left: 20%;
}

#description2{
    float: right;
    padding-top: 30px;
}
#detail2 {
    height: 130px;
}
#logo2{
    float: right;
    width: 15.6%;
    height: 56.1%;
    right: 20%;
    margin-top: -7.8%;
}

#description3{
    float: left;
    padding-top: 80px;
}
#detail3 {
    height: 72px;
}
#logo3{
    float: left;
    width: 16.6%;
    height: 61.15%;
    margin-top: -8.5%;
    left: 20%;
}

#description4{
    float: right;
    padding-top: 30px;
}
#detail4 {
    height: 99px;
}
#logo4{
    float: right;
    width: 15.5%;
    height: 55.0%;
    margin-top: -7.6%;
    right: 20%;
}
</style>