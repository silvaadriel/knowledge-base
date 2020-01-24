<template>
  <div class="content">
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'BaseContent',
};
</script>

<style lang="scss" scoped>
.content {
  grid-area: content;
  background: #efefef;
  padding: 20px;
}
</style>
