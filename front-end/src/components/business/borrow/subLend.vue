<template>
<div class="sub_lend">
    <div class="leftpart">
        <div  class="info">
            <div class="info1">
                <img class="info_pic" src="/static/business/public/info.png"/>
                <span class="info_text">请填写贷款信息，获得贷款匹配企业推荐结果</span>
            </div>
            <img class="dividing" src="/static/business/public/dividingline_write.png"/>
            <div class="info_basic"><span>投资主体：&nbsp;&nbsp;&nbsp;{{basicInfo.comName}}</span></div>
            <div class="info_basic"><span>注册地址：&nbsp;&nbsp;&nbsp;{{basicInfo.comRegistAddresss}}</span></div>
            <div class="info_basic"><span>所属行业：&nbsp;&nbsp;&nbsp;{{basicInfo.comField}}</span></div>
            <div class="info2" :style="{margin: '15px auto 0px auto'}">
                <span>可使用投资资金&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.max_amount"></input>
                <span>&nbsp;&nbsp;万人民币</span>
            </div>
            <div class="info3" :style="{margin: '15px auto 0px auto'}">
                <span>资金回收期限&emsp;&emsp;&emsp;</span>
                <input class="msg_item" type="number" :style="{width: '94px'}" v-model.number="message.loan_ddl"></input>
                <span>&nbsp;&nbsp;月内</span>
            </div>
            <img class="dividing" src="/static/business/public/dividingline_write.png"/>
            <div class="info1" :style="{margin: '10px auto 0px auto'}">
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
            <div class="submit_part" :style="{margin: '40px auto 0px auto'}">
                <button class="eval_button">提交信息</button>
            </div>
        </div>
        
    </div>

    <div class="rightpart">
        <div class="line"></div>
    </div>
</div>
</template>


<script>
  export default{
    data () {
      return {
        basicInfo: {
          comName: '',
          comRegistAddresss: '',
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
    },
    async created () {
      this.initData();
    },
    methods: {
      async initData () {
        let res;
        try {
          res = await this.$http.get('/api/user/self');
          for (var key in this.basicInfo) {
            this.basicInfo[key] = res.data[key];
          }
        } catch (e) {

        }
      }
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
            height: 750px;
            margin-top: 50px;
            background: url("/static/business/public/line_straight.png");
            background-size: 100% 100%;
        }
    }
}
</style>