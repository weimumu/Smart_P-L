<template>
<div class="main">
<div class="item">
 <div class="text-part">
  <div class="description" id="description1">
    <div class="subtitle" id="subtitle1"> 
        <span>面向客户</span>
    </div>
    <div class="detail" id="detail1">
     <p>
        “智产智融”平台面向两类客户，分别是中小企业和与企业借贷业务相关的金融机构。
     </p>
    </div>
  </div>
 </div>
 <div class="logo-part">
   <div class="logo" id="logo1">
   </div>
 </div> 
</div>

<div class="item">
 <div class="logo-part">
   <div class="logo" id="logo2">
   </div>
 </div>
 <div class="text-part">
  <div class="description" id="description2">
    <div class="subtitle"> 
        <span>企业合作伙伴关系网</span>
    </div>
    <div class="detail" id="detail2">
     <p>
        平台在注册企业的用户基础上建立企业合作伙伴关系网，并基于合作伙伴关系网开展中小企业的债权融资业务和股权交易业务，为企业融资提供便捷的信息对接匹配和信用审核、风险评估服务。 
     </p>
    </div>
  </div>
 </div>
</div>

<div class="item">
 <div class="text-part">
  <div class="description" id="description3">
    <div class="subtitle"> 
        <span>交易双方智能匹配推荐</span>
    </div>
    <div class="detail" id="detail3">
     <p>
        我们通过金融机构借贷的智能推荐功能，实现金融机构和中小企业业务的信息对接和匹配。
     </p>
    </div>
  </div>
 </div>
 <div class="logo-part">
   <div class="logo" id="logo3">
   </div>
 </div>
</div>

<div class="item">
 <div class="logo-part">
   <div class="logo" id="logo4">
   </div>
 </div>
 <div class="text-part">
  <div class="description" id="description4">
    <div class="subtitle"> 
        <span>业务高效，规范</span>
    </div>
    <div class="detail" id="detail4">
     <p>
        通过平台，中小企业基于他们各自的合作伙伴关系网络完成企业融资的相关业务，包括企业间借贷，企业间担保、企业贷款等，让中小企业更加规范，方便和高效率。
     </p>
    </div>
  </div>
 </div>
</div>

</div>
</template>


<style scoped>
.main{
	width: 100%;
	min-width: 1280px;
	height: 278px;
}
.item{
	width: 100%;
	min-width: 1280px;
	height: 278px;
}
.text-part{
	float: left;
	display: inline;
	width: 50%;
	height: 100%;
	min-width: 640px;
}
.description{
	width: 500px;
	position: relative;
	top: 50%;
}
.subtitle{
	width: 100%;
	height: 50px;
	font-size: 35px;
	color: #4b4b4b;
	font-family: "Hiragino Sans GB";
}
.detail{
	width: 100%;
	font-size: 20px;
	color: #4b4b4b;
	font-family: Hiragino Sans GB;
}
.logo-part{
	float: left;
	display: inline;
	width: 50%;
	height: 100%;
	min-width: 640px;
}
.logo{
	display: block;
	position: relative;
	top: 50%;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: auto;
}

#description1{
    width: 500px;
	height: 172px;
    margin-top: -86px;
	float: left;
	margin-left: 120px;
	margin-right: auto;
}
#detail1{
    height: 72px;
	margin-top: 50px;
}
#logo1{
    width: 141px;
	height: 134px;
    background: url("/static/homepageImage/icon_custom.png");
	background-size: 141px 134px;
    margin-top: -67px;
}

#description2{
    width: 557px;
	height: 210px;
    margin-top: -110px;
	float: right;
	margin-right: 120px;
	margin-left: auto;
}
#detail2{
   height: 130px;
   margin-top: 43px;
}
#logo2{
    width: 156px;
	height: 156px;
    background: url("/static/homepageImage/icon_network.png");
	background-size: 156px 156px;
    margin-top: -78px;
}

#description3{
    width: 510px;
	height: 144px;
    margin-top: -72px;
	float: left;
	margin-left: 120px;
	margin-right: auto;
}
#detail3{
   height: 72px;
	margin-top: 35px;
}
#logo3{
    width: 166px;
	height: 170px;
    background: url("/static/homepageImage/icon_fit.png");
	background-size: 166px 170px;
    margin-top: -85px;
}

#description4{
    width: 585px;
	height: 188px;
    margin-top: -94px;
	float: right;
	margin-right: 120px;
	margin-left: auto;
}
#detail4{
    height: 99px;
	margin-top: 39px;
}
#logo4{
    width: 155px;
	height: 153px;
    background: url("/static/homepageImage/icon_efficiency.png");
	background-size:  155px 153px;
    margin-top:-76px;
}
</style>