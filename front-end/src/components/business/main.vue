<template>
  <div class="businessMain">
    <div class="header">
      <div class="tab">
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="合作伙伴" title="合作伙伴" @click="goToMain"/>
          <i class="point"></i>
          <mu-tab value="借贷业务" title="借贷业务" @click="goToMain"/>
          <i class="point" :style="{marginRight: '40px'}"></i>
          <img src="/static/logo.png" class="logo" @click="goToHome"> 
          <i class="point" :style="{marginLeft: '40px'}"></i>  
          <mu-tab value="债券交易" title="债券交易" @click="goToMain"/>
          <i class="point"></i>
          <mu-tab value="担保业务" title="担保业务" @click="goToMain"/>
        </mu-tabs>
      </div>
      <span class="comName">{{comName}}</span>
      <img src="/static/homepageImage/tabs/notification.png" class="mesMain" @click="goToMes"> 
      <div class="bottomLine"></div>
    </div>
    <div v-if="messageActive === false">
      <div v-if="activeTab === '合作伙伴'">
        <partner></partner>
      </div>
      <div v-if="activeTab === '借贷业务'">
      
      </div>
      <div v-if="activeTab === '债券交易'">
     
      </div>
      <div v-if="activeTab === '担保业务'">
      </div>
    </div>
    <div v-if="messageActive">
      <message @goToMes="goToMain"></message>
    </div>
  </div>
</template>

<script>
import message from '../message/messageMain';
import partner from './partner.vue';
export default {
  data () {
    return {
      activeTab: '合作伙伴',
      messageActive: false
    };
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val;
    },
    goToMain () {
      this.messageActive = false;
    },
    goToMes () {
      this.messageActive = true;
    },
    goToHome () {
      this.$router.push('/');
    }
  },
  computed: {
    comName () {
      return this.$store.getters.getUserMes['comName'].substr(0, 4);
    }
  },
  components: {
    partner,
    message
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
