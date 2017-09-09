<template>
<div>
  <div class="content" v-show="detailActive === true">
    <button class="button1" :class="{active: more.active1}" @click="button1">我的业务申请</button>
    <button class="button2" :class="{active: more.active2}" @click="button2">已收到的申请</button>
    <div class="moreContent">
      <div v-for="item in getMyMes" :style="{marginTop: '15px', cursor: 'pointer'}" v-if="more.active1" @click="twoCom(item.type, item.lendId, item.borrowId, item.messageId)">
        <span class="mes">{{item.mes}}</span>
        <span class="time">{{item.time}}</span>
        <span class="flag">{{item.flag}}</span>
        <div class="line"></div>
      </div>
      <div v-for="item in getOtherMes" :style="{marginTop: '15px', cursor: 'pointer'}" v-if="more.active2" @click="readMore(item.type, item.borrowId, item.lendId, item.messageId)">
        <span class="mes">{{item.mes}}</span>
        <span class="time">{{item.time}}</span>
        <span class="flag">{{item.flag}}</span>
        <div class="line"></div>
      </div>
    </div>
  </div>
  <div class="detail" v-if="detailActive === false">
    <span class="title" v-if="getMainMes.type !== 'GuranteeContract-Received&Accepted' && getMainMes.type !== 'GuranteeContract-Accepted'">担保申请</span>
    <div class="buttonDiv">
      <button class="agree" @click="agree()" v-if="getMainMes.type === 'GuranteeRequest-Received'">同意</button>
      <button class="disagree" v-if="getMainMes.type === 'GuranteeRequest-Received'">拒绝</button>
      <button class="contact" v-if="getMainMes.type == 'GuranteeRequest-Accepted'" @click="contactPost">发起合同确认</button>
      <button class="contact contact1" v-if="getMainMes.type == 'GuranteeContract-Received'" @click="comPost">确认合同</button>
      <button class="contact" v-if="getMainMes.type === 'Publish-GuranteeSeek'">查看匹配结果</button>
      <div class="bargain" v-if="getMainMes.type === 'GuranteeContract-Received&Accepted' || getMainMes.type === 'GuranteeContract-Accepted'">交易正在进行</div>
    </div>
    <div class="line"></div>
    <div class="mainMes">
      <div><span>{{getMainMes.title}}</span></div>
      <div><span>借款主体&nbsp;&nbsp;&nbsp;{{getMainMes.body}}</span></div>
      <div v-if="getMainMes.type !== 'GuranteeRequest-Accepted' && getMainMes.type !== 'GuranteeContract-Received' && getMainMes.type !== 'GuranteeContract-Received&Accepted' && getMainMes.type !== 'GuranteeContract-Accepted'"><span>注册地址&nbsp;&nbsp;&nbsp;{{getMainMes.comRegistAddresss}}</span></div>
      <div><span>所属行业&nbsp;&nbsp;&nbsp;{{getMainMes.comField}}</span></div>
      <div><span>申请担保的贷款利率&nbsp;&nbsp;&nbsp;{{getMainMes.max_rate}}</span></div>
      <div><span>申请担保的贷款期限&nbsp;&nbsp;&nbsp;{{getMainMes.loan_ddl}}</span></div>
      <div><span>担保费用&nbsp;&nbsp;&nbsp;{{getMainMes.cost}}</span></div>
      <div><span>担保方式&nbsp;&nbsp;&nbsp;{{getMainMes.guarantee_way}}</span></div>
      <div v-if="getMainMes.riskType !== ''"><span>抵押物类型及市值&nbsp;&nbsp;&nbsp;{{getMainMes.riskType}}</span></div>
      <div v-if="getMainMes.type !== 'GuranteeRequest-Accepted' && getMainMes.type !== 'GuranteeContract-Received' && getMainMes.type !== 'BorrowContract-Received&Accepted' && getMainMes.type !== 'GuranteeContract-Accepted'"><span>担保贷款项目简述&nbsp;&nbsp;&nbsp;{{getMainMes.reason}}</span></div>
      <div v-if="getMainMes.type === 'GuranteeRequest-Sent'"><span>对方愿意提供担保额度&nbsp;&nbsp;&nbsp;{{getMainMes.othermount}}</span></div>
      <div v-if="getMainMes.type === 'GuranteeRequest-Sent'"><span>愿意提供担保期限&nbsp;&nbsp;&nbsp;{{getMainMes.otherddl}}</span></div>
      <div v-if="getMainMes.type === 'GuranteeRequest-Accepted' || getMainMes.type === 'GuranteeContract-Received' || getMainMes.type === 'GuranteeContract-Received&Accepted' || getMainMes.type === 'GuranteeContract-Accepted'"><span>&nbsp;&nbsp;&nbsp;</span></div>
      <div v-if="getMainMes.type === 'GuranteeRequest-Accepted' || getMainMes.type === 'GuranteeContract-Received' || getMainMes.type === 'GuranteeContract-Received&Accepted'|| getMainMes.type === 'GuranteeContract-Accepted'"><span>贷款主体&nbsp;&nbsp;&nbsp;{{getMainMes.company}}</span></div>
      <div v-if="getMainMes.type === 'GuranteeRequest-Accepted' || getMainMes.type === 'GuranteeContract-Received' || getMainMes.type === 'GuranteeContract-Received&Accepted'|| getMainMes.type === 'GuranteeContract-Accepted'"><span>所属行业&nbsp;&nbsp;&nbsp;{{getMainMes.companyAddresss}}</span></div>
    </div>
  </div>
