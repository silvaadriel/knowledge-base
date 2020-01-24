<template>
  <div class="header">
    <BaseHamburgerButton class="header__menu-button" @click="toggleMenu" />
    <h1 class="header__title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <base-user-dropdown />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseHamburgerButton from './BaseHamburgerButton.vue';
import BaseUserDropdown from './BaseUserDropdown.vue';

export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseHamburgerButton,
    BaseUserDropdown,
  },
  methods: {
    ...mapActions(['toggleMenu']),
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

  &__menu-button {
    padding: 0 20px;
  }

  &__title {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 100;
    text-align: center;
    flex-grow: 1;

    & a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
