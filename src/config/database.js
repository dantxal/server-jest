require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  // removes db logs from yarn test
  logging: !(process.env.NODE_ENV === 'test' && !process.env.LOG),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
