const config = {
  url: 'https://try.vikunja.io', // base url
  credentials: {
    username: 'demo',
    password: 'demo'
  }
}

export default config;

// Production среда
// Dev или Stage или Test среда
// Local среда

// Переменные окружения. Окружение или среда  process.env в котором хранятся переменные окружения.

/*
API_URL=http://localhost:3000 npm run test
process.env.API_USERNAME || 
process.env.API_PASSWORD || 
{ url: 'http://localhost:3000' }
*/
