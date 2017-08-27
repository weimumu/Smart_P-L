<template>
<div class="offer_guarantee">
    <div class="leftpart">
        <div  class="info">
            <div class="info_part">
                <img class="info_pic" src="/static/business/public/info.png"/>
                <span class="info_text">请填写担保意愿信息，获得被担保匹配企业推荐结果</span>
            </div>
            <img class="dividing" src="/static/business/public/dividingline_write.png"/>
            <div class="abstract">
                <input class="msg_item" id="input_city" type="text" v-model="message.city"></input>
                <span>市</span>
                <input class="msg_item" id="input_project" type="text" v-model="message.project"></input>
                <span>项目贷款</span>
                <input class="msg_item" id="input_amount" type="number" v-model.number="message.amount"></input>
                <span>万人民币担保申请</span>
            </div>
            <div class="info_basic"><span>担保申请主体：&nbsp;&nbsp;&nbsp;{{basicInfo.comName}}</span></div>
            <div class="info_basic"><span>注册地址：&nbsp;&nbsp;&nbsp;{{basicInfo.comRegistAddresss}}</span></div>
            <div class="info_basic"><span>所属行业：&nbsp;&nbsp;&nbsp;{{basicInfo.comField}}</span></div>
            <div class="info_basic"><span>注册资本：&nbsp;&nbsp;&nbsp;{{basicInfo.comCapital}}</span></div>
            <div class="info_basic"><span>愿意担保的企业行业类型：（多选）&nbsp;&nbsp;&nbsp;{{basicInfo.comCapital}}</span></div>
            <div class="info_basic"><span>担保贷款项目简述</span></div>
            <div class="long_input"><textarea type="text" placeholder="（请填写项目简述，不超过100字）"  maxlength="100" v-model="message.project_brief"></textarea></div>
            <div class="check" :style="{margin: '15px auto 0px auto'}">
                <span>愿意担保的贷款期限&emsp;&emsp;</span>
                <input id="halfyear" type="checkbox" :style="{width: '18px', height: '18px', border: '2px solid #666'}" v-model="message.loan_ddl.halfyear"/>
                <label for="halfyear">半年内&emsp;&emsp;</label>
                <input id="oneyear"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.loan_ddl.oneyear"/>
                <label for="oneyear" >一年内&emsp;&emsp;</label>
                <input id="threeyear"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.loan_ddl.threeyears"/>
                <label for="threeyear" >三年内&emsp;&emsp;</label>
                <input id="fiveyear"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.loan_ddl.fiveyears" />
                <label for="fiveyear" >五年内</label>
            </div>
            <div class="info_item" :style="{margin: '15px auto 0px auto'}">
                <span>愿意担保的贷款额度&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.max_amount"></input>
                <span>&emsp;万人民币</span>
            </div>
            <div class="info_item" :style="{margin: '15px auto 0px auto'}">
                <span>可接受的最低担保费率&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.min_rate"></input>
                <span>&emsp;%</span>
            </div>
            <div class="check" :style="{margin: '15px auto 0px auto'}">
                <span>可接受担保类型&emsp;&emsp;</span>
                <input id="neither" type="checkbox" :style="{width: '18px', height: '18px', border: '2px solid #666'}" v-model="message.guarantee_type.neither"/>
                <label for="neither">无抵、质押担保&emsp;&emsp;&emsp;</label>
                <input id="mortgage"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.guarantee_type.mortgage"/>
                <label for="mortgage" >抵押担保</label>
                <br/>
                <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <input id="both"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.guarantee_type.pledge"/>
                <label for="both" >抵、质押担保均可&emsp;&emsp;</label>
                <input id="pledge"type="checkbox" :style="{width: '18px', height: '18px'}" v-model="message.guarantee_type.both"/>
                <label for="pledge" >质押担保</label>
            </div>
            <div :style="{margin: '15px auto 0px auto'}"><span>近三年企业的借款情况</span></div>
            <div class="long_input"><textarea type="text" v-model="message.situation.about_borrow"></textarea></div>
            <div :style="{margin: '15px auto 0px auto'}"><span>近三年企业的贷款情况</span></div>
            <div class="long_input"><textarea type="text" v-model="message.situation.about_lend"></textarea></div>
            <div :style="{margin: '15px auto 0px auto'}"><span>企业的信用违约记录</span></div>
            <div class="long_input"><textarea type="text" v-model="message.situation.about_credit"></textarea></div>
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
                <span class="submit_text">企业名下资产证明</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/public/icon_addfiles.png"/>
                <span class="submit_text">近半年已签约的购销合同及提货单</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/public/icon_addfiles.png"/>
                <span class="submit_text">近半年税务单</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/public/icon_addfiles.png"/>
                <span class="submit_text">近三年的财务报表</span>
            </div>
            <div class="submit_files">
                <img class="submit_pic" src="/static/business/public/icon_addfiles.png"/>
                <span class="submit_text">经合法机构审核出具的审计表</span>
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
          amount: 0,
          project_brief: '',
          max_amount: 0,
          min_rate: 0,
          loan_ddl: {
            halfyear: false,
            oneyear: false,
            threeyears: false,
            fiveyears: false
          },
          guarantee_type: {
            neither: false,
            mortgage: false,
            pledge: false,
            both: false
          },
          situation: {
            about_borrow: '',
            about_lend: '',
            about_credit: ''
          }
        }
      };
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
            width: 600px;
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
            height: 1800px;
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