</div>
</template>

<script>
  export default{
    props: ['detail'],
    data () {
      return {
        more: {
          active1: true,
          active2: false
        },
        detailActive: this.detail,
        simpleMes: [],
        otherMes: [],
        mainMes: {
          title: '',
          body: '',
          comRegistAddresss: '',
          comField: '',
          reason: '',
          max_rate: '',
          loan_ddl: '',
          messageId: '',
          company: '',
          companyAddresss: ''
        }
      };
    },
    async created () {
      this.initData();
    },
    watch: {
      detail (val) {
        this.detailActive = val;
      },
      detailActive (val) {
        this.$emit('tranvalue', val);
        this.initData();
      }
    },
    methods: {
      button1 () {
        this.more.active1 = true;
        this.more.active2 = false;
      },
      button2 () {
        this.more.active2 = true;
        this.more.active1 = false;
      },
      tranDate (mes) {
        let res = new Date(mes);
        return res.toLocaleDateString() + ' ' + res.getHours() + ':' + res.getMinutes();
      },
      async initData () {
        this.simpleMes = [];
        this.otherMes = [];
        let res = await this.$http.get('/api/gurantee/messages');
        let that = this;
        for (let i = 0; i < res.data.length; i++) {
          let element = res.data[i];
          let result = {};
          if (element.type === 'Publish-GuranteeOffer') {
            let res1 = await that.$http.get('/api/gurantee/detail/offer?id=' + element.info.offerId);
            result.mes = '愿意提供担保的贷款额度' + res1.data.amount_gurantee + '万元 担保期限' + res1.data.loan_ddl + '个月';
            result.flag = '已发布';
            result.lendId = element.info.offerId;
            result.time = that.tranDate(element.date);
            result.type = element.type;
            that.simpleMes.push(result);
          } else if (element.type === 'Publish-GuranteeSeek') {
            let res1 = await that.$http.get('/api/gurantee/detail/seek?id=' + element.info.seekId);
            result.mes = res1.data.city + res1.data.project + '项目借款' + res1.data.amount_gurantee + '万元寻求担保';
            result.flag = '已发布';
            result.borrowId = element.info.seekId;
            result.time = that.tranDate(element.date);
            result.type = element.type;
            that.simpleMes.push(result);
          } else if (element.type === 'GuranteeRequest-Sent') {
            let res1 = await that.$http.get('/api/gurantee/detail/offer?id=' + element.info.transaction.offer);
            result.mes = '向' + res1.data.from.comName + '发起担保申请';
            result.flag = '已申请';
            result.lendId = element.info.transaction.offer;
            result.borrowId = element.info.transaction.seek;
            result.time = that.tranDate(element.date);
            result.type = element.type;
            that.simpleMes.push(result);
          } else if (element.type === 'GuranteeRequest-Received' || element.type === 'GuranteeRequest-Received&Accepted') {
            let res1 = await that.$http.get('/api/gurantee/detail/seek?id=' + element.info.transaction.seek);
            result.mes = res1.data.from.comName + res1.data.city + res1.data.project + '项目借款' + res1.data.amount_gurantee + '万元向您寻求担保';
            if (element.type === 'GuranteeRequest-Received') {
              result.flag = '未通过';
            } else {
              result.flag = '已通过未确认';
            }
            result.borrowId = element.info.transaction.seek;
            result.time = that.tranDate(element.date);
            result.type = element.type;
            result.messageId = element._id;
            that.otherMes.push(result);
          } else if (element.type === 'GuranteeRequest-Accepted') {
            let res1 = await that.$http.get('/api/gurantee/detail/offer?id=' + element.info.transaction.offer);
            result.mes = res1.data.from.comName + '已同意您的担保申请';
            result.time = that.tranDate(element.date);
            result.flag = '已通过未确认';
            result.lendId = element.info.transaction.offer;
            result.borrowId = element.info.transaction.seek;
            result.type = element.type;
            result.messageId = element._id;
            that.simpleMes.push(result);
          } else if (element.type === 'GuranteeContract-Received' || element.type === 'GuranteeContract-Received&Accepted') {
            let res1 = await that.$http.get('/api/gurantee/detail/seek?id=' + element.info.transaction.seek);
            result.mes = res1.data.from.comName + res1.data.city + res1.data.project + '项目向您发起担保合同确认';
            result.lendId = element.info.transaction.offer;
            result.borrowId = element.info.transaction.seek;
            if (element.type === 'GuranteeContract-Received') {
              result.flag = '合同待确认';
            } else {
              result.flag = '合同已确认';
              result.mes = '您已确认' + res1.data.from.comName + res1.data.city + res1.data.project + '发起的担保合同，交易正式开始';
            }
            result.type = element.type;
            result.messageId = element._id;
            result.time = that.tranDate(element.date);
            that.otherMes.push(result);
          } else if (element.type === 'GuranteeContract-Accepted') {
            let res1 = await that.$http.get('/api/gurantee/detail/offer?id=' + element.info.transaction.offer);
            result.mes = res1.data.from.comName + '已确认你发起的担保合同，交易正式开始';
            result.lendId = element.info.transaction.offer;
            result.borrowId = element.info.transaction.seek;
            result.flag = '合同已确认';
            result.type = element.type;
            result.messageId = element._id;
            result.time = that.tranDate(element.date);
            that.simpleMes.push(result);
          }
        }
      },
      async readMore (type, borrowId, lendId, messageId) {
        if (type === 'GuranteeContract-Received' || type === 'GuranteeContract-Received&Accepted' ||
        type === 'GuranteeRequest-Received' || type === 'GuranteeRequest-Received&Accepted') {
          this.detailActive = false;
          let res = await this.$http.get('/api/gurantee/detail/seek?id=' + borrowId);
          this.mainMes.title = res.data.city + res.data.project + '项目借款' + res.data.amount_gurantee + '万元寻求担保';
          this.mainMes.body = res.data.from.comName;
          this.mainMes.comRegistAddresss = res.data.from.comRegistAddresss;
          this.mainMes.comField = res.data.from.comField;
          this.mainMes.reason = res.data.other_detail;
          this.mainMes.max_rate = res.data.rate_gurantee + '%/年';
          this.mainMes.loan_ddl = res.data.loan_ddl + '个月内';
          this.mainMes.messageId = messageId;
          this.mainMes.type = type;
          this.mainMes.cost = res.data.cost + '万元';
          this.mainMes.riskType = '';
          if (res.data.mortgage) {
            if (res.data.mortgage_fixed) {
              this.mainMes.riskType = '固定资产';
            } else {
              this.mainMes.riskType = '其他资产';
            }
            this.mainMes.riskType += res.data.mortgage + '万元';
          }
          if (res.data.guarantee_way === 'single') {
            this.mainMes.guarantee_way = '单企业担保';
          } else {
            this.mainMes.guarantee_way = '多企业担保';
          }
        }
        if (type === 'Publish-Borrow') {
          this.detailActive = false;
          let res = await this.$http.get('/api/loan/detail/borrow?id=' + borrowId);
          this.mainMes.title = res.data.city + res.data.project + '项目借款' + res.data.max_amount + '万元';
          this.mainMes.body = res.data.from.comName;
          this.mainMes.comRegistAddresss = res.data.from.comRegistAddresss;
          this.mainMes.comField = res.data.from.comField;
          this.mainMes.reason = res.data.reason;
          this.mainMes.max_rate = res.data.max_rate + '%/年';
          this.mainMes.loan_ddl = res.data.loan_ddl + '月内';
          this.mainMes.messageId = messageId;
          this.mainMes.type = type;
        } else if (type === 'GuranteeContract-Received' || type === 'GuranteeContract-Received&Accepted') {
          let res1 = await this.$http.get('/api/gurantee/detail/offer?id=' + lendId);
          this.mainMes.company = res1.data.from.comName;
          this.mainMes.companyAddresss = res1.data.from.comField;
        }
      },
      async agree () {
        console.log(this.mainMes.messageId);
        try {
          await this.$http.post('/api/gurantee/accept-request', {
            messageId: this.mainMes.messageId
          });
          this.$store.commit('info', '已同意对方的申请');
        } catch (e) {
          this.$store.commit('info', '您已经处理改请求，请耐心等待回复');
        }
      },
      async twoCom (type, lendId, borrowId, messageId) {
        if (type === 'GuranteeRequest-Accepted' || type === 'Publish-GuranteeSeek' || type === 'GuranteeRequest-Sent' || type === 'GuranteeContract-Accepted') {
          this.detailActive = false;
          let res = await this.$http.get('/api/gurantee/detail/seek?id=' + borrowId);
          let res1;
          if (type === 'GuranteeRequest-Sent') {
            res1 = await this.$http.get('/api/gurantee/detail/offer?id=' + lendId);
          }
          console.log(res.data);
          this.mainMes.title = res.data.city + res.data.project + '项目借款' + res.data.amount_gurantee + '万元寻求担保';
          this.mainMes.body = res.data.from.comName;
          this.mainMes.comRegistAddresss = res.data.from.comRegistAddresss;
          this.mainMes.comField = res.data.from.comField;
          this.mainMes.reason = res.data.other_detail;
          this.mainMes.max_rate = res.data.rate_gurantee + '%/年';
          this.mainMes.loan_ddl = res.data.loan_ddl + '个月内';
          this.mainMes.messageId = messageId;
          this.mainMes.type = type;
          this.mainMes.cost = res.data.cost + '万元';
          this.mainMes.riskType = '';
          if (res.data.mortgage) {
            if (res.data.mortgage_fixed) {
              this.mainMes.riskType = '固定资产';
            } else {
              this.mainMes.riskType = '其他资产';
            }
            this.mainMes.riskType += res.data.mortgage + '万元';
          }
          if (res.data.guarantee_way === 'single') {
            this.mainMes.guarantee_way = '单企业担保';
          } else {
            this.mainMes.guarantee_way = '多企业担保';
          }
          if (type === 'GuranteeRequest-Sent') {
            this.mainMes.othermount = res1.data.amount_gurantee + '万元';
            this.mainMes.otherddl = res1.data.loan_ddl + '个月';
            console.log(this.mainMes);
          }
        }
        if (type === 'GuranteeRequest-Accepted' || type === 'GuranteeContract-Accepted') {
          let res1 = await this.$http.get('/api/gurantee/detail/offer?id=' + lendId);
          this.mainMes.company = res1.data.from.comName;
          this.mainMes.companyAddresss = res1.data.from.comField;
        }
      },
      async contactPost () {
        try {
          await this.$http.post('/api/gurantee/transaction', {
            messageId: this.mainMes.messageId
          });
          this.$store.commit('info', '已发起合同确认，请耐心等待回复');
        } catch (e) {
          this.$store.commit('info', '您已经处理改请求，请耐心等待回复');
        }
      },
      async comPost () {
        console.log(this.mainMes.messageId);
        try {
          await this.$http.post('/api/gurantee/accept-transaction', {
            messageId: this.mainMes.messageId
          });
          this.$store.commit('info', '合同已确认，交易正是达成');
        } catch (e) {
          this.$store.commit('info', '您已经处理改请求，无需重复操作');
        }
      }
    },
    computed: {
      getMyMes () {
        return this.simpleMes;
      },
      getOtherMes () {
        return this.otherMes;
      },
      getMainMes () {
        return this.mainMes;
      }
    }
  };
