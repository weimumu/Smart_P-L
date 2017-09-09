<template>
<div class="offer_guarantee">
    <div class="leftpart">
        <div  class="info">
            <div class="info_part">
                <img class="info_pic" src="/static/business/public/info.png"/>
                <span class="info_text">请填写债权出售信息，获得债权匹配企业推荐结果</span>
            </div>
            <img class="dividing" src="/static/business/public/dividingline_write.png"/>
            <div class="abstract">
                <input class="msg_item" id="input_city" type="text" v-model="message.company_lend"></input>
                <span>企业关于对于</span>
                <input class="msg_item" id="input_project" type="text" v-model="message.company_borrow"></input>
                <span>企业应收账款</span>
                <input class="msg_item" id="input_amount" type="number" v-model.number="message.amount"></input>
                <span>万人民币的债权出售</span>
            </div>
            <div class="info_basic"><span>融资主体：&emsp;&emsp;{{basicInfo.comName}}</span></div>
            <div class="info_basic"><span>注册地址：&emsp;&emsp;{{basicInfo.comRegistAddresss}}</span></div>
            <div class="info_basic"><span>所属行业：&emsp;&emsp;{{basicInfo.comField}}</span></div>
            <div class="info_item" :style="{margin: '15px auto 0px auto'}">
                <span>债务主体名称&emsp;&emsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}" v-model.number="message.loan_owner"></input>
            </div>
            <div class="info_item" :style="{margin: '15px auto 0px auto'}">
                <span>债权金额&emsp;&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.loan_amount"></input>
                <span>&emsp;万人民币</span>
            </div>
            <div class="info_item" :style="{margin: '15px auto 0px auto'}">
                <span>债权期限&emsp;&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.loan_ddl"></input>
                <span>&emsp;月内</span>
            </div>
            <div class="info_basic"><span>持有债权的来历</span></div>
            <div class="long_input"><textarea type="text" v-model="message.loan_source"></textarea></div>
            <div class="info_basic"><span>对应债务方的情况</span></div>
            <div class="long_input"><textarea type="text" v-model="message.situation_borrower"></textarea></div>
            <div class="info_item" :style="{margin: '15px auto 0px auto'}">
                <span>债权定价&emsp;&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.loan_price"></input>
                <span>&emsp;万人民币</span>
            </div>
            <img class="dividing" src="/static/business/public/dividingline_write.png"/>
            <div class="info_part" :style="{margin: '10px auto 0px auto'}">
                <img class="info_pic" src="/static/business/public/info.png"/>
                <span class="info_text">请上传项目附件</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/public/icon_addfiles.png"/>
                <span class="submit_text">企业营业执照/组织机构代码证/个体工商户营业执照/税务登记证</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/public/icon_addfiles.png"/>
                <span class="submit_text">债权相关合同以及证据证明</span>
            </div>
            <div class="submit_part" :style="{margin: '40px auto 0px auto'}">
                <button class="eval_button" @click="evaluate">提交信息</button>
            </div>
        </div>
        
    </div>
    
    <div class="rightpart">
        <div class="line"></div>
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
  import func from '../function';
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
          company_borrow: '',
          company_lend: '',
          amount: 0,
          loan_owner: '',
          loan_amount: 0,
          loan_ddl: 0,
          loan_source: '',
          situation_borrower: '',
          loan_price: 0
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
      async evaluate () {
        console.log(this.message);
        let res = func.validateDebt(this.message);
        if (res !== 'true') {
          this.wrongMes = res;
          this.dialog = true;
          return;
        }
        try {
          let res = await this.$http.post('/api/bondtrade/sell', this.message);
          console.log(res);
          this.$store.commit('info', '已成功发布至企业好友圈');
        } catch (e) {
          this.$store.commit('info', '网络错误');
        }
      },
      async initData () {
        let res;
        try {
          res = await this.$http.get('/api/user/self');
          for (var key in this.basicInfo) {
            this.basicInfo[key] = res.data[key];
          }
        } catch (e) {
          this.$store.commit('info', '用户未登录');
        }
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
  background: url("/static/business/public/rec_select.png");
  background-size: 100% 100%;
  vertical-align: middle;
  margin-right: 5px;
  -webkit-box-sizing:border-box;
}
input[type="checkbox"]:checked+label::before{
  background: url("/static/business/public/rec_selected.png");
  background-size: 100% 100%;
}
.offer_guarantee{
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
            width: 660px;
            height: auto;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            left:40px;
            .info_part{
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
                    padding-left: 6px;
                    padding-right: 6px;
                }
                #input_city{
                    width: 100px;
                    height: 100%;
                }
                #input_project{
                    width: 100px;
                    height: 100%;
                }
                #input_amount{
                    width: 85px;
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
                    border: 1px solid #4b4b4b;
                    color: #cccccc;
                    resize: none;
                }
                textarea:focus{
                    outline: 1px solid #d6a12c;
                    border: 0px;
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
            height: 900px;
            margin-top: 50px;
            background: url("/static/business/public/line_straight.png");
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
              border-radius: 20px;
              color: #D6A12C;
              background-color: #ffffff;
              margin-top: 20px;
              cursor: pointer;
              border: 1px solid #D6A12C;
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
