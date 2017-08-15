<template>
  <div class="main">
      <img src="/static/logo.png" class="logo"/>
      <div class="registContent" :class="{registChange: active}">
         <div class="registFont">注册</div>
         <div class="registStepper">
            <mu-stepper :activeStep="activeStep" :linear="false">
                <mu-step>
                    <mu-step-button @click="goToFirst(0)">
                    </mu-step-button>
                </mu-step>
                <mu-step>
                     <mu-step-button @click="goToFirst(1)">
                     </mu-step-button>
                </mu-step>
                <mu-step class="thirdButton">
                    <mu-step-button @click="goToFirst(2)">
                    </mu-step-button>
                </mu-step>
            </mu-stepper>
         </div>
         <div class="firstRegist" v-if="activeStep === 0">
            <div class="registMes">
               <span>邮箱地址</span>
               <input class="textfield" type="text" placeholder="请输入邮箱地址">  
            </div>
            <div class="registMes">
              <span>密码</span>
              <input class="textfield" type="password">  
            </div>
            <div class="registMes">
              <span>确认密码</span>
              <input class="textfield" type="password">  
            </div>
            <span class="loginMes" @click="goToLogin">已有账户？点击登录</span>
            <button class="nextRegist" @click="next"></button>
         </div>
         <div class="secondRegist" v-if="activeStep === 1">
           <span class="facMes">企业信息</span>
           <div class="facMesContent">
             <div class="leftPart">
               <div class="same">
                 <span>企业全称</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>组织机构代码</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>注册资本</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>成立时间</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>法定代表人</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>公司邮箱</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>公司电话</span>
                 <input class="secondInput" type="text">
               </div>
             </div>
             <div class="rightPart">
               <div class="same">
                 <span>总经理</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>注册地址</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>办公地址</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>所属行业</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>主营产品</span>
                 <input class="secondInput" type="text">
               </div>
               <div class="same">
                 <span>企业简介</span>
                 <input class="secondInput" type="text">
               </div>
               <button class="nextRegist" @click="next" :style="{bottom: '30px', right: '-15px'}"></button>
             </div>
           </div>
         </div>
         <div class="thirdRegist" v-if="activeStep === 2">
           <div class="thirdLeft">
             <span class="thirdMes">企业联系人信息</span>
             <div class="same dif" :style="{marginTop: '20px'}">
                 <span>姓名</span>
                 <input class="secondInput" type="text">
             </div>
              <div class="same dif">
                 <span>职务</span>
                 <input class="secondInput" type="text">
             </div>
              <div class="same dif">
                 <span>手机号</span>
                 <input class="secondInput" type="text">
             </div>
              <div class="same dif">
                 <span>电子邮箱</span>
                 <input class="secondInput" type="text">
             </div>
              <div class="same dif">
                 <span>QQ号码</span>
                 <input class="secondInput" type="text">
             </div>
              <div class="same dif">
                 <span>公司电话</span>
                 <input class="secondInput" type="text">
             </div>
           </div>
           <div class="thirdRight">
              <span class="thirdMes">上传照片验证资料</span>
              <div class="same dif" :style="{marginTop: '20px'}">
                 <span>法人单位执照</span>
                 <div :style="{marginLeft: '76px'}">
                   <ul :style="{margin: 0, padding: 0}">
                    <li :class="{golden: goldenActive0}" style="list-style-type:none;" :style="{position: 'relative', width: '225px', marginBottom: '5px'}" v-for="items in getFileList">
                      <span>{{items.name}}</span><span :key="items.id" :style="{position: 'absolute', right: '0px', cursor: 'pointer'}" @click="deleteFile(items.id)">删除</span>
                    </li>
                   </ul>
                  <div class="proGress" v-if="progressActive">
                    <mu-linear-progress mode="determinate" :value="value" color='#d6a12c' :size="14" :style="{width: '225px', borderRadius: '0'}"/>
                  </div>
                 </div>
                 <a href="javascript:;" class="file" :class="{fileChange: addAvtive}" v-if="visiableActive">
                  <input type="file" @change="handleChange($event)" ref="content" multiple="multiple">
                 </a>
              </div>
              <div class="same dif" :style="{marginTop: '60px'}">
                 <span>银行开户许可证</span>
                 <div :style="{marginLeft: '76px'}">
                   <ul :style="{margin: 0, padding: 0}">
                    <li :class="{golden: goldenActive1}" style="list-style-type:none;" :style="{position: 'relative', width: '225px', marginBottom: '5px', marginLeft: '-20px'}" v-for="items in getFileList1">
                      <span>{{items.name}}</span><span :key="items.id" :style="{position: 'absolute', right: '0px', cursor: 'pointer'}" @click="deleteFile1(items.id)">删除</span>
                    </li>
                   </ul>
                  <div class="proGress" v-if="progressActive1" :style="{marginLeft: '-20px'}">
                    <mu-linear-progress mode="determinate" :value="value1" color='#d6a12c' :size="14" :style="{width: '225px', borderRadius: '0'}"/>
                  </div>
                 </div>
                 <a href="javascript:;" class="file" :class="{fileChange: addAvtive1}" v-if="visiableActive1">
                  <input type="file" @change="handleChange1($event)" ref="content1" multiple="multiple">
                 </a>
              </div>
              <div class="same dif" :style="{marginTop: '55px'}">
                 <span>第三方征信认真</span>
                 <div :style="{marginLeft: '76px'}">
                   <ul :style="{margin: 0, padding: 0}">
                    <li :class="{golden: goldenActive2}" style="list-style-type:none;" :style="{position: 'relative', width: '225px', marginBottom: '5px', marginLeft: '-20px'}" v-for="items in getFileList2">
                      <span>{{items.name}}</span><span :key="items.id" :style="{position: 'absolute', right: '0px', cursor: 'pointer'}" @click="deleteFile2(items.id)">删除</span>
                    </li>
                   </ul>
                  <div class="proGress" v-if="progressActive2" :style="{marginLeft: '-20px'}">
                    <mu-linear-progress mode="determinate" :value="value2" color='#d6a12c' :size="14" :style="{width: '225px', borderRadius: '0'}"/>
                  </div>
                 </div>
                 <a href="javascript:;" class="file" :class="{fileChange: addAvtive2}" v-if="visiableActive2">
                  <input type="file" @change="handleChange2($event)" ref="content2" multiple="multiple">
                 </a>
              </div>
              <button class="submit"></button>
           </div>
         </div>
      </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        activeStep: 0,
        active: false,
        value: 0,
        value1: 0,
        value2: 0,
        progressActive: false,
        addAvtive: false,
        fileList: [],
        visiableActive: true,
        progressActive1: false,
        addAvtive1: false,
        fileList1: [],
        visiableActive1: true,
        progressActive2: false,
        addAvtive2: false,
        fileList2: [],
        visiableActive2: true,
        goldenActive0: false,
        goldenActive1: false,
        goldenActive2: false
      };
    },
    methods: {
      deleteFile (id) {
        var that = this;
        that.fileList.filter(function (d, i) {
          if (d.id === id) {
            that.fileList.splice(i, 1);
          }
        });
        if (!that.fileList.length) {
          this.addAvtive = false;
        }
      },
      deleteFile1 (id) {
        var that = this;
        that.fileList1.filter(function (d, i) {
          if (d.id === id) {
            that.fileList1.splice(i, 1);
          }
        });
        if (!that.fileList1.length) {
          this.addAvtive1 = false;
        }
      },
      deleteFile2 (id) {
        var that = this;
        that.fileList2.filter(function (d, i) {
          if (d.id === id) {
            that.fileList2.splice(i, 1);
          }
        });
        if (!that.fileList2.length) {
          this.addAvtive2 = false;
        }
      },
      next () {
        this.activeStep++;
        this.active = true;
      },
      handleChange (event) {
        var file = this.$refs.content.files[0];
        console.log(file.name);
        console.log(this.fileList.length + 1);
        var addFile = {
          name: file.name.substring(0, 20) + '...',
          id: this.fileList.length + 1
        };
        this.fileList.push(addFile);
        console.log(addFile);
        this.visiableActive = false;
        this.progressActive = true;
        this.value = 0;
        this.timer = setInterval(() => {
          this.value += Math.ceil(Math.random() * 10) + 15;
          if (this.value > 100) {
            this.value = 100;
            clearInterval(this.timer);
            this.progressActive = false;
            this.addAvtive = true;
            this.visiableActive = true;
            this.goldenActive0 = true;
          }
        }, 800);
      },
      handleChange1 (event) {
        var file = this.$refs.content1.files[0];
        var addFile = {
          name: file.name.substring(0, 20) + '...',
          id: this.fileList1.length + 1
        };
        this.fileList1.push(addFile);
        this.visiableActive1 = false;
        this.progressActive1 = true;
        this.value1 = 0;
        this.timer1 = setInterval(() => {
          this.value1 += Math.ceil(Math.random() * 10) + 15;
          if (this.value1 > 100) {
            this.value1 = 100;
            clearInterval(this.timer);
            this.progressActive1 = false;
            this.addAvtive1 = true;
            this.visiableActive1 = true;
            this.goldenActive1 = true;
          }
        }, 800);
      },
      handleChange2 (event) {
        var file = this.$refs.content2.files[0];
        var addFile = {
          name: file.name.substring(0, 20) + '...',
          id: this.fileList2.length + 1
        };
        this.fileList2.push(addFile);
        this.visiableActive2 = false;
        this.progressActive2 = true;
        this.value2 = 0;
        this.timer2 = setInterval(() => {
          this.value2 += Math.ceil(Math.random() * 10) + 15;
          if (this.value2 > 100) {
            this.value2 = 100;
            clearInterval(this.timer);
            this.progressActive2 = false;
            this.addAvtive2 = true;
            this.visiableActive2 = true;
            this.goldenActive2 = true;
          }
        }, 800);
      },
      goToFirst (item) {
        this.activeStep = item;
        if (this.activeStep !== 0) {
          this.active = true;
        } else {
          this.active = false;
        }
      },
      goToLogin () {
        this.$router.push('/loginfac');
      }
    },
    computed: {
      getFileList () {
        return this.fileList;
      },
      getFileList1 () {
        return this.fileList1;
      },
      getFileList2 () {
        return this.fileList2;
      }
    }
  };
