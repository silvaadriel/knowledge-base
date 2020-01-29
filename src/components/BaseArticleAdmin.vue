<template>
  <div>
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Name" label-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter the article name"
        />
      </b-form-group>
      <b-form-group label="Description" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter the article description"
        />
      </b-form-group>
      <b-form-group label="Image (URL)" label-for="article-imageURL">
        <b-form-input
          id="article-imageURL"
          type="text"
          v-model="article.imageURL"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter the article image (URL)"
        />
      </b-form-group>
      <b-form-group label="Category" label-for="article-categoryId">
        <b-form-select
          id="article-categoryId"
          :options="categories"
          v-model="article.categoryId"
          :disabled="mode === 'remove'"
        />
      </b-form-group>
      <b-form-group label="Author" label-for="article-userId">
        <b-form-select
          id="article-userId"
          :options="users"
          v-model="article.userId"
          :disabled="mode === 'remove'"
        />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Content" label-for="article-content">
        <vue-editor
          id="article-content"
          v-model="article.content"
          placeholder="Article content here..."
        />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Remove</b-button>
      <b-button class="ml-2" @click="reset">Cancel</b-button>
    </b-form>
    <hr>
    <b-table hover striped :items="articles" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="getArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="getArticle(data.item, 'remove')">
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
          label="Limit of articles per page:"
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
import { VueEditor } from 'vue2-editor';
import httpClient from '../config/axiosHttpClient';
import toastedMixin from '../mixins/toastedMixin';

export default {
  name: 'BaseAticleAdmin',
  mixins: [toastedMixin],
  components: {
    VueEditor,
  },
  data: () => ({
    mode: 'save',
    article: {},
    articles: [],
    users: [],
    categories: [],
    fields: [
      { key: 'id', sortable: true },
      { key: 'name', sortable: true },
      { key: 'description', sortable: true },
      { key: 'actions', sortable: false },
    ],
    currentPage: 1,
    count: null,
    limit: 10,
  }),
  created() {
    this.getArticles();
    this.getUsers();
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
    async getArticle(article, mode = 'save') {
      this.mode = mode;
      const { data } = await httpClient.get(`/articles/${article.id}`);
      this.article = data;
    },
    async getArticles(page = 1) {
      const { data: response } = await httpClient.get(`/articles?page=${page}&limit=${this.limit}`);
      this.articles = response.data;
      this.count = response.count;
      this.currentPage = page;
    },
    async getCategories() {
      const { data } = await httpClient.get('/categories?all=true');
      this.categories = data.map(category => ({
        text: category.path, value: category.id,
      }));
    },
    async getUsers() {
      const { data } = await httpClient.get('/users?all=true');
      this.users = data.map(user => ({
        text: `${user.name} - ${user.email}`, value: user.id,
      }));
    },
    async reset() {
      this.mode = 'save';
      this.article = {};
      this.getArticles();
    },
    async save() {
      const method = this.article.id ? 'put' : 'post';
      const id = this.article.id ? `/${this.article.id}` : '';

      try {
        await httpClient[method](`/articles${id}`, this.article);
        this.reset();
        this.$_toastedMixin_showSuccess();
      } catch (error) {
        this.$_toastedMixin_showError(error);
      }
    },
    async remove() {
      try {
        const { id } = this.article;
        await httpClient.delete(`/articles/${id}`);
        this.reset();
        this.$_toastedMixin_showSuccess();
      } catch (error) {
        this.$_toastedMixin_showError(error);
      }
    },
  },
};
</script>
