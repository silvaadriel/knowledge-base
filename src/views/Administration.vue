<template>
  <div>
    <base-page-title
      icon="fa fa-cogs"
      mainTitle="Administration"
      subtitle="Registrations and more."
    />
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Articles" active>
          <base-article-admin />
        </b-tab>
        <b-tab title="Categories">
          <base-category-admin />
        </b-tab>
        <b-tab title="Users">
          <base-user-admin />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import BasePageTitle from '../components/BasePageTitle.vue';
import BaseUserAdmin from '../components/BaseUserAdmin.vue';
import BaseArticleAdmin from '../components/BaseArticleAdmin.vue';
import BaseCategoryAdmin from '../components/BaseCategoryAdmin.vue';

export default {
  name: 'Administration',
  components: {
    BasePageTitle,
    BaseUserAdmin,
    BaseArticleAdmin,
    BaseCategoryAdmin,
  },
};
</script>
