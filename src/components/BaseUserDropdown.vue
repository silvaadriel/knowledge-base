<template>
  <div class="user-dropdown">
    <div class="user-dropdown__button" @click="isOpen =!isOpen">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown__avatar">
        <gravatar :email="user.email" alt="User"/>
      </div>
      <i
        :class="[
          'user-dropdown__arrow fa fa-angle-down',
          { 'user-dropdown__arrow--open': isOpen },
        ]"
      ></i>
    </div>
    <div
      :class="[
        'user-dropdown__content',
        { 'user-dropdown__content--open': isOpen,
      }]"
    >
      <router-link to="/admin">
        <i class="fa fa-cogs"></i> Administration
      </router-link>
      <a href><i class="fa fa-sign-out"></i> Exit</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Gravatar from 'vue-gravatar';

export default {
  name: 'BaseUserDropdown',
  components: {
    Gravatar,
  },
  data: () => ({
    isOpen: false,
  }),
  computed: mapState(['user']),
};
</script>

<style lang="scss" scoped>
.user-dropdown {
  height: 100%;
  position: relative;

  &__button {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 100;
    height: 100%;
    padding: 0 20px;
    cursor: pointer;

    display: flex;
    align-items: center;

    &:hover {
      background: #0002
    }
  }

  &__avatar {
    margin: 10px;

    & > img {
      max-height: 37px;
      border-radius: 5px;
    }
  }

  &__arrow {
    transition: all 0.2s;

    &--open {
      transform: rotate(-180deg);
    }
  }

  &__content {
    position: absolute;
    right: 0px;
    background: #f9f9f9;
    box-shadow: 0px 8px 16px 0px #0002;
    height: 0;
    min-width: 170px;
    overflow: hidden;
    z-index: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    transition: all 0.2s;

    &--open {
      height: initial;
      padding: 20px 0;
    }

    & a {
      text-decoration: none;
      color: #000;
      padding: 10px 20px;

      &:hover {
        background: #0002;
      }
    }
  }
}
</style>
