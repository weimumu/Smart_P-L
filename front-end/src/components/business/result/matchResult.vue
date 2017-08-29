<template>
<div class="matchResult">
    <div class="main">
        <div class="logo"><img src="/static/business/result/icon_smile.png"/></div>
        <div class="subject"><span>我们根据您的信息匹配了最合适的合作对象</span></div>
        <div class="result">
            <table>
                <tr class="main_row" bgcolor="#bbcae7">
                    <td class="item1"><span>公司名称</span></td>
                    <td class="item2"><span>金额</span></td>
                    <td class="item3"><span>还款时限</span></td>
                    <td class="item4"><span>发起申请</span></td>
                </tr>
                <tr class="data_row" v-for="item in results">
                    <td class="item1"><span>{{item.comName}}</span></td>
                    <td class="item2"><span>{{item.amount}}</span></td>
                    <td class="item3"><span>{{item.ddl}}</span></td>
                    <td class="item4"><img src="/static/business/result/icon_apply.png"/></td>
                </tr>
            </table>
        </div>
        <div class="ps">
            <span>请在申请通过后进行合同确认，逾期一个月未进行确认将被扣除2分信用分</span>
        </div>
        <div class="show_request">
            <button>查看申请</button>
        </div>
    </div>
</div>
</template>


<script>
  export default{
    data () {
      return {
        results: [
          {
            comName: '华为科技公司',
            amount: '100,000',
            ddl: '2018-10-20'
          },
          {
            comName: '',
            amount: '',
            ddl: ''
          },
          {
            comName: '',
            amount: '',
            ddl: ''
          }
        ]
      };
    }
  };
</script>

<style lang="scss">
.matchResult{
    width: 100%;
    text-align: center;
    .main{
        width: 676px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 80px;
        .logo{
            img{
                height: 48px;
                width: 48px;
            }
        }
        .subject{
            margin-top: 20px;
            font-size: 20px;
        }
        .result{
            font-size: 15px;
            margin-top: 20px;
            tr{
                .item1{
                    width: 242px;
                }
                .item2{
                    width: 142px;
                }
                .item3{
                    width: 180px;
                }
                .item4{
                    width: 100px;
                }
            }
            .main_row{
                height: 50px;
                color: #ffffff;
            }
            .data_row{
                background: #f1f1f1;
                height: 55px;
                color: #505b72;
            }
        }
        .ps{
          margin-top: 30px;
          color: #d5a03a;
          font-size: 14px;
        }
        .show_request{
          margin-top : 18px;
          button{
            color: #4b4b4b;
            font-size: 16px;
            background: #ffffff;
            border: 1px solid #4b4b4b;
            border-radius: 20px;
            width: 152px;
            height: 40px;
          }
        }
    }
}
</style>