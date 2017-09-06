<template>
  <div class="messageMain">
    <div class="header">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <i class="point" :style="{marginLeft: '80px'}"></i>
        <mu-tab value="好友申请" title="好友申请" />
        <i class="point"></i>
        <mu-tab value="业务进程" title="业务进程" @click="initBusiness"/>
        <i class="point" :style="{marginRight: '80px'}"></i>
      </mu-tabs>
      <div class="bottomLine"></div>
    </div>
    <img class="img1" src="/static/message/friend/bg_icon1.png">
    <div class="content" v-if="activeTab === '好友申请'">
        <li style="list-style-type:none;" v-for="items in friendsList">
          <mu-list-item :title=items.from.comName :titleClass="{listFont: true}" >
            <mu-avatar src="/static/business/partner/boy.png" slot="leftAvatar" />
            <span slot="describe" v-if="items.type === 'FriendRequest-Received'" :style="{fontSize: '13px', paddingTop: '10px'}">
              {{items.from.comField}}&nbsp;&nbsp;地址: {{items.from.comWorkAddresss}} &nbsp;&nbsp;电话: {{items.from.comPhone}}
            </span>
            <button slot="right" class="contract" v-if="items.type === 'FriendRequest-Accepted' || items.type === 'FriendRequest-Received&Accepted'" @click="goToCon('active1')">与他联系</button>
            <button slot="right" class="mesButton" @click="agree(items._id)" v-if="items.type === 'FriendRequest-Received'">同意</button>
            <button slot="right" class="mesButton" @click="refuse(items._id)" v-if="items.type === 'FriendRequest-Received'">拒绝</button>
            <span class="time" slot="right">{{tranDate(items.date)}}</span>
          </mu-list-item>
          <mu-divider class="line" />
        </li>
    </div>
    <div class="business" v-if="activeTab === '业务进程'">
      <div :style="{marginTop: '20px', position: 'relative'}" v-for="items in business">
        <span class="Mainmes">借贷申请</span>
        <div>
          <span class="mes">{{items.mes}}</span>
        </div>
        <div class="mesContent" v-if="items.type !== 'BorrowContract-Received' && items.type !== 'BorrowContract-Received&Accepted' && items.type !== 'BorrowContract-Accepted'">
          <div class="spa"><span>借款公司:&nbsp;&nbsp;{{items.comName}}</span></div>
          <div class="spa"><span>借款额度:&nbsp;&nbsp;{{items.max_amount}}</span></div>
          <div class="spa"><span>提供利息:&nbsp;&nbsp;{{items.max_rate}}</span></div>
          <div class="spa"><span>借款期限:&nbsp;&nbsp;{{items.loan_ddl}}</span></div>
          <button class="button1" @click="goToCon('active2')">查看详情</button>
          <button class="button2" @click="goToCon('active1')">与他联系</button>
        </div>
        <button class="button1 special1" @click="goToCon('active2')" v-if="items.type === 'BorrowContract-Received' || items.type === 'BorrowContract-Received&Accepted' || items.type === 'BorrowContract-Accepted'">查看详情</button>
        <button class="button2 special2" @click="goToCon('active1')" v-if="items.type === 'BorrowContract-Received' || items.type === 'BorrowContract-Received&Accepted' || items.type === 'BorrowContract-Accepted'">与他联系</button>
        <span class="time">{{items.time}}</span>
        <div class="line"></div>
      </div>
    </div>
    <img class="img2" src="/static/message/friend/bg_icon2.png">
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: '好友申请',
      friendsList: [],
      business: []
    };
  },
  async created () {
    this.initData();
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val;
    },
    goToCon (mes) {
      this.$emit('goToMes', mes);
    },
    async agree (mes) {
      try {
        await this.$http.post('/api/friend/accept/' + mes);
        this.$store.commit('info', '已同意添加对方为企业好友');
        this.initData();
      } catch (e) {
        this.$store.commit('info', '你已经处理该请求');
      }
    },
    async refuse (mes) {
      try {
        await this.$http.post('/api/friend/refuse/' + mes);
        this.$store.commit('info', '已拒绝对方好友申请');
        this.initData();
      } catch (e) {
        this.$store.commit('info', '你已经处理该请求');
      }
    },
    async initData () {
      let res = await this.$http.get('/api/message/friend?size=10&page=0');
      this.friendsList = res.data;
      for (let i = 0; i < this.friendsList.length; i++) {
        if (this.friendsList[i].type === 'FriendRequest-Received') {
          this.friendsList[i].from.comName += '请求添加您为企业好友';
        } else if (this.friendsList[i].type === 'FriendRequest-Accepted') {
          this.friendsList[i].from.comName += '同意并添加您为企业好友';
        } else if (this.friendsList[i].type === 'FriendRequest-Refused') {
          this.friendsList[i].from.comName += '拒绝您的好友申请';
        } else if (this.friendsList[i].type === 'FriendRequest-Received&Accepted') {
          this.friendsList[i].from.comName = '您已同意' + this.friendsList[i].from.comName + '的好友申请';
        } else if (this.friendsList[i].type === 'FriendRequest-Received&Refused') {
          this.friendsList[i].from.comName = '您已拒绝' + this.friendsList[i].from.comName + '的好友申请';
        }
      }
    },
    async initBusiness () {
      this.business = [];
      let res = await this.$http.get('/api/loan/messages');
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].type === 'BorrowRequest-Received' || res.data[i].type === 'BorrowRequest-Received&Accepted') {
          let res1 = await this.$http.get('/api/loan/detail/borrow?id=' + res.data[i].info.transaction.borrow);
          let message = {
            comName: res1.data.from.comName,
            max_amount: res1.data.max_amount + '万元',
            max_rate: res1.data.max_rate + '%/年',
            loan_ddl: res1.data.loan_ddl + '月',
            type: res.data[i].type,
            time: this.tranDate(res.data[i].date)
          };
          if (res.data[i].type === 'BorrowRequest-Received') {
            message.mes = '您收到一封与您合作借贷业务的申请';
          } else {
            message.mes = '您已同意对方借贷业务的申请';
          }
          this.business.push(message);
        } else if (res.data[i].type === 'BorrowRequest-Accepted') {
          let res1 = await this.$http.get('/api/loan/detail/borrow?id=' + res.data[i].info.transaction.borrow);
          let message = {
            comName: res1.data.from.comName,
            max_amount: res1.data.max_amount + '万元',
            max_rate: res1.data.max_rate + '%/年',
            loan_ddl: res1.data.loan_ddl + '月',
            type: res.data[i].type,
            time: this.tranDate(res.data[i].date)
          };
          let res2 = await this.$http.get('/api/loan/detail/lend?id=' + res.data[i].info.transaction.lend);
          message.mes = res2.data.from.comName + '已同意您的借款申请，查看详情后可发起合同确认';
          this.business.push(message);
        } else if (res.data[i].type === 'BorrowContract-Received' || res.data[i].type === 'BorrowContract-Received&Accepted') {
          let res1 = await this.$http.get('/api/loan/detail/borrow?id=' + res.data[i].info.transaction.borrow);
          let message = {
            comName: res1.data.from.comName,
            max_amount: res1.data.max_amount + '万元',
            max_rate: res1.data.max_rate + '%/年',
            loan_ddl: res1.data.loan_ddl + '月',
            type: res.data[i].type,
            time: this.tranDate(res.data[i].date)
          };
          if (res.data[i].type === 'BorrowContract-Received') {
            message.mes = res1.data.from.comName + '向你发起合同确认，查看后可确认合同';
          } else {
            message.mes = '您已确认' + res1.data.from.comName + '发起的合同，交易正式开始';
          }
          this.business.push(message);
        } else if (res.data[i].type === 'BorrowContract-Accepted') {
          let res1 = await this.$http.get('/api/loan/detail/lend?id=' + res.data[i].info.transaction.lend);
          let message = {
            type: res.data[i].type,
            time: this.tranDate(res.data[i].date)
          };
          message.mes = res1.data.from.comName + '已经确认您的合同，交易正式开始';
          this.business.push(message);
        }
      }
    },
    tranDate (mes) {
      let res = new Date(mes);
      return res.toLocaleDateString() + ' ' + res.getHours() + ':' + res.getMinutes();
    }
  }
};
</script>


