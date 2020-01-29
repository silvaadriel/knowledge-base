import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: // temporary
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IkFkcmllbCBkYSBTaWx2YSIsImVtYWlsIjoic2lsdmFhZHJpZWw1MTFAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU4MDA1ODExMiwiZXhwIjoxNTgwMzE3MzEyfQ.rF0lPp4STHLgh54l4FdzRp_riaSpotZNyhsFFR9lop8',
    post: {
      'Content-Type': 'x-www-form-urlencoded',
    },
  },
});

export default httpClient;
