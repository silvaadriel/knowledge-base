<template>
  <div class="page-title">
    <h1><i v-if="icon" :class="icon"></i>{{ mainTitle }}</h1>
    <h2>{{ subtitle }}</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'BasePageTitle',
  props: {
    mainTitle: {
      type: String,
      required: true,
    },
    subtitle: String,
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
.page-tile {
  & h2 {
    color: #777;
    margin-top: 5px;
    font-size: 1.3rem;
  }
}
</style>
