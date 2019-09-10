import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://car-rental-c13eb.firebaseio.com/',
})

export default instance
