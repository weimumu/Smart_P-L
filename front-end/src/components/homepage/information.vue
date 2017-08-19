<template>
<div class="information">
    <div class="part1">
        <div class="news-part">
            <h1 class="label">平台新闻</h1>
            <div class="news" id="news1">
                <img class="news_pic" id="pic1" src="/static/homepageImage/information/forum.png"></img>
                <p class="news_content">2017-08-08</br>“智产智融”平台创始人王量受邀出席广东省中小企业发展年会暨珠三角中小企业投融资高峰论坛。</p>
            </div>
            <div class="news" id="news2">
                <img class="news_pic" id="pic1" src="/static/homepageImage/information/factory.png"></img>
                <p class="news_content">2017-08-08</br>“智产智融”平台与广州银行达成合作伙伴关系，助理珠三角中小企业融资服务发展。</p>
            </div> 
        </div>
    </div>

    <div class="part2">
        <div class="analysis-part">
            <h1 class="label">平台季度分析</h1>
            <p id="text1">2017年第一季度平台新增注册企业769家，</br>共385家企业通过平台贷款10.21亿元，平台促成担保融资29.81亿元......</p>
            <a href="http://baidu.com"><span class="report">详情点击“智产智融”平台2017年第一季度分析报告</span></a>
        </div>
    </div>

    <div class="part3">
        <div class="publicity">
            <h1 class="label">失信企业公示</h1>
            <table class="board" border="0" cellpadding="0" cellspacing="0">
                <tr bgcolor="#f8f9fb"><td>2017年第一季度平台违约交易公示</td></tr>
                <tr bgcolor="#ffffff"><td>2017年8月8日失信企业公示</td></tr>
                <tr bgcolor="#f8f9fb"><td>美服成衣有限责任公司</td></tr>
                <tr bgcolor="#ffffff"><td>银河天星化肥有限责任公司</td></tr>
                <tr bgcolor="#f8f9fb"><td>红凯得商贸有限公司</td></tr>
            </table>
        </div>
    </div>

    <div class="part4">
        <div class="maintain">
            <h1 class="label">平台维护</h1>
            <p class="msg">2017年8月8日版本更新1.0.1</p>
        </div>
    </div>
</div>
</template>




<style lang="scss" >
.information{
    text-align: center;
    color: #4b4b4b;
    font-family: Hiragino Sans GB;
    width: 100%;
    height: auto;
    .label{
        margin-top: 0px;
        font-size: 30px;
    }
    .part1{
        width: 100%;
        height: 415px;
        background-color: #f1f1f1;
        padding-top: 20px;
        .news-part{
            width: 665px;
            height: 415px;
            margin: 0 auto;
            background-color: #f1f1f1;
            .news{
                display: inline-block;
                width: 264px;
                height: 295px;
                margin-bottom: 0px;
                .news_pic{
                    width: 100%;
                    height: 59.66%;
                }
                .news_content{
                    text-align: left;
                    width: 100%;
                    height: auto;
                    font-size: 15px;
                    margin-top: 5px;
                }
            }
            #news1{
                float: left;
            }
            #news2{
                float: right;
            }
            
        }
    }
    .part2{
        width: 100%;
        height: 236px;
        background-color: #ffffff;
        padding-top: 20px;
        .analysis-part{
            width: 665px;
            height: 100%;
            margin-left: auto;
            margin-right: auto;
            a:hover{
                cursor: url("/static/homepageImage/information/cursor.png");
            }
            #text1{
                font-size: 16px;
            }
            .report{
                font-size: 16px;
                color: #d49f39;
                text-decoration: underline;
            }
        }
    }
    .part3{
        width: 100%;
        height: 338px;
        background-color: #f1f1f1;
        padding-top: 20px;
        .board{
            width: 334px;
            height: 182px;
            border: 0px;
            margin-left: auto;
            margin-right: auto;
        }
    }
    .part4{
        width: 100%;
        height: 182px;
        background-color: #ffffff;
        padding-top: 20px;
        .msg{
            position: relative;
            margin-left: auto;
            margin-right: auto;
            font-size: 16px;
            top: 10px;
        }
    }

}
</style>