<template>
  <div :class="['dashboard', { 'dashboard--menu-visible': isMenuVisible }]">
    <base-header title="Knowledge Base" />
    <base-menu class="dashboard__menu" />
    <base-content class="dashboard__content">
      <template slot="content">
        <router-view/>
      </template>
    </base-content>
    <base-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseMenu from '@/components/BaseMenu.vue';
import BaseContent from '@/components/BaseContent.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default {
  name: 'Dashboard',
  components: {
    BaseHeader,
    BaseMenu,
    BaseContent,
    BaseFooter,
  },
  computed: {
    ...mapState(['isMenuVisible']),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100vh;
  display: inline-grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";

  &__menu {
    width: 0px;
    transition: all 0.4s;
  }

  &__content {
    width: calc(100vw);
    transition: all 0.4s;
  }

  &--menu-visible {
    .dashboard__menu {
      width: 300px;
    }
    .dashboard__content {
      width: calc(100vw - 300px);
    }
  }
}
</style>
