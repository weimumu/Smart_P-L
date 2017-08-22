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
                <p>注册资本：200美元</p>
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
                <p>注册资本：200美元</p>
                <p>注册地址：{{comMes.comRegistAddresss}}</p>
                <p>办公地址：{{comMes.comWorkAddresss}}</p>
                <p>公司电话：{{comMes.comPhone}}</p>
                <p>所属行业：{{comMes.comField}}</p>
                <p>主营产品：{{comMes.comProduct}}</p>
                <p>简介：{{comMes.comIntro}}</p>
              </div>
              <div class="right" :style="{marginTop : '20px'}">
                <p :style="{color: '#d6a12c', fontSize: '18px'}">联系人信息</p>
                <p>姓名：{{searchResult.comPhone}}</p>
                <p>职务：{{searchResult.comField}}</p>
                <p>手机：{{searchResult.comProduct}}</p>
                <p>电子邮箱：{{searchResult.comProduct}}</p>
                <p>QQ号码：{{searchResult.comIntro}}</p>
                <p>公司电话：{{searchResult.comIntro}}</p>
              </div>
            </div>
          </div>
          <button class="delFriend special" @click="delFriend(comMes._id)">删除好友</button>
          <button class="delFriend" @click="delFriend">交易记录</button>
        </div>
      </div>
    </div>
    <div class="moments" v-if="show.moments">
      伙伴动态
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
        comIntro: ''
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
      ]
    };
  },
  async created () {
    this.initData();
  },
  methods: {
    goTo (mes) {
      for (var key in this.show) {
        if (key.toString() === mes) {
          this.show[key] = true;
        } else {
          this.show[key] = false;
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
      if (res.data.length) {
        this.searchActive = true;
        this.initActive = false;
        for (var key in this.searchResult) {
          this.searchResult[key] = res.data[0][key];
        }
      } else {
        this.$store.commit('info', '暂时无此公司记录');
      }
    },
    async addFriend () {
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
          this.friends[i].url = '/static/business/partner/boy.png';
        }
      } catch (e) {

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
  width: 88px;
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
      width: 500px;
      margin: 0 auto;
      font-size: 15px;
      .left, .right{
        text-align: left;
        margin-top: 40px;
        padding-left: 45px;
        width: 50%;
      }
      .left{
        float: left;
      }
      .right{
        float: right;
      }
    }
    .addFriend, .delFriend{
      width: 112px;
      height: 41px;
      border: 0;
      color: #d6a12c;
      font-size: 16px;
      position: relative;
      top: 25px;
      outline: none;
      background: url("/static/business/partner/addFriend.png");
      background-size: 100% 100%;
    }
    .delFriend{
      width: 100px;
      height: 37px;
      position: relative;
      right: 150px;
      top: 25px;
      font-size: 15px;
    }
    .special{
      margin-right: 50px;
    }
  }
}
</style>

<style>
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

