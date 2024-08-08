const isDev = process.env.NODE_ENV === "development"

const devConfig = 
{
    api : 'http://localhost:3000/'
}
const prodConfig = 
{
    api : 'http://localhost:3000/'
}
//export const prodapi= 'http://les-planetes2kentin.fr/api'


export const API_URL = isDev ? devConfig.api : prodConfig.api