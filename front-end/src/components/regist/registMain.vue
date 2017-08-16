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
      <div class="firstRegist" v-show="activeStep === 0">
        <myinput v-bind:change.value="message.userEmail" itype='text' itname="邮箱地址" v-on:tranvalue="fatherValue"></myinput>
        <myinput v-bind:change.value="message.userPass" itype='password' itname="密码" v-on:tranvalue="fatherValue"></myinput>
        <myinput v-bind:change.value="message.userPassComfim" itype='password' itname="确认密码" v-on:tranvalue="fatherValue"></myinput>
        <span class="loginMes" @click="goToLogin">已有账户？点击登录</span>
        <button class="nextRegist" @click="next"></button>
      </div>
      <div class="secondRegist" v-show="activeStep === 1">
        <span class="facMes">企业信息</span>
        <div class="facMesContent">
          <div class="leftPart">
            <myinput v-bind:change.value="message.comName" isActive=true itype='text' itname="企业全称" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comCode" isActive=true itype='text' itname="组织机构代码" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comCapital" isActive=true itype='text' itname="注册资本" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comTime" isActive=true itype='text' itname="成立时间" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comPerson" isActive=true itype='text' itname="法定代表人" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comEmail" isActive=true itype='text' itname="公司邮箱" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comPhone" isActive=true itype='text' itname="公司电话" v-on:tranvalue="fatherValue"></myinput>
          </div>
          <div class="rightPart">
            <myinput v-bind:change.value="message.comManager" isActive=true itype='text' itname="总经理" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comRegistAddresss" isActive=true itype='text' itname="注册地址" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comWorkAddresss" isActive=true itype='text' itname="办公地址" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comField" isActive=true itype='text' itname="所属行业" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comProduct" isActive=true itype='text' itname="主营产品" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.comIntro" isActive=true itype='text' itname="企业简介" v-on:tranvalue="fatherValue"></myinput>
          </div>
          <button class="nextRegist" @click="next" :style="{bottom: '10px', right: '20px'}"></button>
        </div>
      </div>
      <div class="thirdRegist" v-show="activeStep === 2">
        <div class="thirdLeft">
          <span class="thirdMes">企业联系人信息</span>
          <div :style="{marginTop: '45px'}">
            <myinput v-bind:change.value="message.contactName" isActive=true itype='text' itname="姓名" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.contactJob" isActive=true itype='text' itname="职务" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.contactMobile" isActive=true itype='text' itname="手机号" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.contactEmail" isActive=true itype='text' itname="电子邮箱" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.contactQQ" isActive=true itype='text' itname="QQ号码" v-on:tranvalue="fatherValue"></myinput>
            <myinput v-bind:change.value="message.contactPhone" isActive=true itype='text' itname="公司个人电话" v-on:tranvalue="fatherValue"></myinput>
          </div>
        </div>
        <div class="thirdRight">
          <span class="thirdMes">上传照片验证资料</span>
          <div class="same" :style="{marginTop: '40px'}">
            <span>法人单位执照</span>
            <div :style="{marginLeft: '53.73px'}">
              <ul :style="{margin: 0, padding: 0}">
                <li :class="{golden: goldenActive0}" style="list-style-type:none;" :style="{position: 'relative', width: '159px', marginBottom: '3.53px', fontSize: '10px'}" v-for="items in getFileList">
                  <span>{{items.name}}</span><span :key="items.id" :style="{position: 'absolute', right: '0px', cursor: 'pointer'}" @click="deleteFile(items.id)">删除</span>
                </li>
              </ul>
              <div class="proGress" v-if="change.progressActive">
                <mu-linear-progress mode="determinate" :value="change.value" color='#d6a12c' :size="9.89" :style="{width: '159px', borderRadius: '0'}"/>
              </div>
            </div>
            <a href="javascript:;" class="file" :class="{fileChange: change.addAvtive}" v-if="change.visiableActive">
              <input type="file" @change="handleChange($event)" ref="content" multiple="multiple">
            </a>
          </div>
          <div class="same" :style="{marginTop: '30px'}">
            <span>银行开户许可证</span>
            <div :style="{marginLeft: '53.73px'}">
              <ul :style="{margin: 0, padding: 0}">
                <li :class="{golden: goldenActive1}" class="liStyle" v-for="items in getFileList1">
                  <span>{{items.name}}</span><span :key="items.id" :style="{position: 'absolute', right: '0px', cursor: 'pointer'}" @click="deleteFile1(items.id)">删除</span>
                </li>
              </ul>
              <div class="proGress" v-if="change.progressActive1" :style="{marginLeft: '-14.2px'}">
                <mu-linear-progress mode="determinate" :value="change.value1" color='#d6a12c' :size="9.89" :style="{width: '159px', borderRadius: '0'}"/>
              </div>
            </div>
            <a href="javascript:;" class="file" :class="{fileChange: change.addAvtive1}" v-if="change.visiableActive1">
              <input type="file" @change="handleChange1($event)" ref="content1" multiple="multiple">
            </a>
          </div>
          <div class="same" :style="{marginTop: '30px'}">
            <span>第三方征信认证</span>
            <div :style="{marginLeft: '53.73px'}">
              <ul :style="{margin: 0, padding: 0}">
                <li :class="{golden: goldenActive2}" class="liStyle" v-for="items in getFileList2">
                  <span>{{items.name}}</span><span :key="items.id" :style="{position: 'absolute', right: '0px', cursor: 'pointer'}" @click="deleteFile2(items.id)">删除</span>
                </li>
              </ul>
              <div class="proGress" v-if="change.progressActive2" :style="{marginLeft: '-14.2px'}">
                <mu-linear-progress mode="determinate" :value="change.value2" color='#d6a12c' :size="9.89" :style="{width: '159px', borderRadius: '0'}"/>
              </div>
            </div>
            <a href="javascript:;" class="file" :class="{fileChange: change.addAvtive2}" v-if="change.visiableActive2">
              <input type="file" @change="handleChange2($event)" ref="content2" multiple="multiple">
            </a>
          </div>
          <button class="submit" @click="post"></button>
        </div>
      </div>    
    </div>
  </div>
