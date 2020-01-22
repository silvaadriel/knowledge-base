<template>
  <footer class="footer">
    <span>Copyright <strong>silvaadriel</strong> © 2020</span>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter',
};
</script>

<style lang="scss" scoped>
.footer {
  grid-area: footer;
  background: #ddd;
  color: #333;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}
</style>
