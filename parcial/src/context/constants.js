//export const apiUrl = 'http://localhost:4000/'
export const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://ganar-como-loco.vercel.app/'
  : 'http://localhost:4000/';


