<template>
  <div class="stat">
    <div class="stat__icon">
      <i :class="icon" :style="iconStyle"></i>
    </div>
    <div class="stat__info">
      <span class="stat__title">{{ title }}</span>
      <span class="stat__value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseStat',
  props: {
    title: String,
    value: Number,
    icon: {
      type: String,
      default: 'fa fa-question',
    },
    iconColor: {
      type: String,
      default: '#000',
    },
  },
  computed: {
    iconStyle() {
      return `color: ${this.iconColor}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.stat {
  display: flex;
  flex-grow: 1;
  padding: 20px;
  margin: 0 20px 20px 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #0002;
  box-shadow: 0 1px 5px #0002;

  &__icon {
    display: flex;
    align-items: center;

    & i {
      font-size: 5rem;
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__title {
    font-size: 1.2rem;
  }

  &__value {
    font-size: 3rem;
  }
}
</style>
