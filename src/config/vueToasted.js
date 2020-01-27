import Vue from 'vue';
import VueToasted from 'vue-toasted';

Vue.use(VueToasted, {
  iconPack: 'fontawesome',
  duration: '3000',
});

Vue.toasted.register(
  'defaultSuccess',
  payload => (!payload.message ? 'Operation completed successfully.' : payload.message),
  { type: 'success', icon: 'check' },
);

Vue.toasted.register(
  'defaultError',
  payload => (!payload.message ? 'Ooops! Unexpected error.' : payload.message),
  { type: 'error', icon: 'times' },
);
