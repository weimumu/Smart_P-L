<template>
<div class="sub_lend">
    <div class="leftpart">
        <div  class="info">
            <div class="info1">
                <img class="info_pic" src="/static/business/borrow/borrowPart/info.png"/>
                <span class="info_text">请填写贷款信息，获得贷款匹配企业推荐结果</span>
            </div>
            <img class="dividing" src="/static/business/borrow/borrowPart/dividingline_write.png"/>
            <div class="info_basic"><span>投资主体&nbsp;&nbsp;&nbsp;{{basicInfo.comName}}</span></div>
            <div class="info_basic"><span>注册地址&nbsp;&nbsp;&nbsp;{{basicInfo.comAdd}}</span></div>
            <div class="info_basic"><span>所属行业&nbsp;&nbsp;&nbsp;{{basicInfo.comField}}</span></div>
            <div class="info2" :style="{margin: '15px auto 0px auto'}">
                <span>可使用投资资金&emsp;&emsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}" v-model="message.min_amount"></input>
                <span>&nbsp;&nbsp;万&nbsp;&nbsp;—&nbsp;&nbsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}" v-model="message.max_amount"></input>
                <span>&nbsp;&nbsp;万人民币</span>
            </div>
            <div class="info3" :style="{margin: '15px auto 0px auto'}">
                <span>资金回收期限&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="text" :style="{width: '94px'}" v-model="message.loan_ddl"></input>
                <span>&nbsp;&nbsp;月内</span>
            </div>
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
    
    <div class="rightpart">
        <div class="line"></div>
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
        basicInfo: {
          comName: '',
          comAdd: '',
          comField: ''
        },
        message: {
          min_amount: '',
          max_amount: '',
          loan_ddl: ''
        },
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

<style lang="scss" scoped>
input{
  outline: none;
}
.sub_lend{
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
            .info_basic{
                width: 100%;
                height: auto;
                margin-top: 16px;
            }
            .info3{
                width: 100%;
                margin-top: 15px;
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
                height: 42px;
                width: 147px;
                border: 0px;
                display: inline-block;
                float: left;
                margin-left: 190px;
                margin-top: 20px;
                cursor: pointer;
                background: url("/static/business/borrow/borrowPart/eval_button.png");
                background-size: 100% 100%;
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
            height: 750px;
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