/**
 * Properties shared by all frontend applications.
 */
const properties = {
  constants: {
    client: {
      angular: {
        host: 'localhost',
        port: 10001
      },
      react: {
        host: 'localhost',
        port: 10002
      },
      vue: {
        host: 'localhost',
        port: 10003
      },
    },
    server: {
      express: {
        host: 'localhost',
        port: 9999
      },
      rails: {
        host: 'localhost',
        port: 9998
      },
      spring_boot: {
        host: 'localhost',
        port: 9997
      },
    },
    shared: {
    }
  },
};

module.exports = properties;
