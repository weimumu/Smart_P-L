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
      <span :style="{marginLeft: '100px'}">more</span>
    </div>
  </div>
</template>

<script>
import subBorrow from './subBorrow.vue';
import subLend from './subLend.vue';
export default {
  data () {
    return {
      show: {
        borrow: true,
        lend: false,
        more: false
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
    }
  },
  components: {
    subBorrow,
    subLend
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
    height: 1400px;
  }
  .lendPart{
    width: 1200px;
    height: 1500px;
    margin-left: 80px;
  }
}
</style>
