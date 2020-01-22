<template>
  <div class="header">
    <h1 class="header-title">
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;

  &-title {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 100;
    text-align: center;
    flex-grow: 1;
  }
}
</style>
