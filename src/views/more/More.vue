<template>
  <div class="more">
    <top-bar ref="top_bar">
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/icon/icon_back.png" alt="" />
        </div>
      </template>
      <template #center>更多设置</template>
    </top-bar>

    <!-- 设置列表 -->
    <div class="setting-list">
      <div class="setting-list-item" @click="showColor">更改顶部颜色</div>
      <div class="change-color" v-show="colorShow">
        <span class="color-item color-one" @click="changeColor('#cfcfcf')">灰蒙蒙</span>
        <span class="color-item color-two" @click="changeColor('#87ceeb')">天空蓝</span>
        <span class="color-item color-three" @click="changeColor('#228b22')">森林绿</span>
      </div>
      <div class="setting-list-item" @click="clearCityList">清除缓存</div>
      <div class="setting-list-item" @click="shareMood">分享软件</div>
    </div>

    <!-- 清除缓存提示框 -->
    <div class="mask" v-show="promptShow"></div>
    <prompt v-show="promptShow" @noClick="noClick" @yesClick="yesClick">
      <span slot="info">您确定要清空所有缓存吗？</span>
      <span slot="confirm" class="confirm-btn">确认</span>
    </prompt>

    <div class="mask" v-show="shareShow"></div>
    <prompt v-show="shareShow" @noClick="noClick2" @yesClick="yesClick2">
      <div slot="title">分享天气</div>
      <div slot="info">今天的天气真不错！</div>
      <div slot="confirm" class="confirm-btn">发送</div>
    </prompt>
  </div>
</template>

<script>
import TopBar from "components/content/topBar/TopBar";
import Prompt from "components/content/prompt/Prompt"

export default {
  name: "More",
  components: {
    TopBar,
    Prompt
  },
  data() {
    return {
      colorShow: false,
      promptShow: false,
      shareShow: false
    }
  },
  methods: {
    // 点击返回首页
    backClick() {
      this.$router.go(-1);
    },
    // 点击展示可改变的颜色
    showColor() {
      this.colorShow = !this.colorShow;
    },
    // 改变顶部颜色
    changeColor(color) {
      this.$refs.top_bar.changeColor(color);
    },
    // 清除缓存
    clearCityList() {
      this.promptShow = !this.promptShow;
    },
    // 清除缓存点击取消
    noClick() {
      this.promptShow = !this.promptShow;
    },
    // 清除缓存点击确认
    yesClick() {
      this.$store.commit('initCityList');
      this.$router.push('/home');
    },
    // 分享心情
    shareMood() {
      this.shareShow = !this.shareShow;
    },
    // 分享心情点击取消
    noClick2() {
      this.shareShow = !this.shareShow;
    },
    // 分享心情点击确认
    yesClick2() {
      this.shareShow = !this.shareShow;
      this.$toast.show('发送成功');
    }

  },
};
</script>

<style scoped>
.back img {
  width: 28px;
  height: 28px;
  margin-top: 8px;
  margin-left: 8px;
}

.setting-list-item {
  width: 100%;
  height: 40px;
  padding-left: 10px;

  line-height: 40px;
  color: #888;
}

.change-color {
  display: flex;
}

.color-item {
  flex: 1;
  height: 30px;
  line-height: 30px;

  text-align: center;
  font-size: 14px;
}

.color-one {
  background-color: #cfcfcf;
}

.color-two {
  background-color: #87ceeb;
}

.color-three {
  background-color: #228b22;
}

.confirm-btn {
  margin-left: 10px;
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  opacity: 0.6;
  background-color: #ccc;
  z-index: 3;
}
</style>