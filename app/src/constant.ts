const isDev = process.env.NODE_ENV === "development"

const devConfig = 
{
    api : 'http://127.0.0.1:3000/'
}
const prodConfig = 
{
    api : 'http://127.0.0.1:3000/'
}
//export const prodapi= 'http://les-planetes2kentin.fr/api'


export const apiUrl = isDev ? devConfig.api : prodConfig.api