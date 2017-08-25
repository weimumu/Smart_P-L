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
                <input class="msg_item" id="input_city" type="text"></input>
                <span>市</span>
                <input class="msg_item" id="input_project" type="text"></input>
                <span>项目借款</span>
                <input class="msg_item" id="input_amount" type="text"></input>
                <span>人民币</span>
            </div>
            <div class="info_basic"><span>借款主体&nbsp;&nbsp;&nbsp;{{comName}}</span></div>
            <div class="info_basic"><span>注册地址&nbsp;&nbsp;&nbsp;{{comAdd}}</span></div>
            <div class="info_basic"><span>所属行业&nbsp;&nbsp;&nbsp;{{comField}}</span></div>
            <div class="info_basic"><span>借款原因</span></div>
            <div class="long_input"><textarea type="text" placeholder="（请填写借款原因，不超过50字）"  maxlength="50"></textarea></div>
            <div class="info2" :style="{margin: '15px auto 0px auto'}">
                <span>融资金额&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}"></input>
                <span>&nbsp;&nbsp;万&nbsp;&nbsp;—&nbsp;&nbsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}"></input>
                <span>&nbsp;&nbsp;万人民币</span>
            </div>
            <div class="info3" :style="{margin: '15px auto 0px auto'}">
                <span>可承担最高利息&nbsp;&nbsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}"></input>
                <span>&nbsp;&nbsp;%/年</span>
                <span class="warning_interest">&nbsp;&nbsp;&nbsp;&nbsp;*不得超过央行基准贷款利率的4倍</span>
            </div>
            <div class="info4" :style="{margin: '15px auto 0px auto'}">
                <span>预计还款时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}"></input>
                <span>&nbsp;&nbsp;月内</span>
            </div>
            <div class="check1" :style="{margin: '15px auto 0px auto'}">
                <span>还款来源&emsp;&emsp;&emsp;&emsp;</span>
                <input id="sales" type="checkbox" :style="{width: '18px', height: '18px'}" />
                <label for="sales">销售回款&emsp;&emsp;&emsp;&emsp;</label>
                <input id="othersrc"type="checkbox" :style="{width: '18px', height: '18px'}"/>
                <label for="othersrc" >其他来源</label>
            </div>
            <div class="check2" :style="{margin: '15px auto 0px auto'}">
                <span>可提供风控&emsp;&emsp;&emsp;</span>
                <input id="mortgage"type="checkbox" :style="{width: '18px', height: '18px'}"/>
                <label for="mortgage" >抵押&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>
                <input id="guarentee"type="checkbox" :style="{width: '18px', height: '18px'}"/>
                <label for="guarentee" >担保</label></br>
                <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <input id="other"type="checkbox" :style="{width: '18px', height: '18px'}"/>
                <label for="other" >其他</label>
            </div>
            <div class="check3" :style="{margin: '15px auto 0px auto'}">
                <span>抵押物类型&emsp;&emsp;&emsp;</span>
                <input id="fixed_wealth" type="checkbox" :style="{width: '18px', height: '18px'}"/>
                <label for="fixed_wealth">固定资产&emsp;&emsp;&emsp;&emsp;</label>
                <input id="other_wealth" type="checkbox" :style="{width: '18px', height: '18px'}"/>
                <label for="other_wealth">其他资产</label>
            </div>
            <div class="info5" :style="{margin: '15px auto 0px auto'}">
                <span>抵押物市值&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}"></input>
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
                <input type="button" class="eval_button"/>
                <a class="submit_directly"><span class="submit_text">直接提交</span></a>
            </div>
        </div>
        
    </div>
    <div class="line"></div>
    <div class="rightpart">
        <div class="assess">
            <div class="result_title"><span>风险及额度评估</span></div>
            <div class="result_item"><span>企业建议最高贷款额度：&emsp;&emsp;{{result.amount}}</span></div>
            <div class="result_item"><span>单笔贷款金额风险系数：&emsp;&emsp;{{result.risk_factor}}</span></div>
            <div class="result_item"><span>企业单笔贷款总风险系数：&emsp;{{result.total_risk_factor}}</span></div>
            <div class="result_item"><span>建议利率：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{{result.interest_rate_suggested}}</span></div>
            <div class="modify">
                <img class="modify_pic" src="/static/business/borrow/borrowPart/icon_evaluate_back.png"/>
                <span class="modify_text">&emsp;在左侧修改信息，重新评估</span>
            </div>
            <input type="button" class="submit_button"/>
        </div>
    </div>
</div>
</template>


<script>
  export default{
    data () {
      return {
        result: {
          amount: '',
          risk_factor: '',
          total_risk_factor: '',
          interest_rate_suggested: ''
        }
      };
    }
  };
</script>

<style lang="scss">
.sub_borrow{
    width: 939px;
    height: auto;
    color: #4b4b4b;
    font-size: 16px;
    margin-top: 30px;
    .leftpart{
        width: 620px;
        height: 1500px;
        display: inline-block;
        float: left;
        .msg_item{
            height: 30px;
            border-radius: 5px;
            font-size: 16px;
            border: 1px solid #4b4b4b;
            text-align: center;
        }
        .info{
            width: 538px;
            height: 100%;
            margin-left: auto;
            margin-right: auto;
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
                    font-size: 16px;
                    margin-left: 18px;
                    margin-top: 4px;
                }
            }
            .dividing{
                size: 530px 7px;
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
                    width: 530px;
                    height: 80px;
                    border-radius: 5px;
                    font-size: 16px;
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
            .submit_files {
              width: 530px;
              height: 92px;
              text-align: center;
              margin: 15px auto 0px auto;
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
                height: 42px;
                width: 147px;
                border: 0px;
                display: inline-block;
                margin-left: 190px;
                cursor: pointer;
                background: url("/static/business/borrow/borrowPart/eval_button.png");
                background-size: 100% 100%;
              }
              .submit_directly{
                display: inline-block;
                float: right;
                position: relative;
                top: 10px;
                .submit_text{
                  text-decoration: underline;
                  font-size: 16px;
                  color: #D6A12C;
                }
              }
            }
        }
    }
    .line{
        display: inline-block;
        float: left;
        width: 3px;
        height: 1317px;
        margin-top: 50px;
        background: url("/static/business/borrow/borrowPart/line_straight.png");
        background-size: 100% 100%;
    }
    .rightpart{
        width: 316px;
        height: auto;
        display: inline-block;
        float: left;
        .assess{
            width: 264px;
            height: 100%;
            margin-left: auto;
            margin-right: auto;
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
                font-size: 16px;
                color: #D6A12C;
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