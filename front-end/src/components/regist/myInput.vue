<template>
  <div :class="{active: isActive}">
    <span :class="{active1: isActive}">{{itname}}</span>
    <input :class="{active2: isActive}" type="text" v-model="myValue" v-on:input="updateValue($event.target.value)" v-if="itype === 'text'">
    <input :class="{active2: isActive}" type="password" v-model="myValue" v-on:input="updateValue($event.target.value)" v-if="itype === 'password'">
    <input :class="{active2: isActive}" type="email" v-model="myValue" v-on:input="updateValue($event.target.value)" v-if="itype === 'email'">
  </div>
</template>

<script>
  export default{
    props: ['value', 'itype', 'itname', 'isActive'],
    data () {
      return {
        myValue: this.value
      };
    },
    watch: {
      value (val) {
        this.myValue = val;
      },
      myValue (val) {
        this.$emit('tranvalue', val, this.itname);
      }
    },
    methods: {
      updateValue (value) {
        this.myValue = value;
      }
    }
  };
</script>


<style scoped>
  div{
    position: relative;
    height: 34.64px;
    margin-top: 10px;
    left: 141.4px;
    width: 388px;
    display:table;
    position: relative;
  }
  .active{
    margin-top: 9px;
    left: 0;
    width: 341px;
    height: 30.8px;
  }
  span{
    font-family: "Hiragino Sans GB";
    vertical-align:middle;  
    display:table-cell;
    color: #4b4b4b;
    font-size: 17.5px;
  }
  .active1 {
    font-size: 14.2px;
  }
  input{
    color: #6f6f6f;
    font-size: 13.5px;
    padding-left: 15px;
    position: absolute;
    right: 0;
    border: 0;
    background: url("/static/typebox.png");
    background-size: 100% 100%;
    width: 257.32px;
    height: 34.64px;
    outline: none;
  }
  .active2 {
    font-size: 11.5px;
    width: 228px;
    height: 30.8px;
    right: 15px;
  }
</style>

