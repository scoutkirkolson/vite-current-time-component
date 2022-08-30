module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vite-current-time-component/'
    : '/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vite-current-time-component/'
    : '/',
}