</template>

<script>
  import myinput from './myInput.vue';
  export default {
    data () {
      return {
        activeStep: 0,
        active: false,
        message: {
          userEmail: '',
          userPass: '',
          userPassComfim: '',
          comName: '',
          comCode: '',
          comCapital: '',
          comTime: '',
          comPerson: '',
          comEmail: '',
          comPhone: '',
          comManager: '',
          comRegistAddresss: '',
          comWorkAddresss: '',
          comField: '',
          comProduct: '',
          comIntro: '',
          contactName: '',
          contactJob: '',
          contactMobile: '',
          contactEmail: '',
          contactQQ: '',
          contactPhone: ''
        },
        change: {
          progressActive: false,
          addAvtive: false,
          fileList: [],
          visiableActive: true,
          value: 0,
          progressActive1: false,
          addAvtive1: false,
          fileList1: [],
          visiableActive1: true,
          value1: 0,
          progressActive2: false,
          addAvtive2: false,
          fileList2: [],
          visiableActive2: true,
          value2: 0,
          goldenActive0: false,
          goldenActive1: false,
          goldenActive2: false
        }
      };
    },
    components: {
      myinput
    },
    methods: {
      goToLogin () {
        this.$router.push('/loginfac');
      },
      post () {
        this.$router.push('/success');
      },
      deleteFile (id) {
        var that = this;
        that.change.fileList.filter(function (d, i) {
          if (d.id === id) {
            that.change.fileList.splice(i, 1);
          }
        });
        if (!that.change.fileList.length) {
          this.change.addAvtive = false;
        }
      },
      handleChange (event) {
        var file = this.$refs.content.files[0];
        console.log(file.name);
        console.log(this.change.fileList.length + 1);
        var addFile = {
          name: file.name.substring(0, 20) + '...',
          id: this.change.fileList.length + 1
        };
        this.change.fileList.push(addFile);
        console.log(addFile);
        this.change.visiableActive = false;
        this.change.progressActive = true;
        this.change.value = 0;
        this.timer = setInterval(() => {
          this.change.value += Math.ceil(Math.random() * 10) + 15;
          if (this.change.value > 100) {
            this.change.value = 100;
            clearInterval(this.timer);
            this.change.progressActive = false;
            this.change.addAvtive = true;
            this.change.visiableActive = true;
            this.goldenActive0 = true;
          }
        }, 800);
      },
      deleteFile1 (id) {
        var that = this;
        that.change.fileList1.filter(function (d, i) {
          if (d.id === id) {
            that.change.fileList1.splice(i, 1);
          }
        });
        if (!that.change.fileList1.length) {
          this.change.addAvtive1 = false;
        }
      },
      handleChange1 (event) {
        var file = this.$refs.content1.files[0];
        var addFile = {
          name: file.name.substring(0, 20) + '...',
          id: this.change.fileList1.length + 1
        };
        this.change.fileList1.push(addFile);
        this.change.visiableActive1 = false;
        this.change.progressActive1 = true;
        this.change.value1 = 0;
        this.timer1 = setInterval(() => {
          this.change.value1 += Math.ceil(Math.random() * 10) + 15;
          if (this.change.value1 > 100) {
            this.change.value1 = 100;
            clearInterval(this.timer1);
            this.change.progressActive1 = false;
            this.change.addAvtive1 = true;
            this.change.visiableActive1 = true;
            this.goldenActive1 = true;
          }
        }, 800);
      },
      deleteFile2 (id) {
        var that = this;
        that.change.fileList2.filter(function (d, i) {
          if (d.id === id) {
            that.change.fileList2.splice(i, 1);
          }
        });
        if (!that.change.fileList2.length) {
          this.change.addAvtive2 = false;
        }
      },
      handleChange2 (event) {
        var file = this.$refs.content2.files[0];
        var addFile = {
          name: file.name.substring(0, 20) + '...',
          id: this.change.fileList2.length + 1
        };
        this.change.fileList2.push(addFile);
        this.change.visiableActive2 = false;
        this.change.progressActive2 = true;
        this.change.value2 = 0;
        this.timer2 = setInterval(() => {
          this.change.value2 += Math.ceil(Math.random() * 10) + 15;
          if (this.change.value2 > 100) {
            this.change.value2 = 100;
            clearInterval(this.timer2);
            this.change.progressActive2 = false;
            this.change.addAvtive2 = true;
            this.change.visiableActive2 = true;
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
      fatherValue (myValue, itname) {
        if (itname === '邮箱地址') {
          this.message.userEmail = myValue;
        } else if (itname === '密码') {
          this.message.userPass = myValue;
        } else if (itname === '确认密码') {
          this.message.userPassComfim = myValue;
        } else if (itname === '企业全称') {
          this.message.comName = myValue;
        } else if (itname === '组织机构代码') {
          this.message.comCode = myValue;
        } else if (itname === '注册资本') {
          this.message.comCapital = myValue;
        } else if (itname === '成立时间') {
          this.message.comTime = myValue;
        } else if (itname === '法定代表人') {
          this.message.comPerson = myValue;
        } else if (itname === '公司邮箱') {
          this.message.comEmail = myValue;
        } else if (itname === '公司电话') {
          this.message.comPhone = myValue;
        } else if (itname === '总经理') {
          this.message.comManager = myValue;
        } else if (itname === '注册地址') {
          this.message.comRegistAddresss = myValue;
        } else if (itname === '办公地址') {
          this.message.comWorkAddresss = myValue;
        } else if (itname === '所属行业') {
          this.message.comField = myValue;
        } else if (itname === '主营产品') {
          this.message.comProduct = myValue;
        } else if (itname === '企业简介') {
          this.message.comIntro = myValue;
        } else if (itname === '姓名') {
          this.message.contactName = myValue;
        } else if (itname === '职务') {
          this.message.contactJob = myValue;
        } else if (itname === '手机号') {
          this.message.contactMobile = myValue;
        } else if (itname === '电子邮箱') {
          this.message.contactEmail = myValue;
        } else if (itname === 'QQ号码') {
          this.message.contactQQ = myValue;
        } else if (itname === '公司个人电话') {
          this.message.contactPhone = myValue;
        }
      },
      next () {
        this.activeStep++;
        this.active = true;
      }
    },
    computed: {
      getFileList () {
        return this.change.fileList;
      },
      getFileList1 () {
        return this.change.fileList1;
      },
      getFileList2 () {
        return this.change.fileList2;
      }
    }
  };
</script>

<style scoped>
  .submit {
    position: absolute;
    width: 62.216px;
    height: 27.57px;
    background: url("/static/registImage/submit.png");
    border: 0;
    right: 0;
    bottom: -10px;
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
    height: 90px;
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
    width: 807px;
    height: 325px;
    background-size: 100% 100%;
    background: url("/static/whitebox.png") no-repeat;
  }
  .registFont {
    position: relative;
    color: #4b4b4b;
    font-size: 21px;
    position: relative;
    left: 47px;
    top: 30px;
  }
  .registStepper {
    box-sizing: border-box;
    position: relative;
    top: 39px;
    width: 700px;
    left: 47px;
    height: 29px;
  }
  .firstRegist {
    position: relative;
    left: 57px;
    width: 598px;
    height: 163px;
    box-sizing: border-box;
    top: 60px;
  }
  .loginMes{
    cursor: pointer;
    font-size: 12.5px;
    color: #898989;
    position: absolute;
    bottom: 5px;
    left: 0;
    font-family: "Hiragino Sans GB";
  }
  .nextRegist {
    cursor: pointer;
    position: absolute;
    width: 29px;
    height: 29px;
    right: 20px;
    bottom: 5px;
    border: 0;
    display: inline-block;
    background: url("/static/registImage/arrow.png");
    background-size: 100% 100%;
  }
  .registChange{
    position: relative;
    top: 16%;
    transition: height 0.2s;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    width: 807px;
    height: 450px;
    background-size: 100% 100%;
    background: url("/static/whitebox.png") no-repeat;
  }
  .facMes {
    font-size: 17.5px;
    position: relative;
    color: #4b4b4b;
    top: 51px;
    left: 47px;
  }
  .facMesContent, .thirdRegist{
    position: relative;
    width: 731px;
    height: 297px;
    top: 56.56px;
    left: 47px;
  }
  .leftPart{
    display: inline-block;
    width: 338.65px;
    height: 297px;
    position: relative;
  }
  .rightPart {
    position: relative;
    margin-left: 30px;
    display: inline-block;
    width: 353px;
    height: 297px;
  }
  .thirdLeft{
    position: relative;
    width: 335.11px;
    height: 284.2px;
    display: inline-block;
  }
  .thirdRight{
    position: relative;
    left: 25px;
    width: 342.2px;
    height: 284.2px;
    display: inline-block;
  }
  .thirdMes {
    position: absolute;
    color: #4b4b4b;
    font-size: 17.6px;
  }
  .same{
    display:table;
    height: 42.42px;
    margin-bottom: 9.2px;
    margin-left: 3.53px;
  }
  .same>span{
    vertical-align:middle;  
    display:table-cell;
    font-size: 14.1px;
    color: #4b4b4b;
  }
  .file {
    cursor: 'pointer';
    width: 200px;
    height: 42.42px;
    position: absolute;
    right: 0;
    background: url("/static/registImage/submitpic.png");
    background-size: 100% 100%;
  }
  .file input {
    width: 200px;
    height: 42.42px;
    opacity: 0;
  }
  .file:hover {
    color: #004974;
    text-decoration: none;
  }
  .fileChange {
    width: 47.37px;
    height: 13.43px;
    position: absolute;
    right: 38.88px;
    background: url("/static/registImage/submitting.png");
    background-size: 100% 100%;
  }
  .fileChange input{
    width: 47.3px;
    height: 13.4px;
    opacity: 0;
  }
  .proGress{
    width: 159px;
    height: 9.89px;
    background: url("/static/registImage/submitwaitingbox.png");
    background-size: 100% 100%;
  }
  .golden {
    color: #d6a12c;
  }
  .liStyle{
     list-style-type: none; 
     position: relative;
     width: 159px;
     margin-bottom: 3.53px;
     font-size: 10px;
     margin-left: -14.2px;
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
      height: 20px;
    }
    div.mu-step-label-circle, span.mu-step-label-icon-container{
      border-radius: 0;
      height: 21.5px;
      width: 43.7px;
      line-height: 20px;
      font-size: 15px;
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
      background-size: 100% 100%;
    }
    .mu-step-label{
      padding: 0;
    }
    .mu-step-label-circle, .mu-step-label.disabled .mu-step-label-circle {
      background: url("/static/registImage/1&2Gray.png");
      background-size: 100% 100%;
    }
    .thirdButton {
      .mu-step-label-circle {
        background: url("/static/registImage/3Gray.png");
        background-size: 100% 100%;
      }
      .mu-step-label.active .mu-step-label-circle {
        background: url("/static/registImage/3Golden.png");
        background-size: 100% 100%;
      }
      div.mu-step-label-circle, span.mu-step-label-icon-container{
        text-indent: 0;
        width: 42.3px;
      }
    }
  }
</style>
