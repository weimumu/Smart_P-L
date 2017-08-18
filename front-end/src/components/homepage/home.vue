<template>
  <div class="homepage">
    <div class="header">
      <div class="tab">
        <img src="/static/logo.png" class="logo">
        <span class="name">智产智融</span>
      </div>
      <div class="tab tabs" :class="{tabsChange: state}">
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="我的业务" title="我的业务" v-if="state === true" />
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
        <span class="conName" v-if="state === true">{{comName}}</span>
        <div class="notification" v-if="state === true">
          <img src="/static/homepageImage/tabs/notification.png">
          <span>消息中心</span>
        </div>
      </div>
      <div class="bottomLine"></div>
    </div>
    <div v-if="activeTab === '平台简介'">
      <intro></intro>
    </div>
    <div v-if="activeTab === '信息披露'">
      <h2>Tab Two</h2>
      <p>
        这是第二个 tab
      </p>
    </div>
    <div v-if="activeTab === '关于我们'">
      <h2>Tab Three</h2>
      <p>
        这是第三个 tab
      </p>
    </div>
    <div v-if="activeTab === '与我合作'">
      <cooperate></cooperate>
    </div>
  </div>
</template>

<script>
import intro from './intro';
import cooperate from './cooperate';
export default {
  data () {
    return {
      activeTab: '平台简介',
      isActive: false,
      state: false,
      comName: ''
    };
  },
  async created () {
    this.initData();
  },
  components: {
    intro,
    cooperate
  },
  methods: {
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
        this.comName = res.data.comName;
      } catch (e) {
        this.state = false;
      }
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
    right: 130px;
    bottom: 29px;
    font-size: 15px;
    color:#d6a12c;
    cursor: pointer;
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
</style>

<style lang="scss">
.homepage {
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
