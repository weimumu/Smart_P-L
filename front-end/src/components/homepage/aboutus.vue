<template>
<div class="aboutus">
    <img class="bg" src="/static/homepageImage/aboutus/pic_bg.png"></img>
    <div class="part1">
        <h1>平台介绍</h1>
        <p class="text1">&nbsp;&nbsp;智产智融中小企业融资平台是面向中小企业、金融机构的企业融资平台。其中“智产智融”平台主要面向中小企业，基于中小企业各自的合作伙伴关系网为中小企业提供多渠道融资服务，并与相关金融机构之间形成了合作伙伴关系。</p>
        <h1>合作伙伴</h1>
        <img class="pic1" src="/static/homepageImage/aboutus/pic_company.png">
        <p class="text2">&nbsp;&nbsp;平台从建立至今，已与中国民生银行、中国农业银行等22家知名金融机构达成合作，更与其中8家机构初步达成战略合作伙伴关系。</p>
    </div>
    <h1 id="success_case">成功案例</h1>
    <div class="part2" >
        <div class="case" id="case1">
            <img class="pic_case1" src="/static/homepageImage/aboutus/pic_case1.png"></img>
            <p class="text_case1">智产智融平台辅助浙江省智能家居项目成功融资</p>
            <p class="money1">3000万元</p>
        </div>
        <div class="case" id="case2">
            <img class="pic_case2" src="/static/homepageImage/aboutus/pic_case2.png"></img>
            <p class="text_case2">智产智融平台辅助浙江省智能家居项目成功融资</p>
            <p class="money2">4500万元</p>
        </div>
        <div class="case" id="case3">
            <img class="pic_case3" src="/static/homepageImage/aboutus/pic_case3.png"></img>
            <p class="text_case3">智产智融平台辅助浙江省智能家居项目成功融资</p>
        </div>
    </div>
</div>
</template>


<style lang="scss">
.aboutus{
    width: 100%;
    height: auto;
    text-align: center;
    color: #4b4b4b;
    background-color: #ffffff;
    .bg{
        width: 100%;
    }
    h1{
        font-size: 30px;
        margin-top: 0px;
    }
    .part1{
        width: 642px;
        height: 780px;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        margin-top: -55.3%;
        padding-top: 25px;
        background-color: #ffffff;
        border: 20px solid transparent;
        -moz-border-top-colors:  #ffffff #fefefe #fcfcfc #f8f8f8 #f7f7f7 #f6f6f6 #f5f5f5 #f3f3f3 #f0f0f0 #eeeeee #ebebeb #ececec #ededed #eeeeee #f0f0f0 #f3f3f3 #f4f4f4 #f5f5f5 #f6f6f6 #f7f7f7;
        -moz-border-bottom-colors:#ffffff #fefefe #fcfcfc #f9f9f9 #f8f8f8 #f5f5f5 #f3f3f3 #f0f0f0 #eeeeee #f0f0f0 #f3f3f3 #f5f5f5 #f6f6f6 #f7f7f7 #f8f8f8 #f9f9f9 #fafafa #fbfbfb #fcfcfc #fdfdfd #fefefe;
        -moz-border-left-colors: #ffffff #fefefe #fcfcfc #f9f9f9 #f8f8f8 #f5f5f5 #f3f3f3 #f0f0f0 #eeeeee #f0f0f0 #f3f3f3 #f5f5f5 #f6f6f6 #f7f7f7 #f8f8f8 #f9f9f9 #fafafa #fbfbfb #fcfcfc #fdfdfd #fefefe;
        -moz-border-right-colors: #ffffff #fefefe #fcfcfc #f8f8f8 #f7f7f7 #f6f6f6 #f5f5f5 #f3f3f3 #f0f0f0 #eeeeee #ebebeb #ececec #ededed #eeeeee #f0f0f0 #f3f3f3 #f4f4f4 #f5f5f5 #f6f6f6 #f7f7f7;
        p{
            font-size: 18px;
            width: 475px;
            margin-left: auto;
            margin-right: auto;    
            text-align: left;        
        }
        .text1{
            font-size: 18px;
            width: 475px;
        }
        .pic1{
            width: 396px;
            height: 212px;
            margin: 0 auto;
        }
        .text2{
            font-size: 18px;
            width: 475px;
        }
    }
    #success_case{
        margin-top: 30px;
    }
    .part2{
        height: auto;
        width: 648px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        background-color: #ffffff;
        h1{
            margin-bottom: 50px;
        }
        p{
            position: relative;
            top: 70px;
            font-size: 16px;
        }
        .case{
            height: 166px;
            width: 648px;
            margin: 0 auto;
        }
        #case1{
            .pic_case1{
                float: left;
            }
            .money1{
                font-size: 30px;
                color: #d5a03a;
                top: 50px;
                left: 110px;
            }
        }
        #case2{
            .pic_case2{
                float: right;
            }
            .money2{
                font-size: 30px;
                color: #d5a03a;
                top: 50px;
                left: -110px;
            }
        }
        #case3{
            .pic_case3{
                float: left;
            }
            p{
                top: 120px;
                left: 10px;
            }
        }    
    }
}
</style>