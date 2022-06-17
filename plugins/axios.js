export default function ({ $axios }) {
  $axios.onRequest( (config) => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    // if (store.state.token) {
      config.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEsImlhdCI6MTU2OTYwMzU3MCwiZXhwIjoxNTcwMjA4MzcwfQ.O5vh7AO7nUN1njlj6OY1GLL8ReL8vJX9VnhA1u2g3II`
    // }
  })
}