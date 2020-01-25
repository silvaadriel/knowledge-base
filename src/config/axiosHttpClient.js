import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: // temporary
      'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzcsIm5hbWUiOiJBZHJpZWwgZGEgU2lsdmEiLCJlbWFpbCI6InNpbHZhYWRyaWVsMDEyQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1Nzk5NTQxNzYsImV4cCI6MTU4MDIxMzM3Nn0.6pbynWloFTVnCCcBQu-izmMPKr5kNo5RzLr7wt7aw1Q',
    post: {
      'Content-Type': 'x-www-form-urlencoded',
    },
  },
});

export default httpClient;
