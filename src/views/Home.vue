<template>
  <div>
    <base-page-title icon="fa fa-home" mainTitle="Home" subtitle="Knowledge Base" />
    <div class="stats">
      <base-stat
        title="Categories"
        :value="stats.categories"
        icon="fa fa-folder" iconColor="#d54d50"
      />
      <base-stat
        title="Articles"
        :value="stats.articles"
        icon="fa fa-file"
        iconColor="#3bc480"
      />
      <base-stat
        title="Users"
        :value="stats.users"
        icon="fa fa-user"
        iconColor="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import BasePageTitle from '../components/BasePageTitle.vue';
import BaseStat from '../components/BaseStat.vue';
import httpClient from '../config/axiosHttpClient';

export default {
  name: 'Home',
  components: {
    BasePageTitle,
    BaseStat,
  },
  data: () => ({
    stats: {},
  }),
  created() {
    this.getStats();
  },
  methods: {
    async getStats() {
      const { data } = await httpClient.get('/stats');
      this.stats = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  flex-wrap: wrap;
}
</style>
