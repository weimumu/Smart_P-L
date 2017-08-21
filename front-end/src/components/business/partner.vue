<template>
  <div class="partner">
    <div class="leftTab">
      <div class="Tab" @click="goTo('friend')" :class="{TabChange: show.friend}">
        <span><img src="/static/business/partner/icon_friend.png"></span>
      </div>
      <div class="leftLine"></div>
      <div class="Tab" @click="goTo('moments')" :class="{TabChange: show.moments}">
        <span><img src="/static/business/partner/icon_moments.png"></span>
      </div>
      <div class="leftLine"></div>         
      <div class="Tab" @click="goTo('news')" :class="{TabChange: show.news}">
        <span><img src="/static/business/partner/icon_news.png"></span>
      </div>
    </div>
    <div class="friend" v-if="show.friend">
      <span class="title">好友管理</span>
      <div class="rightContent">
        <div class="partLeft">
          <div>
            <img src="/static/business/partner/icon_search.png" class="search">
            <input type="text" class="searchInput"> 
          </div>
          <div class="list">
             <mu-list>
              <li v-for="items in getFriends" style="list-style-type:none;">
                <mu-list-item :title=items.comName :key="items.comName" :describeText=items.comField :titleClass="{listFont: true}" :describeTextClass="{listFont1: true}">
                  <mu-avatar :src=items.url slot="leftAvatar" :size="30"/>
                </mu-list-item>
                <mu-divider/>
              </li>
            </mu-list> 
          </div>
        </div>
        <div class="partRight"></div>
      </div>
    </div>
    <div class="moments" v-if="show.moments">
      伙伴动态
    </div>
    <div class="news" v-if="show.news">
      新闻
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      show: {
        friend: true,
        moments: false,
        news: false
      },
      friends: [
        {
          url: '/static/business/partner/boy.png',
          comName: '华为公司',
          comField: '互联网'
        },
        {
          url: '/static/business/partner/boy.png',
          comName: '华为公司',
          comField: '互联网'
        }
      ]
    };
  },
  methods: {
    goTo (mes) {
      for (var key in this.show) {
        if (key.toString() === mes) {
          this.show[key] = true;
        } else {
          this.show[key] = false;
        }
      }
    }
  },
  computed: {
    getFriends () {
      return this.friends;
    }
  }
};
</script>


<style scoped lang="scss">
.title{
  color: #4b4b4b;
  top: 20px;
  font-size: 20px;
  position: relative;
  margin-left: 10px;
}
.leftTab{
  position: fixed;
  height: 100%;
  width: 88px;
  background: url("/static/business/partner/leftTab.png");
  background-size: 100% 100%;
  .Tab{
    cursor: pointer;
    width: 100%;
    height: 90px;
    text-align: center;
    display:table;
    span{
      display:table-cell;
      vertical-align:middle;
    }
  }
  .Tab:hover, .TabChange{
    background: url("/static/business/partner/hover.png");
    background-size: 100% 100%;
  }
  .leftLine{
    width: 66px;
    height: 6px;
    margin-left: 11px;
    background: url("/static/business/partner/leftLine.png");
  }
}
.friend{
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 796px;
}
.rightContent{
  margin-top: 50px;
  height: 450px;
  width: 796px;
  background: red;
  background: url("/static/business/partner/bg_friend.png");
  background-size: 100% 100%;
  .partLeft {
    position: relative;
    height: 450px;
    width: 195px;
    .search{
      margin-top: 15px;
      margin-left: 16px;
    }
    .searchInput{
      position: absolute;
      right: 10px;
      top: 10.5px;
      border: 0;
      outline: none;
      width: 139px;
      height: 24px;
      background: url("/static/business/partner/bg_search.png");
    }
    .list{
      overflow-x: auto;
      margin-top: -2px;
      height: 400px;
      margin-left: 6px;
      margin-right: 2px;
    }
  }
}
</style>

<style>
.mu-item{
  padding: 4px;
}
.mu-item-text {
  margin-top: 2px;
}
.mu-item.show-left{
  padding-left: 60px; 
}
.listFont{
  padding-top: 4px;
  font-size: 15px;
}
.listFont1{
  font-size: 10px;
}
.mu-item.has-avatar{
  min-height: 40px ;
}
</style>

