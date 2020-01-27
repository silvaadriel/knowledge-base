<template>
  <div>
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-form-group label="Name" label-for="category-name">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter the category name"
        />
      </b-form-group>
      <b-form-group label="Parent category" label-for="category-parentId">
        <b-form-select
          id="category-parentId"
          :options="categories"
          v-model="category.parentId"
          :disabled="mode === 'remove'"
        />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Remove</b-button>
      <b-button class="ml-2" @click="reset">Cancel</b-button>
    </b-form>
    <hr>
    <b-table hover striped :items="categories" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="getCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="getCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-row>
      <b-col xl="8" lg="12">
        <b-pagination-nav
          base-url="#page-"
          :number-of-pages="numberOfPages"
          @change="getCategories"
          :value="currentPage"
          first-number
          last-number
        />
      </b-col>
      <b-col xl="4" sm="3">
        <b-form-group
          label-cols-xl="8"
          label="Limit of categories per page:"
          label-align-xl="right"
          label-for="input-limit"
        >
          <b-form-input id="input-limit" type="number" :value="limit" @change="setLimit" />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import httpClient from '../config/axiosHttpClient';
import toastedMixin from '../mixins/toastedMixin';

export default {
  name: 'BaseCategoryAdmin',
  mixins: [toastedMixin],
  data: () => ({
    mode: 'save',
    category: {},
    categories: [],
    fields: [
      { key: 'id', sortable: true },
      { key: 'name', sortable: true },
      { key: 'path', sortable: true },
      { key: 'actions', sortable: false },
    ],
    currentPage: 1,
    count: null,
    limit: 10,
  }),
  created() {
    this.getCategories();
  },
  computed: {
    numberOfPages() {
      return this.count ? Math.ceil(this.count / this.limit) : 1;
    },
  },
  methods: {
    setLimit(value) {
      this.limit = value > 0 ? value : 10;
      this.getCategories();
    },
    async getCategory(category, mode = 'save') {
      this.mode = mode;
      this.category = { ...category };
    },
    async getCategories(page = 1) {
      const { data: response } = await httpClient.get(`/categories?page=${page}&limit=${this.limit}`);
      this.categories = response.data.map(category => ({
        ...category, text: category.path, value: category.id,
      }));
      this.count = response.count;
      this.currentPage = page;
    },
    async reset() {
      this.mode = 'save';
      this.category = {};
      this.getCategories();
    },
    async save() {
      const method = this.category.id ? 'put' : 'post';
      const id = this.category.id ? `/${this.category.id}` : '';

      try {
        await httpClient[method](`/categories${id}`, this.category);
        this.reset();
        this.$_toastedMixin_showSuccess();
      } catch (error) {
        this.$_toastedMixin_showError(error);
      }
    },
    async remove() {
      try {
        const { id } = this.category;
        await httpClient.delete(`/categories/${id}`);
        this.reset();
        this.$_toastedMixin_showSuccess();
      } catch (error) {
        this.$_toastedMixin_showError(error);
      }
    },
  },
};
</script>
