import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://car-rental-c13eb.firebaseio.com/',
})
// test

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance
