<template>
  <div class="partner">
    <div class="leftTab">
      <div class="Tab" @click="goTo('friend')" :class="{TabChange: show.friend}" :style="{marginTop: '80px'}">
        <span><img src="/static/business/partner/icon_friend.png"></span>
      </div>
      <div class="leftLine"></div>
      <div class="Tab" @click="goTo('moments')" :class="{TabChange: show.moments}">
        <span><img src="/static/business/partner/icon_moments.png"></span>
      </div>
      <div class="leftLine"></div>         
      <div class="Tab" @click="goTo('news')" :class="{TabChange: show.news}">
        <span><img src="/static/business/partner/icon_news.png"></span>
      </div>
    </div>
    <div class="friend" v-if="show.friend">
      <span class="title">好友管理</span>
      <div class="rightContent">
        <div class="partLeft">
          <div>
            <img src="/static/business/partner/icon_search.png" class="search" @click="searchFriend">
            <input type="text" class="searchInput" v-model="searchContent" @keyup.enter="searchFriend" placeholder="请输入公司全称"> 
          </div>
          <div class="list">
             <mu-list>
              <li v-for="items in getFriends" style="list-style-type:none;">
                <mu-list-item @click="showMes(items._id)" :title=items.comName :key="items.comName" :describeText=items.comField :titleClass="{listFont: true}" :describeTextClass="{listFont1: true}">
                  <mu-avatar :src=items.url slot="leftAvatar" :size="30"/>
                </mu-list-item>
                <mu-divider/>
              </li>
            </mu-list> 
          </div>
        </div>
        <div class="partRight" v-if="initActive" :style="{marginTop : '100px'}">
          <span :style="{color: '#d6a12c', fontSize: '30px'}">智产智融</span>
          <div :style="{marginTop : '30px'}">
            <img src="/static/logo.png" :style="{width: '70px'}">
          </div>
        </div>
        <div class="partRight" v-if="searchActive === true && !initActive">
          <img src="/static/business/partner/boy.png">
          <div class="content">
            <span>{{searchResult.comName}}</span>
            <div class="contentMes">
              <div class="left">
                <p>成立时间：{{searchResult.comTime}}</p>
                <p>注册资本：{{searchResult.comCapital}}万元</p>
                <p>注册地址：{{searchResult.comRegistAddresss}}</p>
                <p>办公地址：{{searchResult.comWorkAddresss}}</p>
              </div>
              <div class="right">
                <p>公司电话：{{searchResult.comPhone}}</p>
                <p>所属行业：{{searchResult.comField}}</p>
                <p>主营产品：{{searchResult.comProduct}}</p>
                <p>简介：{{searchResult.comIntro}}</p>
              </div>
            </div>
          </div>
          <button class="addFriend" @click="addFriend">添加好友</button>
        </div>
        <div class="partRight" :style="{marginTop: '20px'}" v-if="searchActive === false && !initActive">
          <img src="/static/business/partner/boy.png">
          <div class="content">
            <span>{{comMes.comName}}</span>
            <div class="contentMes">
              <div class="left" :style="{marginTop : '20px'}">
                <p>成立时间：{{comMes.comTime}}</p>
                <p>注册资本：{{comMes.comCapital}}万元</p>
                <p>注册地址：{{comMes.comRegistAddresss}}</p>
                <p>办公地址：{{comMes.comWorkAddresss}}</p>
                <p>公司电话：{{comMes.comPhone}}</p>
                <p>所属行业：{{comMes.comField}}</p>
                <p>主营产品：{{comMes.comProduct}}</p>
                <p>简介：{{comMes.comIntro}}</p>
              </div>
              <div class="right" :style="{marginTop : '20px'}">
                <p :style="{color: '#d6a12c', fontSize: '18px'}">联系人信息</p>
                <p>姓名：{{comMes.contactName}}</p>
                <p>职务：{{comMes.contactJob}}</p>
                <p>手机：{{comMes.contactMobile}}</p>
                <p>电子邮箱：{{comMes.contactEmail}}</p>
                <p>QQ号码：{{comMes.contactQQ}}</p>
                <p>公司电话：{{comMes.contactPhone}}</p>
              </div>
            </div>
          </div>
          <button class="delFriend special" @click="delFriend(comMes._id)">删除好友</button>
          <button class="delFriend" @click="delFriend">交易记录</button>
        </div>
      </div>
    </div>
    <div class="moments" v-if="show.moments">
      <span class="title">伙伴动态</span>
      <div class="moments_list" v-for="item in getMomentsList">
        <img src="/static/business/partner/boy.png" :style="{marginTop: '4px'}">
        <span class="comName">{{item.comName}}</span>
        <span class="time">{{item.time}}</span>
        <mu-icon-menu slot="right" icon="expand_more" tooltip="操作" class="menu" :size="30">
          <mu-menu-item title="举报" />
          <mu-menu-item title="屏蔽" />
        </mu-icon-menu>
        <span class="mes">{{item.mes}}</span>
        <img class="contact" src="/static/homepageImage/tabs/notification.png" @click="goToFriend">
        <span class="contactMes" @click="goToFriend">与他联系</span>
        <img class="good" src="/static/business/partner/favour.png">
        <span class="goodMes">123</span>
        <div class="content">
          <div><span>融资金额:&emsp;{{item.max_amount}}万元</span><span :style="{position: 'absolute', left: '300px'}">融资用途:&emsp;{{item.reason}}</span></div>
          <div><span>提供利率:&emsp;{{item.max_rate}}%/年</span><span :style="{position: 'absolute', left: '300px'}">风险评级:&emsp;{{item.total_risk_factor}}</span></div>
          <span>融资期限:&emsp;{{item.loan_ddl}}个月</span>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div class="news" v-if="show.news">
      <span class="title">行业新闻</span>
      <div class="news_list">
        <div class="news_item" v-for="item in getNewsList">
          <p class="news_title" >{{ item.title }}</p>
          <div class="news_content">
            <img class="news_pic" v-bind:src="item.url"/>
            <p class="news_detail">{{item.detail}}</p>
            <p class="news_info">{{item.report}}&nbsp;{{item.date}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      searchContent: '',
      searchActive: false,
      initActive: true,
      searchResult: {
        _id: '',
        comName: '',
        comTime: '',
        comRegistAddresss: '',
        comWorkAddresss: '',
        comPhone: '',
        comField: '',
        comProduct: '',
        comIntro: '',
        comCapital: ''
      },
      comMes: {
      },
      show: {
        friend: true,
        moments: false,
        news: false
      },
      friends: [
      ],
      newsList: [
        {
          title: '余额宝二度下调额度降风险 顺应目前金融监管大势',
          url: '/static/business/partner/news/pic_first.png',
          detail: '自8月14日零点起，个人持有余额宝的最高额度调整为10万元，这是继5月27日余额宝下调至25万元后的二度下调。与此同时，有关货币基金新规将出台的传闻引发市场关注，这将对余额宝等货币基金造成怎样的影响？',
          report: '中国经营报',
          date: '08月19日'
        },
        {
          title: '好车e贷问题频发：贷款审批慢 抵押难解除强行逾期',
          url: '/static/business/partner/news/pic_second.png',
          detail: '近年，国内汽车金融逃入快速发展期。前不久，“爱分析” 通过调研和评价模型创作了“中国汽车金融企业估值榜”。上汽财务公司 “好车e货” 作为新车金融被纳入榜单之中，跃居第8位，被 “爱分析” 估值45亿元。但是在快速增长的背后，一些问题开始浮现。',
          report: '中国经营报',
          date: '08月19日'
        },
        {
          title: '中国经济增速是否企稳： 专家称不应过于关注短期增速',
          url: '/static/business/partner/news/pic_third.png',
          detail: '在一季度实现“开门红”后，二季度经济数据依然稳中向好。国家统计局公布的7月份宏观经济数据显示，工业、投资、服务业多项指标增速小幅回落，但稳中向好的势头不减。多位专家对第一财经表示，不应过于关注短期增速的水平。',
          report: '中国经营报',
          date: '08月19日'
        }
      ],
      momentsList: [
      ]
    };
  },
  async created () {
    this.initData();
  },
  methods: {
    tranDate (mes) {
      let res = new Date(mes);
      return res.toLocaleDateString() + ' ' + res.getHours() + ':' + res.getMinutes();
    },
    goToFriend () {
      for (var key in this.show) {
        this.show[key] = false;
      }
      this.show.friend = true;
    },
    async goTo (mes) {
      for (var key in this.show) {
        if (key.toString() === mes) {
          this.show[key] = true;
        } else {
          this.show[key] = false;
        }
      }
      if (mes === 'moments') {
        let res = await this.$http.get('/api/timeline?page=0&size=10');
        this.momentsList = [];
        for (let i = 0; i < res.data.length; i++) {
          let element = res.data[i];
          let result = {};
          if (element.type === 'Borrow') {
            let res1 = await this.$http.get('/api/loan/detail/borrow?id=' + element.info.borrowId);
            result.comName = res1.data.from.comName;
            result.time = this.tranDate(res1.data.date);
            result.mes = res1.data.city + res1.data.project + '项目计划借款' + res1.data.max_amount + '万元';
            result.max_amount = res1.data.max_amount;
            result.reason = res1.data.reason;
            result.max_rate = res1.data.max_rate;
            result.total_risk_factor = res1.data.total_risk_factor;
            result.loan_ddl = res1.data.loan_ddl;
            this.momentsList.push(result);
          }
        }
      }
    },
    async showMes (id) {
      this.initActive = false;
      this.searchActive = false;
      let res;
      try {
        res = await this.$http.get('/api/user/' + id);
        this.comMes = res.data;
        console.log(this.comMes);
      } catch (e) {

      }
    },
    async searchFriend () {
      let res = await this.$http.get('/api/user/search?q=' + this.searchContent);
      if (res.data) {
        this.searchActive = true;
        this.initActive = false;
        for (var key in this.searchResult) {
          this.searchResult[key] = res.data[key];
        }
      } else {
        this.$store.commit('info', '暂时无此公司记录');
      }
    },
    async addFriend () {
      for (let i = 0; i < this.friends.length; i++) {
        if (this.friends[i].comName === this.searchResult.comName) {
          this.$store.commit('info', '你们已经是好友关系');
          return;
        }
      }
      try {
        await this.$http.post('/api/friend/request?to=' + this.searchResult._id);
        this.$store.commit('info', '请求发送成功，等待回复!');
      } catch (e) {
        this.$store.commit('info', '已发送，请耐心等待回复');
      }
    },
    async delFriend (mes) {
      try {
        await this.$http.delete('/api/friend/' + mes);
        this.$store.commit('info', '成功删除好友');
        this.initData();
      } catch (e) {
        this.$store.commit('info', '网络错误');
      }
    },
    async initData () {
      let res;
      try {
        res = await this.$http.get('/api/friend/list');
        this.friends = res.data;
        for (let i = 0; i < this.friends.length; i++) {
          if (this.friends[i].comField.length > 10) {
            this.friends[i].comField = this.friends[i].comField.substr(0, 10);
          }
          this.friends[i].url = '/static/business/partner/boy.png';
        }
      } catch (e) {
        this.$store.commit('info', '用户未登录');
      }
    }
  },
  computed: {
    getFriends () {
      var data = this.friends;
      var that = this;
      if (this.searchContent) {
        data = data.filter(function (items) {
          console.log(items);
          return items['comName'].indexOf(that.searchContent) >= 0;
        });
      }
      return data;
    },
    getNewsList () {
      return this.newsList;
    },
    getMomentsList () {
      return this.momentsList;
    }
  }
};
</script>


<style lang="scss">
  .news{
    width: 788px;
    height: 702px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1px;
    text-align: left;
    .news_list{
      height: 537px;
      width: 100%;
      margin-top: 20px;
      .news_item{
        height: 179px;
        width: 100%;
        padding-top: 1px;
        .news_title{
          font-size: 18px;
          color: #4b4b4b;
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .news_content{
          height: 111px;
          width: 100%;
          font-size: 14px;
          margin-bottom: 0px;
          p{
            display: inline-block;
            margin-top: 0px;
            margin-bottom: 0px;
            float: right;
          }
          .news_pic{
            width: 174px;
            height: 111px;
            display: inline-block;
            float: left;
          }
          .news_detail{
            width: 582px;
            height: 96px;
            line-height: 24px;
            color: #727272;
          }
          .news_info{
            height: 15px;
            width: 582px;
            line-height: 15px;
            color: #d6a12c;
          }
        }
      }
    }
  }
  .moments {
    width: 788px;
    height: 702px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1px;
    text-align: left;
    .moments_list{
      position: relative;
      margin-top: 40px;
      margin-left: 10px;
      color: #4b4b4b;
      height: 190px;
      .comName{
        top: 5px;
        position: absolute;
        font-size: 15px;
        left: 55px;
      }
      .time{
        top: 28px;
        font-size: 11px;
        position: absolute;
        left: 55px;
      }
      .menu{
        position: absolute;
        right: 0;
      }
      .mes{
        position: absolute;
        top: 60px;
        left: 5px;
        font-size: 18px;
      }
      .line{
        width: 100%;
        height: 1px;
        background: #c2c2c2;
        position: absolute;
        bottom: 0;
      }
      .good{
        position: absolute;
        bottom: 106px;
        right:45px
      }
      .goodMes{
        position: absolute;
        bottom: 103px;
        right:16px;
        font-size: 13px;
      }
      .contact{
        cursor: pointer;
        position: absolute;
        bottom: 104px;
        right: 145px;
        width: 16px;
      }
      .contactMes{
        cursor: pointer;
        color: #4b4b4b;
        font-size: 13px;
        position: absolute;
        bottom: 103px;
        right: 90px;
      }
      .content{
        font-size: 14px;
        height: 84px;
        width: 100%;
        position: absolute;
        bottom: 10px;
        background: #f2f2f2;
        padding-left: 55px;
        padding-top: 10px;
      }
    }
  }
</style>

<style scoped lang="scss">
.title{
  color: #4b4b4b;
  top: 20px;
  font-size: 20px;
  position: relative;
  margin-left: 10px;
}
.leftTab{
  top: 0px;
  position: fixed;
  height: 100%;
  width: 80px;
  background: url("/static/business/partner/leftTab.png");
  background-size: 100% 100%;
  .Tab{
    cursor: pointer;
    width: 100%;
    height: 90px;
    text-align: center;
    display:table;
    span{
      display:table-cell;
      vertical-align:middle;
    }
  }
  .Tab:hover, .TabChange{
    background: url("/static/business/partner/hover.png");
    background-size: 100% 100%;
  }
  .leftLine{
    width: 66px;
    height: 6px;
    margin-left: 11px;
    background: url("/static/business/partner/leftLine.png");
  }
}
.friend{
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 796px;
}
.rightContent{
  position: relative;
  margin-top: 50px;
  height: 450px;
  width: 796px;
  background: url("/static/business/partner/bg_friend.png");
  background-size: 100% 100%;
  .partLeft {
    display: inline-block;
    position: relative;
    height: 450px;
    width: 195px;
    .search{
      margin-top: 15px;
      margin-left: 16px;
      cursor: pointer;
    }
    .searchInput{
      padding-left: 5px;
      font-size: 11px;
      position: absolute;
      right: 10px;
      top: 10.5px;
      border: 0;
      outline: none;
      width: 139px;
      height: 24px;
      background: url("/static/business/partner/bg_search.png");
    }
    .list{
      overflow-x: auto;
      margin-top: -2px;
      height: 400px;
      margin-left: 6px;
      margin-right: 2px;
    }
  }
  .partRight{
    position: absolute;
    display: inline-block;
    width: 590px;
    height: auto;
    text-align: center;
    margin-top:50px;
    img{
      width: 50px;
    }
    .content>span{
      color: #d6a12c;
      font-size: 25px;
      position: relative;
      top: 10px;
    }
    .contentMes {
      line-height: 1;
      width: 550px;
      margin: 0 auto;
      font-size: 15px;
      .left, .right{
        text-align: left;
        margin-top: 40px;
        padding-left: 35px;
        width: 50%;
      }
      .left{
        width: 51%;
        float: left;
      }
      .right{
        padding-left: 20px;
        width: 49%;
        float: right;
      }
    }
    .addFriend {
      position: absolute;
      bottom: -50px;
      left: 239px;
      width: 112px;
      height: 41px;
      border: 0;
      color: #d6a12c;
      font-size: 16px;
      outline: none;
      background: url("/static/business/partner/addFriend.png");
      background-size: 100% 100%;
    }
    .delFriend{
      border: 0;
      outline: none;
      color: #d6a12c;
      width: 100px;
      height: 37px;
      position: relative;
      right: 150px;
      top: 23px;
      font-size: 15px;
      background: url("/static/business/partner/addFriend.png");
      background-size: 100% 100%;
    }
    .special{
      margin-right: 50px;
    }
  }
}
</style>

<style>
.mu-menu-list, .mu-menu{
  width: 52px !important;
}
.mu-menu-list{
  padding: 0;
  background: url('/static/business/partner/frame.png');
  background-size: 100% 100%;
}
.mu-menu-item-wrapper{
  height: 30px;
  line-height: 30px;
}
.mu-menu-item-title{
  color: #4b4b4b;
  font-size: 13px;
}
.mu-menu-item{
  padding: 0 12px;
}
.mu-item{
  padding: 4px;
}
.mu-item-text {
  margin-top: 2px;
}
.mu-item.show-left{
  padding-left: 60px; 
}
.listFont{
  padding-top: 4px;
  font-size: 15px;
}
.listFont1{
  font-size: 10px;
}
.mu-item.has-avatar{
  min-height: 40px ;
}
</style>

