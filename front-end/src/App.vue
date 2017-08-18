<template>
  <div id="app">
    <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="$store.state.main.popUp">
      {{$store.state.main.popMsg}}
    </mu-popup>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: "Hiragino Sans GB";
  width: 100%;
  height: 100%;
}
button{
  outline:none;
}
.popup-top {
  background-color: #d6a12c !important;
  color: #ffffff !important;
  width: 100%;
  opacity: .8;
  height: 40px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
}
</style>
