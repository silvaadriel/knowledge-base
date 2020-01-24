<template>
  <div class="hamburger-button" @click="onClick">
    <div
      :style="'background: ' + color"
      :class="[
        'hamburger-button__bar1',
        { 'hamburger-button__bar1--change': change },
      ]"
    ></div>
    <div
      :style="'background: ' + color"
      :class="[
        'hamburger-button__bar2',
        {'hamburger-button__bar2--change': change},
      ]"
    ></div>
    <div
      :style="'background: ' + color"
      :class="[
        'hamburger-button__bar3',
        {'hamburger-button__bar3--change': change},
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BaseHamburgerButton',
  props: {
    color: {
      type: String,
      default: '#fff',
    },
  },
  data: () => ({
    change: false,
  }),
  methods: {
    onClick() {
      this.change = !this.change;
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburger-button {
  display: inline-block;
  cursor: pointer;

  &__bar1, &__bar2, &__bar3 {
    width: 35px;
    height: 2px;
    margin: 6px 0;
    border-radius: 5px;
    transition: 0.4s;
  }

  &__bar1--change {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  &__bar2--change {
    opacity: 0;
  }

  &__bar3--change {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-4px, -8px);
  }
}
</style>
