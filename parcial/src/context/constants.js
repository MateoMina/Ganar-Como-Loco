//export const apiUrl = 'http://localhost:4000/'
// export const apiUrl = 'https://backendrifas.vercel.app/'
export const apiUrl = process.env.NODE_ENV === 'production' 
  ? '/auth/' 
  : 'http://localhost:4000/';