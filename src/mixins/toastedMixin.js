import Vue from 'vue';

const toastedMixin = {
  methods: {
    $_toastedMixin_showError(error) {
      if (error && error.response && error.response.data) {
        Vue.toasted.global.defaultError({ message: error.response.data });
      } else if (typeof error === 'string') {
        Vue.toasted.global.defaultError({ message: error });
      } else {
        Vue.toasted.global.defaultError();
      }
    },
    $_toastedMixin_showSuccess(success) {
      if (success === 'string') {
        Vue.toasted.global.defaultSuccess({ message: success });
      } else {
        Vue.toasted.global.defaultSuccess();
      }
    },
  },
};

export default toastedMixin;