<style lang="scss" scoped>
.messageMain {
  .header {
    width: 100%;
    height: 53px;
    .point {
      background: #4b4b4b;
      width: 5px;
      height: 5px;
      border-radius: 100%;
    }
    .bottomLine {
      position: absolute;
      bottom: 2;
      width: 100%;
      background: #d6a12c;
      height: 1.2px;
    }
  }
  .content{
    padding: 20px 40px;
    position: fixed;
    left: 18%;
    width: 64%;
    height: 100%;
    margin-top: 25px;
    background: url("/static/message/friend/bg_rec.png");
    background-size: 100% 100%;
    .contract {
      top: 8px;
      position: relative;
      color: #4b4b4b;
      font-size: 16px;
      width: 90px;
      height: 37px;
      border: 0;
      outline: none;
      background: url("/static/message/friend/button_contact.png");
      background-size: 100% 100%;
    }
    .line {
      background: #d6a12c;
    }
    .mesButton {
      position: relative;
      margin-left: 10px;
      top: 5px;
      border: 0;
      outline: none;
      color: #4b4b4b;
      font-size: 16px;
      background: url("/static/message/friend/button_contact.png");
      background-size: 100% 100%;
      width: 65px;
    }
    .time{
      font-size: 10px;
      color: #4b4b4b;
      position: absolute;
      bottom: -15px;
      right: -25px;
      width: 110px;
    }
  }
  .business{
    padding: 20px 40px;
    position: fixed;
    left: 18%;
    width: 64%;
    height: 100%;
    margin-top: 25px;
    background: url("/static/message/friend/bg_rec.png");
    background-size: 100% 100%;
    .Mainmes{
      margin-left: 25px;
      color: #d6a12c;
      font-size: 20px;
    }
    .mes{
      font-size: 16px;
      margin-left: 25px;
      color: #4b4b4b;
    }
    .mesContent {
      font-size: 14px;
      padding-top: 9px;
      padding-left: 20px;
      position: relative;
      margin: 0 auto;
      background: #f2f2f2;
      height: 110px;
      width: 93%;
      margin-left: 25px;
      margin-top: 10px;
      .spa{
        color: #4b4b4b;
        padding-bottom: 2px;
      }
      .button1{
        top: 15px;
        position: absolute;
        right: 40px;
      }
      .button2 {
        top: 47px;
        position: absolute;
        right: 40px;
      }
    }
    .button1, .button2{
      font-size: 12px;
      outline: none;
      width: 68px;
      height: 25px;
      color: #4b4b4b;
      background: #f2f2f2;
      border-radius: 10px;
      border: 1px solid #4b4b4b;
    }
    .special1{
      top: 20px;
      background: white;
      position: absolute;
      right: 25px;
    }
    .special2 {
      top: 20px;
      background: white;
      position: absolute;
      right: 105px;
    }
    .line{
      height: 0.8px;
      background: #d6a12c;
      width: 95%;
      margin-top: 18px;
      margin-left: 15px;
    }
    .time{
      position: absolute;
      bottom: 2px;
      font-size: 10px;
      right: 25px;
    }
  }
  .img1 {
    position: fixed;
    top: 270px;
    left: 10%;
  }
  .img2 {
    position: fixed;
    bottom: 100px;
    right: 10%;
  }
}
</style>

<style lang="scss">
.messageMain {
  .mu-list {
    height: 100px;
  }
  .mu-item-right {
    width: auto !important;
  }
  .mu-item.has-avatar {
    min-height: 90px;
  }
  .listFont {
    font-size: 18px;
    color: #d6a12c;
    padding-bottom: 5px;
  }
  .mu-item.show-left {
    padding-left: 93px;
  }
  .mu-tab-link {
    color: #434343;
    font-size: 16px;
    -webkit-appearance: none;
  }

  .mu-tab-link:hover {
    color: #d6a12c !important;
    -webkit-appearance: none;
  }

  .mu-tabs {
    background: white;
  }

  .mu-tab-link-highlight {
    background-color: white;
  }
}
</style>
