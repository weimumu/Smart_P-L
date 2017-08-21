<template>
  <div class="homepage">
    <div class="header">
      <div class="tab">
        <img src="/static/logo.png" class="logo">
        <span class="name">智产智融</span>
      </div>
      <div class="tab tabs" :class="{tabsChange: state}">
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="我的业务" title="我的业务" v-if="state === true" @click="goToBusiness"/>
          <i class="point" v-if="state === true"></i>
          <mu-tab value="平台简介" title="平台简介" />
          <i class="point"></i>
          <mu-tab value="信息披露" title="信息披露" />
          <i class="point"></i>
          <mu-tab value="关于我们" title="关于我们" />
          <i class="point"></i>
          <mu-tab value="与我合作" title="与我合作" />
        </mu-tabs>
      </div>
      <div class="tab">
        <button class="registButton" v-if="state === false" @click="goToRegist"></button>
        <div class="conName" @mouseenter="enter" @mouseleave="leave">
          <div v-if="state === true">{{comName}}</div>
          <mu-menu v-show="menuActive" class="menu">
            <mu-menu-item title="账户设置"/>
            <mu-menu-item title="退出登录" @click="logout"/>
          </mu-menu>
        </div>
        <div class="notification" v-if="state === true">
          <img src="/static/homepageImage/tabs/notification.png">
          <span>消息中心</span>
        </div>
      </div>
      <div class="bottomLine"></div>
    </div>
    <div v-if="activeTab === '平台简介'">
      <introduction></introduction>
    </div>
    <div v-if="activeTab === '信息披露'">
      <information></information>
    </div>
    <div v-if="activeTab === '关于我们'">
      <aboutus></aboutus>
    </div>
    <div v-if="activeTab === '与我合作'">
      <cooperate></cooperate>
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

<script>
import aboutus from './aboutus';
import information from './information';
import introduction from './introduction';
import cooperate from './cooperate';
export default {
  data () {
    return {
      activeTab: '平台简介',
      isActive: false,
      state: false,
      menuActive: true
    };
  },
  async created () {
    this.initData();
  },
  components: {
    introduction,
    cooperate,
    information,
    aboutus
  },
  methods: {
    async logout () {
      await this.$http.get('/api/user/logout');
      this.$router.push('/loginFac');
    },
    enter () {
      this.menuActive = true;
    },
    leave () {
      this.menuActive = false;
    },
    goToBusiness () {
      this.$router.push('/business');
    },
    handleTabChange (val) {
      this.activeTab = val;
    },
    goToRegist () {
      this.$router.push('/regist');
    },
    async initData () {
      let res;
      try {
        res = await this.$http.get('/api/user/self');
        this.state = true;
        console.log(res.data);
        this.$store.commit('user', res.data);
        console.log(this.$store.getters.getUserMes);
        // this.comName = res.data.comName;
      } catch (e) {
        this.state = false;
      }
    }
  },
  computed: {
    comName () {
      return this.$store.getters.getUserMes['comName'].substr(0, 4);
    }
  }
};
</script>


<style lang="scss" scoped>
.homepage {
  .header {
    position: relative;
    width: 100%;
    height: 80px;
  }

  .tab {
    display: inline-block;
  }

  .tabs {
    width: 440px;
    position: relative;
    left: 75px;
    top: 3.5px;
  }

  .tabsChange {
    width: 550px;
    position: relative;
    left: 75px;
    top: 3.5px;
  }
  
  .logo {
    left: 40px;
    top: 17px;
    position: relative;
    width: 25px;
  }

  .name {
    top: 5.5px;
    position: relative;
    left: 55px;
    font-size: 21px;
  }

  .point {
    background: #4b4b4b;
    width: 5px;
    height: 5px;
    border-radius: 100%;
  }

  .bottomLine {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #d6a12c;
    height: 1.5px;
  }

  .registButton {
    width: 68px;
    height: 29.7px;
    border: 0;
    outline: none;
    background: url("/static/homepageImage/tabs/buttonRegist.png");
    background-size: 100% 100%;
    position: absolute;
    right: 50px;
    bottom: 26px;
    cursor: pointer;
  }
  .conName{
    position: absolute;
    top: 29px;
    right: 130px;
    font-size: 15px;
    color:#d6a12c;
    cursor: pointer;
    span{
      position: absolute;
    }
    .menu{
      margin-top: 3px;
      position: relative;
    }
  }
  .notification{
    position: absolute;
    right: 20px;
    bottom: 30px;
    cursor: pointer;
  }
  .notification>span{
    font-size: 15px;
    color:#434343;
  }
  .notification>img{
    height: 19px;
    position: relative;
    margin-right: 5px;
    top: 5px;
  }
}
.homepage{
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
}
</style>

<style lang="scss">
.homepage {
  .mu-menu-item{
    padding: 0;
  }
  .mu-menu-item-wrapper{
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  .mu-menu-item-title{
    font-size: 11px;
    color: #ffffff;
    text-align: center;
    padding-left: 8px;
  }
  .mu-menu, .mu-menu-list{
    width: 60px !important;
  }
  .mu-menu-list{
    background: #d6a12c;
    padding: 4px 0;
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
