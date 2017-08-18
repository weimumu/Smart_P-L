<template>
  <div class="cooperate">
    <img class="img" src="/static/homepageImage/cooperate/pic.png">
    <span class="mainMes">针对金融机构的业务介绍</span>
    <div class="middle">
      <div class="fourPart">
        <div class="part">
          <img src="/static/homepageImage/cooperate/icon1.png">
          <span>简化放贷过程</span>
        </div>
        <div class="part">
          <img src="/static/homepageImage/cooperate/icon2.png">
          <span>参与企业债权收购</span>
        </div>
        <div class="part">
          <img src="/static/homepageImage/cooperate/icon3.png">
          <span>获得更多客户来源</span>
        </div>
        <div class="part" :style="{width: '20%'}">
          <img src="/static/homepageImage/cooperate/icon4.png">
          <span>提高知名度</span>
        </div>
      </div>
      <p class="introMes">&nbsp;&nbsp;&nbsp;&nbsp;本平台主要与金融机构达成合作伙伴关系。合作的金融机构可以通过平台对于向本机构贷款的企业进行企业信用审核，简化放贷流程；同时，平台还可以与金融机构合作，建立较为规范的企业担保放贷体系；最后，金融机构还可以参与企业债权的收购业务。</p>
      <div class="ad">
        <div class="adPart">
          <p class="left">覆盖整个珠三角地区</p>
          <p class="left">企业客户量庞大</p>
        </div>
        <img src="/static/homepageImage/cooperate/line.png">
        <div class="adPart">
          <p>平台属于互联网+主流</p>
          <p>线上线下零距离对接</p>
        </div>
        <img src="/static/homepageImage/cooperate/line.png">
        <div class="adPart widthPart">
          <p class="left left1">基于企业合作伙伴关系网络</p>
          <p class="left left1">金融风险小</p>
        </div>
      </div>
      <p class="friend">合作伙伴展示</p>
      <div>
        <img src="/static/homepageImage/cooperate/cooperation.png">
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.cooperate {
  position: relative;
  text-align: center;
  .img {
    width: 100%;
  }
  .mainMes {
    position: relative;
    font-size: 43px;
    color: #ffffff;
    bottom: 350px;
  }
  .middle {
    width: 1150px;
    height: 650px;
    margin: 0 auto;
    .fourPart {
      width: 100%;
    }
    .part {
      display: inline-block;
      width: 25%;
      height: 100%;
    }
    .part>span {
      position: relative;
      color: #4b4b4b;
      font-size: 18px;
      bottom: 20px;
      left: 15px;
    }
    .introMes {
      text-align: left;
      padding: 35px 70px;
      color: #4b4b4b;
      font-size: 18px;
    }
    .ad {
      position: relative;
      left: 5%;
      width: 92%;
      height: 100px;
      background: #f8f8f8;
      .adPart {
        width: 31%;
        height: 100%;
        display: inline-block;
        p {
          padding-top: 5px;
          font-size: 18px;
          line-height: 10px;
          color: #4b4b4b;
        }
        p.left {
          text-align: left;
          padding-left: 40px;
        }
        p.left1 {
          padding-left: 50px;
        }
      }
      .widthPart {
        width: 34%;
      }
      img {
        position: relative;
      }
    }
    .friend{
      font-size: 30px;
      color: #4b4b4b;
    }
  }
}
</style>
