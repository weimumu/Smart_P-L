<template>
  <div class="guarantee">
    <div class="leftTab">
      <div>
        <div class="Tab" @click="goTo('borrow')" :class="{TabChange: show.borrow}" :style="{marginTop: '80px'}">
          <span><img src="/static/business/bondtrade/icon_creditsell.png"></span>
        </div>
        <div class="leftLine"></div>
        <div class="Tab" @click="goTo('lend')" :class="{TabChange: show.lend}">
          <span><img src="/static/business/bondtrade/icon_transactionmarket.png"></span>
        </div>
        <div class="leftLine"></div>
        <div class="Tab" @click="goTo('more')" :class="{TabChange: show.more}">
          <span><img src="/static/business/bondtrade/icon_icon_applying.png"></span>
        </div>
      </div>
    </div>
    <div class="sellPart" v-if="show.borrow">
      <sell-debt></sell-debt>
    </div>
    <div class="buyPart" v-if="show.lend">
      <buy-debt></buy-debt>
    </div>
    <div class="morePart" v-if="show.more">
    </div>
  </div>
</template>

<script>
import sellDebt from './sellDebt.vue';
import buyDebt from './buyDebt';
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
      if (mes === 'more') {
        this.$store.commit('info', '此功能类似借贷详情界面，待开发');
      }
    }
  },
  components: {
    sellDebt,
    buyDebt
  }
};
</script>


<style lang="scss" scoped>
.guarantee {
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
  .sellPart{
    width: 100%;
    min-width: 1300px;
    height: auto;
  }
  .buyPart{
    width: 100%;
    min-width: 1300px;
    height: auto;
  }
}
</style>
