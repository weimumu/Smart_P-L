<template>
<div class="sub_borrow">
    <div class="leftpart">
        <div  class="info">
            <div class="info1">
                <img class="info_pic" src="/static/business/borrow/borrowPart/info.png"/>
                <span class="info_text">请填写借款信息，获得借款匹配企业推荐结果</span>
            </div>
            <img class="dividing" src="/static/business/borrow/borrowPart/dividingline_write.png"/>
            <div class="abstract">
                <input class="msg_item" id="input_city" type="text" v-model="message.city"></input>
                <span>市</span>
                <input class="msg_item" id="input_project" type="text" v-model="message.project"></input>
                <span>项目借款</span>
                <input class="msg_item" id="input_amount" type="number" v-model.number="message.amount"></input>
                <span>万人民币</span>
            </div>
            <div class="info_basic"><span>借款主体：&nbsp;&nbsp;&nbsp;{{basicInfo.comName}}</span></div>
            <div class="info_basic"><span>注册地址：&nbsp;&nbsp;&nbsp;{{basicInfo.comRegistAddresss}}</span></div>
            <div class="info_basic"><span>所属行业：&nbsp;&nbsp;&nbsp;{{basicInfo.comField}}</span></div>
            <div class="info_basic"><span>借款原因</span></div>
            <div class="long_input"><textarea type="text" placeholder="（请填写借款原因，不超过50字）"  maxlength="50" v-model="message.reason"></textarea></div>
            <div class="info2" :style="{margin: '15px auto 0px auto'}">
                <span>融资金额&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.max_amount"></input>
                <span>&nbsp;&nbsp;万人民币</span>
            </div>
            <div class="info3" :style="{margin: '15px auto 0px auto'}">
                <span>可承担最高利息&nbsp;&nbsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.max_rate"></input>
                <span>&nbsp;&nbsp;%/年</span>
                <span class="warning_interest">&nbsp;&nbsp;&nbsp;&nbsp;*不得超过央行基准贷款利率的4倍</span>
            </div>
            <div class="info4" :style="{margin: '15px auto 0px auto'}">
                <span>预计还款时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.loan_ddl"></input>
                <span>&nbsp;&nbsp;月内</span>
            </div>
            <div class="check1" :style="{margin: '15px auto 0px auto'}">
                <span>还款来源&emsp;&emsp;&emsp;&emsp;</span>
                <input id="sales" type="checkbox" :style="{width: '18px', height: '18px', border: '2px solid #666'}" v-model="message.repaySupport.sales"/>
                <label for="sales">销售回款&emsp;&emsp;&emsp;&emsp;</label>
                <input id="othersrc"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.repaySupport.other"/>
                <label for="othersrc" >其他来源</label>
            </div>
            <div class="check2" :style="{margin: '15px auto 0px auto'}">
                <span>可提供风控&emsp;&emsp;&emsp;</span>
                <input id="mortgage"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.riskControl.mortgage" />
                <label for="mortgage" >抵押&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>
                <input id="guarentee"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.riskControl.guarentee" />
                <label for="guarentee" >担保</label></br>
                <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <input id="other"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.riskControl.other" />
                <label for="other" >其他</label>
                <input id="other_detail" type="text" v-model="message.riskControl.other_detail" />
            </div>
            <div class="check3" :style="{margin: '15px auto 0px auto'}" v-if="message.riskControl.mortgage">
                <span>抵押物类型&emsp;&emsp;&emsp;</span>
                <input id="fixed_wealth" type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.riskControl.mortgage_fixed"/>
                <label for="fixed_wealth">固定资产&emsp;&emsp;&emsp;&emsp;</label>
                <input id="other_wealth" type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.riskControl.mortgage_other"/>
                <label for="other_wealth">其他资产</label>
            </div>
            <div class="info5" :style="{margin: '15px auto 0px auto'}" v-if="message.riskControl.mortgage">
                <span>抵押物市值&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.riskControl.mortgage_value"></input>
                <span>&nbsp;&nbsp;万人民币</span>
            </div>
            <div :style="{margin: '15px auto 0px auto'}" v-if="message.riskControl.guarentee">
                <span>担保公司名称&emsp;&emsp;</span>
                <input class="msg_item" type="text" :style="{width: '200px'}" v-model="message.riskControl.guarentee_comName" />
            </div>
            <div :style="{margin: '15px auto 0px auto'}" v-if="message.riskControl.guarentee">
                <span>担保额度&emsp;&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.riskControl.guarentee_amount" />
                <span>&nbsp;&nbsp;万人民币</span>
            </div>
            <div :style="{margin: '15px auto 0px auto'}"><span>项目概述</span></div>
            <div class="long_input"><textarea type="text" placeholder="（包括项目背景，项目简介，项目进展等，不超过80字）"  maxlength="80"></textarea></div>
            <img class="dividing" src="/static/business/borrow/borrowPart/dividingline_write.png"/>
            <div class="info1" :style="{margin: '10px auto 0px auto'}">
                <img class="info_pic" src="/static/business/borrow/borrowPart/info.png"/>
                <span class="info_text">请上传项目附件</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/borrow/borrowPart/icon_addfiles.png"/>
                <span class="submit_text">企业营业执照/组织机构代码证/个体工商户营业执照/税务登记证</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/borrow/borrowPart/icon_addfiles.png"/>
                <span class="submit_text">企业名下资产证明</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/borrow/borrowPart/icon_addfiles.png"/>
                <span class="submit_text">近半年已签约的购销合同及提货单</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/borrow/borrowPart/icon_addfiles.png"/>
                <span class="submit_text">近半年税务单</span>
            </div>
            <div class="submit_part" :style="{margin: '40px auto 0px auto'}">
                <button class="eval_button" @click="evaluate">风险及额度评估</button>
                <a class="submit_directly"><span class="submit_text">直接提交</span></a>
            </div>
        </div>
        
    </div>
    
    <div class="rightpart">
        <div class="line"></div>
        <div class="assess">
            <div class="result_title"><span>风险及额度评估</span></div>
            <div class="result_item"><span>企业建议最高贷款额度：&emsp;{{result.amount}}</span></div>
            <div class="result_item"><span>单笔贷款金额风险系数：&emsp;{{result.risk_factor}}</span></div>
            <div class="result_item"><span>企业单笔贷款总风险系数：&emsp;{{result.total_risk_factor}}</span></div>
            <div class="result_item"><span>建议利率：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{{result.interest_rate_suggested}}</span></div>
            <div class="modify">
                <img class="modify_pic" src="/static/business/borrow/borrowPart/icon_evaluate_back.png"/>
                <span class="modify_text">&emsp;在左侧修改信息，重新评估</span>
            </div>
            <input type="button" class="submit_button"/>
        </div>
    </div>

    <div>
      <mu-dialog :open="dialog" title="错误提示">
        {{wrongMes}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
</div>
</template>


<script>
  export default{
    data () {
      return {
        wrongMes: '',
        dialog: false,
        basicInfo: {
          comName: '',
          comRegistAddresss: '',
          comField: '',
          comCreditScore: '',
          comCapital: ''
        },
        message: {
          city: '',
          project: '',
          amount: '',
          reason: '',
          max_amount: '',
          max_rate: '',
          loan_ddl: '',
          repaySupport: {
            sales: false,
            other: false
          },
          riskControl: {
            mortgage: false,
            guarentee: false,
            other: false,
            other_detail: '',
            mortgage_fixed: false,
            mortgage_other: false,
            mortgage_value: 0,
            mortgage_other_detail: '',
            guarentee_comName: '',
            guarentee_amount: 0
          }
        },
        result: {
          amount: '',
          risk_factor: '',
          total_risk_factor: '',
          interest_rate_suggested: ''
        }
      };
    },
    async created () {
      this.initData();
    },
    methods: {
      close () {
        this.dialog = false;
      },
      async initData () {
        let res;
        try {
          res = await this.$http.get('/api/user/self');
          for (var key in this.basicInfo) {
            this.basicInfo[key] = res.data[key];
          }
        } catch (e) {

        }
      },
      validate (mes) {
        for (var key in mes) {
          if (key.toString() === 'riskControl') {
            if (mes[key].mortgage && mes[key].mortgage_value <= 0) {
              return '请正确填写抵押物市值';
            }
            if (mes[key].guarentee) {
              if (mes[key].guarentee_comName === '') {
                return '请正确填写担保公司名称';
              }
              if (mes[key].guarentee_amount <= 0) {
                return '请正确填写担保额度';
              }
            }
          } else if (key.toString() === 'repaySupport') {
            continue;
          } else {
            if (mes[key] === '') {
              return '信息填写不完整';
            }
            if (mes.amount < 0) {
              return '请正确填写借款额度';
            }
            if (mes.loan_ddl <= 3) {
              return '贷款期限必须大于3个月';
            }
            if (mes.max_amount !== mes.amount) {
              return '融资金额与标题借款额度不一致';
            }
            if (mes.max_rate < 0 || mes.max_rate > 4.90 * 4) {
              return '请正确填写可承担最高利息';
            }
          }
        }
        return 'true';
      },
      evaluate () {
        let res = this.validate(this.message);
        if (res !== 'true') {
          this.wrongMes = res;
          this.dialog = true;
          return;
        }
        this.result.amount = this.basicInfo.comCreditScore * this.basicInfo.comCapital * 1.5 / 100;
        this.result.risk_factor = ((this.message.max_amount - 0.5 * (this.message.riskControl.guarentee_amount + this.message.riskControl.mortgage_value)) / this.result.amount).toFixed(4);
        this.result.total_risk_factor = (this.result.risk_factor * (1.0 + Math.log(4.0 * this.message.loan_ddl / 12))).toFixed(4);
        if (this.message.loan_ddl <= 12) {
          this.result.interest_rate_suggested = (4.35 * this.result.total_risk_factor).toFixed(4);
        } else if (this.message.loan_ddl > 12 && this.message.loan_ddl <= 60) {
          this.result.interest_rate_suggested = (4.75 * this.result.total_risk_factor).toFixed(4);
        } else {
          this.result.interest_rate_suggested = (4.90 * this.result.total_risk_factor).toFixed(4);
        }
        this.result.amount += '万元';
        this.result.interest_rate_suggested += '%';
        this.$store.commit('info', '评估成功，请查看右侧评估结果');
      }
    }
  };
</script>

<style lang="scss" scoped>
input{
  outline: none;
}
input[type="checkbox"]{
  display: none;
}
input[type="checkbox"]+label{
  display: inline-block;
}
label::before{
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("/static/business/borrow/borrowPart/rec_select.png");
  background-size: 100% 100%;
  vertical-align: middle;
  margin-right: 5px;
  -webkit-box-sizing:border-box;
}
input[type="checkbox"]:checked+label::before{
  background: url("/static/business/borrow/borrowPart/rec_selected.png");
  background-size: 100% 100%;
}
.sub_borrow{
    width: 100%;
    height: auto;
    color: #4b4b4b;
    font-size: 15px;
    padding-top: 30px;
    padding-bottom: 100px;
    .leftpart{
        width: 72%;
        height: auto;
        display: inline-block;
        .msg_item{
            height: 25px;
            border-radius: 5px;
            font-size: 15px;
            border: 1px solid #4b4b4b;
            text-align: center;
        }
        .info{
            width: 600px;
            height: auto;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            left:40px;
            .info1{
                width: 100%;
                height: 30px;
                .info_pic{
                    size: 30px 30px;
                    display: inline-block;
                    float: left;
                }
                .info_text{
                    display: inline-block;
                    float: left;
                    font-size: 15px;
                    margin-left: 18px;
                    margin-top: 4px;
                }
            }
            .dividing{
                width: 100%;
                height: 7px;
                margin-top: 30px;
            }
            .abstract{
                width: 100%;
                height: 27px;
                margin-top: 24px;
                span{
                    padding-left: 16px;
                    padding-right: 16px;
                }
                #input_city{
                    width: 75px;
                    height: 100%;
                }
                #input_project{
                    width: 120px;
                    height: 100%;
                }
                #input_amount{
                    width: 90px;
                    height: 100%;
                }
            }
            .info_basic{
                width: 100%;
                height: auto;
                margin-top: 16px;
            }
            .long_input{
                width: 100%;
                height: 82px;
                margin-top: 12px; 
                textarea{
                    width: 100%;
                    height: 80px;
                    border-radius: 5px;
                    font-size: 15px;
                    border: 1px solid;
                    color: #cccccc;
                }
            }
            .info3{
                .warning_interest{
                    color: #D6A12C;
                    font-size: 12px;
                }
            }
            .info4{
                width: 100%;
                margin-top: 15px;
            }
            .check1{
            }
            .check2{
              #other_detail{
                width: 190px;
                border-left-width: 0px;
                border-right-width: 0px;
                border-top-width: 0px;
                border-bottom: #4b4b4b 1px solid;
              }
            }
            .submit_files {
              width: 530px;
              height: 92px;
              text-align: center;
              float: left;
              margin-top: 15px;
              border: 1px solid #4b4b4b;
              border-radius: 5px;
              padding-top: 20px;
              .submit_pic{
                width: 26px;
                height: 26px;
                size: 26px 26px;
                display: block;
                margin: 5px auto auto auto;
              }
              .submit_text{
                display: block;
              }
            }
            .submit_part{
              .eval_button{
                border-radius: 20px;
                color: #ffffff;
                height: 42px;
                width: 147px;
                border: 0px;
                display: inline-block;
                float: left;
                margin-left: 190px;
                margin-top: 20px;
                cursor: pointer;
                background: #D6A12C;
              }
              .submit_directly{
                display: inline-block;
                float: left;
                position: relative;
                top: 32px;
                left: 135px;
                .submit_text{
                  text-decoration: underline;
                  font-size: 15px;
                  color: #D6A12C;
                }
              }
            }
        }
    }
    
    .rightpart{
        width: 28%;
        height: auto;
        display: inline-block;
        float: right;
        .line{
            display: inline-block;
            float: left;
            width: 3px;
            height: 1200px;
            margin-top: 50px;
            background: url("/static/business/borrow/borrowPart/line_straight.png");
            background-size: 100% 100%;
        }
        .assess{
            width: 270px;
            height: auto;
            display: inline-block;
            float: left;
            margin-left: 40px;
            .result_title{
              font-size: 25px;
              color: #D6A12C;
              margin-bottom: 25px;
            }
            .result_item{
              margin-top: 5px;
            }
            .modify{
              margin-top: 40px;
              .modify_pic{
                float: left;
              }
              .modify_text{
                float: left;
                font-size: 15px;
                color: #D6A12C;
                position: relative;
                top: -3px;
              }
            }
            .submit_button{
              height: 40px;
              width: 146px;
              border: 0px;
              margin-top: 20px;
              cursor: pointer;
              background: url("/static/business/borrow/borrowPart/button_submit.png");
              background-size: 100% 100%;
            }
        }
    }
}
</style>

<style lang="scss">
.mu-dialog-title, .mu-flat-button-label{
    color: #d6a12c;
  }
  .mu-dialog-title{
    font-size: 20px;
  }
  .mu-dialog-body {
    font-size: 16px;
  }
  .mu-dialog{
    width: 50%;
  }
</style>
