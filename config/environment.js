module.exports = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV,
  db: {
    production: process.env.MONGODB_URI,
    development: 'mongodb://localhost/wdi-group-project-development',
    test: 'mongodb://localhost/wdi-group-project-test'
  }
};
