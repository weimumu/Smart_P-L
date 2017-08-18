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
  
    <div class="item">
        <div class="text-part">
            <div class="description" id="description1">
                <div class="subtitle" id="subtitle1"> 
                    <span>面向客户</span>
                </div>
                <div class="detail" id="detail1">
                    <p>“智产智融”平台面向两类客户，分别是中小企业和与企业借贷业务相关的金融机构。</p>
                </div>
            </div>
        </div>
        <div class="logo-part">
            <div class="logo" id="logo1"></div>
        </div>
    </div>
  
    <div class="item">
        <div class="logo-part">
            <div class="logo" id="logo2"></div>
        </div>
        <div class="text-part">
            <div class="description" id="description2">
                <div class="subtitle"> 
                    <span>企业合作伙伴关系网</span>
                </div>
                <div class="detail" id="detail2">
                    <p>平台在注册企业的用户基础上建立企业合作伙伴关系网，并基于合作伙伴关系网开展中小企业的债权融资业务和股权交易业务，为企业融资提供便捷的信息对接匹配和信用审核、风险评估服务。 </p>
                </div>
            </div>
        </div>
    </div>
  
    <div class="item">
        <div class="text-part">
            <div class="description" id="description3">
                <div class="subtitle"> 
                    <span>交易双方智能匹配推荐</span>
                </div>
                <div class="detail" id="detail3">
                    <p>我们通过金融机构借贷的智能推荐功能，实现金融机构和中小企业业务的信息对接和匹配。</p>
                </div>
            </div>
        </div>
        <div class="logo-part">
            <div class="logo" id="logo3"></div>
        </div>
    </div>
  
    <div class="item">
        <div class="logo-part">
            <div class="logo" id="logo4"></div>
        </div>
        <div class="text-part">
            <div class="description" id="description4">
                <div class="subtitle"> 
                    <span>业务高效，规范</span>
                </div>
                <div class="detail" id="detail4">
                    <p>通过平台，中小企业基于他们各自的合作伙伴关系网络完成企业融资的相关业务，包括企业间借贷，企业间担保、企业贷款等，让中小企业更加规范，方便和高效率。</p>
                </div>
            </div>
        </div>
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


.item {
  width: 100%;
  min-width: 1280px;
  height: 278px;
}
.text-part {
  float: left;
  display: inline;
  width: 50%;
  height: 100%;
  min-width: 640px;
}
.description {
  width: 500px;
  position: relative;
  top: 50%;
}
.subtitle{
    width: 100%;
    height: 50px;
    font-size: 28px;
    color: #4b4b4b;
    font-family: Hiragino Sans GB;
}
.detail {
  width: 100%;
  font-size: 20px;
  color: #4b4b4b;
  font-family: Hiragino Sans GB;
}
.logo-part {
  float: left;
  display: inline;
  width: 50%;
  height: 100%;
  min-width: 640px;
}
.logo{
    display: block;
    position: relative;
    top: 50%;
    margin-bottom: auto;
}

#description1{
    width: 500px;
    height: 172px;
    margin-top: -86px;
    float: right;
    margin-left: auto;
    margin-right: 100px;
}
#detail1 {
  height: 72px;
  margin-top: 50px;
}
#logo1{
    width: 141px;
    height: 134px;
    background: url("/static/homepageImage/icon_custom.png");
    background-size: 141px 134px;
    margin-top: -67px;
    margin-left: 230px;
    float: left;
}

#description2{
    width: 557px;
    height: 210px;
    margin-top: -110px;
    float: left;
    margin-left: 43px;
    margin-right: auto;
}
#detail2 {
  height: 130px;
  margin-top: 43px;
}
#logo2{
    width: 156px;
    height: 156px;
    background: url("/static/homepageImage/icon_network.png");
    background-size: 156px 156px;
    margin-top: -78px;
    margin-right: 260px;
    float: right;
}

#description3{
    width: 510px;
    height: 144px;
    margin-top: -72px;
    float: right;
    margin-right: 90px;
    margin-left: auto;
}
#detail3 {
  height: 72px;
  margin-top: 35px;
}
#logo3{
    width: 166px;
    height: 170px;
    background: url("/static/homepageImage/icon_fit.png");
    background-size: 166px 170px;
    margin-top: -85px;
    margin-left: 250px;
    float: left;
}

#description4{
    width: 585px;
    height: 188px;
    margin-top: -94px;
    float: left;
    margin-left: 15px;
    margin-right: auto;
}
#detail4 {
  height: 99px;
  margin-top: 39px;
}
#logo4{
    width: 155px;
    height: 153px;
    background: url("/static/homepageImage/icon_efficiency.png");
    background-size:  155px 153px;
    margin-top:-76px;
    margin-right: 260px;
    float: right;
}

.footer{
    text-align: center;
    height: 196px;
    width: 100%;
    background-color: #f0f0f0;
    padding-top: 74.5px;
}
.content{
    height: 47px;
    width: 1080px;
    margin-left: auto;
    margin-right: auto;
}
#symbol{
    display: inline;
    height: 47px;
    width: 146px;
    float: left;
}
#mLogo{
    display: inline;
    height: 100%;
    width: 28px;
    float: left;
    background: url("/static/logo.png") no-repeat;
    background-size: 28px 47px;
}
#mName{
    display: inline;
    width: 96px;
    height: auto;
    float: left;
    position: relative;
    left: 14px;
    top: 5.5px;
    font-size: 20px;
    color: #4b4b4b;
}
#contactMes{
    text-align: left;
    display: inline;
    float: left;
    position: relative;
    width: auto;
    height: auto;
    top: 5.5px;
    margin-left: 40px;
    font-size: 20px;
    color: #7c7c7c;
    font-family: PC Sans Regular,Hiragino Sans GB;
}
.accounts{
    display: inline;
    float: left;
    position: relative;
    width: auto;
    height: 100%;
    left: 100px;
}
#account1{
    display: inline;
    float: left;
    position: relative;
    width: 32px;
    height: 27px;
    background: url("/static/homepageImage/wechat.png") no-repeat;
    background-size: 32px 27px;
    top: 50%;
    margin-top: -13.5px;
}
#account2{
    display: inline;
    float: left;
    position: relative;
    width: 26px;
    height: 28px;
    background: url("/static/homepageImage/qq.png") no-repeat;
    background-size: 26px 28px;
    top: 50%;
    margin-left: 23px;
    margin-top: -14px;
}
#account3{
    display: inline;
    float: left;
    position: relative;
    width: 29px;
    height: 24px;
    background: url("/static/homepageImage/weibo.png") no-repeat;
    background-size: 29px 24px;
    top: 50%;
    margin-left: 23px;
    margin-top: -12px;
}

</style>