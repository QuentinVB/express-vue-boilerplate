const isDev = import.meta.env.DEV

const devConfig = {
  api: 'http://localhost:3000/'
}
const prodConfig = {
  api: import.meta.env.VITE_API_URL
}

export const API_URL = isDev ? devConfig.api : prodConfig.api
