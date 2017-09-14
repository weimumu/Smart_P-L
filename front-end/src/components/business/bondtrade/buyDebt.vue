<template>
  <div class="sellDebt">
    <div class="header">
      <button class="button2" :style="{marginLeft: '40px'}">债券名称</button>
      <button class="button2 comName">融资企业</button>
      <button class="button2 comName">对应公司</button>
      <button class="button1 comName" ref="button2" @click="toggle2" :style="{cursor: 'pointer'}">债券期限</button>
      <mu-popover :trigger="trigger2" :open="open2" @close="handleClose2">
        <mu-menu>
        <mu-menu-item title="半年内" @click="handleClose2num(6)"/>
        <mu-menu-item title="一年内" @click="handleClose2num(12)"/>
        <mu-menu-item title="三年内" @click="handleClose2num(36)"/>
        <mu-menu-item title="五年内" @click="handleClose2num(60)"/>
        <mu-menu-item title="全部" @click="handleClose2num('')"/>
      </mu-menu>
      </mu-popover>
      <button class="button1 other" ref="button1" @click="toggle1" :style="{cursor: 'pointer'}">债券金额</button>
      <mu-popover :trigger="trigger1" :open="open1" @close="handleClose1">
        <mu-menu>
        <mu-menu-item title="50000" @click="handleClose1num(5)"/>
        <mu-menu-item title="100000" @click="handleClose1num(10)"/>
        <mu-menu-item title="200000" @click="handleClose1num(20)"/>
        <mu-menu-item title="500000" @click="handleClose1num(50)"/>
        <mu-menu-item title="1000000" @click="handleClose1num(100)"/>
        <mu-menu-item title="3000000" @click="handleClose1num(300)"/>
        <mu-menu-item title="全部" @click="handleClose1num('')"/>
      </mu-menu>
      </mu-popover>
      <button class="button1 other" ref="button" @click="toggle" :style="{cursor: 'pointer'}">出售价格</button>
      <mu-popover :trigger="trigger" :open="open" @close="handleClose">
        <mu-menu>
        <mu-menu-item title="50000" @click="handleClosenum(5)"/>
        <mu-menu-item title="100000" @click="handleClosenum(10)"/>
        <mu-menu-item title="200000" @click="handleClosenum(20)"/>
        <mu-menu-item title="500000" @click="handleClosenum(50)"/>
        <mu-menu-item title="1000000" @click="handleClosenum(100)"/>
        <mu-menu-item title="3000000" @click="handleClosenum(300)"/>
        <mu-menu-item title="全部" @click="handleClosenum('')"/>
      </mu-menu>
      </mu-popover>
      <div class="content" v-for="item in getList">
        <img src="/static/business/bondtrade/contact.png" class="mes" :style="{cursor: 'pointer'}" @click="moreClick">
        <div class="comNameMes mes">{{item.loan_owner}}</div>
        <div class="comNameMes mes" :style="{width: '145px'}">{{item.company_lend}}</div>
        <div class="comNameMes mes" :style="{width: '145px'}">{{item.company_borrow}}</div>
        <div class="comNameMes mes" :style="{width: '115px'}">{{item.loan_ddl}}个月</div>
        <div class="comNameMes mes" :style="{width: '115px'}">{{item.amount}}0000元</div>
        <div class="comNameMes mes" :style="{width: '115px'}">{{item.loan_price}}0000元</div>
        <button class="buy" @click="moreClick">购买</button>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      trigger: null,
      open1: false,
      trigger1: null,
      open2: false,
      trigger2: null,
      list: [],
      value: '',
      value1: '',
      value2: ''
    };
  },
  async created () {
    this.initData();
  },
  mounted () {
    this.trigger = this.$refs.button;
    this.trigger1 = this.$refs.button1;
    this.trigger2 = this.$refs.button2;
  },
  methods: {
    toggle () {
      this.open = !this.open;
    },
    handleClose (e) {
      this.open = false;
    },
    handleClosenum (e) {
      this.open = false;
      this.value = e;
    },
    toggle1 () {
      this.open1 = !this.open1;
    },
    handleClose1 (e) {
      this.open1 = false;
    },
    handleClose1num (e) {
      this.open1 = false;
      this.value1 = e;
    },
    toggle2 () {
      this.open2 = !this.open2;
    },
    handleClose2 (e) {
      this.open2 = false;
    },
    handleClose2num (e) {
      this.open2 = false;
      this.value2 = e;
    },
    async initData () {
      let res = await this.$http.get('/api/bondtrade/all?page=0&size=10');
      for (let i = 0; i < res.data.length; i++) {
        this.list.push(res.data[i]);
      }
    },
    moreClick () {
      this.$store.commit('info', '此功能待开发');
    }
  },
  computed: {
    getList () {
      var data = this.list;
      let that = this;
      if (this.value2 !== '') {
        data = data.filter(function (items) {
          return items.loan_ddl <= that.value2;
        });
      }
      if (this.value1 !== '') {
        data = data.filter(function (items) {
          return items.amount <= that.value1;
        });
      }
      if (this.value !== '') {
        data = data.filter(function (items) {
          return items.loan_price <= that.value;
        });
      }
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.sellDebt {
  font-size: 15px;
  margin: 90px auto;
  width: 870px;
  height: 100px;
  .header{
    height: 40px;
    width: 100%;
    .button1, .button2{
      width: 92px;
      height: 40px;
      border: 0;
      text-align: left;
      color: #4b4b4b;
      padding-left: 10px;
      outline: none;
      background: url('/static/business/bondtrade/drop.png');
      background-size: 100% 100%;
    }
    .button2{
      text-align: center;
      background: url('/static/business/bondtrade/text_box.png');
      background-size: 100% 100%;
    }
    .comName{
      margin-left: 45px;
    }
    .other{
      margin-left: 24px;
    }
    .content{
      margin-top: 20px;
      .mes{
        display: inline-block;
      }
      img{
        position: relative;
        top: 2px;
      }
      .comNameMes{
        width: 120px;
        text-align: center;
        position: relative;
        bottom: 3px;
      }
      .buy{
        cursor: pointer;
        border: 0;
        outline: none;
        width: 54px;
        height: 24px;
        position: relative;
        bottom: 5px;
        border-radius: 13px;
        color: #FFFFFF;
        font-size: 13px;
        background: #d6a12c;
      }
      .line{
      height: 1.0px;
      width: 86%;
      margin-left: 45px;
      margin-top: 3px;
      background: #c0c0c0;
    }
    }
  }
}
</style>

<style>
.mu-menu-list, .mu-menu{
  width: 90px !important;
}
.mu-menu-list{
  padding: 0;
  background: rgb(248, 251, 254);
}
.mu-menu-item-wrapper{
  height: 30px;
  line-height: 30px;
}
.mu-menu-item-title{
  color: #4b4b4b;
  font-size: 13px;
}
.mu-menu-item{
  text-align: center;
  padding: 0 16px;
}
.mu-item{
  padding: 0px;
}
.mu-item-text {
  margin-top: 2px;
}
.mu-item.show-left{
  padding-left: 60px; 
}
.listFont{
  padding-top: 4px;
  font-size: 15px;
}
.listFont1{
  font-size: 10px;
}
.mu-item.has-avatar{
  min-height: 40px ;
}
</style>
