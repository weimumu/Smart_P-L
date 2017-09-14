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
      <sub-borrow  @goToDetail="goToDetail"></sub-borrow>
    </div>
    <div class="lendPart" v-if="show.lend">
      <sub-lend @goToDetail="goToDetail"></sub-lend>
    </div>
    <div class="morePart" v-if="show.more">
      <sub-More :detail="detailActive" v-on:tranvalue="fatherValue"></sub-More>
    </div>
  </div>
</template>

<script>
import subBorrow from './subBorrow.vue';
import subLend from './subLend.vue';
import matchResult from '../result/matchResult.vue';
import subMore from './subMore';
export default {
  props: ['active'],
  data () {
    return {
      show: {
        borrow: this.active,
        lend: false,
        more: !this.active
      },
      detailActive: true
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
        if (key.toString() === 'more') {
          this.detailActive = true;
        }
      }
    },
    fatherValue (val) {
      this.detailActive = val;
    },
    goToDetail () {
      this.goTo('more');
    }
  },
  components: {
    subBorrow,
    subLend,
    matchResult,
    subMore
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
  }
}
</style>
