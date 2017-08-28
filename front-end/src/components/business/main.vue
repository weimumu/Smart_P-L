<template>
  <div class="businessMain">
    <div class="header">
      <div class="tab">
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="合作伙伴" title="合作伙伴" @click="goToMain('active1')" :class="{colorActive: show.active1}"/>
          <i class="point"></i>
          <mu-tab value="借贷业务" title="借贷业务" @click="goToMain('active2')" :class="{colorActive: show.active2}"/>
          <i class="point" :style="{marginRight: '40px'}"></i>
          <img src="/static/logo.png" class="logo" @click="goToHome"> 
          <i class="point" :style="{marginLeft: '40px'}"></i>  
          <mu-tab value="债券交易" title="债券交易" @click="goToMain('active3')" :class="{colorActive: show.active3}"/>
          <i class="point"></i>
          <mu-tab value="担保业务" title="担保业务" @click="goToMain('active4')" :class="{colorActive: show.active4}"/>
        </mu-tabs>
      </div>
      <span class="comName" :style="{minWidth: '60px'}">{{comName}}</span>
      <img src="/static/homepageImage/tabs/notification.png" class="mesMain" @click="goToMes"> 
      <div class="bottomLine"></div>
    </div>
    <div v-if="messageActive === false">
      <div v-if="activeTab === '合作伙伴'">
        <partner></partner>
      </div>
      <div v-if="activeTab === '借贷业务'">
        <borrow></borrow>
      </div>
      <div v-if="activeTab === '债券交易'">
        <bondtrade></bondtrade>
      </div>
      <div v-if="activeTab === '担保业务'">
        <guarantee></guarantee>
      </div>
    </div>
    <div v-if="messageActive">
      <message @goToMes="goToMain"></message>
    </div>
  </div>
</template>

<script>
import message from '../message/messageMain';
import partner from './partner/partner';
import borrow from './borrow/borrow';
import guarantee from './guarantee/guarantee';
import bondtrade from './bondtrade/bondtrade';
export default {
  data () {
    return {
      activeTab: '合作伙伴',
      messageActive: false,
      show: {
        active1: true,
        active2: false,
        active3: false,
        active4: false
      }
    };
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val;
    },
    goToMain (mes) {
      this.messageActive = false;
      for (var key in this.show) {
        if (key.toString() === mes) {
          this.show[key] = true;
        } else {
          this.show[key] = false;
        }
      }
    },
    goToMes () {
      this.messageActive = true;
      for (var key in this.show) {
        this.show[key] = false;
      }
    },
    goToHome () {
      this.$router.push('/');
    }
  },
  computed: {
    comName () {
      if (this.$store.getters.getUserMes['comName'].length > 4) {
        return this.$store.getters.getUserMes['comName'].substr(0, 4) + '...';
      }
      return this.$store.getters.getUserMes['comName'];
    }
  },
  components: {
    partner,
    message,
    borrow,
    guarantee,
    bondtrade
  }
};
</script>


<style lang="scss" scoped>
.businessMain {
  min-width: 1100px;
  .header {
    z-index: 10;
    background: white;
    position: relative;
    width: 100%;
    height: 80px;
    .comName{
      font-size: 15px;
      color:#d6a12c;
      position: absolute;
      bottom: 30px;
      right: 65px;
      cursor: pointer; 
    }
    .mesMain{
      cursor: pointer;
      position: absolute;
      bottom: 30px;
      right: 30px; 
    }
    .tab {
      position: relative;
      top:15px;
      width: 700px;
      height: 60px;
      margin: 0 auto;
      .colorActive{
        color:#d6a12c;
      }
      .logo {
        cursor: pointer;
        width: 25px;
      }
      .point {
        background: #4b4b4b;
        width: 5px;
        height: 5px;
        border-radius: 100%;
      }
    }
    .bottomLine {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #d6a12c;
      height: 1.2px;
    }
  }
}
</style>

<style lang="scss">
.businessMain {
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
