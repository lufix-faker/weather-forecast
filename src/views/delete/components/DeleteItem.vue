<template>
  <div class="delete-item">
    <div class="laji" @click="deleteItemClick">
      <img src="~assets/img/icon/icon_laji.png" alt="" />
    </div>
    <div class="city">
      <span>{{ currentCity.city }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteItem",
  props: {
    currentCity: {
      type: Object,
      default: {},
    },
  },
  methods: {
    deleteItemClick() {
      this.$emit('deleteItemClick');
    }
  },
};
</script>

<style scoped>
.delete-item {
  height: 85px;
  margin: 5px;
  margin-top: 10px;
  padding: 25px 10px 10px;

  border-radius: 10px;
  box-shadow: 0 0 3px #ccc;
  background-color: #fff;

  vertical-align: top;
}

.laji {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.laji img {
  width: 100%;
}

.city {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  line-height: 40px;
  vertical-align: middle;
}
</style>