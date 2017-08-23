<template>
  <div class="messageMain">
    <div class="header">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <i class="point" :style="{marginLeft: '80px'}"></i>
        <mu-tab value="好友申请" title="好友申请" />
        <i class="point"></i>
        <mu-tab value="业务进程" title="业务进程" />
        <i class="point" :style="{marginRight: '80px'}"></i>
      </mu-tabs>
      <div class="bottomLine"></div>
    </div>
    <img class="img1" src="/static/message/friend/bg_icon1.png">
    <div class="content">
        <li style="list-style-type:none;" v-for="items in friendsList">
          <mu-list-item :title=items.from.comName :titleClass="{listFont: true}" >
            <mu-avatar src="/static/business/partner/boy.png" slot="leftAvatar" />
            <span slot="describe" v-if="items.type === 'FriendRequest-Received'" :style="{fontSize: '13px', paddingTop: '10px'}">
              {{items.from.comField}}&nbsp;&nbsp;地址: {{items.from.comWorkAddresss}} &nbsp;&nbsp;电话: {{items.from.comPhone}}
            </span>
            <button slot="right" class="contract" v-if="items.type === 'FriendRequest-Accepted' || items.type === 'FriendRequest-Received&Accepted'" @click="goToCon">与他联系</button>
            <button slot="right" class="mesButton" @click="agree(items._id)" v-if="items.type === 'FriendRequest-Received'">同意</button>
            <button slot="right" class="mesButton" @click="refuse(items._id)" v-if="items.type === 'FriendRequest-Received'">拒绝</button>
            <span class="time" slot="right">{{tranDate(items.date)}}</span>
          </mu-list-item>
          <mu-divider class="line" />
        </li>
    </div>
    <img class="img2" src="/static/message/friend/bg_icon2.png">
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: '好友申请',
      friendsList: []
    };
  },
  async created () {
    this.initData();
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val;
    },
    goToCon () {
      console.log('weimumu');
      this.$emit('goToMes');
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
      console.log(this.friendsList);
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
  .content {
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