</script>

<style lang="scss" scoped>
.content {
  margin: 30px auto;
  width: 800px;
  height: 550px;
  position: relative;
  .button1,
  .button2 {
    width: 150px;
    height: 40px;
    position: absolute;
    color: #4b4b4b;
    cursor: pointer;
    font-size: 18px;
    top: -50px;
    background: white;
    outline: none;
    border-radius: 20px;
    border: 1px solid #4b4b4b;
  }
  .button1 {
    left: 50px;
  }
  .button2 {
    right: 50px;
  }
  .active {
    color: #FFFFFF;
    border: 0;
    background: #d6a12c;
  }
  .moreContent {
    position: relative;
    padding-top: 14px;
    padding-left: 40px;
    margin-left: 100px;
    width: 750px;
    height: 475px;
    margin: 75px auto;
    background: url("/static/business/borrow/bg_list.png");
    background-size: 100% 100%;
    .mes {
      font-size: 15px;
    }
    .flag {
      font-size: 12px;
      position: absolute;
      right: 40px;
    }
    .time{
      padding-top: 3px;
      font-size: 12px;
      position: absolute;
      right: 135px;
    }
    .line {
      height: 1.5px;
      width: 690px;
      margin-top: 14px;
      background: #d2dbec;
    }
  }
}
.detail{
  text-align: center;
  padding-top: 15px;
  .title{
    font-size: 25px;
    color: #d6a12c;
  }
  .buttonDiv{
    margin: 10px auto;
    width: 160px;
    height: 33px;
    position: relative;
    .agree, .disagree{
      outline: line;
      border: 1px solid #4b4b4b;
      width: 62px;
      height: 100%;
      border-radius: 17px;
      background: white;
      position: absolute;
    }
    .agree{
      left: 0;
    }
    .disagree{
      right: 0;
    }
    .contact{
      outline: line;
      border: 1px solid #4b4b4b;
      width: 120px;
      height: 100%;
      border-radius: 17px;
      background: white;
    }
    .contact1{
       width: 100px;
    }
    .bargain {
      font-size: 25px;
    }
  }
  .line{
    width: 100%;
    height: 1px;
    margin-top: 30px;
    background: #d2dbec;
  }
  .mainMes{
    width: 609px;
    height: 420px;
    margin: 20px auto;
    background: url("/static/business/borrow/bg_info.png");
    background-size: 100% 100%;
    padding-top: 50px;
    text-align: left;
    padding-left: 160px;
    div{
      margin-top: 4px;
      span{
        font-size: 15px;
      }
    }
  }
}
</style>

