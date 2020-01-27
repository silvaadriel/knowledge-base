<template>
  <div>
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Name" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Enter the user name"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Email" label-for="user-email">
            <b-form-input
              id="user-email"
              type="email"
              v-model="user.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Enter the user email"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-checkbox
        id="user-admin"
        v-model="user.admin"
        :disabled="mode === 'remove'"
        class="my-3">
        Administrator?
      </b-form-checkbox>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Password" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Enter the user password"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirm password" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirm the user password"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Remove</b-button>
      <b-button class="ml-2" @click="reset">Cancel</b-button>
    </b-form>
    <hr>
    <b-table hover striped :items="users" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="getUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="getUser(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-row>
      <b-col xl="8" lg="12">
        <b-pagination-nav
          base-url="#page-"
          :number-of-pages="numberOfPages"
          @change="getUsers"
          first-number
          last-number
        />
      </b-col>
      <b-col xl="4" sm="3">
        <b-form-group
          label-cols-xl="8"
          label="Limit of users per page:"
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
  name: 'BaseUserAdmin',
  mixins: [toastedMixin],
  data: () => ({
    mode: 'save',
    user: {},
    users: [],
    fields: [
      { key: 'id', sortable: true },
      { key: 'name', sortable: true },
      { key: 'email', sortable: true },
      {
        key: 'admin',
        label: 'Administrator',
        sortable: true,
        formatter: value => (value ? 'Yes' : 'No'),
      },
      { key: 'actions', sortable: false },
    ],
    count: null,
    limit: 10,
  }),
  created() {
    this.getUsers();
  },
  computed: {
    numberOfPages() {
      return this.count ? Math.ceil(this.count / this.limit) : 1;
    },
  },
  methods: {
    setLimit(value) {
      this.limit = value > 0 ? value : 10;
      this.getUsers();
    },
    async getUser(user, mode = 'save') {
      this.mode = mode;
      this.user = { ...user };
    },
    async getUsers(page) {
      const { data: response } = await httpClient.get(`/users?page=${page}&limit=${this.limit}`);
      this.users = response.data;
      this.count = response.count;
    },
    async reset() {
      this.mode = 'save';
      this.user = {};
      this.getUsers();
    },
    async save() {
      const method = this.user.id ? 'put' : 'post';
      const id = this.user.id ? `/${this.user.id}` : '';

      try {
        await httpClient[method](`/users${id}`, this.user);
        this.reset();
        this.$_toastedMixin_showSuccess();
      } catch (error) {
        this.$_toastedMixin_showError(error);
      }
    },
    async remove() {
      try {
        const { id } = this.user;
        await httpClient.delete(`/users/${id}`);
        this.reset();
        this.$_toastedMixin_showSuccess();
      } catch (error) {
        this.$_toastedMixin_showError(error);
      }
    },
  },
};
</script>