</script>

<style scoped>
  .golden {
    color: #d6a12c;
  }
  .submit {
    position: absolute;
    width: 88px;
    height: 39px;
    background: url("/static/registImage/submit.png");
    border: 0;
    right: 0;
    bottom: -5px;
    background-size: 100% 100%;
  }
  .main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: fixed;
    background-image: url("/static/background.png");
    background-size: 100% 100%;
  }
  .logo{
    position: absolute;
    left: 3.375%;
    top: 3.56%;
  }
  .registContent {
    position: relative;
    top: 16%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    width: 1194px;
    height: 450px;
    background-size: cover;
    background: url("/static/whitebox.png") no-repeat;
  }
  .registChange{
    height: 660px;
    transition: height 0.3s;
    background-size: 100% 100%;
  }
  .registFont {
    box-sizing: border-box;
    position: relative;
    color: #4b4b4b;
    font-size: 30px;
    position: relative;
    left: 67px;
    top: 36px;
    font-family: "Hiragino Sans GB";
  }
  .registStepper {
    box-sizing: border-box;
    position: relative;
    top: 50px;
    width: 990px;
    left:67px;
    height: 29px;
  }
  .firstRegist {
    position: relative;
    left: 67px;
    width: 846px;
    height: 231px;
    box-sizing: border-box;
    top: 90px;
  }
  .registMes {
    height: 49px;
    margin-top: 10px;
    left: 220px;
    width: 284px;
    display:table;
    position: relative;
  }
  .registMes>span{
    font-family: "Hiragino Sans GB";
    vertical-align:middle;  
    display:table-cell;
    color: #4b4b4b;
    font-size: 24.75px;
  }
  .textfield{
    font-size: 20px;
    padding-left: 20px;
    border: 0px;
    outline: none;
    width: 364px;
    height: 49px;
    background: url("/static/typebox.png");
    background-size: 100% 100%;
    position: absolute;
    left: 180px;
    color: #6f6f6f;
  }
  .loginMes{
    cursor: pointer;
    font-size: 18px;
    color: #898989;
    position: absolute;
    bottom: 15px;
    left: 20px;
    font-family: "Hiragino Sans GB";
  }
  .nextRegist {
    position: absolute;
    width: 41px;
    height: 41px;
    right: 0px;
    bottom: 10px;
    border: 0;
    display: inline-block;
    background: url("/static/registImage/arrow.png");
  }
  .facMes {
    font-size: 25px;
    position: relative;
    color: #4b4b4b;
    top: 72px;
    left: 67px;
  }
  .facMesContent,.thirdRegist{
    position: relative;
    width: 1034px;
    height: 420px;
    top: 80px;
    left: 64px;
  }
  .leftPart{
    margin-top: 10px;
    display: inline-block;
    width: 479px;
    height: 420px;
    position: relative;
  }
  .same{
    display:table;
    height: 44px;
    margin-bottom: 13px;
  }
  .same>span{
    vertical-align:middle;  
    display:table-cell;
    font-size: 20px;
    color: #4b4b4b;
  }
  .secondInput{
    padding-left: 20px;
    color: #6f6f6f;
    font-size: 18px;
    border: 0px;
    outline: none;
    height: 44px;
    width: 315px;
    position: absolute;
    right: 5px;
    background: url("/static/typebox.png");
    background-size: 100% 100%;
  }
  .rightPart {
    position: relative;
    margin-left: 43px;
    display: inline-block;
    width: 500px;
    height: 420px;
  }
  .thirdLeft{
    position: relative;
    width: 474px;
    height: 402px;
    display: inline-block;
  }
  .thirdRight{
    position: relative;
    left: 45px;
    width: 484px;
    height: 402px;
    display: inline-block;
  }
  .thirdMes {
    color: #4b4b4b;
    font-size: 25px;
  }
  .dif{
    margin-left: 5px;
  }
  .file {
    cursor: 'pointer';
    width: 285px;
    height: 60px;
    position: absolute;
    right: 0;
    background: url("/static/registImage/submitpic.png");
  }
  .file input {
    width: 285px;
    height: 60px;
    opacity: 0;
  }
  .file:hover {
    color: #004974;
    text-decoration: none;
  }
  .fileChange {
    width: 67px;
    height: 19px;
    position: absolute;
    right: 55px;
    background: url("/static/registImage/submitting.png");
  }
  .fileChange input{
    width: 67px;
    height: 19px;
    opacity: 0;
  }
  .proGress{
    background: url("/static/registImage/submitwaitingbox.png")
  }
