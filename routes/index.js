// routes

module.exports = (app) => {
  app.use('/', require('../middleware'));
  app.use('/', require('./home'));
  app.use('/privacy', require('./privacy-page'));
};
