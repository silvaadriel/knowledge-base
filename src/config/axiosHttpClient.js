import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: // temporary
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDMsIm5hbWUiOiJBZHJpZWwgZGEgU2lsdmEiLCJlbWFpbCI6InNpbHZhYWRyaWVsNTQwQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1ODA0MDQxNDcsImV4cCI6MTU4MDY2MzM0N30.Cdsi5i3VNNAm4sHqSAIErLYzbcO_RwRPnFCqbwSb_sU',
    post: {
      'Content-Type': 'x-www-form-urlencoded',
    },
  },
});

export default httpClient;
