<template>
  <div class="borrow">
    <div class="leftTab">
      <div>
        <div class="Tab" @click="goTo('borrow')" :class="{TabChange: show.borrow}" :style="{marginTop: '80px'}">
          <span><img src="/static/business/borrow/icon_nav_borrow.png"></span>
        </div>
        <div class="leftLine"></div>
        <div class="Tab" @click="goTo('lend')" :class="{TabChange: show.lend}">
          <span><img src="/static/business/borrow/icon_nav_lend.png"></span>
        </div>
        <div class="leftLine"></div>
        <div class="Tab" @click="goTo('more')" :class="{TabChange: show.more}">
          <span><img src="/static/business/borrow/icon_icon_applying.png"></span>
        </div>
      </div>
    </div>
    <div class="borrowPart" v-if="show.borrow">
      <sub-borrow></sub-borrow>
    </div>
    <div class="lendPart" v-if="show.lend">
      <sub-lend></sub-lend>
    </div>
    <div class="morePart" v-if="show.more">
      <div class="content">
        <button class="button1" :class="{active: more.active1}" @click="button1">已发起的申请</button>
        <button class="button2" :class="{active: more.active2}" @click="button2">已收到的申请</button>
        <div class="moreContent">
          <span class="mes">深圳市立即项目借款20万</span>
          <span class="flag">已发布</span>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subBorrow from './subBorrow.vue';
import subLend from './subLend.vue';
import matchResult from '../result/matchResult.vue';
export default {
  props: ['active'],
  data () {
    return {
      show: {
        borrow: this.active,
        lend: false,
        more: !this.active
      },
      more: {
        active1: true,
        active2: false
      }
    };
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
    button1 () {
      this.more.active1 = true;
      this.more.active2 = false;
    },
    button2 () {
      this.more.active2 = true;
      this.more.active1 = false;
    }
  },
  components: {
    subBorrow,
    subLend,
    matchResult
  },
  created () {
    console.log(this.show);
  }
};
</script>


<style lang="scss" scoped>
.borrow {
  .leftTab {
    top: 0px;
    position: fixed;
    height: 100%;
    width: 80px;
    background: url("/static/business/partner/leftTab.png");
    background-size: 100% 100%;
    .Tab {
      cursor: pointer;
      width: 100%;
      height: 90px;
      text-align: center;
      display: table;
      span {
        display: table-cell;
        vertical-align: middle;
      }
    }
    .Tab:hover,
    .TabChange {
      background: url("/static/business/partner/hover.png");
      background-size: 100% 100%;
    }
    .leftLine {
      width: 66px;
      height: 6px;
      margin-left: 11px;
      background: url("/static/business/partner/leftLine.png");
    }
  }
  .borrowPart{
    width: 100%;
    min-width: 1300px;
    height: auto;
  }
  .lendPart{
    width: 100%;
    min-width: 1300px;
    height: auto;
  }
  .morePart{
    width: 100%;
    min-width: 1300px;
    height: auto;
    .content{
      margin: 30px auto;
      width: 800px;
      height: 550px;
      position: relative;
      .button1, .button2{
        width: 150px;
        height: 40px;
        position: absolute;
        color: #4b4b4b;
        cursor: pointer;
        font-size: 18px;
        top: -45px;
        background: white;
        outline: none;
        border-radius: 20px;
        border: 1px solid #4b4b4b;
      }
      .button1{
        left: 50px;   
      }
      .button2{
        right: 50px;
      }
      .active{
        color: #FFFFFF;
        border: 0;
        background: #d6a12c;
      }
      .moreContent{
        position: relative;
        padding-top: 30px;
        padding-left: 40px;
        margin-left: 100px;
        width: 750px;
        height: 475px;
        margin: 75px auto;
        background: url("/static/business/borrow/bg_list.png");
        background-size: 100% 100%;
        .mes{
          font-size: 17px;
        }
        .flag{
          font-size: 14px;
          position: absolute;
          right: 55px;
        }
        .line{
          height: 1.5px;
          width: 690px;
          margin-top: 12px;
          background: #d2dbec;
        }
      }
    }
  }
}
</style>