</style>

<style lang="scss">
  .mu-linear-progress {
    background: none;
    border-radius: 0 !important;
  }
  .mu-linear-progress-determinate{
    border-radius: 0 !important;
  }
  .registStepper {
    span.mu-step-label.active, span.mu-step-label{
      height: 29px;
    }
    div.mu-step-label-circle, span.mu-step-label-icon-container{
      border-radius: 0;
      height: 29px;
      width: 59px;
      line-height: 29px;
      font-size: 22px;
      text-indent: -6px;
      font-weight: 600;
      margin-right: 0;
    }
    .good{
      margin-top: 50px;
      width: 50px;
      height: 50px;
    }
    .mu-step-label.active .mu-step-label-circle, .mu-step-label.completed .mu-step-label-circle {
      background: url("/static/registImage/1&2Golden.png");
    }
    .mu-step-label{
      padding: 0;
    }
    .mu-step-label-circle, .mu-step-label.disabled .mu-step-label-circle {
      background: url("/static/registImage/1&2Gray.png");
    }
    .thirdButton {
      .mu-step-label-circle {
        background: url("/static/registImage/3Gray.png");
      }
      .mu-step-label.active .mu-step-label-circle {
        background: url("/static/registImage/3Golden.png");
      }
      div.mu-step-label-circle, span.mu-step-label-icon-container{
        text-indent: 0;
        width: 57px;
      }
    }
  }
</style>