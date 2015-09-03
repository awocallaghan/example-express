module.exports = {
  development: {
    secret: 'dev-secret',
    port: 8080,
    DatabaseConfig: {
      port: 27617,
      host: 'localhost',
      name: 'name',
      user: 'user',
      pass: 'pass'
    }
  },
  production: {
    secret: 'production-secret',
    port: 80,
    DatabaseConfig: {
      port: 27617,
      host: 'host',
      name: 'name',
      user: 'user',
      pass: 'pass'
    }
  }
};
