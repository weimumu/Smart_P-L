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
        <button class="singleButton" id="button1">
        </button>
        <button class="singleButton" id="button2">
        </button>
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
        <img class="Logo" id="logo1" src="/static/homepageImage/icon_custom.png">
    </div>
  
    <div class="Item">    
        <div class="Description" id="description2">
            <span class="Subtitle">企业合作伙伴关系网</span>
            <p class="Detail" id="detail2">平台在注册企业的用户基础上建立企业合作伙伴关系网，并基于合作伙伴关系网开展中小企业的债权融资业务和股权交易业务，为企业融资提供便捷的信息对接匹配和信用审核、风险评估服务。 </p>
        </div>
        <img class="Logo" id="logo2" src="/static/homepageImage/icon_network.png"></img>
    </div>
  
    <div class="Item">
        <div class="Description" id="description3">
            <span class="Subtitle">交易双方智能匹配推荐</span>
            <p class="Detail" id="detail3">我们通过金融机构借贷的智能推荐功能，实现金融机构和中小企业业务的信息对接和匹配。</p>
        </div>
        <img class="Logo" id="logo3" src="/static/homepageImage/icon_fit.png"></img>
    </div>
  
    <div class="Item">
        <div class="Description" id="description4">
            <span class="Subtitle">业务高效，规范</span>
            <p class="Detail" id="detail4">通过平台，中小企业基于他们各自的合作伙伴关系网络完成企业融资的相关业务，包括企业间借贷，企业间担保、企业贷款等，让中小企业更加规范，方便和高效率。</p>
        </div>
        <img class="Logo" id="logo4" src="/static/homepageImage/icon_efficiency.png"></img>
    </div>

    <div class="footer">
        <div class="content">
            <div id="symbol">
                <div id="mLogo"></div>
                <div id="mName">智产智融</div>
            </div>
            <div id="contactMes">@Smart P&L&nbsp;&nbsp;mail: 17748392@qq.com&nbsp;&nbsp;address: 广州科技园105号</div>
            <div class="accounts">
                <div id="account1"></div>
                <div id="account2"></div>
                <div id="account3"></div>
            </div>
        </div>
    </div>
    
</div>
</template>




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
    background: url("/static/homepageImage/signin_financial.png");
    background-size: 190px 52px;
    background-repeat: no-repeat;
    margin-right: 54px;
}

#button2 {
  background: url("/static/homepageImage/signin_company.png");
  background-size: 190px 52px;
  background-repeat: no-repeat;
}

.bg {
  height: 404px;
  width: 1063px;
  background: url("/static/homepageImage/pic_main.png");
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
    width: 1000px;
    height: 278px;
    margin: 0 auto;
    text-align: left;
    color: #4b4b4b;
    padding: 1px;
}
.Description{
    display: inline-block;
    position: relative;
    width: 490px;
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

.footer{
    text-align: center;
    height: 60px;
    width: 100%;
    background-color: #f0f0f0;
    padding-top: 1px;
}
.content{
    height: 37.6px;
    width: 864px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 11.2px;
}
#symbol{
    display: inline-block;
    height: 100%;
    width: 13.5%;
    float: left;
}
#mLogo{
    display: inline-block;
    height: 100%;
    width: 19.2%;
    float: left;
    background: url("/static/logo.png") no-repeat;
    background-size: 100% 100%;
}
#mName{
    display: inline-block;
    width: 65.8%;
    height: auto;
    float: left;
    position: relative;
    left: 9.6%;
    top: 11.9%;
    font-size: 18px;
    color: #4b4b4b;
}
#contactMes{
    text-align: left;
    display: inline-block;
    float: left;
    position: relative;
    width: auto;
    height: auto;
    top: 11.9%;
    margin-left: 3.7%;
    font-size: 18px;
    color: #7c7c7c;
    font-family: PC Sans Regular,Hiragino Sans GB;
}
.accounts{
    display: inline-block;
    float: left;
    position: relative;
    width: 12.4%;
    height: 100%;
    left: 9.26%;
}
#account1{
    display: inline-block;
    float: left;
    position: relative;
    width: 24.06%;
    height: 57.4%;
    background: url("/static/homepageImage/wechat.png") no-repeat;
    background-size: 100% 100%;
    top: 50%;
    margin-top: -10.15%;
}
#account2{
    display: inline-block;
    float: left;
    position: relative;
    width: 19.54%;
    height: 59.57%;
    background: url("/static/homepageImage/qq.png") no-repeat;
    background-size: 100% 100%;
    top: 50%;
    margin-left: 17.29%;
    margin-top: -10.52%;
}
#account3{
    display: inline-block;
    float: left;
    position: relative;
    width: 21.8%;
    height: 51.06%;
    background: url("/static/homepageImage/weibo.png") no-repeat;
    background-size: 100% 100%;
    top: 50%;
    margin-left: 17.29%;
    margin-top: -9.02%;
}

</style>